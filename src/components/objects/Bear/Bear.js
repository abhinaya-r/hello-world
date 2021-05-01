import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import MODEL from "./bear.glb";

class Bear extends Group {
  // constructor(parent, x, z, speed, visibleTime, stopTime) {
  constructor(parent) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
    };

    // Load object
    const loader = new GLTFLoader();

    this.name = "bear";
    loader.load(MODEL, (gltf) => {
      this.scale.set(0.25, 0.25, 0.25);
      // this.position.set(x - 10, 0, z - 5);
      this.position.set(-10, 0, -5);
      this.rotation.set(0, -(Math.PI + 1.5), 0);
      //   this.rotation.set(0, Math.PI - 0.5, 0);
      this.add(gltf.scene);
    });

    // speed of bear
    // this.speed = speed;

    // this.visibleTime = visibleTime;
    // this.stopTime = stopTime;

    // Add self to parent's update list
    parent.addToUpdateList(this);

    // Populate GUI
    // this.state.gui.add(this.state, 'bob');
    // this.state.gui.add(this.state, 'spin');
  }

  // spin() {
  //     // Add a simple twirl
  //     this.state.twirl += 6 * Math.PI;

  //     // Use timing library for more precice "bounce" animation
  //     // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
  //     // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
  //     const jumpUp = new TWEEN.Tween(this.position)
  //         .to({ y: this.position.y + 1 }, 300)
  //         .easing(TWEEN.Easing.Quadratic.Out);
  //     const fallDown = new TWEEN.Tween(this.position)
  //         .to({ y: 0 }, 300)
  //         .easing(TWEEN.Easing.Quadratic.In);

  //     // Fall down after jumping up
  //     jumpUp.onComplete(() => fallDown.start());

  //     // Start animation
  //     jumpUp.start();
  // }

  update(timeStamp) {
    // if (this.state.bob) {
    //     // Bob back and forth
    //     this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
    // }
    // if (this.state.twirl > 0) {
    //     // Lazy implementation of twirl
    //     this.state.twirl -= Math.PI / 8;
    //     this.rotation.y += Math.PI / 8;
    // }

    // // Advance tween animations, if any exist
    // this.position.y = Math.abs(0.5 * Math.sin(timeStamp / 300)) + 1.35;

    // if (Math.floor(timeStamp) - this.visibleTime == 0) {
    //   let x = Math.random() * 20 - 80;
    //   let z = Math.random() * 50 - 50;
    //   this.position.set(x, 0, z);
    // }

    // if (Math.floor(timeStamp) == Math.floor(this.stopTime)) {
    //   this.position.set(Infinity, Infinity, Infinity);
    // }

    // if (this.position.x != Infinity && Math.floor(this.position.x) >= 100) {
    //   this.rotation.set(0, Math.PI + 1.5, 0);
    // }

    // if (Math.floor(this.position.x) <= -100) {
    //   this.rotation.set(0, -(Math.PI + 1.5), 0);
    // }

    // if (this.rotation.y == -(Math.PI + 1.5)) this.position.x += this.speed;
    // else this.position.x -= this.speed;
    // TWEEN.update();

    // Advance tween animations, if any exist
    this.position.x += 0.02;
    TWEEN.update();
  }
}

export default Bear;
