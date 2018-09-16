const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const glsl = require('glslify')
const frag = glsl.file('./mirror.glsl')

class Mirror {

  constructor(scene) {
    var vert = "varying vec2 local;\n" +
      "void main(){\n" +
      "	local = uv;\n" +
      "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n" +
      "}";


    this.mirror = new EffectComposer.ShaderPass({
      uniforms: {
        tex: {
          type: "t",
          value: null
        },
        mirrorX: {
          type: "i",
          value: 0
        },
        mirrorY: {
          type: "i",
          value: 0
        },
        scale: {
          type: "f",
          value: 1
        },
        blackX: {
          type: "f",
          value:0
        },
        blackY: {
          type: "f",
          value:0
        }
      },
      vertexShader: vert,
      fragmentShader: frag

    }, "tex");

    scene.addPost(this.mirror);

  }
  
  destructor(scene){
    scene.removePost(this.mirror);
  }


  mirrorX() {
    this.mirror.uniforms.mirrorX.value = this.mirror.uniforms.mirrorX.value == 1 ? 2 : 1;
  }
  mirrorY() {
    this.mirror.uniforms.mirrorY.value = this.mirror.uniforms.mirrorY.value == 1 ? 2 : 1;
  }
  mirrorOff() {
    this.mirror.uniforms.mirrorX.value = 0;
    this.mirror.uniforms.mirrorY.value = 0;
  }

  update(params, time, delta, allParams) {
    this.mirror.uniforms.blackX.value = params.blackoutX;
    this.mirror.uniforms.blackY.value = params.blackoutY;
    this.mirror.uniforms.scale.value = params.scale;
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Mirror
