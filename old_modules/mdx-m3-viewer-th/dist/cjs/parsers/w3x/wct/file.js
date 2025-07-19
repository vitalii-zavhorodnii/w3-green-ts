"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binarystream_1 = require("../../../common/binarystream");
const utf8_1 = require("../../../common/utf8");
const customtexttrigger_1 = require("./customtexttrigger");
/**
 * war3map.wct - the custom text (jass) trigger file.
 */
class War3MapWct {
    constructor() {
        this.version = 0;
        this.comment = '';
        this.trigger = new customtexttrigger_1.default();
        this.triggers = [];
    }
    load(buffer) {
        const stream = new binarystream_1.default(buffer);
        this.version = stream.readInt32();
        if (this.version === 1) {
            this.comment = stream.readNull();
            this.trigger.load(stream);
        }
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            const trigger = new customtexttrigger_1.default();
            trigger.load(stream);
            this.triggers[i] = trigger;
        }
    }
    save() {
        const stream = new binarystream_1.default(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        if (this.version === 1) {
            stream.writeNull(this.comment);
            this.trigger.save(stream);
        }
        stream.writeUint32(this.triggers.length);
        for (const trigger of this.triggers) {
            trigger.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 8;
        if (this.version === 1) {
            size += utf8_1.byteLengthUtf8(this.comment) + 1 + this.trigger.getByteLength();
        }
        for (const trigger of this.triggers) {
            size += trigger.getByteLength();
        }
        return size;
    }
}
exports.default = War3MapWct;
//# sourceMappingURL=file.js.map