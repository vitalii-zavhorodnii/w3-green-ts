"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A Trigger category.
 *
 * Used to scope triggers together in a Folder-like hierarchy.
 */
class TriggerCategory {
    constructor() {
        this.id = 0;
        this.name = '';
        this.isComment = 0;
    }
    load(stream, version) {
        this.id = stream.readInt32();
        this.name = stream.readNull();
        if (version === 7) {
            this.isComment = stream.readInt32();
        }
    }
    save(stream, version) {
        stream.writeInt32(this.id);
        stream.writeNull(this.name);
        if (version === 7) {
            stream.writeInt32(this.isComment);
        }
    }
    getByteLength(version) {
        let size = 5 + utf8_1.byteLengthUtf8(this.name);
        if (version === 7) {
            size += 4;
        }
        return size;
    }
}
exports.default = TriggerCategory;
//# sourceMappingURL=triggercategory.js.map