import { Trigger, Unit } from 'w3ts';

import { GAME } from '@constants/game.constants';

export default function aurasUpgradeTrigger(altar: Unit) {
  const trigger = Trigger.create();

  function action(): void {
    const unit = Unit.fromEvent() as Unit;
    const researchId = GetResearched();

    for (const upgrade of GAME.upgrades) {
      if (researchId === FourCC(upgrade.upgradeId)) {
        const level = unit.owner.getTechCount(researchId, false);

        altar.setAbilityLevel(FourCC(upgrade.spellId), level);
      }
    }
  }

  function condition(): boolean {
    const unit = Unit.fromEvent() as Unit;

    if (unit.owner.id === altar.owner.id) {
      return true;
    }

    return false;
  }

  trigger.addCondition(condition);
  trigger.addAction(action);
  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_RESEARCH_FINISH);
}
