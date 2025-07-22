export type CreepType = {
  unit: string;
  name: string;
  isFlyable: boolean;
};

export const SPAWNTYPE = {
  single: 'SINGLE',
  triple: 'TRIPLE'
};

export const CREEPS: CreepType[] = [
  {
    unit: 'hfoo',
    name: 'Footman',
    isFlyable: false
  },
  {
    unit: 'hsor',
    name: 'Sorceress',
    isFlyable: false
  },
  {
    unit: 'hkni',
    name: 'Knight',
    isFlyable: false
  },
  {
    unit: 'ocat',
    name: 'Demolisher',
    isFlyable: false
  },
  {
    unit: 'oshm',
    name: 'Shaman',
    isFlyable: false
  },
  {
    unit: 'uabo',
    name: 'Abomination',
    isFlyable: false
  },
  {
    unit: 'otau',
    name: 'Tauren',
    isFlyable: false
  },
  {
    unit: 'hgyr',
    name: 'Gyrocopter',
    isFlyable: true
  },
  {
    unit: 'ugho',
    name: 'Ghoul',
    isFlyable: false
  },
  {
    unit: 'Udea',
    name: 'Boss Death Knight',
    isFlyable: false
  },
  {
    unit: 'nmyr',
    name: 'Myrmidon',
    isFlyable: false
  },
  {
    unit: 'nfel',
    name: 'Fel Stalker',
    isFlyable: false
  },
  {
    unit: 'ngnw',
    name: 'Gnoll Warden',
    isFlyable: false
  },
  {
    unit: 'uobs',
    name: 'Obsidian Statue',
    isFlyable: false
  },
  {
    unit: 'ugar',
    name: 'Gargoyle',
    isFlyable: true
  }
];
