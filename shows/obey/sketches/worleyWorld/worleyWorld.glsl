// iq
vec3 random3f( vec3 p )
{
    p = mod(p, 10.);
    return fract(sin(vec3( dot(p,vec3(1.0,57.0,113.0)), 
                           dot(p,vec3(57.0,113.0,1.0)),
                           dot(p,vec3(113.0,1.0,57.0))))*438.5453);
}

float voronoi3(vec3 p)
{
    vec3 fp = floor(p);
    
    float d1 = 999999999999999.;
    float d2 = 999999999999999.;
    
    for(int i = -1; i < 2; i++)
    {
        for(int j = -1; j < 2; j++)
        {
            for(int k = -1; k < 2; k++)
            {
                vec3 cur_p = fp + vec3(i, j, k);
                
                vec3 r = random3f(cur_p);
                d1 = min(d1, distance(p, cur_p + r));
            }
        }
    }
    return d1;
}

#define steps 4.
varying vec2 local;
uniform vec4 color;
uniform vec4 mic;
uniform float iTime;
uniform vec4 iPos;
uniform vec3 iTarget;
uniform vec4 shape;
uniform vec4 micMul;

void main(){
    // Normalized pixel coordinates (from 0 to 1)
    vec2 p = local-.5;
    p*=shape.x;
    
	float time = mod(iTime*.1, 10.);
    
    
    vec3 ro = iPos.xyz;
    vec3 ta = ro+iTarget.xyz;
    vec3 ww = normalize( ta - ro );
    vec3 uu = normalize( cross(ww,vec3(0.0,1.0,0.0) ) );
    vec3 vv = normalize( cross(uu,ww));
	vec3 rd = normalize( p.x*uu + p.y*vv + 2.0*ww );
    rd*=shape.y;
    vec3 f = vec3(0.);
    vec4 m = mic*micMul.x;
    for(float i = 0.; i<steps;i++){
        f += smoothstep(0.5, 1.,vec3(
          voronoi3((ro-iPos.xyz)*vec3(6., 6., 6.+m.x)+50.+iPos.xyz),
          voronoi3((ro-iPos.xyz)*vec3(8., 8.+m.y, 8.)-50.+iPos.xyz),
          voronoi3((ro-iPos.xyz)*vec3(4.1-m.z, 4., 4.)+iPos.xyz)
        ))*shape.z;
        
        ro+=rd;
    }
    
    m = mic*micMul.y;
    
    vec3 c = f.r*sin(m.r*vec3(0., .33, .66))+f.r;
    c += f.g*cos(m.g*vec3(0.33, .66, .0))+f.g;
    c += f.b*sin(m.b*vec3(0.66, .0, .33)+1.5707)+f.b;
    c = abs(mod(c+1., 2.)-1.);
    c = pow(c, vec3(shape.w));
    // Output to screen
    gl_FragColor = vec4(c,1.0)*color;
}