/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Matrix3 } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SeedScene } from "scenes";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

let html =
  '<style type="text/css">' +
  ".score { position: absolute; top: 5%; left: 5%; width: 10%; height:10%; z-index: 100000000; font-size: 40px; color: yellow; -webkit-test-stroke: 2px white}</style>" +
  '<div class="score" id="displayscore"> SCORE<br>0</div> ';
// console.log(document.head.innerHTML);
document.body.innerHTML += html;
var score = 0;
var photoStorage = 8;
var inAlbum = false;
var currentPhoto = 0;
var album = [];
var targetAnimal;
// var sc = document.getElementById('displayscore');
// sc.innerHTML = "SCORE<br>" + score;

// let html2 = '<style type="text/css">' +
// 'button { font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;font-size: 14px;color: #eee;background: #222;text-align:center;margin:auto auto auto auto;border:1px solid #c4c5c6;  -webkit-border-radius: 8px; -moz-border-radius: 8px;border-radius: 8px;text-shadow: 1px 1px 0 rgba(255,255,255,0.3);background-color: #f2f5f6; background-image: -webkit-gradient(linear, left top, left bottom, from(#333), to(#222)); background-image: -webkit-linear-gradient(top, #333, #222); background-image: -moz-linear-gradient(top, #333, #222); background-image: -ms-linear-gradient(top, #333, #222); background-image: -o-linear-gradient(top, #333, #222); background-image: linear-gradient(to bottom, #333, #222); filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#333, endColorstr=#222);}' +
// '#recIcon.Rec{animation-name: pulse;animation-duration: 1.5s;animation-iteration-count: infinite;animation-timing-function: linear;}' +
// '#recIcon.notRec{background-color: darkred;}' +
// '#recIcon {width: 30px;height: 30px;margin: 0px;font-size: 0;background-color: red;border: 0;border-radius: 35px;outline: none;position: fixed;left: 95px;top: 15px;}' +
// '@keyframes pulse{0%{box-shadow: 0px 0px 5px 0px rgba(173,0,0,.3);}65%{box-shadow: 0px 0px 5px 13px rgba(173,0,0,.3);}90%{box-shadow: 0px 0px 5px 13px rgba(173,0,0,0);}}</style>'
let html2 =
  '<style type="text/css">' +
  ".dot {height: 10px; width: 10px;background-color: yellow;position:absolute;top:50%;left:50%}</style>" +
  '<div class="dot" id="cameradot"></div> ';
document.body.innerHTML += html2;

let html3 =
  '<style type="text/css">' +
  ".targetanimal { text-align: right; position: absolute; top: 5%; right: 5%; width: 40%; height:10%; z-index: 100000000; font-size: 40px; color: yellow; -webkit-test-stroke: 2px white}</style>" +
  '<div class="targetanimal" id="target"></div> ';
document.body.innerHTML += html3;

const setTargetAnimal = function () {
  // var n = Math.floor(Math.random()*3);
  // if (n == 0) {
  //   targetAnimal = "stork";
  // }
  // else if (n == 1) {
  //   targetAnimal = "deer";
  // }
  // else {
  //   targetAnimal = "bear";
  // }
  var n = Math.floor(Math.random() * 2);
  if (targetAnimal === "stork") {
    if (n == 0) {
      targetAnimal = "deer";
    } else if (n == 1) {
      targetAnimal = "bear";
    }
  } else if (targetAnimal === "deer") {
    if (n == 0) {
      targetAnimal = "stork";
    } else if (n == 1) {
      targetAnimal = "bear";
    }
  } else {
    if (n == 0) {
      targetAnimal = "stork";
    } else if (n == 1) {
      targetAnimal = "deer";
    }
  }
  var ta = document.getElementById("target");
  ta.innerHTML = "TARGET ANIMAL<br>" + targetAnimal;
  // potentially increment photo storage here
};
setTargetAnimal();

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

var oDir = new THREE.Vector3(); // original direction of controls
controls.getDirection(oDir);

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

