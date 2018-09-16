const THREE = require('three')

class LightPoint {

  constructor() {

    /** HEDRON TIP **
      Must define a "root" property as a THREE.Group or THREE.Object3D
      Hedron looks for this and will add it to the scene.
    **/
    this.root = new THREE.Group()
    this.color = new THREE.Color();
    this.light = new THREE.PointLight(0xffffff, 1, 10000)
    this.root.add(this.light)
  }

  update(params, time, delta, allParams) {
    this.light.color.setHSL(params.hue, params.saturation, params.brightness)
    this.light.position.set(params.posX, params.posY, params.posZ)
    this.light.decay = params.decay;
    this.light.intensity = params.intensity
    this.light.distance = params.distance
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = LightPoint
