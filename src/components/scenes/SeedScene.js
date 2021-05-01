import * as Dat from "dat.gui";
import { Scene, Color } from "three";
import { Flower, Land, Bear, Deer, PineTree, OakTree, ElmTree } from "objects";
import { BasicLights } from "lights";
import * as THREE from "three";
// import { PineTree } from "../objects/PineTree";
// import Scene from "../../../coursejs/scene.js";

class SeedScene extends Scene {
  constructor() {
    // Call parent Scene() constructor
    super();

    // Init state
    this.state = {
      gui: new Dat.GUI(), // Create GUI for scene
      rotationSpeed: 0,
      updateList: [],
    };

    // Set background to a nice color
    this.background = new Color(0x7ddffe);

    let ground = {};
    ground.textures = {};

    // ground material
    ground.material = new THREE.MeshStandardMaterial({
      color: 0x295e10, //0x3c3c3c,
      // specular: 0x404761, //0x3c3c3c//,
      metalness: 0.3,
    });

    // ground mesh
    ground.geometry = new THREE.PlaneBufferGeometry(20000, 20000);
    ground.mesh = new THREE.Mesh(ground.geometry, ground.material);
    ground.mesh.position.y = 0; // -249 - 1;
    ground.mesh.rotation.x = -Math.PI / 2;
    ground.mesh.receiveShadow = true;
    this.add(ground.mesh); // add ground to scene

    const lights = new BasicLights();
    this.add(lights);

    // DEER
    let allDeer = [];
    for (let i = 0; i < 100; i++) {
      let speed = Math.random() * 0.3;
      let visibleTime = Math.floor(Math.random() * 10000);
      let stopTime = visibleTime + Math.floor(Math.random() * 100);
      let x = Infinity;
      let z = Infinity;
      let deer = new Deer(this, x, z, speed, visibleTime, stopTime);
      this.add(deer);
      allDeer.push(deer);
    }

    // BEAR
    // let allBears = [];
    // for (let i = 0; i < 100; i++) {
    //   let speed = Math.random() * 0.1;
    //   let visibleTime = Math.floor(Math.random() * 10000);
    //   let stopTime = visibleTime + Math.floor(Math.random() * 100);
    //   let x = Infinity;
    //   let z = Infinity;
    //   let bear = new Bear(this, x, z, speed, visibleTime, stopTime);
    //   this.add(bear);
    //   allBears.push(bear);
    // }

    const bear = new Bear(this);
    const deer = new Deer(this);
    for (let i = 0; i < 20; i++) {
        let pine = new PineTree(this);
        let x = Math.random()*50-25;
        let z = Math.random()*10-20
        pine.position.set(x, 0, z)
        this.add(pine);
    }
    for (let i = 0; i < 20; i++) {
        let oak = new OakTree(this);
        let x = Math.random()*60-25;
        let z = Math.random()*5-7
        oak.position.set(x, 0, z)
        this.add(oak);
    }
    for (let i = 0; i < 10; i++) {
        let elm = new ElmTree(this);
        let x = Math.random()*60-25;
        let z = Math.random()*7-30
        elm.position.set(x, 0, z)
        this.add(elm);
    }

    // pine.setPos(-1000, 0, 0);
    const lights = new BasicLights();
    this.add(lights, bear, deer);

    // Populate GUI
    // this.state.gui.add(this.state, "rotationSpeed", -5, 5);
  }

  addToUpdateList(object) {
    this.state.updateList.push(object);
  }

  update(timeStamp) {
    const { rotationSpeed, updateList } = this.state;
    this.rotation.y = (rotationSpeed * timeStamp) / 10000;

    // let rand = Math.random();

    // Call update for each object in the updateList
    for (const obj of updateList) {
      obj.update(timeStamp);
    }
  }
}

export default SeedScene;
