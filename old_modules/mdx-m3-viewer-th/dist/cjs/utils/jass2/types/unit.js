"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typecast_1 = require("../../../common/typecast");
const widget_1 = require("./widget");
/**
 * type unit
 */
class JassUnit extends widget_1.default {
    constructor(player, unitId, x, y, face) {
        super();
        this.acquireRange = 500;
        this.player = player;
        this.unitId = typecast_1.base256ToString(unitId);
        this.x = x;
        this.y = y;
        this.face = face;
        // if (balanceRow) {
        //   this.balanceRow = balanceRow;
        //   this.health = balanceRow.realHP;
        //   this.maxHealth = this.health;
        //   this.mana = parseFloat(balanceRow.realM) || 0;
        //   this.maxMana = this.mana;
        // } else if (jass.debugMode) {
        //   console.log('Unknown unitid', unitId);
        // }
    }
}
exports.default = JassUnit;
//# sourceMappingURL=unit.js.map