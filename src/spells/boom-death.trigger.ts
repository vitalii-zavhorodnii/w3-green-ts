import { Effect, MapPlayer, Trigger, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import createVFX from '@scripts/helpers/create-vfx';
import runTimer from '@scripts/helpers/run-timer';

import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function boomDeathTrigger(
  attacker: Unit,
  victim: Unit,
  level: number,
  effect: Effect
) {
  const trigger = Trigger.create();
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId);
  const dummyId = FourCC(GAME.dummyId);

  const chance = 30;
  const abilityDummy = FourCC('A00S:AHtc'); // Slam (dummy)

  function action() {
    const dummy = Unit.create(
      attacker.owner,
      dummyId,
      victim.x,
      victim.y,
      0
    ) as Unit;

    dummy.setPathing(false);
    dummy.addAbility(abilityDummy);
    dummy.setAbilityLevel(abilityDummy, level);
    dummy.issueImmediateOrder(OrderId.Thunderclap);

    runTimer(() => {
      createVFX(VFX.Explode, dummy.x, dummy.y);
    }, 0.4);
    runTimer(() => {
      dummy.destroy();
    }, 1.5);
  }

  function condition(): boolean {
    effect?.destroy();

    if (victim?.owner !== enemy) {
      return false;
    }

    const random = Math.floor(Math.random() * 100);

    if (random >= chance) {
      return false;
    }

    return true;
  }

  trigger.registerUnitEvent(victim, EVENT_UNIT_DEATH);
  trigger.addCondition(condition);
  trigger.addAction(action);
}
