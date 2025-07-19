import { MapPlayer, Trigger, Unit, Timer } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import { GAME } from '@constants/game.constants';

export default function freezingShotSpell() {
  const trigger = Trigger.create();
  const enemy = MapPlayer.fromIndex(GAME.enemyPlayerId);
  const dummyId = FourCC(GAME.dummyId);

  const chance = 30;
  const ability = FourCC('A00M:AHad'); // Frost Nova
  const abilityDummy = FourCC('A008:AUfn'); // Frost Nova (dummy)

  function action() {
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
        dummy.issueTargetOrder(OrderId.Frostnova, victim);

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

    if (random >= chance) {
      return false;
    }

    return true;
  }

  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED);
  trigger.addCondition(condition);
  trigger.addAction(action);
}
