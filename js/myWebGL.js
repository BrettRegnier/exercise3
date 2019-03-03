window.onload = function () {

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer({ alpha: true });
	var sphere;
	var cube;
	var cubeVertices = [];
	var cubeReversing = [false, false, false, false, false, false, false, false];
	var cubeCenter = [];
	var sphereLoaded = false;
	var cubeLoaded = false;

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 200;

	function LoadSphere() {
		var textureLoader = new THREE.TextureLoader();
		var geometry = new THREE.SphereGeometry(10, 32, 32);
		// add icosahedron
		textureLoader.load('img/diesel.jpg', function (texture) {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(2, 1);

			var material = new THREE.MeshLambertMaterial({ map: texture });
			sphere = new THREE.Mesh(geometry, material);
			sphere.position.x = 20;
			scene.add(sphere);
			sphereLoaded = true;
		});
	}

	function LoadSquare() {
		var w = 10; var h = 10; var d = 10;
		var center = [0, 0, 0];
		var geometry = new THREE.BoxGeometry(w, h, d);
		var material = new THREE.MeshNormalMaterial();
		cube = new THREE.Mesh(geometry, material);
		cube.position.x = -20;
		center[0] += -20;
		scene.add(cube);
		
		for (var i = 0; i < cube.geometry.vertices.length; i++)
		{
			vector = cube.geometry.vertices[i];
			cubeVertices.push({ "x":vector.x, "y":vector.y, "z":vector.z });
			
			cubeCenter.push()
		}
		// cubeVertices = Array.from(cube.geometry.vertices);
			
		cubeLoaded = true;
	}

	function AddLighting() {

		// so many lights
		var light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 1, 0);
		scene.add(light);

		light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(0, -1, 0);
		scene.add(light);

		light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 0, 0);
		scene.add(light);

		light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(0, 0, 1);
		scene.add(light);

		light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 0, -1);
		scene.add(light);

		light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(-1, 0, 0);
		scene.add(light);
	}

	var prevIndex = -1;
	function AnimateCube() {
		var idx = -1; 
		var vertices = cube.geometry.vertices;
		for (var i = 0; i < vertices.length; i++) {
			// X
			var xdir = -1; // This is to stop it from getting to big and then immediately shrinking down, it reverses the growth
			// if (vertices[i].x > cubeVertices[i].x + 10 || vertices[i].x < cubeVertices[i].x - 10)
			// 	cubeReversing[i] = true;
				
			if (!(vertices[i].x < cubeVertices[i].x + 0.2 && vertices[i].x > cubeVertices[i].x + 0.2))
				xdir = 1;
				
			if (cubeReversing[i])
				xdir *= -1;
			
			var newX = Math.random() * 0.1 * xdir;
			if (vertices[i].x < 0)
				newX *= -1;
				
			vertices[i].x += newX;
		}
		
		cube.geometry.verticesNeedUpdate = true;
		prevIndex = idx;
	}

	function Render() {
		if (sphereLoaded)
			sphere.rotation.y += 0.01;

		if (cubeLoaded) {
			// cube.rotation.x += 0.01;
			// cube.rotation.y += 0.01;
			
			AnimateCube();
		}
		renderer.render(scene, camera);
		requestAnimationFrame(Render);
	}

	AddLighting();
	LoadSphere();
	LoadSquare();
	Render();
}