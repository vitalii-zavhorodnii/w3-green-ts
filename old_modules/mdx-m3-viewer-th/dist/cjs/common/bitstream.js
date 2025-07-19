"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bytesof_1 = require("./bytesof");
/**
 * A bit stream.
 */
class BitStream {
    constructor(buffer, byteOffset, byteLength) {
        this.index = 0;
        this.bitBuffer = 0;
        this.bits = 0;
        const bytes = bytesof_1.bytesOf(buffer);
        // For browsers not supporting the spec.
        // Once upon a time I reported this issue on the Firefox tracker.
        // Seems like Safari needs an issue report too.
        byteOffset = byteOffset || 0;
        byteLength = byteLength || bytes.length;
        this.buffer = buffer;
        this.uint8array = bytes.subarray(byteOffset, byteOffset + byteLength);
        this.byteLength = buffer.byteLength;
    }
    /**
     * Peek a number of bits.
     */
    peekBits(bits) {
        this.loadBits(bits);
        return this.bitBuffer & ((1 << bits) - 1);
    }
    /**
     * Read a number of bits.
     */
    readBits(bits) {
        const data = this.peekBits(bits);
        this.bitBuffer >>>= bits;
        this.bits -= bits;
        return data;
    }
    /**
     * Skip a number of bits.
     */
    skipBits(bits) {
        this.loadBits(bits);
        this.bitBuffer >>>= bits;
        this.bits -= bits;
    }
    /**
     * Load more bits into the buffer.
     */
    loadBits(bits) {
        while (this.bits < bits) {
            this.bitBuffer += this.uint8array[this.index] << this.bits;
            this.bits += 8;
            this.index += 1;
        }
    }
}
exports.default = BitStream;
//# sourceMappingURL=bitstream.js.map