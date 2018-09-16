varying vec2 local;
uniform sampler2D tex;
uniform vec3 cLow;
uniform vec3 cMid;
uniform vec3 cHigh;
uniform int greyscale;

vec3 threeGradient(vec3 low, vec3 med, vec3 high, vec3 m){
 return mix(high, mix(low, med, min(m*2.,vec3(1.))),min((1.-m)*2.,vec3(1.)));
}

void main(){
  vec2 p =local;
  vec4 color = texture2D(tex,p);
  if(greyscale == 1){
    color.rgb = vec3(dot(color.rgb, vec3(0.299, 0.587, 0.114)));
  }
  color.rgb = threeGradient(cLow, cMid, cHigh, color.rgb);
  gl_FragColor = color;
} 