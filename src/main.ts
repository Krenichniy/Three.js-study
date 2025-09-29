import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "dat.gui";

const sceneA = new THREE.Scene();
const sceneB = new THREE.Scene();
const sceneC = new THREE.Scene();
sceneA.background = new THREE.Color(0x123456);
sceneB.background = new THREE.TextureLoader().load(
    "https://sbcode.net/img/grid.png"
);
sceneC.background = new THREE.CubeTextureLoader()
    .setPath("https://sbcode.net/img/")
    .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
// scene.backgroundBlurriness = 0.2;

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cube = new THREE.Mesh(geometry, material);
sceneA.add(cube);

const stats = new Stats();
// stats.showPanel(1);
document.body.appendChild(stats.dom);

const gui = new GUI();

const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open(); // open folder by default

let actualScene = sceneA;
const setScene = {
    sceneA: function () {
        actualScene = sceneA;
    },
    sceneB: function () {
        actualScene = sceneB;
    },
    sceneC: function () {
        actualScene = sceneC;
    },
};
gui.add(setScene, "sceneA").name("Scene A");

gui.add(setScene, "sceneB").name("Scene B");

gui.add(setScene, "sceneC").name("Scene C");

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 20);
cameraFolder.open();

function animate() {
    requestAnimationFrame(animate);

    // stats.begin();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // stats.end();

    renderer.render(actualScene, camera);
    stats.update();
}

animate();
