"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A region.
 */
class Region {
    constructor() {
        this.left = 0;
        this.right = 0;
        this.bottom = 0;
        this.top = 0;
        this.name = '';
        this.creationNumber = 0;
        this.weatherEffectId = '\0\0\0\0';
        this.ambientSound = '';
        this.color = new Uint8Array(4);
    }
    load(stream) {
        this.left = stream.readFloat32();
        this.right = stream.readFloat32();
        this.bottom = stream.readFloat32();
        this.top = stream.readFloat32();
        this.name = stream.readNull();
        this.creationNumber = stream.readUint32();
        this.weatherEffectId = stream.readBinary(4);
        this.ambientSound = stream.readNull();
        stream.readUint8Array(this.color);
    }
    save(stream) {
        stream.writeFloat32(this.left);
        stream.writeFloat32(this.right);
        stream.writeFloat32(this.bottom);
        stream.writeFloat32(this.top);
        stream.writeNull(this.name);
        stream.writeUint32(this.creationNumber);
        if (this.weatherEffectId) {
            stream.writeBinary(this.weatherEffectId);
        }
        else {
            stream.writeUint32(0);
        }
        stream.writeNull(this.ambientSound);
        stream.writeUint8Array(this.color);
    }
    getByteLength() {
        return 30 + utf8_1.byteLengthUtf8(this.name) + utf8_1.byteLengthUtf8(this.ambientSound);
    }
}
exports.default = Region;
//# sourceMappingURL=region.js.map