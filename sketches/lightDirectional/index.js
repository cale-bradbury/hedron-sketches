const THREE = require('three')

class LightDirectional {

  constructor() {

    /** HEDRON TIP **
      Must define a "root" property as a THREE.Group or THREE.Object3D
      Hedron looks for this and will add it to the scene.
    **/
    this.root = new THREE.Group()
    this.color = new THREE.Color();
    this.light = new THREE.DirectionalLight(0xffffff, 1)
    this.root.add(this.light)
    this.target = new THREE.Object3D()
    this.root.add(this.target);
    this.light.target = this.target;
  }

  update(params, time, delta, allParams) {
    this.light.color.setHSL(params.hue, params.saturation, params.brightness)
    this.light.intensity = params.intensity
    this.target.position.set(params.targetX, params.targetY, params.targetZ)
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = LightDirectional
