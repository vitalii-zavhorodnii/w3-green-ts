"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A player.
 */
class Player {
    constructor() {
        this.id = 0;
        this.type = 0;
        this.race = 0;
        this.isFixedStartPosition = 0;
        this.name = '';
        this.startLocation = new Float32Array(2);
        this.allyLowPriorities = 0;
        this.allyHighPriorities = 0;
        this.unknown1 = new Uint8Array(8);
    }
    load(stream, version) {
        this.id = stream.readInt32();
        this.type = stream.readInt32();
        this.race = stream.readInt32();
        this.isFixedStartPosition = stream.readInt32();
        this.name = stream.readNull();
        stream.readFloat32Array(this.startLocation);
        this.allyLowPriorities = stream.readUint32();
        this.allyHighPriorities = stream.readUint32();
        if (version > 30) {
            stream.readUint8Array(this.unknown1);
        }
    }
    save(stream, version) {
        stream.writeInt32(this.id);
        stream.writeInt32(this.type);
        stream.writeInt32(this.race);
        stream.writeInt32(this.isFixedStartPosition);
        stream.writeNull(this.name);
        stream.writeFloat32Array(this.startLocation);
        stream.writeUint32(this.allyLowPriorities);
        stream.writeUint32(this.allyHighPriorities);
        if (version > 30) {
            stream.writeUint8Array(this.unknown1);
        }
    }
    getByteLength(version) {
        let size = 33 + utf8_1.byteLengthUtf8(this.name);
        if (version > 30) {
            size += 8;
        }
        return size;
    }
}
exports.default = Player;
//# sourceMappingURL=player.js.map