"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = exports.WidgetState = void 0;
const standsequence_1 = require("./standsequence");
var WidgetState;
(function (WidgetState) {
    WidgetState[WidgetState["IDLE"] = 0] = "IDLE";
    WidgetState[WidgetState["WALK"] = 1] = "WALK";
})(WidgetState = exports.WidgetState || (exports.WidgetState = {}));
/**
 * A widget.
 */
class Widget {
    constructor(map, model) {
        this.state = WidgetState.IDLE;
        this.instance = model.addInstance();
        this.instance.setScene(map.worldScene);
    }
    update() {
        if (this.instance.sequenceEnded || this.instance.sequence === -1) {
            if (this.state === WidgetState.IDLE) {
                standsequence_1.default(this.instance);
            }
        }
    }
}
exports.Widget = Widget;
//# sourceMappingURL=widget.js.map