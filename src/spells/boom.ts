import { Effect, MapPlayer, Trigger, Unit } from 'w3ts';

import boomDeathTrigger from '@spells/boom-death.trigger';

import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function boomSpell() {
  const trigger = Trigger.create();
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId);

  const ability = FourCC('A00R:AHad'); // Slam

  function action(): void {
    const victim = Unit.fromHandle(GetAttackedUnitBJ()) as Unit;
    const attacker = Unit.fromHandle(GetAttacker()) as Unit;
    const level = Number(attacker.getAbilityLevel(ability));

    const effect = Effect.createAttachment(
      VFX.FlameStrike,
      victim,
      'chest'
    ) as Effect;

    victim.setField(UNIT_BF_NEUTRAL_BUILDING_SHOWS_MINIMAP_ICON, false);
    boomDeathTrigger(attacker, victim, level, effect);
  }

  function condition(): boolean {
    const victim = Unit.fromHandle(GetAttackedUnitBJ()) as Unit;
    const attacker = Unit.fromHandle(GetAttacker()) as Unit;

    if (victim?.owner !== enemy) {
      return false;
    }

    if (Number(attacker?.getAbilityLevel(ability)) === 0) {
      return false;
    }

    const isIconActive = victim.getField(
      UNIT_BF_NEUTRAL_BUILDING_SHOWS_MINIMAP_ICON
    ) as boolean;

    if (isIconActive === false) {
      return false;
    }

    return true;
  }

  trigger.addCondition(condition);
  trigger.addAction(action);
  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED);
}
