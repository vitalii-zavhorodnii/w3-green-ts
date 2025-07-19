"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animatedobject_1 = require("./animatedobject");
const filtermode_1 = require("./filtermode");
/**
 * An MDX layer.
 */
class Layer extends animatedobject_1.default {
    constructor(model, layer, layerId, priorityPlane) {
        super(model, layer);
        this.textureId = 0;
        this.blendSrc = 0;
        this.blendDst = 0;
        this.blended = false;
        this.textureAnimation = null;
        let filterMode = layer.filterMode;
        const textureAnimationId = layer.textureAnimationId;
        const gl = model.viewer.gl;
        this.index = layerId;
        this.priorityPlane = priorityPlane;
        if (filterMode > 6 /* Modulate2x */) {
            filterMode = 2 /* Blend */;
        }
        this.filterMode = filterMode;
        if (layer.textureId !== -1) {
            this.textureId = layer.textureId;
        }
        this.coordId = layer.coordId;
        this.alpha = layer.alpha;
        const flags = layer.flags;
        this.unshaded = flags & 1 /* Unshaded */;
        this.sphereEnvironmentMap = flags & 2 /* SphereEnvMap */;
        this.twoSided = flags & 16 /* TwoSided */;
        this.unfogged = flags & 32 /* Unfogged */;
        this.noDepthTest = flags & 64 /* NoDepthTest */;
        this.noDepthSet = flags & 128 /* NoDepthSet */;
        this.depthMaskValue = (filterMode === 0 /* None */ || filterMode === 1 /* Transparent */);
        if (filterMode > 1 /* Transparent */) {
            this.blended = true;
            [this.blendSrc, this.blendDst] = filtermode_1.layerFilterMode(filterMode, gl);
        }
        if (textureAnimationId !== -1) {
            const textureAnimation = model.textureAnimations[textureAnimationId];
            if (textureAnimation) {
                this.textureAnimation = textureAnimation;
            }
        }
        this.addVariants('KMTA', 'alpha');
        this.addVariants('KMTF', 'textureId');
    }
    bind(shader) {
        const gl = this.model.viewer.gl;
        // gl.uniform1f(shader.uniforms.u_unshaded, this.unshaded);
        gl.uniform1f(shader.uniforms['u_filterMode'], this.filterMode);
        if (this.blended) {
            gl.enable(gl.BLEND);
            gl.blendFunc(this.blendSrc, this.blendDst);
        }
        else {
            gl.disable(gl.BLEND);
        }
        if (this.twoSided) {
            gl.disable(gl.CULL_FACE);
        }
        else {
            gl.enable(gl.CULL_FACE);
        }
        if (this.noDepthTest) {
            gl.disable(gl.DEPTH_TEST);
        }
        else {
            gl.enable(gl.DEPTH_TEST);
        }
        if (this.noDepthSet) {
            gl.depthMask(false);
        }
        else {
            gl.depthMask(this.depthMaskValue);
        }
    }
    getAlpha(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KMTA', sequence, frame, counter, this.alpha);
    }
    getTextureId(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KMTF', sequence, frame, counter, this.textureId);
    }
}
exports.default = Layer;
//# sourceMappingURL=layer.js.map