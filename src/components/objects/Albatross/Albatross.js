import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import MODEL from "./albatross.glb";
import * as THREE from "three";
import { AnimationMixer } from "three";

class Albatross extends Group {
  constructor(parent, x, y, z, speed, direction) {
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
    };

    // Load object
    const loader = new GLTFLoader();

    this.name = "albatross";
    loader.load(MODEL, (gltf) => {
      this.scale.set(0.5, 0.5, 0.5);
      this.position.set(x, y, z);
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

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    // Advance tween animations, if any exist
    let norm = this.direction.clone().normalize();
    this.position.x += norm.x * this.speed;
    this.position.y += norm.y * this.speed;
    this.position.z += norm.z * this.speed;
    var delta = this.clock.getDelta(); // clock is an instance of THREE.Clock
    if (this.position.y < 0) {
      this.remove(this);
    }
    if (this.mixer) this.mixer.update(delta);
    // TWEEN.update();
  }
}

export default Albatross;
