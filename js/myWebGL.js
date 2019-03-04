window.onload = function () {

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer({ alpha: true });
	var sphere;
	var cubes = [];
	var scales = [];
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

	function FirstCube() {
		BuildCube();

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

	function BreatheCube(cube, scale) {

		if (cube.scale.x > 5) scale.x = -(Math.random() * 0.1353);
		else if (cube.scale.x < 0.2) scale.x = Math.random() * 0.1332;

		if (cube.scale.y > 5) scale.y = -(Math.random() * 0.11112);
		else if (cube.scale.y < 0.2) scale.y = Math.random() * 0.14;

		if (cube.scale.z > 5) scale.z = -(Math.random() * 0.11);
		else if (cube.scale.z < 0.2) scale.z = Math.random() * 0.12;

		cube.scale.x += scale.x;
		cube.scale.y += scale.y;
		cube.scale.z += scale.z;
	}

	function Render() {
		if (sphereLoaded)
			sphere.rotation.y += 0.01;

		if (cubeLoaded)
		{
			for (var i = 0; i < cubes.length; i++)
			{
				var cube = cubes[i];
				var scale = scales[i];
				
				cube.rotation.x += (Math.random() * 0.0127576) + 0.01;
				cube.rotation.y += (Math.random() * 0.02213124) + 0.01;
				cube.rotation.z += (Math.random() * 0.01555322313124) + 0.01;

				BreatheCube(cube, scale);
			}
		}
		renderer.render(scene, camera);
		requestAnimationFrame(Render);
	}

	function BuildCube() {
		var w = 10; var h = 10; var d = 10;
		var geometry = new THREE.BoxGeometry(w, h, d);
		var material = new THREE.MeshNormalMaterial();
		var cubeVertices = [];
		var scale = { "x": 0.01, "y": 0.01, "z": 0.01 }

		cube = new THREE.Mesh(geometry, material);
		cube.position.x = (Math.random() * 200) - 100;
		cube.position.y = (Math.random() * 100) - 50;
		cube.position.z = -20;
		cube.name = "cube" + cubes.length;
		scene.add(cube);

		for (var i = 0; i < cube.geometry.vertices.length; i++)
		{
			vector = cube.geometry.vertices[i];
			cubeVertices.push({ "x": vector.x, "y": vector.y, "z": vector.z });
		}

		scales.push(scale);
		cubes.push(cube);
	}

	function KillRandomCube() {
		var idx = Math.round(Math.random() * cubes.length);
		var name = cubes[idx].name;
		var obj = scene.getObjectByName(name);
		cubes.splice(idx, 1);
		scales.splice(idx, 1);
		scene.remove(obj);
	}

	document.getElementById("spawnCube").addEventListener("click", function () {
		BuildCube();
	});
	document.getElementById("killCube").addEventListener("click", function () {
		KillRandomCube();
	});

	AddLighting();
	LoadSphere();
	FirstCube();
	Render();
}