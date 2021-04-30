"use strict";

// Particle constructor
function Particle(x, y, z, mass) {
  this.position = new THREE.Vector3(); // position
  this.previous = new THREE.Vector3(); // previous
  this.original = new THREE.Vector3(); // original
  initParameterizedPosition(x, y, this.position);
  initParameterizedPosition(x, y, this.previous);
  initParameterizedPosition(x, y, this.original);

  this.netForce = new THREE.Vector3(); // net force acting on particle
  this.mass = mass; // mass of the particle
  this.correction = new THREE.Vector3(); // offset to apply to enforce constraints
}

// Snap a particle back to its original position
Particle.prototype.lockToOriginal = function() {
  this.position.copy(this.original);
  this.previous.copy(this.original);
};

// Snap a particle back to its previous position
Particle.prototype.lock = function() {
  this.position.copy(this.previous);
  this.previous.copy(this.previous);
};

// Add the given force to a particle's total netForce.
// Params:
// * force: THREE.Vector3 - the force to add
Particle.prototype.addForce = function(force) {
  // ----------- STUDENT CODE BEGIN ------------
  // ----------- Our reference solution uses 1 lines of code.

  this.netForce.add(force);

  // ----------- STUDENT CODE END ------------
};

// Perform Verlet integration on this particle with the provided
// timestep deltaT.
// Params:
// * deltaT: Number - the length of time dt over which to integrate
Particle.prototype.integrate = function(deltaT) {
  const DAMPING = SceneParams.DAMPING;

  // ----------- STUDENT CODE BEGIN ------------
  // You need to:
  // (1) Save the old (i.e. current) position into this.previous.
  // (2) Compute the new position of this particle using Verlet integration,
  //     and store it into this.position.
  // (3) Reset the net force acting on the particle (i.e. make it (0, 0, 0) again).
  // ----------- Our reference solution uses 13 lines of code.

  // compute new position
  let term1 = this.position.clone();
  let term21 = 1 - DAMPING;
  let term22 = this.position.clone().sub(this.previous);
  let term31 = this.netForce.clone().divideScalar(this.mass);
  let term32 = deltaT * deltaT;

  let newpos = term1;
  newpos.add(term22.multiplyScalar(term21));
  newpos.add(term31.multiplyScalar(term32));

  // store old position
  this.previous.copy(this.position);

  // store newpos in new position
  this.position.copy(newpos);

  // reset net force
  this.netForce = new THREE.Vector3(0.0, 0.0, 0.0);

  // ----------- STUDENT CODE END ------------
};

// Handle collisions between this Particle and the provided floor.
// Note: the fields of floor are documented for completeness, but you
//       *WILL NOT* need to use all of them.
// Params:
// * floor: An object representing the floor of the scene, with properties:
//    - mesh: THREE.Mesh - the physical representation in the scene
//    - geometry: THREE.PlaneBufferGeometry - the abstract geometric representation
//    - material: THREE.MeshPhongMaterial - material information for lighting
Particle.prototype.handleFloorCollision = function(floor) {
  let floorMesh = floor.mesh;
  let floorPosition = floorMesh.position;
  const EPS = 3;
  // ----------- STUDENT CODE BEGIN ------------
  // Handle collision of this particle with the floor.
  // ----------- Our reference solution uses 4 lines of code.

  let GROUND_Y = floorPosition.y;
  if (this.position.y < GROUND_Y + EPS) this.position.y = GROUND_Y + EPS;

  // ----------- STUDENT CODE END ------------
};

// Handle collisions between this Particle and the provided sphere.
// Note: the fields of sphere are documented for completeness, but you
//       *WILL NOT* need to use all of them.
// Params:
// * sphere: An object representing a sphere in the scene, with properties:
//    - mesh: THREE.Mesh - the physical representation in the scene
//    - geometry: THREE.SphereGeometry - the abstract geometric representation
//    - material: THREE.MeshPhongMaterial - material information for lighting
//    - radius: number - the radius of the sphere
//    - position: THREE.Vector3 - the sphere's position in this frame
//    - prevPosition: THREE.Vector3 - the sphere's position in the previous frame
Particle.prototype.handleSphereCollision = function(sphere) {
  if (sphere.mesh.visible) {
    const friction = SceneParams.friction;
    let spherePosition = sphere.position.clone();
    let prevSpherePosition = sphere.prevPosition.clone();
    let EPS = 5; // empirically determined
    // ----------- STUDENT CODE BEGIN ------------
    // Handle collision of this particle with the sphere.
    // As with the floor, use EPS to prevent clipping.
    let posFriction = new THREE.Vector3();
    let posNoFriction = new THREE.Vector3();
    // ----------- Our reference solution uses 28 lines of code.

    // if outside the circle, do nothing
    let centerToPoint = this.position.clone().sub(sphere.position);
    if (centerToPoint.length() > sphere.radius + EPS) return;

    // compute posNoFriction (project point onto sphere)
    centerToPoint.normalize();
    posNoFriction = spherePosition.clone().add(centerToPoint.clone().multiplyScalar(sphere.radius + EPS));

    // if outside circle at last time step...
    let centerToPointPrev = this.previous.clone().sub(prevSpherePosition);
    if (centerToPointPrev.length() > sphere.radius + EPS) {
      // compute posFriction
      let sphereV = spherePosition.clone().sub(prevSpherePosition);
      posFriction = this.previous.clone().add(sphereV);

      // add weighted values
      this.position.copy(posFriction.clone().multiplyScalar(friction).add(posNoFriction.clone().multiplyScalar(1-friction)));
    } else {
      // if not, just change position to posNoFriction
      this.position.copy(posNoFriction.clone());
    }


    // ----------- STUDENT CODE END ------------
  }
};

