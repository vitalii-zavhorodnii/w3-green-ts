import voitingSegment from '@segments/voiting.segment';

import autoBuildTrigger from '@triggers/autobuild.trigger';
import autoUpgradeTrigger from '@triggers/autoupgrade.trigger';
import blinkTrigger from '@triggers/blink.trigger';
import checkOverCapTrigger from '@triggers/check-overcap.trigger';
import creepLootTrigger from '@triggers/creep-loot.trigger';
import creepsCleanTrigger from '@triggers/creeps-clean.trigger';
import sellTowerTrigger from '@triggers/sell-tower.trigger';

import createQuestLog from '@scripts/create-questlog';
import playersSettings from '@scripts/players-settings';
import bonusesWindow from '@ui/bonuses-window';
import showWaveInfo from '@ui/show-wave-info';

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
import wispsDecoration from '@decorations/wisps.decoratation';

export default function preparationSegment() {
  // Create players and apply settings
  playersSettings();
  creepLootTrigger();
  createQuestLog();
  checkOverCapTrigger();

  // Register triggers
  autoBuildTrigger();
  autoUpgradeTrigger();
  sellTowerTrigger();
  creepsCleanTrigger();
  blinkTrigger();

  // Activate decoration
  wispsDecoration();
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

  // UI
  // showWaveInfo();
  // bonusesWindow();

  // Activate main game segment
  voitingSegment();
}
