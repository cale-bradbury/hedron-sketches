const THREE = require('three')
const OBJLoader = require('../../shared/OBJLoader')

const lerp = (v0, v1, t) => {
	return (1 - t) * v0 + t * v1
}
class VaporColumns {

  constructor (scene, params) {
   	this.scene = scene;
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.group.position.set(0, 0, 1000)
    this.root.add(this.group)
    this.meshes = [];
    this.default = null;
    this.basicMat = new THREE.MeshLambertMaterial(
      { 
        color: 0xffffff,
        emissive: 0x222222
      }
    )
    this.normalMat = new THREE.MeshNormalMaterial(
      { 
        color: 0xffffff,
        shading: THREE.SmoothShading
      }
    )
    var loader = new THREE.OBJLoader();
    loader.load((__dirname)+"\\models\\column.obj" , (o)=>{
      this.default = new THREE.Mesh(
        o.children[0].geometry, 
        params.normal == 1 ? this.normalMat : this.basicMat
      );
    });
    
    this.index = 0;
    if(this.wireframe == 1)
      this.wireframe();
  }

  update (params, time, frameDiff, allParams) {
      if(this.default==null)
        return;
      params.count = Math.round(params.count);
      params.count *= 2;
      params.phase *= 2;
      if(params.count > this.meshes.length){
        var m = this.default.clone();
        this.group.add(m);
        this.meshes.push(m);
        m = this.default.clone();
        this.group.add(m);
        this.meshes.push(m);
      }else if (params.count < this.meshes.length){
        this.group.remove(this.meshes.shift());
        this.group.remove(this.meshes.shift());
      }
      var phaseIn = (1.00001-Math.pow(params.phase*.5, 2))
      for(var i = 0; i<this.meshes.length; i+=2){
        var s = params.scale;
        if(i==this.meshes.length-2)
          s*= Math.min(1, phaseIn-(i-(this.meshes.length-2)))
        this.meshes[i].scale.set(s,s,s);
        this.meshes[i+1].scale.set(s,s,s);
        var z = (i+params.phase) * params.zPerStep
        var rot = (i+params.phase) * params.rotPerStep
        this.meshes[i].position.set(params.spread, 0, z);
        this.meshes[i+1].position.set(-params.spread, 0, z);
        this.meshes[i].rotation.set(0, 0, rot);
        this.meshes[i+1].rotation.set(0, 0, -rot);
      }
  }
	  
  wireframe(){
    this.normalMat.wireframe = this.basicMat.wireframe = !this.basicMat.wireframe;
    return {wireframe:this.normalMat.wireframe?1:0}
  }
  basic(){
    for(var i = 0; i< this.meshes.length; i++){
      this.meshes[i].material = this.basicMat;
    }
    if(this.default!=null)
      this.default.material = this.basicMat;
    return {normal: 0}
  }
  normal(){
    for(var i = 0; i< this.meshes.length; i++){
      this.meshes[i].material = this.normalMat;
    }
    if(this.default!=null)
      this.default.material = this.normalMat;
    return {normal: 1}
  }
}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = VaporColumns
