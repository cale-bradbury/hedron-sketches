const THREE = require('three')

class Video {  
  constructor () {
    
    // shaders
    {
    var vert = "#ifdef GL_ES\n"+
			"precision highp float;\n"+
			"#endif\n"+
			"varying vec2 local;\n"+
			"void main(){\n"+
			"	local = uv;\n"+
			"	vec4 pos = vec4(position, 1.);\n"+
			"	pos = projectionMatrix * modelViewMatrix * pos;\n"+
		    //"	pos.z = (projectionMatrix * modelViewMatrix * pos).z;\n"+		
			"	gl_Position = pos;\n"+	
			"}";
	var frag = "varying vec2 local;\n"+
			"uniform sampler2D tex;\n"+
			"uniform vec4 color;\n"+
			"void main(){\n"+
			"	gl_FragColor = texture2D(tex,local)*color;\n"+
			"}";    
    }
        
    //creating video element
    {
      this.video = document.getElementById("hedronVideo0");
      if(this.video==null){
        this.video = document.createElement('video');
        this.video.setAttribute('id', 'hedronVideo0');
        this.video.setAttribute('width', '500');
        this.video.setAttribute('style', 'display: none;');

        var source = document.createElement('source');
        source.setAttribute('type', 'video/mp4');
        source.setAttribute('src', 'D:/Personal/hedron/hedron/cale-projects/obey/img/sydanie.mp4');
        this.video.appendChild(source);
        document.body.appendChild(this.video);
      }
    }
    
    //adding the root
    this.root = new THREE.Group()
    
    var texture = new THREE.VideoTexture( this.video );
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    
    var geometry = new THREE.PlaneGeometry( 1000, 1000 );
    this.material = new THREE.ShaderMaterial( { 
      side: THREE.DoubleSide,
      transparent:true,
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        tex: { type: "t", value: texture },
        color:{type: "v4", value:{ x: 1, y: 1, z: 1, w: 1 } }
      },
                                              } );
    this.plane = new THREE.Mesh( geometry, this.material );
    this.root.add( this.plane );
    this.stutterPoint = 0;
  }

  update (params, time, frameDiff, allParams) {
    this.material.uniforms.color.value ={ x: 1, y: 1, z: 1, w: params.opacity};
    this.video.loop = params.loops>.5;
    this.plane.position.y = params.y;
    this.plane.scale.set(params.scale * params.ratio, params.scale, params.scale);
    if(params.depth!=this.plane.position.z)
      console.log(this.plane.position.z +"->"+params.depth);
    this.plane.position.z = params.depth;
  }
  
  play(){
    console.log("play");
    this.video.play();
  }
  pause(){
    console.log("pause");
    this.video.pause();
  }
  reset(){
    console.log("reset");
    this.video.pause();
    this.video.currentTime = 0;
    this.video.play();
  }
  
  stutter(){
    this.video.currentTime = this.stutterPoint;
    this.video.play();
    
  }
  
  stutterSet(){
    this.stutterPoint = this.video.currentTime;
  }
  
}

module.exports = Video
