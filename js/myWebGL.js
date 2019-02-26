window.onload = Init();

var cube;
var hexahedron;


function Init()
{
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.z = 100;
	
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	var light = new THREE.PointLight(0xFFFFF);
	light.position.set(10, 0, 25);
	scene.add(light);
	
	// Cube
	var geometry = new THREE.BoxGeometry(20, 20, 20);
	var material = new THREE.MeshLambertMaterial({color: 0xfd59d7});
	cube = new THREE.Mesh(geometry, material);
	
	scene.add(cube);
	
	
	var Render = function() 
	{
		requestAnimationFrame(Render);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		camera.updateProjectionMatrix();
		renderer.render(scene, camera);
	}
	
	Render();
}