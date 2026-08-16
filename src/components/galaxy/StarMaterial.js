import * as THREE from "three";

import vertex from "../../shaders/stars/vertex.glsl";

import fragment from "../../shaders/stars/fragment.glsl";

export default function createStarMaterial(){

return new THREE.ShaderMaterial({

vertexShader:vertex,

fragmentShader:fragment,

transparent:true,

depthWrite:false,

blending:
THREE.AdditiveBlending,

uniforms:{

uTime:{
value:0
}

}

});

}