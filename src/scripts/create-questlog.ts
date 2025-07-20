import { Quest } from 'w3ts';

import { QUESTS } from '@constants/quests.constants';

export default function createQuestLog() {
  for (const quest of QUESTS) {
    const questObj = Quest.create() as Quest;

    questObj.setIcon(quest.icon);
    questObj.setTitle(quest.title);
    questObj.setDescription(quest.description);

    if (quest.isOptional) {
      questObj.required = false;
    }

    for (const item of quest.items) {
      questObj.addItem(item);
    }
  }
}
