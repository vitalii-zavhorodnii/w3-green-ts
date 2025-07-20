import { Point, Trigger, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import { WAYPOINTS } from '@constants/waypoints.constants';

export default function orderCreep(unit: Unit, start: number) {
  const trigger = Trigger.create();
  let waypoints: Point[] = [];
  let currentOrder = start;

  for (const waypoint of WAYPOINTS) {
    const point = Point.create(waypoint.point[0], waypoint.point[1]) as Point;
    waypoints.push(point);
  }

  unit.setPathing(false);
  unit.issuePointOrder(OrderId.Move, waypoints[currentOrder]);

  function action(): void {
    // if unit died - remove created variables and trigger
    if (!unit.isAlive) {
      for (const waypoint of waypoints) {
        waypoint.destroy();
        trigger.destroy();
      }
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
