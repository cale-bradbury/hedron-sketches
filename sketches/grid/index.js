const THREE = require('three')
const glsl = require('glslify')
const vertShader = glsl.file('./grid.vert')
const fragShader = glsl.file('./grid.frag')

const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class Grid {

  constructor (scene) {
   	this.scene = scene;
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.root.add(this.group)
    
    var geometry = new THREE.PlaneGeometry(1, 1,1,1);
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        color1: {
          type: "v4",
          value: {
            x: 0,
            y: 1,
            z: 0,
            w: 1
          }
        },
        color2: {
          type: "v4",
          value: {
            x: 1,
            y: 0,
            z: 1,
            w: 1
          }
        },
        colorLines: {
          type: "v4",
          value: {
            x: 0,
            y: 0,
            z: 0,
            w: 1
          }
        },
        shape: {
          type: "v4",
          value: {
            x: 1,     //x freq
            y: 1,     //y freq
            z: 0,     //x phase
            w: 0      //y phase
          }
        },
        lines: {
          type: "v4",
          value: {
            x: 0,   //visible
            y: 0,   //smoothstep start
            z: .1,   //smoothstep end
            w: 0    //edgeFalloff
          }
        }
      },
    });
    this.plane = new THREE.Mesh(geometry, this.material);
    this.group.add(this.plane);    
    this.mirror = new THREE.Mesh(geometry, this.material);
    this.group.add(this.mirror);
    
    this.color1 = new THREE.Color();
    this.color2 = new THREE.Color();
    this.white = new THREE.Color(1,1,1);
    this.black = new THREE.Color(0,0,0);
  }

  update (params, time, frameDiff, allParams) {
    this.plane.position.set(params.posX,params.posY,params.posZ); 
    this.mirror.position.set(params.posX,params.posY,-params.posZ);
    this.group.scale.set(params.scale,params.scale,params.scale);		
    this.group.rotation.set(params.rotX,params.rotY,params.rotZ);
    
    this.material.uniforms.shape.value = {
      x:params.freqX, 
      y:params.freqY,
      z:params.phaseX, 
      w:params.phaseY }
    this.material.uniforms.lines.value = {
      x:params.gridVisible, 
      y:params.gridFadeStart,
      z:params.gridFadeEnd, 
      w:params.edgeFade }
    
    this.color1.setHSL(params.hue, params.saturation, params.brightness)
    this.color2.setRGB(1-this.color1.r, 1-this.color1.g, 1-this.color1.b);
    if(params.colorMath>.5)
      this.color2.lerp(this.white, (params.colorMath-.5)*2);
    else
      this.color2.lerp(this.black, 1-params.colorMath*2);
    this.material.uniforms.color1.value = {
      x:this.color1.r, 
      y:this.color1.g,
      z:this.color1.b, 
      w:1}
    this.material.uniforms.color2.value = {
      x:this.color2.r, 
      y:this.color2.g,
      z:this.color2.b, 
      w:1}
  }
  
  toggleMirror(){
    if(this.mirror.parent == null){
      this.group.add(this.mirror);
    }else{
      this.group.remove(this.mirror);
    }
  }
	
  
}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Grid
