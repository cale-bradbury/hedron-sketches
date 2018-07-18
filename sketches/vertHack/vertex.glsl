uniform float normalAmp;
uniform vec3 waveAmp;
uniform vec3 waveFreq;
uniform vec3 wavePhase;

varying vec2 local;

void main(){
	local = uv;
	vec3 p = position;
	p += normal * normalAmp;
    vec3 o = vec3(length(p.zy), length(p.xz), length(p.yx));
    p.xyz += sin(o*waveFreq+wavePhase)*waveAmp;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
}
