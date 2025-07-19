"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lstate_1 = require("fengari/src/lstate");
/**
 * A thread.
 */
class Thread {
    constructor(L, data) {
        this.sleep = 0;
        this.L = lstate_1.lua_newthread(L);
        this.expiredTimer = data.expiredTimer || null;
        this.triggerUnit = data.triggerUnit || null;
        this.triggeringTrigger = data.triggeringTrigger || null;
    }
}
exports.default = Thread;
//# sourceMappingURL=thread.js.map