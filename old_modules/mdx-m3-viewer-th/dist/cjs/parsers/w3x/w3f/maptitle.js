"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A map title.
 */
class MapTitle {
    constructor() {
        this.visible = 0;
        this.chapterTitle = '';
        this.mapTitle = '';
        this.path = '';
    }
    load(stream) {
        this.visible = stream.readInt32();
        this.chapterTitle = stream.readNull();
        this.mapTitle = stream.readNull();
        this.path = stream.readNull();
    }
    save(stream) {
        stream.writeInt32(this.visible);
        stream.writeNull(this.chapterTitle);
        stream.writeNull(this.mapTitle);
        stream.writeNull(this.path);
    }
    getByteLength() {
        return 7 + utf8_1.byteLengthUtf8(this.chapterTitle) + utf8_1.byteLengthUtf8(this.mapTitle) + utf8_1.byteLengthUtf8(this.path);
    }
}
exports.default = MapTitle;
//# sourceMappingURL=maptitle.js.map