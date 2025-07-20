import gameSegment from '@segments/game.segment';

import autoBuildTrigger from '@triggers/autobuild.trigger';
import autoUpgradeTrigger from '@triggers/autoupgrade.trigger';
import blinkTrigger from '@triggers/blink.trigger';
import creepLootTrigger from '@triggers/creep-loot.trigger';
import creepsCleanTrigger from '@triggers/creeps-clean.trigger';

import runTimer from '@scripts/helpers/run-timer';
import playersSettings from '@scripts/players-settings';
import createQuestLog from '@scripts/quests/create-questlog';

import bloodlustSpell from '@spells/bloodlust.spell';
import boomSpell from '@spells/boom';
import freezingShotSpell from '@spells/freezing-shot.spell';
import lightningStrikeSpell from '@spells/lightning-strike.spell';

import necromantDecoration from '@decorations/necromant/necromant.decoration';
import shadeDecoration from '@decorations/shade.decoration';
import treantDecoration from '@decorations/treant.decoration';
import wispsDeocration from '@decorations/wisps.decoratation';

import { GAME } from '@constants/game.constants';

export default function preparationSegment() {
  // Message
  QuestMessageBJ(
    GetPlayersAll() as force,
    bj_QUESTMESSAGE_DISCOVERED,
    `|cffffcc00Green Circle TS|r will begin shortly!`
  );

  // Activate decoration animations
  wispsDeocration();
  treantDecoration();
  necromantDecoration();
  shadeDecoration();

  // Register triggers
  autoBuildTrigger();
  autoUpgradeTrigger();
  creepsCleanTrigger();
  blinkTrigger();

  // Register Spell triggers
  lightningStrikeSpell();
  freezingShotSpell();
  bloodlustSpell();
  boomSpell();

  // Create players and apply settings
  playersSettings();
  creepLootTrigger();
  createQuestLog();

  // Activate main game segment
  runTimer(gameSegment, GAME.startSegmentTimer, false, 'Preparation');
}
