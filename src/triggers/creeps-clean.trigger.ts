import { Timer, Trigger, Unit } from 'w3ts';

export default function creepsCleanTrigger() {
  const trigger = Trigger.create();

  function action(): void {
    const timer = Timer.create();

    const unit = Unit.fromHandle(GetDyingUnit()) as Unit;

    timer.start(15, false, function () {
      unit.destroy();
      timer.destroy();
    });
  }

  trigger.addAction(action);
  trigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DEATH);
}
