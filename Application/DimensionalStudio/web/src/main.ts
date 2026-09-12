import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(3, 2, 5);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 2));
const grid = new THREE.GridHelper(20, 20);
scene.add(grid);

const loader = new GLTFLoader();
export async function loadGLTF(url: string) {
  const asset = await loader.loadAsync(url);
  scene.add(asset.scene);
  return asset;
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function frame() {
  requestAnimationFrame(frame);
  renderer.render(scene, camera);
}
frame();
