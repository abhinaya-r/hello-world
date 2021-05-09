/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SeedScene } from "scenes";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

let html = '<style type="text/css">' + 
'.score { position: absolute; top: 5%; left: 5%; width: 10%; height:10%; z-index: 100000000; font-size: 40px; color: yellow; -webkit-test-stroke: 2px white}</style>' + 
 '<div class="score" id="displayscore"> SCORE<br>0</div> ';
// console.log(document.head.innerHTML);
document.body.innerHTML += html;
var score = 0;
var photoStorage = 5;
var inAlbum = false;
var currentPhoto = 0;
var album = [];
// var sc = document.getElementById('displayscore');
// sc.innerHTML = "SCORE<br>" + score;

// let html2 = '<style type="text/css">' + 
// 'button { font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;font-size: 14px;color: #eee;background: #222;text-align:center;margin:auto auto auto auto;border:1px solid #c4c5c6;  -webkit-border-radius: 8px; -moz-border-radius: 8px;border-radius: 8px;text-shadow: 1px 1px 0 rgba(255,255,255,0.3);background-color: #f2f5f6; background-image: -webkit-gradient(linear, left top, left bottom, from(#333), to(#222)); background-image: -webkit-linear-gradient(top, #333, #222); background-image: -moz-linear-gradient(top, #333, #222); background-image: -ms-linear-gradient(top, #333, #222); background-image: -o-linear-gradient(top, #333, #222); background-image: linear-gradient(to bottom, #333, #222); filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#333, endColorstr=#222);}' +
// '#recIcon.Rec{animation-name: pulse;animation-duration: 1.5s;animation-iteration-count: infinite;animation-timing-function: linear;}' + 
// '#recIcon.notRec{background-color: darkred;}' +
// '#recIcon {width: 30px;height: 30px;margin: 0px;font-size: 0;background-color: red;border: 0;border-radius: 35px;outline: none;position: fixed;left: 95px;top: 15px;}' +
// '@keyframes pulse{0%{box-shadow: 0px 0px 5px 0px rgba(173,0,0,.3);}65%{box-shadow: 0px 0px 5px 13px rgba(173,0,0,.3);}90%{box-shadow: 0px 0px 5px 13px rgba(173,0,0,0);}}</style>' 
let html2 = '<style type="text/css">' + 
'.dot {height: 10px; width: 10px;background-color: yellow;position:absolute;top:50%;left:50%}</style>' +
'<div class="dot" id="cameradot"></div> ';
document.body.innerHTML += html2;


// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
const scene = new SeedScene(camera);
const renderer = new WebGLRenderer({ antialias: true });
// let view = new PointerLockControls(camera, renderer);

// Set up camera
// camera.position.set(6, 3, -10);
camera.position.set(0, 1, 10);
// camera.lookAt(new Vector3(0, 1, 10));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = "block"; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = "hidden"; // Fix scrolling
document.body.appendChild(canvas);



// Set up controls
// const controls = new OrbitControls(camera, canvas);
const controls = new PointerLockControls(camera, canvas);
// controls.lock();
controls.connect();
// controls.enableDamping = true;
// controls.enablePan = false;
// // controls.minDistance = 4;
// // controls.maxDistance = 16;
// controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
  // controls.update();
  renderer.render(scene, camera);
  scene.update && scene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener("resize", windowResizeHandler, false);

//HANDLE MOVING CAMERA
// let control = PointerLockControls(camera);
const keyMap = {
  ArrowUp: 1,
  ArrowDown: -1,
  ArrowLeft: -1,
  ArrowRight: 1,
};

const handleImpactEvents = (event) => {
  if (event.target.tagName === "INPUT") {
    return;
  }

  if (event.key in keyMap) {
    const scale = 1;
    if (event.key == "ArrowUp" || event.key == "ArrowDown") {
      controls.moveForward(keyMap[event.key]);
    } else {
      controls.moveRight(keyMap[event.key]);
    }
  }
  if (event.code == "Space") {
    controls.lock();
  }
};
const handleControls = (event) => {
  if (event == "onmousemove") {
    console.log("on mouse move");
    controls.onMouseMove(event);
  } else if (event == "pointerlockchange") {
    console.log("pointerlockchange");
    controls.onPointerlockChange();
  } else if (event == "pointerlockerror") {
    console.log("pointerlockerror");
    controls.onPointerlockError();
  }
};

window.addEventListener("keydown", handleImpactEvents, false);

window.addEventListener("onmousemove", handleControls, false);
window.addEventListener("pointerlockchange", handleControls, false);
window.addEventListener("pointerlockerror", handleControls, false);

