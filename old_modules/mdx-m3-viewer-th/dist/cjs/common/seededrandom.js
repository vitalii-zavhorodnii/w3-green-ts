"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return a function that works in the same exact way as Math.random(), but with the given seed.
 * See http://indiegamr.com/generate-repeatable-random-numbers-in-js/
 */
function seededRandom(seed) {
    return () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}
exports.default = seededRandom;
//# sourceMappingURL=seededrandom.js.map