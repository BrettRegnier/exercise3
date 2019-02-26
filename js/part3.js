window.onload = Init();

function Init() 
{
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 1000);

	camera.position.z = 100;
	var renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 1, 0 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( 0, -1, 0 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 0, 0 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( 0, 0, 1 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 0, -1 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( -1, 0, 0 );
	scene.add( light );
	
	var color = new THREE.Color("#7833aa");
	
	var geometry = new THREE.OctahedronGeometry(20);
	var material = new THREE.MeshLambertMaterial({color: color.getHex(), wireframe: true});
	var oct = new THREE.Mesh(geometry, material);
	
	scene.add(oct);
	
	var render = function() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		oct.rotation.y += 0.005;
		oct.rotation.z += 0.005;
		oct.rotation.x += 0.005;
	};
	
	render();
}