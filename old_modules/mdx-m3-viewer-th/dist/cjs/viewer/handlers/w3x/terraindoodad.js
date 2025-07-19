"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_addon_1 = require("../../../common/gl-matrix-addon");
const math_1 = require("../../../common/math");
const locationHeap = gl_matrix_1.vec3.create();
/**
 * A cliff/terrain doodad.
 */
class TerrainDoodad {
    constructor(map, model, row, doodad) {
        const centeroffset = map.centerOffset;
        const instance = model.addInstance();
        locationHeap[0] = doodad.location[0] * 128 + centeroffset[0] + 128;
        locationHeap[1] = doodad.location[1] * 128 + centeroffset[1] + 128;
        instance.move(locationHeap);
        instance.rotateLocal(gl_matrix_1.quat.setAxisAngle(gl_matrix_1.quat.create(), gl_matrix_addon_1.VEC3_UNIT_Z, math_1.degToRad(row.number('fixedRot'))));
        instance.setScene(map.worldScene);
        this.instance = instance;
        this.row = row;
    }
}
exports.default = TerrainDoodad;
//# sourceMappingURL=terraindoodad.js.map