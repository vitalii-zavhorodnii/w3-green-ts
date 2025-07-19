"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A modification.
 */
class Modification {
    constructor() {
        this.id = '\0\0\0\0';
        this.variableType = 0;
        this.levelOrVariation = 0;
        this.dataPointer = 0;
        this.value = 0;
        this.u1 = 0;
    }
    load(stream, useOptionalInts) {
        this.id = stream.readBinary(4);
        this.variableType = stream.readInt32();
        if (useOptionalInts) {
            this.levelOrVariation = stream.readInt32();
            this.dataPointer = stream.readInt32();
        }
        if (this.variableType === 0) {
            this.value = stream.readInt32();
        }
        else if (this.variableType === 1 || this.variableType === 2) {
            this.value = stream.readFloat32();
        }
        else if (this.variableType === 3) {
            this.value = stream.readNull();
        }
        else {
            throw new Error(`Modification: unknown variable type ${this.variableType}`);
        }
        this.u1 = stream.readInt32();
    }
    save(stream, useOptionalInts) {
        stream.writeBinary(this.id);
        stream.writeInt32(this.variableType);
        if (useOptionalInts) {
            stream.writeInt32(this.levelOrVariation);
            stream.writeInt32(this.dataPointer);
        }
        if (this.variableType === 0) {
            stream.writeInt32(this.value);
        }
        else if (this.variableType === 1 || this.variableType === 2) {
            stream.writeFloat32(this.value);
        }
        else if (this.variableType === 3) {
            stream.writeNull(this.value);
        }
        else {
            throw new Error(`Modification: unknown variable type ${this.variableType}`);
        }
        stream.writeInt32(this.u1);
    }
    getByteLength(useOptionalInts) {
        let size = 12;
        if (useOptionalInts) {
            size += 8;
        }
        if (this.variableType === 3) {
            size += utf8_1.byteLengthUtf8(this.value) + 1;
        }
        else {
            size += 4;
        }
        return size;
    }
}
exports.default = Modification;
//# sourceMappingURL=modification.js.map