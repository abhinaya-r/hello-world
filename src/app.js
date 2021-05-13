/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import {
  WebGLRenderer,
  PerspectiveCamera,
  Vector3,
  Matrix3,
  Box3,
} from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SeedScene, ArcticScene } from "scenes";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import SHUTTER from "./components/objects/Music/sounds/camera shutter.mp3";

// STYLE ELEMENTS
let style =
  '<style type="text/css">' +
  'body, p, h1, h2, h3, a { font-family: "Roboto Mono", monospace; font-weight: 400; padding: 0px; margin: 0px; color: white }' +
  "hr { border: 1px solid white; width: 80% }" +
  "button { font-size: 1.75rem; padding: 10px 20px; border: none; border-radius: 5px; background: black; color: white; font-family: inherit; cursor: pointer; margin: 0 20px; }" +
  ".hidden { visibility: hidden; width: 0px; height: 0px;}" +
  ".tundraCam { background: black !important; stroke: black !important; }"
  "</style>";

document.body.innerHTML += style;

// hide gui
// let gooey = document.getElementsByClassName("dg main a");
// Array.prototype.forEach.call(gooey, function (el) {
//   el.classList.add("hidden");
// });

// make container for game display
let display = document.createElement("div");
display.id = "display";
display.style =
  "width: 100vw; height: 100vh; position: absolute; background: radial-gradient(circle at 50%, #ffffff00 50vh, #000000dd 90vh)";
document.body.appendChild(display);

// display score
let displayScore = document.createElement("div");
displayScore.id = "displayscore";
displayScore.style =
  "position: absolute; top: 2vh; left: -3vw; width: 10vw; height:auto; font-size: 2rem; text-align: left; padding-left: 5vw; border-radius: 5px; background: #000000bb; color: white;";
displayScore.innerHTML = "SCORE<br>0";
display.appendChild(displayScore);

// console.log(document.head.innerHTML);
var score = 0;
var photoStorage = 15;
var inAlbum = false;
var currentPhoto = 0;
var album = [];
var targetAnimal;
var arcticScene = false;
// var sc = document.getElementById('displayscore');
// sc.innerHTML = "SCORE<br>" + score;

// let html2 = '<style type="text/css">' +
// 'button { font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;font-size: 14px;color: #eee;background: #222;text-align:center;margin:auto auto auto auto;border:1px solid #c4c5c6;  -webkit-border-radius: 8px; -moz-border-radius: 8px;border-radius: 8px;text-shadow: 1px 1px 0 rgba(255,255,255,0.3);background-color: #f2f5f6; background-image: -webkit-gradient(linear, left top, left bottom, from(#333), to(#222)); background-image: -webkit-linear-gradient(top, #333, #222); background-image: -moz-linear-gradient(top, #333, #222); background-image: -ms-linear-gradient(top, #333, #222); background-image: -o-linear-gradient(top, #333, #222); background-image: linear-gradient(to bottom, #333, #222); filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#333, endColorstr=#222);}' +
// '#recIcon.Rec{animation-name: pulse;animation-duration: 1.5s;animation-iteration-count: infinite;animation-timing-function: linear;}' +
// '#recIcon.notRec{background-color: darkred;}' +
// '#recIcon {width: 30px;height: 30px;margin: 0px;font-size: 0;background-color: red;border: 0;border-radius: 35px;outline: none;position: fixed;left: 95px;top: 15px;}' +
// '@keyframes pulse{0%{box-shadow: 0px 0px 5px 0px rgba(173,0,0,.3);}65%{box-shadow: 0px 0px 5px 13px rgba(173,0,0,.3);}90%{box-shadow: 0px 0px 5px 13px rgba(173,0,0,0);}}</style>'

// display number of photos left
let photosLeft = document.createElement("div");
photosLeft.id = "photosLeft";
photosLeft.style =
  "position: absolute; bottom: 2vh; left: -3vw; width: 20vw; height:auto; font-size: 2rem; text-align: left; padding-left: 5vw; border-radius: 5px; background: #000000bb; color: white;";
