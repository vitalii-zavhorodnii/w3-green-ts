import { Group, MapPlayer, Point, Rectangle, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import createVFX from '@helpers/create-vfx';
import runTimer from '@helpers/run-timer';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function treantDecoration() {
  const player = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  const treeId = FourCC(DECOR.treant.tree);
  const rect = Rectangle.create(
    DECOR.treant.rect[0][0],
    DECOR.treant.rect[0][1],
    DECOR.treant.rect[1][0],
    DECOR.treant.rect[1][1]
  ) as Rectangle;

  const unit = Unit.create(
    player,
    treeId,
    DECOR.treant.treePos[0],
    DECOR.treant.treePos[1],
    DECOR.treant.treeAngle
  ) as Unit;

  unit.invulnerable = true;
  unit.queueAnimation(DECOR.treant.animation);

  // Pick all wisps and detonate
  runTimer(
    function () {
      const group = Group.fromHandle(GetUnitsInRectAll(rect.handle)) as Group;
      const point = Point.create(
        DECOR.treant.wispOrder[0],
        DECOR.treant.wispOrder[1]
      ) as Point;

      group.orderPoint(OrderId.Detonate, point);

      createVFX(
        DECOR.treant.effect,
        DECOR.treant.effectPos[0],
        DECOR.treant.effectPos[1],
        DECOR.treant.effectTimer
      );

      group.destroy();
      point.destroy();
    },
    DECOR.treant.effectTimer,
    true
  );

  runTimer(
    function () {
      const wisp = Unit.create(
        player,
        FourCC(DECOR.treant.wisp),
        DECOR.treant.wispPos[0],
        DECOR.treant.wispPos[1]
      ) as Unit;

      createVFX(VFX.DarkRitual, wisp.x, wisp.y);
      wisp.invulnerable = true;

      const point = Point.create(
        DECOR.treant.wispOrder[0],
        DECOR.treant.wispOrder[1]
      );
      wisp.issuePointOrder(OrderId.Move, point);

      point.destroy();
    },
    DECOR.treant.wispTimer,
    true
  );
}
