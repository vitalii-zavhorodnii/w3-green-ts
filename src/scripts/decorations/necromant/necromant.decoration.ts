import { MapPlayer, Point, Trigger, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import createVFX from '@helpers/create-vfx';
import randomize from '@helpers/randomize';
import runTimer from '@helpers/run-timer';

import necromantCircleTrigger from '@decorations/necromant/necromant-cicle.trigger';

import { DECOR } from '@constants/decorations.constants';
import { GAME } from '@constants/game.constants';
import { VFX } from '@constants/vfx.constants';

export default function necromantDecoration() {
  const points = DECOR.necro.points;
  const trigger = Trigger.create();
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId) as MapPlayer;

  let spellPoint = [points[0][0], points[0][1]];

  const mage = Unit.create(
    enemy,
    FourCC(DECOR.necro.unit),
    DECOR.necro.spawn.x,
    DECOR.necro.spawn.y
  ) as Unit;

  mage.invulnerable = true;

  function action() {
    const rngModel = randomize(DECOR.zombies.length);
    const modelId = FourCC(DECOR.zombies[rngModel]);

    const undead = Unit.create(enemy, modelId, spellPoint[0], spellPoint[1]) as Unit;

    createVFX(VFX.AnimateDead, spellPoint[0], spellPoint[1]);

    const movePoint = Point.create(DECOR.necro.ritual.x, DECOR.necro.ritual.y);

    undead.invulnerable = true;
    undead.issuePointOrder(OrderId.Move, movePoint);

    runTimer(function () {
      const random = randomize(points.length);
      const point = Point.create(points[random][0], points[random][1]) as Point;

      spellPoint = [point.x, point.y];

      mage?.issuePointOrder(OrderId.Absorb, point);
    }, 3);
  }

  function condition() {
    const abilityId = GetSpellAbilityId();

    if (mage.getAbilityLevel(abilityId) === 0) {
      return false;
    }

    return true;
  }

  trigger.registerUnitEvent(mage, EVENT_UNIT_SPELL_FINISH);
  trigger.addCondition(condition);
  trigger.addAction(action);

  necromantCircleTrigger();
  action();
}
