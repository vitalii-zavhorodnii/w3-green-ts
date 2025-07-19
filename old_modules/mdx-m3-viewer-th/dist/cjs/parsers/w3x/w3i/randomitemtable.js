"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
const randomitemset_1 = require("./randomitemset");
/**
 * A random item table.
 */
class RandomItemTable {
    constructor() {
        this.id = 0;
        this.name = '';
        this.sets = [];
    }
    load(stream) {
        this.id = stream.readInt32();
        this.name = stream.readNull();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            const set = new randomitemset_1.default();
            set.load(stream);
            this.sets[i] = set;
        }
    }
    save(stream) {
        stream.writeInt32(this.id);
        stream.writeNull(this.name);
        stream.writeUint32(this.sets.length);
        for (const set of this.sets) {
            set.save(stream);
        }
    }
    getByteLength() {
        let size = 9 + utf8_1.byteLengthUtf8(this.name);
        for (const set of this.sets) {
            size += set.getByteLength();
        }
        return size;
    }
}
exports.default = RandomItemTable;
//# sourceMappingURL=randomitemtable.js.map