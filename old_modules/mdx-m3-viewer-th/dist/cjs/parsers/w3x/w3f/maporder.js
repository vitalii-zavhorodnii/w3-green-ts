"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A map order.
 */
class MapOrder {
    constructor() {
        this.u1 = 0;
        this.path = '';
    }
    load(stream) {
        this.u1 = stream.readInt8();
        this.path = stream.readNull();
    }
    save(stream) {
        stream.writeInt8(this.u1);
        stream.writeNull(this.path);
    }
    getByteLength() {
        return 2 + utf8_1.byteLengthUtf8(this.path);
    }
}
exports.default = MapOrder;
//# sourceMappingURL=maporder.js.map