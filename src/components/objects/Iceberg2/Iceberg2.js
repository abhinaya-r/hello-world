import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Iceberg.glb';

class Iceberg2 extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            bob: true,
        };

        // Load object
        const loader = new GLTFLoader();

        this.name = 'iceberg2';
        loader.load(MODEL, (gltf) => {
            // this.scale.set(0.8, 2, 0.7);
            // this.position.set(5, 1, -12)
            this.scale.set(0.03, 0.03, 0.03);
            this.rotation.set(0, Math.PI-0.5, 0)
            this.add(gltf.scene);
        });

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Populate GUI
        // this.state.gui.add(this.state, 'bob');
        // this.state.gui.add(this.state, 'spin');
    }

    // spin() {
    //     // Add a simple twirl
    //     this.state.twirl += 6 * Math.PI;

    //     // Use timing library for more precice "bounce" animation
    //     // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
    //     // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
    //     const jumpUp = new TWEEN.Tween(this.position)
    //         .to({ y: this.position.y + 1 }, 300)
    //         .easing(TWEEN.Easing.Quadratic.Out);
    //     const fallDown = new TWEEN.Tween(this.position)
    //         .to({ y: 0 }, 300)
    //         .easing(TWEEN.Easing.Quadratic.In);

    //     // Fall down after jumping up
    //     jumpUp.onComplete(() => fallDown.start());

    //     // Start animation
    //     jumpUp.start();
    // }
    setPos(x, y, z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    update(timeStamp) {
        // if (this.state.bob) {
        //     // Bob back and forth
        //     this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        // }
        // if (this.state.twirl > 0) {
        //     // Lazy implementation of twirl
        //     this.state.twirl -= Math.PI / 8;
        //     this.rotation.y += Math.PI / 8;
        // }

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Iceberg2;
