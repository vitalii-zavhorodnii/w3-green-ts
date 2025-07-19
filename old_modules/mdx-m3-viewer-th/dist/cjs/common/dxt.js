"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeRgtc = exports.decodeDxt5 = exports.decodeDxt3 = exports.decodeDxt1 = void 0;
const convertbitrange_1 = require("./convertbitrange");
const dxt4to8 = convertbitrange_1.default(4, 8);
const dxt5to8 = convertbitrange_1.default(5, 8);
const dxt6to8 = convertbitrange_1.default(6, 8);
const dx1colors = new Uint8Array(16);
const dx3colors = new Uint8Array(12);
const dx5alphas = new Uint8Array(8);
const red = new Uint8Array(8);
const green = new Uint8Array(8);
function dx1Colors(out, color0, color1) {
    const r0 = ((color0 >> 11) & 31) * dxt5to8;
    const g0 = ((color0 >> 5) & 63) * dxt6to8;
    const b0 = (color0 & 31) * dxt5to8;
    const r1 = ((color1 >> 11) & 31) * dxt5to8;
    const g1 = ((color1 >> 5) & 63) * dxt6to8;
    const b1 = (color1 & 31) * dxt5to8;
    // Minimum and maximum colors.
    out[0] = r0;
    out[1] = g0;
    out[2] = b0;
    out[3] = 255;
    out[4] = r1;
    out[5] = g1;
    out[6] = b1;
    out[7] = 255;
    // Interpolated colors.
    if (color0 > color1) {
        out[8] = (5 * r0 + 3 * r1) >> 3;
        out[9] = (5 * g0 + 3 * g1) >> 3;
        out[10] = (5 * b0 + 3 * b1) >> 3;
        out[11] = 255;
        out[12] = (5 * r1 + 3 * r0) >> 3;
        out[13] = (5 * g1 + 3 * g0) >> 3;
        out[14] = (5 * b1 + 3 * b0) >> 3;
        out[15] = 255;
    }
    else {
        out[8] = (r0 + r1) >> 1;
        out[9] = (g0 + g1) >> 1;
        out[10] = (b0 + b1) >> 1;
        out[11] = 255;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 0;
    }
}
function dx3Colors(out, color0, color1) {
    const r0 = ((color0 >> 11) & 31) * dxt5to8;
    const g0 = ((color0 >> 5) & 63) * dxt6to8;
    const b0 = (color0 & 31) * dxt5to8;
    const r1 = ((color1 >> 11) & 31) * dxt5to8;
    const g1 = ((color1 >> 5) & 63) * dxt6to8;
    const b1 = (color1 & 31) * dxt5to8;
    // Minimum and maximum colors.
    out[0] = r0;
    out[1] = g0;
    out[2] = b0;
    out[3] = r1;
    out[4] = g1;
    out[5] = b1;
    // Interpolated colors.
    out[6] = (5 * r0 + 3 * r1) >> 3;
    out[7] = (5 * g0 + 3 * g1) >> 3;
    out[8] = (5 * b0 + 3 * b1) >> 3;
    out[9] = (5 * r1 + 3 * r0) >> 3;
    out[10] = (5 * g1 + 3 * g0) >> 3;
    out[11] = (5 * b1 + 3 * b0) >> 3;
}
function dx5Alphas(out, alpha0, alpha1) {
    // Minimum and maximum alphas.
    out[0] = alpha0;
    out[1] = alpha1;
    // Interpolated alphas.
    if (alpha0 > alpha1) {
        out[2] = (54 * alpha0 + 9 * alpha1) >> 6;
        out[3] = (45 * alpha0 + 18 * alpha1) >> 6;
        out[4] = (36 * alpha0 + 27 * alpha1) >> 6;
        out[5] = (27 * alpha0 + 36 * alpha1) >> 6;
        out[6] = (18 * alpha0 + 45 * alpha1) >> 6;
        out[7] = (9 * alpha0 + 54 * alpha1) >> 6;
    }
    else {
        out[2] = (12 * alpha0 + 3 * alpha1) >> 4;
        out[3] = (9 * alpha0 + 6 * alpha1) >> 4;
        out[4] = (6 * alpha0 + 9 * alpha1) >> 4;
        out[5] = (3 * alpha0 + 12 * alpha1) >> 4;
        out[6] = 0;
        out[7] = 255;
    }
}
function rgColors(out, color0, color1) {
    // Minimum and maximum red colors.
    out[0] = color0;
    out[1] = color1;
    // Interpolated red colors.
    if (color0 > color1) {
        out[2] = (6 * color0 + 1 * color1) / 7;
        out[3] = (5 * color0 + 2 * color1) / 7;
        out[4] = (4 * color0 + 3 * color1) / 7;
        out[5] = (3 * color0 + 4 * color1) / 7;
        out[6] = (2 * color0 + 5 * color1) / 7;
        out[7] = (1 * color0 + 6 * color1) / 7;
    }
    else {
        out[2] = (4 * color0 + 1 * color1) / 5;
        out[3] = (3 * color0 + 2 * color1) / 5;
        out[4] = (2 * color0 + 3 * color1) / 5;
        out[5] = (1 * color0 + 4 * color1) / 5;
        out[6] = 0;
        out[7] = 1;
    }
}
/**
 * Decodes DXT1 data to a Uint8Array typed array with 8-8-8-8 RGBA bits.
 *
 * DXT1 is also known as BC1.
 */
