import { Trigger, Unit } from 'w3ts';

import createVFX from '@helpers/create-vfx';

import { VFX } from '@constants/vfx.constants';

export default function sellTowerTrigger() {
  const trigger = Trigger.create();

  function action() {
    const unit = Unit.fromHandle(GetTriggerUnit()) as Unit;

    const balance = Math.round(
      unit.owner.getState(PLAYER_STATE_RESOURCE_GOLD) + unit.pointValue
    );

    unit.owner.setState(PLAYER_STATE_RESOURCE_GOLD, balance);

    createVFX(VFX.Teleport, unit.x, unit.y);
    unit.destroy();
  }

  function condition() {
    const abilityId = GetSpellAbilityId();

    if (FourCC('A00X:ANcl') !== abilityId) {
      return false;
    }

    return true;
  }

  trigger.addAction(action);
  trigger.addCondition(condition);
  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_FINISH);
}
