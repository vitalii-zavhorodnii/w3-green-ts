"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlpImage = exports.CONTENT_JPG = exports.BLP1_MAGIC = void 0;
const bitstream_1 = require("../../common/bitstream");
const bytesof_1 = require("../../common/bytesof");
const convertbitrange_1 = require("../../common/convertbitrange");
const jpg_js_1 = require("./jpg.js");
exports.BLP1_MAGIC = 0x31504c42;
exports.CONTENT_JPG = 0x0;
// const CONTENT_PALLETE = 0x1;
/**
 * A BLP1 image.
 */
class BlpImage {
    constructor() {
        this.content = 0;
        this.alphaBits = 0;
        this.width = 0;
        this.height = 0;
        this.type = 0;
        this.hasMipmaps = false;
        this.mipmapOffsets = new Uint32Array(16);
        this.mipmapSizes = new Uint32Array(16);
        this.uint8array = null;
        /**
         * Used for JPG images.
         */
        this.jpgHeader = null;
        /**
         * Used for indexed images.
         */
        this.pallete = null;
    }
    load(buffer) {
        const bytes = bytesof_1.bytesOf(buffer);
        // This includes the JPG header size, in case its a JPG image.
        // Otherwise, the last element is ignored.
        const header = new Int32Array(bytes.buffer, 0, 40);
        if (header[0] !== exports.BLP1_MAGIC) {
            throw new Error('WrongMagicNumber');
        }
        this.content = header[1];
        this.alphaBits = header[2];
        this.width = header[3];
        this.height = header[4];
        this.type = header[5];
        this.hasMipmaps = header[6] !== 0;
        for (let i = 0; i < 16; i++) {
            this.mipmapOffsets[i] = header[7 + i];
            this.mipmapSizes[i] = header[23 + i];
        }
        this.uint8array = bytes;
        if (this.content === exports.CONTENT_JPG) {
            this.jpgHeader = bytes.subarray(160, 160 + header[39]);
        }
        else {
            this.pallete = bytes.subarray(156, 156 + 1024);
        }
    }
    getMipmap(level) {
        const uint8array = this.uint8array;
        const offset = this.mipmapOffsets[level];
        const size = this.mipmapSizes[level];
        let imageData;
        if (this.content === exports.CONTENT_JPG) {
            const jpgHeader = this.jpgHeader;
            const data = new Uint8Array(jpgHeader.length + size);
            const jpegImage = new jpg_js_1.JpegImage();
            data.set(jpgHeader);
            data.set(uint8array.subarray(offset, offset + size), jpgHeader.length);
            jpegImage.parse(data);
            // The JPG data might not actually match the correct mipmap size.
            imageData = new ImageData(jpegImage.width, jpegImage.height);
            jpegImage.getData(imageData);
        }
        else {
            const pallete = this.pallete;
            const width = Math.max(this.width / (1 << level), 1); // max of 1 because for non-square textures one dimension will eventually be <1.
            const height = Math.max(this.height / (1 << level), 1);
            const size = width * height;
            let alphaBits = this.alphaBits;
            let bitStream;
            let bitsToByte = 0;
            imageData = new ImageData(width, height);
            if (alphaBits > 0) {
                if (alphaBits > 8) {
                    alphaBits = 8;
                }
                bitStream = new bitstream_1.default(uint8array.buffer, offset + size, Math.ceil((size * alphaBits) / 8));
                bitsToByte = convertbitrange_1.default(alphaBits, 8);
            }
            const data = imageData.data;
            for (let i = 0; i < size; i++) {
                const dataIndex = i * 4;
                const paletteIndex = uint8array[offset + i] * 4;
                // BGRA->RGBA
                data[dataIndex] = pallete[paletteIndex + 2];
                data[dataIndex + 1] = pallete[paletteIndex + 1];
                data[dataIndex + 2] = pallete[paletteIndex];
                if (alphaBits > 0) {
                    data[dataIndex + 3] = bitStream.readBits(alphaBits) * bitsToByte;
                }
                else {
                    data[dataIndex + 3] = 255;
                }
            }
        }
        return imageData;
    }
    mipmaps() {
        let mipmaps = 0;
        for (const size of this.mipmapSizes) {
            if (size > 0) {
                mipmaps += 1;
            }
        }
        return mipmaps;
    }
    fakeMipmaps() {
        const offsets = this.mipmapOffsets;
        let mipmaps = 0;
        for (let i = 0; i < 16; i++) {
            const offset = offsets[i];
            if (offset > 0) {
                for (let j = i + 1; j < 16; j++) {
                    if (offset === offsets[j]) {
                        mipmaps += 1;
                        break;
                    }
                }
            }
        }
        return mipmaps;
    }
}
exports.BlpImage = BlpImage;
//# sourceMappingURL=image.js.map