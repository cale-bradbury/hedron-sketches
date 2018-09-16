varying vec2 local;
uniform sampler2D tex;
uniform vec4 color;
uniform vec4 cardnal;
uniform vec4 diagonal;
uniform float smoothing;

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

void main(){
	 vec4 c = texture2D(tex,local);
	 c = hueShift(c, color.r);
	 
   
	 float f = smoothstep(cardnal.x, cardnal.x+smoothing, local.y);
	 
	 f = max(f, smoothstep(cardnal.y, cardnal.y+smoothing, local.x));
	 
	 f = max(f, smoothstep(cardnal.z, cardnal.z+smoothing, 1.-local.y));
	 
	 f = max(f, smoothstep(cardnal.w, cardnal.w+smoothing, 1.-local.x));
	 
	 f = max(f, smoothstep(diagonal.x, diagonal.x+smoothing, local.x+local.y));
	 
	 f = max(f, smoothstep(diagonal.y, diagonal.y+smoothing, local.x+(1.-local.y)));
	 
	 f = max(f, smoothstep(diagonal.z, diagonal.z+smoothing, (1.-local.x)+(1.-local.y)));
	 
	 f = max(f, smoothstep(diagonal.w, diagonal.w+smoothing, (1.-local.x)+(local.y)));
	 
	 c *= 1.0-f;
	 
	 
	 gl_FragColor = c;
} 