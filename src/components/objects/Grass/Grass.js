import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './ThinGrass.glb';

class Grass extends Group {
    constructor(parent, rot) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            bob: true,
        };

        // Load object
        const loader = new GLTFLoader();

        this.name = 'grass';
        loader.load(MODEL, (gltf) => {
            this.scale.set(3, 1, 3);
            // this.position.set(5, 1, -12)
            this.rotation.set(0, rot, 0)
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    setPos(x, y, z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    update(timeStamp) {
        TWEEN.update();
    }
}

export default Grass;