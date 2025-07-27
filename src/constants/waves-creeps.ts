export const SPAWNTYPE = {
  single: 'SINGLE',
  triple: 'TRIPLE'
};

// |cffe1a800Unarmored|r
// |cff8c8c8cLight Armor|r
// |cff8080ffHeavy Armor|r
// |cffd45e19Fortified|r

export const CREEPS: ICREEPBLANK[] = [
  {
    unit: 'hfoo',
    name: 'Footman',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'hsor',
    name: 'Sorceress',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'hkni',
    name: 'Knight',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'ocat',
    name: 'Demolisher',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'oshm',
    name: 'Shaman',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'uabo',
    name: 'Abomination',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'otau',
    name: 'Tauren',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'hgyr',
    name: 'Gyrocopter',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: true
  },
  {
    unit: 'ugho',
    name: 'Ghoul',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'nmyr',
    name: 'Myrmidon',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'nfel',
    name: 'Fel Stalker',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'ngnw',
    name: 'Gnoll Warden',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'uobs',
    name: 'Obsidian Statue',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'ugar',
    name: 'Gargoyle',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: true
  }
];
