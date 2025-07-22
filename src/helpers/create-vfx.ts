import { Effect, Timer } from 'w3ts';

export default function createVFX(name: string, x: number, y: number, time = 2) {
  const effect = Effect.create(name, x, y);
  const timer = Timer.create();

  timer.start(time, false, function () {
    effect?.destroy();
    timer.destroy();
  });
}
