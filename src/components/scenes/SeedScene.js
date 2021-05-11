import * as Dat from "dat.gui";
import { Scene, Color, Fog, Vector3, MeshLambertMaterial } from "three";
import {
  Flower,
  Land,
  Bear,
  Deer,
  Stork,
  Fox,
  PineTree,
  OakTree,
  ElmTree,
  Grass,
  Mushroom,
  Music,
} from "objects";
import { BasicLights } from "lights";
import * as THREE from "three";
// import { PineTree } from "../objects/PineTree";
// import Scene from "../../../coursejs/scene.js";

class SeedScene extends Scene {
  constructor(camera) {
    // Call parent Scene() constructor
    super();

    this.animals = [];
    // console.log(this.animals);

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

    // MUSIC
    let music = new Music(this, camera);

    // DEER
    let allDeer = [];
    for (let i = 0; i < 30; i++) {
      // let visibleTime = Math.floor(Math.random() * 10000 - 3000);
      // let stopTime = visibleTime + Math.floor(Math.random() * 100);
      // let x = Math.random() * 10000 - 5000;
      // let z = Math.random() * 10000 - 5000;
      let x = Math.random() * 1000 - 500;
      let z = Math.random() * 1000 - 500;
      let speed = Math.random() * 0.1 + 0.01;
      let position = new THREE.Vector3(x, 0, z);
      let randPoint = new THREE.Vector3(
        Math.random() * 100 - 50,
        0,
        Math.random() * 100 - 50
      );
      let direction = randPoint.clone().sub(position);

      let deer = new Deer(this, x, z, speed, direction);
      deer.lookAt(direction);

      this.add(deer);
      allDeer.push(deer);
    }
    this.animals.push(allDeer);
    // console.log(this.animals);

    // BEAR
    let allBears = [];
    for (let i = 0; i < 30; i++) {
      // let x = Math.random() * 10000 - 5000;
      // let z = Math.random() * 10000 - 5000;
      let x = Math.random() * 2000 - 1000;
      let z = Math.random() * 2000 - 1000;
      let speed = Math.random() * 0.05;
      let position = new THREE.Vector3(x, 0, z);
      let randPoint = new THREE.Vector3(
        Math.random() * 100 - 50,
        0,
        Math.random() * 100 - 50
      );
      let direction = randPoint.clone().sub(position);

      let bear = new Bear(this, x, z, speed, direction);
      bear.lookAt(direction);

      this.add(bear);
      allBears.push(bear);
    }
    this.animals.push(allBears);
    // console.log(this.animals);

    // Stork
    // let stork = new Stork(this, 0, 0, 0.5, new Vector3(0, 0, 0));
    // this.add(stork);
    let allStorks = [];
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * 100 - 50;
      let y = Math.random() * 6;
      let z = Math.random() * 100 - 50;
      let speed = Math.random() * 0.1;
      let position = new THREE.Vector3(x, y, z);
      let randPoint = new THREE.Vector3(
        Math.random() * 50 - 25,
        Math.random() * 5 + 5,
        Math.random() * 50 - 25
      );
      let direction = randPoint.clone().sub(position);

      let stork = new Stork(this, x, y, z, speed, direction);
      stork.lookAt(direction);
      this.add(stork);
      allStorks.push(stork);
    }
    this.animals.push(allStorks);
    // console.log(this.animals);

    // Fox
    let allFoxes = [];
    for (let i = 0; i < 20; i++) {
      let x = Math.random() * 500 - 250;
      let y = 0;
      let z = Math.random() * 500 - 250;
      let speed = Math.random() * 0.08 + 0.03;
      let position = new THREE.Vector3(x, y, z);
      let randPoint = new THREE.Vector3(
        Math.random() * 100 - 50,
        y,
        Math.random() * 100 - 50
      );
      let direction = randPoint.clone().sub(position);
      // console.log("direction: ", direction);
      let fox = new Fox(this, x, y, z, speed, direction);
      fox.lookAt(direction);
      this.add(fox);
      allFoxes.push(fox);
    }

    // pine.setPos(-1000, 0, 0);
    const lights = new BasicLights();
    this.add(lights);
    for (let i = 0; i < 20; i++) {
      let pine = new PineTree(this);
      let x = Math.random() * 100 - 50;
      let z = Math.random() * 150 - 60;
      pine.position.set(x, 0, z);
      this.add(pine);
    }
    for (let i = 0; i < 30; i++) {
      let oak = new OakTree(this);
      let x = Math.random() * 100 - 50;
      let z = Math.random() * 200 - 50;
      oak.position.set(x, 0, z);
      this.add(oak);
    }
    for (let i = 0; i < 30; i++) {
      let elm = new ElmTree(this);
      let x = Math.random() * 100 - 50;
      let z = Math.random() * 100 - 30;
      elm.position.set(x, 0, z);
      this.add(elm);
    }
    for (let i = 0; i < 5; i++) {
      let x = Math.random() * 100 - 50;
      let z = Math.random() * 100 - 30;
      let rot = Math.random() * 2 * Math.PI;
      let grass = new Grass(this, rot);
      grass.position.set(x, -0.1, z);
      this.add(grass);
    }
    for (let i = 0; i < 8; i++) {
      let x = Math.random() * 50 - 20;
      let z = Math.random() * 50 - 20;
      let rot = Math.random() * 2 * Math.PI;
      let sc = Math.random() * 0.03 + 0.05;
      let mush = new Mushroom(this, rot, sc);
      mush.position.set(x, 0, z);
      this.add(mush);
    }
  }

  addToUpdateList(object) {
    this.state.updateList.push(object);
  }

  update(timeStamp) {
    const { rotationSpeed, updateList } = this.state;
    // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

    // let rand = Math.random();

    // Call update for each object in the updateList
    for (const obj of updateList) {
      // obj.frustumCulled = true;
      obj.update(timeStamp);
    }
  }
}

SeedScene.getAnimals = function () {
  return this.animals;
};

export default SeedScene;
