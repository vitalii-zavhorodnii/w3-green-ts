import { MapPlayer, Rectangle, Region, Trigger, Unit } from 'w3ts';

import createVFX from '@helpers/create-vfx';

import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function autoBuildTrigger() {
  const trigger = Trigger.create();

  function action(): void {
    const unit = Unit.fromHandle(GetConstructingStructure()) as Unit;
    const player = MapPlayer.fromEvent() as MapPlayer;
    const region = Region.create() as Region;
    const rectangle = Rectangle.create(
      GAME.buildFields[player.id].rect[0][0],
      GAME.buildFields[player.id].rect[0][1],
      GAME.buildFields[player.id].rect[1][0],
      GAME.buildFields[player.id].rect[1][1]
    ) as Rectangle;

    region.addRect(rectangle);

    if (region.containsUnit(unit)) {
      const id = unit.typeId;

      unit.destroy();

      const building = Unit.create(player, id, unit.x, unit.y, 245.0) as Unit;
      building.invulnerable = true;

      createVFX(VFX.Teleport, unit.x, unit.y);
    } else {
      const balance =
        GetUnitGoldCost(unit.typeId) + player.getState(PLAYER_STATE_RESOURCE_GOLD);

      player.setState(PLAYER_STATE_RESOURCE_GOLD, balance);

      unit.destroy();
    }

    region.destroy();
    rectangle.destroy();
  }

  trigger.addAction(action);
  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_CONSTRUCT_START);
}
