"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subparameters_1 = require("../../../../parsers/w3x/wtg/subparameters");
let initialized = false;
let transformers;
function preset(name) {
    return function (data, object) {
        const subParameters = new subparameters_1.default();
        subParameters.name = name;
        subParameters.type = data.triggerData.getFunctionType(name);
        object.value = name;
        object.type = 2;
        object.subParameters = subParameters;
        return true;
    };
}
function initialize() {
    if (!initialized) {
        initialized = true;
        transformers = {
            bj_forLoopAIndex: preset('GetForLoopIndexA'),
            bj_forLoopBIndex: preset('GetForLoopIndexB'),
            bj_queuedExecTotal: preset('QueuedTriggerCountBJ'),
            bj_mapInitialCameraBounds: preset('GetCameraBoundsMapRect'),
            bj_mapInitialPlayableArea: preset('GetPlayableMapRect'),
            bj_lastCreatedWeatherEffect: preset('GetLastCreatedWeatherEffect'),
            bj_lastCreatedTerrainDeformation: preset('GetLastCreatedTerrainDeformation'),
            bj_lastCreatedLightning: preset('GetLastCreatedLightningBJ'),
            bj_lastCreatedFogModifier: preset('GetLastCreatedFogModifier'),
            bj_lastCreatedImage: preset('GetLastCreatedImage'),
            bj_lastCreatedUbersplat: preset('GetLastCreatedUbersplat'),
            bj_lastPlayedSound: preset('GetLastPlayedSound'),
            bj_lastPlayedMusic: preset('GetLastPlayedMusic'),
            bj_useDawnDuskSounds: preset('IsDawnDuskEnabled'),
            bj_lastCreatedEffect: preset('GetLastCreatedEffectBJ'),
            bj_lastCreatedItem: preset('GetLastCreatedItem'),
            bj_lastRemovedItem: preset('GetLastRemovedItem'),
            bj_lastCreatedUnit: preset('GetLastCreatedUnit'),
            bj_lastReplacedUnit: preset('GetLastReplacedUnitBJ'),
            bj_lastCreatedDestructable: preset('GetLastCreatedDestructable'),
            bj_FORCE_ALL_PLAYERS: preset('GetPlayersAll'),
            bj_lastCreatedButton: preset('GetLastCreatedButtonBJ'),
            bj_lastCreatedQuest: preset('GetLastCreatedQuestBJ'),
            bj_lastCreatedQuestItem: preset('GetLastCreatedQuestItemBJ'),
            bj_lastCreatedDefeatCondition: preset('GetLastCreatedDefeatConditionBJ'),
            bj_lastStartedTimer: preset('GetLastCreatedTimerBJ'),
            bj_lastCreatedTimerDialog: preset('GetLastCreatedTimerDialogBJ'),
            bj_lastCreatedLeaderboard: preset('GetLastCreatedLeaderboard'),
            bj_lastCreatedMultiboard: preset('GetLastCreatedMultiboard'),
            bj_lastCreatedTextTag: preset('GetLastCreatedTextTag'),
            bj_lastTransmissionDuration: preset('GetLastTransmissionDurationBJ'),
            bj_lastCreatedGameCache: preset('GetLastCreatedGameCacheBJ'),
            bj_lastCreatedHashtable: preset('GetLastCreatedHashtableBJ'),
            bj_lastLoadedUnit: preset('GetLastRestoredUnitBJ'),
            bj_lastHauntedGoldMine: preset('GetLastHauntedGoldMine'),
        };
    }
}
function transformPreset(data, parameter) {
    if (!initialized) {
        initialize();
    }
    const transform = transformers[parameter.value];
    if (transform) {
        return transform(data, parameter);
    }
    return false;
}
exports.default = transformPreset;
//# sourceMappingURL=presets.js.map