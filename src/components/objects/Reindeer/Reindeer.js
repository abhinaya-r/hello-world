import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
// import { TWEEN } from "https://cdn.rawgit.com/mrdoob/three.js/r92/examples/js/loaders/GLTFLoader.js";
import MODEL from "./Reindeer.glb";
import * as THREE from "three";

class Reindeer extends Group {
  constructor(parent, x, z, speed, direction) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
    };

    // Load object
    const loader = new GLTFLoader();

    // this.rotation = rotation;
    // let rotCopy = rotation.clone();

    this.name = "reindeer";
    loader.load(MODEL, (gltf) => {
      this.scale.set(0.5, 0.5, 0.5);
      this.position.set(x - 10, -1, z);
      this.add(gltf.scene.children[0]);
    });

    // set speed of deer
    this.speed = speed;
    this.direction = direction;

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    // Advance tween animations, if any exist
    this.position.y = Math.abs(0.5 * Math.sin(timeStamp / 300));
    // let vec = THREE.Vector3(0, 0, 0);

    // console.log("timeStamp: ", Math.floor(timeStamp));
    // console.log("visibleTime: ", this.visibleTime);
    // if (Math.floor(timeStamp) - this.visibleTime == 0) {
    //   console.log("is equal in deer");
    //   let x = Math.random() * 20 - 80;
    //   let z = Math.random() * 50 - 50;
    //   this.position.set(x, 1, z);
    // }

    // if (Math.floor(timeStamp) == Math.floor(this.stopTime)) {
    //   this.position.set(Infinity, Infinity, Infinity);
    // }

    // // console.log("x:", Math.floor(this.position.x));
    // if (this.position.x != Infinity && Math.floor(this.position.x) >= 100) {
    //   // let x = Math.random() * 50 - 50;
    //   // let z = Math.random() * 10 - 12;
    //   // this.position.set(x, 1, z);
    //   this.rotation.set(0, Math.PI + 1.5, 0);
    // }

    // if (Math.floor(this.position.x) <= -100) {
    //   this.rotation.set(0, -(Math.PI + 1.5), 0);
    // }

    // if (this.rotation.y == -(Math.PI + 1.5)) this.position.x += this.speed;
    // else this.position.x -= this.speed;
    let norm = this.direction.clone().normalize();
    this.position.x += norm.x * this.speed;
    this.position.z += norm.z * this.speed;
    TWEEN.update();
  }
}

export default Reindeer;
