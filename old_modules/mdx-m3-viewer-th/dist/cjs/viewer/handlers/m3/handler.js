"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../../parsers/m3/model");
const isformat_1 = require("../../../parsers/m3/isformat");
const model_2 = require("./model");
const standard_vert_1 = require("./shaders/standard.vert");
const standard_frag_1 = require("./shaders/standard.frag");
exports.default = {
    load(viewer) {
        const gl = viewer.gl;
        const webgl = viewer.webgl;
        const teamColors = [[255, 3, 3], [0, 66, 255], [28, 230, 185], [84, 0, 129], [255, 252, 1], [254, 138, 14], [32, 192, 0], [229, 91, 176], [149, 150, 151], [126, 191, 241], [16, 98, 70], [78, 42, 4], [40, 40, 40], [0, 0, 0]];
        // Bone textures.
        if (!webgl.ensureExtension('OES_texture_float')) {
            throw new Error('M3: No float texture support!');
        }
        const standardShaders = [];
        // Load shaders for 1-4 texture coordinate models.
        for (let i = 0; i < 4; i++) {
            const shader = webgl.createShader(`#define EXPLICITUV${i}\n${standard_vert_1.default}`, standard_frag_1.default);
            // Bind the shader and set the team color uniforms.
            shader.use();
            for (let i = 0; i < 14; i++) {
                const color = teamColors[i];
                gl.uniform3f(shader.uniforms['u_teamColors[' + i + ']'], color[0] / 255, color[1] / 255, color[2] / 255);
            }
            standardShaders[i] = shader;
        }
        const handlerData = { standardShaders };
        viewer.sharedCache.set('m3', handlerData);
    },
    isValidSource(object) {
        if (object instanceof model_1.default) {
            return true;
        }
        return isformat_1.default(object);
    },
    resource: model_2.default,
};
//# sourceMappingURL=handler.js.map