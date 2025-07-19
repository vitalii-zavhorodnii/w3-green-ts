import { Trigger, Unit } from 'w3ts';

import { GAME } from '@constants/game.constants';

export default function updateScoreTrigger(callback: (playerId: number) => void) {
  const trigger = Trigger.create();

  function action() {
    const killer = Unit.fromHandle(GetKillingUnit()) as Unit;

    callback(killer.owner.id);
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
