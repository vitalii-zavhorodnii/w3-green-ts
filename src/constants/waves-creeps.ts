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
    icon: 'ReplaceableTextures\\CommandButtons\\BTNSorceress.blp',
    isFlyable: false
  },
  {
    unit: 'oshm',
    name: 'Shaman',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNShaman.blp',
    isFlyable: false
  },
  {
    unit: 'nfel',
    name: 'Fel Stalker',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNFelHound.blp',
    isFlyable: false
  },
  {
    unit: 'ndrs',
    name: 'Draenei Seer',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNDranaiMage.blp',
    isFlyable: false
  },
  {
    unit: 'nsel',
    name: 'Sea Elemental',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNSeaElemental.blp',
    isFlyable: false
  },
  {
    unit: 'nsty',
    name: 'Satyr',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNSatyr.blp',
    isFlyable: false
  },
  {
    unit: 'hphx',
    name: 'Phoenix',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNMarkOfFire.blp',
    isFlyable: false
  },
  {
    unit: 'nwld',
    name: 'Dire Wolf',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNDireWolf.blp',
    isFlyable: false
  },
  {
    unit: 'nplb',
    name: 'Polar Bear',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNFrostBear.blp',
    isFlyable: false
  },
  {
    unit: 'nomg',
    name: 'Ogre Magi',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNOgreMagi.blp',
    isFlyable: false
  },
  {
    unit: 'ners',
    name: 'Eredar Sorcerer',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNEredarWarlockPurple.blp',
    isFlyable: false
  },
  {
    unit: 'otbr',
    name: 'Batrider',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNTrollBatRider.blp',
    isFlyable: true
  },
  {
    unit: 'oswy',
    name: 'Spirit Wind Rider',
    armorTypeName: '|cffe1a800Unarmored|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNSpiritWyvern.blp',
    isFlyable: true
  },
  // LIGHT
  {
    unit: 'hfoo',
    name: 'Footman',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNFootman.blp',
    isFlyable: false
  },
  {
    unit: 'nban',
    name: 'Bandit',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNBandit.blp',
    isFlyable: false
  },
  {
    unit: 'uabo',
    name: 'Abomination',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNAbomination.blp',
    isFlyable: false
  },
  {
    unit: 'hgyr',
    name: 'Gyrocopter',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNFlyingMachine.blp',
    isFlyable: true
  },
  {
    unit: 'ugho',
    name: 'Ghoul',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNGhoul.blp',
    isFlyable: false
  },
  {
    unit: 'ngnw',
    name: 'Gnoll Warden',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNGnollWarden.blp',
    isFlyable: false
  },
  {
    unit: 'ugar',
    name: 'Gargoyle',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNGargoyle.blp',
    isFlyable: true
  },
  {
    unit: 'ospw',
    name: 'Spirit Walker',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNSpiritWalker.blp',
    isFlyable: false
  },
  {
    unit: 'nfor',
    name: 'Faceless One',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNFacelessOne.blp',
    isFlyable: false
  },
  {
    unit: 'nwzr',
    name: 'Wizard',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNBanditMage.blp',
    isFlyable: false
  },
  {
    unit: 'nspb',
    name: 'Black Spider',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNSpiderBlack.blp',
    isFlyable: false
  },
  {
    unit: 'nhrr',
    name: 'Harpy',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNHarpy.blp',
    isFlyable: true
  },
  {
    unit: 'nwgs',
    name: 'Couatl',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNWindSerpent.blp',
    isFlyable: true
  },
  {
    unit: 'ucry',
    name: 'Crypt Fiend',
    armorTypeName: '|cff8c8c8cLight Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNCryptFiend.blp',
    isFlyable: true
  },
  // HEAVY
  {
    unit: 'nmyr',
    name: 'Myrmidon',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNNagaMyrmidon.blp',
    isFlyable: false
  },
  {
    unit: 'otau',
    name: 'Tauren',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNTauren.blp',
    isFlyable: false
  },
  {
    unit: 'hkni',
    name: 'Knight',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNKnight.blp',
    isFlyable: false
  },
  {
    unit: 'orai',
    name: 'Raider',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNRaider.blp',
    isFlyable: false
  },
  {
    unit: 'nwna',
    name: 'Ancient Wendigo',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNWendigo.blp',
    isFlyable: false
  },
  {
    unit: 'nfgb',
    name: 'Bloodfiend',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNFelGuard.blp',
    isFlyable: false
  },
  {
    unit: 'nkol',
    name: 'Kobold Taskmaster',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNKobold.blp',
    isFlyable: false
  },
  {
    unit: 'nbdk',
    name: 'Black Drake',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNBlackDragon.blp',
    isFlyable: true
  },
  {
    unit: 'nowb',
    name: 'Moonkin',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNOwlBear.blp',
    isFlyable: false
  },
  {
    unit: 'nchg',
    name: 'Fel Orc Grunt',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNChaosGrunt.blp',
    isFlyable: false
  },
  {
    unit: 'ucs3',
    name: 'Carrion Beetle',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNCarrionScarabs.blp',
    isFlyable: false
  },
  {
    unit: 'ndqn',
    name: 'Succubus',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNDemoness.blp',
    isFlyable: false
  },
  {
    unit: 'nmdr',
    name: 'Dire Mammoth',
    armorTypeName: '|cff8080ffHeavy Armor|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNBlackMammoth.blp',
    isFlyable: false
  },
  // FORTIFIED
  {
    unit: 'uobs',
    name: 'Obsidian Statue',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNObsidianStatue.blp',
    isFlyable: false
  },
  {
    unit: 'ocat',
    name: 'Demolisher',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNDemolisher.blp',
    isFlyable: false
  },
  {
    unit: 'umtw',
    name: 'Meat Wagon',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNMeatWagon.blp',
    isFlyable: false
  },
  {
    unit: 'uarb',
    name: 'Sky Barge',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNUndeadAirBarge.blp',
    isFlyable: true
  },
  {
    unit: 'nhyc',
    name: 'Dragon Turtle',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNSeaTurtleRed.blp',
    isFlyable: false
  },
  {
    unit: 'uubs',
    name: 'Undead Battleship',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNUndeadBattleShip.blp',
    isFlyable: false
  },
  {
    unit: 'narg',
    name: 'Battle Golem',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNArmorGolem.blp',
    isFlyable: false
  },
  {
    unit: 'hbew',
    name: 'Wagon',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNBloodElfSupplyWagon.blp',
    isFlyable: false
  },
  {
    unit: 'nggr',
    name: 'Granite Golem',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNRockGolem.blp',
    isFlyable: false
  },
  {
    unit: 'nsgh',
    name: 'Sea Giant Hunter',
    armorTypeName: '|cffd45e19Fortified|r',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNSeaGiantGreen.blp',
    isFlyable: false
  }
];
