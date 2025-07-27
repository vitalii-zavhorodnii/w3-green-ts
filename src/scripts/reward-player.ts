import { MapPlayer, Unit } from 'w3ts';

export default function rewardPlayer(
  player: MapPlayer,
  victim: Unit,
  bounty: number
) {
  const balance = Math.round(player.getState(PLAYER_STATE_RESOURCE_GOLD) + bounty);

  player.setState(PLAYER_STATE_RESOURCE_GOLD, balance);

  // Float text!

  const str = `|cffffcc00+${bounty}|r`;

  const t = CreateTextTagUnitBJ(
    str,
    victim.handle,
    0,
    10,
    255,
    255,
    255,
    0
  ) as texttag;
  SetTextTagPermanentBJ(t, false);
  SetTextTagLifespanBJ(t, 2);
  SetTextTagFadepointBJ(t, 1);
  SetTextTagVelocityBJ(t, 60.0, 90);
}
