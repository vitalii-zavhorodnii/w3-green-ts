"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * An import.
 */
class Import {
    constructor() {
        this.isCustom = 0;
        this.path = '';
    }
    load(stream) {
        this.isCustom = stream.readUint8();
        this.path = stream.readNull();
    }
    save(stream) {
        stream.writeUint8(this.isCustom);
        stream.writeNull(this.path);
    }
    getByteLength() {
        return 2 + utf8_1.byteLengthUtf8(this.path);
    }
}
exports.default = Import;
//# sourceMappingURL=import.js.map