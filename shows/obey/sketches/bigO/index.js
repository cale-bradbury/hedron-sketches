const THREE = require('three')
const project = require('../../project.json')

class BigO {

  constructor(scene) {

    /** HEDRON TIP **
      Must define a "root" property as a THREE.Group or THREE.Object3D
      Hedron looks for this and will add it to the scene.
    **/
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.group.scale.set(1000, 1000, 1000);
    this.root.add(this.group)
    this.names = []
    this.texture = new THREE.TextureLoader().load(project.project.filePath.substr(0, project.project.filePath.lastIndexOf('\\')) + "\\img\\o2.png");
    this.geometry = new THREE.PlaneGeometry(1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      opacity: 1,
      transparent: true,
      map: this.texture
    });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.group.add(this.mesh);

  }

  lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
  }

  update(params, time, delta, allParams) {
    this.group.scale.set(params.scale, params.scale, params.scale)
    this.mesh.material.map = this.texture;
    //this.mesh.material.opacity = params.opacity;
		//console.log(params.opacity);
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = BigO
