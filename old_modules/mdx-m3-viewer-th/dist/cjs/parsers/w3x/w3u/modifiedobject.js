"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modification_1 = require("./modification");
/**
 * A modified object.
 */
class ModifiedObject {
    constructor() {
        this.oldId = "\0\0\0\0";
        this.newId = "\0\0\0\0";
        this.sets = 1;
        this.setsFlag = [];
        this.modifications = [];
    }
    load(stream, useOptionalInts, formatVersion) {
        this.oldId = stream.readBinary(4);
        this.newId = stream.readBinary(4);
        if (formatVersion >= 3) {
            this.sets = stream.readUint32();
        }
        for (let set = 0; set < this.sets; set++) {
            if (formatVersion >= 3) {
                this.setsFlag[set] = stream.readUint32();
            }
            for (let i = 0, l = stream.readUint32(); i < l; i++) {
                const modification = new modification_1.default();
                modification.load(stream, useOptionalInts);
                this.modifications[i] = modification;
            }
        }
    }
    save(stream, useOptionalInts, formatVersion) {
        if (this.oldId !== "\0\0\0\0") {
            stream.writeBinary(this.oldId);
        }
        else {
            stream.writeUint32(0);
        }
        if (this.newId !== "\0\0\0\0") {
            stream.writeBinary(this.newId);
        }
        else {
            stream.writeUint32(0);
        }
        if (formatVersion >= 3) {
            stream.writeUint32(this.sets);
        }
        stream.writeUint32(this.modifications.length);
        for (let set = 0; set < this.sets; set++) {
            if (formatVersion >= 3) {
                stream.writeUint32(this.setsFlag[set]);
            }
            for (const modification of this.modifications) {
                modification.save(stream, useOptionalInts);
            }
        }
    }
    getByteLength(useOptionalInts, formatVersion) {
        let size = formatVersion >= 3 ? 16 : 12;
        for (let set = 0; set < this.sets; set++) {
            if (formatVersion >= 3) {
                size += 4;
            }
            for (const modification of this.modifications) {
                size += modification.getByteLength(useOptionalInts);
            }
        }
        return size;
    }
}
exports.default = ModifiedObject;
//# sourceMappingURL=modifiedobject.js.map