const THREE = require('three')
const OBJLoader = require('./OBJLoader')
const project = require('../../project.json')

const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class Models {

  constructor (scene) {
   	this.scene = scene;
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.root.add(this.group)
    
    paths = [
      'teapot.obj',
      'knot 1-3.obj',
      'knot 1-6.obj',
      'knot 2-3.obj',
      'knot 3-1.obj',
      'knot 6-1.obj'
      ]
    this.meshes = [];
    this.basicMat = new THREE.MeshBasicMaterial(
      { color: 0xffffff }
    )
    this.normalMat = new THREE.MeshNormalMaterial(
      { 
        color: 0xffffff,
        shading: THREE.SmoothShading
      }
    )
    this.meshes.push(new THREE.Mesh(new THREE.BoxGeometry(1), this.basicMat));
    this.group.add(this.meshes[0]);
    
    var loader = new THREE.OBJLoader();
    for(var i = 0; i< paths.length; i++){
      loader.load(project.project.filePath.substr(0, project.project.filePath.lastIndexOf('\\')) + "\\sketches\\models\\models\\"+paths[i], (o)=>{
        o.material = this.material;
        //this.meshes.push(o);
        this.meshes.push(new THREE.Mesh(o.children[0].geometry, this.basicMat));
      });
    }
    
    this.index = 0;
  }

  update (params, time, frameDiff, allParams) {
		
    this.group.rotation.x = params.rotX
    this.group.rotation.y = params.rotY
    this.group.rotation.z = params.rotZ
    this.group.scale.set(params.scale, params.scale, params.scale)
		
  }
	
  randomize () {
	return {rotZ:Math.random()}
  }

  next () {
    this.group.remove(this.meshes[this.index])
    this.index++;
    this.index %= this.meshes.length;
    this.group.add(this.meshes[this.index])
  }
  prev () {
    this.group.remove(this.meshes[this.index])
    this.index+= this.meshes.length-1;
    this.index %= this.meshes.length;
    this.group.add(this.meshes[this.index])
  }
  
  wireframe(){
    this.normalMat.wireframe = this.basicMat.wireframe = !this.basicMat.wireframe;
  }
  basic(){
    for(var i = 0; i< this.meshes.length; i++){
      this.meshes[i].material = this.basicMat;
    }
  }
  normal(){
    for(var i = 0; i< this.meshes.length; i++){
      this.meshes[i].material = this.normalMat;
    }
  }
}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Models
