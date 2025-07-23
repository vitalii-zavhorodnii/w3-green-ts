import { MapPlayer, Point, Unit } from 'w3ts';

import { ICreep } from './generate-wave';

import createVFX from '@helpers/create-vfx';
import runTimer from '@helpers/run-timer';

import orderCreep from '@waves/order-creep';

import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';
import { SPAWNTYPE } from '@constants/waves-creeps';
import { SPAWN_POINTS } from '@constants/waves-spawns.constants';
import { WAYPOINTS } from '@constants/waves-waypoints.constants';

interface ISpawnProps extends ICreep {
  callback: () => void;
  wave: number;
}

export default function spawnWave(props: ISpawnProps): void {
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;
  const { unitId, count, interval, spawnType, callback, wave, armor, speed } = props;

  let creepSpawned = 0;
  let waypoints: Point[] = [];

  for (const waypoint of WAYPOINTS) {
    const point = Point.create(waypoint.point[0], waypoint.point[1]) as Point;
    waypoints.push(point);
  }

  function spawnCreep(x: number, y: number, angle: number): Unit {
    const unit = Unit.create(enemy, unitId, x, y, angle) as Unit;

    createVFX(VFX.AnimateDead, unit.x, unit.y);

    unit.moveSpeed = speed;
    unit.armor = armor;

    // const abilityId = FourCC('A00U:All2'); // Life Bonus Creep
    // unit.addAbility(abilityId);
    // unit.setAbilityLevel(abilityId, 5);

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
