"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binarystream_1 = require("../../../common/binarystream");
const modificationtable_1 = require("../w3u/modificationtable");
/**
 * war3map.w3d - the doodad modification file.
 *
 * Also used for war3map.w3a (abilities), and war3map.w3q (upgrades).
 */
class War3MapW3d {
    constructor() {
        this.version = 0;
        this.originalTable = new modificationtable_1.default();
        this.customTable = new modificationtable_1.default();
    }
    load(bufferOrStream) {
        let stream;
        if (bufferOrStream instanceof binarystream_1.default) {
            stream = bufferOrStream;
        }
        else {
            stream = new binarystream_1.default(bufferOrStream);
        }
        this.version = stream.readInt32();
        this.originalTable.load(stream, true, this.version);
        this.customTable.load(stream, true, this.version);
    }
    save() {
        const stream = new binarystream_1.default(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        this.originalTable.save(stream, true, this.version);
        this.customTable.save(stream, true, this.version);
        return stream.uint8array;
    }
    getByteLength() {
        return (4 +
            this.originalTable.getByteLength(true, this.version) +
            this.customTable.getByteLength(true, this.version));
    }
}
exports.default = War3MapW3d;
//# sourceMappingURL=file.js.map