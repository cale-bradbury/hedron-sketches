const THREE = require('three')
const OBJLoader = require('../../shared/OBJLoader')
const MTLLoader = require('../../shared/MTLLoader')

const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class VaporStatues {

  constructor (scene, params) {
   	this.scene = scene;
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.root.add(this.group)
    scene.scene.ambientLight = new THREE.Color(.3,.3,.3)
    var paths = [
      'antinous',
      'claudia',
      'perikles',
      'venus'
      ]
    this.meshes = [];
    this.materials = [];
    
    this.normalMat = new THREE.MeshNormalMaterial(
      { 
        color: 0xffffff,
        shading: THREE.SmoothShading,
        side: THREE.DoubleSide
      }
    )
        
    
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath((__dirname)+"\\models\\");
    for(let i = 0; i< paths.length; i++){
      mtlLoader.load(paths[i]+'.mtl', (m)=>{
        m.preload();
        let loader = new THREE.OBJLoader();
        loader.setPath((__dirname)+"\\models\\");
        loader.setMaterials(m);
        loader.load(paths[i]+'.obj', (o)=>{
          this.meshes[i] = o.children[0]
          o.children[0].material = new THREE.MeshLambertMaterial({
            map: o.children[0].material.map,
            lights: true
          })
          this.materials[i] = o.children[0].material;
          if(i==params.selected){
            this.index = params.selected;
            this.group.add(this.meshes[i])
          }
        });
      });
    }    
    
    if(params.wireframe == 1)
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
	
  randomize () {
	return {rotZ:Math.random()}
  }

  next () {
    this.group.remove(this.meshes[this.index])
    this.index++;
    this.index %= this.meshes.length;
    this.group.add(this.meshes[this.index])
    return{selected: this.index}
  }
  prev () {
    this.group.remove(this.meshes[this.index])
    this.index+= this.meshes.length-1;
    this.index %= this.meshes.length;
    this.group.add(this.meshes[this.index])
    return{selected: this.index}
  }
  
  wireframe(){
    this.normalMat.wireframe = !this.normalMat.wireframe;
    for(var i = 0; i< this.materials.length; i++){
      this.materials[i].wireframe = this.normalMat.wireframe;
    }
    return {wireframe:this.normalMat.wireframe?1:0}
  }
  basic(){
    for(var i = 0; i< this.meshes.length; i++){
      this.meshes[i].material = this.materials[i];
    }
    return {normal: 0}
  }
  normal(){
    for(var i = 0; i< this.meshes.length; i++){
      this.meshes[i].material = this.normalMat;
    }
    return {normal: 1}
  }
}
/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = VaporStatues
