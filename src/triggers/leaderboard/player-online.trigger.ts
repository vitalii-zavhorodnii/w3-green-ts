import { MapPlayer, Trigger } from 'w3ts';

import { GAME } from '@constants/game.constants';

export default function updatePlayerOnlineTrigger(leaderboardLUA: leaderboard) {
  const trigger = Trigger.create();

  function action() {
    const player = MapPlayer.fromEvent() as MapPlayer;

    QuestMessageBJ(
      GetPlayersAll() as force,
      bj_QUESTMESSAGE_HINT,
      `${GAME.playerColor[player.id]}${player}|r |cffffcc00has left the game|r`
    );

    LeaderboardSetPlayerItemLabelBJ(player.handle, leaderboardLUA, 'Left the game');
  }

  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;
    trigger.registerPlayerEvent(player, EVENT_PLAYER_LEAVE);
  }

  trigger.addAction(action);
}