photosLeft.innerHTML = "15/15<br>PHOTOS LEFT";
display.appendChild(photosLeft);

// camera dot
let cameraDot = document.createElement("div");
cameraDot.id = "cameradot";
cameraDot.style =
  "height: 4px; width: 4px; background: white; border-radius: 4px; position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);";
display.appendChild(cameraDot);

// little rectangle around camera dot
// adapted from answer to https://stackoverflow.com/questions/14387690/how-can-i-show-only-corner-borders
let rect = document.createElement("div");
rect.id = "rect";
rect.style =
  "position: absolute; width: 50px; height: 50px; top: 50%; left: 50%; transform: translate(-50%, -50%);";
let rectForest = '<svg viewBox="0 0 100 100" width="50px"> \
<path d="M25,2 L2,2 L2,25" fill="none" stroke="white" stroke-width="3" /> \
<path d="M2,75 L2,98 L25,98" fill="none" stroke="white" stroke-width="3" /> \
<path d="M75,98 L98,98 L98,75" fill="none" stroke="white" stroke-width="3" /> \
<path d="M98,25 L98,2 L75,2" fill="none" stroke="white" stroke-width="3" /> \
</svg>';
let rectTundra = '<svg viewBox="0 0 100 100" width="50px"> \
<path d="M25,2 L2,2 L2,25" fill="none" stroke="black" stroke-width="3" /> \
<path d="M2,75 L2,98 L25,98" fill="none" stroke="black" stroke-width="3" /> \
<path d="M75,98 L98,98 L98,75" fill="none" stroke="black" stroke-width="3" /> \
<path d="M98,25 L98,2 L75,2" fill="none" stroke="black" stroke-width="3" /> \
</svg>';
rect.innerHTML = rectForest;
  
display.appendChild(rect);

// big rectangle around little rectangle
let rectB = document.createElement("div");
rectB.id = "rectB";
rectB.style =
  "position: absolute; width: 60vw; height: 60vh; top: 50%; left: 50%; transform: translate(-50%, -50%);";
let rectBForest = '<svg viewBox="0 0 1280 720" width="60vw" height="60vh"> \
<path d="M50,2 L2,2 L2,50" fill="none" stroke="white" stroke-width="5" /> \
<path d="M2,670 L2,718 L50,718" fill="none" stroke="white" stroke-width="5" /> \
<path d="M1230,718 L1278,718 L1278,670" fill="none" stroke="white" stroke-width="5" /> \
<path d="M1278,50 L1278,2 L1230,2" fill="none" stroke="white" stroke-width="5" /> \
</svg>';
let rectBTundra = '<svg viewBox="0 0 1280 720" width="60vw" height="60vh"> \
<path d="M50,2 L2,2 L2,50" fill="none" stroke="black" stroke-width="5" /> \
<path d="M2,670 L2,718 L50,718" fill="none" stroke="black" stroke-width="5" /> \
<path d="M1230,718 L1278,718 L1278,670" fill="none" stroke="black" stroke-width="5" /> \
<path d="M1278,50 L1278,2 L1230,2" fill="none" stroke="black" stroke-width="5" /> \
</svg>';
rectB.innerHTML = rectBForest;
display.appendChild(rectB);

// display bonus animal
let target = document.createElement("div");
target.id = "target";
target.style =
  "position: absolute; top: 2vh; right: -3vw; width: 20vw; height:auto; font-size: 2rem; text-align: right; padding-right: 5vw; border-radius: 5px; background: #000000bb; color: white;";
