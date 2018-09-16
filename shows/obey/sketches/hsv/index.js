const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const project = require('../../project.json')
const glsl = require('glslify')
const hueFrag = glsl.file('./hsv.glsl')

class HSV {

  constructor(scene) {
		
    var vert = "varying vec2 local;\n" +
      "void main(){\n" +
      "	local = uv;\n" +
      "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n" +
      "}";
		
    this.root = new THREE.Group()
		
		 this.hue = new EffectComposer.ShaderPass({
      uniforms: {
        
        hsv: {
          type: "v4",
          value: new THREE.Vector4(0, 0, 0, 0)
        }
      },
      vertexShader: vert,
      fragmentShader: hueFrag

    }, "tex");

    scene.addPost(this.hue);
    

  }

  update(params, time, delta, allParams) {
    this.hue.uniforms.hsv.value = new THREE.Vector4(params.hue, params.saturation, params.brightness, 0);
		
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = HSV
