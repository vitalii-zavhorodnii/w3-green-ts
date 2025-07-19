"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../../parsers/mdlx/model");
const sequence_1 = require("./sequence");
const model_2 = require("../../model");
const handler_1 = require("./handler");
const textureanimation_1 = require("./textureanimation");
const layer_1 = require("./layer");
const material_1 = require("./material");
const geosetanimation_1 = require("./geosetanimation");
const replaceableids_1 = require("./replaceableids");
const bone_1 = require("./bone");
const light_1 = require("./light");
const helper_1 = require("./helper");
const attachment_1 = require("./attachment");
const particleemitterobject_1 = require("./particleemitterobject");
const particleemitter2object_1 = require("./particleemitter2object");
const ribbonemitterobject_1 = require("./ribbonemitterobject");
const camera_1 = require("./camera");
const eventobjectemitterobject_1 = require("./eventobjectemitterobject");
const collisionshape_1 = require("./collisionshape");
const setupgeosets_1 = require("./setupgeosets");
const setupgroups_1 = require("./setupgroups");
const modelinstance_1 = require("./modelinstance");
const texture_1 = require("./texture");
/**
 * An MDX model.
 */
class MdxModel extends model_2.default {
    constructor(bufferOrParser, resourceData) {
        super(resourceData);
        this.reforged = false;
        this.hd = false;
        this.solverParams = {};
        this.name = '';
        this.sequences = [];
        this.globalSequences = [];
        this.materials = [];
        this.layers = [];
        this.textures = [];
        this.textureAnimations = [];
        this.geosets = [];
        this.geosetAnimations = [];
        this.bones = [];
        this.lights = [];
        this.helpers = [];
        this.attachments = [];
        this.pivotPoints = [];
        this.particleEmitters = [];
        this.particleEmitters2 = [];
        this.ribbonEmitters = [];
        this.cameras = [];
        this.eventObjects = [];
        this.collisionShapes = [];
        this.hasLayerAnims = false;
        this.hasGeosetAnims = false;
        this.batches = [];
        this.genericObjects = [];
        this.sortedGenericObjects = [];
        this.hierarchy = [];
        this.opaqueGroups = [];
        this.translucentGroups = [];
        this.arrayBuffer = null;
        this.elementBuffer = null;
        this.skinDataType = 0;
        this.bytesPerSkinElement = 1;
        let parser;
        if (bufferOrParser instanceof model_1.default) {
            parser = bufferOrParser;
        }
        else {
            parser = new model_1.default();
            try {
                parser.load(bufferOrParser);
            }
            catch (e) {
                // If we get here, the parser failed to load.
                // It still may have loaded enough data to support rendering though!
                // I have encountered a model that is missing data, but still works in-game.
                // So just let the code continue.
                // If the handler manages to load the model, nothing happened.
                // If critical data is missing, it will fail and throw its own exception.
            }
        }
        const viewer = this.viewer;
        const pathSolver = this.pathSolver;
        const solverParams = this.solverParams;
        const reforged = parser.version > 800;
        const texturesExt = reforged ? '.dds' : '.blp';
        let hasTeamColors = false;
        this.reforged = reforged;
        this.name = parser.name;
        // Initialize the bounds.
        const extent = parser.extent;
        this.bounds.fromExtents(extent.min, extent.max);
        // Sequences
        for (const sequence of parser.sequences) {
            this.sequences.push(new sequence_1.default(sequence));
        }
        // Global sequences
        for (const globalSequence of parser.globalSequences) {
            this.globalSequences.push(globalSequence);
        }
        // Texture animations
        for (const textureAnimation of parser.textureAnimations) {
            this.textureAnimations.push(new textureanimation_1.default(this, textureAnimation));
        }
        // Materials
        let layerId = 0;
        for (const material of parser.materials) {
            const layers = [];
            for (const layer of material.layers) {
                const vLayer = new layer_1.default(this, layer, layerId++, material.priorityPlane);
                layers.push(vLayer);
                this.layers.push(vLayer);
            }
            this.materials.push(new material_1.default(this, material.shader, layers));
            if (material.shader !== '') {
                this.hd = true;
            }
        }
        if (reforged) {
            solverParams.reforged = true;
        }
        if (this.hd) {
            solverParams.hd = true;
            // mdxHandler.loadEnv(viewer);
        }
        // Textures.
        const textures = parser.textures;
        for (let i = 0, l = textures.length; i < l; i++) {
            const texture = textures[i];
            let path = texture.path;
            const replaceableId = texture.replaceableId;
            const wrapMode = texture.wrapMode;
            if (path === '' && replaceableId !== 0) {
                path = `ReplaceableTextures\\${replaceableids_1.default[replaceableId]}${texturesExt}`;
                if (replaceableId === 1 || replaceableId === 2) {
                    hasTeamColors = true;
                }
            }
            const mdxTexture = new texture_1.default(replaceableId, wrapMode);
            viewer.load(path, pathSolver, solverParams)
                .then((texture) => {
                if (texture) {
                    mdxTexture.texture = texture;
                }
            });
            this.textures[i] = mdxTexture;
        }
        // Geoset animations
        for (const geosetAnimation of parser.geosetAnimations) {
            this.geosetAnimations.push(new geosetanimation_1.default(this, geosetAnimation));
        }
        this.pivotPoints = parser.pivotPoints;
        // Tracks the IDs of all generic objects.
        let objectId = 0;
        // Bones
        for (const bone of parser.bones) {
            this.bones.push(new bone_1.default(this, bone, objectId++));
        }
        // Lights
        for (const light of parser.lights) {
            this.lights.push(new light_1.default(this, light, objectId++));
        }
        // Helpers
        for (const helper of parser.helpers) {
            this.helpers.push(new helper_1.default(this, helper, objectId++));
        }
        // Attachments
        for (const attachment of parser.attachments) {
            this.attachments.push(new attachment_1.default(this, attachment, objectId++));
        }
        // Particle emitters
        for (const particleEmitter of parser.particleEmitters) {
            this.particleEmitters.push(new particleemitterobject_1.default(this, particleEmitter, objectId++));
        }
        // Particle emitters 2
        for (const particleEmitter2 of parser.particleEmitters2) {
            const emitter = new particleemitter2object_1.default(this, particleEmitter2, objectId++);
            this.particleEmitters2.push(emitter);
            if (emitter.teamColored) {
                hasTeamColors = true;
            }
        }
        // Ribbon emitters
        for (const ribbonEmitter of parser.ribbonEmitters) {
            this.ribbonEmitters.push(new ribbonemitterobject_1.default(this, ribbonEmitter, objectId++));
        }
        // Cameras
        for (const camera of parser.cameras) {
            this.cameras.push(new camera_1.default(this, camera));
        }
        // Event objects
        for (const eventObject of parser.eventObjects) {
            this.eventObjects.push(new eventobjectemitterobject_1.default(this, eventObject, objectId++));
        }
        // Collision shapes
        for (const collisionShape of parser.collisionShapes) {
            this.collisionShapes.push(new collisionshape_1.default(this, collisionShape, objectId++));
        }
        // One array for all generic objects.
        this.genericObjects.push(...this.bones, ...this.lights, ...this.helpers, ...this.attachments, ...this.particleEmitters, ...this.particleEmitters2, ...this.ribbonEmitters, ...this.eventObjects, ...this.collisionShapes);
        // Geosets
        setupgeosets_1.default(this, parser.geosets);
        // Render groups.
        setupgroups_1.default(this);
        // Creates the sorted indices array of the generic objects.
        this.setupHierarchy(-1);
        // Keep a sorted array.
        for (let i = 0, l = this.genericObjects.length; i < l; i++) {
            this.sortedGenericObjects[i] = this.genericObjects[this.hierarchy[i]];
        }
        // Lazy loading team colors.
        if (hasTeamColors) {
            handler_1.default.loadTeamTextures(viewer);
        }
    }
    addInstance() {
        return new modelinstance_1.default(this);
    }
    setupHierarchy(parent) {
        for (let i = 0, l = this.genericObjects.length; i < l; i++) {
            const object = this.genericObjects[i];
            if (object.parentId === parent) {
                this.hierarchy.push(i);
                this.setupHierarchy(object.objectId);
            }
        }
    }
}
exports.default = MdxModel;
//# sourceMappingURL=model.js.map