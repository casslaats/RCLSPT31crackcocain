
  var rotation = 0;
function drawCube(posx,posy,getRadius){


  var WIDTH = 800,
      HEIGHT = 600;


      var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

    var $container = $('#container');
    var camera =
      new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);

    var scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);

    // the camera starts at 0,0,0
    // so pull it back
    camera.position.z = 720;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);


    // create the sphere's material
    var sphereMaterial =
      new THREE.MeshLambertMaterial(
        {
          color: 0xCC0000
        });


    // set up the sphere vars
    var radius = getRadius;
        segments = 16,
        rings = 16;

    var detail = 0;
    // create a new mesh with
    // sphere geometry - we will cover
    // the sphereMaterial next!
    var cube = new THREE.Mesh(

      new THREE.BoxGeometry(
        getRadius,getRadius,getRadius),

      sphereMaterial);
    cube.position.x = (posx -400);
    if(posy>=300){
      cube.position.y = -Math.abs(posy)+300;
    }
    if(posy == 150){
      cube.position.y = posy;
    }
    if(posy >150 && posy <300){
      cube.position.y = 300-posy;
    }
    if(posy < 150){
      cube.position.y = 300-posy;
    }
    rotation = rotation + 0.01;
    console.log(rotation);
    cube.rotation.y = rotation;
    cube.rotation.x = rotation;
    // add the sphere to the scene
    scene.add(cube);

    // create a point light
    var pointLight =
      new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 200;
    pointLight.position.z = 230;

    // add to the scene
    scene.add(pointLight);

    renderer.render(scene, camera);
  }