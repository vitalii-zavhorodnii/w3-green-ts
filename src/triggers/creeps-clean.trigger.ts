import { Timer, Trigger, Unit } from 'w3ts';

export default function creepsCleanTrigger() {
  const trigger = Trigger.create();

  function action() {
    const timer = Timer.create();

    const unit = Unit.fromHandle(GetDyingUnit());

    if (unit) {
      timer.start(15, false, function () {
        unit.destroy();
        timer.destroy();
      });
    }
  }

  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH);
  trigger.addAction(action);
}
