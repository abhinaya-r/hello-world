import * as Dat from "dat.gui";
import { Scene, Color, Fog } from "three";
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
    this.background = new Color(0xb4cede);
    this.fog = new Fog(0xb4cede, 40, 60);

    let ground = {};
    ground.textures = {};

    // ground material
    ground.material = new THREE.MeshStandardMaterial({
      color: 0x195228, //0x3c3c3c,
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
    // const deer = new Deer(this);
    for (let i = 0; i < 30; i++) {
        let pine = new PineTree(this);
        let x = Math.random()*100-50;
        let z = Math.random()*150-60
        pine.position.set(x, 0, z)
        this.add(pine);
    }
    for (let i = 0; i < 30; i++) {
        let oak = new OakTree(this);
        let x = Math.random()*100-50;
        let z = Math.random()*200-50
        oak.position.set(x, 0, z)
        this.add(oak);
    }
    for (let i = 0; i < 30; i++) {
        let elm = new ElmTree(this);
        let x = Math.random()*100-50;
        let z = Math.random()*100-30
        elm.position.set(x, 0, z)
        this.add(elm);
    }
    this.add(bear);

    // Populate GUI
    // this.state.gui.add(this.state, "rotationSpeed", -5, 5);
  }

  addToUpdateList(object) {
    this.state.updateList.push(object);
  }

  // update(timeStamp) {
  //   const { rotationSpeed, updateList } = this.state;
  //   this.rotation.y = (rotationSpeed * timeStamp) / 10000;

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}


export default SeedScene;