const inFrame = function(animal) {
  var aX = animal.position.x;
  var aY = animal.position.y;
  var aZ = animal.position.z;
  var cX = camera.position.x;
  var cY = camera.position.y;
  var cZ = camera.position.z;
  var cH = camera.getFilmHeight();
  var cW = camera.getFilmWidth();
  
  if(aX < cX - (cW/2) || aX > cX + (cW/2)) {
    return false;
  }
  if(aY < cY - (cH/2) || aY > cY + (cH/2)) {
    return false;
  }
  if (aZ > cZ || aZ < cZ-(1.5*camera.getFocalLength())) {
    return false;
  }
  return true;
}

/* take photo */
const photo = function(filename) {
  // get the image data

  // take the photo
    // stretch goal: save and display the photo 
    // save the screenshots that you've taken in some folder!
    // album icon in menu that when you click on it you can see
    // all the images in that folder

  // try {
  //   var dataURL = Scene.renderer.domElement.toDataURL();
  // } catch (err) {
  //   alert("Sorry, your browser does not support capturing an image.");
  //   return;
  // }

  //var animals = scene.getAnimals();
  var animals = scene.animals;
  console.log(camera.getFilmWidth());
  for (var i = 0; i < animals.length; i++) {
    var currentAnimals = animals[i];
    for (var j = 0; j < currentAnimals.length; j++) {
      // if animal is in view of the camera (within the x/y coords of camera view) then grade by distance from center
      var animal = currentAnimals[j];
      if(inFrame(animal)) {
        console.log(animal);
        console.log(animal.position);
        console.log(camera.position);
        var dist = animal.position.distanceTo(camera.position);
        var h = camera.getFilmHeight();
        if (h - dist > 0) {
          score += Math.floor(h - dist) * 10;
          // console.log(currentAnimals[j]);
          // console.log(dist);
          // console.log(h);
        }
      }
    }
  }
  //console.log(score);
  var sc = document.getElementById('displayscore');
  sc.innerHTML = "SCORE<br>" + score;

  photoStorage--;
  if (photoStorage <= 0) {
    endGame();
  }

  var can = renderer.domElement;
  var img = new Image();
  img.src = can.toDataURL();

  album.push(img);
  //album.push(renderer.domElement);
  // console.log(album);
  // console.log(img.src);
  // console.log(can.toDataURL());

  // Create a download link and click it
  // let link = document.createElement('a');
  // link.download = Renderer.promptForFilename(".png");
  // link.href = dataURL;
  // link.click();

  // var exportFolder = Folder ((app.activeDocument.path.parent) + "/PNG")
  // if (!exportFolder.exists) exportFolder.create ()
  // app.activeDocument.exportDocument (File(exportFolder + "/" + app.activeDocument.name + ".png"),ExportType.SAVEFORWEB, link )  

  // this will force downloading data as an image (rather than open in new window)
  // const url = dataURL.replace(/^data:image\/[^;]/, "data:application/octet-stream");
  // window.open(url);
};


window.addEventListener("keydown", function(event) {
  // Ignore keypresses typed into a text box
  if (event.target.tagName == "INPUT") return;

  if(event.key == "a") {
    //canvas.restore();
    if(inAlbum) {
      // close the album
    }
    else {
      //console.log(album);
      if(album.length > 0) {
        var c = album[currentPhoto];
        var ctx = canvas.getContext('2d');
        console.log(album[currentPhoto]);
        console.log(ctx);
        ctx.drawImage(c,0,0);
        inAlbum = true;
      }
    }
  }

  // if(event.key = "ArrowLeft") {
  //   if(inAlbum) {
  //     if(currentPhoto > 0) {
  //       //album[--currentPhoto].draw();
  //     }
  //     else {
  //       //album[album.length - 1].draw();
  //       //currentPhoto = album.length -1;
  //     }
  //   }
  // }

  // if(event.key = "ArrowRight") {
  //   if(inAlbum) {
  //     if(currentPhoto < album.length - 1) {
  //       //album[++currentPhoto].draw();
  //     }
  //     else {
  //       //album[0].draw();
  //       //currentPhoto = 0;
  //     }
  //   }
  // }

  // if 'I' was released, download the image
  if (event.key == "i") {
    // document.getElementById("recIcon").classList.add("Rec");
    // document.getElementById("recIcon").classList.remove("notRec");
    // setTimeout(() => {photo();
    //                   document.getElementById("recIcon").classList.add("notRec");
    //                   document.getElementById("recIcon").classList.remove("Rec");},1000);
    photo();
  }
});