// Handle collisions between this Particle and the provided axis-aligned box.
// Note: the fields of box are documented for completeness, but you
//       *WILL NOT* need to use all of them.
// Params:
// * box: An object representing an axis-aligned box in the scene, with properties:
//    - mesh: THREE.Mesh - the physical representation in the scene
//    - geometry: THREE.BoxGeometry - the abstract geometric representation
//    - material: THREE.MeshPhongMaterial - material information for lighting
//    - boundingBox: THREE.Box3 - the bounding box of the box in the scene
Particle.prototype.handleBoxCollision = function(box) {
  if (box.mesh.visible) {
    const friction = SceneParams.friction;
    let boundingBox = box.boundingBox.clone();
    const EPS = 10; // empirically determined
    // ----------- STUDENT CODE BEGIN ------------
    // Handle collision of this particle with the axis-aligned box.
    // As before, use EPS to prevent clipping
    let posFriction = new THREE.Vector3();
    let posNoFriction = new THREE.Vector3();
    // ----------- Our reference solution uses 66 lines of code.

    // if outside box, do nothing
    let outX = (this.position.x < boundingBox.min.x - EPS) || (this.position.x > boundingBox.max.x + EPS);
    let outY = (this.position.y < boundingBox.min.y - EPS) || (this.position.y > boundingBox.max.y + EPS);
    let outZ = (this.position.z < boundingBox.min.z - EPS) || (this.position.z > boundingBox.max.z + EPS);
    if (outX || outY || outZ) return;

    // compute posNoFriction
    // find nearest intersecting plane
    let distLeft = Math.abs(this.position.x - boundingBox.min.x);
    let distRight = Math.abs(this.position.x - boundingBox.max.x);
    let distBottom = Math.abs(this.position.y - boundingBox.min.y);
    let distTop = Math.abs(this.position.y - boundingBox.max.y);
    let distFront = Math.abs(this.position.z - boundingBox.min.z);
    let distBack = Math.abs(this.position.z - boundingBox.max.z);

    let nearest = Math.min(Math.min(Math.min(distLeft, distRight), Math.min(distBottom, distTop)), Math.min(distFront, distBack));

    // posNoFriction is projection onto nearest plane (ish??)
    if (nearest == distLeft)        { posNoFriction = new THREE.Vector3(boundingBox.min.x - EPS, this.position.y, this.position.z); }
    else if (nearest == distRight)  { posNoFriction = new THREE.Vector3(boundingBox.max.x + EPS, this.position.y, this.position.z); }
    else if (nearest == distBottom) { posNoFriction = new THREE.Vector3(this.position.x, boundingBox.min.y - EPS, this.position.z); }
    else if (nearest == distTop)    { posNoFriction = new THREE.Vector3(this.position.x, boundingBox.max.y + EPS, this.position.z); }
    else if (nearest == distFront)  { posNoFriction = new THREE.Vector3(this.position.x, this.position.y, boundingBox.min.z - EPS); }
    else                            { posNoFriction = new THREE.Vector3(this.position.x, this.position.y, boundingBox.max.z + EPS); }

    // if outside box at last time step...
    let outPrevX = (this.previous.x < boundingBox.min.x - EPS) || (this.previous.x > boundingBox.max.x + EPS);
    let outPrevY = (this.previous.y < boundingBox.min.y - EPS) || (this.previous.y > boundingBox.max.y + EPS);
    let outPrevZ = (this.previous.z < boundingBox.min.z - EPS) || (this.previous.z > boundingBox.max.z + EPS);
    if (outPrevX || outPrevY || outPrevZ) {
      // compute posFriction
      posFriction.copy(this.previous);

      // add weighted values
      this.position.copy(posFriction.clone().multiplyScalar(friction).add(posNoFriction.clone().multiplyScalar(1-friction)));
    } else {
      // if not, just change position to posNoFriction
      this.position.copy(posNoFriction);
    }

    // ----------- STUDENT CODE END ------------
  }
};

// ------------------------ Don't worry about this ---------------------------
// Apply the cached correction vector to this particle's position, and
// then zero out the correction vector.
// Particle.prototype.applyCorrection = function() {
//   this.position.add(this.correction);
//   this.correction.set(0,0,0);
// }
