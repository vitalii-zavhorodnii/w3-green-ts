"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
const modelinstance_1 = require("../../modelinstance");
const skeletalnode_1 = require("../../skeletalnode");
const datatexture_1 = require("../../gl/datatexture");
const node_1 = require("./node");
const attachmentinstance_1 = require("./attachmentinstance");
const particleemitter_1 = require("./particleemitter");
const particleemitter2_1 = require("./particleemitter2");
const ribbonemitter_1 = require("./ribbonemitter");
const eventobjectspnemitter_1 = require("./eventobjectspnemitter");
const eventobjectsplemitter_1 = require("./eventobjectsplemitter");
const eventobjectubremitter_1 = require("./eventobjectubremitter");
const eventobjectsndemitter_1 = require("./eventobjectsndemitter");
const geometryemitterfuncs_1 = require("./geometryemitterfuncs");
const visibilityHeap = new Float32Array(1);
const translationHeap = gl_matrix_1.vec3.create();
const rotationHeap = gl_matrix_1.quat.create();
const scaleHeap = gl_matrix_1.vec3.create();
const colorHeap = new Float32Array(3);
const alphaHeap = new Float32Array(1);
const textureIdHeap = new Uint32Array(1);
/**
 * An MDX model instance.
 */
class MdxModelInstance extends modelinstance_1.default {
    constructor(model) {
        super(model);
        this.attachments = [];
        this.particleEmitters = [];
        this.particleEmitters2 = [];
        this.ribbonEmitters = [];
        this.eventObjectEmitters = [];
        this.nodes = [];
        this.sortedNodes = [];
        this.frame = 0;
        // Global sequences
        this.counter = 0;
        this.sequence = -1;
        this.sequenceLoopMode = 0;
        this.sequenceEnded = false;
        this.teamColor = 0;
        this.vertexColor = new Float32Array([1, 1, 1, 1]);
        // Particles do not spawn when the sequence is -1, or when the sequence finished and it's not repeating
        this.allowParticleSpawn = false;
        // If forced is true, everything will update regardless of variancy.
        // Any later non-forced update can then use variancy to skip updating things.
        // It is set to true every time the sequence is set with setSequence().
        this.forced = true;
        this.geosetColors = [];
        this.layerAlphas = [];
        this.layerTextures = [];
        this.uvAnims = [];
        this.worldMatrices = null;
        this.boneTexture = null;
        for (let i = 0, l = model.geosets.length; i < l; i++) {
            this.geosetColors[i] = new Float32Array(4);
        }
        for (let i = 0, l = model.layers.length; i < l; i++) {
            this.layerAlphas[i] = 0;
            this.layerTextures[i] = 0;
            this.uvAnims[i] = new Float32Array(5);
        }
        // Create the needed amount of shared nodes.
        const sharedNodeData = skeletalnode_1.createSkeletalNodes(model.genericObjects.length, node_1.default);
        const nodes = sharedNodeData.nodes;
        let nodeIndex = 0;
        this.nodes.push(...nodes);
        // A shared typed array for all world matrices of the internal nodes.
        this.worldMatrices = sharedNodeData.worldMatrices;
        // And now initialize all of the nodes and objects
        for (const bone of model.bones) {
            this.initNode(nodes, nodes[nodeIndex++], bone);
        }
        for (const light of model.lights) {
            this.initNode(nodes, nodes[nodeIndex++], light);
        }
        for (const helper of model.helpers) {
            this.initNode(nodes, nodes[nodeIndex++], helper);
        }
        for (const attachment of model.attachments) {
            let attachmentInstance;
            // Attachments may have game models attached to them, such as Undead and Nightelf building animations.
            if (attachment.internalModel) {
                attachmentInstance = new attachmentinstance_1.default(this, attachment);
                this.attachments.push(attachmentInstance);
            }
            this.initNode(nodes, nodes[nodeIndex++], attachment, attachmentInstance);
        }
        for (const emitterObject of model.particleEmitters) {
            const emitter = new particleemitter_1.default(this, emitterObject);
            this.particleEmitters.push(emitter);
            this.initNode(nodes, nodes[nodeIndex++], emitterObject, emitter);
        }
        for (const emitterObject of model.particleEmitters2) {
            const emitter = new particleemitter2_1.default(this, emitterObject);
            this.particleEmitters2.push(emitter);
            this.initNode(nodes, nodes[nodeIndex++], emitterObject, emitter);
        }
        for (const emitterObject of model.ribbonEmitters) {
            const emitter = new ribbonemitter_1.default(this, emitterObject);
            this.ribbonEmitters.push(emitter);
            this.initNode(nodes, nodes[nodeIndex++], emitterObject, emitter);
        }
        for (const emitterObject of model.eventObjects) {
            const type = emitterObject.type;
            let emitter;
            if (type === 'SPN') {
                emitter = new eventobjectspnemitter_1.default(this, emitterObject);
            }
            else if (type === 'SPL') {
                emitter = new eventobjectsplemitter_1.default(this, emitterObject);
            }
            else if (type === 'UBR') {
                emitter = new eventobjectubremitter_1.default(this, emitterObject);
            }
            else {
                emitter = new eventobjectsndemitter_1.default(this, emitterObject);
            }
            this.eventObjectEmitters.push(emitter);
            this.initNode(nodes, nodes[nodeIndex++], emitterObject, emitter);
        }
        for (const collisionShape of model.collisionShapes) {
            this.initNode(nodes, nodes[nodeIndex++], collisionShape);
        }
        // Save a sorted array of all of the nodes, such that every child node comes after its parent.
        // This allows for flat iteration when updating.
        const hierarchy = model.hierarchy;
        for (let i = 0, l = nodes.length; i < l; i++) {
            this.sortedNodes[i] = nodes[hierarchy[i]];
        }
        if (model.bones.length) {
            this.boneTexture = new datatexture_1.default(model.viewer.gl, 4, model.bones.length * 4, 1);
        }
    }
    /**
     * Override the texture at the given index.
     *
     * If a texture isn't given, removes the override if there was one.
     */
    setTexture(index, texture) {
        this.overrideTexture(index, texture);
    }
    /**
     * Override the texture of the particle emitter the given index.
     *
     * If a texture isn't given, removes the override if there was one.
     */
    setParticle2Texture(index, texture) {
        this.overrideTexture(geometryemitterfuncs_1.EMITTER_PARTICLE2_TEXTURE_OFFSET + index, texture);
    }
    /**
     * Override the texture of the event emitter the given index.
     *
     * If a texture isn't given, removes the override if there was one.
     */
    setEventTexture(index, texture) {
        this.overrideTexture(geometryemitterfuncs_1.EMITTER_EVENT_TEXTURE_OFFSET + index, texture);
    }
    /**
     * Clear all of the emitted objects that belong to this instance.
     */
    clearEmittedObjects() {
        for (const emitter of this.particleEmitters) {
            emitter.clear();
        }
        for (const emitter of this.particleEmitters2) {
            emitter.clear();
        }
        for (const emitter of this.ribbonEmitters) {
            emitter.clear();
        }
        for (const emitter of this.eventObjectEmitters) {
            emitter.clear();
        }
    }
    /**
     * Initialize a skeletal node.
     */
    initNode(nodes, node, genericObject, object) {
        gl_matrix_1.vec3.copy(node.pivot, genericObject.pivot);
        if (genericObject.parentId === -1) {
            node.parent = this;
        }
        else {
            node.parent = nodes[genericObject.parentId];
        }
        node.dontInheritTranslation = genericObject.dontInheritTranslation;
        node.dontInheritRotation = genericObject.dontInheritRotation;
        node.dontInheritScaling = genericObject.dontInheritScaling;
        if (genericObject.billboarded) {
            node.billboarded = true;
        }
        else if (genericObject.billboardedX) {
            node.billboardedX = true;
        }
        else if (genericObject.billboardedY) {
            node.billboardedY = true;
        }
        else if (genericObject.billboardedZ) {
            node.billboardedZ = true;
        }
        if (object) {
            node.object = object;
        }
    }
    /**
     * Overriden to hide also attachment models.
     */
    hide() {
        super.hide();
        this.resetAttachments();
    }
    /**
     * Updates all of this instance internal nodes and objects.
     * Nodes that are determined to not be visible will not be updated, nor will any of their children down the hierarchy.
     */
    updateNodes(dt, forced) {
        const sequence = this.sequence;
        const frame = this.frame;
        const counter = this.counter;
        const sortedNodes = this.sortedNodes;
        const model = this.model;
        const sortedGenericObjects = model.sortedGenericObjects;
        // Update the nodes
        for (let i = 0, l = sortedNodes.length; i < l; i++) {
            const genericObject = sortedGenericObjects[i];
            const node = sortedNodes[i];
            const parent = node.parent;
            let wasDirty = forced || parent.wasDirty || genericObject.anyBillboarding;
            const variants = genericObject.variants;
            // Local node transformation.
            // Use variants to skip animation data when possible.
            if (forced || variants['generic'][sequence]) {
                wasDirty = true;
                // Translation
                if (forced || variants['translation'][sequence]) {
                    genericObject.getTranslation(node.localLocation, sequence, frame, counter);
                }
                // Rotation
                if (forced || variants['rotation'][sequence]) {
                    genericObject.getRotation(node.localRotation, sequence, frame, counter);
                }
                // Scale
                if (forced || variants['scale'][sequence]) {
                    genericObject.getScale(node.localScale, sequence, frame, counter);
                }
            }
            node.wasDirty = wasDirty;
            // If this is a forced update, or this node's local data was updated, or the parent node was updated, do a full world update.
            if (wasDirty) {
                node.recalculateTransformation(this);
            }
            // If there is an instance object associated with this node (emitter/attachment), and it is visible, update it.
            if (node.object) {
                genericObject.getVisibility(visibilityHeap, sequence, frame, counter);
                // If the attachment/emitter is visible, update it.
                if (visibilityHeap[0] > 0) {
                    node.object.update(dt);
                }
            }
            // Recalculate and update child nodes.
            // Note that this only affects normal nodes such as instances, and not skeletal nodes.
            for (const child of node.children) {
                if (wasDirty) {
                    child.recalculateTransformation();
                }
                child.update(dt);
            }
        }
    }
    /**
     * If a model has no sequences or is running no sequence, it will only update once since it will never be forced to update.
     * This is generally the desired behavior, except when it is moved by the client.
     * Therefore, if an instance is transformed, always do a forced update.
     */
    recalculateTransformation() {
        super.recalculateTransformation();
        this.forced = true;
    }
    /**
     * Update the batch data.
     */
    updateBatches(forced) {
        const sequence = this.sequence;
        const frame = this.frame;
        const counter = this.counter;
        const model = this.model;
        const geosets = model.geosets;
        const layers = model.layers;
        const geosetColors = this.geosetColors;
        const layerAlphas = this.layerAlphas;
        const layerTextures = this.layerTextures;
        const uvAnims = this.uvAnims;
        // Geosets
        for (let i = 0, l = geosets.length; i < l; i++) {
            const geoset = geosets[i];
            const geosetAnimation = geoset.geosetAnimation;
            const geosetColor = geosetColors[i];
            if (geosetAnimation) {
                // Color
                if (forced || geosetAnimation.variants['color'][sequence]) {
                    geosetAnimation.getColor(colorHeap, sequence, frame, counter);
                    geosetColor[0] = colorHeap[0];
                    geosetColor[1] = colorHeap[1];
                    geosetColor[2] = colorHeap[2];
                }
                // Alpha
                if (forced || geosetAnimation.variants['alpha'][sequence]) {
                    geosetAnimation.getAlpha(alphaHeap, sequence, frame, counter);
                    geosetColor[3] = alphaHeap[0];
                }
            }
            else if (forced) {
                geosetColor[0] = 1;
                geosetColor[1] = 1;
                geosetColor[2] = 1;
                geosetColor[3] = 1;
            }
        }
        // Layers
        for (let i = 0, l = layers.length; i < l; i++) {
            const layer = layers[i];
            const textureAnimation = layer.textureAnimation;
            const uvAnim = uvAnims[i];
            // Alpha
            if (forced || layer.variants['alpha'][sequence]) {
                layer.getAlpha(alphaHeap, sequence, frame, counter);
                layerAlphas[i] = alphaHeap[0];
            }
            // Sprite animation
            if (forced || layer.variants['textureId'][sequence]) {
                layer.getTextureId(textureIdHeap, sequence, frame, counter);
                layerTextures[i] = textureIdHeap[0];
            }
            if (textureAnimation) {
                // UV translation animation
                if (forced || textureAnimation.variants['translation'][sequence]) {
                    textureAnimation.getTranslation(translationHeap, sequence, frame, counter);
                    uvAnim[0] = translationHeap[0];
                    uvAnim[1] = translationHeap[1];
                }
                // UV rotation animation
                if (forced || textureAnimation.variants['rotation'][sequence]) {
                    textureAnimation.getRotation(rotationHeap, sequence, frame, counter);
                    uvAnim[2] = rotationHeap[2];
                    uvAnim[3] = rotationHeap[3];
                }
                // UV scale animation
                if (forced || textureAnimation.variants['scale'][sequence]) {
                    textureAnimation.getScale(scaleHeap, sequence, frame, counter);
                    uvAnim[4] = scaleHeap[0];
                }
            }
            else if (forced) {
                uvAnim[0] = 0;
                uvAnim[1] = 0;
                uvAnim[2] = 0;
                uvAnim[3] = 1;
                uvAnim[4] = 1;
            }
        }
    }
    updateBoneTexture() {
        if (this.boneTexture) {
            this.boneTexture.bindAndUpdate(this.worldMatrices);
        }
    }
    renderOpaque() {
        const model = this.model;
        for (const group of model.opaqueGroups) {
            group.render(this);
        }
    }
    renderTranslucent() {
        const model = this.model;
        for (const group of model.translucentGroups) {
            group.render(this);
        }
    }
    updateAnimations(dt) {
        const model = this.model;
        const sequenceId = this.sequence;
        if (sequenceId !== -1) {
            const sequence = model.sequences[sequenceId];
            const interval = sequence.interval;
            const frameTime = dt * 1000;
            this.frame += frameTime;
            this.counter += frameTime;
            this.allowParticleSpawn = true;
            if (this.frame >= interval[1]) {
                if (this.sequenceLoopMode === 2 || (this.sequenceLoopMode === 0 && sequence.nonLooping === 0)) {
                    this.frame = interval[0];
                    this.resetEventEmitters();
                }
                else {
                    this.frame = interval[1];
                    this.counter -= frameTime;
                    this.allowParticleSpawn = false;
                }
                this.sequenceEnded = true;
            }
            else {
                this.sequenceEnded = false;
            }
        }
        const forced = this.forced;
        if (sequenceId !== -1 || forced) {
            // Update the nodes
            this.updateNodes(dt, forced);
            // Update the bone texture.
            this.updateBoneTexture();
            // Update the batches
            this.updateBatches(forced);
        }
        this.forced = false;
    }
    /**
     * Set the team color of this instance.
     */
    setTeamColor(id) {
        this.teamColor = id;
        return this;
    }
    /**
     * Set the vertex color of this instance.
     */
    setVertexColor(color) {
        this.vertexColor.set(color);
        return this;
    }
    /**
     * Set the sequence of this instance.
     */
    setSequence(id) {
        const model = this.model;
        const sequences = model.sequences;
        this.sequence = id;
        if (id < 0 || id > sequences.length - 1) {
            this.sequence = -1;
            this.frame = 0;
            this.allowParticleSpawn = false;
        }
        else {
            this.frame = sequences[id].interval[0];
        }
        this.resetEventEmitters();
        this.resetAttachments();
        this.forced = true;
        return this;
    }
    getBounds() {
        const model = this.model;
        if (this.sequence === -1) {
            return model.bounds;
        }
        const bounds = model.sequences[this.sequence].bounds;
        if (bounds.r === 0) {
            return model.bounds;
        }
        return bounds;
    }
    /**
     * Set the sequence loop mode.
     * 0 to never loop, 1 to loop based on the model, and 2 to always loop.
     */
    setSequenceLoopMode(mode) {
        this.sequenceLoopMode = mode;
        return this;
    }
    /**
     * Get an attachment node.
     */
    getAttachment(id) {
        const model = this.model;
        const attachment = model.attachments[id];
        if (attachment) {
            return this.nodes[attachment.index];
        }
        return;
    }
    resetEventEmitters() {
        for (const emitter of this.eventObjectEmitters) {
            emitter.lastValue = 0;
        }
    }
    resetAttachments() {
        for (const attachment of this.attachments) {
            attachment.internalInstance.hide();
        }
    }
}
exports.default = MdxModelInstance;
//# sourceMappingURL=modelinstance.js.map