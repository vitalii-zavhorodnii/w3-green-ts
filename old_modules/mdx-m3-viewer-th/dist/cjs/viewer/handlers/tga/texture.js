"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../../../common/math");
const image_1 = require("../../../parsers/tga/image");
const texture_1 = require("../../texture");
/**
 * A TGA texture handler.
 */
class TgaTexture extends texture_1.default {
    constructor(bufferOrImage, resourceData) {
        super(resourceData);
        let image;
        if (bufferOrImage instanceof image_1.default) {
            image = bufferOrImage;
        }
        else {
            image = new image_1.default();
            image.load(bufferOrImage);
        }
        const width = image.width;
        const height = image.height;
        const gl = this.viewer.gl;
        const id = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, id);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image.data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        if (math_1.isPowerOfTwo(width) && math_1.isPowerOfTwo(height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        this.webglResource = id;
        this.width = width;
        this.height = height;
    }
}
exports.default = TgaTexture;
//# sourceMappingURL=texture.js.map