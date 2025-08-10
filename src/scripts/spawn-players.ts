import { MapPlayer, Rectangle, Region, Unit } from 'w3ts';

import { selectUnitForPlayer } from '@helpers/select-unit-for-player';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';

export default function spawnPlayers() {
  FogEnable(false);
  FogMaskEnable(false);

  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    // const rectangle = Rectangle.create(
    //   GAME.buildFields[player.id].rect[0][0],
    //   GAME.buildFields[player.id].rect[0][1],
    //   GAME.buildFields[player.id].rect[1][0],
    //   GAME.buildFields[player.id].rect[1][1]
    // ) as Rectangle;

    // const region = Region.create();
    // region.addRect(rectangle);

    // if (gg_game_Difficulty === 'CLASSIC') {
    //   SetTerrainTypeBJ(
    //     GetRectCenter(rectangle.handle) as location,
    //     FourCC('Xblm'),
    //     -1,
    //     3,
    //     1
    //   );

    //   SetTerrainPathableBJ(
    //     GetRectCenter(rectangle.handle) as location,
    //     PATHING_TYPE_BUILDABILITY,
    //     true
    //   );
    // } else if (gg_game_Difficulty === 'HARD') {
    //   SetTerrainTypeBJ(
    //     GetRectCenter(rectangle.handle) as location,
    //     FourCC('Xblm'),
    //     -1,
    //     2,
    //     0
    //   );
    // }

    // rectangle.destroy();
    // region.destroy();

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
