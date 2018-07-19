const THREE = require('three')
const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class AudioRings {

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
      { color: new THREE.Color('#ffffff') }
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
		
		params.shapeCount = Math.floor(params.shapeCount);
		params.pointCount = Math.floor(params.pointCount);
		if(params.shapeCount>this.lines.length){
			var l = new THREE.LineLoop(this.tempGeo, this.mat);
			this.group.add(l);
			this.lines.push(l);
		}else if(params.shapeCount<this.lines.length){
			this.group.remove(this.lines.pop())
		}
		
		if(params.pointCount != this.pointCount){
			this.pointCount = params.pointCount;
			this.randomize();
		}
    this.group.scale.set(params.scale, params.scale, params.scale)
			
		for(var j = 0; j< this.lines.length; j++){
			var inc = Math.PI*2/this.pointCount;
			var a = 0;
			this.currentPoints=[];
			for(var i = 0; i<this.pointCount; i++){
				this.currentPoints.push(new THREE.Vector3(Math.sin(a)* (1.+j*.1), Math.cos(a)* (1.+j*.1), 0));
				a+= inc;				
			}
			var geo = new THREE.Geometry();
			geo.vertices.push(...this.currentPoints)
			this.lines[j].geometry = geo;
		}
  }
	
  randomize () {
		this.points = [];
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
module.exports = AudioRings
