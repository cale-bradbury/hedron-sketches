varying vec2 local;
uniform sampler2D tex;
uniform int mirrorX;
uniform int mirrorY;
uniform float scale;

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
	 gl_FragColor = texture2D(tex,p);
} 