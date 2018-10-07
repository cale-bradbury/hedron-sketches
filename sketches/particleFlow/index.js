const THREE = require('three')
const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}

class ParticleFlow {

  constructor (scene) {
   	this.scene = scene;
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.root.add(this.group)
		
		this.frustum = new THREE.Frustum();
		this.frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(scene.camera.projectionMatrix, scene.camera.matrixWorldInverse));  


    // Empty array to be populated with meshes
		this.pointCount = 200;
		const MAX_POINTS = 1024;
		this.currentIndex = 0;
		
		this.geometry = new THREE.BufferGeometry();
		this.positions = new Float32Array( MAX_POINTS * 3 ); 
		this.velocity = new Float32Array( MAX_POINTS * 3 ); 
		this.colors = new Float32Array(MAX_POINTS*3);
		this.geometry.addAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );
		this.geometry.addAttribute( 'color', new THREE.BufferAttribute( this.colors, 3 ) );
		this.matertial = new THREE.PointsMaterial({size:30, sizeAttenuation:true,vertexColors: THREE.VertexColors})
		this.points = new THREE.Points(this.geometry, this.matertial);
		this.group.add(this.points);
		
		this.minHue = 0;
		this.maxHue = 360;
		this.minSat = 0;
		this.maxSat = 1;
		this.minBri = 0;
		this.maxBri = 1;
		this.needsColorUpdate = false;
		
		this.dampining = .99;
  }
	
	updateFlow(){
		for(var i = 0; i<this.currentIndex*3; i+=3){
			this.velocity[i] *= this.dampining;			
			this.positions[i] += this.velocity[i];
			this.velocity[i+1] *= this.dampining;			
			this.positions[i+1] += this.velocity[i+1];
			this.velocity[i+2] *= this.dampining;			
			this.positions[i+2] += this.velocity[i+2];
			//check if in frustrum!
		}
		this.geometry.attributes.position.needsUpdate = true;
	}
	
	updateColors(){
		var percent = 1/this.currentIndex;
		var n= 0;
		var color = new THREE.Color();
		for(var i = 0; i<this.currentIndex; i++){
			var j = i*3;
			color.setHSL( lerp(this.minHue, this.maxHue, n),
									 lerp(this.minSat, this.maxSat, n),
									 lerp(this.minBri, this.maxBri, n));
			n+=percent; 
			this.colors[j] = color.r;
			this.colors[j+1] = color.g;
			this.colors[j+2] = color.b;
		}
		this.geometry.attributes.color.needsUpdate = true;
	}
	
	addPoint(x, y, z){
		this.currentIndex++;
		var i = this.currentIndex*3;
		this.velocity[i] = 0;
		this.positions[i++] = x;
		this.velocity[i] = 0;
		this.positions[i++] = y;
		this.velocity[i] = 0;
		this.positions[i] = z;
		this.geometry.attributes.position.needsUpdate = true;
		this.geometry.setDrawRange( 0, this.currentIndex ); 
	}

  update (params, time, frameDiff, allParams) {
		while(params.count>this.currentIndex){
			this.addPoint(Math.random()-.5, Math.random()-.5, Math.random()-.5)
			this.needsColorUpdate = true;
		}
		while(params.count<this.currentIndex){
			this.currentIndex--;
			this.geometry.setDrawRange( 0, this.currentIndex ); 
			this.needsColorUpdate = true;
		}
		
		if(this.minHue!=params.minHue || 
			 this.maxHue!=params.maxHue ||
			 this.minSat!=params.minSat ||
			 this.maxSat!=params.maxSat ||
			 this.minBri!=params.minBri ||
			 this.maxBri!=params.maxBri
			){
			this.minHue = params.minHue;
			this.maxHue = params.maxHue;
			this.minSat = params.minSat;
			this.maxSat = params.maxSat;
			this.minBri = params.minBri;
			this.maxBri = params.maxBri;
			this.needsColorUpdate = true;
		}
		
		this.dampining = params.dampining;
		this.randomVelocityStrength = params.randomVelocityStrength;
		
		if(this.needsColorUpdate)
			this.updateColors();
		
		this.updateFlow();
		
		this.group.scale.set(1500,1000,1000)
  }
	
  randomize () {
		for(var i = 0; i<this.currentIndex*3; i++){
			this.velocity[i] = (Math.random()-.5)*this.randomVelocityStrength;
		}
	}
}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = ParticleFlow
