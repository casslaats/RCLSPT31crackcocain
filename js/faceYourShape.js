
  var positions;
  var distanceMouth;
  var i = 0;
  var ctracker = new clm.tracker({useWebGL : true});
  var averageValue = [];
  var shapeValue = 0;
  var timer = 0;
  var shapeChoice;
  var graphicSwitch = false;
  var renderer = new THREE.WebGLRenderer( { alpha: true } );;
  var shapeReturn;
  var rotation = 0;
  var videoInput;

function replaceFace(){
  videoInput = document.getElementById('inputVideo');
  ctracker.init(pModel);
  getVideo();
  ctracker.start(videoInput);
  drawLoop();
}

function drawLoop() {
    positions = ctracker.getCurrentPosition();  
    var canvasInput = document.getElementById('drawCanvas');
    var cc = canvasInput.getContext('2d');
    
    requestAnimationFrame(drawLoop);
    // var pos0 = positions[0];
    var pos1 = positions[1];
    console.log(pos1);
    // var pos2 = positions[2];
    // var pos7 = positions[7];

    var pos13 = positions[13];
    // var pos14 = positions[14];

    // var pos25 = positions[25];
    var pos27 = positions[27];

    // var pos30 = positions[30];
    var pos32 = positions[32];

    // var pos37 = positions[37];

    var pos44 = positions[44];
    var pos50 = positions[50];

    var pos41 = positions[41];

    // var pos62 = positions[62];
    
    

    cc.clearRect(0, 0, canvasInput.width, canvasInput.height);

    // if (graphicSwitch == false) {
      cc.strokeStyle = "#FF000F";
      cc.beginPath();
      cc.moveTo(pos44[0], pos44[1]);
      cc.lineTo(pos50[0],pos50[1]);
      cc.closePath();
      cc.stroke();

      cc.strokeStyle = "#91FF00";
      cc.beginPath();
      cc.moveTo(pos27[0],pos27[1]);
      cc.lineTo(pos32[0],pos32[1]);
      cc.closePath();
      cc.stroke();
      

/*GET DISTANCE OF CERTAIN POINTS*/

      distanceMouth = lineDistance(pos44[0],pos44[1],pos50[0],pos50[1]);
      var templeDistance = document.getElementById('templeDistance');
      templeDistance.innerHTML = distanceMouth;

      distanceEyes = lineDistance(pos27[0],pos27[1],pos32[0],pos32[1]);
      var eyeDistance = document.getElementById('eyeDistance');
      eyeDistance.innerHTML = distanceEyes;

      var total = document.getElementById('TOTAL');  
      shapeValue = getAverageValue(distanceMouth / distanceEyes);
      total.innerHTML = shapeValue;
    // }

    timer++;
    if(timer == 400){

      shapeChoice = getShape(shapeValue);
    }

/*DRAW GRAPHIC ON FACE*/
    if (graphicSwitch == true) { 

      if(shapeChoice == "square") 
      {   
         drawShape(shapeChoice, pos41[0],pos41[1], lineDistance(pos1[0],pos1[1],pos13[0],pos13[1]));
      }
      else if(shapeChoice == "triangle"){
        drawShape(shapeChoice, pos41[0],pos41[1], lineDistance(pos1[0],pos1[1],pos13[0],pos13[1]));
      }
      else if(shapeChoice == "circle"){
          drawShape(shapeChoice, pos41[0],pos41[1], lineDistance(pos1[0],pos1[1],pos13[0],pos13[1]));
      }
    }

}


function getVideo(){
  videoInput = document.getElementById('inputVideo');
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
  // check for camerasupport
  if (navigator.getUserMedia) {
    // set up stream
    var videoSelector = {video : true};
    if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
      var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
      if (chromeVersion < 20) {
        videoSelector = "video";
      }
    }
    navigator.getUserMedia(videoSelector, function( stream ) {
      if (videoInput.mozCaptureStream) {
        videoInput.mozSrcObject = stream;
      } 
      else {
        videoInput.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
      }
      videoInput.play();
    }, function() {
      alert("We weren't able to find your webcam, maybe your mexican druglord stole it?");
    });
  } 
  else {
    alert("Your browser doesn't support getUserMedia :( sorry bro!");
  }
}


function lineDistance( x1,y1,x2,y2 ){
  var distance = 0;

  if(y1 == y2){
    distance = x2 - x1;
  }
  else{
    var A = Math.abs(y2-y1);
    var B = Math.abs(x2-x1);
    var C = (A*A)+(B*B);
    distance = Math.sqrt(C);
  }
  return distance;
}


function getAverageValue(value){
  averageValue.unshift(value);
  averageValue = averageValue.slice(0,1000);
  var average = 0;
  for (var x= 0 ; x<averageValue.length; x++){
      average = average + averageValue[x];
  }
  // console.log(averageValue.length);
  // console.log(average);
  average = average/averageValue.length;
  return average;
}

function getShape(faceShape){
  shapeReturn = "";
  graphicSwitch = true;

  if (faceShape < 0.70){
     // console.log("triangle");
     shapeReturn = "triangle";
     return shapeReturn;
   } 
   else if (faceShape >= 0.70 && faceShape< 0.85){
     // console.log("square");
     shapeReturn = "square";
     return shapeReturn;
   } 
   else if (faceShape >= 0.85){
     // console.log("circle");
     shapeReturn = "circle";
     return shapeReturn;
  }
}

function drawShape(shapeChoice,posx,posy,getRadius){


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
    var radius = getRadius,
        segments = 16,
        rings = 16;

    // create a new mesh with
    // sphere geometry - we will cover
    // the sphereMaterial next!
    if(shapeChoice == "circle"){
      var sphere = new THREE.Mesh(

      new THREE.SphereGeometry(
        radius,
        segments,
        rings),

      sphereMaterial);
      sphere.position.x = (posx -400);
      if(posy>=300){
        sphere.position.y = -Math.abs(posy)+300;
      }
      if(posy == 150){
        sphere.position.y = posy;
      }
      if(posy >150 && posy <300){
        sphere.position.y = 300-posy;
      }
      if(posy < 150){
        sphere.position.y = 300-posy;
      }
      rotation = rotation + 0.01;
      // console.log(rotation);
      sphere.rotation.y = rotation;
      sphere.rotation.x = rotation;
      // add the sphere to the scene
      scene.add(sphere);
    }
    else if(shapeChoice == "square"){
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
      // console.log(rotation);
      cube.rotation.y = rotation;
      cube.rotation.x = rotation;
      // add the sphere to the scene
      scene.add(cube);
    }
    else if(shapeChoice == "triangle"){
      var triangle = new THREE.Mesh(

      new THREE.TetrahedronGeometry(
        radius,
        detail),

      sphereMaterial);
      triangle.position.x = (posx -400);
      if(posy>=300){
        triangle.position.y = -Math.abs(posy)+300;
      }
      if(posy == 150){
        triangle.position.y = posy;
      }
      if(posy >150 && posy <300){
        triangle.position.y = 300-posy;
      }
      if(posy < 150){
        triangle.position.y = 300-posy;
      }

      rotation = rotation + 0.01;
      // console.log(rotation);
      triangle.rotation.y = rotation;
      triangle.rotation.x = rotation;
    // add the sphere to the scene
    scene.add(triangle);
    }


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


