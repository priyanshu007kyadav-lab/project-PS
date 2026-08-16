varying float vScale;

void main(){

float distance =
length(gl_PointCoord-0.5);

float alpha =
smoothstep(
0.5,
0.0,
distance
);

gl_FragColor =
vec4(
1.0,
1.0,
1.0,
alpha
);

}