"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searches_1 = require("../../common/searches");
/**
 * Detects if the given object is a TGA source.
 */
function isTga(bytes) {
    if (bytes instanceof ArrayBuffer) {
        bytes = new Uint8Array(bytes);
    }
    if (bytes instanceof Uint8Array && searches_1.isStringInBytes(bytes, 'TRUEVISION-XFILE.\0', bytes.length - 18)) {
        return true;
    }
    return false;
}
exports.default = isTga;
//# sourceMappingURL=isformat.js.map