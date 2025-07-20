import { MapPlayer, Point, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import runTimer from '@scripts/helpers/run-timer';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';

export default function felguardDecoration() {
  const player = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;
  const point = Point.create(
    DECOR.felguard.waypoints[0][0],
    DECOR.felguard.waypoints[0][1]
  );

  let isReverse = false;
  let order = 0;

  const unit = Unit.create(
    player,
    FourCC(DECOR.felguard.unit),
    DECOR.felguard.unitPos[0],
    DECOR.felguard.unitPos[1]
  ) as Unit;

  unit.invulnerable = true;
  unit.issueOrderAt(OrderId.Move, point.x, point.y);

  function updatePoint() {
    if (isReverse) {
      order--;
    } else {
      order++;
    }

    point.x = DECOR.felguard.waypoints[order][0];
    point.y = DECOR.felguard.waypoints[order][1];

    unit.issueOrderAt(OrderId.Move, point.x, point.y);
  }

  runTimer(
    function () {
      if (unit.inRangeOfPoint(point, 50)) {
        if (order === DECOR.felguard.waypoints.length - 1) {
          isReverse = true;
        } else if (order === 0) {
          isReverse = false;
        }

        updatePoint();
      }
    },
    1,
    true
  );
}
