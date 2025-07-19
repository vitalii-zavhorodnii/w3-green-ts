"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringreverse_1 = require("../../common/stringreverse");
const reference_1 = require("./reference");
/**
 * The M3 header.
 */
class Md34 {
    constructor() {
        this.version = -1;
        this.tag = '';
        this.offset = 0;
        this.entries = 0;
        this.model = new reference_1.default();
    }
    load(stream, version, index) {
        this.version = version;
        this.tag = stringreverse_1.default(stream.readBinary(4));
        this.offset = stream.readUint32();
        this.entries = stream.readUint32();
        this.model.load(stream, index);
    }
}
exports.default = Md34;
//# sourceMappingURL=md34.js.map