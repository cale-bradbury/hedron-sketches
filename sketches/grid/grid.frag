varying vec2 local;
uniform vec4 color1;
uniform vec4 color2;
uniform vec4 colorLines;
uniform vec4 shape;
uniform vec4 lines;


void main(){
  vec2 uv = (local-.5)*shape.xy+shape.zw;
  
  float checker = abs(floor(mod(uv.x, 2.))+floor(mod(uv.y, 2.))-1.);
  
  vec4 c = mix(color1, color2, checker);
  
  if(lines.x>0.){
    uv = fract(uv);
    float grid = min(uv.x, min(uv.y, min(1.-uv.x, 1.-uv.y)));
    c = mix(c, colorLines, smoothstep(lines.z, lines.y, grid));
  }
  
  
  float edge = min(local.x, min(local.y, min(1.-local.x, 1.-local.y)));
  c.a *=smoothstep(0., lines.w, edge);
  
  gl_FragColor = c;
}