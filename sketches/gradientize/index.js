const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const glsl = require('glslify')
const frag = glsl.file('./gradientize.glsl')

class Gradientize {

  constructor(scene) {
    var vert = "varying vec2 local;\n" +
      "void main(){\n" +
      "	local = uv;\n" +
      "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n" +
      "}";


    this.gradient = new EffectComposer.ShaderPass({
      uniforms: {
        tex: {
          type: "t",
          value: null
        },
        cLow: {
          type: "v3",
          value: new THREE.Color()
        },
        cMid: {
          type: "v3",
          value: new THREE.Color()
        },
        cHigh: {
          type: "v3",
          value: new THREE.Color()
        },
        greyscale: {
          type: "i",
          value: 0
        }
      },
      vertexShader: vert,
      fragmentShader: frag

    }, "tex");

    scene.addPost(this.gradient);

  }
  
  destructor(scene){
    scene.removePost(this.gradient);
  }

  update(params, time, delta, allParams) {
    this.gradient.uniforms.cLow.value = new THREE.Color().setHSL(params.hueLow, params.satLow, params.briLow);
    this.gradient.uniforms.cMid.value = new THREE.Color().setHSL(params.hueMid, params.satMid, params.briMid);
    this.gradient.uniforms.cHigh.value = new THREE.Color().setHSL(params.hueHigh, params.satHigh, params.briHigh);
  }
  
  greyscale(){
     this.gradient.uniforms.greyscale.value += 1;
     this.gradient.uniforms.greyscale.value %= 2;
  }
  
  randomize(){
     return {
       hueLow: Math.random(),
       hueMid: Math.random(),
       hueHigh: Math.random(),
     }
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Gradientize
