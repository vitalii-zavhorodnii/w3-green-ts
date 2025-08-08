import { MapPlayer, Unit } from 'w3ts';

import showNewBuilding from '@ui/show-new-building';

import createVFX from '@helpers/create-vfx';

import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function spawnSunctum() {
  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    // if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
    const sunctum = Unit.create(
      player,
      FourCC(GAME.sanctumId),
      GAME.spwPointSunc[i][0],
      GAME.spwPointSunc[i][1],
      270
    ) as Unit;

    sunctum.invulnerable = true;
    createVFX(VFX.Teleport, GAME.spwPointSunc[i][0], GAME.spwPointSunc[i][1]);
    // }
  }

  showNewBuilding(
    'ReplaceableTextures\\CommandButtons\\BTNArcaneSanctum.blp',
    '|cffffcc00Sunctum|r New building!',
    'Upgrades for Altar'
  );
}
