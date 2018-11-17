const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const SavePass = require('../../shared/savepass')(THREE,EffectComposer)
const glsl = require('glslify')
const feedbackFrag = glsl.file('./feedbacker.glsl')

class Feedback {

  constructor(scene, meta, params) {
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

    this.save = new SavePass();

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
          value: params.blend
        },
        debug: {
          type: "b",
          value: false
        },
        rgbSplit: {
          type: "b",
          value: false
        },
        keyBlack: {
          type: "b",
          value: false
        },
        center: {
          type: "v4",
          value: new THREE.Vector4(.5, .5, 1, .5)
        },
        spread: {
          type: "v4",
          value: new THREE.Vector4(.01, 0., 0., 0.)
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
    if(params.postToggled == 1)
      this.togglePostSave()
    this.clearNextFrame = true;
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
  rgbSplit() {
    this.shift.uniforms.rgbSplit.value = !this.shift.uniforms.rgbSplit.value;
  }
  keyBlack() {
    this.shift.uniforms.keyBlack.value = !this.shift.uniforms.keyBlack.value;
  }

  togglePostSave() {
    this.added = !this.added;
    if (!this.added) {
      this.scene.removePost(this.postSave);
      return {postToggled: 0}
    } 
    this.scene.addPost(this.postSave);
    return {postToggled: 1}    
  }
  
  setBlend(i){
    this.shift.uniforms.blend.value = i;
    return {blend:i}
  }
  blendLerp() {
    return this.setBlend(0);
  }
  blendAdd() {
    return this.setBlend(1);
  }
  blendDivide() {
    return this.setBlend(2);
  }
  blendDifference() {
    return this.setBlend(3);
  }
  blendBurn() {
    return this.setBlend(4);
  }
  blendDarken() {
    return this.setBlend(5);
  }
  blendMultiply() {
    return this.setBlend(6);
  }
  blendScreen() {
    return this.setBlend(7);
  }
  blendPin() {
    return this.setBlend(8);
  }
  blendSaturation() {
    return this.setBlend(9);
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
      w: size.height/size.width
    }
    this.shift.uniforms.angle.value = {
      x: params.angleMin,
      y: params.angleMax,
      z: params.angleFreq,
      w: params.anglePhase
    }
    
    this.shift.uniforms.spread.value = {
      x: params.micSpread,
      y: 0,
      z: params.spreadX,
      w: params.spreadY
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
