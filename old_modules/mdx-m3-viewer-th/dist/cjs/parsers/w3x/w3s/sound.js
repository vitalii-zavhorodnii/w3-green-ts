"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A sound.
 */
class Sound {
    constructor() {
        this.name = '';
        this.file = '';
        this.eaxEffect = '';
        this.flags = 0;
        this.fadeInRate = 0;
        this.fadeOutRate = 0;
        this.volume = 0;
        this.pitch = 0;
        this.pitchVariance = 0;
        this.priority = 0;
        this.channel = 0;
        this.minDistance = 0;
        this.maxDistance = 0;
        this.distanceCutoff = 0;
        this.coneInside = 0;
        this.coneOutside = 0;
        this.coneOutsideVolume = 0;
        this.coneOrientationX = 0;
        this.coneOrientationY = 0;
        this.coneOrientationZ = 0;
    }
    load(stream, version) {
        this.name = stream.readNull();
        this.file = stream.readNull();
        this.eaxEffect = stream.readNull();
        this.flags = stream.readUint32();
        this.fadeInRate = stream.readInt32();
        this.fadeOutRate = stream.readInt32();
        this.volume = stream.readInt32();
        this.pitch = stream.readFloat32();
        this.pitchVariance = stream.readFloat32();
        this.priority = stream.readInt32();
        this.channel = stream.readInt32();
        this.minDistance = stream.readFloat32();
        this.maxDistance = stream.readFloat32();
        this.distanceCutoff = stream.readFloat32();
        this.coneInside = stream.readFloat32();
        this.coneOutside = stream.readFloat32();
        this.coneOutsideVolume = stream.readInt32();
        this.coneOrientationX = stream.readFloat32();
        this.coneOrientationY = stream.readFloat32();
        this.coneOrientationZ = stream.readFloat32();
        if (version > 1) {
            if (version > 2) {
            }
        }
    }
    save(stream, version) {
        stream.writeNull(this.name);
        stream.writeNull(this.file);
        stream.writeNull(this.eaxEffect);
        stream.writeUint32(this.flags);
        stream.writeUint32(this.fadeInRate);
        stream.writeUint32(this.fadeOutRate);
        stream.writeUint32(this.volume);
        stream.writeFloat32(this.pitch);
        stream.writeFloat32(this.pitchVariance);
        stream.writeInt32(this.priority);
        stream.writeInt32(this.channel);
        stream.writeFloat32(this.minDistance);
        stream.writeFloat32(this.maxDistance);
        stream.writeFloat32(this.distanceCutoff);
        stream.writeFloat32(this.coneInside);
        stream.writeFloat32(this.coneOutside);
        stream.writeInt32(this.coneOutsideVolume);
        stream.writeFloat32(this.coneOrientationX);
        stream.writeFloat32(this.coneOrientationY);
        stream.writeFloat32(this.coneOrientationZ);
        if (version > 1) {
            if (version > 2) {
            }
        }
    }
    getByteLength(version) {
        const size = 71 + utf8_1.byteLengthUtf8(this.name) + utf8_1.byteLengthUtf8(this.file) + utf8_1.byteLengthUtf8(this.eaxEffect);
        if (version > 1) {
            if (version > 2) {
            }
        }
        return size;
    }
}
exports.default = Sound;
//# sourceMappingURL=sound.js.map