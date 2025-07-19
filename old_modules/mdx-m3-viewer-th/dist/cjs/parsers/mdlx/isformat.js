"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMdl = exports.isMdx = void 0;
const searches_1 = require("../../common/searches");
/**
 * Detects if the given object is an MDX source.
 */
function isMdx(bytes) {
    if (bytes instanceof ArrayBuffer) {
        bytes = new Uint8Array(bytes);
    }
    if (bytes instanceof Uint8Array) {
        if (bytes[0] === 0x4d && bytes[1] === 0x44 && bytes[2] === 0x4c && bytes[3] === 0x58) {
            return true;
        }
    }
    if (typeof bytes === 'string' && bytes.startsWith('MDLX')) {
        return true;
    }
    return false;
}
exports.isMdx = isMdx;
/**
 * Detects if the given object is an MDL source.
 */
function isMdl(bytes) {
    if (bytes instanceof ArrayBuffer) {
        bytes = new Uint8Array(bytes);
    }
    // Look for FormatVersion in the first 4KB.
    if (bytes instanceof Uint8Array && searches_1.isStringInBytes(bytes, 'FormatVersion', 0, 4096)) {
        return true;
    }
    // If the source is a string, look for FormatVersion same as above.
    if (typeof bytes === 'string' && searches_1.isStringInString(bytes, 'FormatVersion', 0, 4096)) {
        return true;
    }
    return false;
}
exports.isMdl = isMdl;
//# sourceMappingURL=isformat.js.map