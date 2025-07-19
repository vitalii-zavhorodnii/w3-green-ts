import { Point, Trigger, Unit } from 'w3ts';

import createVFX from '@helpers/create-vfx';

import { VFX } from '@constants/vfx.constants';

export default function blinkTrigger() {
  const trigger = Trigger.create();

  const blinkAbilityId = 'A00O:Afbk';
  const blinkDistance = 600;

  function action() {
    const unit = Unit.fromEvent() as Unit;
    const point = Point.fromHandle(GetOrderPointLoc()) as Point;

    createVFX(VFX.BlinkTarget, unit.x, unit.y);
    createVFX(VFX.BlinkPoint, point.x, point.y);

    unit.x = point.x;
    unit.y = point.y;
  }

  function condition() {
    const unit = Unit.fromEvent() as Unit;
    const level = unit.getAbilityLevel(FourCC(blinkAbilityId));

    if (level === 0) {
      return false;
    }

    const distance = DistanceBetweenPoints(
      GetUnitLoc(unit.handle),
      GetOrderPointLoc() as location
    );

    if (distance < blinkDistance) {
      return false;
    }

    return true;
  }

  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ISSUED_POINT_ORDER);
  trigger.addCondition(condition);
  trigger.addAction(action);
}
