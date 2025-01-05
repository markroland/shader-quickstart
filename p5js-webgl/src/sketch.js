// From https://editor.p5js.org/BarneyCodes/sketches/AQHT3p4Pz on 12/29/2024

let myShader;

const numCircles = 6;

function preload() {
  // load in the shader
  myShader = loadShader('vertexShader.glsl', 'fragmentShader.glsl');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  shader(myShader);
  noStroke();

  const circles = [];
  const circleColors = [];

  circleColors.push(1, 0, 0);
  circleColors.push(0, 1, 0);
  circleColors.push(0, 0, 1);
  circleColors.push(1, 0, 0);
  circleColors.push(0, 1, 0);
  circleColors.push(0, 0, 1);

  let ring_radius = 0.25;
  let circle_radius = 0.1;
  let theta = 0;
  for (let i = 0; i < numCircles; i ++) {
    let x = random();
    let y = random();
    x = 0.5 + cos(theta) * ring_radius;
    y = 0.5 + sin(theta) * ring_radius;
    theta += TWO_PI / numCircles;
    // circle_radius = random(0.05, 0.01);
    circles.push(x, y, circle_radius);
    // circleColors.push(random(0, 1), random(0, 1), random(0, 1));
  }

  myShader.setUniform("numCircles", numCircles);
  myShader.setUniform("circles", circles);
  myShader.setUniform("circleColors", circleColors);
}

function draw() {
  myShader.setUniform("millis", millis());
  // Run shader
  rect(-width/2, -height/2, width);
}