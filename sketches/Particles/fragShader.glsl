
varying vec2 vUv;
varying vec3 vWorldPosition;
uniform float iTime;
uniform vec3 iColor;
void main( )
{
    float alpha = smoothstep( 0.3, 0.2, length(vUv - vec2( 0.5, 0.5)));
    gl_FragColor = vec4(iColor, alpha);
}