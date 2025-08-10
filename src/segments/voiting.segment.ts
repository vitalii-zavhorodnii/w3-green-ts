import { Dialog, DialogButton, MapPlayer } from 'w3ts';

import voitingDifficultyTrigger from './voiting-difficulty.trigger';

import gameSegment from '@segments/game.segment';

import spawnPlayers from '@scripts/spawn-players';

import runTimer from '@helpers/run-timer';

import { GAME } from '@constants/game.constants';

export default function voitingSegment(): void {
  const dialog = Dialog.create() as Dialog;
  const btnClassic = dialog.addButton('Classic') as DialogButton;
  const btnHard = dialog.addButton('Hard') as DialogButton;

  let players = 0;
  let classic = 0;
  let hard = 0;

  dialog.setMessage('Choose difficulty');

  function updateResults(value: 'CLASSIC' | 'HARD', player: MapPlayer): void {
    if (value === 'CLASSIC') classic++;
    if (value === 'HARD') hard++;

    QuestMessageBJ(
      GetPlayersAll() as force,
      bj_QUESTMESSAGE_ITEMACQUIRED,
      `${GAME.playerColor[player.id].code}${player.name}|r has voited for |cffffcc00${value}|r difficulty`
    );

    dialog.display(player, false);
  }

  function endVoiting(): void {
    if (hard > classic) {
      gg_game_Difficulty = 'HARD';
    } else {
      gg_game_Difficulty = 'CLASSIC';
    }

    QuestMessageBJ(
      GetPlayersAll() as force,
      bj_QUESTMESSAGE_ITEMACQUIRED,
      `Difficulty has set to |cffffcc00${gg_game_Difficulty}|r`
    );

    for (let i = 0; i < GAME.maxPlayers; i++) {
      const player = MapPlayer.fromIndex(i) as MapPlayer;

      dialog.display(player, false);
    }

    dialog.destroy();

    spawnPlayers();

    runTimer(gameSegment, GAME.startSegmentTimer, false, 'Game starts in');
  }

  voitingDifficultyTrigger(btnClassic, updateResults, 'CLASSIC');
  voitingDifficultyTrigger(btnHard, updateResults, 'HARD');

  for (let i = 0; i < GAME.maxPlayers; i++) {
    const player = MapPlayer.fromIndex(i) as MapPlayer;

    players++;
    dialog.display(player, true);
  }

  runTimer(endVoiting, GAME.voitingSegmentTimer, false, 'Voiting');
}
