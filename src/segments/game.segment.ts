import initLeaderboard from '@triggers/leaderboard/init-leaderboard';

import runTimer from '@helpers/run-timer';

import spawnAltar from '@scripts/spawn-altar';
import spawnSunctum from '@scripts/spawn-sunctum';
import spawnWave from '@scripts/spawn-wave';

import { CREEPS } from '@constants/creeps.constants';
import { GAME } from '@constants/game.constants';

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
    const unitId = CREEPS[wave].unit;
    const name = CREEPS[wave].name;
    const interval = CREEPS[wave].interval;
    const spawnsCap = CREEPS[wave].spawns;
    const spawnType = CREEPS[wave].spawnType;

    QuestMessageBJ(
      GetPlayersAll() as force,
      bj_QUESTMESSAGE_UNITACQUIRED,
      `|cffffcc00Wave ${wave}|r
|cffffcc00${spawnsCap}|r spawns of |cffffcc00${name}|r`
    );

    spawnWave(FourCC(unitId), spawnsCap, interval, spawnType, updateWave);
  }

  initLeaderboard();
  startWave(); // Init first Wave
}
