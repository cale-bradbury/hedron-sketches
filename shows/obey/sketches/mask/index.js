const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const project = require('../../project.json')
const glsl = require('glslify')
const maskFrag = glsl.file('./mask.glsl')

class Mask {

  constructor(scene) {
		
    var vert = "varying vec2 local;\n" +
      "void main(){\n" +
      "	local = uv;\n" +
      "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n" +
      "}";
		
    this.root = new THREE.Group()
		
		 this.mask = new EffectComposer.ShaderPass({
      uniforms: {
        
        cardnal: {
          type: "v4",
          value: new THREE.Vector4(.5, .5, 1, .5)
        },
        diagonal: {
          type: "v4",
          value: new THREE.Vector4(.5, .5, 1, .5)
        },
        smoothing: {
          type: "b",
          value: false
        },        
        color: {
          type: "v4",
          value: new THREE.Vector4(0,0,0,1)
        }
      },
      vertexShader: vert,
      fragmentShader: maskFrag

    }, "tex");

    scene.addPost(this.mask);
    

  }

  update(params, time, delta, allParams) {
    this.mask.uniforms.cardnal.value = new THREE.Vector4(params.up, params.right, params.down, params.left);
    this.mask.uniforms.diagonal.value = new THREE.Vector4(params.upRight, params.downRight, params.downLeft, params.upLeft);
    this.mask.uniforms.smoothing.value = params.smoothing;
    this.mask.uniforms.color.value = {x:params.hue, y:params.saturation, z:params.brightness, w:0};
		
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Mask
