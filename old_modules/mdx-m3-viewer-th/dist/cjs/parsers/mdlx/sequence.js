"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extent_1 = require("./extent");
/**
 * A sequence.
 */
class Sequence {
    constructor() {
        this.name = '';
        this.interval = new Uint32Array(2);
        this.moveSpeed = 0;
        this.nonLooping = 0;
        this.rarity = 0;
        this.syncPoint = 0;
        this.extent = new extent_1.default();
    }
    readMdx(stream) {
        this.name = stream.read(80);
        stream.readUint32Array(this.interval);
        this.moveSpeed = stream.readFloat32();
        this.nonLooping = stream.readUint32();
        this.rarity = stream.readFloat32();
        this.syncPoint = stream.readUint32();
        this.extent.readMdx(stream);
    }
    writeMdx(stream) {
        stream.skip(80 - stream.write(this.name));
        stream.writeUint32Array(this.interval);
        stream.writeFloat32(this.moveSpeed);
        stream.writeUint32(this.nonLooping);
        stream.writeFloat32(this.rarity);
        stream.writeUint32(this.syncPoint);
        this.extent.writeMdx(stream);
    }
    readMdl(stream) {
        this.name = stream.read();
        for (const token of stream.readBlock()) {
            if (token === 'Interval') {
                stream.readVector(this.interval);
            }
            else if (token === 'NonLooping') {
                this.nonLooping = 1;
            }
            else if (token === 'MoveSpeed') {
                this.moveSpeed = stream.readFloat();
            }
            else if (token === 'Rarity') {
                this.rarity = stream.readFloat();
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
            else {
                throw new Error(`Unknown token in Sequence: "${token}"`);
            }
        }
    }
    writeMdl(stream) {
        stream.startObjectBlock('Anim', this.name);
        stream.writeVectorAttrib('Interval', this.interval);
        if (this.nonLooping === 1) {
            stream.writeFlag('NonLooping');
        }
        if (this.moveSpeed !== 0) {
            stream.writeNumberAttrib('MoveSpeed', this.moveSpeed);
        }
        if (this.rarity !== 0) {
            stream.writeNumberAttrib('Rarity', this.rarity);
        }
        this.extent.writeMdl(stream);
        stream.endBlock();
    }
}
exports.default = Sequence;
//# sourceMappingURL=sequence.js.map