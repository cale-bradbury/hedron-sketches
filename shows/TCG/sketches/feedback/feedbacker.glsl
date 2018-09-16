varying vec2 local;
uniform sampler2D tex;
uniform sampler2D last;
uniform sampler2D mic;
uniform float fade;
uniform float time;
uniform vec4 center; //xy-uv ofset zw-angle mul/offset 
uniform vec4 shift; //xy-distance min/max zw-angle min/max
uniform vec4 hsb;
uniform vec4 angle; //xy - min/max z-freq w-phase

uniform int blend; 
uniform bool debug;


vec4 hueShift(vec4 color, float hueAdjust){
	const vec4  kRGBToYPrime = vec4 (0.299, 0.587, 0.114, 0.0);
	const vec4  kRGBToI     = vec4 (0.596, -0.275, -0.321, 0.0);
	const vec4  kRGBToQ     = vec4 (0.212, -0.523, 0.311, 0.0);
	const vec4  kYIQToR   = vec4 (1.0, 0.956, 0.621, 0.0);
	const vec4  kYIQToG   = vec4 (1.0, -0.272, -0.647, 0.0);
	const vec4  kYIQToB   = vec4 (1.0, -1.107, 1.704, 0.0);
	float   YPrime  = dot (color, kRGBToYPrime);
	float   I      = dot (color, kRGBToI);
	float   Q      = dot (color, kRGBToQ);
	float   hue     = atan (Q, I);
	float   chroma  = sqrt (I * I + Q * Q);
	hue += hueAdjust;
	Q = chroma * sin (hue);
	I = chroma * cos (hue);
	vec4    yIQ   = vec4 (YPrime, I, Q, 0.0);
	color.r = dot (yIQ, kYIQToR);
	color.g = dot (yIQ, kYIQToG);
	color.b = dot (yIQ, kYIQToB);
	return color;
}

float pinLight(float s, float d)
{
	return (2.0 * s - 1.0 > d) ? 2.0 * s - 1.0 : (s < 0.5 * d) ? 2.0 * s : d;
}

vec3 pinLight(vec3 s, vec3 d)
{
	vec3 c;
	c.x = pinLight(s.x, d.x);
	c.y = pinLight(s.y, d.y);
	c.z = pinLight(s.z, d.z);
	return c;
}

vec3 rgb2hsv(vec3 c)
{
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 hue(vec3 s, vec3 d)
{
	d = rgb2hsv(d);
	d.x = rgb2hsv(s).x;
	return hsv2rgb(d);
}

vec3 color(vec3 s, vec3 d)
{
	s = rgb2hsv(s);
	s.z = rgb2hsv(d).z;
	return hsv2rgb(s);
}

vec3 saturation(vec3 s, vec3 d)
{
	d = rgb2hsv(d);
	d.y = rgb2hsv(s).y;
	return hsv2rgb(d);
}

void main(){
	 vec2 u =local;
	 vec3 new = texture2D(tex,u).rgb;
    u-=center.xy;
    u.y/= hsb.w;
    float d = length(u);
    float a = atan(u.x,u.y);
    float f = abs((a/3.1416))+center.w;
    f = abs(mod((f)*center.z, 2.)-1.);
    
    vec3 m = vec3(texture2D(mic,vec2(f*.2+.01, .5)).r,texture2D(mic,vec2(f*.2+.21, .5)).r,texture2D(mic,vec2(f*.2+.41, .5)).r);    
    
    if(debug){
      gl_FragColor = vec4(m, 1.0);
      return;
    }
    float dd;
    float aa;
    
    dd = d-d* mix(shift.x, shift.y, m.r);
    aa = a+ mix(angle.x, angle.y, cos(dd*angle.z+angle.w)*.5+.5);    
    u.y = cos(aa);
    u.x = sin(aa);
    u*=dd;
    
    u.y*= hsb.w;
    u+=center.xy;
    //u = abs(mod(u+1., 2.)-1.);
    vec3 old = texture2D(last,u).rgb;
    
    dd = d-d* mix(shift.x, shift.y, m.g);
    aa = a+ mix(angle.x, angle.y, cos(dd*angle.z+angle.w)*.5+.5);    
    u.y = cos(aa);
    u.x = sin(aa);
    u*=dd;
    
    u.y*= hsb.w;
    u+=center.xy;
    //u = abs(mod(u+1., 2.)-1.);
    old.g = texture2D(last,u).g;
    
    dd = d-d* mix(shift.x, shift.y, m.b);
    aa = a+ mix(angle.x, angle.y, cos(dd*angle.z+angle.w)*.5+.5);    
    u.y = cos(aa);
    u.x = sin(aa);
    u*=dd;
    
    u.y*= hsb.w;
    u+=center.xy;
    //u = abs(mod(u+1., 2.)-1.);
    old.b = texture2D(last,u).b;
    
    
    old = rgb2hsv(old);
    old.rgb+=hsb.xyz;
    old.r = fract(old.r);
    old = hsv2rgb(old);
    
    if(blend==0){                 //mix
      new = mix(new, old, fade);
    }else if (blend==1){          //add
      new = max(new, old*fade);
    }else if (blend==2){          //divide
      new = mix(new, abs(mod(new/(old+.0001)+1., 2.)-1.), fade);
    }else if (blend==3){          //difference
      new = mix(new, abs(new-old), fade);
    }else if (blend==4){          //color burn
      new = mix(new, (1.0 - (1.0 - old) / new), fade);
    }else if (blend==5){          //darken
      new = mix(new, min(new, old), fade);
    }else if (blend==6){          //multiply
      new = mix(new, new*old, fade);
    }else if (blend==7){          //screen
      new = mix(new, new + old - new * old, fade);
    }else if (blend==8){          //pinLight
      new = mix(new, pinLight(new, old), fade);
    }else if (blend==9){          //saturation
      new = mix(new, saturation(new, old), fade);
    }
    
    gl_FragColor = vec4(new, 1.0);
} 