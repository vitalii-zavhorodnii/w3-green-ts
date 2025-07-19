"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericobject_1 = require("./genericobject");
const filtermode_1 = require("./filtermode");
const replaceableids_1 = require("./replaceableids");
const geometryemitterfuncs_1 = require("./geometryemitterfuncs");
const texture_1 = require("./texture");
/**
 * An MDX particle emitter type 2.
 */
class ParticleEmitter2Object extends genericobject_1.default {
    constructor(model, emitter, index) {
        super(model, emitter, index);
        this.geometryEmitterType = geometryemitterfuncs_1.EMITTER_PARTICLE2;
        this.teamColored = 0;
        this.internalTexture = null;
        this.colors = [];
        /**
         * Even if the internal texture isn't loaded, it's fine to run emitters based on this emitter object.
         *
         * The particles will simply be black.
         */
        this.ok = true;
        this.width = emitter.width;
        this.length = emitter.length;
        this.speed = emitter.speed;
        this.latitude = emitter.latitude;
        this.gravity = emitter.gravity;
        this.emissionRate = emitter.emissionRate * geometryemitterfuncs_1.SETTING_PARTICLES_HIGH;
        this.squirt = emitter.squirt;
        this.lifeSpan = emitter.lifeSpan;
        this.variation = emitter.variation;
        this.tailLength = emitter.tailLength;
        this.timeMiddle = emitter.timeMiddle;
        const flags = emitter.flags;
        this.lineEmitter = flags & 131072 /* LineEmitter */;
        this.unfogged = flags & 262144 /* Unfogged */;
        this.modelSpace = flags & 524288 /* ModelSpace */;
        this.xYQuad = flags & 1048576 /* XYQuad */;
        const replaceableId = emitter.replaceableId;
        this.columns = emitter.columns;
        this.rows = emitter.rows;
        if (replaceableId === 1 || replaceableId === 2) {
            this.teamColored = 1;
        }
        else if (replaceableId > 2) {
            const texturesExt = model.reforged ? '.dds' : '.blp';
            this.internalTexture = new texture_1.default(replaceableId, 0 /* RepeatBoth */);
            model.viewer.load(`ReplaceableTextures\\${replaceableids_1.default[replaceableId]}${texturesExt}`, model.pathSolver, model.solverParams)
                .then((texture) => {
                if (texture) {
                    this.internalTexture.texture = texture;
                }
            });
        }
        this.replaceableId = emitter.replaceableId;
        this.textureId = emitter.textureId;
        const headOrTail = emitter.headOrTail;
        this.head = (headOrTail === 0 /* Head */ || headOrTail === 2 /* Both */);
        this.tail = (headOrTail === 1 /* Tail */ || headOrTail === 2 /* Both */);
        this.cellWidth = 1 / emitter.columns;
        this.cellHeight = 1 / emitter.rows;
        const colors = emitter.segmentColors;
        const alpha = emitter.segmentAlphas;
        for (let i = 0; i < 3; i++) {
            const color = colors[i];
            this.colors[i] = new Float32Array([color[0], color[1], color[2], alpha[i] / 255]);
        }
        this.scaling = emitter.segmentScaling;
        const headIntervals = emitter.headIntervals;
        const tailIntervals = emitter.tailIntervals;
        // Change to Float32Array instead of Uint32Array to be able to pass the intervals directly using uniform3fv().
        this.intervals = [
            new Float32Array(headIntervals[0]),
            new Float32Array(headIntervals[1]),
            new Float32Array(tailIntervals[0]),
            new Float32Array(tailIntervals[1]),
        ];
        const blendModes = filtermode_1.emitterFilterMode(emitter.filterMode, this.model.viewer.gl);
        this.filterMode = emitter.filterMode;
        this.blendSrc = blendModes[0];
        this.blendDst = blendModes[1];
        this.priorityPlane = emitter.priorityPlane;
    }
    getWidth(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KP2N', sequence, frame, counter, this.width);
    }
    getLength(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KP2W', sequence, frame, counter, this.length);
    }
    getSpeed(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KP2S', sequence, frame, counter, this.speed);
    }
    getLatitude(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KP2L', sequence, frame, counter, this.latitude);
    }
    getGravity(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KP2G', sequence, frame, counter, this.gravity);
    }
    getEmissionRate(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KP2E', sequence, frame, counter, this.emissionRate);
    }
    getVariation(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KP2R', sequence, frame, counter, this.variation);
    }
    getVisibility(out, sequence, frame, counter) {
        return this.getScalarValue(out, 'KP2V', sequence, frame, counter, 1);
    }
}
exports.default = ParticleEmitter2Object;
//# sourceMappingURL=particleemitter2object.js.map