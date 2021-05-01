import * as Dat from "dat.gui";
import { Scene, Color } from "three";
import { Flower, Land, Bear, Deer } from "objects";
import { BasicLights } from "lights";
import * as THREE from "three";
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
    this.background = new Color(0x7ec0ee);
    this.fog = new THREE.Fog(0xcce0ff, 500, 10000);

    let ground = {};
    ground.textures = {};

    // ground material
    ground.material = new THREE.MeshStandardMaterial({
      color: 0x404761, //0x3c3c3c,
      // specular: 0x404761, //0x3c3c3c//,
      metalness: 0.3,
    });

    // ground mesh
    ground.geometry = new THREE.PlaneBufferGeometry(20000, 20000);
    ground.mesh = new THREE.Mesh(ground.geometry, ground.material);
    ground.mesh.position.y = -249 - 1;
    ground.mesh.rotation.x = -Math.PI / 2;
    ground.mesh.receiveShadow = true;

    this.add(ground.mesh); // add ground to scene

    // Add meshes to scene
    // const land = new Land();
    // const flower = new Flower(this);
    const bear = new Bear(this);
    const deer = new Deer(this);
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

    // Call update for each object in the updateList
    for (const obj of updateList) {
      obj.update(timeStamp);
    }
  }
}

export default SeedScene;
