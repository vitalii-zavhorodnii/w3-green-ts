"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const precision_glsl_1 = require("../../shaders/precision.glsl");
const shader = `
// #extension GL_OES_standard_derivatives : enable

${precision_glsl_1.default}

uniform sampler2D u_texture1;
uniform sampler2D u_texture2;

varying vec3 v_normal;
varying vec2 v_uv;
varying float v_texture;
varying vec3 v_position;

// const vec3 lightDirection = normalize(vec3(-0.3, -0.3, 0.25));

vec4 sample(float texture, vec2 uv) {
  // int(0.0) == 0 is not always true.
  int i = int(texture + 0.1);

  if (i == 0) {
    return texture2D(u_texture1, uv);
  } else {
    return texture2D(u_texture2, uv);
  }
}

void main() {
  vec4 color = sample(v_texture, v_uv);

  // vec3 faceNormal = cross(dFdx(v_position), dFdy(v_position));
  // vec3 normal = normalize((faceNormal + v_normal) * 0.5);

  // color *= clamp(dot(normal, lightDirection) + 0.45, 0.1, 1.0);

  gl_FragColor = color;
}
`;
exports.default = shader;
//# sourceMappingURL=cliffs.frag.js.map