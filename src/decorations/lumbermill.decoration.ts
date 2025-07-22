import { Destructable, MapPlayer, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import runTimer from '@helpers/run-timer';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';

export default function lumbermillDecoration() {
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  for (const lumberjack of DECOR.lumbermill.list) {
    const unit = Unit.create(
      enemy,
      FourCC(DECOR.lumbermill.jack),
      lumberjack[0][0],
      lumberjack[0][1]
    ) as Unit;

    unit.invulnerable = true;

    const tree = Destructable.create(
      FourCC(DECOR.lumbermill.tree),
      lumberjack[1][0],
      lumberjack[1][1],
      1,
      1,
      10
    ) as Destructable;

    unit.issueTargetOrder(OrderId.Harvest, tree);

    runTimer(
      function () {
        tree.life = 10000;
      },
      300,
      true
    );
  }
}
