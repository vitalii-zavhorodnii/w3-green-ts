"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
const parameter_1 = require("./parameter");
/**
 * A function call in an expression.
 */
class SubParameters {
    constructor() {
        this.type = 0;
        this.name = '';
        this.beginParameters = 0;
        this.parameters = [];
    }
    load(stream, version, triggerData) {
        this.type = stream.readInt32();
        if (this.type < 0 || this.type > 3) {
            throw new Error(`SubParameters: Bad type: ${this.type}`);
        }
        this.name = stream.readNull();
        if (this.name.length === 0) {
            throw new Error(`SubParameters: Empty name`);
        }
        this.beginParameters = stream.readInt32();
        if (this.beginParameters) {
            const signature = triggerData.getFunction(this.type, this.name);
            if (!signature) {
                throw new Error(`SubParameters "${this.name}:${this.type}": Unknown signature`);
            }
            const args = signature.args;
            for (let i = 0, l = args.length; i < l; i++) {
                const parameter = new parameter_1.default();
                try {
                    parameter.load(stream, version, triggerData);
                }
                catch (e) {
                    throw new Error(`SubParameters "${this.name}": Parameter ${i}: ${e}`);
                }
                this.parameters[i] = parameter;
            }
        }
    }
    save(stream, version) {
        stream.writeInt32(this.type);
        stream.writeNull(this.name);
        stream.writeInt32(this.beginParameters);
        for (const parameter of this.parameters) {
            parameter.save(stream, version);
        }
    }
    getByteLength(version) {
        let size = 9 + utf8_1.byteLengthUtf8(this.name);
        if (this.parameters.length) {
            for (const parameter of this.parameters) {
                size += parameter.getByteLength(version);
            }
        }
        return size;
    }
}
exports.default = SubParameters;
//# sourceMappingURL=subparameters.js.map