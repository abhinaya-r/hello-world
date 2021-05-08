import { ImageLoader } from "three/examples/jsm/loaders/ImageLoader.js";
import * as THREE from "three";
 
class Viewfinder extends Image {
  constructor(parent) {
    super();

    // Init state
    this.state = {
      gui: parent.state.gui,
      bob: true,
    };

    // instantiate a loader
    const loader = new ImageLoader();

    loader.load(
        // resource URL
        'viewfinder.png',
    
        // onLoad callback
        function ( image ) {
            // use the image, e.g. draw part of it on a canvas
            const canvas = document.createElement( 'canvas' );
            const context = canvas.getContext( '2d' );
            context.drawImage( image, 100, 100 );
        },
    
        // onProgress callback currently not supported
        undefined,
    
        // onError callback
        function () {
            console.error( 'An error happened.' );
        }
    );
  }
}

export default Viewfinder;
