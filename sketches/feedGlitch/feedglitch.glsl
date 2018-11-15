varying vec2 local;
uniform sampler2D tex;
uniform sampler2D last;
uniform sampler2D mic;
uniform float fade;
uniform float time;
uniform vec4 center; //xy-uv ofset zw-angle mul/offset 
uniform vec4 shift; //xy-distance min/max zw-angle min/max
uniform vec4 hsb;

uniform int blend;
uniform bool debug;
uniform bool rgbSplit;
uniform bool keyBlack;
//uniform vec4 spread;


vec4 hueShift(vec4 color, float hueAdjust) {
  const vec4 kRGBToYPrime = vec4(0.299, 0.587, 0.114, 0.0);
  const vec4 kRGBToI = vec4(0.596, -0.275, -0.321, 0.0);
  const vec4 kRGBToQ = vec4(0.212, -0.523, 0.311, 0.0);
  const vec4 kYIQToR = vec4(1.0, 0.956, 0.621, 0.0);
  const vec4 kYIQToG = vec4(1.0, -0.272, -0.647, 0.0);
  const vec4 kYIQToB = vec4(1.0, -1.107, 1.704, 0.0);
  float YPrime = dot(color, kRGBToYPrime);
  float I = dot(color, kRGBToI);
  float Q = dot(color, kRGBToQ);
  float hue = atan(Q, I);
  float chroma = sqrt(I * I + Q * Q);
  hue += hueAdjust;
  Q = chroma * sin(hue);
  I = chroma * cos(hue);
  vec4 yIQ = vec4(YPrime, I, Q, 0.0);
  color.r = dot(yIQ, kYIQToR);
  color.g = dot(yIQ, kYIQToG);
  color.b = dot(yIQ, kYIQToB);
  return color;
}

float pinLight(float s, float d) {
  return (2.0 * s - 1.0 > d) ? 2.0 * s - 1.0 : (s < 0.5 * d) ? 2.0 * s : d;
}

vec3 pinLight(vec3 s, vec3 d) {
  vec3 c;
  c.x = pinLight(s.x, d.x);
  c.y = pinLight(s.y, d.y);
  c.z = pinLight(s.z, d.z);
  return c;
}

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 hue(vec3 s, vec3 d) {
  d = rgb2hsv(d);
  d.x = rgb2hsv(s).x;
  return hsv2rgb(d);
}

vec3 color(vec3 s, vec3 d) {
  s = rgb2hsv(s);
  s.z = rgb2hsv(d).z;
  return hsv2rgb(s);
}

vec3 saturation(vec3 s, vec3 d) {
  d = rgb2hsv(d);
  d.y = rgb2hsv(s).y;
  return hsv2rgb(d);
}

void main() {

  vec2 uv = local;
  vec4 c = texture2D(tex, uv);
  vec3 new = c.rgb;
  
  //get microphone value
  vec2 u = abs(uv-center.xy)*2.;
  vec2 m = vec2(u.x, u.y)*hsb.w;
  m = vec2(texture2D(mic, vec2(m.x, .25)).r, texture2D(mic, vec2(m.y, .25)).r);
  if(debug){
    gl_FragColor = vec4(m.xy, 0., 1.0);
    return;
  }
 
  //shift the uv based on microphone
  uv += mix(shift.xy, shift.zw, m.yx);
  //((c.rb+c.gr+c.bg)*f) * (spread.zw*(uv-.5))*mix(shift.x, shift.y, m);
  vec3 old = texture2D(last, uv).rgb;
  float grey = dot((old), vec3(0.3, 0.59, 0.11));
  float oldLength = length(old);
  
  //focus in on colors
  vec3 magenta = (sin(vec3(0., .33, .66)*6.28+hsb.x)*.5+.5)*grey;
  vec3 green = grey-magenta;
  float mDist = distance(magenta, old);
  float gDist = distance(green, old);
  vec3 target;
  if(gDist<mDist){
    target = green;
  }else{
    target = magenta;
  }
  old = normalize(mix(old, target, hsb.y*length(m)))*oldLength;
    
  if (blend == 0) { //mix
    old = mix(new, old, fade);
  } else if (blend == 1) { //add
    old = max(new, old * fade);
  } else if (blend == 2) { //divide
    old = mix(new, abs(mod(new / (old + .0001) + 1., 2.) - 1.), fade);
  } else if (blend == 3) { //difference
    old = mix(new, abs(new - old), fade);
  } else if (blend == 4) { //color burn
    old = mix(new, (1.0 - (1.0 - old) / new), fade);
  } else if (blend == 5) { //darken
    old = mix(new, min(new, old), fade);
  } else if (blend == 6) { //multiply
    old = mix(new, new * old, fade);
  } else if (blend == 7) { //screen
    old = mix(new, new + old - new * old, fade);
  } else if (blend == 8) { //pinLight
    old = mix(new, pinLight(new, old), fade);
  } else if (blend == 9) { //saturation
    old = mix(new, saturation(new, old), fade);
  }

  if (keyBlack) {
    old = mix(old, new, smoothstep(0., .01, new.r + new.g + new.b));
  }

  gl_FragColor = vec4(clamp(old, vec3(0.), vec3(1.)), 1.0);
}
