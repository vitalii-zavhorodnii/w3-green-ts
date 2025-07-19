"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_addon_1 = require("../common/gl-matrix-addon");
const node_1 = require("./node");
/**
 * A model instance.
 */
class ModelInstance extends node_1.Node {
    constructor(model) {
        super();
        this.scene = null;
        this.left = -1;
        this.right = -1;
        this.bottom = -1;
        this.top = -1;
        this.plane = -1;
        this.depth = 0;
        this.updateFrame = 0;
        /**
         * Allows to slow down or speed up animations of this instance, and any children.
         */
        this.timeScale = 1;
        /**
         * If false, this instance won't be rendered.
         *
         * When working with Warcraft 3 instances, it is preferable to use hide() and show().
         * These hide and show also internal instances of this instance.
         */
        this.rendered = true;
        this.textureOverrides = new Map();
        this.model = model;
    }
    /**
     * This instance should be shown.
     */
    show() {
        this.rendered = true;
    }
    /**
     * This instance should be hidden.
     */
    hide() {
        this.rendered = false;
    }
    /**
     * Should the instance be shown?
     */
    shown() {
        return this.rendered;
    }
    /**
     * Should the instance be hidden?
     */
    hidden() {
        return !this.rendered;
    }
    /**
     * Detach this instance from the scene it's in.
     *
     * Equivalent to scene.removeInstance(instance).
     */
    detach() {
        if (this.scene) {
            return this.scene.removeInstance(this);
        }
        return false;
    }
    overrideTexture(index, texture) {
        if (texture) {
            this.textureOverrides.set(index, texture);
        }
        else {
            this.textureOverrides.delete(index);
        }
    }
    /**
     * Called for instance culling.
     */
    getBounds() {
        return this.model.bounds;
    }
    /**
     * Clears any objects that were emitted by this instance.
     */
    clearEmittedObjects() {
    }
    /**
     * Sets the scene of this instance.
     *
     * This is equivalent to scene.addInstance(instance).
     */
    setScene(scene) {
        return scene.addInstance(this);
    }
    recalculateTransformation() {
        super.recalculateTransformation();
        if (this.scene) {
            this.scene.grid.moved(this);
        }
    }
    update(dt) {
        const scene = this.scene;
        if (scene && this.rendered && this.isVisible(scene.camera)) {
            // Add this instance to the render list.
            scene.renderInstance(this);
            // Update this instance.
            this.updateAnimations(dt * this.timeScale);
            // Update child nodes if there are any, such as instances parented to instances.
            super.update(dt);
        }
    }
    updateAnimations(_dt) {
    }
    renderOpaque() {
    }
    renderTranslucent() {
    }
    isVisible(camera) {
        const [x, y, z] = this.worldLocation;
        const [sx, sy, sz] = this.worldScale;
        const bounds = this.getBounds();
        const planes = camera.planes;
        let biggest = sx;
        // Get the biggest scaling dimension.
        if (sy > biggest) {
            biggest = sy;
        }
        if (sz > biggest) {
            biggest = sz;
        }
        this.plane = gl_matrix_addon_1.testSphere(planes, x + bounds.x, y + bounds.y, z + bounds.z, bounds.r * biggest, this.plane);
        if (this.plane === -1) {
            this.depth = gl_matrix_addon_1.distanceToPlane3(planes[4], x, y, z);
            return true;
        }
        return false;
    }
}
exports.default = ModelInstance;
//# sourceMappingURL=modelinstance.js.map