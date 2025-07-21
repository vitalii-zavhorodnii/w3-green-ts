import gameSegment from '@segments/game.segment';

import autoBuildTrigger from '@triggers/autobuild.trigger';
import autoUpgradeTrigger from '@triggers/autoupgrade.trigger';
import blinkTrigger from '@triggers/blink.trigger';
import checkOverCapTrigger from '@triggers/check-overcap.trigger';
import creepLootTrigger from '@triggers/creep-loot.trigger';
import creepsCleanTrigger from '@triggers/creeps-clean.trigger';

import createQuestLog from '@scripts/create-questlog';
import runTimer from '@scripts/helpers/run-timer';
import playersSettings from '@scripts/players-settings';

import bloodlustSpell from '@spells/bloodlust.spell';
import boomSpell from '@spells/boom';
import freezingShotSpell from '@spells/freezing-shot.spell';
import lightningStrikeSpell from '@spells/lightning-strike.spell';

import archerDecoration from '@decorations/archer.decoration';
import felguardDecoration from '@decorations/felguard.decoration';
import lumbermillDecoration from '@decorations/lumbermill.decoration';
import necromantDecoration from '@decorations/necromant.decoration';
import shadeDecoration from '@decorations/shade.decoration';
import treantDecoration from '@decorations/treant.decoration';
import wispsDeocration from '@decorations/wisps.decoratation';

import { GAME } from '@constants/game.constants';

export default function preparationSegment() {
  // Create players and apply settings
  playersSettings();
  creepLootTrigger();
  createQuestLog();
  checkOverCapTrigger();

  // Register triggers
  autoBuildTrigger();
  autoUpgradeTrigger();
  creepsCleanTrigger();
  blinkTrigger();

  // Activate decoration
  wispsDeocration();
  treantDecoration();
  necromantDecoration();
  shadeDecoration();
  felguardDecoration();
  archerDecoration();
  lumbermillDecoration();

  // Register Spell triggers
  lightningStrikeSpell();
  freezingShotSpell();
  bloodlustSpell();
  boomSpell();

  // Message
  QuestMessageBJ(
    GetPlayersAll() as force,
    bj_QUESTMESSAGE_DISCOVERED,
    `|cffffcc00Green Circle TS|r will begin shortly!`
  );

  // Activate main game segment
  runTimer(gameSegment, GAME.startSegmentTimer, false, 'Preparation');
}
