const THREE = require('three')
const glsl = require('glslify')

const vertShader = glsl.file('./vertShader.glsl')
const fragShader = glsl.file('./fragShader.glsl')


const particleCount = 100 
class Particles { 
	constructor( scene) {
		this.scene = scene
		this.root = new THREE.Group()
		this.group = new THREE.Group()
		this.root.add( this.group)

		this.particles = []
		this.meshes = []
		this.velocities = [];
		this.targetVelocities = [];
		this.targetPositions = [];

		var res = scene.renderer.getSize()

		this.material = new THREE.ShaderMaterial( {
			uniforms: { 
				iTime: { type: 'f', value: 0.0 },
				iColor: { type: 'v2', value: new THREE.Vector4( 0.20, 0.0, 0.6, 0.8)}
			},
			vertexShader: vertShader,
			fragmentShader: fragShader,
			fog: true,
			depthTesting: true,
			blending: THREE.NormalBlending,
			transparent: true
		})

		for ( var i = 0; i < particleCount; i++) {
			// Create a group to manage this new thing. I guess. 
			var p = {}
			var particle = new THREE.Group()
			var geo = new THREE.PlaneGeometry( 0.5, 0.5) 
			var mesh = new THREE.Mesh(geo, this.material)

			this.meshes.push( mesh)
			particle.add( mesh)
			
			this.particles.push( p)
			this.group.add( particle)

			particle.position.set( randomRange( -7.0, 7.0), randomRange( -5.0, 5.0), randomRange( -3.0, 1.0))
			
			p.particle = particle
			p.position = particle.position.clone()
			
			var axis = new THREE.Vector3( 
				randomRange(-1.0, 1.0), 
				randomRange(-1.0, 1.0), 
				randomRange(-1.0, 1.0))
			axis.normalize()
			this.velocities.push(axis);
			this.targetVelocities.push(axis.clone());
			this.targetPositions.push(p.position.clone());

		}
		this.group.position.z = 996
		// Why does this not move the group. 
	}

	update( p, t, dt, pa)
	{
		//this.group.rotation.x += dt / 100
		var i = 0;
		dt*=.1;

		// Particle Update
		this.particles.forEach( part => { 
			
			//pos
			this.targetPositions[i].y += ( p.vSpeed * 2.0 - 1) * 0.1

			part.position.lerp(this.targetPositions[i], dt);
			this.velocities[i].lerp(this.targetVelocities[i], dt); 
			var axis = this.velocities[i].clone();
			
			if ( part.position.y > 6.0 )
			{
				this.targetPositions[i].y = -6.0
				part.position.set( 
					this.targetPositions[i].x,
					this.targetPositions[i].y,
					this.targetPositions[i].z
				)
			} else if (part.position.y < -6.0 )
			{
				this.targetPositions[i].y = 6.0
				part.position.set( 
					this.targetPositions[i].x,
					this.targetPositions[i].y,
					this.targetPositions[i].z
				)
			}

			i++

			var pos = part.position.clone()

			pos.x += Math.cos( t/ 2000.0)

			axis.multiplyScalar( p.velocity)
		
			pos.add( axis)

			part.particle.position.set( pos.x, pos.y, pos.z )
			
			//scale
			part.particle.scale.x =  p.scale*1.7777
			part.particle.scale.y =  p.scale
			part.particle.scale.z =  p.scale

			
			var color = new THREE.Vector4( p.pR, p.pG, p.pB, 0.75)
			this.material.uniforms.iColor.value = color;
		
		})
	}
	
	randomize(){
		this.randomizeVelocity();
		this.randomizePosition();
	}
	randomizeVelocity(){
		for(var i = 0; i<this.velocities.length; i++){
			this.targetVelocities[i].set(
				randomRange(-1.0, 1.0), 
				randomRange(-1.0, 1.0), 
				randomRange(-1.0, 1.0))
			this.targetVelocities[i].normalize()

		}
	}
	randomizePosition(){
		for(var i = 0; i<this.velocities.length; i++){
			this.targetPositions[i].set(randomRange( -7.0, 7.0), randomRange( -5.0, 5.0), randomRange( -3.0, 1.0))

		}
	}
}


function randomRange( min, max) {
	return Math.random() * (max - min) + min
}


module.exports = Particles