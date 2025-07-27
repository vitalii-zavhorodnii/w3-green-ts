// import { BOSSES } from '@constants/waves-bosses';
// import { SPAWNTYPE } from '@constants/waves-presets.constants';

// export default function generateBoss(wave: number): IWAVEDATA {
//   const bossNumber = Math.round(wave / 10 - 1);
//   const unitId = FourCC(BOSSES[bossNumber].unitId);

//   const { name, interval, spawns, speed, maxMana } = BOSSES[bossNumber];

//   const life = Math.round(STATS.maxLife[wave] * reduceHp);
//   const armor = STATS.armor[wave] + 2 - reduceArmor;
//   const armorType = ARMOR_TYPES[randomize(ARMOR_TYPES.length)];
//   const bounty = STATS.bounty[wave];

//   const data: IWAVEDATA = {
//     unitId: unitId,
//     name: name,
//     interval: interval,
//     spawnsCap: spawns,
//     spawnType: SPAWNTYPE.single,
//     armor: armor,
//     armorType: armorType.code,
//     armorTypeName: armorType.name,
//     count: spawns,
//     speed: speed,
//     maxLife: life,
//     maxMana: maxMana,
//     bounty: bounty
//   };

//   return data;
// }
