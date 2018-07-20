const THREE = require('three')
const glsl = require('glslify')
const vert = glsl.file('./vertex.glsl')
const frag = glsl.file('./frag.glsl')

const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class VertHack {

  constructor (scene) {
   	this.scene = scene;
    this.materials = [];
    this.texture = new THREE.TextureLoader().load(__dirname+"\\lut.png");
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.search();
  }

  update (params, time, frameDiff, allParams) {
		for(var i = 0; i<this.materials.length; i++){
			this.materials[i].uniforms.normalAmp.value = params.normalAmp
			this.materials[i].uniforms.waveAmp.value = new THREE.Vector3(params.xAmp, params.yAmp, params.zAmp);
			this.materials[i].uniforms.waveFreq.value = new THREE.Vector3(params.xFreq, params.yFreq, params.zFreq);
			this.materials[i].uniforms.wavePhase.value = new THREE.Vector3(params.xPhase, params.yPhase, params.zPhase);
			this.materials[i].uniforms.sampleParams.value = {x:params.lutY,
                                                             y:params.lutRotation,
                                                             z:params.lutScale,
                                                             w:0}
		}		
  }
	
	search(){
		this.materials = [];
		this.findMaterialInChildren(this.scene.scene);
		for(var i = 0; i<this.materials.length; i++){
			this.materials[i].vertexShader = vert;
			if(this.materials[i].uniforms == null)
				this.materials[i].uniforms = {};
			this.materials[i].uniforms.normalAmp = {type:'f', value:1}
			this.materials[i].uniforms.sampleParams = {type:'v4', value:new THREE.Vector4()}
			this.materials[i].uniforms.waveAmp = {type:'v3', value:new THREE.Vector3()}
			this.materials[i].uniforms.wavePhase = {type:'v3', value:new THREE.Vector3()}
			this.materials[i].uniforms.waveFreq = {type:'v3', value:new THREE.Vector3()}
			this.materials[i].uniforms.tex = {type:'t', value:this.texture}
			this.materials[i].needsUpdate = true;
		}
		console.log('found '+this.materials.length+' materials');
	}
	findMaterialInChildren(obj){
		if(obj.children==null)
			return;
		for(var i = 0; i<obj.children.length; i++){
			if(obj.children[i].material !=null){
				obj.children[i].material = new THREE.ShaderMaterial({
					vertexShader:vert,
                    fragmentShader:frag
				})
				obj.children[i].material.side =THREE.DoubleSide;
              this.materials.push(obj.children[i].material);
			}
			this.findMaterialInChildren(obj.children[i]);
		}
	}
	
  randomize () {
	
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = VertHack
