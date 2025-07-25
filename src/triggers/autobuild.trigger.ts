import { MapPlayer, Trigger, Unit } from 'w3ts';

import createVFX from '@helpers/create-vfx';

import { VFX } from '@constants/vfx.constants';

export default function autoBuildTrigger() {
  const trigger = Trigger.create();

  function action(): void {
    const unit = Unit.fromHandle(GetConstructingStructure());
    const player = MapPlayer.fromEvent();

    if (unit && player) {
      const id = unit.typeId;

      unit.destroy();

      const building = Unit.create(player, id, unit.x, unit.y, 245.0) as Unit;
      building.invulnerable = true;

      createVFX(VFX.Teleport, unit.x, unit.y);
    }
  }

  trigger.addAction(action);
  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_START);
}
