// |cffe1a800Unarmored|r
// |cff8c8c8cLight Armor|r
// |cff8080ffHeavy Armor|r
// |cffd45e19Fortified|r
//
export const SPAWNTYPE = {
  single: 'SINGLE',
  triple: 'TRIPLE'
};

export const CREEPS: ICREEPBLANK[] = [
  // UNARMORED
  {
    unit: 'hsor',
    name: 'Sorceress',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'oshm',
    name: 'Shaman',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'nfel',
    name: 'Fel Stalker',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'ndrs',
    name: 'Draenei Seer',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'nsel',
    name: 'Sea Elemental',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'nsty',
    name: 'Satyr',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'hphx',
    name: 'Phoenix',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'nwld',
    name: 'Dire Wolf',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'nplb',
    name: 'Polar Bear',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'nomg',
    name: 'Ogre Magi',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'ners',
    name: 'Eredar Sorcerer',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: false
  },
  {
    unit: 'otbr',
    name: 'Batrider',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: true
  },
  {
    unit: 'oswy',
    name: 'Spirit Wind Rider',
    armorTypeName: '|cffe1a800Unarmored|r',
    isFlyable: true
  },
  // LIGHT
  {
    unit: 'hfoo',
    name: 'Footman',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'nban',
    name: 'Bandit',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'uabo',
    name: 'Abomination',
    armorTypeName: '|cff8c8c8cLight Armor|r',
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
    unit: 'ngnw',
    name: 'Gnoll Warden',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'ugar',
    name: 'Gargoyle',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: true
  },
  {
    unit: 'ospw',
    name: 'Spirit Walker',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'nfor',
    name: 'Faceless One',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'nwzr',
    name: 'Wizard',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'nspb',
    name: 'Black Spider',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: false
  },
  {
    unit: 'nhrr',
    name: 'Harpy',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: true
  },
  {
    unit: 'nwgs',
    name: 'Couatl',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: true
  },
  {
    unit: 'ucry',
    name: 'Crypt Fiend',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    isFlyable: true
  },
  // HEAVY
  {
    unit: 'nmyr',
    name: 'Myrmidon',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'otau',
    name: 'Tauren',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'hkni',
    name: 'Knight',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'orai',
    name: 'Raider',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'nwna',
    name: 'Ancient Wendigo',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'nfgb',
    name: 'Bloodfiend',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'nkol',
    name: 'Kobold Taskmaster',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'nbdk',
    name: 'Black Drake',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: true
  },
  {
    unit: 'nowb',
    name: 'Moonkin',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'nchg',
    name: 'Fel Orc Grunt',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'ucs3',
    name: 'Carrion Beetle',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'ndqn',
    name: 'Succubus',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  {
    unit: 'nmdr',
    name: 'Dire Mammoth',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    isFlyable: false
  },
  // FORTIFIED
  {
    unit: 'uobs',
    name: 'Obsidian Statue',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'ocat',
    name: 'Demolisher',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'umtw',
    name: 'Meat Wagon',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'uarb',
    name: 'Sky Barge',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: true
  },
  {
    unit: 'nhyc',
    name: 'Dragon Turtle',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'uubs',
    name: 'Undead Battleship',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'narg',
    name: 'Battle Golem',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'hbew',
    name: 'Wagon',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'nggr',
    name: 'Granite Golem',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  },
  {
    unit: 'nsgh',
    name: 'Sea Giant Hunter',
    armorTypeName: '|cffd45e19Fortified|r',
    isFlyable: false
  }
];
