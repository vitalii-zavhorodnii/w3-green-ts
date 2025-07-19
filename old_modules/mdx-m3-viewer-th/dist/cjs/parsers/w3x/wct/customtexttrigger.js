"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A custom text trigger.
 */
class CustomTextTrigger {
    constructor() {
        this.text = '';
    }
    load(stream) {
        const textLength = stream.readInt32();
        if (textLength) {
            this.text = stream.read(textLength - 1);
            stream.skip(1);
        }
    }
    save(stream) {
        if (this.text.length) {
            stream.writeInt32(utf8_1.byteLengthUtf8(this.text) + 1);
            stream.write(this.text);
            stream.skip(1);
        }
        else {
            stream.writeInt32(0);
        }
    }
    getByteLength() {
        let size = 4;
        if (this.text.length) {
            size += utf8_1.byteLengthUtf8(this.text) + 1;
        }
        return size;
    }
}
exports.default = CustomTextTrigger;
//# sourceMappingURL=customtexttrigger.js.map