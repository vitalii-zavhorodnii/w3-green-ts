import { MapPlayer, Trigger, Unit } from 'w3ts';

import createVFX from '@helpers/create-vfx';

import { TOWERS } from '@constants/towers.constants';
import { VFX } from '@constants/vfx.constants';

export default function autoUpgradeTrigger() {
  const trigger = Trigger.create();

  function action(): void {
    const unit = Unit.fromHandle(GetTriggerUnit());
    const player = MapPlayer.fromEvent();

    if (unit && player) {
      const level = unit.getField(UNIT_IF_GOLD_BOUNTY_AWARDED_BASE) as number;
      const type = Number(unit.getField(UNIT_RF_DEATH_TIME));

      unit.invulnerable = true;

      createVFX(VFX.HolyBolt, unit.x, unit.y);

      for (const tower of TOWERS) {
        if (type === tower.type) {
          for (const spell of tower.spells) {
            const spellId = FourCC(spell);

            unit.setAbilityLevel(spellId, level);
          }
        }
      }
    }
  }

  trigger.addAction(action);
  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_UPGRADE_FINISH);
}
