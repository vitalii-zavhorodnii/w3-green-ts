import { Quest } from 'w3ts';

export default function createQuestLog() {
  const qAttackTypes = Quest.create() as Quest;
  qAttackTypes.setIcon('ReplaceableTextures\\CommandButtons\\BTNImpalingBolt.blp');
  qAttackTypes.setTitle('Attack types');
  qAttackTypes.setDescription(
    'Each warden has different attack type. Waves of creeps have own armor type, so wardens are stronger or weaker against certain wave. You can view info about attack or armor in unit info panel'
  );
  qAttackTypes.addItem(
    '|cffe1a800Hero|r attacks deal greater damage to |cffe1a800Unarmored|r armor'
  );
  qAttackTypes.addItem(
    '|cff8c8c8cPierce|r attacks deal greater damage to |cff8c8c8cLight Armor|r armor'
  );
  qAttackTypes.addItem(
    '|cff8080ffMagical|r attacks deal greater damage to |cff8080ffHeavy Armor|r armor'
  );
  qAttackTypes.addItem(
    '|cffd45e19Siege|r attacks deal greater damage to |cffd45e19Fortified|r armor'
  );
  qAttackTypes.addItem(
    '|cff008000Chaos|r attacks deal same damage to all armor types'
  );

  const questImports = Quest.create() as Quest;
  questImports.required = false;
  questImports.setTitle('Imported files');
  questImports.addItem('Test addItem');
  questImports.setIcon(
    'ReplaceableTextures\\CommandButtons\\BTNEngineeringUpgrade.blp'
  );
  questImports.setDescription('Test set description');
}
