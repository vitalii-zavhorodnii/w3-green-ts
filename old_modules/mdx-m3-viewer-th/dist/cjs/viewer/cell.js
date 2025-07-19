"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_addon_1 = require("../common/gl-matrix-addon");
/**
 * A grid cell.
 */
class Cell {
    constructor(left, right, bottom, top) {
        this.plane = -1;
        this.instances = [];
        this.visible = false;
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
    }
    add(instance) {
        this.instances.push(instance);
    }
    remove(instance) {
        const index = this.instances.indexOf(instance);
        this.instances.splice(index, 1);
    }
    /**
     * Remove all of the instances from this cell.
     */
    clear() {
        this.instances.length = 0;
    }
    isVisible(camera) {
        this.plane = gl_matrix_addon_1.testCell(camera.planes, this.left, this.right, this.bottom, this.top, this.plane);
        return this.plane === -1;
    }
}
exports.default = Cell;
//# sourceMappingURL=cell.js.map