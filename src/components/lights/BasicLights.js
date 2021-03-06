import { Group, SpotLight, AmbientLight, HemisphereLight, SpotlightHelper, PointLight } from 'three';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        // const dir = new SpotLight(0xffffff);
        // dir.position.set(-40, 50, -40)
        // const ambi = new AmbientLight(0x404040, 1.32);
        // dir.castShadow = true;
        const hemi = new HemisphereLight(0xffffff, 0xffffff, 1);
        const point = new PointLight(0xffffff, 1);
        point.position.set(5, 30, -10)
        // dir.position.set(5, 1, 2);
        // dir.target.position.set(0, 0, 0);

        this.add(point, hemi);
    }
}

export default BasicLights;
