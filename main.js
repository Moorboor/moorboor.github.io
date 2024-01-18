import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );


var model;
const loader = new GLTFLoader();
loader.load( 'Bracket.glb', function ( gltf ) {

	scene.add( gltf.scene );
  model = gltf.scene
  model.rotation.y = -100;

}, undefined, function ( error ) {

	console.error( error );

} );

var model2;
const loader2 = new GLTFLoader();
loader2.load( 'Bracket.glb', function ( gltf ) {

	scene.add( gltf.scene );
  model2 = gltf.scene
  model2.rotation.y = 100;
  model2.position.x -= 15;

}, undefined, function ( error ) {

	console.error( error );

} );

/*
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)
*/
const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.position.set(-10,5,5)
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);



function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.03;
  camera.position.x = t * -0.0001;
  camera.position.y = t * -0.0001;

}


document.body.onscroll = moveCamera


const spaceTexture = new THREE.TextureLoader().load("D2643_035_anderes Werkzeug.jpg");
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame( animate );
  model.rotation.x += 0.01;
  model.rotation.y += 0.005;
  model.rotation.z += 0.01;

  model2.rotation.x -= 0.02;
  model2.rotation.y -= 0.003;
  model2.rotation.z -= 0.005;
  controls.update();


  renderer.render( scene, camera );

}

animate()