function decodeDxt1(src, width, height) {
    const dst = new Uint8Array(width * height * 4);
    for (let blockY = 0, blockHeight = height / 4; blockY < blockHeight; blockY++) {
        for (let blockX = 0, blockWidth = width / 4; blockX < blockWidth; blockX++) {
            const i = 8 * (blockY * blockWidth + blockX);
            // Get the color values.
            dx1Colors(dx1colors, src[i] + 256 * src[i + 1], src[i + 2] + 256 * src[i + 3]);
            // The offset to the first pixel in the destination.
            const dstI = (blockY * 16) * width + blockX * 16;
            // All 32 color bits.
            const bits = src[i + 4] | (src[i + 5] << 8) | (src[i + 6] << 16) | (src[i + 7] << 24);
            for (let row = 0; row < 4; row++) {
                const rowOffset = row * 8;
                const dstOffset = dstI + row * width * 4;
                for (let column = 0; column < 4; column++) {
                    const dstIndex = dstOffset + column * 4;
                    const colorOffset = ((bits >> (rowOffset + column * 2)) & 3) * 4;
                    dst[dstIndex + 0] = dx1colors[colorOffset + 0];
                    dst[dstIndex + 1] = dx1colors[colorOffset + 1];
                    dst[dstIndex + 2] = dx1colors[colorOffset + 2];
                    dst[dstIndex + 3] = dx1colors[colorOffset + 3];
                }
            }
        }
    }
    return dst;
}
exports.decodeDxt1 = decodeDxt1;
/**
 * Decodes DXT3 data to a Uint8Array typed array with 8-8-8-8 RGBA bits.
 *
 * DXT3 is also known as BC2.
 */
function decodeDxt3(src, width, height) {
    const dst = new Uint8Array(width * height * 4);
    const rowBytes = width * 4;
    for (let blockY = 0, blockHeight = height / 4; blockY < blockHeight; blockY++) {
        for (let blockX = 0, blockWidth = width / 4; blockX < blockWidth; blockX++) {
            const i = 16 * (blockY * blockWidth + blockX);
            // Get the color values.
            dx3Colors(dx3colors, src[i + 8] + 256 * src[i + 9], src[i + 10] + 256 * src[i + 11]);
            let dstI = (blockY * 16) * width + blockX * 16;
            for (let row = 0; row < 4; row++) {
                // Get 16 bits of alpha indices.
                const alphaBits = src[i + row * 2] + 256 * src[i + 1 + row * 2];
                // Get 8 bits of color indices.
                const colorBits = src[i + 12 + row];
                for (let column = 0; column < 4; column++) {
                    const dstIndex = dstI + column * 4;
                    const colorIndex = ((colorBits >> (column * 2)) & 3) * 3;
                    dst[dstIndex + 0] = dx3colors[colorIndex + 0];
                    dst[dstIndex + 1] = dx3colors[colorIndex + 1];
                    dst[dstIndex + 2] = dx3colors[colorIndex + 2];
                    dst[dstIndex + 3] = ((alphaBits >> (column * 4)) & 0xf) * dxt4to8;
                }
                dstI += rowBytes;
            }
        }
    }
    return dst;
}
exports.decodeDxt3 = decodeDxt3;
/**
 * Decodes DXT5 data to a Uint8Array typed array with 8-8-8-8 RGBA bits.
 *
 * DXT5 is also known as BC3.
 */
