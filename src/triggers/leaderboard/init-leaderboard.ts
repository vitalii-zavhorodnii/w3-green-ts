import { MapPlayer } from 'w3ts';

import updatePlayerOnlineTrigger from '@triggers/leaderboard/player-online.trigger';
import updateScoreTrigger from '@triggers/leaderboard/update-score.trigger';

import { GAME } from '@constants/game.constants';

export default function initLeaderboard() {
  const leaderboardLUA = CreateLeaderboardBJ(
    GetPlayersAll() as force,
    'Score'
  ) as leaderboard;

  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    if (player.slotState === PLAYER_SLOT_STATE_PLAYING) {
      const playerName = `${GAME.playerColor[i].code}${player.name}|r`;

      LeaderboardAddItemBJ(player.handle, leaderboardLUA, playerName, 0);
    }
  }

  LeaderboardDisplayBJ(true, leaderboardLUA);

  updatePlayerOnlineTrigger(leaderboardLUA);
  updateScoreTrigger(leaderboardLUA);
}
