"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTexture = exports.detectMime = exports.isImageSource = void 0;
const math_1 = require("../common/math");
const isformat_1 = require("../common/isformat");
const texture_1 = require("./texture");
/**
 * Checks if the given source is a supported image texture source.
 */
function isImageSource(src) {
    return src instanceof ImageData || src instanceof HTMLImageElement || src instanceof HTMLCanvasElement || src instanceof HTMLVideoElement;
}
exports.isImageSource = isImageSource;
/**
 * Detects whether the given buffer is a supported format, and if so returns the mime.
 * The supported formats are PNG, JPEG, GIF, and WebP.
 */
function detectMime(buffer) {
    if (isformat_1.isPng(buffer)) {
        return 'image/png';
    }
    if (isformat_1.isJpeg(buffer)) {
        return 'image/jpeg';
    }
    if (isformat_1.isGif(buffer)) {
        return 'image/gif';
    }
    if (isformat_1.isWebP(buffer)) {
        return 'image/webp';
    }
    return '';
}
exports.detectMime = detectMime;
/**
 * A texture handler for image sources.
 */
class ImageTexture extends texture_1.default {
    constructor(src, resourceData) {
        super(resourceData);
        const gl = this.viewer.gl;
        this.webglResource = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.webglResource);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        if (math_1.isPowerOfTwo(src.width) && math_1.isPowerOfTwo(src.height)) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            // Required for NPOT textures.
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        this.width = src.width;
        this.height = src.height;
    }
}
exports.ImageTexture = ImageTexture;
//# sourceMappingURL=imagetexture.js.map