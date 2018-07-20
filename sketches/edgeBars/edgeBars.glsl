varying vec2 local;
uniform sampler2D tex;
uniform sampler2D sample;

uniform vec4 clip;
uniform vec2 scale;
uniform float aspect;

void main(){
	 vec2 p =local;
     vec4 color = texture2D(tex,p);
     float s = sin(clip.y);
     float c = cos(clip.y);
     p-=.5;
     p.x*=aspect;
     p = p * mat2(c, s, -s, c);
     p.x *= scale.x;
     p.x = p.x+clip.w;
    
    vec4 overlay = texture2D(sample, vec2(p.x, clip.z));
    
    
	 gl_FragColor = mix(color, overlay, step( scale.y, abs(p.y))*clip.x); ;
} 