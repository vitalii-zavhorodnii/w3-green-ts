import { MapPlayer, Unit } from 'w3ts';

import createVFX from '@helpers/create-vfx';
import runTimer from '@helpers/run-timer';

import fillOrdersQueue from '@scripts/fill-orders-queue';

import { SPAWNTYPE } from '@constants/creeps.constants';
import { GAME } from '@constants/game.constants';
import { SPAWN_POINTS } from '@constants/spawn-points.constants';
import { VFX } from '@constants/vfx.constants';

export default function spawnWave(
  unitId: number,
  count: number,
  interval: number,
  spawnType: string,
  callback: () => void
) {
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;
  let creepSpawned = 0;

  function action() {
    // Check if all creeps from wave spawned
    if (creepSpawned < count) {
      // Spawn mobs for all playable spawns
      for (let i = 0; i < GAME.maxPlayers; i++) {
        const player = MapPlayer.fromIndex(i) as MapPlayer;

        if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
          // Spawn type check
          if (spawnType === SPAWNTYPE.single) {
            const unit = Unit.create(
              enemy,
              unitId,
              SPAWN_POINTS[i].single[0],
              SPAWN_POINTS[i].single[1],
              SPAWN_POINTS[i].angle
            ) as Unit;

            createVFX(VFX.AnimateDead, unit.x, unit.y);
            fillOrdersQueue(unit, SPAWN_POINTS[i].order);

            creepSpawned++;
          }

          if (spawnType === SPAWNTYPE.triple) {
            for (let x = 0; x < 3; x++) {
              if (creepSpawned < count) {
                const unit = Unit.create(
                  enemy,
                  unitId,
                  SPAWN_POINTS[i].triple[x][0],
                  SPAWN_POINTS[i].triple[x][1],
                  SPAWN_POINTS[i].angle
                ) as Unit;

                createVFX(VFX.AnimateDead, unit.x, unit.y);
                fillOrdersQueue(unit, SPAWN_POINTS[i].order);

                creepSpawned++;
              }
            }
          }
        }
      }
    } else {
      waveSpawnTimer.destroy();
      creepSpawned = 0;
      callback();
    }
  }

  // run script
  const waveSpawnTimer = runTimer(action, interval, true);
}
