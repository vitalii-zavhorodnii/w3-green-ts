import { Point } from 'w3ts';

import { WAYPOINTS } from '@constants/waypoints.constants';

export default function createWaypoints(): Point[] {
  return WAYPOINTS.map((point) => Point.create(point.x, point.y));
}
