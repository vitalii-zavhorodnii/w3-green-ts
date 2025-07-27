import { Frame, MapPlayer, Trigger } from 'w3ts';

// import { UI_FRAMES } from '@constants/ui.constants';

export default function showWaveInfo() {
  const trigger = Trigger.create();

  // Importing TOC file!
  const toc = BlzLoadTOCFile('FramesUI\\Templates.toc');
  if (!toc) print('|cffff0000Error reading .toc|r');

  const frameHandle = BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0) as framehandle;
  const parent = Frame.fromHandle(frameHandle) as Frame;

  print('parent.id', parent.id);

  const waveHandle = BlzCreateFrame('WAVE_BACKDROP', frameHandle, 0, 0);
  const waveContainer = Frame.fromHandle(waveHandle) as Frame;
  print('waveHandle', waveHandle);
  print('waveContainer.id', waveContainer.id);
  // SetPoint TOPLEFT, "WAVE_INFO", 0.4, 0.3,

  const btnFrame = Frame.fromName('WAVE_BACKDROP', 0) as Frame;
  const btnIcon = Frame.fromName('WAVE_ICON', 0) as Frame;
  print('btnFrame', btnFrame.id);
  print('btnIcon', btnIcon.id);

  function action(): void {
    // const player = MapPlayer.fromEvent() as MapPlayer;
    print('ACTION!');
    // parent.visible = false;
    // BlzFrameSetVisibleForPlayer()
  }

  trigger.addAction(action);
  trigger.triggerRegisterFrameEvent(parent, FRAMEEVENT_CONTROL_CLICK);
}

// Функция обновления информации
