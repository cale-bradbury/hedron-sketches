varying vec2 local;
uniform sampler2D tex;
uniform sampler2D sample;

uniform vec4 clip;

void main(){
	 vec2 p =local;
     p = clip.xy+ p*clip.zw;
	 gl_FragColor =  texture2D(sample, p);;
} 