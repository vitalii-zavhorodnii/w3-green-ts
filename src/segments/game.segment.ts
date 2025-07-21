import initLeaderboard from '@triggers/leaderboard/init-leaderboard';

import runTimer from '@helpers/run-timer';

import spawnAltar from '@scripts/spawn-altar';
import spawnSunctum from '@scripts/spawn-sunctum';
import generateWave from '@scripts/waves/generate-wave';
import spawnWave from '@scripts/waves/spawn-wave';

import { GAME } from '@constants/game.constants';
import { CREEPS } from '@constants/waves-units';

export default function gameSegment() {
  let wave = 0;

  function updateWave() {
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

  function startWave() {
    // get data for wave
    const data = generateWave(wave);

    QuestMessageBJ(
      GetPlayersAll() as force,
      bj_QUESTMESSAGE_UNITACQUIRED,
      `|cffffcc00Wave ${wave}|r
|cffffcc00${data.spawnsCap}|r spawns of |cffffcc00${data.name}|r`
    );

    spawnWave(
      data.unitId,
      data.spawnsCap,
      data.interval,
      data.spawnType,
      updateWave
    );
  }

  initLeaderboard();
  startWave(); // Init first Wave
}
