#ifdef GL_ES
precision mediump float;
#endif

// p5.js provides the normalized `pos` varying for vertex position
varying vec2 pos;

void main() {
  // Fade the red color component with the X position
  // Fade the green color component with the Y position
  // Blue color component is always 0.5
  gl_FragColor = vec4(pos.x, pos.y, 0.5, 1.0);
}