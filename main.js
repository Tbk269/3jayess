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
material.opacity = 0.7;

function createRack(name, x , y ,z){
    const geo = new THREE.Mesh( geometry, material );
    scene.add(geo);
    geo.position.set(x,y,z);
    geo.name = name;
    return geo;
}

const rack1 = createRack('rack1', -1.08 , 2.5 ,3.68);
scene.add(rack1);

const rack2 = createRack('rack2', -1.08 , 2.5 ,5.25);
scene.add(rack2);

const rack3 = createRack('rack3', -2 , 2.5 ,3.68);
scene.add(rack3);

const rack4 = createRack('rack4', -2 , 2.5 ,5.25);
scene.add(rack4);

const el = document.createElement('h5');
el.name = 'tooltip';
const container = document.createElement('div');
container.appendChild(el);
const reading = new CSS2DObject(container);
rack1.add(reading);

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

window.addEventListener('mousemove', function(event){
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );
	const intersects = raycaster.intersectObjects( scene.children );
    const rack = intersects[0].object.name;
    if(intersects.length>0){
        switch(rack){
            case 'rack1':
                el.className = 'tooltip show';
                reading.position.set(0,0,0);
                break;
            case 'rack2':
                el.className = 'tooltip show';
                reading.position.set(0,0,1.5);
                break;
            case 'rack3':
                el.className = 'tooltip show';
                reading.position.set(-1,0,0);
                break;
            case 'rack4':
                el.className = 'tooltip show';
                reading.position.set(-1,0,1.5);
                break;
            
            default:
                break;
        }
    } else {
        el.className = 'tooltip hide';
    }
})
animate();
fetch('https://api.data.gov.sg/v1/environment/air-temperature')
    .then(res => {
        return res.json();
    })
    .then(data => {
        el.textContent += "T: \n";
        el.textContent += " ";
        const temperature1 = 0;
        switch(rack){
            case 'rack1':
                temperature1 = data.items[0].readings[0].value;
                el.textContent += temperature1;
                break;
            case 'rack2':
                temperature1 = data.items[0].readings[1].value;
                el.textContent += temperature1;
                break;
            case 'rack3':
                temperature1 = data.items[0].readings[2].value;
                el.textContent += temperature1;
                break;
            case 'rack4':
                temperature1 = data.items[0].readings[3].value;
                el.textContent += temperature1;
                break;
            
            default:
                break;
        }
    })
    .catch(error => console.log(error));

fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
    .then(res => {
        return res.json();
    })
    .then(data => {
        el.textContent += "H: \n";
        el.textContent += " ";
        const humidity1 = 0;
        switch(intersects[0].object.name){
            case 'rack1':
                humidity1 = data.items[0].readings[0].value;
                el.textContent += humidity1;
                break;
            case 'rack2':
                humidity1 = data.items[0].readings[1].value;
                el.textContent += humidity1;;
                break;
            case 'rack3':
                humidity1 = data.items[0].readings[2].value;
                el.textContent += humidity1;
                break;
            case 'rack4':
                humidity1 = data.items[0].readings[3].value;
                el.textContent += humidity1;
                break;
            
            default:
                break;
        }
    })
    .catch(error => console.log(error));