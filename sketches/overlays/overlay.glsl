varying vec2 local;
uniform sampler2D tex;
uniform sampler2D sample;

uniform vec4 clip;
uniform vec2 scale;
uniform float strength;
uniform int blend;

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

vec3 getBlended(vec3 a, vec3 b, vec3 f){
    if(blend==0){                 //mix
      a = mix(a, b, f);
    }else if (blend==1){          //add
      a = max(a, b*f);
    }else if (blend==2){          //divide
      a = mix(a, abs(mod(a/(b+.0001)+1., 2.)-1.), f);
    }else if (blend==3){          //difference
      a = mix(a, abs(a-b), f);
    }else if (blend==4){          //color burn
      a = mix(a, (1.0 - (1.0 - b) / a), f);
    }else if (blend==5){          //darken
      a = mix(a, min(a, b), f);
    }else if (blend==6){          //multiply
      a = mix(a, a*b, f);
    }else if (blend==7){          //screen
      a = mix(a, a + b - a * b, f);
    }else if (blend==8){          //pinLight
      a = mix(a, pinLight(a, b), f);
    }else if (blend==9){          //saturation
      a = mix(a, saturation(a, b), f);
    }
    return a;
}

void main(){
	 vec2 p =local;
    vec4 color = texture2D(tex,p);
     p-=.5;
     p*=scale;
     p+=.5;
     p.x = abs(mod(p.x+1., 2.)-1.);
     p = clamp(p,vec2(0.01), vec2(.99));
    vec4 overlay = texture2D(sample, (clip.xy + p*clip.zw));
    
    
	 gl_FragColor = vec4(getBlended(color.rgb, overlay.rgb, vec3(strength)), 1.) ;
} 