const inFrame = function (animal) {
  var cDir = new THREE.Vector3();
  controls.getDirection(cDir);
  var aX = animal.position.x;
  var aY = animal.position.y;
  var aZ = animal.position.z;
  var cX = camera.position.x;
  var cY = camera.position.y;
  var cZ = camera.position.z;
  var cH = camera.getFilmHeight();
  var cW = camera.getFilmWidth();
  var minVals = new THREE.Vector3(
    cX - cW / 2,
    cY - cH / 2,
    cZ - 1.5 * camera.getFocalLength()
  );
  var maxVals = new THREE.Vector3(cX + cW / 2, cY + cH / 2, cZ);

  if (cDir.equals(oDir)) {
    // if no rotation happened
    if (aX < minVals.x || aX > maxVals.x) {
      return false;
    }
    if (aY < minVals.y || aY > maxVals.y) {
      return false;
    }
    if (aZ < minVals.z || aZ > maxVals.z) {
      return false;
    }
    console.log(cDir);
  } else {
    // console.log(oDir);
    // console.log(cDir);
    var cosT = oDir.dot(cDir) / (oDir.length() * cDir.length());
    var axis = oDir.clone().cross(cDir).normalize();
    var angle = Math.acos(cosT);
    // console.log(cosT);
    console.log("axis");
    console.log(axis);
    console.log("angle");
    console.log(angle);
    // var sinT = Math.sqrt(1-cosT*cosT);
    // const C = 1-cosT;
    // const rotMat = new Matrix3();
    // rotMat.set();
    minVals.applyAxisAngle(axis, angle);
    maxVals.applyAxisAngle(axis, angle);

    if (minVals.x < maxVals.x) {
      if (aX < minVals.x || aX > maxVals.x) {
        return false;
      }
    } else {
      if (aX < maxVals.x || aX > minVals.x) {
        return false;
      }
    }
    if (minVals.y < maxVals.y) {
      if (aY < minVals.y || aY > maxVals.y) {
        return false;
      }
    } else {
      if (aY < maxVals.y || aY > minVals.y) {
        return false;
      }
    }
    if (minVals.z < maxVals.z) {
      if (aZ < minVals.z || aZ > maxVals.z) {
        return false;
      }
    } else {
      if (aZ < maxVals.z || aZ > minVals.z) {
        return false;
      }
    }
  }
  console.log("camera direction: ");
  console.log(cDir);
  console.log("min vals: ");
  console.log(minVals);
  console.log("max vals: ");
  console.log(maxVals);
  return true;
};

/* take photo */
const photo = function (filename) {
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
  var targetFound = false;
  //console.log(camera.getFilmWidth());
  for (var i = 0; i < animals.length; i++) {
    var currentAnimals = animals[i];
    for (var j = 0; j < currentAnimals.length; j++) {
      // if animal is in view of the camera (within the x/y coords of camera view) then grade by distance from center
      var animal = currentAnimals[j];
      if (inFrame(animal)) {
        console.log(animal);
        console.log("animal position: ");
        console.log(animal.position);
        console.log("camera position: ");
        console.log(camera.position);
        var dist = animal.position.distanceTo(camera.position);
        console.log("distance: ");
        console.log(dist);

        var s = 0;
        if (animal.name === "stork") {
          s += 10;
        }
        if (animal.name === "deer") {
          s += 50;
        }
        if (animal.name === "bear") {
          s += 100;
        }
        var h = camera.getFilmHeight();
        if (h - dist > 0) {
          s += Math.floor(h - dist) * 10;
          // console.log(currentAnimals[j]);
          // console.log(dist);
          // console.log(h);
        }
        if (animal.name === targetAnimal) {
          s *= 3;
          targetFound = true;
        }
        score += s;
      }
    }
  }
  if (targetFound) setTargetAnimal();

  //console.log(score);
  var sc = document.getElementById("displayscore");
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

window.addEventListener("keydown", function (event) {
  // Ignore keypresses typed into a text box
  if (event.target.tagName == "INPUT") return;

  if (event.key == "a") {
    //canvas.restore();
    if (inAlbum) {
      // close the album
    } else {
      //console.log(album);
      if (album.length > 0) {
        var c = album[currentPhoto];
        var ctx = canvas.getContext("2d");
        console.log(album[currentPhoto]);
        console.log(ctx);
        ctx.drawImage(c, 0, 0);
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
