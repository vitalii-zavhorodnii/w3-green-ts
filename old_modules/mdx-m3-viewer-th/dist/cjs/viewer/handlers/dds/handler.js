"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("../../../parsers/dds/image");
const isformat_1 = require("../../../parsers/dds/isformat");
const texture_1 = require("./texture");
exports.default = {
    load(viewer) {
        const webgl = viewer.webgl;
        // Optionally used when decoding mipmaps.
        if (!webgl.ensureExtension('WEBGL_compressed_texture_s3tc')) {
            console.warn('DDS: No compressed textures support! This might reduce performance.');
        }
    },
    isValidSource(object) {
        if (object instanceof image_1.DdsImage) {
            return true;
        }
        return isformat_1.default(object);
    },
    resource: texture_1.default,
};
//# sourceMappingURL=handler.js.map