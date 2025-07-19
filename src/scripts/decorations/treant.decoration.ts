import { Effect, MapPlayer, Timer, Unit } from 'w3ts';

import { GAME } from '@constants/game.constants';

const TREANT = {
  model: FourCC('etoe'),
  x: 384.4,
  y: 1305.3,
  animation: 'stand birth alternate work upgrade first second'
};

const STATUE = {
  x: 773.2,
  y: 1389.7,
  animation: 'AbilitiesSpellsNightElfStarfallStarfallCaster.mdl'
};

export default function treantDecoration() {
  const player = MapPlayer.fromIndex(GAME.decorPlayerId);

  if (player) {
    const unit = Unit.create(player, TREANT.model, TREANT.x, TREANT.y);

    if (unit) {
      unit.invulnerable = true;
      unit.queueAnimation(TREANT.animation);
    }
  }

  const timer = Timer.create();
  timer.start(36.4, true, function () {
    const t = Timer.create();
    const effect = Effect.create(STATUE.animation, STATUE.x, STATUE.y);

    t.start(5, false, function () {
      effect?.destroy();
      t.destroy();
    });
  });
}
