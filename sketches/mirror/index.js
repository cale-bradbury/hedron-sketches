const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const glsl = require('glslify')
const frag = glsl.file('./mirror.glsl')

class Mirror {

  constructor(scene, meta, params) {
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
          value: params.x
        },
        mirrorY: {
          type: "i",
          value: params.y
        },
        scale: {
          type: "f",
          value: 1
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
    return {x:this.mirror.uniforms.mirrorX.value}
  }
  mirrorY() {
    this.mirror.uniforms.mirrorY.value = this.mirror.uniforms.mirrorY.value == 1 ? 2 : 1;
    return {y:this.mirror.uniforms.mirrorY.value}
  }
  mirrorOff() {
    this.mirror.uniforms.mirrorX.value = 0;
    this.mirror.uniforms.mirrorY.value = 0;
    return {x:0, y:0}
  }

  update(params, time, delta, allParams) {
    this.mirror.uniforms.scale.value = params.scale;
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Mirror
