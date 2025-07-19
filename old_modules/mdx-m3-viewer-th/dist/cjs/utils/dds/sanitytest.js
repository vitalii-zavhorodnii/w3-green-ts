"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../../common/math");
/**
 * Tests for issues in DDS textures.
 */
function sanityTest(texture) {
    const nodes = [];
    const width = texture.width;
    const height = texture.height;
    const mipmaps = texture.mipmaps();
    const expectedMipmaps = Math.log2(Math.max(width, height));
    if (mipmaps < expectedMipmaps) {
        nodes.push({ type: 'warning', message: `Expected ${expectedMipmaps} mipmaps, but got ${mipmaps}` });
    }
    if ((width % 4 !== 0) || (height % 4 !== 0)) {
        nodes.push({ type: 'warning', message: `Expected the width and height to be multiples of four, but got ${width}x${height}` });
    }
    if (!math_1.isPowerOfTwo(width) || !math_1.isPowerOfTwo(height)) {
        nodes.push({ type: 'warning', message: `Expected the width and height to be powers of two, but got ${width}x${height}` });
    }
    for (let i = 0; i < mipmaps; i++) {
        try {
            texture.getMipmap(i);
        }
        catch (e) {
            nodes.push({ type: 'warning', message: `Mipmap ${i}: Decoding failed` });
        }
    }
    return { nodes, warnings: nodes.length };
}
exports.default = sanityTest;
//# sourceMappingURL=sanitytest.js.map