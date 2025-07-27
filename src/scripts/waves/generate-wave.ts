import randomize from '@helpers/randomize';

import { GAME } from '@constants/game.constants';
import { DEFAULT_PRESET, PRESET } from '@constants/waves-presets.constants';
import { STATS } from '@constants/waves-stats.constants';

export default function generateWave(
  wave: number,
  unitBlanksList: ICREEPBLANK[]
): IWAVEDATA {
  let preset: IPRESET;

  if (wave > GAME.presetStartLvl) {
    preset = PRESET[randomize(PRESET.length)];
  } else {
    preset = DEFAULT_PRESET;
  }

  const { unit, name, armorTypeName, isFlyable } = unitBlanksList[wave];
  const { interval, spawnType, spawns } = preset;
  const { speed, maxMana, reduceHp, reduceArmor, reduceBounty } = preset;

  const life = Math.round(STATS.maxLife[wave] * reduceHp);
  const armor = STATS.armor[wave] + 2 - reduceArmor;
  const bounty = Math.round(STATS.bounty[wave] * reduceBounty);

  return {
    unit: unit,
    unitId: FourCC(unit),
    name: name,
    armorTypeName: armorTypeName,
    isFlyable: isFlyable,
    spawnType: spawnType,
    interval: interval,
    count: spawns,
    speed: speed,
    bounty: bounty,
    maxLife: life,
    maxMana: maxMana,
    armor: armor
  };
}
