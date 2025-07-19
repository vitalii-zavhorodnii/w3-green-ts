"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tga_js_1 = require("tga-js");
const bytesof_1 = require("../../common/bytesof");
/**
 * A TGA image.
 */
class TgaImage {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.data = null;
    }
    load(buffer) {
        const bytes = bytesof_1.bytesOf(buffer);
        const tga = new tga_js_1.default();
        tga.load(bytes);
        const header = tga.header;
        this.width = header.width;
        this.height = header.height;
        this.data = new ImageData(header.width, header.height);
        tga.getImageData(this.data);
    }
}
exports.default = TgaImage;
//# sourceMappingURL=image.js.map