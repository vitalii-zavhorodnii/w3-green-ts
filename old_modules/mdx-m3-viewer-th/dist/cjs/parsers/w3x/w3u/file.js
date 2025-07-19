"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binarystream_1 = require("../../../common/binarystream");
const modificationtable_1 = require("./modificationtable");
/**
 * war3map.w3u - the unit modification file.
 *
 * Also used for war3map.w3t (items), war3map.w3b (destructibles), and war3map.w3h (buffs).
 */
class War3MapW3u {
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
        this.originalTable.load(stream, false, this.version);
        this.customTable.load(stream, false, this.version);
    }
    save() {
        const stream = new binarystream_1.default(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        this.originalTable.save(stream, false, this.version);
        this.customTable.save(stream, false, this.version);
        return stream.uint8array;
    }
    getByteLength() {
        return (4 +
            this.originalTable.getByteLength(false, this.version) +
            this.customTable.getByteLength(false, this.version));
    }
}
exports.default = War3MapW3u;
//# sourceMappingURL=file.js.map