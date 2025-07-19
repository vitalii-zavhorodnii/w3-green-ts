"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd_1 = require("./sd");
/**
 * An animation object.
 */
class AnimatedObject {
    constructor(model, object) {
        this.animations = new Map();
        this.variants = {};
        this.model = model;
        for (const animation of object.animations) {
            this.animations.set(animation.name, sd_1.createTypedSd(model, animation));
        }
    }
    getScalarValue(out, name, sequence, frame, counter, defaultValue) {
        if (sequence !== -1) {
            const animation = this.animations.get(name);
            if (animation) {
                return animation.getValue(out, sequence, frame, counter);
            }
        }
        out[0] = defaultValue;
        return -1;
    }
    getVectorValue(out, name, sequence, frame, counter, defaultValue) {
        if (sequence !== -1) {
            const animation = this.animations.get(name);
            if (animation) {
                return animation.getValue(out, sequence, frame, counter);
            }
        }
        out[0] = defaultValue[0];
        out[1] = defaultValue[1];
        out[2] = defaultValue[2];
        return -1;
    }
    getQuatValue(out, name, sequence, frame, counter, defaultValue) {
        if (sequence !== -1) {
            const animation = this.animations.get(name);
            if (animation) {
                return animation.getValue(out, sequence, frame, counter);
            }
        }
        out[0] = defaultValue[0];
        out[1] = defaultValue[1];
        out[2] = defaultValue[2];
        out[3] = defaultValue[3];
        return -1;
    }
    addVariants(name, variantName) {
        const animation = this.animations.get(name);
        const sequences = this.model.sequences.length;
        const variants = new Uint8Array(sequences);
        if (animation) {
            for (let i = 0; i < sequences; i++) {
                if (animation.isVariant(i)) {
                    variants[i] = 1;
                }
            }
        }
        this.variants[variantName] = variants;
    }
    addVariantIntersection(names, variantName) {
        const sequences = this.model.sequences.length;
        const variants = new Uint8Array(sequences);
        for (let i = 0; i < sequences; i++) {
            for (const name of names) {
                if (this.variants[name][i]) {
                    variants[i] = 1;
                }
            }
        }
        this.variants[variantName] = variants;
    }
}
exports.default = AnimatedObject;
//# sourceMappingURL=animatedobject.js.map