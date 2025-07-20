import { Destructable, MapPlayer, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';

export default function wispsDeocration() {
  const player = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  for (const loc of DECOR.wisps.unitsSpawns) {
    const wisp = Unit.create(
      player,
      FourCC(DECOR.wisps.unitId),
      loc[0],
      loc[1],
      0
    ) as Unit;

    wisp.invulnerable = true;
    wisp.setPathing(false);

    const tree = Destructable.create(
      FourCC(DECOR.wisps.decorId),
      loc[0],
      loc[1],
      1,
      1,
      10
    ) as Destructable;

    wisp.issueTargetOrder(OrderId.Harvest, tree);
  }
}
