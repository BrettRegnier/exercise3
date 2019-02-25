window.onload = Init();

function Init() 
{
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

	camera.position.z = 100;
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize
}