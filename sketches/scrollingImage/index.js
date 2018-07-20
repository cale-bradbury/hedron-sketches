const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const glsl = require('glslify')
const frag = glsl.file('./scroll.glsl')

class ScrollingImage {

  constructor(scene) {
    this.scene = scene;
    var vert = "varying vec2 local;\n" +
      "void main(){\n" +
      "	local = uv;\n" +
      "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n" +
      "}";

    this.clip = new THREE.Vector4(0, 0, 1, 1);
    this.texture = new THREE.TextureLoader().load(__dirname+"\\GrowingfFlags.png");
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
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
    var screen = this.scene.renderer.getSize();
    var textureRatio = this.texture.image.height/this.texture.image.width;
    var screenRatio = 1.+screen.height/screen.width;
    textureRatio*= screenRatio;
    this.clip.x = params.x;
    this.clip.y = params.y;
    this.clip.z = textureRatio;
    this.mirror.uniforms.clip.value = this.clip;
    this.mirror.uniforms.sample.value = this.texture;
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = ScrollingImage
