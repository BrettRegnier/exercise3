window.onload = Init();

function Init() {
	var colors = [0x05A8AA, 0xB8D5B8, 0xD7B49E, 0xDC602E, 0xBC412B, 0xF19C79, 0xCBDFBD, 0xF6F4D2, 0xD4E09B, 0xFFA8A9, 0xF786AA, 0xA14A76, 0xBC412B, 0x63A375, 0xD57A66, 0x731A33, 0xCBD2DC, 0xDBD48E, 0x5E5E5E];
	var scene, camera, renderer, geometry, mesh;

	var verticePositions = [];

	function initScene() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		camera.position.z = 100;
	};

	function initLighting() {
		// so many lights
		var light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 1, 0);
		scene.add(light);

		var light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(0, -1, 0);
		scene.add(light);

		var light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 0, 0);
		scene.add(light);

		var light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(0, 0, 1);
		scene.add(light);

		var light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 0, -1);
		scene.add(light);

		var light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(-1, 0, 0);
		scene.add(light);
	}

	function initGeometry() {
		// add icosahedron
		geometry = new THREE.IcosahedronGeometry(20);
		for (var i = 0; i < geometry.faces.length; i++)
		{
			var face = geometry.faces[i];
			face.color.setHex(colors[i]);
		}

		mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors }));
		scene.add(mesh);
	}


	function render(time) {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		geometry.verticesNeedUpdate = true;
	};

	function getOriginalVerticePositions() {
		for (var i = 0, l = geometry.vertices.length; i < l; i++)
		{
			verticePositions.push({ x: geometry.vertices[i].x, y: geometry.vertices[i].y });
		}
	}

	function getNewVertices() {
		var newVertices = [];
		for (var i = 0, l = geometry.vertices.length; i < l; i++)
		{
			newVertices[i] = {
				x: verticePositions[i].x - 5 + Math.random() * 10,
				y: verticePositions[i].y - 5 + Math.random() * 10
			}
		}
		return newVertices;
	}

	function tweenIcosahedron() {
		var newVerticePositions = getNewVertices();
		for (var i = 0; i < geometry.vertices.length; i++)
		{
			tweenVertice(i, newVerticePositions);
		}
	}

	function tweenVertice(i, newVerticePositions) {
		TweenLite.to(geometry.vertices[i], 1, {
			x: newVerticePositions[i].x, y: newVerticePositions[i].y, ease: Back.easeInOut, onComplete: function () {
				if (i === 0) tweenIcosahedron();
			}
		});
	}

	function resize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	initScene();
	initLighting();
	initGeometry();
	resize();
	getOriginalVerticePositions();
	render();
	window.addEventListener("resize", resize);

	tweenIcosahedron();

}