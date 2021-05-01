import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
// import { TWEEN } from "https://cdn.rawgit.com/mrdoob/three.js/r92/examples/js/loaders/GLTFLoader.js";
import MODEL from "./out.glb";

class Deer extends Group {
  constructor(parent, x, z, speed, visibleTime, stopTime) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
      // spin: this.spin.bind(this),
      // twirl: 0,
    };

    // Load object
    const loader = new GLTFLoader();

    this.name = "deer";
    loader.load(MODEL, (gltf) => {
      this.scale.set(0.02, 0.02, 0.02);
      this.position.set(x - 10, 1.35, z);
      this.rotation.set(0, -(Math.PI + 1.5), 0);
      this.add(gltf.scene.children[0]);
    });

    // set speed of deer
    this.speed = speed;

    this.visibleTime = visibleTime;
    this.stopTime = stopTime;

    // Add self to parent's update list
    parent.addToUpdateList(this);

    // Populate GUI
    // this.state.gui.add(this.state, "bob");
    // this.state.gui.add(this.state, "spin");
  }

  //   spin() {
  //     // Add a simple twirl
  //     this.state.twirl += 6 * Math.PI;

  //     // Use timing library for more precice "bounce" animation
  //     // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
  //     // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
  //     const jumpUp = new TWEEN.Tween(this.position)
  //       .to({ y: this.position.y + 1 }, 300)
  //       .easing(TWEEN.Easing.Quadratic.Out);
  //     const fallDown = new TWEEN.Tween(this.position)
  //       .to({ y: 0 }, 300)
  //       .easing(TWEEN.Easing.Quadratic.In);

  //     // Fall down after jumping up
  //     jumpUp.onComplete(() => fallDown.start());

  //     // Start animation
  //     jumpUp.start();
  //   }

  update(timeStamp) {
    // if (this.state.bob) {
    //   // Bob back and forth
    //   this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
    // }
    // if (this.state.twirl > 0) {
    //   // Lazy implementation of twirl
    //   this.state.twirl -= Math.PI / 8;
    //   this.rotation.y += Math.PI / 8;
    // }

    // Advance tween animations, if any exist
    this.position.y = Math.abs(0.5 * Math.sin(timeStamp / 300)) + 1.35;
    // let vec = THREE.Vector3(0, 0, 0);

    // console.log("timeStamp: ", Math.floor(timeStamp));
    // console.log("visibleTime: ", this.visibleTime);
    if (Math.floor(timeStamp) - this.visibleTime == 0) {
      let x = Math.random() * 20 - 80;
      let z = Math.random() * 50 - 50;
      this.position.set(x, 1, z);
    }

    if (Math.floor(timeStamp) == Math.floor(this.stopTime)) {
      this.position.set(Infinity, Infinity, Infinity);
    }

    // console.log("x:", Math.floor(this.position.x));
    if (this.position.x != Infinity && Math.floor(this.position.x) >= 100) {
      // let x = Math.random() * 50 - 50;
      // let z = Math.random() * 10 - 12;
      // this.position.set(x, 1, z);
      this.rotation.set(0, Math.PI + 1.5, 0);
    }

    if (Math.floor(this.position.x) <= -100) {
      this.rotation.set(0, -(Math.PI + 1.5), 0);
    }

    if (this.rotation.y == -(Math.PI + 1.5)) this.position.x += this.speed;
    else this.position.x -= this.speed;
    TWEEN.update();
  }
}

export default Deer;
