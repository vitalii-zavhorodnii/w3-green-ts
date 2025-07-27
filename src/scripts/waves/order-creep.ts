import { Point, Trigger, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

export default function orderCreep(unit: Unit, start: number, waypoints: Point[]) {
  const trigger = Trigger.create();

  let currentOrder = start;

  unit.setPathing(false);
  unit.issuePointOrder(OrderId.Move, waypoints[currentOrder]);

  function action(): void {
    // if unit died - remove created variables and trigger
    if (!unit.isAlive) {
      trigger.destroy();
    }
    // if unit in range of current order, give next
    if (unit.inRangeOfPoint(waypoints[currentOrder], 50)) {
      currentOrder++;
      // if waypoints list is ended - set current to 0
      if (currentOrder === waypoints.length) {
        currentOrder = 0;
      }

      unit.issuePointOrder(OrderId.Move, waypoints[currentOrder]);
    }
  }

  trigger.registerTimerEvent(0.5, true);
  trigger.addAction(action);
}
