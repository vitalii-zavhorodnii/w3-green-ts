"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modifiedobject_1 = require("./modifiedobject");
/**
 * A modification table.
 */
class ModificationTable {
    constructor() {
        this.objects = [];
    }
    load(stream, useOptionalInts, formatVersion) {
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            const object = new modifiedobject_1.default();
            object.load(stream, useOptionalInts, formatVersion);
            this.objects[i] = object;
        }
    }
    save(stream, useOptionalInts, formatVersion) {
        stream.writeUint32(this.objects.length);
        for (const object of this.objects) {
            object.save(stream, useOptionalInts, formatVersion);
        }
    }
    getByteLength(useOptionalInts, formatVersion) {
        let size = 4;
        for (const object of this.objects) {
            size += object.getByteLength(useOptionalInts, formatVersion);
        }
        return size;
    }
}
exports.default = ModificationTable;
//# sourceMappingURL=modificationtable.js.map