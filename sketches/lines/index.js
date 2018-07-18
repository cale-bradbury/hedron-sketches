const THREE = require('three')
const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class Lines {

  constructor (scene) {
   	this.scene = scene;
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.root.add(this.group)

    // Empty array to be populated with meshes
    this.points = []
		this.shapeCount = 1;
		this.pointCount = 0;

    // Defining a single material for all the polyhedra
    this.mat = new THREE.LineBasicMaterial(
      { color: new THREE.Color() }
    )
		
		this.tempGeo = new THREE.BoxGeometry(1);
		this.lines = [];
		this.currentPoints = []
		this.targetPoints = []
		this.startPoints = []
		this.index = 0;
		this.anim = 0;
  }

  update (params, time, frameDiff, allParams) {
		this.mat.color.setHSL(params.colorH, params.colorS, params.colorL)
		
		params.repeat = Math.floor(params.repeat);
		if(params.repeat>this.lines.length){
			var l = new THREE.LineLoop(this.tempGeo, this.mat);
			this.group.add(l);
			this.lines.push(l);
		}else if(params.repeat<this.lines.length){
			this.group.remove(this.lines.pop())
		}
		
		if(params.shapeCount != this.shapeCount || params.pointCount != this.pointCount){
			this.shapeCount = params.shapeCount;
			this.pointCount = params.pointCount;
			this.randomize();
		}
    this.group.rotation.x = params.rotX
    this.group.rotation.y = params.rotY/this.lines.length
    this.group.rotation.z = params.rotZ
    this.group.scale.set(params.scale, params.scale, params.scale)
		this.scene.camera.fov = params.fov;
		this.scene.camera.updateProjectionMatrix();
		if(this.points.length>1){
			this.anim += params.smoothing;
			for(var i = 0; i<this.currentPoints.length; i++){
				this.currentPoints[i] = this.startPoints[i];
				this.currentPoints[i].lerp(this.targetPoints[i], Math.min(1, Math.max(0,  this.anim-i*params.animStep)))
			}
			var geo = new THREE.Geometry();
			geo.vertices.push(...this.currentPoints)
			for(var i = 0; i< this.lines.length; i++){
				this.lines[i].geometry = geo;
				this.lines[i].rotation.y = Math.PI*2/this.lines.length*i; 
			}
		}
  }
	
  randomize () {
		this.points = [];
		for(var i = 0; i<this.shapeCount; i++){
			var a = [];
			for(var j = 0; j<this.pointCount; j++){
				a.push(new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5))
			}
			this.points.push(a);
		}
		this.targetPoints = this.points[0];
		while(this.currentPoints.length>this.targetPoints.length){
			this.currentPoints.pop();
		}
		while(this.currentPoints.length<this.targetPoints.length){
			this.currentPoints.push(new THREE.Vector3());
		}
		this.startPoints = this.currentPoints;
		this.anim = 0;
		this.index = 0;
	}

  shift () {
		this.startPoints = this.currentPoints;
		this.anim = 0;
    this.index++;
		this.index %= this.points.length;
		this.targetPoints = this.points[this.index];
  }
}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Lines
