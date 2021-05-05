/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SeedScene } from "scenes";

// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
const scene = new SeedScene(camera);
const renderer = new WebGLRenderer({ antialias: true });

var score = 0;
var photoStorage = 15;

// var album = [];
// var inAlbum = false;
// var currentPhoto = 0;
// var doc = app.activeDocument;
// var parentF = newFoler(doc.path.parent);


// Set up camera
// camera.position.set(6, 3, -10);
camera.position.set(0, 2, 20);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = "block"; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = "hidden"; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
  controls.update();
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

/* take photo */
photo = function(filename) {
  // get the image data

  // take the photo
    // stretch goal: save and display the photo 
    // save the screenshots that you've taken in some folder!
    // album icon in menu that when you click on it you can see
    // all the images in that folder

  try {
    var dataURL = Scene.renderer.domElement.toDataURL();
  } catch (err) {
    alert("Sorry, your browser does not support capturing an image.");
    return;
  }

  for (var i = 0; i < SeedScene.animals.length; i++) {
    var currentAnimals = SeedScene.animals[i];
    for (var j = 0; j < currentAnimals.length; j++) {
      if(currentAnimals[j].inPhoto()) { // potentially optional statement
        var dist = currentAnimals[j].position.distanceTo(Scene.camera.position);
        if (frame.width - dist > 0)
        score += frame.width - dist;
      }
    }
  }
  photoStorage--;
  if (photoStorage <= 0) {
    endGame();
  }

  album.push(Scene.renderer.domElement);

  // Create a download link and click it
  let link = document.createElement('a');
  link.download = Renderer.promptForFilename(".png");
  link.href = dataURL;
  link.click();

  // this will force downloading data as an image (rather than open in new window)
  // const url = dataURL.replace(/^data:image\/[^;]/, "data:application/octet-stream");
  // window.open(url);
};


  if(event.key == "a") {
    //canvas.restore();
    if(inAlbum) {
      // close the album
    }
    else {
      //console.log(album);
      if(album.length > 0) {
        //album[currentPhoto].draw();
      }
    }
  }

  if(event.key = "ArrowLeft") {
    if(inAlbum) {
      if(currentPhoto > 0) {
        //album[--currentPhoto].draw();
      }
      else {
        //album[album.length - 1].draw();
        //currentPhoto = album.length -1;
      }
    }
  }

  if(event.key = "ArrowRight") {
    if(inAlbum) {
      if(currentPhoto < album.length - 1) {
        //album[++currentPhoto].draw();
      }
      else {
        //album[0].draw();
        //currentPhoto = 0;
      }
    }
  }

  // if 'I' was released, download the image
  if (event.key == "i") {
    document.getElementById("recIcon").classList.add("Rec");
    document.getElementById("recIcon").classList.remove("notRec");
    setTimeout(() => {photo();
                      document.getElementById("recIcon").classList.add("notRec");
                      document.getElementById("recIcon").classList.remove("Rec");},1000);
  }

  // add event listener for screen capture and recording
window.addEventListener("keyup", function(event) {
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
        //album[currentPhoto].draw();
      }
    }
  }

  if(event.key = "ArrowLeft") {
    if(inAlbum) {
      if(currentPhoto > 0) {
        //album[--currentPhoto].draw();
      }
      else {
        //album[album.length - 1].draw();
        //currentPhoto = album.length -1;
      }
    }
  }

  if(event.key = "ArrowRight") {
    if(inAlbum) {
      if(currentPhoto < album.length - 1) {
        //album[++currentPhoto].draw();
      }
      else {
        //album[0].draw();
        //currentPhoto = 0;
      }
    }
  }

  // if 'I' was released, download the image
  if (event.key == "i") {
    document.getElementById("recIcon").classList.add("Rec");
    document.getElementById("recIcon").classList.remove("notRec");
    setTimeout(() => {photo();
                      document.getElementById("recIcon").classList.add("notRec");
                      document.getElementById("recIcon").classList.remove("Rec");},1000);
  }
});
