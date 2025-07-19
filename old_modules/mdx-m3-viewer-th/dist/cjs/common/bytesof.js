"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesOf = void 0;
const utf8_1 = require("./utf8");
/**
 * Return the given buffer as a Uint8Array.
 *
 * Strings are encoded as UTF8.
 */
function bytesOf(buffer) {
    if (buffer instanceof Uint8Array) {
        return buffer;
    }
    else if (typeof buffer === 'string') {
        return utf8_1.encodeUtf8(buffer);
    }
    else {
        return new Uint8Array(buffer);
    }
}
exports.bytesOf = bytesOf;
//# sourceMappingURL=bytesof.js.map