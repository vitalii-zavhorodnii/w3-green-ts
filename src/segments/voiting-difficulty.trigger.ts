import { DialogButton, MapPlayer, Trigger } from 'w3ts';

export default function voitingDifficultyTrigger(
  button: DialogButton,
  callback: (value: 'CLASSIC' | 'HARD', player: MapPlayer) => void,
  difficulty: 'CLASSIC' | 'HARD'
): void {
  const trigger = Trigger.create();

  function action(): void {
    const player = MapPlayer.fromEvent() as MapPlayer;

    callback(difficulty, player);
  }

  trigger.addAction(action);
  trigger.registerDialogButtonEvent(button);
}
