async function loadShaders(vertexShaderSrc, fragmentShaderSrc) {
  try {
    const [vertexShaderResponse, fragmentShaderResponse] = await Promise.all([
      fetch(vertexShaderSrc),
      fetch(fragmentShaderSrc)
    ]);

    if (!vertexShaderResponse.ok) {
      throw new Error(`Vertex shader HTTP error ${vertexShaderResponse.status}`);
    }
    if (!fragmentShaderResponse.ok) {
      throw new Error(`Fragment shader HTTP error ${fragmentShaderResponse.status}`);
    }

    const vertexShaderSource = await vertexShaderResponse.text();
    const fragmentShaderSource = await fragmentShaderResponse.text();
    return { vertexShaderSource, fragmentShaderSource };

  } catch (error) {
    console.error("Error loading shaders:", error);
    return null;
  }
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const shaderType = type === gl.VERTEX_SHADER ? 'vertex' : 'fragment';
    console.error(`${shaderType} shader compilation error:`, gl.getShaderInfoLog(shader));  // More descriptive error
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

async function main() {

  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  const shaders = await loadShaders("vertexShader.glsl", "fragmentShader.glsl");
  if (!shaders) {
    console.error("Error loading shaders");
    return;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, shaders.vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaders.fragmentShaderSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Unable to link the shader program: ' + gl.getProgramInfoLog(program));
    return null;
  }

  gl.useProgram(program);

  // Get the location of the u_resolution uniform
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

  // Set the resolution for use in the shader
  gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
     1.0,  1.0,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

main();