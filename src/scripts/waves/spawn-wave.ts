import { MapPlayer, Point, Unit } from 'w3ts';

import orderCreep from '@scripts/waves/order-creep';

import createVFX from '@helpers/create-vfx';
import runTimer from '@helpers/run-timer';

import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';
import { SPAWNTYPE } from '@constants/waves-creeps';
import { SPAWN_POINTS } from '@constants/waves-spawns.constants';
import { WAYPOINTS } from '@constants/waves-waypoints.constants';

interface SpawnWaveDTO {
  wave: number;
  waveData: IWAVEDATA;
  callback: () => void;
}

export default function spawnWave({ wave, waveData, callback }: SpawnWaveDTO): void {
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  const { unitId, spawnType, interval, count } = waveData;
  const { speed, bounty, maxLife, maxMana, armor } = waveData;

  let creepSpawned = 0;
  let waypoints: Point[] = [];

  for (const waypoint of WAYPOINTS) {
    const point = Point.create(waypoint.point[0], waypoint.point[1]) as Point;
    waypoints.push(point);
  }

  function spawnCreep(x: number, y: number, angle: number): Unit {
    const unit = Unit.create(enemy, unitId, x, y, angle) as Unit;

    createVFX(VFX.AnimateDead, unit.x, unit.y);
    // Update unit stats to variables
    unit.userData = bounty;
    unit.armor = armor;
    unit.moveSpeed = speed;
    unit.maxLife = maxLife;
    unit.life = maxLife;

    if (maxMana > 0) {
      unit.maxMana = maxMana;
      unit.mana = maxMana;
    }

    return unit;
  }

  function action(): void {
    // Check if all creeps from wave spawned
    if (creepSpawned < count) {
      // Spawn mobs for all playable spawns
      for (let i = 0; i < GAME.maxPlayers; i++) {
        const player = MapPlayer.fromIndex(i) as MapPlayer;

        if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
          // Spawn type check
          if (spawnType === SPAWNTYPE.single) {
            const unit = spawnCreep(
              SPAWN_POINTS[i].single[0],
              SPAWN_POINTS[i].single[1],
              SPAWN_POINTS[i].angle
            );

            orderCreep(unit, SPAWN_POINTS[i].order, waypoints);
            creepSpawned++;
          }

          if (spawnType === SPAWNTYPE.triple) {
            for (let x = 0; x < 3; x++) {
              if (creepSpawned < count) {
                const unit = spawnCreep(
                  SPAWN_POINTS[i].triple[x][0],
                  SPAWN_POINTS[i].triple[x][1],
                  SPAWN_POINTS[i].angle
                );

                orderCreep(unit, SPAWN_POINTS[i].order, waypoints);
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
