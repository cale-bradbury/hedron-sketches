const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE)
const SavePass = require('../../shared/savepass')(THREE, EffectComposer)
const glsl = require('glslify')
const feedbackFrag = glsl.file('./feedglitch.glsl')

class FeedGlitch {

  constructor(scene, params) {
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
        blend: {
          type: "i",
          value: 0
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
          value: new THREE.Vector4(.01, 0., 0., 0.)
        },
        shift: {
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
    if (params.postToggled == 1)
      this.togglePostSave()
    this.clearNextFrame = true;
    this.blendNextFrame = params.blend;
    setTimeout(this.debug.bind(this), 1000)
    setTimeout(this.debug.bind(this), 2000)
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
      return { postToggled: 0 }
    }
    this.scene.addPost(this.postSave);
    return { postToggled: 1 }
  }
  setBlend(i) {
    this.shift.uniforms.blend.value = i;
    return { blend: i }
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
    if (this.clearNextFrame) {
      if (this.blendNextFrame != -1) {
        this.setBlend(this.blendNextFrame)
        this.blendNextFrame = -1
      }
      this.clearNextFrame = false;
      params.fade = 0;
    }
    this.shift.uniforms.mic.value = this.scene.analyzer.texture;
    this.shift.uniforms.fade.value = params.fade;
    this.shift.uniforms.shift.value = {
      x: params.xMin / size.width,
      y: params.yMin / size.height,
      z: params.xMax / size.width,
      w: params.yMax / size.height
    }
    this.shift.uniforms.hsb.value = {
      x: params.hue,
      y: params.saturation,
      z: params.brightness,
      w: params.highCut
    }

    this.shift.uniforms.center.value = {
      x: params.xCenter,
      y: params.yCenter,
      z: 0,
      w: 0
    }
    //console.log(this.camera);
  }

  destructor(scene) {
    scene.removePost(this.shift);
    scene.removePost(this.save);
    scene.removePost(this.postSave);
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = FeedGlitch
