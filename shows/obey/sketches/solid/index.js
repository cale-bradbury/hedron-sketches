/** HEDRON TIP **
This is a nice and simple sketch to get you going!
A polyhedron that can spin on all axes. The user can change the speed of the rotation.
The user can change the scale. The user can also click on "shapeshift" and the geometry changes.
**/

/** HEDRON TIP **
  Hedron uses three.js, so you'll need that :)
**/
const THREE = require('three')

/** HEDRON TIP **
  Hedron sketches must be a class
**/
class Solid {

  constructor () {
    /** HEDRON TIP **
      Must define a "root" property as a THREE.Group or THREE.Object3D
      Hedron looks for this and will add it to the scene.
    **/
    this.root = new THREE.Group()

    /** HEDRON TIP **
      It's good practice to not manipulate the root object
      so we create another group and add it to the root.
      This isn't required and the name isn't important.
    **/
    this.group = new THREE.Group()
    this.root.add(this.group)

    // Empty array to be populated with meshes
    this.meshes = []

    // Defining a single material for all the polyhedra
    const mat = new THREE.MeshBasicMaterial(
      { wireframe: true, color: 0xffffff }
    )
    const size = 300

    // Array geometries (the platonic solids!)
    const geoms = [
      new THREE.IcosahedronGeometry(size),
      new THREE.BoxGeometry(size, size, size),
      new THREE.OctahedronGeometry(size),
      new THREE.TetrahedronGeometry(size),
      new THREE.DodecahedronGeometry(size)
    ]

    // Loop through meshes
    geoms.forEach(geom => {
      // Create a mesh for each solid
      const mesh = new THREE.Mesh(geom, mat)
      // Add to array
      this.meshes.push(mesh)
      // Add to scene
      this.group.add(mesh)
    })

    // Index of meshes for shapeshifting
    this.currentMeshIndex = -1

    // Do one shapeshift to start (hides all but one mesh)
    this.shapeShift()
  }

  /** HEDRON TIP **
    The update method is called every frame by hedron.
    You have the following arguments to make use of...

    ownParams: An object containing params defined in config.js.
    These are values between 0 and 1 that can be manipulated in many ways by the user.

    time: Elapsed time in ms (not used below)

    frameDiff: Number of frames that should have passed since last frame.
    Useful for keeping speeds consistent.
    If the framerate changes, this value changes too. At 60fps the value will be
    exactly 1. Less than 60fps and the value goes above 1. More than 60fps and the value
    goes below 1. See below on how it can be used.

    allParams: An object containing all params from all sketches. (not used below)
  **/
  update (params, time, frameDiff, allParams) {
    // Solids spin too fast at 1
    const baseSpeed = 0.15

    /** HEDRON TIP **
      Making use of params.rotSpeedX to rotate the solid. When the user changes
      the "Rotation Speed X" param (defined in config.js), it will change here and the
      speed increases. We're multiplying the final increase by 'frameDiff'
      so that the speed stays consistent across varying framerates.
    **/
    this.group.rotation.x = params.rotX
    this.group.rotation.y = params.rotY
    this.group.rotation.z = params.rotZ

    // Change scale using params.scale
    params.scale = Math.max(params.scale * 4, 0.00001)
    this.group.scale.set(params.scale, params.scale, params.scale)
  }

  /** HEDRON TIP **
    All methods of the class (except "update") are exposed as "shots".
    These are single functions that can fire rather than paramaters than slowly change.
    See config.js to see how these are defined.
  **/
  shapeShift () {
    // Increase index to shapeshift
    this.currentMeshIndex ++
    // If at end of array, loop round
    if (this.currentMeshIndex > this.meshes.length - 1) this.currentMeshIndex = 0

    // Loop through meshes and only show the mesh
    // that matches with current index
    this.meshes.forEach((mesh, index) => {
      if (this.currentMeshIndex !== index) {
        mesh.visible = false
      } else {
        mesh.visible = true
      }
    })
  }
}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Solid
