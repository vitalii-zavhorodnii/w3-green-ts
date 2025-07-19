export const SPAWNTYPE = {
  single: 'SINGLE',
  triple: 'TRIPLE'
};

export const CREEPS = [
  {
    unit: 'hfoo',
    name: 'Footman',
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    spawns: 40
  }, // light 1
  {
    unit: 'hsor',
    name: 'Sorceress',
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    spawns: 40
  }, // unarm 2
  {
    unit: 'hkni',
    name: 'Knight',
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    spawns: 40
  }, // heavy 3
  {
    unit: 'ocat',
    name: 'Demolisher',
    interval: 2,
    spawnType: SPAWNTYPE.single,
    spawns: 35
  }, // fort 4
  {
    unit: 'oshm',
    name: 'Shaman',
    interval: 1.5,
    spawnType: SPAWNTYPE.triple,
    spawns: 35
  }, // unarm 5
  {
    unit: 'uabo',
    name: 'Abomination',
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    spawns: 30
  }, // light 6
  {
    unit: 'otau',
    name: 'Tauren',
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    spawns: 30
  }, // heavy 7
  {
    unit: 'hgyr',
    name: 'Gyrocopter',
    interval: 0.75,
    spawnType: SPAWNTYPE.single,
    spawns: 30
  }, // unarm 8
  {
    unit: 'ugho',
    name: 'Ghoul',
    interval: 1,
    spawnType: SPAWNTYPE.single,
    spawns: 30
  }, // light 9
  {
    unit: 'Udea',
    name: 'Boss Death Knight',
    interval: 10,
    spawnType: SPAWNTYPE.single,
    spawns: 5
  }, // heavy 10 Boss
  {
    unit: 'nmyr',
    name: 'Myrmidon',
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    spawns: 50
  }, // heavy 11
  {
    unit: 'nfel',
    name: 'Fel Stalker',
    interval: 1.7,
    spawnType: SPAWNTYPE.single,
    spawns: 30
  }, // unarm 12
  {
    unit: 'ngnw',
    name: 'Gnoll Warden',
    interval: 1.2,
    spawnType: SPAWNTYPE.triple,
    spawns: 90
  }, // light 13
  {
    unit: 'uobs',
    name: 'Obsidian Statue',
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    spawns: 35
  }, // fort 14
  {
    unit: 'ugar',
    name: 'Gargoyle',
    interval: 1.5,
    spawnType: SPAWNTYPE.single,
    spawns: 30
  } // unarm 15
];
