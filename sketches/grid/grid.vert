#ifdef GL_ES
precision highp float;
#endif
varying vec2 local;
void main(){
	local = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}