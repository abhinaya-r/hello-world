import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import MODEL from "./seal.glb";
import * as THREE from "three";

class Seal extends Group {
  constructor(parent, x, y, z, speed, direction) {
    // constructor(parent) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
    };

    // Load object
    const loader = new GLTFLoader();

    this.name = "seal";
    loader.load(MODEL, (gltf) => {
      this.scale.set(0.008, 0.008, 0.008);
      this.position.set(x, 0, z);
      this.rotation.set(0, Math.PI/2, 0);
      let model = gltf.scene;
      let animations = gltf.animations;
      this.add(model);
      this.mixer = new THREE.AnimationMixer(model);
      let action = this.mixer.clipAction(animations[0]); // access first animation clip
      action.play();
    });

    // speed
    this.speed = speed;
    this.direction = direction;
    this.clock = new THREE.Clock();

    // speed
    this.speed = speed;
    this.direction = direction;
    this.y = y;

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    // Advance tween animations, if any exist
    let norm = this.direction.clone().normalize();
    this.position.x += norm.x * this.speed;
    this.position.z += norm.z * this.speed;
    var delta = this.clock.getDelta(); // clock is an instance of THREE.Clock
    if (this.position.y < 0) {
      this.remove(this);
    }
    if (this.mixer) this.mixer.update(delta);
    // TWEEN.update();
  }
  // update(timeStamp) {
  //   this.position.y = Math.abs(0.2 * Math.sin(timeStamp / 300)) + this.y;
  //   // Advance tween animations, if any exist
  //   let norm = this.direction.clone().normalize();
  //   this.position.x += norm.x * this.speed;
  //   this.position.z += norm.z * this.speed;
  //   TWEEN.update();
  // }
}

export default Seal;