display.appendChild(target);

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
  var animals;
  if (arcticScene) {
    animals = ["albatross", "reindeer", "seal", "penguin"];
  }
  else {
    animals = ["stork", "deer", "bear", "fox"];
  }

  let prevTA = targetAnimal;
  let n;
  do {
    n = Math.floor(Math.random() * 3);
  } while (animals[n] === prevTA);
  targetAnimal = animals[n];
  // if (targetAnimal === "stork") {
  //   if (n == 0) {
  //     targetAnimal = "deer";
  //   } else if (n == 1) {
  //     targetAnimal = "bear";
  //   } else targetAnimal = "fox";
  // } else if (targetAnimal === "deer") {
  //   if (n == 0) {
  //     targetAnimal = "stork";
  //   } else if (n == 1) {
  //     targetAnimal = "bear";
  //   } else targetAnimal = "fox";
  // } else if (targetAnimal === "fox") {
  //   if (n == 0) {
  //     targetAnimal = "stork";
  //   } else if (n == 1) {
  //     targetAnimal = "bear";
  //   } else targetAnimal = "deer";
  // } else {
  //   if (n == 0) {
  //     targetAnimal = "stork";
  //   } else if (n == 1) {
  //     targetAnimal = "deer";
  //   } else targetAnimal = "fox";
  // }
  // var ta = document.getElementById("target");
  target.innerHTML = "BONUS ANIMAL<br>" + targetAnimal;
  // potentially increment photo storage here
};
setTargetAnimal();

// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
// const scene = new ArcticScene(camera);
var scene = new SeedScene(camera);
const renderer = new WebGLRenderer({ antialias: true });
// let view = new PointerLockControls(camera, renderer);

// Set up camera
// camera.position.set(6, 3, -10);
camera.position.set(0, 1, 10);
// camera.lookAt(new Vector3(0, 1, 10));

// HTML INTRO PAGE
// HEAD
let head = document.getElementsByTagName("head")[0];
let link = document.createElement("link");
link.type = "text/css";
link.rel = "stylesheet";
link.href =
  "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;400;700&display=swap";
head.appendChild(link);

// BODY
// faded bg
let menu = document.createElement("div");
menu.id = "menu";
menu.style =
  "width: 100vw; height: 100vh; background: #d1effe77; position: absolute; overflow: scroll;";
document.body.appendChild(menu);

// menu box
let container = document.createElement("div");
container.id = "container";
container.style =
  "width: 80vw; height: auto; display: flex; flex-direction: column; background: #000000bb; border-radius: 10px; margin: auto; margin-top: 2%; margin-bottom: 2%; align-items: center; text-align: center; padding: 10px 30px;";
container.innerHTML =
  "<br/>" +
  '<h1 style="font-size: 2rem">Hello, World!</h1>' +
  "<h3>a generative, open-world game made in ThreeJS</h3><br/><hr/><br/>" +
  "<h2>GAMEPLAY:<h2>" +
  '<h2>In "Hello, World!", you play as a nature photographer on the hunt for the best pictures! Take photographs of any animal you wish--but you are also given a bonus animal for each round. Find it! Capture it! You\'ll get a score based on how close the creature is to the center of your viewport.</h2><br/><hr/><br/>' +
  "<h2>CONTROLS:</h2>";

menu.appendChild(container);

// controls box
let ctrls = document.createElement("div");
ctrls.id = "ctrls";
ctrls.style = "display: flex; flex-direction: column; text-align: left;";
ctrls.innerHTML =
  "<h2>W,A,S,D:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp move around</h2>" +
  "<h2>SPACEBAR: toggle camera angle</h2>" +
  "<h2>ESC:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp exit toggle camera</h2>" +
  "<h2>G:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp toggle game display</h2>" +
  "<h2>I:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp take picture</h2>" +
  "<h2>M:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp play/pause music</h2>" +
  "<br/>";

container.appendChild(ctrls);

container.innerHTML += "<hr/><br/><h2>Where would you like to go?</h2><br/>"

const minVec = new THREE.Vector3(-80, -10, -50);
const maxVec = new THREE.Vector3(80, 10, 100);
const box = new THREE.Box3(minVec, maxVec);

