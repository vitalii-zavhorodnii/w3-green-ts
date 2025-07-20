export const QUESTS = [
  {
    title: 'Overrun',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNStampede.blp',
    description:
      'If overrun value becomes greater then cap - plague will spread across entire map',
    items: [
      'Each creep on spawn increases overrun value',
      'Usually boss waves gives more overrun',
      'Do not overcap creeps on circle',
      'The more players the bigger the cap'
    ]
  },
  {
    title: 'Attack types',
    icon: 'ReplaceableTextures\\CommandButtons\\BTNImpalingBolt.blp',
    description:
      'Each warden has different attack type. Waves of creeps have own armor type, so wardens are stronger or weaker against certain wave. You can view info about attack or armor in unit info panel',
    items: [
      '|cffe1a800Hero|r attacks deal greater damage to |cffe1a800Unarmored|r armor',
      '|cff8c8c8cPierce|r attacks deal greater damage to |cff8c8c8cLight Armor|r armor',
      '|cff8080ffMagical|r attacks deal greater damage to |cff8080ffHeavy Armor|r armor',
      '|cffd45e19Siege|r attacks deal greater damage to |cffd45e19Fortified|r armor',
      '|cff008000Chaos|r attacks deal same damage to all armor types'
    ]
  },
  {
    title: 'Imported files',
    isOptional: true,
    icon: 'ReplaceableTextures\\CommandButtons\\BTNEngineeringUpgrade.blp',
    description: `Amazing cliff and tileset from |cffffcc00WerBackIII|r
|cff969696hiveworkshop.com/threads/westcliff_256-blp.277323|r
|cff969696hiveworkshop.com/threads/westfall_grass-blp.277321|r

Simple and good cliff from |cffffcc00~Void~|r
|cff969696hiveworkshop.com/threads/x_cliff1-blp.117489|r`,
    items: [
      'Special thanks for all author of imported files!',
      'Sometimes ideas for maps comes from reviewing hiveworkshop library',
      '|cffffcc00Links on hiveworkshop|r listed below'
    ]
  }
];
