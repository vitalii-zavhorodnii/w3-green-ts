import { Rectangle, Region } from 'w3ts';

export default function RegionCreatorHelper(
  botLeftX: number,
  botLeftY: number,
  topRightX: number,
  topRightY: number
): region {
  const rectangle = Rectangle.create(botLeftX, botLeftY, topRightX, topRightY);
  const region = Region.create();
  region.addRect(rectangle);

  return region.handle;
}