// button container
let bc = document.createElement("div");
bc.id = "bc";
bc.style = "display: flex; flex-direction: row; width: auto";
container.appendChild(bc);

// forest start button
let forestButton = document.createElement("button");
forestButton.id = "forestButton";
forestButton.style = "margin-bottom: 20px";
forestButton.innerHTML = "Explore the Forest";

bc.appendChild(forestButton);

// arctic start button
let arcticButton = document.createElement("button");
arcticButton.id = "arcticButton";
arcticButton.style = "margin-bottom: 20px";
arcticButton.innerHTML = "Explore the Tundra";

bc.appendChild(arcticButton);

// access menu mid-game button
let menuButton = document.createElement("button");
menuButton.id = "menuButton";
menuButton.className = "hidden";
menuButton.style =
  "position: absolute; bottom: 2vh; right: 2vw; font-size: 1rem;";
menuButton.innerHTML = "Menu";

document.body.appendChild(menuButton);

// hide game display at first
display.className = "hidden";
let wasHidden = false;

// toggle display
const handleDisplay = (event) => {
  if (event.keyCode === 71) {
    display.className = wasHidden ? "" : "hidden";
    wasHidden = !wasHidden;
  }
};
window.addEventListener("keydown", handleDisplay, false);

// button event handlers
window.onload = function () {
  // start/resume game
  forestButton.addEventListener("click", function () {
    if(arcticScene) {
      arcticScene = false;
      scene = new SeedScene(camera);
      if (cameraDot.classList.contains("tundraCam")) {
        cameraDot.classList.remove("tundraCam");
        rect.innerHTML = rectForest;
        rectB.innerHTML = rectBForest;
      }
      setTargetAnimal();
    }
    menu.className = "hidden";
    display.className = wasHidden ? "hidden" : "";
    menuButton.className = "";
  });
  arcticButton.addEventListener("click", function () {
    if(!arcticScene) {
      arcticScene = true;
      scene = new ArcticScene(camera);
      cameraDot.classList.add("tundraCam");
      rect.innerHTML = rectTundra;
      rectB.innerHTML = rectBTundra;
      console.log(cameraDot.classList)
      setTargetAnimal();
    }
    menu.className = "hidden";
    display.className = wasHidden ? "hidden" : "";
    menuButton.className = "";
  });
  // goto menu
  menuButton.addEventListener("click", function () {
    menuButton.className = "hidden";
    display.className = "hidden";
    menu.className = "";
    if(arcticScene) {
      forestButton.innerHTML = "Switch to the Forest";
      arcticButton.innerHTML = "Return to the Tundra"
    }
    else {
      forestButton.innerHTML = "Return to the Forest";
      arcticButton.innerHTML = "Switch to the Tundra"
    }
  });
};

// ENDGAME MENU
// semitransparent bg
let endMenu = document.createElement("div");
endMenu.id = "endMenu";
endMenu.className = "hidden";
endMenu.style =
  "width: 100vw; height: 100vh; background: #d1effe77; position: absolute; overflow: scroll;";
document.body.appendChild(endMenu);
// container
let endContainer = document.createElement("div");
endContainer.id = "endContainer";
endContainer.style =
  "width: 80vw; height: auto; display: flex; flex-direction: column; background: #000000bb; border-radius: 10px; margin: auto; margin-top: 5%; margin-bottom: 5%; align-items: center; text-align: center; padding: 10px 30px;";
endContainer.innerHTML =
  "<br/>" +
  "<h2>Thank you for playing</h2><br/>" +
  '<h1 style="font-size: 2rem">Hello, World!</h1><br/>' +
  "<h2>Your final score is:</h2><br/>" +
  '<span id="finalscore" style="font-size: 4rem"></span><br/>' +
  '<h2 id="endblurb">WOW! You are truly a master photographer! 😳🦌📸<h2><br/>' +
  "<h2>Click the button below to play again!</h2><br/>";
