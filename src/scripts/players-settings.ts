import { MapPlayer, Unit } from 'w3ts';

import { selectUnitForPlayer } from '@scripts/helpers/select-unit-for-player';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';

export default function playersSettings() {
  FogEnable(false);
  FogMaskEnable(false);

  const enemyPlayer = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;
  SetPlayerFlagBJ(PLAYER_STATE_GIVES_BOUNTY, true, enemyPlayer.handle);

  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
      player.setState(PLAYER_STATE_RESOURCE_GOLD, GAME.startGold);
      player.setState(PLAYER_STATE_RESOURCE_LUMBER, GAME.startWood);

      const skin = Math.floor(Math.random() * DECOR.summoners.length);
      const unit = Unit.create(
        player,
        FourCC(DECOR.summoners[skin]),
        GAME.spwPointSummoner[i][0],
        GAME.spwPointSummoner[i][1],
        270
      ) as Unit;
      unit.invulnerable = true;

      selectUnitForPlayer(unit, player);
    }
  }
}
