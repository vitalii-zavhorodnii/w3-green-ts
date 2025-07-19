import { Destructable, MapPlayer, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import { GAME } from '@constants/game.constants';

const WISP = FourCC('ewsp');
const LOCATIONS = [
  [-3528.6, -656.1, FourCC('B000')],
  [-3395.5, 453.5, FourCC('B000')],
  [-2389.6, -270, FourCC('B000')]
];

export default function wispsDeocration() {
  const player = MapPlayer.fromIndex(GAME.decorPlayerId);

  if (player) {
    for (let i = 0; i < LOCATIONS.length; i++) {
      const unit = Unit.create(player, WISP, LOCATIONS[i][0], LOCATIONS[i][1], 0);
      unit?.setPathing(false);

      const tree = Destructable.create(
        LOCATIONS[i][2],
        LOCATIONS[i][0],
        LOCATIONS[i][1],
        1,
        1,
        10
      );

      if (tree && unit) {
        unit.invulnerable = true;
        unit.issueTargetOrder(OrderId.Harvest, tree);
      }
    }
  }
}
