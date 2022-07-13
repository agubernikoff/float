import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const chars = new THREE.Group();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(50, 5, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x0066ff,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpeg");
scene.background = spaceTexture;

const meTexture = new THREE.TextureLoader().load("me.png");

const me = new THREE.Mesh(
  new THREE.BoxGeometry(9, 9, 9),
  new THREE.MeshBasicMaterial({ map: meTexture })
);

me.position.y = 10;
me.position.x = 10;
me.position.z = -20;

const moonTexture = new THREE.TextureLoader().load("whoknew.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);

scene.add(me, moon);

moon.position.z = -10;
moon.position.x = -20;
moon.position.y = -10;

const loader = new FontLoader();

const text1 = "GNITAOLF";
const text2 = "SP CE";
const text3 = "T ME";

loader.load("./star.json", function (font) {
  const fontOptions = { height: 2, size: 7, font: font };
  const letters1 = Array.from(text1);
  const letters2 = Array.from(text2);
  const letters3 = Array.from(text3);

  letters1.forEach((letter, j) => {
    const textGeometry = new TextGeometry(letter, fontOptions);
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const textMaterial2 = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
    });
    const textMesh = new THREE.Mesh(textGeometry, [
      textMaterial,
      textMaterial2,
    ]);
    textMesh.name = j;
    const yPos = -37 + j * 10;
    textMesh.position.set(0, yPos, 0);
    chars.add(textMesh);
  });
  letters2.forEach((letter, j) => {
    const textGeometry = new TextGeometry(letter, fontOptions);
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const textMaterial2 = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
    });
    const textMesh = new THREE.Mesh(textGeometry, [
      textMaterial,
      textMaterial2,
    ]);
    textMesh.name = j;
    const yPos = -19.5 + j * 10;
    textMesh.position.set(yPos, 3, 0);
    chars.add(textMesh);
  });
  letters3.forEach((letter, j) => {
    const textGeometry = new TextGeometry(letter, fontOptions);
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const textMaterial2 = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
    });
    const textMesh = new THREE.Mesh(textGeometry, [
      textMaterial,
      textMaterial2,
    ]);
    textMesh.name = j;
    const yPos = -10 + j * 10;
    textMesh.position.set(yPos, -17, 0);
    chars.add(textMesh);
  });
  chars.children[2].position.x += 1.8;
});
scene.add(chars);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;

  me.rotation.x -= 0.01;
  me.rotation.y -= 0.005;
  me.rotation.z -= 0.01;

  // camera.position.x += 0.01;
  // camera.position.y += 0.01;
  camera.lookAt(0, 0, 0);
  const orbitRadius = 60;
  const date = Date.now() * 0.0005;
  camera.position.set(
    Math.cos(date) * orbitRadius,
    0,
    Math.sin(date) * orbitRadius
  );

  controls.update;

  renderer.render(scene, camera);
}

animate();
