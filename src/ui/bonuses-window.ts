import { Frame, MapPlayer, Trigger } from 'w3ts';

// import { UI_FRAMES } from '@constants/ui.constants';
const SETTINGS = {
  bonusPositions: [
    [0.17, 0.36],
    [0.4, 0.36],
    [0.62, 0.36]
  ],
  icons: [
    'ReplaceableTextures\\CommandButtons\\BTNMarkOfFire.blp',
    'ReplaceableTextures\\CommandButtons\\BTNReveal.blp',
    'ReplaceableTextures\\CommandButtons\\BTNSpellBreakerMagicDefend.blp'
  ],
  text: [
    'Gives a |cffffcc00<A00K:AOcr,DataA17>%|r chance to do |cffffcc00<A00K:AOcr,DataB17>|r times normal damage on an attack.',
    'Inflicts debuff on enemy, on explode cursed unit has a chance to explode and deal |cffffcc00<A00S:AHtc,DataA7>|r ',
    'Calls forth a bolt of lightning that bounces up to |cffffcc00<A003:AOcl,DataB30>|r times, dealing |cffffcc00<A003:AOcl,DataA30>|r damage on each target'
  ]
};

export default function bonusesWindow() {
  const trigger = Trigger.create();
  const frameButtons: Array<Frame> = [];
  const frameBonuses: Array<Frame> = [];
  const frameDescriptions: Array<Frame> = [];
  const frameIcons: Array<Frame> = [];

  // Importing TOC file!
  const toc = BlzLoadTOCFile('FramesUI\\Templates.toc');
  if (!toc) print('|cffff0000Error reading .toc|r');

  const parent = Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0) as Frame;

  for (let i = 0; i < SETTINGS.bonusPositions.length; i++) {
    // BORDER Create and setup border
    const frameBonus = Frame.create('EscMenuBackdrop', parent, 0, 0) as Frame;
    frameBonus.setSize(0.2, 0.3);
    frameBonus.setAbsPoint(FRAMEPOINT_CENTER, SETTINGS.bonusPositions[i][0], 0.36);

    frameBonuses.push(frameBonus);

    const frameDescription = Frame.createType(
      'BonusText',
      frameBonus,
      1,
      'TEXT',
      ''
    ) as Frame;
    frameDescription.setSize(0.13, 0.2);
    frameDescription.setText(SETTINGS.text[i]);
    frameDescription.setAbsPoint(
      FRAMEPOINT_CENTER,
      SETTINGS.bonusPositions[i][0],
      0.27
    );

    frameDescriptions.push(frameDescription);

    const frameIcon = Frame.createType(
      'BonusIcon',
      frameBonus,
      1,
      'BACKDROP',
      ''
    ) as Frame;
    frameIcon.setSize(0.05, 0.05);
    frameIcon.setTexture(SETTINGS.icons[i], 0, true);
    frameIcon.setAbsPoint(FRAMEPOINT_CENTER, SETTINGS.bonusPositions[i][0], 0.43);

    frameIcons.push(frameIcon);

    // BUTTON PICK
    const frameButtonOk = Frame.create(
      'ScriptDialogButton',
      frameBonus,
      0,
      0
    ) as Frame;
    frameButtonOk.setSize(0.13, 0.03);
    frameButtonOk.setAbsPoint(
      FRAMEPOINT_CENTER,
      SETTINGS.bonusPositions[i][0],
      0.26
    );
    frameButtonOk.setText('Claim ' + i);

    frameButtons.push(frameButtonOk);
  }

  function action(): void {
    const a = Frame.fromHandle(BlzGetTriggerFrame()) as Frame;
    const player = MapPlayer.fromEvent() as MapPlayer;

    print('ACTION!', player.name, a.text);

    for (let i = 0; i < SETTINGS.bonusPositions.length; i++) {
      frameButtons[i].destroy();
      frameIcons[i].destroy();
      frameBonuses[i].destroy();
      frameDescriptions[i].destroy();
    }
  }

  trigger.addAction(action);
  trigger.triggerRegisterFrameEvent(frameButtons[0], FRAMEEVENT_CONTROL_CLICK);
  trigger.triggerRegisterFrameEvent(frameButtons[1], FRAMEEVENT_CONTROL_CLICK);
  trigger.triggerRegisterFrameEvent(frameButtons[2], FRAMEEVENT_CONTROL_CLICK);
}
