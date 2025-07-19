import { MapPlayer, Point, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import runTimer from '@helpers/run-timer';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';

export default function shadeDecoration() {
  const points = DECOR.shade.points;
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  let currentOrder = 1;

  const unit = Unit.create(
    enemy,
    FourCC(DECOR.shade.unit),
    points[0][0],
    points[0][1]
  ) as Unit;
  unit.invulnerable = true;

  runTimer(
    function () {
      const point = Point.create(points[currentOrder][0], points[currentOrder][1]);
      unit.issuePointOrder(OrderId.Move, point);

      if (currentOrder !== points.length - 1) {
        currentOrder++;
      } else {
        currentOrder = 0;
      }
    },
    DECOR.shade.timer,
    true
  );
}
