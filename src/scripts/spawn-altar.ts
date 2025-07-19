import { MapPlayer, Unit } from 'w3ts';

import aurasUpgradeTrigger from '@triggers/auras-upgrade.trigger';

import createVFX from '@helpers/create-vfx';

import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function spawnAltar() {
  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    // if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
    const altar = Unit.create(
      player,
      FourCC(GAME.altarId),
      GAME.spwPointAltar[i][0],
      GAME.spwPointAltar[i][1],
      270
    ) as Unit;

    altar.invulnerable = true;

    createVFX(VFX.Teleport, GAME.spwPointAltar[i][0], GAME.spwPointAltar[i][1]);

    aurasUpgradeTrigger(altar);
    // }
  }

  QuestMessageBJ(
    GetPlayersAll() as force,
    bj_QUESTMESSAGE_UPDATED,
    'New building: |cffffcc00Altar|r. Spells and auras'
  );
}