endMenu.appendChild(endContainer);
// restart button
let restartButton = document.createElement("button");
restartButton.innerHTML = "Restart Game";
restartButton.style = "margin-bottom: 20px";
restartButton.onclick = function () {
  window.location.reload();
};
endContainer.appendChild(restartButton);

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
  w: 1,
  s: -1,
  a: -1,
  d: 1,
};

const handleImpactEvents = (event) => {
  if (event.target.tagName === "INPUT") {
    return;
  }

  if (event.key in keyMap) {
    const scale = 1;
    if (camera.position.x > 79) camera.position.x = 79;
    if (camera.position.x < -79) camera.position.x = -79;
    if (camera.position.z > 99) camera.position.z = 99;
    if (camera.position.z < -49) camera.position.z = -49;
    if (event.key == "w" || event.key == "s") {
      {
        controls.moveForward(keyMap[event.key]);
      }
    } else {
      if (box.containsPoint(camera.position)) {
        controls.moveRight(keyMap[event.key]);
      }
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
  let camPos = controls.getObject().position;
  var cX = camPos.x;
  var cY = camPos.y;
  var cZ = camPos.z;
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
    // console.log("axis");
    // console.log(axis);
    // console.log("angle");
    // console.log(angle);
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
  // console.log("camera direction: ");
  // console.log(cDir);
  // console.log("min vals: ");
  // console.log(minVals);
  // console.log("max vals: ");
  // console.log(maxVals);
  return true;
};

const endGame = function () {
  display.className = "hidden";
  endMenu.className = "";
  document.getElementById("finalscore").innerHTML = score;
};

// camera shutter sound
let sound = new Audio(SHUTTER);
sound.volume = 0.5;

/* take photo */
const photo = function () {
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

  // if on a menu page, do nothing
  if (menu.className === "" || endMenu.className === "") return;

  // play sound
  sound.pause();
  sound.currentTime = 0;
  sound.play();
  console.log("sound is playing?", sound.isPlaying);

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
        // console.log(animal);
        // console.log("animal position: ");
        // console.log(animal.position);
        // console.log("camera position: ");
        // console.log(camera.position);
        // var dist = animal.position.distanceTo(camera.position);
        // console.log("distance: ");

        let aPos = animal.position;
        // let camPos = camera.position;

        // console.log("x: ", controls.getObject().position.x);
        // console.log("y: ", controls.getObject().position.y);
        var dist = Math.sqrt(
          (aPos.x - controls.getObject().position.x) ** 2 +
            (aPos.y - controls.getObject().position.y) ** 2
        );
        // console.log("distance: ", dist);
        
        
        var s = 0;
        if(arcticScene) {
          if (animal.name === "albatross") {
            s += 50;
          }
          if (animal.name === "penguin") {
            s += 100;
          }
          if (animal.name === "seal") {
            s += 20;
          }
          if (animal.name === "reindeer") {
            s += 50;
          }
        }
        else {
          if (animal.name === "stork") {
            s += 100;
          }
          if (animal.name === "deer") {
            s += 50;
          }
          if (animal.name === "bear") {
            s += 20;
          }
          if (animal.name === "fox") {
            s += 50;
          }
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
  photosLeft.innerHTML = photoStorage + "/15<br>PHOTOS LEFT";
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

window.addEventListener("keyup", function (event) {
  // Ignore keypresses typed into a text box
  if (event.target.tagName == "INPUT") return;

  // if (event.key == "a") {
  //   //canvas.restore();
  //   if (inAlbum) {
  //     // close the album
  //   } else {
  //     //console.log(album);
  //     if (album.length > 0) {
  //       var c = album[currentPhoto];
  //       var ctx = canvas.getContext("2d");
  //       console.log(album[currentPhoto]);
  //       console.log(ctx);
  //       ctx.drawImage(c, 0, 0);
  //       inAlbum = true;
  //     }
  //   }
  // }

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
