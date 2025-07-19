import { Rectangle, Region, Trigger, Unit } from 'w3ts';

import createVFX from '@scripts/helpers/create-vfx';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function necromantCircleTrigger() {
  const trigger = Trigger.create();
  const rect = DECOR.necro.rect;
  // minX, minY, maxX, maxY
  const rectangle = Rectangle.create(rect[0][0], rect[0][1], rect[1][0], rect[1][1]);

  const region = Region.create();
  region.addRect(rectangle);

  function action() {
    const unit = Unit.fromHandle(GetEnteringUnit()) as Unit;

    createVFX(VFX.RitualDagger, unit.x, unit.y);
    unit.destroy();
  }

  function condition() {
    const unit = Unit.fromHandle(GetEnteringUnit());

    if (unit?.owner.id !== GAME.enemyPlayerId) {
      return false;
    }

    const classification = unit?.getField(UNIT_IF_UNIT_CLASSIFICATION);

    if (classification !== 2048) {
      return false;
    }

    return true;
  }

  trigger.registerEnterRegion(region.handle, () => {
    return true;
  });
  trigger.addCondition(condition);
  trigger.addAction(action);
}
