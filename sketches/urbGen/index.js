const THREE = require('three')
const glsl = require('glslify')
const vert = glsl.file('./vertex.glsl')
const frag = glsl.file('./frag.glsl')
const URBGEN = require('./UrbGen.js')

const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class UrbanGenerator {

  constructor (scene) {
   	this.scene = scene;
		this.root = new THREE.Object3D()
		this.parent  =new THREE.Object3D();
		this.root.add(this.parent);
		this.gen = new URBGEN.Generator()
    this.args = {
			globalAngle: 0.1, // the overall grid angle
			blockSize: 15000, // the minimum block size 
			cityWidth: 400, // the width of the city
			cityDepth: 400, // the depth of the city 
			streetWidth: 25, // the width of the streets
			localGrids: 0.9, // the size of regions with a unique grid angle 
			randomSeed: 0.6, // seeds the random number generator
			throughRoads: 27 // the distance at which street ends snap together
		}
		
		
		this.material = new THREE.MeshBasicMaterial({
			vertexColors: THREE.VertexColors
		});
		this.geometry = new THREE.BoxGeometry()
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.rotation.set(-Math.PI*.5, 0,0)
		this.mesh.position.set(-1000,-400, -1000)
		this.mesh.scale.set(5,5,5)
		this.parent.add(this.mesh);
		this.randomize();
		
		this.scene.scene.fog = new THREE.Fog(0x000000, 100, 3000)
  }

  update (params, time, frameDiff, allParams) {
		this.mesh.rotation.set(params.rotation, 0,0)
  }
	
  randomize () {
		this.args.randomSeed = Math.random();
		this.city = this.gen.generate(this.args);
		this.mesh.geometry = this.gen.getThreeJSGeometry(this.city.getPlots()); 
		this.mesh.geometry.colorsNeedUpdate = true;
		console.log(this.mesh.geometry)
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = UrbanGenerator
