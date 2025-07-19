"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const genericobject_1 = require("./genericobject");
const filtermode_1 = require("./filtermode");
const geometryemitterfuncs_1 = require("./geometryemitterfuncs");
const texture_1 = require("./texture");
/**
 * An event object.
 */
class EventObjectEmitterObject extends genericobject_1.default {
    constructor(model, eventObject, index) {
        super(model, eventObject, index);
        this.geometryEmitterType = -1;
        this.globalSequence = -1;
        this.defval = new Uint32Array(1);
        this.internalModel = null;
        this.internalTexture = null;
        this.colors = [];
        this.intervalTimes = new Float32Array(3);
        this.scale = 0;
        this.columns = 0;
        this.rows = 0;
        this.lifeSpan = 0;
        this.blendSrc = 0;
        this.blendDst = 0;
        this.intervals = [];
        this.distanceCutoff = 0;
        this.maxDistance = 0;
        this.minDistance = 0;
        this.pitch = 0;
        this.pitchVariance = 0;
        this.volume = 0;
        this.decodedBuffers = [];
        this.ok = false;
        const viewer = model.viewer;
        const name = eventObject.name;
        let type = name.substring(0, 3);
        const id = name.substring(4);
        // Same thing
        if (type === 'FPT') {
            type = 'SPL';
        }
        if (type === 'SPL') {
            this.geometryEmitterType = geometryemitterfuncs_1.EMITTER_SPLAT;
        }
        else if (type === 'UBR') {
            this.geometryEmitterType = geometryemitterfuncs_1.EMITTER_UBERSPLAT;
        }
        this.type = type;
        this.id = id;
        this.tracks = eventObject.tracks;
        const globalSequenceId = eventObject.globalSequenceId;
        if (globalSequenceId !== -1) {
            this.globalSequence = model.globalSequences[globalSequenceId];
        }
        // If this is a sound event object, and the viewer doesn't have audio enabled, don't do anything.
        // This saves bandwidth when audio is not desired.
        if (type === 'SND' && !viewer.audioEnabled) {
            return;
        }
        // It's not possible to know ahead of time what file(s) event objects would need.
        // This is because the SLKs are lazily loaded, and might not exist at this point.
        // Therefore make a promise, and resolve it after all of the files loaded.
        const resolve = viewer.promise();
        handler_1.default.getEventObjectData(viewer, type, id, model.hd)
            .then((data) => {
            // Now the promise can be resolved to allow the viewer to handle events correctly.
            resolve();
            if (data) {
                const { row, resources } = data;
                this.ok = true;
                if (type === 'SPN') {
                    this.internalModel = resources[0];
                }
                else if (type === 'SPL' || type === 'UBR') {
                    this.internalTexture = new texture_1.default(0, 3 /* WrapBoth */);
                    this.internalTexture.texture = resources[0];
                    this.scale = row.number('Scale');
                    this.colors[0] = new Float32Array([row.number('StartR'), row.number('StartG'), row.number('StartB'), row.number('StartA')]);
                    this.colors[1] = new Float32Array([row.number('MiddleR'), row.number('MiddleG'), row.number('MiddleB'), row.number('MiddleA')]);
                    this.colors[2] = new Float32Array([row.number('EndR'), row.number('EndG'), row.number('EndB'), row.number('EndA')]);
                    if (type === 'SPL') {
                        this.columns = row.number('Columns');
                        this.rows = row.number('Rows');
                        this.lifeSpan = row.number('Lifespan') + row.number('Decay');
                        this.intervalTimes[0] = row.number('Lifespan');
                        this.intervalTimes[1] = row.number('Decay');
                        this.intervals[0] = new Float32Array([row.number('UVLifespanStart'), row.number('UVLifespanEnd'), row.number('LifespanRepeat')]);
                        this.intervals[1] = new Float32Array([row.number('UVDecayStart'), row.number('UVDecayEnd'), row.number('DecayRepeat')]);
                    }
                    else {
                        this.columns = 1;
                        this.rows = 1;
                        this.lifeSpan = row.number('BirthTime') + row.number('PauseTime') + row.number('Decay');
                        this.intervalTimes[0] = row.number('BirthTime');
                        this.intervalTimes[1] = row.number('PauseTime');
                        this.intervalTimes[2] = row.number('Decay');
                    }
                    const blendModes = filtermode_1.emitterFilterMode(row.number('BlendMode'), viewer.gl);
                    this.blendSrc = blendModes[0];
                    this.blendDst = blendModes[1];
                }
                else {
                    this.distanceCutoff = row.number('DistanceCutoff');
                    this.maxDistance = row.number('MaxDistance');
                    this.minDistance = row.number('MinDistance');
                    this.pitch = row.number('Pitch');
                    this.pitchVariance = row.number('PitchVariance');
                    this.volume = row.number('Volume');
                    for (const resource of resources) {
                        this.decodedBuffers.push(resource.data);
                    }
                }
            }
        });
    }
    getValue(out, instance) {
        if (this.globalSequence !== -1) {
            const globalSequence = this.globalSequence;
            return this.getValueAtTime(out, instance.counter % globalSequence, 0, globalSequence);
        }
        else if (instance.sequence !== -1) {
            const interval = this.model.sequences[instance.sequence].interval;
            return this.getValueAtTime(out, instance.frame, interval[0], interval[1]);
        }
        else {
            out[0] = this.defval[0];
            return -1;
        }
    }
    getValueAtTime(out, frame, start, end) {
        const tracks = this.tracks;
        if (frame >= start && frame <= end) {
            for (let i = tracks.length - 1; i > -1; i--) {
                if (tracks[i] < start) {
                    out[0] = 0;
                    return i;
                }
                else if (tracks[i] <= frame) {
                    out[0] = 1;
                    return i;
                }
            }
        }
        out[0] = 0;
        return -1;
    }
}
exports.default = EventObjectEmitterObject;
//# sourceMappingURL=eventobjectemitterobject.js.map