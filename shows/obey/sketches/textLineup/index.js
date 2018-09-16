const THREE = require('three')
const fontJson = require('../../fonts/helvetiker_regular.typeface.json')

class TextLineup {

  constructor() {

    var nameStrings = [
      'nidia',
      'jerico',
      'benjamin'
    ];
    var djString = "dj fadzwa";

    this.names = [];
    this.geometries = [];
    this.materials = [];

    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.group.scale.set(100, 100, 100);
    this.root.add(this.group)

    var font = new THREE.Font(fontJson);
    for (var i = 0; i < nameStrings.length; i++) {
      var m = this.getTextMesh(nameStrings[i], font);
      this.group.add(m);
      this.names.push(m);
      this.materials.push(m.material);
      this.geometries.push(m.geometry);
    }

    this.nextUp = this.getTextMesh("< next up", font);
    this.group.add(this.nextUp);
    if (djString != "") {
      this.dj = this.getTextMesh(djString, font);
      this.group.add(this.dj);
    }

    this.colorPhase = 0;
    this.scale = 0;
    this.selected = -1;
    this.nextUpOffset = 0;
  }
  getTextMesh(name, font) {
    return new THREE.Mesh(this.getTextGeom(name, font), this.getTextMaterial());
  }
  getTextGeom(name, font) {
    return new THREE.TextGeometry(name, {
      size: 1,
      height: 1,
      font: font,
      style: 'normal',
      weight: 'normal'
    });
  }
  getTextMaterial() {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: .7
    });
  }

  lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
  }

  update(params, time, delta, allParams) {
    if (this.names.length == 0) //font not laoded yet
      return;
    var selected = Math.floor(params.selected * this.names.length * .9999);
    var smoothing = params.smoothing;
    if (this.scale != params.scale || this.selected != selected) {
      this.scale = params.scale;
      this.selected = selected;
      this.geometries[selected].computeBoundingBox();
      var size = new THREE.Vector3(0, 0, 0);
      this.geometries[selected].boundingBox.getSize(size);
      this.nextUpOffset = size.x * this.scale;
    }
    var length = this.dj ? this.names.length + 1 : this.names.length;
    for (var i = 0; i < length; i++) {
      var target;
      var scale = this.scale;
      var opacity = params.opacity;
      var hue = params.colorHue;
      var position = {
        x: params.xStep * i,
        y: params.yStep * i,
        z: params.zStep * i
      }
      if (i == selected) {
        opacity = params.selectedOpacity;
        position.x += params.selectedX;
        position.y += params.selectedY;
        position.z += params.selectedZ;
        hue += params.selectedHueOffset + 360;
        hue %= 360;
      }
      if (i == this.names.length) {
        target = this.dj;
        scale *= .7;
        opacity = params.selectedOpacity;
        hue += params.djHueOffset + 360;
        hue %= 360;
      } else {
        target = this.names[i];
      }

      target.scale.set(scale, scale, params.thickness);
      target.material.opacity = this.lerp(target.material.opacity, opacity, smoothing);
      position.x = this.lerp(target.position.x, position.x, smoothing);
      position.y = this.lerp(target.position.y, position.y, smoothing);
      position.z = this.lerp(target.position.z, position.z, smoothing);
      target.position.set(position.x, position.y, position.z);

      target.material.color.setHex(new THREE.Color("hsl(" + hue + ", " + Math.round(params.colorSat) + "%, " + Math.round(params.colorLight) + "%)").getHex());
    }
    this.group.position.set(params.xPos, params.yPos, params.zPos);
    this.group.rotation.set(params.xRot, params.yRot, params.zRot);

    this.nextUp.scale.set(params.scale * .7, params.scale * .7, params.thickness);
    this.nextUp.position.set(this.lerp(this.nextUp.position.x, this.names[selected].position.x + this.nextUpOffset + params.nextOffset, smoothing),
      this.lerp(this.nextUp.position.y, this.names[selected].position.y, smoothing),
      this.lerp(this.nextUp.position.z, this.names[selected].position.z, smoothing));
    this.nextUp.material = this.materials[selected];
    //this.nextUp.position.x += params.colorSat;
  }

}

module.exports = TextLineup
