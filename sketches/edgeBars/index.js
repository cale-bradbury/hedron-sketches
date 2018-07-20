const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const glsl = require('glslify')
const frag = glsl.file('./edgeBars.glsl')

class EdgeBars {

  constructor(scene) {
    this.scene = scene;
    var vert = "varying vec2 local;\n" +
      "void main(){\n" +
      "	local = uv;\n" +
      "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n" +
      "}";

    
    this.texture = new THREE.TextureLoader().load(__dirname+"\\..\\vertHack\\lut.png");
    //this.texture.magFilter = THREE.NearestFilter;
   // this.texture.minFilter = THREE.NearestFilter;
    this.texture.wrapS  = THREE.RepeatWrapping;
   // this.texture.wrapT  = THREE.RepeatWrapping;
    
    this.mirror = new EffectComposer.ShaderPass({
      uniforms: {
        tex: {
          type: "t",
          value: null
        },
        sample: {
          type:"t",
          value: this.texture
        },
        clip: {
          type: "v",
          value: new THREE.Vector4(0)
        },
        scale: {
          type: "v2",
          value: new THREE.Vector2(1,1)
        },
        aspect: {
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

  update(params, time, delta, allParams) {
    var size = this.scene.renderer.getSize();
    this.mirror.uniforms.aspect.value = 1+size.height/size.width;
    this.mirror.uniforms.scale.value = new THREE.Vector2(params.scale, params.step);
    this.mirror.uniforms.clip.value = new THREE.Vector4(params.strength, params.rotation, params.lutY, params.phase);
    this.texture.repeat = THREE.RepeatWrapping;
    this.mirror.uniforms.sample.value = this.texture;
   
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = EdgeBars
