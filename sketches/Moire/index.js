const THREE = require( 'three')
const glsl = require('glslify')

const vertShader = glsl.file('./vert.glsl')
const fragShader = glsl.file('./frag.glsl')


class Moire {

	constructor( scene) {

		this.root = new THREE.Group()

		this.group = new THREE.Group()

		this.root.add( this.group)

		this.meshes = []
		var res = scene.renderer.getSize()
		

		const geo = new THREE.PlaneGeometry( 1, 1)

		this.material = new THREE.ShaderMaterial( {
			uniforms: { 
				iTime: { type: 'f', value: 0.0 },
				iResolution: { type: 'v2', value: new THREE.Vector2( res.width, res.height)}
			},
			vertexShader: vertShader,
			fragmentShader: fragShader,
			fog: false,
			side: THREE.DoubleSide
		})

		const mesh = new THREE.Mesh( geo, this.material)

		this.meshes.push( mesh)

		this.group.add( mesh)

		this.scene = scene
	}

	update( p, t, dt ) 
	{
		var res = this.scene.renderer.getSize()
		this.material.uniforms.iResolution.value = new THREE.Vector2( res.width, res.height)
		this.material.uniforms.iTime.value = p.height * 200.0
	}
}

module.exports = Moire 