function decodeDxt5(src, width, height) {
    const dst = new Uint8Array(width * height * 4);
    const rowBytes = width * 4;
    for (let blockY = 0, blockHeight = height / 4; blockY < blockHeight; blockY++) {
        for (let blockX = 0, blockWidth = width / 4; blockX < blockWidth; blockX++) {
            const i = 16 * (blockY * blockWidth + blockX);
            // Get the alpha values.
            dx5Alphas(dx5alphas, src[i], src[i + 1]);
            // Get the color values.
            dx3Colors(dx3colors, src[i + 8] + 256 * src[i + 9], src[i + 10] + 256 * src[i + 11]);
            // The offset to the first pixel in the destination.
            let dstI = (blockY * 16) * width + blockX * 16;
            // The outer loop is only needed because JS bitwise operators only work on 32bit integers, while the alpha flags contain 48 bits.
            // Processing is instead done in two blocks, where each one handles 24 bits, or two rows of 4 pixels.
            for (let block = 0; block < 2; block++) {
                const alphaOffset = i + 2 + block * 3;
                const colorOffset = i + 12 + block * 2;
                // 24 alpha bits.
                const alphaBits = src[alphaOffset] + 256 * (src[alphaOffset + 1] + 256 * src[alphaOffset + 2]);
                // Go over two rows.
                for (let row = 0; row < 2; row++) {
                    const colorBits = src[colorOffset + row];
                    // Go over four columns.
                    for (let column = 0; column < 4; column++) {
                        const dstIndex = dstI + column * 4;
                        const colorIndex = ((colorBits >> (column * 2)) & 3) * 3;
                        const alphaIndex = (alphaBits >> (row * 12 + column * 3)) & 7;
                        // Set the pixel.
                        dst[dstIndex + 0] = dx3colors[colorIndex + 0];
                        dst[dstIndex + 1] = dx3colors[colorIndex + 1];
                        dst[dstIndex + 2] = dx3colors[colorIndex + 2];
                        dst[dstIndex + 3] = dx5alphas[alphaIndex];
                    }
                    // Next row.
                    dstI += rowBytes;
                }
            }
        }
    }
    return dst;
}
exports.decodeDxt5 = decodeDxt5;
/**
 * Decodes RGTC data to a Uint8Array typed array with 8-8 RG bits.
 *
 * RGTC is also known as BC5, ATI2, and 3Dc.
 */
function decodeRgtc(src, width, height) {
    const dst = new Uint8Array(width * height * 2);
    const rowBytes = width * 2;
    for (let blockY = 0, blockHeight = height / 4; blockY < blockHeight; blockY++) {
        for (let blockX = 0, blockWidth = width / 4; blockX < blockWidth; blockX++) {
            const i = 16 * (blockY * blockWidth + blockX);
            // Get the red colors.
            rgColors(red, src[i], src[i + 1]);
            // Get the green colors.
            rgColors(green, src[i + 8], src[i + 9]);
            // The offset to the first pixel in the destination.
            let dstI = (blockY * 8) * width + blockX * 8;
            // Split to two blocks of two rows, because there are 48 color bits.
            for (let block = 0; block < 2; block++) {
                const blockOffset = i + block * 3;
                // Get 24 bits of the color indices.
                const redbits = src[blockOffset + 2] + 256 * (src[blockOffset + 3] + 256 * src[blockOffset + 4]);
                const greenbits = src[blockOffset + 10] + 256 * (src[blockOffset + 11] + 256 * src[blockOffset + 12]);
                for (let row = 0; row < 2; row++) {
                    const rowOffset = row * 4;
                    for (let column = 0; column < 4; column++) {
                        const dstOffset = dstI + column * 2;
                        const shifts = 3 * (rowOffset + column);
                        dst[dstOffset + 1] = red[(redbits >> shifts) & 7];
                        dst[dstOffset + 2] = green[(greenbits >> shifts) & 7];
                    }
                    // Next row.
                    dstI += rowBytes;
                }
            }
        }
    }
    return dst;
}
exports.decodeRgtc = decodeRgtc;
//# sourceMappingURL=dxt.js.map