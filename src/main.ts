import { Timer } from 'w3ts';
import { W3TS_HOOK, addScriptHook } from 'w3ts/hooks';

// import preparationSegment from '@segments/preparation.segment';

function initialization() {
  try {
    const u_timer = Timer.create();

    // u_timer.start(0, false, preparationSegment);
  } catch (error) {
    print(`Something went wrong ${error}`);
    print(`Please notice me!`);
  }
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, initialization);
