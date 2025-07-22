export const SPAWNTYPE = {
  single: 'SINGLE',
  triple: 'TRIPLE'
};

export const PRESET = [
  {
    interval: 1.2,
    spawnType: SPAWNTYPE.single,
    speed: 150,
    spawns: 3,
    reduceHp: 1,
    reduceArmor: 1
  },
  {
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    speed: 300,
    spawns: 3,
    reduceHp: 0.7,
    reduceArmor: 5
  },
  {
    interval: 1.8,
    spawnType: SPAWNTYPE.single,
    speed: 450,
    spawns: 3,
    reduceHp: 1,
    reduceArmor: 1
  }
];
  