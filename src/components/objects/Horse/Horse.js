import * as THREE from '/node_modules/three/build/three.module.js';

    import Stats from '/node_modules/three/examples/jsm/libs/stats.module.js';

    import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

    let container, stats;
    let camera, scene, renderer;
    let mesh, mixer;

    const radius = 600;
    let theta = 0;
    let prevTime = Date.now();

    init();
    animate();

    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        //

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.y = 300;

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xf0f0f0 );

        //

        const light1 = new THREE.DirectionalLight( 0xefefff, 1.5 );
        light1.position.set( 1, 1, 1 ).normalize();
        scene.add( light1 );

        const light2 = new THREE.DirectionalLight( 0xffefef, 1.5 );
        light2.position.set( - 1, - 1, - 1 ).normalize();
        scene.add( light2 );

        const loader = new GLTFLoader();
        loader.load( "src/components/objects/Horse/Horse.glb", function ( gltf ) {

            mesh = gltf.scene.children[ 0 ];
            mesh.scale.set( 1.5, 1.5, 1.5 );
            scene.add( mesh );

            mixer = new THREE.AnimationMixer( mesh );

            mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();

        } );

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.outputEncoding = THREE.sRGBEncoding;

        container.appendChild( renderer.domElement );

        //

        stats = new Stats();
        container.appendChild( stats.dom );

        //

        window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function animate() {

        requestAnimationFrame( animate );

        render();
        stats.update();

    }

    function render() {

        theta += 0.1;

        camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
        camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );

        camera.lookAt( 0, 150, 0 );

        if ( mixer ) {

            const time = Date.now();

            mixer.update( ( time - prevTime ) * 0.001 );

            prevTime = time;

        }

        renderer.render( scene, camera );

    }