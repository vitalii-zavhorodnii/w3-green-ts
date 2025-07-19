"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringreverse_1 = require("../../common/stringreverse");
const md34_1 = require("./md34");
const modelheader_1 = require("./modelheader");
const sequence_1 = require("./sequence");
const stc_1 = require("./stc");
const stg_1 = require("./stg");
const sts_1 = require("./sts");
const bone_1 = require("./bone");
const division_1 = require("./division");
const region_1 = require("./region");
const batch_1 = require("./batch");
const materialreference_1 = require("./materialreference");
const standardmaterial_1 = require("./standardmaterial");
const layer_1 = require("./layer");
const event_1 = require("./event");
const boundingsphere_1 = require("./boundingsphere");
const attachmentpoint_1 = require("./attachmentpoint");
const camera_1 = require("./camera");
const sd_1 = require("./sd");
const unsupportedentry_1 = require("./unsupportedentry");
// Mapping from entry tags, to their constructors and known version->size values.
const tagMapping = {
    // Objects
    MD34: [md34_1.default, { 11: 24 }],
    MODL: [modelheader_1.default, { 23: 784, 25: 808, 26: 820, 28: 844, 29: 856 }],
    SEQS: [sequence_1.default, { 1: 96, 2: 92 }],
    STC_: [stc_1.default, { 4: 204 }],
    STG_: [stg_1.default, { 0: 24 }],
    STS_: [sts_1.default, { 0: 28 }],
    BONE: [bone_1.default, { 1: 160 }],
    DIV_: [division_1.default, { 2: 52 }],
    REGN: [region_1.default, { 3: 36, 4: 40, 5: 48 }],
    BAT_: [batch_1.default, { 1: 14 }],
    MATM: [materialreference_1.default, { 0: 8 }],
    MAT_: [standardmaterial_1.default, { 15: 268, 16: 280, 17: 280, 18: 280, 19: 340 }],
    LAYR: [layer_1.default, { 22: 356, 24: 436, 25: 468, 26: 464 }],
    EVNT: [event_1.default, { 0: 96, 1: 104, 2: 108 }],
    BNDS: [boundingsphere_1.default, { 0: 28 }],
    ATT_: [attachmentpoint_1.default, { 1: 20 }],
    CAM_: [camera_1.default, { 3: 180, 5: 264 }],
    SDEV: [sd_1.default, { 0: 32 }],
    SDU6: [sd_1.default, { 0: 32 }],
    SDFG: [sd_1.default, { 0: 32 }],
    SDS6: [sd_1.default, { 0: 32 }],
    SDR3: [sd_1.default, { 0: 32 }],
    SD2V: [sd_1.default, { 0: 32 }],
    SD3V: [sd_1.default, { 0: 32 }],
    SD4Q: [sd_1.default, { 0: 32 }],
    SDCC: [sd_1.default, { 0: 32 }],
    SDMB: [sd_1.default, { 0: 32 }],
    FLAG: [sd_1.default, { 0: 32 }],
    // Unsupported entries
    MSEC: [unsupportedentry_1.default, { 1: 72 }],
    LITE: [unsupportedentry_1.default, { 7: 212 }],
    ATVL: [unsupportedentry_1.default, { 0: 116 }],
    PATU: [unsupportedentry_1.default, { 4: 152 }],
    TRGD: [unsupportedentry_1.default, { 0: 24 }],
    DIS_: [unsupportedentry_1.default, { 4: 68 }],
    CMS_: [unsupportedentry_1.default, { 0: 24 }],
    CMP_: [unsupportedentry_1.default, { 2: 28 }],
    TER_: [unsupportedentry_1.default, { 0: 24, 1: 28 }],
    VOL_: [unsupportedentry_1.default, { 0: 84 }],
    VON_: [unsupportedentry_1.default, { 0: 268 }],
    CREP: [unsupportedentry_1.default, { 0: 24, 1: 28 }],
    STBM: [unsupportedentry_1.default, { 0: 48 }],
    LFSB: [unsupportedentry_1.default, { 2: 56 }],
    LFLR: [unsupportedentry_1.default, { 2: 80, 3: 152 }],
    PAR_: [unsupportedentry_1.default, { 12: 1316, 17: 1460, 18: 1464, 19: 1464, 21: 1464, 22: 1484, 23: 1492, 24: 1496 }],
    PARC: [unsupportedentry_1.default, { 0: 40 }],
    PROJ: [unsupportedentry_1.default, { 4: 388, 5: 382 }],
    PHYJ: [unsupportedentry_1.default, { 0: 180 }],
    PHCC: [unsupportedentry_1.default, { 0: 76 }],
    PHAC: [unsupportedentry_1.default, { 0: 32 }],
    PHCL: [unsupportedentry_1.default, { 2: 128 }],
    FOR_: [unsupportedentry_1.default, { 1: 104, 2: 104 }],
    DMSE: [unsupportedentry_1.default, { 0: 4 }],
    PHSH: [unsupportedentry_1.default, { 1: 132, 3: 300 }],
    PHRB: [unsupportedentry_1.default, { 2: 104, 4: 80 }],
    SSGS: [unsupportedentry_1.default, { 1: 108 }],
    BBSC: [unsupportedentry_1.default, { 0: 48 }],
    SRIB: [unsupportedentry_1.default, { 0: 272 }],
    RIB_: [unsupportedentry_1.default, { 6: 748, 8: 756, 9: 760 }],
    IKJT: [unsupportedentry_1.default, { 0: 32 }],
    SHBX: [unsupportedentry_1.default, { 0: 64 }],
    WRP_: [unsupportedentry_1.default, { 1: 132 }],
};
/**
 * An index entry.
 */
