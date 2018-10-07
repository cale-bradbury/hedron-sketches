uniform sampler2D tex;
uniform vec4 sampleParams;
varying vec2 local;

void main(){
  float s = sin(sampleParams.y);
  float c = cos(sampleParams.y);
  vec2 uv = (local-.5);
  uv = abs(mod(uv, 2.)-1.)-.5;
  uv = uv * mat2(c, s, -s, c) +.5;
  uv*=   sampleParams.z;
  gl_FragColor = texture2D(tex, vec2(abs((uv.x-1.)), sampleParams.x));
}