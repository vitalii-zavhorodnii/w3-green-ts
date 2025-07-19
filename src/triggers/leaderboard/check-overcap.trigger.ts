import { MapPlayer, Trigger } from 'w3ts';

import runLoss from '@scripts/run-loss';

import { GAME } from '@constants/game.constants';

export default function checkOverCapTrigger(
  cap: number,
  updateSpawnedCount: (value: number) => void
) {
  const trigger = Trigger.create();
  const enemyPlayer = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;
  let loss = false;

  function action() {
    const creepsCount = enemyPlayer?.getState(PLAYER_STATE_RESOURCE_FOOD_USED);

    if (creepsCount > cap) {
      loss = true;

      updateSpawnedCount(creepsCount);
      runLoss();
    }
    if (creepsCount <= cap) {
      updateSpawnedCount(creepsCount);
    }
  }

  function condition() {
    if (loss) {
      return false;
    }

    return true;
  }

  trigger.registerTimerEvent(0.5, true);
  trigger.addCondition(condition);
  trigger.addAction(action);
}
