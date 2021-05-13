import * as Dat from "dat.gui";
import { Scene, Color, Fog, Vector3, MeshLambertMaterial } from "three";
import {
  Flower,
  Land,
  Bear,
  Deer,
  Penguin,
  Stork,
  Fox,
  Reindeer,
  PolarBear,
  Albatross,
  Seal,
  PineTree,
  OakTree,
  ElmTree,
  Grass,
  Mushroom,
  Trees,
  Iceberg1,
  Iceberg2,
  IcebergSmall1,
  IcebergSmall2,
  Music,
} from "objects";
import { BasicLights } from "lights";
import * as THREE from "three";
// import { PineTree } from "../objects/PineTree";
// import Scene from "../../../coursejs/scene.js";
// let currColor = null;
// if (Math.random() < 0.5) {
//   let currColor = "#b4cede";
// }
// else {
//   currColor = "#7ec0ee";
// }
let currColor = "#b4cede";

class ArcticScene extends Scene {
  constructor(camera) {
    // Call parent Scene() constructor
    super();

    this.animals = [];
    // console.log(this.animals);

    // Init state
    this.state = {
      // gui: new Dat.GUI(), // Create GUI for scene
      rotationSpeed: 0,
      updateList: [],
      startTime: null,
    };

    // Set background to a nice color
    this.background = new Color(0xb4cede);
    this.fog = new Fog(0xb4cede, 40, 60);
    // this.background = new Color(0x131862);
    // this.fog = new Fog(0x131862, 40, 60);
    // // sunset
    // this.background = new Color(0xe6cbb1);
    // this.fog = new Fog(0xe6cbb1, 40, 60);

    // for night mode
    // https://github.com/karenying/drivers-ed/blob/master/src/components/scenes/Washington.js
    this.night = 0;
    this.timeElapsed = -1;
    this.threshold = 20;

    let ground = {};
    ground.textures = {};

    // ground material
    ground.material = new THREE.MeshStandardMaterial({
      color: 0xd6ecef, //0x3c3c3c,
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

    // REINDEER
    let allReindeer = [];
    for (let i = 0; i < 30; i++) {
      // let visibleTime = Math.floor(Math.random() * 10000 - 3000);
      // let stopTime = visibleTime + Math.floor(Math.random() * 100);
      // let x = Math.random() * 10000 - 5000;
      // let z = Math.random() * 10000 - 5000;
      let x = Math.random() * 1000 - 500;
      let z = Math.random() * 1000 - 500;
      let speed = Math.random() * 0.1 + 0.01;
      let position = new THREE.Vector3(x, -1, z);
      let randPoint = new THREE.Vector3(
        Math.random() * 100 - 50,
        0,
        Math.random() * 100 - 50
      );
      let direction = randPoint.clone().sub(position);

      let reindeer = new Reindeer(this, x, z, speed, direction);
      reindeer.lookAt(direction);

      this.add(reindeer);
      allReindeer.push(reindeer);
    }
    this.animals.push(allReindeer);
    // console.log(this.animals);

    // POLAR BEAR
    // let allBears = [];
    // for (let i = 0; i < 15; i++) {
    //   let x = Math.random() * 1000 - 500;
    //   let z = Math.random() * 1000 - 500;
    //   let speed = Math.random() * 0.05;
    //   let position = new THREE.Vector3(x, 0, z);
    //   let randPoint = new THREE.Vector3(
    //     Math.random() * 100 - 50,
    //     0,
    //     Math.random() * 100 - 50
    //   );
    //   let direction = randPoint.clone().sub(position);

    //   let bear = new PolarBear(this, x, z, speed, direction);
    //   bear.lookAt(direction);

    //   this.add(bear);
    //   allBears.push(bear);
    // }
    // this.animals.push(allBears);

    // PENGUIN
    let allPenguins = [];
    for (let i = 0; i < 15; i++) {
      let x = Math.random() * 1000 - 500;
      let z = Math.random() * 1000 - 500;
      let speed = Math.random() * 0.2;
      let position = new THREE.Vector3(x, 0, z);
      let randPoint = new THREE.Vector3(
        Math.random() * 100 - 50,
        0,
        Math.random() * 100 - 50
      );
      let direction = randPoint.clone().sub(position);

      let penguin = new Penguin(this, x, z, speed, direction);
      penguin.lookAt(direction.clone().multiplyScalar(-1));

      this.add(penguin);
      allPenguins.push(penguin);
    }
    this.animals.push(allPenguins);
    // console.log(this.animals);

    // Albatross
    let allAlbatross = [];
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * 300 - 150;
      let y = Math.random() * 6;
      let z = Math.random() * 300 - 150;
      let speed = Math.random() * 0.1;
      let position = new THREE.Vector3(x, y, z);
      let randPoint = new THREE.Vector3(
        Math.random() * 50 - 25,
        Math.random() * 5 + 5,
        Math.random() * 50 - 25
      );
      let direction = randPoint.clone().sub(position);

      let albatross = new Albatross(this, x, y, z, speed, direction);
      albatross.lookAt(direction);
      this.add(albatross);
      allAlbatross.push(albatross);
    }
    this.animals.push(allAlbatross);
    // console.log(this.animals);

    // Seals
    let allSeals = [];
    for (let i = 0; i < 10; i++) {
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
      let seal = new Seal(this, x, y, z, speed, direction);
      seal.lookAt(direction.clone().multiplyScalar(-1));
      this.add(seal);
      allSeals.push(seal);
    }
    this.animals.push(allSeals);

    // pine.setPos(-1000, 0, 0);
    const lights = new BasicLights();
    this.add(lights);
    // for (let i = 0; i < 20; i++) {
    //   let pine = new PineTree(this);
    //   let x = Math.random() * 100 - 50;
    //   let z = Math.random() * 150 - 60;
    //   pine.position.set(x, 0, z);
    //   this.add(pine);
    // }
    // for (let i = 0; i < 30; i++) {
    //   let oak = new OakTree(this);
    //   let x = Math.random() * 100 - 50;
    //   let z = Math.random() * 200 - 50;
    //   oak.position.set(x, 0, z);
    //   this.add(oak);
    // }
    // for (let i = 0; i < 30; i++) {
    //   let elm = new ElmTree(this);
    //   let x = Math.random() * 100 - 50;
    //   let z = Math.random() * 100 - 30;
    //   elm.position.set(x, 0, z);
    //   this.add(elm);
    // }
    // for (let i = 0; i < 5; i++) {
    //   let x = Math.random() * 200 - 100;
    //   let z = Math.random() * 200 - 100;
    //   let rot = Math.random() * 2 * Math.PI;
    //   let grass = new Grass(this, rot);
    //   grass.position.set(x, -0.1, z);
    //   this.add(grass);
    // }
    // let grass1 = new Grass(this, 0);
    // grass1.position.set(0, -0.1, 0);
    // this.add(grass1);
    // let grass2 = new Grass(this, 0);
    // grass2.position.set(-75, -0.1, 0);
    // this.add(grass2);
    // let grass3 = new Grass(this, 0);
    // grass3.position.set(75, -0.1, 0);
    // this.add(grass3);

    for (let i = 0; i < 5; i++) {
      let icebergs = new Iceberg1(this);
      let x = Math.random() * 200 - 100;
      let z = Math.random() * 200 - 100;
      icebergs.position.set(x, 0, z);
      this.add(icebergs);
    }

    for (let i = 0; i < 5; i++) {
      let icebergs = new Iceberg2(this);
      let x = Math.random() * 200 - 100;
      let z = Math.random() * 200 - 100;
      icebergs.position.set(x, 0, z);
      this.add(icebergs);
    }

    // let grass2 = new Grass(this, 0);
    // let grass3 = new Grass(this, 0);
    for (let i = 0; i < 4; i++) {
      let x = Math.random() * 50 - 20;
      let z = Math.random() * 50 - 20;
      let rot = Math.random() * 2 * Math.PI;
      let sc = Math.random() * 0.03 + 0.05;
      let ice = new IcebergSmall1(this, rot, sc);
      ice.position.set(x, -0.5, z);
      this.add(ice);
    }
    for (let i = 0; i < 4; i++) {
      let x = Math.random() * 50 - 20;
      let z = Math.random() * 50 - 20;
      let rot = Math.random() * 2 * Math.PI;
      let sc = Math.random() * 0.03 + 0.05;
      let ice = new IcebergSmall2(this, rot, sc);
      ice.position.set(x, 0, z);
      this.add(ice);
    }
  }

  addToUpdateList(object) {
    this.state.updateList.push(object);
  }

  // blends 2 colors together with the given percent
  // from https://github.com/karenying/drivers-ed/blob/master/src/components/scenes/Washington.js
  // https://stackoverflow.com/questions/3080421/javascript-color-gradient
  getGradientColor(start_color, end_color, percent) {
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, "");
    end_color = end_color.replace(/^\s*#|\s*$/g, "");

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (start_color.length == 3) {
      start_color = start_color.replace(/(.)/g, "$1$1");
    }

    if (end_color.length == 3) {
      end_color = end_color.replace(/(.)/g, "$1$1");
    }

    // get colors
    var start_red = parseInt(start_color.substr(0, 2), 16),
      start_green = parseInt(start_color.substr(2, 2), 16),
      start_blue = parseInt(start_color.substr(4, 2), 16);

    var end_red = parseInt(end_color.substr(0, 2), 16),
      end_green = parseInt(end_color.substr(2, 2), 16),
      end_blue = parseInt(end_color.substr(4, 2), 16);

    // calculate new color
    var diff_red = end_red - start_red;
    var diff_green = end_green - start_green;
    var diff_blue = end_blue - start_blue;

    diff_red = (diff_red * percent + start_red).toString(16).split(".")[0];
    diff_green = (diff_green * percent + start_green)
      .toString(16)
      .split(".")[0];
    diff_blue = (diff_blue * percent + start_blue).toString(16).split(".")[0];

    // ensure 2 digits by color
    if (diff_red.length == 1) diff_red = "0" + diff_red;
    if (diff_green.length == 1) diff_green = "0" + diff_green;
    if (diff_blue.length == 1) diff_blue = "0" + diff_blue;

    return "#" + diff_red + diff_green + diff_blue;
  }

  update(timeStamp) {
    const { startTime, rotationSpeed, updateList } = this.state;
    // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

    // let rand = Math.random();

    // Call update for each object in the updateList
    // night mode calculations
    // calculate start time on game start
    // let weather = null;
    // if (Math.random() < 0.5) {
    //   weather = #7ec0ee;
    // }
    if (startTime == null) {
      this.state.startTime = Date.now() / 2000;
    } else {
      const currentTime = Date.now() / 2000;
      this.timeElapsed = currentTime - this.state.startTime;
    }
    // let weather = "#b4cede";
    if (this.timeElapsed >= this.threshold) {
      this.night = (this.night + 1) % 5;
      this.state.startTime = Date.now() / 2000;
      this.timeElapsed = 0;
      // if (Math.random() < 0.5) {
      //   weather = '#7ec0ee';
      // }
    }
    // from https://github.com/karenying/drivers-ed/blob/master/src/components/scenes/Washington.js
    if (this.night == 0) {
      this.background = new Color(0x7ec0ee);
      this.fog.color = new Color(0x7ec0ee);
    } else if (this.night == 1) {
      // dusk
      let newColor = this.getGradientColor(
        "#7ec0ee",
        "#11223d",
        this.timeElapsed / this.threshold
      );
      if (newColor !== currColor) {
        currColor = newColor;
        this.background = new Color(currColor);
        this.fog.color = new Color(currColor);
      }
    } else if (this.night == 2) {
      this.background = new Color(0x11223d);
      this.fog.color = new Color(0x11223d);
    } else if (this.night == 3) {
      let newColor = this.getGradientColor(
        "#11223d",
        "#e6cbb1",
        this.timeElapsed / this.threshold
      );
      if (newColor !== currColor) {
        currColor = newColor;
        this.background = new Color(currColor);
        this.fog.color = new Color(currColor);
      }
    } else if (this.night == 4) {
      let newColor = this.getGradientColor(
        "#e6cbb1",
        "#7ec0ee",
        this.timeElapsed / this.threshold
      );
      if (newColor !== currColor) {
        currColor = newColor;
        this.background = new Color(currColor);
        this.fog.color = new Color(currColor);
      }
      // daybreak
    }
    for (const obj of updateList) {
      // obj.frustumCulled = true;
      obj.update(timeStamp);
    }
  }
}

ArcticScene.getAnimals = function () {
  return this.animals;
};

export default ArcticScene;
