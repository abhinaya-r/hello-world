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
import { PointLightShadow } from "three/src/lights/PointLightShadow";

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
  if (event.key == "c") {
    photo();
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


var score = 0;
var photoStorage = 15;

/* take photo */
const photo = function(filename) {
  // get the image data

  // take the photo
    // stretch goal: save and display the photo 
    // save the screenshots that you've taken in some folder!
    // album icon in menu that when you click on it you can see
    // all the images in that folder

  // try {
  //   var dataURL = document.getElementById("canvas").toDataURL();
  // } catch (err) {
  //   alert("Sorry, your browser does not support capturing an image.");
  //   return;
  // }
  // var targetPosition = new THREE.Vector3();
    // targetPosition = targetPosition.setFromMatrixPosition( animals[i].matrixWorld );
    // var lookAt = camera.getWorldDirection();
    // var cameraPos = new THREE.Vector3().setFromMatrixPosition( camera.matrixWorld );
    // var pos = targetPosition.sub( cameraPos );
    // let behind = ( pos.angleTo( lookAt ) ) > ( Math.PI / 2 );
    // console.log("behind: ", behind);

          // if (animals[i].position.z > cameraPos.z + 40 && !behind) {
    //   var threshold = 1;
    //   var positionScreenSpace = animals[i].position.clone().project(camera);
    //   positionScreenSpace.setZ(0);

      // var isCloseToCenter = positionScreenSpace.length() < threshold;
      // console.log("animal ", animals[i].name, ": close to center: ", isCloseToCenter);

    // }
    // Your 3d point to check
    // var pos = animals[i].position;
    // if (frustum.containsPoint(pos)) {
    //     animalsInFrame.push(animals[i]);
    // }
  console.log("picture taken")
  let animalsInFrame = [];
  let animals = scene.animals;
  let cameraPos = camera.position;
  for (var i = 0; i < animals.length; i++) {
    camera.updateMatrix(); // make sure camera's local matrix is updated
    camera.updateMatrixWorld(); // make sure camera's world matrix is updated
    camera.far = 2;
    camera.matrixWorldInverse.getInverse( camera.matrixWorld );
    animals[i].updateMatrix(); // make sure plane's local matrix is updated
    animals[i].updateMatrixWorld(); // make sure plane's world matrix is updated
    var frustum = new THREE.Frustum();
    frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );
    console.log("frustum: ", frustum)
    let inFrame = frustum.containsPoint(animals[i]);
    if (inFrame) { 
      // console.log("object: ", animals[i].name, "in frame: ", inFrame)
      animalsInFrame.push(animals[i]);
    }
  }

  console.log("in frame: ", animalsInFrame);
  if (animalsInFrame.length <= 0) {
    console.log("nothing in frame");
    return;
  }
  let closestAnimal = animalsInFrame[0];
  let animalPos = animalsInFrame[0].position;
  let minDist = Math.sqrt((animalPos.x- cameraPos.x )**2 + (animalPos.y - cameraPos.y)** 2);
  
  for (let animal of animalsInFrame) {
    animalPos = animal.position;
    let dist = Math.sqrt((animalPos.x- cameraPos.x )**2 + (animalPos.y - cameraPos.y)** 2);
    if (dist < minDist) {
      closestAnimal = animal;
      minDist = dist;
    }
  }
  
  if (100 - minDist > 0) {
    score += 100 - minDist;
  }
  console.log("score: ", score)
  console.log("closest Animal: ", closestAnimal.name)
  photoStorage--;
  // if (photoStorage <= 0) {
  //   endGame();
  // }

  // album.push(Scene.renderer.domElement);

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