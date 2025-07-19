"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binarystream_1 = require("../../common/binarystream");
const utf8_1 = require("../../common/utf8");
const tokenstream_1 = require("./tokenstream");
const extent_1 = require("./extent");
const sequence_1 = require("./sequence");
const material_1 = require("./material");
const texture_1 = require("./texture");
const textureanimation_1 = require("./textureanimation");
const geoset_1 = require("./geoset");
const geosetanimation_1 = require("./geosetanimation");
const bone_1 = require("./bone");
const light_1 = require("./light");
const helper_1 = require("./helper");
const attachment_1 = require("./attachment");
const particleemitter_1 = require("./particleemitter");
const particleemitter2_1 = require("./particleemitter2");
const particleemitterpopcorn_1 = require("./particleemitterpopcorn");
const ribbonemitter_1 = require("./ribbonemitter");
const camera_1 = require("./camera");
const eventobject_1 = require("./eventobject");
const collisionshape_1 = require("./collisionshape");
const faceeffect_1 = require("./faceeffect");
const unknownchunk_1 = require("./unknownchunk");
const isformat_1 = require("./isformat");
/**
 * A Warcraft 3 model.
 * Supports loading from and saving to both the binary MDX and text MDL file formats.
 */
class Model {
    constructor() {
        /**
         * 800 for Warcraft 3: RoC and TFT.
         * >800 for Warcraft 3: Reforged.
         */
        this.version = 800;
        this.name = '';
        /**
         * To the best of my knowledge, this should always be left empty.
         */
        this.animationFile = '';
        this.extent = new extent_1.default();
        /**
         * This is only used by the now-defunct previewer that came with Art Tools.
         */
        this.blendTime = 0;
        this.sequences = [];
        this.globalSequences = [];
        this.materials = [];
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
        /**
         * @since 900
         */
        this.particleEmittersPopcorn = [];
        this.ribbonEmitters = [];
        this.cameras = [];
        this.eventObjects = [];
        this.collisionShapes = [];
        /**
         * @since 900
         */
        this.faceEffects = [];
        /**
         * @since 900
         */
        this.bindPose = [];
        /**
         * The MDX format is chunk based, and Warcraft 3 does not mind there being unknown chunks in there.
         * Some 3rd party tools use this to attach metadata to models.
         * When an unknown chunk is encountered, it will be added here.
         * These chunks will be saved when saving as MDX.
         */
        this.unknownChunks = [];
    }
    /**
     * Load the model from MDX or MDL.
     * The format is detected automatically.
     */
    load(buffer) {
        if (isformat_1.isMdx(buffer)) {
            if (typeof buffer === 'string') {
                buffer = utf8_1.encodeUtf8(buffer);
            }
            this.loadMdx(buffer);
        }
        else if (isformat_1.isMdl(buffer)) {
            if (typeof buffer !== 'string') {
                buffer = utf8_1.decodeUtf8(buffer);
            }
            this.loadMdl(buffer);
        }
        else {
            throw new Error('Not a valid MDX/MDL buffer');
        }
    }
    /**
     * Load the model from MDX.
     */
    loadMdx(buffer) {
        const stream = new binarystream_1.default(buffer);
        let tag;
        let size;
        stream.skip(4); // MDLX
        while (stream.remaining > 0) {
            tag = stream.readBinary(4);
            size = stream.readUint32();
            if (tag === 'VERS') {
                this.loadVersionChunk(stream);
            }
            else if (tag === 'MODL') {
                this.loadModelChunk(stream);
            }
            else if (tag === 'SEQS') {
                this.loadStaticObjects(this.sequences, sequence_1.default, stream, size / 132);
            }
            else if (tag === 'GLBS') {
                this.loadGlobalSequenceChunk(stream, size);
            }
            else if (tag === 'MTLS') {
                this.loadDynamicObjects(this.materials, material_1.default, stream, size);
            }
            else if (tag === 'TEXS') {
                this.loadStaticObjects(this.textures, texture_1.default, stream, size / 268);
            }
            else if (tag === 'TXAN') {
                this.loadDynamicObjects(this.textureAnimations, textureanimation_1.default, stream, size);
            }
            else if (tag === 'GEOS') {
                this.loadDynamicObjects(this.geosets, geoset_1.default, stream, size);
            }
            else if (tag === 'GEOA') {
                this.loadDynamicObjects(this.geosetAnimations, geosetanimation_1.default, stream, size);
            }
            else if (tag === 'BONE') {
                this.loadDynamicObjects(this.bones, bone_1.default, stream, size);
            }
            else if (tag === 'LITE') {
                this.loadDynamicObjects(this.lights, light_1.default, stream, size);
            }
            else if (tag === 'HELP') {
                this.loadDynamicObjects(this.helpers, helper_1.default, stream, size);
            }
            else if (tag === 'ATCH') {
                this.loadDynamicObjects(this.attachments, attachment_1.default, stream, size);
            }
            else if (tag === 'PIVT') {
                this.loadPivotPointChunk(stream, size);
            }
            else if (tag === 'PREM') {
                this.loadDynamicObjects(this.particleEmitters, particleemitter_1.default, stream, size);
            }
            else if (tag === 'PRE2') {
                this.loadDynamicObjects(this.particleEmitters2, particleemitter2_1.default, stream, size);
            }
            else if (tag === 'CORN') {
                this.loadDynamicObjects(this.particleEmittersPopcorn, particleemitterpopcorn_1.default, stream, size);
            }
            else if (tag === 'RIBB') {
                this.loadDynamicObjects(this.ribbonEmitters, ribbonemitter_1.default, stream, size);
            }
            else if (tag === 'CAMS') {
                this.loadDynamicObjects(this.cameras, camera_1.default, stream, size);
            }
            else if (tag === 'EVTS') {
                this.loadDynamicObjects(this.eventObjects, eventobject_1.default, stream, size);
            }
            else if (tag === 'CLID') {
                this.loadDynamicObjects(this.collisionShapes, collisionshape_1.default, stream, size);
            }
            else if (tag === 'FAFX') {
                this.loadStaticObjects(this.faceEffects, faceeffect_1.default, stream, size / 340);
            }
            else if (tag === 'BPOS') {
                this.loadBindPoseChunk(stream, size);
            }
            else {
                this.unknownChunks.push(new unknownchunk_1.default(stream, size, tag));
            }
        }
    }
    loadVersionChunk(stream) {
        this.version = stream.readUint32();
    }
    loadModelChunk(stream) {
        this.name = stream.read(80);
        this.animationFile = stream.read(260);
        this.extent.readMdx(stream);
        this.blendTime = stream.readUint32();
    }
    loadStaticObjects(out, constructor, stream, count) {
        for (let i = 0; i < count; i++) {
            const object = new constructor();
            object.readMdx(stream);
            out.push(object);
        }
    }
    loadGlobalSequenceChunk(stream, size) {
        for (let i = 0, l = size / 4; i < l; i++) {
            this.globalSequences.push(stream.readUint32());
        }
    }
    loadDynamicObjects(out, constructor, stream, size) {
        const end = stream.index + size;
        while (stream.index < end) {
            const object = new constructor();
            object.readMdx(stream, this.version);
            out.push(object);
        }
    }
    loadPivotPointChunk(stream, size) {
        for (let i = 0, l = size / 12; i < l; i++) {
            this.pivotPoints.push(stream.readFloat32Array(3));
        }
    }
    loadBindPoseChunk(stream, _size) {
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            this.bindPose[i] = stream.readFloat32Array(12);
        }
    }
    /**
     * Save the model as MDX.
     */
    saveMdx() {
        const stream = new binarystream_1.default(new ArrayBuffer(this.getByteLength()));
        stream.writeBinary('MDLX');
        this.saveVersionChunk(stream);
        this.saveModelChunk(stream);
        this.saveStaticObjectChunk(stream, 'SEQS', this.sequences, 132);
        this.saveGlobalSequenceChunk(stream);
        this.saveDynamicObjectChunk(stream, 'MTLS', this.materials);
        this.saveStaticObjectChunk(stream, 'TEXS', this.textures, 268);
        this.saveDynamicObjectChunk(stream, 'TXAN', this.textureAnimations);
        this.saveDynamicObjectChunk(stream, 'GEOS', this.geosets);
        this.saveDynamicObjectChunk(stream, 'GEOA', this.geosetAnimations);
        this.saveDynamicObjectChunk(stream, 'BONE', this.bones);
        this.saveDynamicObjectChunk(stream, 'LITE', this.lights);
        this.saveDynamicObjectChunk(stream, 'HELP', this.helpers);
        this.saveDynamicObjectChunk(stream, 'ATCH', this.attachments);
        this.savePivotPointChunk(stream);
        this.saveDynamicObjectChunk(stream, 'PREM', this.particleEmitters);
        this.saveDynamicObjectChunk(stream, 'PRE2', this.particleEmitters2);
        if (this.version > 800) {
            this.saveDynamicObjectChunk(stream, 'CORN', this.particleEmittersPopcorn);
        }
        this.saveDynamicObjectChunk(stream, 'RIBB', this.ribbonEmitters);
        this.saveDynamicObjectChunk(stream, 'CAMS', this.cameras);
        this.saveDynamicObjectChunk(stream, 'EVTS', this.eventObjects);
        this.saveDynamicObjectChunk(stream, 'CLID', this.collisionShapes);
        if (this.version > 800) {
            this.saveStaticObjectChunk(stream, 'FAFX', this.faceEffects, 340);
            this.saveBindPoseChunk(stream);
        }
        for (const chunk of this.unknownChunks) {
            chunk.writeMdx(stream);
        }
        return stream.uint8array;
    }
    saveVersionChunk(stream) {
        stream.writeBinary('VERS');
        stream.writeUint32(4);
        stream.writeUint32(this.version);
    }
    saveModelChunk(stream) {
        stream.writeBinary('MODL');
        stream.writeUint32(372);
        stream.skip(80 - stream.write(this.name));
        stream.skip(260 - stream.write(this.animationFile));
        this.extent.writeMdx(stream);
        stream.writeUint32(this.blendTime);
    }
    saveStaticObjectChunk(stream, name, objects, size) {
        if (objects.length) {
            stream.writeBinary(name);
            stream.writeUint32(objects.length * size);
            for (const object of objects) {
                object.writeMdx(stream);
            }
        }
    }
    saveGlobalSequenceChunk(stream) {
        if (this.globalSequences.length) {
            stream.writeBinary('GLBS');
            stream.writeUint32(this.globalSequences.length * 4);
            for (const globalSequence of this.globalSequences) {
                stream.writeUint32(globalSequence);
            }
        }
    }
    saveDynamicObjectChunk(stream, name, objects) {
        if (objects.length) {
            stream.writeBinary(name);
            stream.writeUint32(this.getObjectsByteLength(objects));
            for (const object of objects) {
                object.writeMdx(stream, this.version);
            }
        }
    }
    savePivotPointChunk(stream) {
        if (this.pivotPoints.length) {
            stream.writeBinary('PIVT');
            stream.writeUint32(this.pivotPoints.length * 12);
            for (const pivotPoint of this.pivotPoints) {
                stream.writeFloat32Array(pivotPoint);
            }
        }
    }
    saveBindPoseChunk(stream) {
        if (this.bindPose.length) {
            stream.writeBinary('BPOS');
            stream.writeUint32(4 + this.bindPose.length * 48);
            stream.writeUint32(this.bindPose.length);
            for (const matrix of this.bindPose) {
                stream.writeFloat32Array(matrix);
            }
        }
    }
    /**
     * Load the model from MDL.
     */
    loadMdl(buffer) {
        let token;
        const stream = new tokenstream_1.default(buffer);
        while ((token = stream.readToken())) {
            if (token === 'Version') {
                this.loadVersionBlock(stream);
            }
            else if (token === 'Model') {
                this.loadModelBlock(stream);
            }
            else if (token === 'Sequences') {
                this.loadNumberedObjectBlock(this.sequences, sequence_1.default, 'Anim', stream);
            }
            else if (token === 'GlobalSequences') {
                this.loadGlobalSequenceBlock(stream);
            }
            else if (token === 'Textures') {
                this.loadNumberedObjectBlock(this.textures, texture_1.default, 'Bitmap', stream);
            }
            else if (token === 'Materials') {
                this.loadNumberedObjectBlock(this.materials, material_1.default, 'Material', stream);
            }
            else if (token === 'TextureAnims') {
                this.loadNumberedObjectBlock(this.textureAnimations, textureanimation_1.default, 'TVertexAnim', stream);
            }
            else if (token === 'Geoset') {
                this.loadObject(this.geosets, geoset_1.default, stream);
            }
            else if (token === 'GeosetAnim') {
                this.loadObject(this.geosetAnimations, geosetanimation_1.default, stream);
            }
            else if (token === 'Bone') {
                this.loadObject(this.bones, bone_1.default, stream);
            }
            else if (token === 'Light') {
                this.loadObject(this.lights, light_1.default, stream);
            }
            else if (token === 'Helper') {
                this.loadObject(this.helpers, helper_1.default, stream);
            }
            else if (token === 'Attachment') {
                this.loadObject(this.attachments, attachment_1.default, stream);
            }
            else if (token === 'PivotPoints') {
                this.loadPivotPointBlock(stream);
            }
            else if (token === 'ParticleEmitter') {
                this.loadObject(this.particleEmitters, particleemitter_1.default, stream);
            }
            else if (token === 'ParticleEmitter2') {
                this.loadObject(this.particleEmitters2, particleemitter2_1.default, stream);
            }
            else if (token === 'ParticleEmitterPopcorn') {
                this.loadObject(this.particleEmittersPopcorn, particleemitterpopcorn_1.default, stream);
            }
            else if (token === 'RibbonEmitter') {
                this.loadObject(this.ribbonEmitters, ribbonemitter_1.default, stream);
            }
            else if (token === 'Camera') {
                this.loadObject(this.cameras, camera_1.default, stream);
            }
            else if (token === 'EventObject') {
                this.loadObject(this.eventObjects, eventobject_1.default, stream);
            }
            else if (token === 'CollisionShape') {
                this.loadObject(this.collisionShapes, collisionshape_1.default, stream);
            }
            else if (token === 'FaceFX') {
                this.loadObject(this.faceEffects, faceeffect_1.default, stream);
            }
            else if (token === 'BindPose') {
                this.loadBindPoseBlock(stream);
            }
            else {
                throw new Error(`Unsupported block: ${token}`);
            }
        }
    }
    loadVersionBlock(stream) {
        for (const token of stream.readBlock()) {
            if (token === 'FormatVersion') {
                this.version = stream.readInt();
            }
            else {
                throw new Error(`Unknown token in Version: "${token}"`);
            }
        }
    }
    loadModelBlock(stream) {
        this.name = stream.read();
        for (const token of stream.readBlock()) {
            if (token.startsWith('Num')) {
                // Don't care about the number of things, the arrays will grow as they wish.
                // This includes:
                //      NumGeosets
                //      NumGeosetAnims
                //      NumHelpers
                //      NumLights
                //      NumBones
                //      NumSoundEmitters (deprecated)
                //      NumAttachments
                //      NumParticleEmitters
                //      NumParticleEmitters2
                //      NumParticleEmittersPopcorn (>800)
                //      NumRibbonEmitters
                //      NumEvents
                //      NumFaceFX (>800)
                stream.read();
            }
            else if (token === 'BlendTime') {
                this.blendTime = stream.readInt();
            }
            else if (token === 'MinimumExtent') {
                stream.readVector(this.extent.min);
            }
            else if (token === 'MaximumExtent') {
                stream.readVector(this.extent.max);
            }
            else if (token === 'BoundsRadius') {
                this.extent.boundsRadius = stream.readFloat();
            }
            else if (token === 'AnimationFile') {
                this.animationFile = stream.read();
            }
            else {
                throw new Error(`Unknown token in Model: "${token}"`);
            }
        }
    }
    loadNumberedObjectBlock(out, constructor, name, stream) {
        stream.read(); // Don't care about the number, the array will grow.
        for (const token of stream.readBlock()) {
            if (token === name) {
                const object = new constructor();
                object.readMdl(stream);
                out.push(object);
            }
            else {
                throw new Error(`Unknown token in ${name}: "${token}"`);
            }
        }
    }
    loadGlobalSequenceBlock(stream) {
        stream.read(); // Don't care about the number, the array will grow.
        for (const token of stream.readBlock()) {
            if (token === 'Duration') {
                this.globalSequences.push(stream.readInt());
            }
            else {
                throw new Error(`Unknown token in GlobalSequences: "${token}"`);
            }
        }
    }
    loadObject(out, constructor, stream) {
        const object = new constructor();
        object.readMdl(stream);
        out.push(object);
    }
    loadPivotPointBlock(stream) {
        const count = stream.readInt();
        stream.read(); // {
        for (let i = 0; i < count; i++) {
            this.pivotPoints.push(stream.readVector(new Float32Array(3)));
        }
        stream.read(); // }
    }
    loadBindPoseBlock(stream) {
        for (const token of stream.readBlock()) {
            if (token === 'Matrices') {
                const matrices = stream.readInt();
                stream.read(); // {
                for (let i = 0; i < matrices; i++) {
                    this.bindPose[i] = stream.readVector(new Float32Array(12));
                }
                stream.read(); // }
            }
            else {
                throw new Error(`Unknown token in BindPose: "${token}"`);
            }
        }
    }
    /**
     * Save the model as MDL.
     */
    saveMdl() {
        const stream = new tokenstream_1.default();
        this.saveVersionBlock(stream);
        this.saveModelBlock(stream);
        this.saveStaticObjectsBlock(stream, 'Sequences', this.sequences);
        this.saveGlobalSequenceBlock(stream);
        this.saveStaticObjectsBlock(stream, 'Textures', this.textures);
        this.saveStaticObjectsBlock(stream, 'Materials', this.materials);
        this.saveStaticObjectsBlock(stream, 'TextureAnims', this.textureAnimations);
        this.saveObjects(stream, this.geosets);
        this.saveObjects(stream, this.geosetAnimations);
        this.saveObjects(stream, this.bones);
        this.saveObjects(stream, this.lights);
        this.saveObjects(stream, this.helpers);
        this.saveObjects(stream, this.attachments);
        this.savePivotPointBlock(stream);
        this.saveObjects(stream, this.particleEmitters);
        this.saveObjects(stream, this.particleEmitters2);
        if (this.version > 800) {
            this.saveObjects(stream, this.particleEmittersPopcorn);
        }
        this.saveObjects(stream, this.ribbonEmitters);
        this.saveObjects(stream, this.cameras);
        this.saveObjects(stream, this.eventObjects);
        this.saveObjects(stream, this.collisionShapes);
        if (this.version > 800) {
            this.saveObjects(stream, this.faceEffects);
            this.saveBindPoseBlock(stream);
        }
        return stream.buffer;
    }
    saveVersionBlock(stream) {
        stream.startBlock('Version');
        stream.writeNumberAttrib('FormatVersion', this.version);
        stream.endBlock();
    }
    saveModelBlock(stream) {
        stream.startObjectBlock('Model', this.name);
        stream.writeNumberAttrib('BlendTime', this.blendTime);
        this.extent.writeMdl(stream);
        if (this.animationFile.length) {
            stream.writeStringAttrib('AnimationFile', this.animationFile);
        }
        stream.endBlock();
    }
    saveStaticObjectsBlock(stream, name, objects) {
        if (objects.length) {
            stream.startBlock(name, objects.length);
            for (const object of objects) {
                object.writeMdl(stream, this.version);
            }
            stream.endBlock();
        }
    }
    saveGlobalSequenceBlock(stream) {
        if (this.globalSequences.length) {
            stream.startBlock('GlobalSequences', this.globalSequences.length);
            for (const globalSequence of this.globalSequences) {
                stream.writeNumberAttrib('Duration', globalSequence);
            }
            stream.endBlock();
        }
    }
    saveObjects(stream, objects) {
        for (const object of objects) {
            object.writeMdl(stream, this.version);
        }
    }
    savePivotPointBlock(stream) {
        if (this.pivotPoints.length) {
            stream.startBlock('PivotPoints', this.pivotPoints.length);
            for (const pivotPoint of this.pivotPoints) {
                stream.writeVector(pivotPoint);
            }
            stream.endBlock();
        }
    }
    saveBindPoseBlock(stream) {
        if (this.bindPose.length) {
            stream.startBlock('BindPose');
            stream.startBlock('Matrices', this.bindPose.length);
            for (const matrix of this.bindPose) {
                stream.writeVector(matrix);
            }
            stream.endBlock();
            stream.endBlock();
        }
    }
    /**
     * Calculate the size of the model as MDX.
     */
    getByteLength() {
        let size = 396;
        size += this.getStaticObjectsChunkByteLength(this.sequences, 132);
        size += this.getStaticObjectsChunkByteLength(this.globalSequences, 4);
        size += this.getDynamicObjectsChunkByteLength(this.materials);
        size += this.getStaticObjectsChunkByteLength(this.textures, 268);
        size += this.getDynamicObjectsChunkByteLength(this.textureAnimations);
        size += this.getDynamicObjectsChunkByteLength(this.geosets);
        size += this.getDynamicObjectsChunkByteLength(this.geosetAnimations);
        size += this.getDynamicObjectsChunkByteLength(this.bones);
        size += this.getDynamicObjectsChunkByteLength(this.lights);
        size += this.getDynamicObjectsChunkByteLength(this.helpers);
        size += this.getDynamicObjectsChunkByteLength(this.attachments);
        size += this.getStaticObjectsChunkByteLength(this.pivotPoints, 12);
        size += this.getDynamicObjectsChunkByteLength(this.particleEmitters);
        size += this.getDynamicObjectsChunkByteLength(this.particleEmitters2);
        if (this.version > 800) {
            size += this.getDynamicObjectsChunkByteLength(this.particleEmittersPopcorn);
        }
        size += this.getDynamicObjectsChunkByteLength(this.ribbonEmitters);
        size += this.getDynamicObjectsChunkByteLength(this.cameras);
        size += this.getDynamicObjectsChunkByteLength(this.eventObjects);
        size += this.getDynamicObjectsChunkByteLength(this.collisionShapes);
        if (this.version > 800) {
            size += this.getStaticObjectsChunkByteLength(this.faceEffects, 340);
            size += this.getBindPoseChunkByteLength();
        }
        size += this.getObjectsByteLength(this.unknownChunks);
        return size;
    }
    getObjectsByteLength(objects) {
        let size = 0;
        for (const object of objects) {
            size += object.getByteLength(this.version);
        }
        return size;
    }
    getDynamicObjectsChunkByteLength(objects) {
        if (objects.length) {
            return 8 + this.getObjectsByteLength(objects);
        }
        return 0;
    }
    getStaticObjectsChunkByteLength(objects, size) {
        if (objects.length) {
            return 8 + objects.length * size;
        }
        return 0;
    }
    getBindPoseChunkByteLength() {
        if (this.bindPose.length) {
            return 12 + this.bindPose.length * 48;
        }
        return 0;
    }
}
exports.default = Model;
//# sourceMappingURL=model.js.map