import randomize from '@helpers/randomize';

import type { CreepType } from '@constants/waves-creeps';
import { PRESET } from '@constants/waves-presets.constants';
import { ARMOR_TYPES, STATS } from '@constants/waves-stats.constants';

export interface ICreep {
  unitId: number;
  name: string;
  interval: number;
  spawnsCap: number;
  spawnType: string;
  count: number;
  hp: number;
  armor: number;
  armorType: number;
  armorTypeName: string;
  speed: number;
}

export default function generateWave(wave: number, units: CreepType[]): ICreep {
  const unitId = FourCC(units[wave].unit);
  const name = units[wave].name;

  const { interval, spawnType, spawns, speed, reduceHp, reduceArmor } =
    PRESET[randomize(PRESET.length)];

  const hp = STATS.hp[wave] * reduceHp;
  const armor = STATS.armor[wave] + 2 - reduceArmor;
  const armorType = ARMOR_TYPES[randomize(ARMOR_TYPES.length)];

  const data: ICreep = {
    unitId: unitId,
    name: name,
    interval: interval,
    spawnsCap: spawns,
    spawnType: spawnType,
    hp: hp,
    armor: armor,
    armorType: armorType.code,
    armorTypeName: armorType.name,
    count: spawns,
    speed: speed
  };

  return data;
}
