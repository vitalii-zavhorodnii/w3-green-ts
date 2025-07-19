import { Timer, Unit } from 'w3ts';
import { OrderId } from 'w3ts/globals';

import createWaypoints from '@scripts/create-waypoints';

const WAYPOINTS = createWaypoints();

export default function fillOrdersQueue(unit: Unit, start: number) {
  let currentOrder = start;

  const timer = Timer.create();

  unit.setPathing(false);
  unit.issuePointOrder(OrderId.Move, WAYPOINTS[currentOrder]);

  timer.start(0.2, true, () => {
    if (!unit.isAlive) {
      timer.destroy();
    }

    if (unit.inRangeOfPoint(WAYPOINTS[currentOrder], 30)) {
      currentOrder++;

      if (currentOrder === WAYPOINTS.length) currentOrder = 0;

      unit.issuePointOrder(OrderId.Move, WAYPOINTS[currentOrder]);
    }

    if (!unit.isAlive) {
      timer.destroy;
    }
  });
}
