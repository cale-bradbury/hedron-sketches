varying vec2 local;
uniform sampler2D tex;
uniform int mirrorX;
uniform int mirrorY;
uniform float scale;
uniform float blackX;
uniform float blackY;

void main(){
	 vec2 p =local;
    p-=.5;
    p*=scale;
    p+=.5;
    p = abs(mod(p+1.,2.)-1.);
    p-=.5;
    if(mirrorX == 1){
      p.x = abs(p.x);
    }else if(mirrorX == 2){
      p.x = -abs(p.x);
    }
    if(mirrorY == 1){
      p.y = abs(p.y);
    }else if(mirrorY == 2){
      p.y = -abs(p.y);
    }
    p +=.5;
    vec4 color = texture2D(tex,p);
    color *= 1.-step(blackX,abs(local.x-.5));
    color *= 1.-step(blackY,abs(local.y-.5));
	 gl_FragColor = color;
} 