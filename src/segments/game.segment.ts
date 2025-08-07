// import showWaveInfo from '@ui/show-wave-info';
import initLeaderboard from '@triggers/leaderboard/init-leaderboard';

import spawnAltar from '@scripts/spawn-altar';
import spawnSunctum from '@scripts/spawn-sunctum';
// import generateBoss from '@scripts/waves/generate-boss';
import generateWave from '@scripts/waves/generate-wave';
import spawnWave from '@scripts/waves/spawn-wave';

import runTimer from '@helpers/run-timer';
import shuffleArray from '@helpers/shuffle-array';

import { GAME } from '@constants/game.constants';
import { CREEPS } from '@constants/waves-creeps';

export default function gameSegment(): void {
  const unitBlanksList = shuffleArray(CREEPS);

  let wave = 0;

  // showWaveInfo();

  function updateWave(): void {
    wave++;

    if (wave === GAME.extentionsRound) {
      runTimer(function () {
        spawnAltar();
      }, 25);
    }

    if (wave === GAME.extentionsRound + 1) {
      runTimer(function () {
        spawnSunctum();
      }, 25);
    }

    // if (wave % 10 !== 0) {
    //   startWave();
    // } else {
    //   startBoss();
    // }

    startWave();
  }

  function startWave(): void {
    const waveData: IWAVEDATA = generateWave(wave, unitBlanksList);

    QuestMessageBJ(
      GetPlayersAll() as force,
      bj_QUESTMESSAGE_UNITACQUIRED,
      `|cffffcc00Wave ${wave}|r - ${waveData.armorTypeName}|r
|cffffcc00${waveData.count}|r spawns of |cffffcc00${waveData.name}|r
|cffc80000${waveData.maxLife}|r hp - |cff008000${waveData.armor}|r armor - |cff00ffff${waveData.speed}|r speed`
    );

    spawnWave({ wave, waveData, callback: () => updateWave() });
  }

  //   function startBoss(): void {
  //     // get data for wave
  //     const waveData: IWAVEDATA = generateBoss(wave);

  //     QuestMessageBJ(
  //       GetPlayersAll() as force,
  //       bj_QUESTMESSAGE_UNITACQUIRED,
  //       `|cffffcc00Wave ${wave}|r - ${waveData.armorTypeName}|r
  // |cffffcc00${waveData.count}|r spawns of |cffffcc00${waveData.name}|r
  // |cffc80000${waveData.maxLife}|r hp - |cff008000${waveData.armor}|r armor - |cff00ffff${waveData.speed}|r speed`
  //     );

  //     // spawnWave({ wave, waveData, callback: () => updateWave() });
  //     startWave();
  //   }

  initLeaderboard();
  startWave(); // Init first Wave
}
