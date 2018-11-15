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
    
    this.power = new THREE.Group();
    this.torus = new THREE.TorusGeometry(1, 1, 64, 64)
    let count = 5
    this.powerTexture = new THREE.TextureLoader().load( __dirname+"/models/power.png" );
    this.powerTexture.wrapS = THREE.RepeatWrapping;
    this.powerTexture.wrapT = THREE.RepeatWrapping;
    this.powerTexture.repeat.set(20, 20)
    for(let i = params.pPhase; i< count+params.pPhase; i++){
      let mat = new THREE.MeshPhongMaterial({
        color:0x338800, 
        transparent:true, 
        opacity: params.pAlpha,
        shading: THREE.SmoothShading,
        alphaMap: this.powerTexture,
        //side: THREE.BackSide,
      })
      let m = new THREE.Mesh(this.torus, mat);
      let s = i/count
      m.scale.set(s,s,s);
      m.rotation.set(90, 0, 0)
      this.power.add(m);
    }
    this.power.scale.set(params.pScale,params.pScale,params.pScale);
    this.power.position.set(0, .1, 0)
    this.group.add(this.power);
    
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
    if(this.power.children.length > 0){
      this.powerTexture.offset.set(params.pScrollX, params.pScrollY)
      this.power.scale.set(params.pScale,params.pScale,params.pScale)
      for(let i = 0; i<this.power.children.length; i++){
        let x = (i+params.pPhase)/this.power.children.length;
        this.power.children[i].scale.set(x, x, x);
        this.power.children[i].material.opacity = params.pAlpha;      
      }
      this.power.children[0].material.opacity *= (params.pPhase);
      this.power.children[this.power.children.length -1].material.opacity *= (1-params.pPhase);
    }
      
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
