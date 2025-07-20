import { MapPlayer, Trigger } from 'w3ts';

import runLoss from '@scripts/run-loss';

import { GAME } from '@constants/game.constants';

export default function checkOverCapTrigger() {
  const trigger = Trigger.create();
  const enemyPlayer = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  let isLoss = false;
  let creepsCap = 0;

  enemyPlayer.setState(PLAYER_STATE_RESOURCE_FOOD_CAP, creepsCap);

  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
      creepsCap = creepsCap + GAME.capPerPlayer;

      player.setState(PLAYER_STATE_RESOURCE_FOOD_CAP, creepsCap);
    }
  }

  function action(): void {
    const foodUsed = enemyPlayer.getState(PLAYER_STATE_RESOURCE_FOOD_USED);

    for (let i = 0; i < GAME.maxPlayers; i++) {
      const player = MapPlayer.fromIndex(i) as MapPlayer;

      player.setState(PLAYER_STATE_RESOURCE_FOOD_USED, foodUsed);
      player.setState(PLAYER_STATE_RESOURCE_FOOD_CAP, creepsCap);
    }

    if (foodUsed > creepsCap) {
      isLoss = true;
      runLoss();
    }
  }

  function condition(): boolean {
    if (isLoss) {
      return false;
    }

    return true;
  }

  trigger.addCondition(condition);
  trigger.addAction(action);
  trigger.registerTimerEvent(0.3, true);
}
