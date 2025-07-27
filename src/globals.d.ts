export {};

declare global {
  type SPAWNTYPE = 'SINGLE' | 'TRIPLE';

  interface ICREEPBLANK {
    unit: string;
    name: string;
    armorTypeName: string;
    isFlyable: boolean;
  }

  interface IPRESET {
    spawnType: 'SINGLE' | 'TRIPLE';
    interval: number;
    speed: number;
    spawns: number;
    maxMana: number;
    reduceHp: number;
    reduceBounty: number;
    reduceArmor: number;
  }

  interface IWAVEDATA extends ICREEPBLANK {
    unitId: number;
    spawnType: string;
    interval: number;
    count: number;
    speed: number;
    bounty: number;
    maxLife: number;
    maxMana: number;
    armor: number;
  }
}
