import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer , CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x5A5A5A);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild( labelRenderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(2, 10, 11);

const controls = new OrbitControls(camera, labelRenderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const geometry = new THREE.BoxGeometry( 1.05, 2, 1.6 );
const material = new THREE.MeshBasicMaterial( { color: 0xf } );
material.transparent = true;
material.opacity = 0.5;

const rack1 = new THREE.Mesh( geometry, material );
scene.add(rack1);
rack1.position.y = 2.5;
rack1.position.z = 3.68;
rack1.position.x = -1.08;

const rack2 = new THREE.Mesh( geometry, material );
scene.add(rack2);
rack2.position.y = 2.5;
rack2.position.z = 5.25;
rack2.position.x = -1.08;

const rack3 = new THREE.Mesh( geometry, material );
scene.add(rack3);
rack3.position.y = 2.5;
rack3.position.z = 3.68;
rack3.position.x = -2;

const rack4 = new THREE.Mesh( geometry, material );
scene.add(rack4);
rack4.position.y = 2.5;
rack4.position.z = 5.25;
rack4.position.x = -2;

const el1 = document.createElement('h5');
const el2 = document.createElement('h5');
const el3 = document.createElement('h5');
const el4 = document.createElement('h5');
const objectCSS1 = new CSS2DObject(el1);
const objectCSS2 = new CSS2DObject(el2);
const objectCSS3 = new CSS2DObject(el3);
const objectCSS4 = new CSS2DObject(el4);
objectCSS1.position.set(0, 0, 0);
objectCSS2.position.set(0, 0, 0);
objectCSS3.position.set(0, 0, 0);
objectCSS4.position.set(0, 0, 0);
rack1.add(objectCSS1);
rack2.add(objectCSS2);
rack3.add(objectCSS3);
rack4.add(objectCSS4);
document.body.appendChild(el1);
document.body.appendChild(el2);
document.body.appendChild(el3);
document.body.appendChild(el4);

const light = new THREE.DirectionalLight( 0xfffffff, 0.5 );
light.shadow.camera.near = 100;
light.shadow.camera.far = 1000;
light.castShadow = true;
scene.add(light);

const loader = new GLTFLoader();
loader.load( 'room/digitalTwinRoom.gltf', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  labelRenderer.render(scene,camera);
  renderer.render(scene, camera);
}

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix;
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight);
})

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

animate();
fetch('https://api.data.gov.sg/v1/environment/air-temperature')
    .then(res => {
        return res.json();
    })
    .then(data => {
        el1.textContent += "T1: \n";
        el1.textContent += " ";
        const temperature1 = data.items[0].readings[0].value;
        el1.textContent += temperature1;

        el2.textContent += "T2: \n";
        el2.textContent += " ";
        const temperature2 = data.items[0].readings[1].value;
        el2.textContent += temperature2;

        el3.textContent += "T3: \n";
        el3.textContent += " ";
        const temperature3 = data.items[0].readings[2].value;
        el3.textContent += temperature3;

        el4.textContent += "T4: \n";
        el4.textContent += " ";
        const temperature4 = data.items[0].readings[3].value;
        el4.textContent += temperature4;
    })
    .catch(error => console.log(error));

fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
    .then(res => {
        return res.json();
    })
    .then(data => {
        el1.textContent += "H1: \n";
        el1.textContent += " ";
        const humidity1 = data.items[0].readings[0].value;
        el1.textContent += humidity1;

        el2.textContent += "H2: \n";
        el2.textContent += " ";
        const humidity2 = data.items[0].readings[1].value;
        el2.textContent += humidity2;

        el3.textContent += "H3: \n";
        el3.textContent += " ";
        const humidity3 = data.items[0].readings[2].value;
        el3.textContent += humidity3;

        el4.textContent += "H4: \n";
        el4.textContent += " ";
        const humidity4 = data.items[0].readings[3].value;
        el4.textContent += humidity4;
    })
    .catch(error => console.log(error));