const THREE = require('three')
const OBJLoader = require('../../shared/OBJLoader')

const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class VaporTitle {

  constructor (scene, params) {
   	this.scene = scene;
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.root.add(this.group)
    
    this.basicMat = new THREE.MeshBasicMaterial(
      { color: 0xffffff }
    )
    this.normalMat = new THREE.MeshNormalMaterial(
      { 
        color: 0xffffff,
        shading: THREE.SmoothShading
      }
    )
    var loader = new THREE.OBJLoader();
    loader.load((__dirname)+"\\title.obj" , (o)=>{
      this.mesh = new THREE.Mesh(
        o.children[0].geometry, 
        params.normal == 1 ? this.normalMat : this.basicMat
      );
      this.group.add(this.mesh);
    });
    
    this.index = 0;
    if(this.wireframe == 1)
      this.wireframe();
  }

  update (params, time, frameDiff, allParams) {
    this.group.position.x = params.posX
    this.group.position.y = params.posY
    this.group.position.z = params.posZ
    this.group.rotation.x = params.rotX
    this.group.rotation.y = params.rotY
    this.group.rotation.z = params.rotZ
    this.group.scale.set(params.scale, params.scale, params.scale)
		
  }
	  
  wireframe(){
    this.normalMat.wireframe = this.basicMat.wireframe = !this.basicMat.wireframe;
    return {wireframe:this.normalMat.wireframe?1:0}
  }
  basic(){
    this.mesh.material = this.basicMat;
    return {normal: 0}
  }
  normal(){
    this.mesh.material = this.normalMat;
    return {normal: 1}
  }
}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = VaporTitle
