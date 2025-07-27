export const DEFAULT_PRESET: IPRESET = {
  spawnType: 'SINGLE',
  interval: 1.2,
  speed: 220,
  spawns: 48,
  maxMana: 0,
  reduceHp: 1, // hp multiplier bounty * value
  reduceBounty: 1, // bounty multiplier bounty * value
  reduceArmor: 0 // static value -armor
};

export const PRESET: IPRESET[] = [
  {
    spawnType: 'SINGLE',
    interval: 1.2,
    speed: 280,
    spawns: 48,
    maxMana: 0,
    reduceHp: 1,
    reduceBounty: 1,
    reduceArmor: 0
  },
  {
    spawnType: 'SINGLE',
    interval: 1.4,
    speed: 260,
    spawns: 48,
    maxMana: 0,
    reduceHp: 1.1,
    reduceBounty: 1,
    reduceArmor: 0
  },
  {
    spawnType: 'TRIPLE',
    interval: 1.5,
    speed: 220,
    spawns: 92,
    maxMana: 0,
    reduceHp: 0.4,
    reduceBounty: 0.4,
    reduceArmor: 0
  }
];
