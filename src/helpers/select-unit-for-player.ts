import { MapPlayer, Unit } from 'w3ts';

export function selectUnitForPlayer(unitClass: Unit, mapPlayer: MapPlayer) {
  const player: player = mapPlayer.handle;
  const unit: unit = unitClass.handle;

  SelectUnitForPlayerSingle(unit, player);
}
