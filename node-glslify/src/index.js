import vertexShaderSource from './vertexShader.glsl';
import fragmentShaderSource from './fragmentShader.glsl';

// Initialize WebGL
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);
const gl = canvas.getContext('webgl');

// Compile Shader
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

// Create Program
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('Error linking program:', gl.getProgramInfoLog(program));
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

const positionLocation = gl.getAttribLocation(program, 'aPosition');
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Render
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);