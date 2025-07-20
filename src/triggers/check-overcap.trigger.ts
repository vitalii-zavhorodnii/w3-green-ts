import { MapPlayer, Trigger } from 'w3ts';

import runLoss from '@scripts/run-loss';

import { GAME } from '@constants/game.constants';

export default function checkOverCapTrigger() {
  const trigger = Trigger.create();
  const enemyPlayer = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  let loss = false;
  let creepsCap = 0;

  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
      creepsCap = creepsCap + GAME.capPerPlayer;
    }
  }

  enemyPlayer.setState(PLAYER_STATE_RESOURCE_FOOD_CAP, creepsCap);

  function action() {
    const foodUsed = enemyPlayer.getState(PLAYER_STATE_RESOURCE_FOOD_USED);

    for (let i = 0; i < GAME.maxPlayers; i++) {
      const player = MapPlayer.fromIndex(i) as MapPlayer;

      player.setState(PLAYER_STATE_RESOURCE_FOOD_USED, foodUsed);
      player.setState(PLAYER_STATE_RESOURCE_FOOD_CAP, creepsCap);
    }

    if (foodUsed > creepsCap) {
      loss = true;
      runLoss();
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
