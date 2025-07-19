import { MapPlayer } from 'w3ts';

import checkOverCapTrigger from '@triggers/leaderboard/check-overcap.trigger';
import updatePlayerOnlineTrigger from '@triggers/leaderboard/player-online.trigger';
import updateScoreTrigger from '@triggers/leaderboard/update-score.trigger';

import { GAME } from '@constants/game.constants';

export default function initLeaderboard() {
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;
  const playersCount = 0;
  const playerScore = [0, 0, 0, 0, 0, 0];

  let cap = 0;

  // Define count players
  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
      playersCount + 1;
    }
  }

  const leaderboardLUA = CreateLeaderboardBJ(
    GetPlayersAll() as force,
    'Score'
  ) as leaderboard;

  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
      const playerName = `${GAME.playerColor[i].code}${player.name}|r`;

      LeaderboardAddItemBJ(
        player.handle,
        leaderboardLUA,
        playerName,
        playerScore[i]
      );

      cap = cap + GAME.capPerPlayer;
    }
  }

  LeaderboardAddItemBJ(enemy?.handle, leaderboardLUA, `Cap: ${cap}`, 0);

  function updateKills(playerId: number) {
    const player = MapPlayer.fromIndex(playerId) as MapPlayer;

    playerScore[playerId] = playerScore[playerId] + 1;

    LeaderboardSetPlayerItemValueBJ(
      player.handle,
      leaderboardLUA,
      playerScore[playerId]
    );
  }
  updateScoreTrigger(updateKills);

  function updateSpawnedCount(count: number) {
    LeaderboardSetPlayerItemValueBJ(enemy.handle, leaderboardLUA, count);
  }
  checkOverCapTrigger(cap, updateSpawnedCount);

  function updateNames(playerId: number) {
    const player = MapPlayer.fromIndex(playerId) as MapPlayer;

    LeaderboardSetPlayerItemLabelBJ(player.handle, leaderboardLUA, 'Left the game');
  }
  updatePlayerOnlineTrigger(updateNames);

  LeaderboardDisplayBJ(true, leaderboardLUA);
}
