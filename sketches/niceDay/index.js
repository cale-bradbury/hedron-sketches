const THREE = require('three')

class NiceDay {

  constructor() {

    /** HEDRON TIP **
      Must define a "root" property as a THREE.Group or THREE.Object3D
      Hedron looks for this and will add it to the scene.
    **/
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.group.scale.set(1000, 1000, 1000);
    this.root.add(this.group)
    this.quads = []
    this.texture = new THREE.TextureLoader().load(__dirname+"\\smile.png")
    this.lutContext = null;
    var self = this;
    this.lutTexture = new THREE.TextureLoader().load(__dirname+"\\lut.png", ()=>{
      var lut = document.createElement('canvas');
      lut.width = this.lutTexture.image.width;
      lut.height = this.lutTexture.image.height;
    self.lutContext =   lut.getContext('2d');
      self.lutContext.drawImage(this.lutTexture.image, 0, 0, this.lutTexture.image.width,this.lutTexture.image.height)
    })
    this.geometry = new THREE.PlaneGeometry(1,1,1,1)
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
  
  update(params, time, delta, allParams) {
    var pi = Math.PI;
    var tau = pi*2;
    time = time / 60;
  if(this.lutContext==null)
    return;

    var remainder = params.count * 100;
    var targetCount = Math.ceil(remainder);
    remainder %= 1;

    if (this.quads.length > targetCount) {
      var j = this.quads.length - 1;
      if (j != -1)
        this.group.remove(this.quads[j]);
      this.quads.pop();
    } else if (this.quads.length < targetCount) {
      var j = this.quads.length;
      var material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ff00ff"),
        transparent: true,
        map:this.texture,
        opacity: .7
      });
      var m = new THREE.Mesh(this.geometry, material);
      m.dontHack = true;
      this.quads.push(m);
      this.group.add(this.quads[j]);
    }
    var lutY = params.colorLut*.99*this.lutTexture.image.height
    if (this.quads.length > 1) {
      var step = this.quads.length > 1 ? 1 / (this.quads.length - 1) : 0;
      var f = 0;
      for (var i = 0; i < this.quads.length; i++) {
        this.quads[i].material.opacity = this.lerp(params.alphaStart, params.alphaEnd, f);
       
        
        var color = this.lutContext.getImageData(
          ((i*params.colorFreq+params.colorPhase)%1) * this.lutTexture.image.width,
          lutY,
          1, 1
        ).data;
        this.quads[i].material.color.setHex(new THREE.Color("rgb("+color[0]+","+ color[1]+","+ color[2]+")").getHex());


        this.quads[i].rotation.z = Math.sin(params.phaseX * tau + i * params.freqX) * params.ampX + params.rotZStep * i;
        this.quads[i].position.z = i * params.zStep;
        this.quads[i].position.y = i * params.yStep;
        this.quads[i].position.x = i * params.xStep;


        var s = this.lerp(params.scaleStart, params.scaleEnd, f);
        s += Math.sin(params.phaseZ * tau + i * params.freqZ) * params.ampZ;
        s = Math.max(s, .000001);
        this.quads[i].scale.set(s, s, 1)

        f += step;
        f = Math.min(f, 1);
      }
      if (this.quads.length != 1)
        this.quads[this.quads.length - 1].material.opacity *= remainder;

      this.group.rotation.set(params.rotX, params.rotY, params.rotZ);
      this.group.position.set(params.posX, params.posY, params.posZ);

      if (this.invert) {
        this.quads[0].material.color.setHex(new THREE.Color("hsl(" +
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
module.exports = NiceDay
