uniform float uTime;

attribute float aScale;

varying float vScale;

void main(){

vScale = aScale;

vec3 pos = position;

gl_Position =
projectionMatrix *
modelViewMatrix *
vec4(pos,1.0);

gl_PointSize =
aScale;

}