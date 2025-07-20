import { MapPlayer, Timer, Trigger, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import { GAME } from '@constants/game.constants';

export default function bloodlustSpell() {
  const trigger = Trigger.create();
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId);
  const dummyId = FourCC(GAME.dummyId);

  const chance = 30;
  const ability = FourCC('A00C:Agyv'); // Frost Nova
  const abilityDummy = FourCC('A00A:ACbl'); // Frost Nova (dummy)

  function action(): void {
    const victim = Unit.fromHandle(GetAttackedUnitBJ());
    const attacker = Unit.fromHandle(GetAttacker());
    const player = attacker?.getOwner();

    if (attacker && player && victim) {
      const dummy = Unit.create(player, dummyId, victim?.x, victim?.y, 0);
      const level = attacker.getField(UNIT_IF_GOLD_BOUNTY_AWARDED_BASE) as number;

      if (dummy) {
        dummy.setPathing(false);

        dummy.addAbility(abilityDummy);
        dummy.setAbilityLevel(abilityDummy, level);
        dummy.issueTargetOrder(OrderId.Bloodlust, attacker);

        const timer = Timer.create();
        timer.start(1, false, function () {
          dummy.destroy();
          timer.destroy();
        });
      }
    }
  }

  function condition(): boolean {
    const victim = Unit.fromHandle(GetAttackedUnitBJ());
    const attacker = Unit.fromHandle(GetAttacker());

    if (victim?.owner !== enemy) {
      return false;
    }

    if (Number(attacker?.getAbilityLevel(ability)) === 0) {
      return false;
    }

    const random = Math.floor(Math.random() * 100);

    if (chance >= random) {
      return false;
    }

    return true;
  }

  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED);
  trigger.addCondition(condition);
  trigger.addAction(action);
}
