const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const glsl = require('glslify')
const frag = glsl.file('./overlay.glsl')

class Overlay {

  constructor(scene) {
    var vert = "varying vec2 local;\n" +
      "void main(){\n" +
      "	local = uv;\n" +
      "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n" +
      "}";

    this.size = new THREE.Vector4(1, 1, 1, 1)
    this.clip = new THREE.Vector4(0, 0, 1, 1);
    this.texture = new THREE.TextureLoader().load(__dirname+"\\show.png");
    //this.texture.magFilter = THREE.NearestFilter;
    //this.texture.minFilter = THREE.NearestFilter;
    
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
          value: this.clip
        },
        scale: {
          type: "v2",
          value: new THREE.Vector2(1,1)
        },
        blend: {
          type: "i",
          value: 0
        },
        strength: {
          type: "f",
          value: 0
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


  next() {
    this.clip.x += this.size.x;
    if(this.clip.x>=.99){
      this.clip.x = 0;
    }
    this.mirror.uniforms.clip.value = this.clip;
  }
  prev() {
    this.clip.x -= this.size.x;
    if(this.clip.x<0){
      this.clip.x = 1-this.size.x;
    }
    this.mirror.uniforms.clip.value = this.clip;
  }

  update(params, time, delta, allParams) {
    this.mirror.uniforms.scale.value = new THREE.Vector2(params.scale*(16./9.+1.), params.scale);
    this.mirror.uniforms.sample.value = this.texture;
    this.mirror.uniforms.blend.value = Math.round(params.blend);
    this.mirror.uniforms.strength.value = params.strength;
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Overlay
