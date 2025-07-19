"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A force.
 */
class Force {
    constructor() {
        this.flags = 0;
        this.playerMasks = 0;
        this.name = '';
    }
    load(stream) {
        this.flags = stream.readUint32();
        this.playerMasks = stream.readUint32();
        this.name = stream.readNull();
    }
    save(stream) {
        stream.writeUint32(this.flags);
        stream.writeUint32(this.playerMasks);
        stream.writeNull(this.name);
    }
    getByteLength() {
        return 9 + utf8_1.byteLengthUtf8(this.name);
    }
}
exports.default = Force;
//# sourceMappingURL=force.js.map