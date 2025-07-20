import { Leaderboard, Trigger, Unit } from 'w3ts';

import { GAME } from '@constants/game.constants';

export default function updateScoreTrigger(leaderboardLUA: leaderboard) {
  const trigger = Trigger.create();
  const playerScore = [0, 0, 0, 0, 0, 0];

  function action() {
    const killer = Unit.fromHandle(GetKillingUnit()) as Unit;

    playerScore[killer.owner.id] = playerScore[killer.owner.id] + 1;

    LeaderboardSetPlayerItemValueBJ(
      killer.owner.handle,
      leaderboardLUA,
      playerScore[killer.owner.id]
    );
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
