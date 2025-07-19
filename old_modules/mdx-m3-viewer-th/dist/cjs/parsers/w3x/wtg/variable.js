"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A global variable.
 */
class Variable {
    constructor() {
        this.name = '';
        this.type = '';
        this.u1 = 0;
        this.isArray = 0;
        this.arraySize = 0;
        this.isInitialized = 0;
        this.initialValue = '';
    }
    load(stream, version) {
        this.name = stream.readNull();
        this.type = stream.readNull();
        this.u1 = stream.readInt32();
        this.isArray = stream.readInt32();
        if (version === 7) {
            this.arraySize = stream.readInt32();
        }
        this.isInitialized = stream.readInt32();
        this.initialValue = stream.readNull();
    }
    save(stream, version) {
        stream.writeNull(this.name);
        stream.writeNull(this.type);
        stream.writeInt32(this.u1);
        stream.writeInt32(this.isArray);
        if (version === 7) {
            stream.writeInt32(this.arraySize);
        }
        stream.writeInt32(this.isInitialized);
        stream.writeNull(this.initialValue);
    }
    getByteLength(version) {
        let size = 15 + utf8_1.byteLengthUtf8(this.name) + utf8_1.byteLengthUtf8(this.type) + utf8_1.byteLengthUtf8(this.initialValue);
        if (version === 7) {
            size += 4;
        }
        return size;
    }
}
exports.default = Variable;
//# sourceMappingURL=variable.js.map