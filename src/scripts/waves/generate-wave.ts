import { CREEPS } from '@constants/waves-units';

export interface ICreep {
  unitId: number;
  name: string;
  interval: number;
  spawnsCap: number;
  spawnType: string;
}

export default function generateWave(wave: number): ICreep {
  const data = {
    unitId: FourCC(CREEPS[wave].unit),
    name: CREEPS[wave].name,
    interval: CREEPS[wave].interval,
    spawnsCap: CREEPS[wave].spawns,
    spawnType: CREEPS[wave].spawnType
  };

  return data;
}
