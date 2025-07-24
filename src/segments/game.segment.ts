// import showWaveInfo from '@ui/show-wave-info';

import initLeaderboard from '@triggers/leaderboard/init-leaderboard';

import spawnAltar from '@scripts/spawn-altar';
import spawnSunctum from '@scripts/spawn-sunctum';

import runTimer from '@helpers/run-timer';
import shuffleArray from '@helpers/shuffle-array';

import generateWave, { ICreep } from '@waves/generate-wave';
import spawnWave from '@waves/spawn-wave';

import { GAME } from '@constants/game.constants';
import { CREEPS } from '@constants/waves-creeps';

export default function gameSegment() {
  const creeps = shuffleArray(CREEPS);

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

    // Wave level update at the end
    startWave();
  }

  function startWave(): void {
    // get data for wave
    const waveData: ICreep = generateWave(wave, creeps);
    QuestMessageBJ(
      GetPlayersAll() as force,
      bj_QUESTMESSAGE_UNITACQUIRED,
      `|cffffcc00Wave ${wave}|r`
    );
    //     QuestMessageBJ(
    //       GetPlayersAll() as force,
    //       bj_QUESTMESSAGE_UNITACQUIRED,
    //       `|cffffcc00Wave ${wave}|r - ${waveData.armorTypeName}
    // |cffffcc00${waveData.spawnsCap}|r spawns of |cffffcc00${waveData.name}|r
    // |cffc80000${waveData.hp}|r hp - |cff008000${waveData.armor}|r armor - |cff00ffff${waveData.speed}|r speed`
    //     );

    spawnWave({ ...waveData, callback: () => updateWave(), wave });
  }

  initLeaderboard();
  startWave(); // Init first Wave
}
