
const THREE = require( 'three')
const glsl = require('glslify')

const vertShader = glsl.file('./vert.glsl')
const fragShader = glsl.file('./frag.glsl')

class Gradient {
	constructor( scene) {}
	update(p, t, dt, pa) {} 
}

module.exports = Gradient
