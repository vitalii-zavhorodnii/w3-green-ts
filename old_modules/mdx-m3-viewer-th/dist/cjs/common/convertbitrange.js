"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a number, which when multiplied with a number of fromBits bits, will convert it to a toBits bits number.
 *
 * For example, 7 * convertBitRange(3, 8) == 255.
 *
 * In other words, if we look at the bits, 111 is the same to 3 bits as 11111111 is to 8 bits.
 */
function convertBitRange(fromBits, toBits) {
    return ((1 << toBits) - 1) / ((1 << fromBits) - 1);
}
exports.default = convertBitRange;
//# sourceMappingURL=convertbitrange.js.map