"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../../../common/math");
const image_1 = require("../../../parsers/blp/image");
const texture_1 = require("../../texture");
/**
 * A BLP texure handler.
 */
class BlpTexture extends texture_1.default {
    constructor(bufferOrImage, resourceData) {
        super(resourceData);
        let image;
        if (bufferOrImage instanceof image_1.BlpImage) {
            image = bufferOrImage;
        }
        else {
            image = new image_1.BlpImage();
            image.load(bufferOrImage);
        }
        const viewer = this.viewer;
        const gl = viewer.gl;
        const id = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, id);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        const isPOT = math_1.isPowerOfTwo(image.width) && math_1.isPowerOfTwo(image.height);
        if (!isPOT) {
            // Required for NPOT textures.
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        const mipmaps = image.mipmaps();
        // If there is one mipmap, or fake mipmaps, or it's an NPOT image, use just the first mipmap. Otherwise load all of them.
        if (mipmaps === 1 || image.fakeMipmaps() || !isPOT) {
            const imageData = image.getMipmap(0);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageData);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            let width = image.width;
            let height = image.height;
            for (let i = 0; i < mipmaps; i++) {
                const imageData = image.getMipmap(i);
                // Don't use the image data dimensions directly.
                // Some JPG mipmaps out there have wrong sizes.
                // For example the last two mipmaps being 2x1, which messes with GL.
                gl.texImage2D(gl.TEXTURE_2D, i, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, imageData.data);
                width = Math.ceil(width / 2);
                height = Math.ceil(height / 2);
            }
        }
        this.width = image.width;
        this.height = image.height;
        this.webglResource = id;
    }
}
exports.default = BlpTexture;
//# sourceMappingURL=texture.js.map