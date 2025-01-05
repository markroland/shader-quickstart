import * as THREE from 'three';
import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a plane with custom shaders
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// Position the camera
camera.position.z = 1;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();