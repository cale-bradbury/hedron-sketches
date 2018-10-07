
uniform float iTime;	
uniform float iDepth;
uniform vec2 iResolution;

/* Added ACCEL such that the zoom out speed is easier to customize
   Try 10. or Don't I'm not your dad.
*/

#define ACCEL 1.
void main()
{
    float ar = iResolution.x / iResolution.y;

	vec2 uv = gl_FragCoord.xy / iResolution.xy 
        - vec2( 0.5 , 0.5);
    uv.x = ar * uv.x;


    gl_FragColor = vec4( sin (15. * (iTime * ACCEL) * dot( uv, uv)),
                      sin (25. * (iTime * ACCEL) * dot( uv, uv)),
                      sin (35. * (iTime * ACCEL) * dot( uv, uv)),
                      1.);
}
