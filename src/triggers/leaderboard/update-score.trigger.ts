import { Trigger, Unit } from 'w3ts';

import rewardPlayer from '@scripts/reward-player';

import { GAME } from '@constants/game.constants';

export default function updateScoreTrigger(leaderboardLUA: leaderboard) {
  const trigger = Trigger.create();
  const playerScore = [0, 0, 0, 0, 0, 0];

  function action(): void {
    const killer = Unit.fromHandle(GetKillingUnit()) as Unit;
    const victim = Unit.fromHandle(GetDyingUnit()) as Unit;

    playerScore[killer.owner.id] = playerScore[killer.owner.id] + 1;

    rewardPlayer(killer.owner, victim, victim.userData);

    LeaderboardSetPlayerItemValueBJ(
      killer.owner.handle,
      leaderboardLUA,
      playerScore[killer.owner.id]
    );
  }

  function condition(): boolean {
    const victim = Unit.fromHandle(GetDyingUnit());

    if (victim && victim.owner.id !== GAME.enemyPlayerId) {
      return false;
    }

    return true;
  }

  trigger.addCondition(condition);
  trigger.addAction(action);
  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH);
}
