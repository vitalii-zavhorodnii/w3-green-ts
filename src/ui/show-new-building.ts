import { Frame, Trigger } from 'w3ts';

import runTimer from '@helpers/run-timer';

export default function showNewBuilding(
  icon: string,
  name: string,
  description: string
) {
  let alpha = 0;

  let infoFrame: Frame;
  let iconFrame: Frame;
  let descFrame: Frame;

  // Importing TOC file!
  const toc = BlzLoadTOCFile('FramesUI\\Templates.toc');
  if (!toc) print('|cffff0000Error reading .toc|r');

  const parent = Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0) as Frame;

  // BORDER Create and setup border
  infoFrame = Frame.create('EscMenuBackdrop', parent, 0, 0) as Frame;
  infoFrame.setSize(0.25, 0.08);
  infoFrame.setAlpha(alpha);
  infoFrame.setAbsPoint(FRAMEPOINT_TOP, 0.4, 0.55);
  // ICON
  iconFrame = Frame.createType('BonusIcon', infoFrame, 1, 'BACKDROP', '') as Frame;
  iconFrame.setSize(0.028, 0.028);
  iconFrame.setPoint(FRAMEPOINT_LEFT, infoFrame, FRAMEPOINT_LEFT, 0.03, 0.0);
  iconFrame.setTexture(icon, 0, true);
  // TEXT
  descFrame = Frame.createType('BonusText', infoFrame, 1, 'TEXT', '') as Frame;

  descFrame.setSize(0.2, 0.025);
  descFrame.setPoint(FRAMEPOINT_LEFT, iconFrame, FRAMEPOINT_RIGHT, 0.007, 0);
  descFrame.setText(`${name}|r|n${description}`);
  // SOUND
  QuestMessageBJ(GetPlayersAll() as force, bj_QUESTMESSAGE_ALWAYSHINT, `|cffffcc00|r`);
  // FADEIN
  const fadeTimer = runTimer(
    () => {
      if (alpha >= 250) {
        infoFrame.setAlpha(255);

        fadeTimer.destroy();
      } else {
        alpha += 10;
        infoFrame.setAlpha(alpha);
      }
    },
    0.05,
    true
  );
  // FADEOUT
  runTimer(() => {
    infoFrame.setAlpha(250);

    const fadeTimer = runTimer(
      () => {
        if (alpha <= 0) {
          infoFrame.setAlpha(0);

          fadeTimer.destroy();
          infoFrame.destroy();
          iconFrame.destroy();
          descFrame.destroy();
        } else {
          alpha -= 10;
          infoFrame.setAlpha(alpha);
        }
      },
      0.03,
      true
    );
  }, 5);
}
