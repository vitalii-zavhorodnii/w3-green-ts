import { Item, Trigger, Unit } from 'w3ts';

import createVFX from '@helpers/create-vfx';

import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function creepLootTrigger() {
  const trigger = Trigger.create();
  const chance = 1;

  function action() {
    const random = Math.floor(Math.random() * 100);

    if (random <= chance) {
      const unit = Unit.fromEvent() as Unit;

      const randomItem = Math.floor(Math.random() * 2);
      Item.create(FourCC(GAME.lootTable[randomItem]), unit.x, unit.y);

      createVFX(VFX.Resource, unit.x, unit.y);
    }
  }

  function condition() {
    const victim = Unit.fromHandle(GetDyingUnit());

    if (victim && victim.owner.id !== GAME.enemyPlayerId) {
      return false;
    }

    return true;
  }

  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH);
  trigger.addCondition(condition);
  trigger.addAction(action);
}
