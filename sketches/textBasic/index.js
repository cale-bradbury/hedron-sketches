const THREE = require('three')
const fontJson = require('../../fonts/droid/droid_sans_regular.typeface.json')

class TextBasic {

  constructor(scene, params, meta) {
    this.root = new THREE.Group()
    this.group = new THREE.Group()
    this.root.add(this.group)
   
    this.text = params.text != undefined ? params.text : "text";
    
    this.font = new THREE.Font(fontJson);
    this.geometry = this.getGeometry(params.text, params);
		
		this.material = new THREE.MeshLambertMaterial({
        color: new THREE.Color("#ff00ff"),
        transparent: true,
        opacity: .7
      });
		
		this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.group.add(this.mesh);
		this.lastParams = params;
  }
  
  setText(text, params){
    this.geometry = this.getGeometry(text, params);
    this.mesh.geometry = this.geometry;
  }
	
	getGeometry(text, params){
		this.text = text;
    let a = text.split("\\n");
    let geometry = new THREE.Geometry();
    for(let i = 0; i<a.length; i++){
      let geo = new THREE.TextGeometry(a[i], {
        size: 1,
        height: 1,
        font: this.font,
        style: 'normal',
        weight: 'normal',
				bevelEnabled: true,
				bevelThickness: params.bevelThickness,
				bevelSize: params.bevelSize,
				bevelSegments: params.bevelSegments,
      })
      geo.center();
      geometry.merge(geo, new THREE.Matrix4().makeTranslation(0, -i*1.2, 0) );
    }
    geometry.center()
		return geometry;
	}

  update(params, time, delta, allParams) {
		
		if(this.text!=params.text && params.text!=undefined){
      this.setText(params.text, params);
    }
		
    this.mesh.material.opacity = params.alpha;
		this.mesh.material.color.setHex(new THREE.Color("hsl(" +
			params.colorHue*360 + ", " + 
			Math.round(params.colorSat * 100) + "%, " + 
			Math.round(params.colorLight * 100) + "%)").getHex());

		this.group.scale.set(params.scale, params.scale, params.scale * params.thickness);
		this.group.rotation.set(params.rotX, params.rotY, params.rotZ);
		this.group.position.set(params.posX, params.posY, params.posZ);
		this.lastParams = params;
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = TextBasic
