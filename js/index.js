var container, stats;
var camera, scene, renderer;

var radius = 100, theta = 0;
var object;

var objects = [];

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  var ambientLight = new THREE.AmbientLight( 0xffffff );
  scene.add (ambientLight);

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 50, 50, 50 ).normalize();
  scene.add( light );

  // Model/material loading!

	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("Tree/Treewqithleafs.mtl", function(materials){

		materials.preload();

    var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);

		objLoader.load("Tree/Treewqithleafs.obj", function(mesh){
			mesh.traverse(function(node){
				if( node instanceof THREE.Mesh ){
          node.material.side = THREE.DoubleSide; // Makes mesh material render double sided (disables backface culling)
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});
			scene.add(mesh);
			  mesh.position.set(5, -20, -100);
		});
	});

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//
function animate() {
  requestAnimationFrame( animate );

  render();
}

function render() {
  theta += 0.01;
  camera.lookAt( scene.position );
  camera.updateMatrixWorld();

  renderer.render( scene, camera );
}
