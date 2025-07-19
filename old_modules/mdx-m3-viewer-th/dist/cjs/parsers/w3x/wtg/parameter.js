"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
const subparameters_1 = require("./subparameters");
/**
 * A function parameter. Can be a function itself, in which case it will have a SubParameters structure.
 */
class Parameter {
    constructor() {
        this.type = 0;
        this.value = '';
        this.subParameters = null;
        this.u1 = 0;
        this.isArray = 0;
        this.arrayIndex = null;
    }
    load(stream, version, triggerData) {
        this.type = stream.readInt32();
        if (this.type < -1 || this.type > 3) {
            throw new Error(`Parameter: Bad type: ${this.type}`);
        }
        this.value = stream.readNull();
        if (stream.readInt32()) {
            const subParameters = new subparameters_1.default();
            try {
                subParameters.load(stream, version, triggerData);
            }
            catch (e) {
                throw new Error(`Parameter "${this.value}": SubParameters ${e}`);
            }
            this.subParameters = subParameters;
        }
        if ((version === 4 && this.type === 2) || (version === 7 && this.subParameters)) {
            this.u1 = stream.readInt32();
        }
        if ((version === 4 && this.type !== 2) || version === 7) {
            this.isArray = stream.readInt32();
        }
        if (this.isArray) {
            const arrayIndex = new Parameter();
            try {
                arrayIndex.load(stream, version, triggerData);
            }
            catch (e) {
                throw new Error(`Parameter "${this.value}": ArrayIndex: ${e}`);
            }
            this.arrayIndex = arrayIndex;
        }
    }
    save(stream, version) {
        stream.writeInt32(this.type);
        stream.writeNull(this.value);
        if (this.subParameters) {
            stream.writeInt32(1);
            this.subParameters.save(stream, version);
        }
        else {
            stream.writeInt32(0);
        }
        if ((version === 4 && this.type === 2) || (version === 7 && this.subParameters)) {
            stream.writeInt32(this.u1);
        }
        if ((version === 4 && this.type !== 2) || version === 7) {
            stream.writeInt32(this.isArray);
        }
        if (this.isArray && this.arrayIndex) {
            this.arrayIndex.save(stream, version);
        }
    }
    getByteLength(version) {
        let size = 9 + utf8_1.byteLengthUtf8(this.value);
        if (this.subParameters) {
            size += this.subParameters.getByteLength(version);
        }
        if ((version === 4 && this.type === 2) || (version === 7 && this.subParameters)) {
            size += 4;
        }
        if ((version === 4 && this.type !== 2) || version === 7) {
            size += 4;
        }
        if (this.isArray && this.arrayIndex) {
            size += this.arrayIndex.getByteLength(version);
        }
        return size;
    }
}
exports.default = Parameter;
//# sourceMappingURL=parameter.js.map