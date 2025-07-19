"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binarystream_1 = require("../../../common/binarystream");
const maptitle_1 = require("./maptitle");
const maporder_1 = require("./maporder");
const utf8_1 = require("../../../common/utf8");
/**
 * war3campaign.w3f - the campaign information file.
 */
class War3CampaignW3f {
    constructor() {
        this.version = 0;
        this.campaignVersion = 0;
        this.editorVersion = 0;
        this.name = '';
        this.difficulty = '';
        this.author = '';
        this.description = '';
        this.mode = -1; // 0: fixed difficulty, only w3m maps, 1: variable difficulty, only w3m maps, 1: fixed..., contains w3x maps, 2: variable..., contains w3xm maps.
        this.backgroundScreen = -1; // -1 = none or custom path
        this.backgroundScreenPath = '';
        this.minimapImagePath = '';
        this.ambientSound = 0; // -1 = imported, 0 = none, >0 = preset index
        this.ambientSoundPath = '';
        this.terrainFog = 0; // 0 = not used, >0 = index of terrain fog style
        this.fogStartZ = 0;
        this.fogEndZ = 0;
        this.fogDensity = 0;
        this.fogColor = new Uint8Array(4);
        this.userInterface = -1; // 0 = human
        this.mapTitles = [];
        this.mapOrders = [];
    }
    load(buffer) {
        const stream = new binarystream_1.default(buffer);
        this.version = stream.readInt32();
        this.campaignVersion = stream.readInt32();
        this.editorVersion = stream.readInt32();
        this.name = stream.readNull();
        this.difficulty = stream.readNull();
        this.author = stream.readNull();
        this.description = stream.readNull();
        this.mode = stream.readInt32();
        this.backgroundScreen = stream.readInt32();
        this.backgroundScreenPath = stream.readNull();
        this.minimapImagePath = stream.readNull();
        this.ambientSound = stream.readInt32();
        this.ambientSoundPath = stream.readNull();
        this.terrainFog = stream.readInt32();
        this.fogStartZ = stream.readFloat32();
        this.fogEndZ = stream.readFloat32();
        this.fogDensity = stream.readFloat32();
        stream.readUint8Array(this.fogColor);
        this.userInterface = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            const mapTitle = new maptitle_1.default();
            mapTitle.load(stream);
            this.mapTitles[i] = mapTitle;
        }
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            const mapOrder = new maporder_1.default();
            mapOrder.load(stream);
            this.mapOrders[i] = mapOrder;
        }
    }
    save() {
        const stream = new binarystream_1.default(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        stream.writeInt32(this.campaignVersion);
        stream.writeInt32(this.editorVersion);
        stream.writeNull(this.name);
        stream.writeNull(this.difficulty);
        stream.writeNull(this.author);
        stream.writeNull(this.description);
        stream.writeInt32(this.mode);
        stream.writeInt32(this.backgroundScreen);
        stream.writeNull(this.backgroundScreenPath);
        stream.writeNull(this.minimapImagePath);
        stream.writeInt32(this.ambientSound);
        stream.writeNull(this.ambientSoundPath);
        stream.writeInt32(this.terrainFog);
        stream.writeFloat32(this.fogStartZ);
        stream.writeFloat32(this.fogEndZ);
        stream.writeFloat32(this.fogDensity);
        stream.writeUint8Array(this.fogColor);
        stream.writeInt32(this.userInterface);
        stream.writeUint32(this.mapTitles.length);
        for (const title of this.mapTitles) {
            title.save(stream);
        }
        stream.writeUint32(this.mapOrders.length);
        for (const order of this.mapOrders) {
            order.save(stream);
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 63 + utf8_1.byteLengthUtf8(this.name) + utf8_1.byteLengthUtf8(this.difficulty) + utf8_1.byteLengthUtf8(this.author) + utf8_1.byteLengthUtf8(this.description) + utf8_1.byteLengthUtf8(this.backgroundScreenPath) + utf8_1.byteLengthUtf8(this.minimapImagePath) + utf8_1.byteLengthUtf8(this.ambientSoundPath);
        for (const title of this.mapTitles) {
            size += title.getByteLength();
        }
        for (const order of this.mapOrders) {
            size += order.getByteLength();
        }
        return size;
    }
}
exports.default = War3CampaignW3f;
//# sourceMappingURL=file.js.map