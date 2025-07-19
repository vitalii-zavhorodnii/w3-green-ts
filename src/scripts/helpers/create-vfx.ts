import { Effect, Timer } from 'w3ts';

export default function createVFX(name: string, x: number, y: number) {
  const effect = Effect.create(name, x, y);
  const timer = Timer.create();

  timer.start(2, false, function () {
    effect?.destroy();
    timer.destroy();
  });
}
