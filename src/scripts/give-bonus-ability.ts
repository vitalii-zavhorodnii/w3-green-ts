import { Group, MapPlayer, Unit } from 'w3ts';

import createVFX from '@helpers/create-vfx';
import randomize from '@helpers/randomize';

import { VFX } from '@constants/vfx.constants';

export default function giveBonusAbility(player: MapPlayer, ability: number) {
  const mapLUA = GetPlayableMapRect() as rect;
  const groupLUA = GetUnitsInRectAll(mapLUA) as group;

  let units: Unit[] = [];

  ForGroupBJ(groupLUA, () => {
    const unit = Unit.fromEnum() as Unit;

    if (unit.owner.id === player.id) {
      if (unit.isUnitType(UNIT_TYPE_GIANT)) {
        units.push(unit);
      }
    }
  });

  const random = randomize(units.length - 1);
  units[random].addAbility(ability);
  createVFX(VFX.Buff, units[random].x, units[random].y);

  DestroyGroup(groupLUA);
}
