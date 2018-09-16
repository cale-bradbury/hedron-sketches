const THREE = require('three')
const fontJson = require('../../fonts/droid/droid_sans_regular.typeface.json')

class Text {

  constructor() {

    /** HEDRON TIP **
      Must define a "root" property as a THREE.Group or THREE.Object3D
      Hedron looks for this and will add it to the scene.
    **/
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.group.scale.set(1000, 1000, 1000);
    this.root.add(this.group)
    this.names = []

    this.font = new THREE.Font(fontJson);
    this.text = [":-)"," <3",": )",":D"]
    this.textIndex = 0;
    this.geometry = new THREE.TextGeometry(this.text[0], {
      size: 1,
      height: 1,
      font: this.font,
      style: 'normal',
      weight: 'normal'
    })
    this.geometry.center()

    this.invert = false;
  }

  lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
  }

  invertFirst() {
    this.invert = !this.invert;
  }
  
  randomize(){
    return{
      rotX: Math.random(),
      rotY: Math.random(),
      ampX: Math.random(),
      ampY: Math.random(),
      ampZ: Math.random(),
      freqX: Math.random(),
      freqY: Math.random(),
      freqZ: Math.random(),
      rotZStep: Math.random(),
      colorPhase: Math.random()
    }
  }
  
  toggleText(){
    this.textIndex++;
    this.textIndex%= this.text.length
    this.geometry = new THREE.TextGeometry(this.text[this.textIndex], {
      size: 1,
      height: 1,
      font: this.font,
      style: 'normal',
      weight: 'normal'
    })
    this.geometry.center()
    for (var i = 0; i < this.names.length; i++) {
      this.names[i].geometry = this.geometry;
    }
  }

  update(params, time, delta, allParams) {
    if (this.geometry == null)
      return;
    var pi = 3.14159;
    var tau = 6.28;
    time = time / 60;


    var remainder = params.count * 100;
    var targetCount = Math.ceil(remainder);
    remainder %= 1;

    if (this.names.length > targetCount) {
      var j = this.names.length - 1;
      if (j != -1)
        this.group.remove(this.names[j]);
      this.names.pop();
    } else if (this.names.length < targetCount) {
      var j = this.names.length;
      var material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ff00ff"),
        transparent: true,
        opacity: .7
      });
      this.names.push(new THREE.Mesh(this.geometry, material));
      this.group.add(this.names[j]);
    }

    if (this.names.length > 1) {
      var step = this.names.length > 1 ? 1 / (this.names.length - 1) : 0;
      var f = 0;
      for (var i = 0; i < this.names.length; i++) {
        this.names[i].material.opacity = this.lerp(params.alphaStart, params.alphaEnd, f);
        this.names[i].material.color.setHex(new THREE.Color("hsl(" +
          (i * Math.pow((params.colorFreq - .5) * 2, 2) * 180 + params.colorPhase) +
          ", " + Math.round(params.colorSat * 100) + "%, " + Math.round(params.colorLight * 100) + "%)").getHex());


        this.names[i].rotation.z = Math.sin(params.phaseX * tau + i * params.freqX) * params.ampX + params.rotZStep * i;
        this.names[i].position.z = i * params.zStep;
        this.names[i].position.y = i * params.yStep;
        this.names[i].position.x = i * params.xStep;


        var s = this.lerp(params.scaleStart, params.scaleEnd, f);
        s += Math.sin(params.phaseZ * tau + i * params.freqZ) * params.ampZ;
        s = Math.max(s, .000001);
        this.names[i].scale.set(s, s, params.thickness)

        f += step;
        f = Math.min(f, 1);
      }
      if (this.names.length != 1)
        this.names[this.names.length - 1].material.opacity *= remainder;

      this.group.rotation.set(params.rotX, params.rotY, params.rotZ);
      this.group.position.set(params.posX, params.posY, params.posZ);

      if (this.invert) {
        this.names[0].material.color.setHex(new THREE.Color("hsl(" +
          (0 * Math.pow((params.colorFreq - .5) * 2, 2) * 180 + this.colorPhase + 180) +
          ", " + Math.round(params.colorSat * 100) + "%, " + Math.round(params.colorLight * 100) + "%)").getHex());
      }

    }

    // Change scale using params.scale
    //params.scale = Math.max(params.scale * 40, 0.00001);
    //this.group.scale.set(params.scale, params.scale, params.scale)
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Text
