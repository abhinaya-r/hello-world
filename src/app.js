/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Box2 } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SeedScene } from "scenes";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";


// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
const scene = new SeedScene(camera);
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
link.href = "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap";
head.appendChild(link);

// BODY
// faded bg
let menu = document.createElement("div");
menu.id = "menu";
menu.style = "width: 100vw; height: 100vh; background: #d1effe77; position: absolute;";

let style = '<style type="text/css">' + 
'body, p, h1, h2, h3, a { font-family: "Roboto Mono", monospace; font-weight: 400; padding: 0px; margin: 0px; color: #244514 }' +
'hr { border: 1px solid #377618; width: 80% }' +
'button { font-size: 1.75rem; padding: 10px 20px; border: none; border-radius: 5px; background: #377618; color: #9dff66; font-family: inherit; cursor: pointer; }' +
'.hidden { visibility: hidden; width: 0px; height: 0px;}' +
'</style>';

document.body.innerHTML = style;
document.body.appendChild(menu);

// menu box
let container = document.createElement("div");
container.id = "container";
container.style = "width: 80vw; height: 80vh; display: flex; flex-direction: column; background: #9dff66; border-radius: 10px; margin: auto; margin-top: 5%; align-items: center; text-align: center; padding: 10px 30px; overflow: scroll;";
container.innerHTML = '<br/>' + 
'<h1 style="font-size: 2rem">Hello, World!</h1>' + 
'<h3>a generative, open-world game made in ThreeJS</h3><br/><hr/><br/>' + 
'<h2>GAMEPLAY:<h2>' +
'<h2>In "Hello, World!", you play as a nature photographer on the hunt for the best pictures! Take photographs of any animal you wish--but you are also given a bonus animal for each round, which will earn you more points. Find it! Capture it! You\'ll get a score based on how close the animal is to the center of your viewport.</h2><br/><hr/><br/>' +
'<h2>CONTROLS:</h2>';

menu.appendChild(container);

// controls box
let ctrls = document.createElement("div");
ctrls.id = "ctrls";
ctrls.style = "display: flex; flex-direction: column; text-align: left;";
ctrls.innerHTML = '<h2>UP ARROW:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp move forward</h2>' +
'<h2>DOWN ARROW:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp move backward</h2>' +
'<h2>LEFT ARROW:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp move left</h2>' +
'<h2>RIGHT ARROW:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp move right</h2>' +
'<h2>SPACEBAR:&nbsp&nbsp&nbsp toggle camera angle</h2>' +
'<h2>D:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp toggle game display</h2>' + 
'<h2>I:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp take picture</h2>' + 
'<h2>M:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp play/pause music</h2>' +
'<br/>';

container.appendChild(ctrls);

// start button
let startButton = document.createElement("button");
startButton.id = "startButton";
startButton.innerHTML = "Start Game";

container.appendChild(startButton);

// access menu mid-game button
let menuButton = document.createElement("button");
menuButton.id = "menuButton";
menuButton.className = "hidden";
menuButton.style = "position: absolute; bottom: 2vh; right: 2vw; font-size: 1rem;";
menuButton.innerHTML = "Menu";

document.body.appendChild(menuButton);

// click startButton to start, menuButton to return to menu
window.onload = function() {
  startButton.addEventListener("click", function() {
    menu.className = "hidden";
    menuButton.className = "";
  })
  menuButton.addEventListener("click", function() {
    menuButton.className = "hidden";
    menu.className = "";
    startButton.innerHTML = "Return to Game";
  })
}

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
