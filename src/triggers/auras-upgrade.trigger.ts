import { Trigger, Unit } from 'w3ts';

import { GAME } from '@constants/game.constants';

export default function aurasUpgradeTrigger(altar: Unit) {
  const trigger = Trigger.create();

  function action() {
    const unit = Unit.fromEvent() as Unit;
    const researchId = GetResearched();

    for (let i = 0; i < GAME.upgrades.length; i++) {
      if (researchId === FourCC(GAME.upgrades[i].upgradeId)) {
        const level = unit.owner.getTechCount(researchId, false);

        altar.setAbilityLevel(FourCC(GAME.upgrades[i].spellId), level);
      }
    }
  }

  function condition() {
    const unit = Unit.fromEvent() as Unit;

    if (unit.owner.id === altar.owner.id) {
      return true;
    }

    return false;
  }

  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_RESEARCH_FINISH);
  trigger.addCondition(condition);
  trigger.addAction(action);
}
