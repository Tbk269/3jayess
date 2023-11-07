import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer , CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffffff);

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
controls.autoRotate = true;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.y = 2;

const el = document.createElement('h1')
el.innerHTML = 'blank'
el.className = 'tempRead'
const objectCSS = new CSS2DObject(el)
objectCSS.position.set(0, 0, 0)
cube.add(objectCSS)
document.body.appendChild(el);

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

animate();

const tDisplay = document.querySelector("#tempRead");
const hDisplay = document.querySelector("#humRead");

fetch('https://api.data.gov.sg/v1/environment/air-temperature')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const readings = data.items[0].readings; // Assuming readings is an array of temperature readings
        let temperatureText = "Temperatures: ";
        readings.forEach(reading => {
            temperatureText += `${reading.value}, `;
        });
        tDisplay.textContent = temperatureText.slice(0, -2); // Update the content of #tempRead element
    })
    .catch(error => console.log(error));

fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
    .then(res => {
        return res.json();
    })
    .then(data => {
        const readings = data.items[0].readings; // Assuming readings is an array of humidity readings
        let humidityText = "Humidities: ";
        readings.forEach(reading => {
            humidityText += `${reading.value}, `;
        });
        hDisplay.textContent = humidityText.slice(0, -2); // Update the content of #humRead element
    })
    .catch(error => console.log(error));