import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import MODEL from "./Penguin.glb";

class Penguin extends Group {
  constructor(parent, x, z, speed, direction) {
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

    this.name = "penguin";
    loader.load(MODEL, (gltf) => {
      this.scale.set(0.004, 0.004, 0.004);
      // this.rotation.set(0, Math.PI, 0)
      this.position.set(x, 0, z);
      this.add(gltf.scene);
    });

    // speed of bear
    this.speed = speed;
    this.direction = direction;

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    // Advance tween animations, if any exist
    let norm = this.direction.clone().normalize();
    this.position.x += norm.x * this.speed;
    this.position.z += norm.z * this.speed;
    TWEEN.update();
  }
}

export default Penguin;