class IndexEntry {
    constructor(stream, index) {
        const tag = stringreverse_1.default(stream.readBinary(4));
        const offset = stream.readUint32();
        const entriesCount = stream.readUint32();
        const version = stream.readUint32();
        this.index = index;
        this.tag = tag;
        this.offset = offset;
        this.version = version;
        const mapping = tagMapping[tag];
        const readerOffset = stream.index;
        stream.seek(offset);
        // This is an object
        if (mapping) {
            const constructor = mapping[0];
            const entrySize = mapping[1][version];
            if (!entrySize) {
                // Yey found a new version!
                throw new Error(': Unsupported object version - tag ' + tag + ' and version ' + version);
            }
            this.entries = [];
            for (let i = 0, l = entriesCount; i < l; i++) {
                // A sub stream is given for each object constructor.
                // This allows for parsing to work consistently, even if we don't quite know exactly how the structures look.
                // If some bytes aren't read, the error will not carry to the next object.
                // Since new versions of objects usually add data to the end, this allows the parser to work, even if trying to load newer versions.
                // Of course, the new version size needs to be added to IndexEntry.tagMapping, when finding one.
                if (constructor === unsupportedentry_1.default) {
                    this.entries[i] = new unsupportedentry_1.default(stream.substream(entrySize), version, index);
                }
                else {
                    const entry = new constructor();
                    entry.load(stream.substream(entrySize), version, index);
                    this.entries[i] = entry;
                }
            }
            // This is maybe a typed array?
        }
        else if (tag === 'CHAR' || tag === 'SCHR') {
            this.entries = stream.read(entriesCount);
        }
        else if (tag === 'U8__') {
            this.entries = stream.readUint8Array(entriesCount);
        }
        else if (tag === 'U16_') {
            this.entries = stream.readUint16Array(entriesCount);
        }
        else if (tag === 'U32_') {
            this.entries = stream.readUint32Array(entriesCount);
        }
        else if (tag === 'I16_') {
            this.entries = stream.readInt16Array(entriesCount);
        }
        else if (tag === 'I32_') {
            this.entries = stream.readInt32Array(entriesCount);
        }
        else if (tag === 'REAL') {
            this.entries = stream.readFloat32Array(entriesCount);
        }
        else if (tag === 'VEC2') {
            this.entries = [];
            for (let i = 0; i < entriesCount; i++) {
                this.entries[i] = stream.readFloat32Array(2);
            }
        }
        else if (tag === 'VEC3' || tag === 'SVC3') {
            this.entries = [];
            for (let i = 0; i < entriesCount; i++) {
                this.entries[i] = stream.readFloat32Array(3);
            }
        }
        else if (tag === 'VEC4' || tag === 'QUAT') {
            this.entries = [];
            for (let i = 0; i < entriesCount; i++) {
                this.entries[i] = stream.readFloat32Array(4);
            }
        }
        else if (tag === 'IREF') {
            this.entries = [];
            for (let i = 0; i < entriesCount; i++) {
                this.entries[i] = stream.readFloat32Array(16);
            }
        }
        else {
            this.entries = [];
            throw new Error(': Unsupported object tag - tag ' + tag + ' and version ' + version);
        }
        stream.seek(readerOffset);
    }
}
exports.default = IndexEntry;
//# sourceMappingURL=indexentry.js.map