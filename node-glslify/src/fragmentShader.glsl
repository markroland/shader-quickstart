#ifdef GL_ES
precision mediump float;
#endif

// Get resolution from JavaScript
uniform vec2 u_resolution;

void main() {
  // Normalize pixel coordinates
  vec2 uv = gl_FragCoord.xy / u_resolution;

  // Fade the red color component with the X position
  // Fade the green color component with the Y position
  // Blue color component is always 0.5
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}