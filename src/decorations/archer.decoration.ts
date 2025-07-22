import { MapPlayer, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import runTimer from '@helpers/run-timer';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';

export default function archerDecoration() {
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;
  const neutral = MapPlayer.fromIndex(24) as MapPlayer;

  const dummy = Unit.create(
    neutral,
    FourCC(DECOR.camp.dummy),
    DECOR.camp.dummyPos[0],
    DECOR.camp.dummyPos[1],
    DECOR.camp.dummyAngle
  ) as Unit;

  const archer = Unit.create(
    enemy,
    FourCC(DECOR.camp.archer),
    DECOR.camp.archerPos[0],
    DECOR.camp.archerPos[1],
    DECOR.camp.archerAngle
  ) as Unit;

  archer.invulnerable = true;
  archer.issueTargetOrder(OrderId.Attack, dummy);
  
  runTimer(
    function () {
      archer.issueImmediateOrder(OrderId.Berserk);
      archer.issueTargetOrder(OrderId.Attack, dummy);
    },
    25,
    true
  );
}
