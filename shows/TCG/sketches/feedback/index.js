const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const glsl = require('glslify')
const feedbackFrag = glsl.file('./feedbacker.glsl')

class Feedback {

  constructor(scene) {
    var vert = "varying vec2 local;\n" +
      "void main(){\n" +
      "	local = uv;\n" +
      "	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n" +
      "}";

    var defaultFrag = "varying vec2 local;\n" +
      "uniform sampler2D tex;\n" +
      "uniform float fade;\n" +
      "void main(){\n" +
      "	gl_FragColor = texture2D(tex,local);\n" +
      "}";



    this.root = new THREE.Group()
    this.camera = scene.camera;
    this.renderer = scene.renderer;
    this.scene = scene;

    this.save = new EffectComposer.SavePass();

    this.shift = new EffectComposer.ShaderPass({
      uniforms: {
        tex: {
          type: "t",
          value: null
        },
        last: {
          type: "t",
          value: this.save.renderTarget
        },
        mic: {
          type: "t",
          value: scene.analyzer.texture
        },
        fade: {
          type: "f",
          value: .5
        },
        time: {
          type: "f",
          value: 0
        },
        blend: {
          type: "i",
          value: 0
        },
        debug: {
          type: "b",
          value: false
        },
        center: {
          type: "v4",
          value: new THREE.Vector4(.5, .5, 1, .5)
        },
        shift: {
          type: "v4",
          value: new THREE.Vector4(0, 0, 0, 0)
        },
        angle: {
          type: "v4",
          value: new THREE.Vector4(0, 0, 0, 0)
        },
        hsb: {
          type: "v4",
          value: new THREE.Vector4(0, 0, 0, 0)
        }
      },
      vertexShader: vert,
      fragmentShader: feedbackFrag

    }, "tex");

    scene.addPost(this.shift);
    scene.addPost(this.save);
    this.postSave = new EffectComposer.ShaderPass({
      uniforms: {
        tex: {
          type: "t",
          value: null
        }
      },
      vertexShader: vert,
      fragmentShader: defaultFrag

    }, "tex")
    this.added = false;
    this.togglePostSave();
  }

  lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
  }

  panic() {
    this.clearNextFrame = true;
  }
  debug() {
    this.shift.uniforms.debug.value = !this.shift.uniforms.debug.value;
  }

  togglePostSave() {
    if (this.added) {
      this.scene.removePost(this.postSave);
    } else {
      this.scene.addPost(this.postSave);
    }
    this.added = !this.added;
  }
  blendLerp() {
    this.shift.uniforms.blend.value = 0;
  }
  blendAdd() {
    this.shift.uniforms.blend.value = 1;
  }
  blendDivide() {
    this.shift.uniforms.blend.value = 2;
  }
  blendDifference() {
    this.shift.uniforms.blend.value = 3;
  }
  blendBurn() {
    this.shift.uniforms.blend.value = 4;
  }
  blendDarken() {
    this.shift.uniforms.blend.value = 5;
  }
  blendMultiply() {
    this.shift.uniforms.blend.value = 6;
  }
  blendScreen() {
    this.shift.uniforms.blend.value = 7;
  }
  blendPin() {
    this.shift.uniforms.blend.value = 8;
  }
  blendSaturation() {
    this.shift.uniforms.blend.value = 9;
  }

  update(params, time, delta, allParams) {
    var size = this.scene.renderer.getSize();
   // params.xShift /= size.width;
   // params.yShift /= size.width;
    params.dShift /= 360 / 3.1415;
    params.aShift /= 360 / 3.1415

    if (this.clearNextFrame) {
      this.clearNextFrame = false;
      params.fade = 0;
    }
    this.shift.uniforms.center.value = {
      x: params.xPos,
      y: params.yPos,
      z: Math.round(params.angleScale),
      w: params.angleOffset
    }
    this.shift.uniforms.mic.value = this.scene.analyzer.texture;
    this.shift.uniforms.time.value = time;
    this.shift.uniforms.fade.value = params.fade;
    this.shift.uniforms.shift.value = {
      x: params.xShift,
      y: params.yShift,
      z: 0,
      w: 0
    }
    this.shift.uniforms.hsb.value = {
      x: params.hue,
      y: params.saturation,
      z: params.brightness,
      w: 1+size.width/size.height
    }
    this.shift.uniforms.angle.value = {
      x: params.angleMin,
      y: params.angleMax,
      z: params.angleFreq,
      w: params.anglePhase
    }
    //console.log(this.camera);
  }
  
  destructor(scene){
    scene.removePost(this.shift);
    scene.removePost(this.save);
    scene.removePost(this.postSave);
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Feedback
