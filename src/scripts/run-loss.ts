import { MapPlayer, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import createVFX from '@helpers/create-vfx';
import randomize from '@helpers/randomize';
import runTimer from '@helpers/run-timer';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function runLoss() {
  const enemyPlayer = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  QuestMessageBJ(
    GetPlayersAll() as force,
    bj_QUESTMESSAGE_WARNING,
    '|cffff0000You lost this fight!|r'
  );

  const mapLUA = GetPlayableMapRect() as rect;
  const groupLUA = GetUnitsInRectAll(mapLUA) as group;
  ForGroupBJ(groupLUA, () => {
    const unit = Unit.fromEnum() as Unit;

    if (unit.isUnitType(UNIT_TYPE_PEON)) {
      unit.kill();
      createVFX(VFX.RitualDagger, unit.x, unit.y);
    }

    if (unit.isUnitType(UNIT_TYPE_STRUCTURE)) {
      unit.setOwner(enemyPlayer, true);

      const randomTimer = randomize(7, 4);

      runTimer(function () {
        unit.kill();
        createVFX(VFX.AnimateDead, unit.x, unit.y);

        const undeads = DECOR.zombies;
        const random = randomize(5);

        const undead = Unit.create(
          enemyPlayer,
          FourCC(undeads[random]),
          unit.x,
          unit.y,
          270
        ) as Unit;
        undead.invulnerable = true;
        undead.issueOrderAt(
          OrderId.Move,
          DECOR.necro.ritual[0],
          DECOR.necro.ritual[1]
        );
      }, randomTimer);
    }
  });
}
