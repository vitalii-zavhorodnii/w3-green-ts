"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
const randomunit_1 = require("./randomunit");
/**
 * A random unit table.
 */
class RandomUnitTable {
    constructor() {
        this.id = 0;
        this.name = '';
        this.positions = 0;
        this.columnTypes = new Int32Array(0);
        this.units = [];
    }
    load(stream) {
        this.id = stream.readInt32();
        this.name = stream.readNull();
        this.positions = stream.readInt32();
        this.columnTypes = stream.readInt32Array(this.positions);
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            const unit = new randomunit_1.default();
            unit.load(stream, this.positions);
            this.units[i] = unit;
        }
    }
    save(stream) {
        stream.writeInt32(this.id);
        stream.writeNull(this.name);
        stream.writeInt32(this.positions);
        stream.writeInt32Array(this.columnTypes);
        stream.writeUint32(this.units.length);
        for (const unit of this.units) {
            unit.save(stream);
        }
    }
    getByteLength() {
        return 13 + utf8_1.byteLengthUtf8(this.name) + this.columnTypes.byteLength + (this.units.length * (4 + 4 * this.positions));
    }
}
exports.default = RandomUnitTable;
//# sourceMappingURL=randomunittable.js.map