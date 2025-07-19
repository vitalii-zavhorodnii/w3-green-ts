import { Timer, TimerDialog } from 'w3ts';

export default function runTimer(
  callback?: () => void,
  time = 1,
  periodic = false,
  title: string | null = null
): Timer {
  const timer = Timer.create() as Timer;
  const dialog = TimerDialog.create(timer) as TimerDialog;

  timer.start(time, periodic, function () {
    if (callback) callback();
    if (!periodic) timer.destroy();

    dialog?.destroy();
  });

  if (title && dialog) {
    dialog.setTitle(title);
    dialog.display = true;
  }

  return timer;
}
