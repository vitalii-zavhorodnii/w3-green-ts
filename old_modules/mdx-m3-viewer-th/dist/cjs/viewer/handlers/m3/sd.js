"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
const math_1 = require("../../../common/math");
const vectorHeap = gl_matrix_1.vec3.create();
const quatHeap = gl_matrix_1.quat.create();
/**
 * Sequence data.
 */
class M3Sd {
    constructor(sd) {
        this.keys = sd.keys.get();
        this.values = sd.values.get(); // Fake typecasting to avoid a TS error.
        this.biggestKey = sd.biggestKey;
    }
}
/**
 * A sequence data container.
 */
class M3SdContainer {
    constructor() {
        this.sd = [];
    }
    addSds(sds) {
        for (const sd of sds) {
            this.sd.push(new M3Sd(sd));
        }
    }
    getValueUnsafe(index, animationReference, frame, runsConcurrent) {
        const sd = this.sd[index];
        if (runsConcurrent) {
            frame = frame % sd.biggestKey;
        }
        const keys = sd.keys;
        const values = sd.values;
        // getInterval
        let a = keys.length;
        let b = 0;
        while (b !== keys.length && frame > keys[b]) {
            a = b;
            b++;
        }
        const length = keys.length;
        if (a === length) {
            if (b === length) {
                return animationReference.initValue;
            }
            else {
                return values[b];
            }
        }
        if (b === length || a >= b) {
            return values[a];
        }
        const t = math_1.clamp((frame - keys[a]) / (keys[b] - keys[a]), 0, 1);
        const va = values[a];
        const vb = values[b];
        const interpolationType = animationReference.interpolationType;
        const fakeVa = va; /// UGLY!!!
        if (fakeVa.length === 4) {
            if (interpolationType === 0) {
                return gl_matrix_1.quat.copy(quatHeap, va);
            }
            else {
                return gl_matrix_1.quat.slerp(quatHeap, va, vb, t);
            }
        }
        else if (fakeVa.length === 3) {
            if (interpolationType === 0) {
                return gl_matrix_1.vec3.copy(vectorHeap, va);
            }
            else {
                return gl_matrix_1.vec3.lerp(vectorHeap, va, vb, t);
            }
        }
        else {
            if (interpolationType === 0) {
                return va;
            }
            else {
                return math_1.lerp(va, vb, t);
            }
        }
    }
}
exports.default = M3SdContainer;
//# sourceMappingURL=sd.js.map