"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DdsImage = exports.FOURCC_ATI2 = exports.FOURCC_DXT5 = exports.FOURCC_DXT3 = exports.FOURCC_DXT1 = exports.DDS_MAGIC = void 0;
const typecast_1 = require("../../common/typecast");
const dxt_1 = require("../../common/dxt");
const bytesof_1 = require("../../common/bytesof");
exports.DDS_MAGIC = 0x20534444;
const DDSD_MIPMAPCOUNT = 0x20000;
const DDPF_FOURCC = 0x4;
exports.FOURCC_DXT1 = 0x31545844;
exports.FOURCC_DXT3 = 0x33545844;
exports.FOURCC_DXT5 = 0x35545844;
exports.FOURCC_ATI2 = 0x32495441;
const FOURCC_DX10 = 0x30315844;
const DXGI_FORMAT_BC1_UNORM = 0x00000047;
const DXGI_FORMAT_BC2_UNORM = 0x0000004A;
const DXGI_FORMAT_BC3_UNORM = 0x0000004D;
const DXGI_FORMAT_BC5_UNORM = 0x00000053;
/**
 * A DDS image.
 */
class DdsImage {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.format = 0;
        this.mipmapWidths = [];
        this.mipmapHeights = [];
        this.mipmapDatas = [];
    }
    load(buffer) {
        const bytes = bytesof_1.bytesOf(buffer);
        const header = new Int32Array(bytes.buffer, 0, 31);
        let offset = 128; // sizeof(DDS_HEADER) + 4 for the magic.
        if (header[0] !== exports.DDS_MAGIC) {
            throw new Error('Wrong magic number');
        }
        if (!(header[20] & DDPF_FOURCC)) {
            throw new Error('Not FourCC');
        }
        let fourCC = header[21];
        if (fourCC !== exports.FOURCC_DXT1 && fourCC !== exports.FOURCC_DXT3 && fourCC !== exports.FOURCC_DXT5 && fourCC !== exports.FOURCC_ATI2) {
            if (fourCC === FOURCC_DX10) {
                offset += 20; // sizeof(DDS_HEADER_DXT10)
                const extendedHeader = new Int32Array(bytes.buffer, 128, 5);
                const dxgiFormat = extendedHeader[0];
                if (dxgiFormat === DXGI_FORMAT_BC1_UNORM) {
                    fourCC = exports.FOURCC_DXT1;
                }
                else if (dxgiFormat === DXGI_FORMAT_BC2_UNORM) {
                    fourCC = exports.FOURCC_DXT3;
                }
                else if (dxgiFormat === DXGI_FORMAT_BC3_UNORM) {
                    fourCC = exports.FOURCC_DXT5;
                }
                else if (dxgiFormat === DXGI_FORMAT_BC5_UNORM) {
                    fourCC = exports.FOURCC_ATI2;
                }
                else {
                    throw new Error(`Unsupported DXGI format: ${dxgiFormat}`);
                }
                console.log(extendedHeader);
            }
            else {
                throw new Error(`Unsupported FourCC: ${typecast_1.base256ToString(fourCC)}`);
            }
        }
        this.format = fourCC;
        let mipmaps = 1;
        if (header[2] & DDSD_MIPMAPCOUNT) {
            mipmaps = Math.max(1, header[7]);
        }
        let width = header[4];
        let height = header[3];
        let blockSize = 16;
        // DXT3, DXT5, and RGTC, all have 16 bytes per block.
        if (fourCC === exports.FOURCC_DXT1) {
            blockSize = 8;
        }
        this.width = width;
        this.height = height;
        for (let i = 0; i < mipmaps; i++) {
            const size = Math.max(4, width) / 4 * Math.max(4, height) / 4 * blockSize;
            this.mipmapWidths[i] = width;
            this.mipmapHeights[i] = height;
            this.mipmapDatas[i] = bytes.subarray(offset, offset + size);
            offset += size;
            width = Math.max(width / 2, 1);
            height = Math.max(height / 2, 1);
        }
    }
    mipmaps() {
        return this.mipmapDatas.length;
    }
    getMipmap(level, raw = false) {
        const width = this.mipmapWidths[level];
        const height = this.mipmapHeights[level];
        const data = this.mipmapDatas[level];
        let mipmap;
        if (raw) {
            mipmap = data;
        }
        else if (this.format === exports.FOURCC_DXT1) {
            mipmap = dxt_1.decodeDxt1(data, width, height);
        }
        else if (this.format === exports.FOURCC_DXT3) {
            mipmap = dxt_1.decodeDxt3(data, width, height);
        }
        else if (this.format === exports.FOURCC_DXT5) {
            mipmap = dxt_1.decodeDxt5(data, width, height);
        }
        else {
            mipmap = dxt_1.decodeRgtc(data, width, height);
        }
        return { width, height, data: mipmap };
    }
}
exports.DdsImage = DdsImage;
//# sourceMappingURL=image.js.map