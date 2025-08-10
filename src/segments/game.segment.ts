import initLeaderboard from '@triggers/leaderboard/init-leaderboard';

import spawnAltar from '@scripts/spawn-altar';
import spawnSunctum from '@scripts/spawn-sunctum';
import generateWave from '@scripts/waves/generate-wave';
import spawnWave from '@scripts/waves/spawn-wave';
import showWaveInfo from '@ui/show-wave-info';

import runTimer from '@helpers/run-timer';
import shuffleArray from '@helpers/shuffle-array';

import { GAME } from '@constants/game.constants';
import { CREEPS } from '@constants/waves-creeps';

export default function gameSegment(): void {
  const unitBlanksList = shuffleArray(CREEPS);

  let wave = 0;

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

    startWave();
  }

  function startWave(): void {
    const waveData: IWAVEDATA = generateWave(wave, unitBlanksList);

    showWaveInfo(
      wave,
      waveData.name,
      waveData.armorTypeName,
      waveData.speed,
      waveData.maxLife,
      waveData.armor,
      waveData.icon
    );

    spawnWave({ wave, waveData, callback: () => updateWave() });
  }

  initLeaderboard();
  startWave(); // Init first Wave
}
