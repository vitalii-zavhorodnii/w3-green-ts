import { Rectangle, Region } from 'w3ts';

export default function createRegion(
  botLeftX: number,
  botLeftY: number,
  topRightX: number,
  topRightY: number
): Region {
  const rectangle = Rectangle.create(botLeftX, botLeftY, topRightX, topRightY);
  const region = Region.create();
  region.addRect(rectangle);

  return region;
}
