import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import MODEL from "./fox.glb";
import * as THREE from "three";

class Fox extends Group {
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

    this.name = "fox";
    var material = new MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 0,
      emissiveIntensity: 0,
      transparent: true,
      depthOrder: 1, // to render it after other objects
    });
    loader.load(MODEL, (gltf) => {
      // gltf.scene.traverse(function (child) {
      //   if (child.isMesh) {
      //     // child.material.color.set(0xffffff * Math.random());
      //     child.material.transparent = true;
      //     child.material.opacity = 0;
      //     child.material.emissive = 0xffffee;
      //     child.material.emissiveIntensity = 0;
      //   }
      // });
      this.scale.set(0.2, 0.2, 0.2);
      this.position.set(x, y, z);
      this.add(gltf.scene);
    });

    // speed
    this.speed = speed;
    this.direction = direction;
    this.y = y;

    // Add self to parent's update list
    parent.addToUpdateList(this);
  }

  update(timeStamp) {
    this.position.y = Math.abs(0.2 * Math.sin(timeStamp / 300)) + this.y;
    // Advance tween animations, if any exist
    let norm = this.direction.clone().normalize();
    this.position.x += norm.x * this.speed;
    this.position.z += norm.z * this.speed;
    TWEEN.update();
  }
}

export default Fox;
