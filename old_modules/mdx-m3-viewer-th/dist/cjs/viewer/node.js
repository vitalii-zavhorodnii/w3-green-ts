"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_addon_1 = require("../common/gl-matrix-addon");
const locationHeap = gl_matrix_1.vec3.create();
const rotationHeap = gl_matrix_1.quat.create();
const scalingHeap = gl_matrix_1.vec3.create();
/**
 * A node.
 */
class Node {
    constructor() {
        this.pivot = gl_matrix_1.vec3.create();
        this.localLocation = gl_matrix_1.vec3.create();
        this.localRotation = gl_matrix_1.quat.create();
        this.localScale = gl_matrix_1.vec3.fromValues(1, 1, 1);
        this.worldLocation = gl_matrix_1.vec3.create();
        this.worldRotation = gl_matrix_1.quat.create();
        this.worldScale = gl_matrix_1.vec3.fromValues(1, 1, 1);
        this.inverseWorldLocation = gl_matrix_1.vec3.create();
        this.inverseWorldRotation = gl_matrix_1.quat.create();
        this.inverseWorldScale = gl_matrix_1.vec3.fromValues(1, 1, 1);
        this.localMatrix = gl_matrix_1.mat4.create();
        this.worldMatrix = gl_matrix_1.mat4.create();
        this.dontInheritTranslation = false;
        this.dontInheritRotation = false;
        this.dontInheritScaling = true;
        this.parent = null;
        this.children = [];
    }
    /**
     * Sets the node's pivot.
     */
    setPivot(pivot) {
        gl_matrix_1.vec3.copy(this.pivot, pivot);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Sets the node's local location.
     */
    setLocation(location) {
        gl_matrix_1.vec3.copy(this.localLocation, location);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Sets the node's local rotation.
     */
    setRotation(rotation) {
        gl_matrix_1.quat.copy(this.localRotation, rotation);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Sets the node's local scale.
     */
    setScale(varying) {
        gl_matrix_1.vec3.copy(this.localScale, varying);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Sets the node's local scale uniformly.
     */
    setUniformScale(uniform) {
        gl_matrix_1.vec3.set(this.localScale, uniform, uniform, uniform);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Sets the node's local location, rotation, and scale.
     */
    setTransformation(location, rotation, scale) {
        const localLocation = this.localLocation;
        const localRotation = this.localRotation;
        const localScale = this.localScale;
        localLocation[0] = location[0];
        localLocation[1] = location[1];
        localLocation[2] = location[2];
        // vec3.copy(this.localLocation, location);
        localRotation[0] = rotation[0];
        localRotation[1] = rotation[1];
        localRotation[2] = rotation[2];
        localRotation[3] = rotation[3];
        // quat.copy(this.localRotation, rotation);
        localScale[0] = scale[0];
        localScale[1] = scale[1];
        localScale[2] = scale[2];
        // vec3.copy(this.localScale, scale);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Resets the node's local location, pivot, rotation, and scale, to the default values.
     */
    resetTransformation() {
        gl_matrix_1.vec3.copy(this.pivot, gl_matrix_addon_1.VEC3_ZERO);
        gl_matrix_1.vec3.copy(this.localLocation, gl_matrix_addon_1.VEC3_ZERO);
        gl_matrix_1.quat.copy(this.localRotation, gl_matrix_addon_1.QUAT_DEFAULT);
        gl_matrix_1.vec3.copy(this.localScale, gl_matrix_addon_1.VEC3_ONE);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Moves the node's pivot.
     */
    movePivot(offset) {
        gl_matrix_1.vec3.add(this.pivot, this.pivot, offset);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Moves the node's local location.
     */
    move(offset) {
        gl_matrix_1.vec3.add(this.localLocation, this.localLocation, offset);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Rotates the node's local rotation in world space.
     */
    rotate(rotation) {
        gl_matrix_1.quat.mul(this.localRotation, this.localRotation, rotation);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Rotates the node's local rotation in local space.
     */
    rotateLocal(rotation) {
        gl_matrix_1.quat.mul(this.localRotation, rotation, this.localRotation);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Scales the node.
     */
    scale(scale) {
        gl_matrix_1.vec3.mul(this.localScale, this.localScale, scale);
        this.recalculateTransformation();
        return this;
    }
    /**
     * Scales the node uniformly.
     */
    uniformScale(scale) {
        gl_matrix_1.vec3.scale(this.localScale, this.localScale, scale);
        this.recalculateTransformation();
        return this;
    }
    face(to, worldUp) {
        gl_matrix_1.quat.conjugate(this.localRotation, gl_matrix_addon_1.quatLookAt(this.localRotation, this.localLocation, to, worldUp));
        this.recalculateTransformation();
        return this;
    }
    /**
     * Sets the node's parent.
     */
    setParent(parent) {
        // If the node already had a parent, detach from it first.
        if (this.parent) {
            const children = this.parent.children;
            const index = children.indexOf(this);
            if (index !== -1) {
                children.splice(index, 1);
            }
        }
        this.parent = parent || null;
        // If the new parent is an actual thing, add this node as a child.
        if (parent) {
            parent.children.push(this);
        }
        this.recalculateTransformation();
        return this;
    }
    /**
     * Recalculate this node's transformation data.
     */
    recalculateTransformation() {
        const parent = this.parent;
        const localMatrix = this.localMatrix;
        const localLocation = this.localLocation;
        const localRotation = this.localRotation;
        const localScale = this.localScale;
        const worldMatrix = this.worldMatrix;
        const worldLocation = this.worldLocation;
        const worldRotation = this.worldRotation;
        const worldScale = this.worldScale;
        const inverseWorldLocation = this.inverseWorldLocation;
        const inverseWorldRotation = this.inverseWorldRotation;
        const inverseWorldScale = this.inverseWorldScale;
        if (parent) {
            const computedLocation = locationHeap;
            const parentPivot = parent.pivot;
            let computedRotation;
            let computedScaling;
            computedLocation[0] = localLocation[0] + parentPivot[0];
            computedLocation[1] = localLocation[1] + parentPivot[1];
            computedLocation[2] = localLocation[2] + parentPivot[2];
            // vec3.add(computedLocation, localLocation, parentPivot);
            // If this node shouldn't inherit the parent's rotation, rotate it by the inverse.
            if (this.dontInheritRotation) {
                computedRotation = rotationHeap;
                gl_matrix_1.quat.mul(computedRotation, localRotation, parent.inverseWorldRotation);
            }
            else {
                computedRotation = localRotation;
            }
            // If this node shouldn't inherit the parent's translation, translate it by the inverse.
            // if (this.dontInheritTranslation) {
            // mat4.translate(worldMatrix, worldMatrix, parent.inverseWorldLocation);
            // }
            if (this.dontInheritScaling) {
                computedScaling = scalingHeap;
                const parentInverseScale = parent.inverseWorldScale;
                computedScaling[0] = parentInverseScale[0] * localScale[0];
                computedScaling[1] = parentInverseScale[1] * localScale[1];
                computedScaling[2] = parentInverseScale[2] * localScale[2];
                // vec3.mul(computedScaling, parent.inverseWorldScale, localScale);
                worldScale[0] = localScale[0];
                worldScale[1] = localScale[1];
                worldScale[2] = localScale[2];
                // vec3.copy(worldScale, localScale);
            }
            else {
                computedScaling = localScale;
                const parentScale = parent.worldScale;
                worldScale[0] = parentScale[0] * localScale[0];
                worldScale[1] = parentScale[1] * localScale[1];
                worldScale[2] = parentScale[2] * localScale[2];
                // vec3.mul(worldScale, parentScale, localScale);
            }
            gl_matrix_1.mat4.fromRotationTranslationScale(localMatrix, computedRotation, computedLocation, computedScaling);
            gl_matrix_1.mat4.mul(worldMatrix, parent.worldMatrix, localMatrix);
            gl_matrix_1.quat.mul(worldRotation, parent.worldRotation, computedRotation);
        }
        else {
            // Local matrix
            gl_matrix_1.mat4.fromRotationTranslationScale(localMatrix, localRotation, localLocation, localScale);
            // World matrix
            worldMatrix[0] = localMatrix[0];
            worldMatrix[1] = localMatrix[1];
            worldMatrix[2] = localMatrix[2];
            worldMatrix[3] = localMatrix[3];
            worldMatrix[4] = localMatrix[4];
            worldMatrix[5] = localMatrix[5];
            worldMatrix[6] = localMatrix[6];
            worldMatrix[7] = localMatrix[7];
            worldMatrix[8] = localMatrix[8];
            worldMatrix[9] = localMatrix[9];
            worldMatrix[10] = localMatrix[10];
            worldMatrix[11] = localMatrix[11];
            worldMatrix[12] = localMatrix[12];
            worldMatrix[13] = localMatrix[13];
            worldMatrix[14] = localMatrix[14];
            worldMatrix[15] = localMatrix[15];
            // mat4.copy(worldMatrix, localMatrix);
            // World rotation
            worldRotation[0] = localRotation[0];
            worldRotation[1] = localRotation[1];
            worldRotation[2] = localRotation[2];
            worldRotation[3] = localRotation[3];
            // quat.copy(worldRotation, localRotation);
            // World scale
            worldScale[0] = localScale[0];
            worldScale[1] = localScale[1];
            worldScale[2] = localScale[2];
            // vec3.copy(worldScale, localScale);
        }
        // Inverse world rotation
        inverseWorldRotation[0] = -worldRotation[0];
        inverseWorldRotation[1] = -worldRotation[1];
        inverseWorldRotation[2] = -worldRotation[2];
        inverseWorldRotation[3] = worldRotation[3];
        // quat.conjugate(inverseWorldRotation, worldRotation);
        // Inverse world scale
        inverseWorldScale[0] = 1 / worldScale[0];
        inverseWorldScale[1] = 1 / worldScale[1];
        inverseWorldScale[2] = 1 / worldScale[2];
        // vec3.inverse(this.inverseWorldScale, worldScale);
        // World location
        worldLocation[0] = worldMatrix[12];
        worldLocation[1] = worldMatrix[13];
        worldLocation[2] = worldMatrix[14];
        // Inverse world location
        inverseWorldLocation[0] = -worldLocation[0];
        inverseWorldLocation[1] = -worldLocation[1];
        inverseWorldLocation[2] = -worldLocation[2];
        // vec3.negate(this.inverseWorldLocation, worldLocation);
        for (const child of this.children) {
            child.recalculateTransformation();
        }
    }
    /**
     * Update this node, and continue down the node hierarchy.
     */
    update(dt) {
        for (const child of this.children) {
            child.update(dt);
        }
    }
}
exports.Node = Node;
//# sourceMappingURL=node.js.map