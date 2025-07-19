"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binarystream_1 = require("../../../common/binarystream");
const corner_1 = require("./corner");
/**
 * war3map.w3e - the environment file.
 */
class War3MapW3e {
    constructor() {
        this.version = 0;
        this.tileset = 'A';
        this.haveCustomTileset = 0;
        this.groundTilesets = [];
        this.cliffTilesets = [];
        this.mapSize = new Int32Array(2);
        this.centerOffset = new Float32Array(2);
        this.corners = [];
    }
    load(buffer) {
        const stream = new binarystream_1.default(buffer);
        if (stream.readBinary(4) !== 'W3E!') {
            return;
        }
        this.version = stream.readInt32();
        this.tileset = stream.readBinary(1);
        this.haveCustomTileset = stream.readInt32();
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            this.groundTilesets[i] = stream.readBinary(4);
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            this.cliffTilesets[i] = stream.readBinary(4);
        }
        stream.readInt32Array(this.mapSize);
        stream.readFloat32Array(this.centerOffset);
        for (let row = 0, rows = this.mapSize[1]; row < rows; row++) {
            this.corners[row] = [];
            for (let column = 0, columns = this.mapSize[0]; column < columns; column++) {
                const corner = new corner_1.default();
                corner.load(stream);
                this.corners[row][column] = corner;
            }
        }
    }
    save() {
        const stream = new binarystream_1.default(new ArrayBuffer(this.getByteLength()));
        stream.writeBinary('W3E!');
        stream.writeInt32(this.version);
        stream.writeBinary(this.tileset);
        stream.writeInt32(this.haveCustomTileset);
        stream.writeUint32(this.groundTilesets.length);
        for (const groundTileset of this.groundTilesets) {
            stream.writeBinary(groundTileset);
        }
        stream.writeUint32(this.cliffTilesets.length);
        for (const cliffTileset of this.cliffTilesets) {
            stream.writeBinary(cliffTileset);
        }
        stream.writeInt32Array(this.mapSize);
        stream.writeFloat32Array(this.centerOffset);
        for (const row of this.corners) {
            for (const corner of row) {
                corner.save(stream);
            }
        }
        return stream.uint8array;
    }
    getByteLength() {
        return 37 + (this.groundTilesets.length * 4) + (this.cliffTilesets.length * 4) + (this.mapSize[0] * this.mapSize[1] * 7);
    }
}
exports.default = War3MapW3e;
//# sourceMappingURL=file.js.map