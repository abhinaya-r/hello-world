import BGM from "./sounds/acww 1am.mp3";
import { Group } from "three";
import * as THREE from "three";

class Music extends Group {
    constructor(parent, camera) {
        super();

        // create an AudioListener and add it to the camera
        let listener = new THREE.AudioListener();
        camera.add(listener);

        // create a global audio source 
        let sound = new THREE.Audio(listener); 

        // load a sound and set it as the Audio object's buffer 
        let audioLoader = new THREE.AudioLoader(); 
        //Load a sound and set it as the Audio object's buffer
        audioLoader.load( BGM, function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop(true);
                sound.setVolume(0.5);
                sound.hasPlaybackControl = true;
                sound.play();
            }
        );

        // mute if desired
        const handleMute = (event) => {
            if (event.keyCode === 77) {
                if (sound.isPlaying) sound.pause();
                else sound.play();
            }
        }
        window.addEventListener("keydown", handleMute, false);
        
    }
}

export default Music;