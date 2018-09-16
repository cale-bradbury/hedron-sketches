const THREE = require('three')
const glsl = require('glslify')
const fragShader = glsl.file('./worleyWorld.glsl')

class WorleyWorld {

  constructor() {
    //shaders
    {
      var vert = "#ifdef GL_ES\n" +
        "precision highp float;\n" +
        "#endif\n" +
        "varying vec2 local;\n" +
        "void main(){\n" +
        "	local = uv;\n" +
        "	vec4 pos = vec4(position*2., 1.);\n" +
        "	gl_Position = pos;\n" +
        "}";
    }

    this.root = new THREE.Group()
    var geometry = new THREE.PlaneGeometry(1, 1);
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      vertexShader: vert,
      fragmentShader: fragShader,
      uniforms: {
        mirrorX: {
          type: "i",
          value: 0
        },
        color: {
          type: "v4",
          value: {
            x: 1,
            y: 1,
            z: 1,
            w: 1
          }
        },
        mic: {
          type: "v4",
          value: {
            x: 1,
            y: 1,
            z: 1,
            w: 1
          }
        },
        iPos: {
          type: "v4",
          value: {
            x: 1,
            y: 1,
            z: 1,
            w: 1
          }
        },
        iTarget: {
          type: "v4",
          value: {
            x: 0,
            y: 0,
            z: 1,
            w: 1
          }
        },
        shape: {
          type: "v4",
          value: {
            x: 16,
            y: .2,
            z: .2,
            w: 1
          }
        },
        micMul: {
          type: "v4",
          value: {
            x: 2,
            y: 4,
            z: 0,
            w: 0
          }
        },
        iTime: {
          type: "f",
          value: 0
        }
      },
    });
    this.plane = new THREE.Mesh(geometry, this.material);
    this.root.add(this.plane);
    this.position = {
      x: 0,
      y: 0,
      z: 0
    }
    this.rotation = 0;
    this.added = true;
  }

  lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
  }

  mirrorX() {
    this.material.uniforms.mirrorX.value = 1;
  }
  mirrorXInvert() {
    this.material.uniforms.mirrorX.value = 2;
  }

  mirrorXNone() {
    this.material.uniforms.mirrorX.value = 0;
  }

  update(params, time, delta, allParams) {
    if(params.opacity==0 && this.added){
      this.root.remove(this.plane);
      this.added = false;
    }else if(params.opacity!=0 && !this.added){
      this.added = true;
      this.root.add(this.plane);
    }
    if(!this.added){
      return;
    }
    this.material.uniforms.iTime.value = time / 60;
    this.position.x += params.xPos;
    this.position.y += params.yPos;
    this.position.z += params.zPos;
    this.material.uniforms.iPos.value = this.position;
    this.material.uniforms.mic.value = {
      x: params.m0,
      y: params.m1,
      z: params.m2,
      w: params.m3
    }
    this.material.uniforms.color.value = {
      x: 1,
      y: 1,
      z: 1,
      w: params.opacity
    }
    this.rotation += params.yRot;
    this.material.uniforms.iTarget.value = {
      x: Math.sin(this.rotation),
      y: params.yLook,
      z: Math.cos(this.rotation),
      w: params.opacity
    }
    this.material.uniforms.shape.value = {
      x: params.fov,
      y: params.scale,
      z: params.brightness,
      w: params.power
    }
    this.material.uniforms.micMul.value = {
      x: params.micSpace,
      y: params.micColor,
      z: 0,
      w: 0
    }
  }

}

module.exports = WorleyWorld
