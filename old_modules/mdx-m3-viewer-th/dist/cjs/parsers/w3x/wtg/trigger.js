"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
const eca_1 = require("./eca");
/**
 * A GUI Trigger.
 */
class Trigger {
    constructor() {
        this.name = '';
        this.description = '';
        this.isComment = 0;
        this.isEnabled = 0;
        this.isCustom = 0;
        this.isInitiallyOff = 0;
        this.runOnInitialization = 0;
        this.category = 0;
        this.ecas = [];
    }
    load(stream, version, triggerData) {
        this.name = stream.readNull();
        this.description = stream.readNull();
        if (version === 7) {
            this.isComment = stream.readInt32();
        }
        this.isEnabled = stream.readInt32();
        this.isCustom = stream.readInt32();
        this.isInitiallyOff = stream.readInt32();
        this.runOnInitialization = stream.readInt32();
        this.category = stream.readInt32();
        for (let i = 0, l = stream.readUint32(); i < l; i++) {
            const eca = new eca_1.default();
            try {
                eca.load(stream, version, false, triggerData);
            }
            catch (e) {
                throw new Error(`Trigger "${this.name}": ECA ${i}: ${e}`);
            }
            this.ecas[i] = eca;
        }
    }
    save(stream, version) {
        stream.writeNull(this.name);
        stream.writeNull(this.description);
        if (version === 7) {
            stream.writeInt32(this.isComment);
        }
        stream.writeInt32(this.isEnabled);
        stream.writeInt32(this.isCustom);
        stream.writeInt32(this.isInitiallyOff);
        stream.writeInt32(this.runOnInitialization);
        stream.writeInt32(this.category);
        stream.writeUint32(this.ecas.length);
        for (const eca of this.ecas) {
            eca.save(stream, version);
        }
    }
    getByteLength(version) {
        let size = 26 + utf8_1.byteLengthUtf8(this.name) + utf8_1.byteLengthUtf8(this.description);
        if (version === 7) {
            size += 4;
        }
        for (const eca of this.ecas) {
            size += eca.getByteLength(version);
        }
        return size;
    }
}
exports.default = Trigger;
//# sourceMappingURL=trigger.js.map