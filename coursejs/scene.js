"use strict";

var Scene = Scene || {};

Scene.init = function () {
  Scene.loader = new THREE.TextureLoader();

  // Make a canvas to draw your simulation on
  Scene.container = Scene.buildContainer();
  Scene.stats = Scene.buildStats();

  // scene (First thing you need to do is set up a scene)
  Scene.scene = Scene.buildScene();

  // camera (Second thing you need to do is set up the camera)
  Scene.camera = Scene.buildCamera();

  // renderer (Third thing you need is a renderer)
  Scene.renderer = Scene.buildRenderer();

  // controls, so we can look around
  Scene.controls = Scene.buildControls();

  // lights (fourth thing you need is lights)
  Scene.lights = Scene.buildLights();

  // Now fill the scene with objects
  Scene.ground = Scene.buildGround();

  Scene.update();
};

Scene.buildContainer = function () {
  let container = document.createElement("div");
  document.body.appendChild(container);

  return container;
};

Scene.buildStats = function () {
  // This gives us stats on how well the simulation is running
  let stats = new Stats();
  Scene.container.appendChild(stats.domElement);

  return stats;
};

Scene.buildScene = function () {
  let scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

  return scene;
};

Scene.buildCamera = function () {
  let camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.y = 450;
  camera.position.z = 1500;
  Scene.scene.add(camera);

  return camera;
};

Scene.buildRenderer = function () {
  let renderer = new THREE.WebGLRenderer({
    antialias: true,
    devicePixelRatio: 1,
    preserveDrawingBuffer: true, // save drawing frames for screenshots
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(Scene.scene.fog.color);

  Scene.container.appendChild(renderer.domElement);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;

  return renderer;
};

// mouse controls (so you can look around the scene)
Scene.buildControls = function () {
  // controls = new THREE.TrackballControls(camera, renderer.domElement);
  let controls = new THREE.OrbitControls(
    Scene.camera,
    Scene.renderer.domElement
  );
  controls.update();

  return controls;
};

Scene.buildLights = function () {
  let light = new THREE.DirectionalLight(0xdfebff, 1.75);
  Scene.scene.add(new THREE.AmbientLight(0x666666));
  light.position.set(50, 200, 100);
  light.position.multiplyScalar(1.3);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  // If cloth shadows are getting clipped, then d must be a larger number
  let d = 350;
  light.shadow.camera.left = -d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = -d;
  light.shadow.camera.far = 1000;

  Scene.scene.add(light);
  return light;
};

Scene.buildGround = function () {
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
  ground.mesh.position.y = SceneParams.groundY - 1;
  ground.mesh.rotation.x = -Math.PI / 2;
  ground.mesh.receiveShadow = true;

  // handled in Scene.updateGroundTexture()
  // needed for ground texture
  // ground.texture = Scene.loader.load( "textures/terrain/grasslight-big.jpg" );
  // ground.texture.wrapS = ground.texture.wrapT = THREE.RepeatWrapping;
  // ground.texture.repeat.set( 25, 25 );
  // ground.texture.anisotropy = 16;
  // ground.material.map = ground.texture;

  Scene.scene.add(ground.mesh); // add ground to scene

  return ground;
};

Scene.createConstraintLine = function (constraint) {
  if (!Scene.constraintMaterials) {
    let mats = [];
    mats.push(new THREE.LineBasicMaterial({ color: 0xff0000 }));
    mats.push(new THREE.LineBasicMaterial({ color: 0x00ff00 }));
    mats.push(new THREE.LineBasicMaterial({ color: 0x0000ff }));
    mats.push(new THREE.LineBasicMaterial({ color: 0x000000 }));
    Scene.constraintMaterials = mats;
  }

  let line = {};
  let points = [constraint.p1.position, constraint.p2.position];
  line.geometry = new THREE.BufferGeometry().setFromPoints(points);

  // figure out materials
  let mats = Scene.constraintMaterials;
  let mat = mats[3]; // black
  let d = constraint.distance;
  let rest = SceneParams.restDistance;
  let restB = rest * SceneParams.restDistanceB;
  let restS = rest * SceneParams.restDistanceS;
  if (d == rest) mat = mats[0];
  else if (d == restS) mat = mats[1];
  else if (d == restB) mat = mats[2];

  line.mesh = new THREE.Line(line.geometry, mat);
  // Scene.scene.add(line.mesh);
  return line;
};

Scene.buildGroundTexture = function (imgName) {
  let fallback = function () {
    Scene.updateGroundTexture("404.png");
    Scene.ground.textures[imgName] = Scene.ground.textures["404.png"];
  };
  let texture = Scene.loader.load(
    `textures/terrain/${imgName}`,
    undefined,
    undefined,
    fallback
  );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(25, 25);
  texture.anisotropy = 16;
  return texture;
};

Scene.updateGroundTexture = function (imgName) {
  Scene.ground.material.needsUpdate = true;
  // Hide texture if we are disabling it
  if (!SceneParams.showGroundTexture) {
    Scene.ground.material.map = undefined;
    return;
  }

  // If we already constructed this material, re-use it
  let texture = Scene.ground.textures[imgName];
  if (texture) {
    Scene.ground.material.map = texture;
    return;
  }

  // Otherwise construct a new one
  texture = Scene.buildGroundTexture(imgName);
  // Tough to check if this async load went through OK - just assume so for now
  // and let the user troubleshoot

  Scene.ground.material.map = texture;
  Scene.ground.textures[imgName] = texture;
};

Scene.update = function () {
  // Repair broken SceneParams colors
  Params.repairColors();

  Scene.ground.material.color.setHex(SceneParams.groundColor);
  // Scene.ground.material.specular.setHex(SceneParams.groundSpecular);
  Scene.ground.material.emissive.setHex(SceneParams.groundEmissive);

  Scene.scene.fog.color.setHex(SceneParams.fogColor);
  Scene.renderer.setClearColor(Scene.scene.fog.color);
};
