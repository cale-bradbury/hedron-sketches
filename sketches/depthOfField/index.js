const THREE = require('three'),
  EffectComposer = require('three-effectcomposer')(THREE), BokehPass = require('./BokehPass')
	class Bokeh {

  constructor(scene) {
   

    this.root = new THREE.Group()
    this.camera = scene.camera;
    this.renderer = scene.renderer;
    this.scene = scene;
		var size = this.scene.renderer.getSize();
console.log(size);
    this.bokeh = new BokehPass(scene.scene, scene.camera, {
			focus: 1.0, aperture: 0.025, maxBlur:1.0, width: size.width, height:size.height
		});
		
    scene.addPost(this.bokeh);
    
  }

  update(params, time, delta, allParams) {
   this.bokeh.uniforms.focus.value = params.focus;
   this.bokeh.uniforms.aperture.value = params.aperture;
   this.bokeh.uniforms.maxblur.value = params.maxBlur;
  }
  
  destructor(scene){
		scene.removePost(this.bokeh);
  }

}

/** HEDRON TIP **
  Class must be exported as a default.
**/
module.exports = Bokeh
