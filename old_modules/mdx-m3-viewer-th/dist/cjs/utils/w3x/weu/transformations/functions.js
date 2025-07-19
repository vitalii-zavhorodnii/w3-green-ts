"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformer_1 = require("./transformer");
const specific_1 = require("./specific");
const blz_1 = require("./blz");
let initialized = false;
let transformers;
function rename(name) {
    return transformer_1.default({
        [name]: {}
    });
}
function swap(parameters) {
    return function (name) {
        return transformer_1.default({
            [name]: {
                parameters
            }
        });
    };
}
function initialize() {
    if (!initialized) {
        initialized = true;
        const swap10 = swap([1, 0]);
        const swap102 = swap([1, 0, 2]);
        const swap120 = swap([1, 2, 0]);
        const swap201 = swap([2, 0, 1]);
        const swap210 = swap([2, 1, 0]);
        const swap0231 = swap([0, 2, 3, 1]);
        const swap1023 = swap([1, 0, 2, 3]);
        const swap3012 = swap([3, 0, 1, 2]);
        const swap3201 = swap([3, 2, 0, 1]);
        const swap3210 = swap([3, 2, 1, 0]);
        transformers = {
            UnitId: rename('String2UnitIdBJ'),
            UnitId2String: rename('UnitId2StringBJ'),
            GetObjectName: rename('GetAbilityName'),
            // Math API
            Sin: transformer_1.default({
                SinBJ: {
                    parameters: [[0, '/', Math.PI / 180]]
                }
            }),
            Cos: transformer_1.default({
                CosBJ: {
                    parameters: [[0, '/', Math.PI / 180]]
                }
            }),
            Tan: transformer_1.default({
                TanBJ: {
                    parameters: [[0, '/', Math.PI / 180]]
                }
            }),
            // String Utility API
            GetHandleId: rename('GetHandleIdBJ'),
            SubString: transformer_1.default({
                SubStringBJ: {
                    parameters: [0, [1, '+', 1], 2]
                }
            }),
            StringHash: rename('StringHashBJ'),
            GetLocalizedString: rename('StringIdentity'),
            // Map Setup API
            SetMapFlag: transformer_1.default({
                LockGameSpeedBJ: {
                    tests: [[0, 'MAP_LOCK_SPEED'], [1, 'true']],
                    parameters: []
                },
                UnlockGameSpeedBJ: {
                    tests: [[0, 'MAP_LOCK_SPEED'], [1, 'false']],
                    parameters: []
                }
            }),
            SetPlayerColor: transformer_1.default({
                SetPlayerColorBJ: {
                    parameters: [0, 1, 'PlayerChangeColorRetain']
                }
            }),
            SetPlayerAlliance: swap0231('SetPlayerAllianceBJ'),
            SetPlayerTaxRate: swap3201('SetPlayerTaxRateBJ'),
            SetPlayerOnScoreScreen: swap10('SetPlayerOnScoreScreenBJ'),
            GetPlayerTaxRate: swap201('GetPlayerTaxRateBJ'),
            // Timer API
            TimerStart: transformer_1.default({
                StartTimerBJ: {
                    test: [3, 'null'],
                    parameters: [0, 2, 1]
                }
            }),
            PauseTimer: transformer_1.default({
                PauseTimerBJ: {
                    parameters: ['PauseResumePause', 0]
                }
            }),
            ResumeTimer: transformer_1.default({
                PauseTimerBJ: {
                    parameters: ['PauseResumeResume', 0]
                }
            }),
            // Group API
            GroupAddUnit: swap10('GroupAddUnitSimple'),
            GroupRemoveUnit: swap10('GroupRemoveUnitSimple'),
            GroupImmediateOrderById: rename('GroupTrainOrderByIdBJ'),
            // Force API
            ForceAddPlayer: swap10('ForceAddPlayerSimple'),
            ForceRemovePlayer: swap10('ForceRemovePlayerSimple'),
            // Region and Location API
            GetWorldBounds: rename('GetEntireMapRect'),
            // Trigger Game Event API
            TriggerRegisterTimerEvent: transformer_1.default({
                TriggerRegisterTimerEventPeriodic: {
                    test: [2, 'true'],
                    parameters: [0, 1]
                },
                TriggerRegisterTimerEventSingle: {
                    test: [2, 'false'],
                    parameters: [0, 1]
                }
            }),
            TriggerRegisterTimerExpireEvent: rename('TriggerRegisterTimerExpireEventBJ'),
            TriggerRegisterGameStateEvent: transformer_1.default({
                TriggerRegisterGameStateEventTimeOfDay: {
                    test: [1, 'GAME_STATE_TIME_OF_DAY'],
                    parameters: [0, 2, 3]
                }
            }),
            TriggerRegisterDialogEvent: rename('TriggerRegisterDialogEventBJ'),
            TriggerRegisterGameEvent: transformer_1.default({
                TriggerRegisterShowSkillEventBJ: {
                    test: [1, 'EVENT_GAME_SHOW_SKILL'],
                    parameters: [0]
                },
                TriggerRegisterBuildSubmenuEventBJ: {
                    test: [1, 'EVENT_GAME_BUILD_SUBMENU'],
                    parameters: [0]
                },
                TriggerRegisterGameLoadedEventBJ: {
                    test: [1, 'EVENT_GAME_LOADED'],
                    parameters: [0]
                },
                TriggerRegisterGameSavedEventBJ: {
                    test: [1, 'EVENT_GAME_SAVE'],
                    parameters: [0]
                }
            }),
            GetClickedButton: rename('GetClickedButtonBJ'),
            GetClickedDialog: rename('GetClickedDialogBJ'),
            // Trigger Player Based Event API
            TriggerRegisterPlayerEvent: transformer_1.default({
                TriggerRegisterPlayerKeyEventBJ: [
                    {
                        test: [2, 'EVENT_PLAYER_ARROW_LEFT_DOWN'],
                        parameters: [0, 1, 'KeyEventTypeDepress', 'KeyEventKeyLeft']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_ARROW_RIGHT_DOWN'],
                        parameters: [0, 1, 'KeyEventTypeDepress', 'KeyEventKeyRight']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_ARROW_DOWN_DOWN'],
                        parameters: [0, 1, 'KeyEventTypeDepress', 'KeyEventKeyDown']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_ARROW_UP_DOWN'],
                        parameters: [0, 1, 'KeyEventTypeDepress', 'KeyEventKeyUp']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_ARROW_LEFT_UP'],
                        parameters: [0, 1, 'KeyEventTypeRelease', 'KeyEventKeyLeft']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_ARROW_RIGHT_UP'],
                        parameters: [0, 1, 'KeyEventTypeRelease', 'KeyEventKeyRight']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_ARROW_DOWN_UP'],
                        parameters: [0, 1, 'KeyEventTypeRelease', 'KeyEventKeyDown']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_ARROW_UP_UP'],
                        parameters: [0, 1, 'KeyEventTypeRelease', 'KeyEventKeyUp']
                    }
                ],
                TriggerRegisterPlayerMouseEventBJ: [
                    {
                        test: [2, 'EVENT_PLAYER_MOUSE_DOWN'],
                        parameters: [0, 1, 'MouseEventTypeDown']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_MOUSE_UP'],
                        parameters: [0, 1, 'MouseEventTypeUp']
                    },
                    {
                        test: [2, 'EVENT_PLAYER_MOUSE_MOVE'],
                        parameters: [0, 1, 'MouseEventTypeMove']
                    },
                ],
                TriggerRegisterPlayerEventVictory: {
                    test: [2, 'EVENT_PLAYER_VICTORY'],
                    parameters: [0, 1]
                },
                TriggerRegisterPlayerEventDefeat: {
                    test: [2, 'EVENT_PLAYER_DEFEAT'],
                    parameters: [0, 1]
                },
                TriggerRegisterPlayerEventLeave: {
                    test: [2, 'EVENT_PLAYER_LEAVE'],
                    parameters: [0, 1]
                },
                TriggerRegisterPlayerEventAllianceChanged: {
                    test: [2, 'EVENT_PLAYER_ALLIANCE_CHANGED'],
                    parameters: [0, 1]
                },
                TriggerRegisterPlayerEventEndCinematic: {
                    test: [2, 'EVENT_PLAYER_END_CINEMATIC'],
                    parameters: [0, 1]
                }
            }),
            TriggerRegisterPlayerUnitEvent: transformer_1.default({
                TriggerRegisterPlayerUnitEventSimple: {
                    test: [3, 'null'],
                    parameters: [0, 1, 2]
                }
            }),
            GetLearnedSkill: rename('GetLearnedSkillBJ'),
            GetKillingUnit: rename('GetKillingUnitBJ'),
            GetTransportUnit: rename('GetTransportUnitBJ'),
            GetLoadedUnit: rename('GetLoadedUnitBJ'),
            GetIssuedOrderId: rename('GetIssuedOrderIdBJ'),
            // Trigger Unit Based Event API
            TriggerRegisterUnitStateEvent: transformer_1.default({
                TriggerRegisterUnitLifeEvent: {
                    test: [1, 'UNIT_STATE_LIFE'],
                    parameters: [0, 2, 3]
                },
                TriggerRegisterUnitManaEvent: {
                    test: [1, 'UNIT_STATE_MANA'],
                    parameters: [0, 2, 3]
                }
            }),
            TriggerWaitForSound: rename('WaitForSoundBJ'),
            // Widget API
            GetWidgetLife: rename('GetItemLifeBJ'),
            SetWidgetLife: rename('SetItemLifeBJ'),
            // Destructable Object API
            SetDestructableInvulnerable: rename('SetDestructableInvulnerableBJ'),
            IsDestructableInvulnerable: rename('IsDestructableInvulnerableBJ'),
            EnumDestructablesInRect: transformer_1.default({
                EnumDestructablesInRectAll: {
                    test: [1, 'null'],
                    parameters: [0, 2]
                }
            }),
            SetDestructableMaxLife: rename('SetDestructableMaxLifeBJ'),
            QueueDestructableAnimation: rename('QueueDestructableAnimationBJ'),
            SetDestructableAnimation: rename('SetDestructableAnimationBJ'),
            SetDestructableAnimationSpeed: transformer_1.default({
                SetDestAnimationSpeedPercent: {
                    parameters: [0, [1, '*', 100]]
                }
            }),
            ShowDestructable: swap10('ShowDestructableBJ'),
            GetTriggerDestructable: rename('GetDyingDestructable'),
            // Item API
            SetItemDropOnDeath: rename('SetItemDropOnDeathBJ'),
            SetItemDroppable: rename('SetItemDroppableBJ'),
            SetItemPlayer: rename('SetItemPlayerBJ'),
            SetItemInvulnerable: rename('SetItemInvulnerableBJ'),
            SetItemVisible: swap10('SetItemVisibleBJ'),
            IsItemOwned: transformer_1.default({
                CheckItemStatus: {
                    parameters: [0, 'ItemStatusOwned']
                }
            }),
            IsItemPowerup: transformer_1.default({
                CheckItemStatus: {
                    parameters: [0, 'ItemStatusPowerup']
                }
            }),
            IsItemSellable: transformer_1.default({
                CheckItemStatus: {
                    parameters: [0, 'ItemStatusSellable']
                }
            }),
            IsItemPawnable: transformer_1.default({
                CheckItemStatus: {
                    parameters: [0, 'ItemStatusPawnable']
                }
            }),
            IsItemIdPowerup: transformer_1.default({
                CheckItemcodeStatus: {
                    parameters: [0, 'ItemcodeStatusPowerup']
                }
            }),
            IsItemIdSellable: transformer_1.default({
                CheckItemcodeStatus: {
                    parameters: [0, 'ItemcodeStatusSellable']
                }
            }),
            IsItemIdPawnable: transformer_1.default({
                CheckItemcodeStatus: {
                    parameters: [0, 'ItemcodeStatusPawnable']
                }
            }),
            EnumItemsInRect: transformer_1.default({
                EnumItemsInRectBJ: {
                    test: [1, 'null'],
                    parameters: [0, 2]
                }
            }),
            // Unit API
            ShowUnit: transformer_1.default({
                ShowUnitShow: {
                    test: [1, 'true'],
                    parameters: [0]
                },
                ShowUnitHide: {
                    test: [1, 'false'],
                    parameters: [0]
                }
            }),
            SetUnitState: transformer_1.default({
                SetUnitLifeBJ: {
                    test: [1, 'UNIT_STATE_LIFE'],
                    parameters: [0, 2]
                },
                SetUnitManaBJ: {
                    test: [1, 'UNIT_STATE_MANA'],
                    parameters: [0, 2]
                }
            }),
            SetUnitFlyHeight: rename('SetUnitFlyHeightBJ'),
            SetUnitTurnSpeed: rename('SetUnitTurnSpeedBJ'),
            SetUnitAcquireRange: rename('SetUnitAcquireRangeBJ'),
            SetUnitCreepGuard: transformer_1.default({
                LockGuardPosition: {
                    test: [1, 'true'],
                    parameters: [0]
                }
            }),
            GetUnitDefaultPropWindow: rename('GetUnitDefaultPropWindowBJ'),
            SetUnitScale: transformer_1.default({
                SetUnitScalePercent: {
                    parameters: [0, [1, '*', 100], [2, '*', 100], [3, '*', 100]]
                }
            }),
            SetUnitTimeScale: transformer_1.default({
                SetUnitTimeScalePercent: {
                    parameters: [0, [1, '*', 100]]
                }
            }),
            SetUnitBlendTime: rename('SetUnitBlendTimeBJ'),
            QueueUnitAnimation: rename('QueueUnitAnimationBJ'),
            SetUnitAnimation: transformer_1.default({
                ResetUnitAnimation: {
                    test: [1, '"stand"'],
                    parameters: [0]
                }
            }),
            AddUnitAnimationProperties: swap210('AddUnitAnimationPropertiesBJ'),
            SetHeroStr: transformer_1.default({
                ModifyHeroStat: {
                    test: [2, 'true'],
                    parameters: ['HeroStatStr', 0, 'ModifyMethodSet', 1]
                }
            }),
            SetHeroAgi: transformer_1.default({
                ModifyHeroStat: {
                    test: [2, 'true'],
                    parameters: ['HeroStatAgi', 0, 'ModifyMethodSet', 1]
                }
            }),
            SetHeroInt: transformer_1.default({
                ModifyHeroStat: {
                    test: [2, 'true'],
                    parameters: ['HeroStatInt', 0, 'ModifyMethodSet', 1]
                }
            }),
            GetHeroStr: transformer_1.default({
                GetHeroStatBJ: {
                    parameters: ['HeroStatStr', 0, 1]
                }
            }),
            GetHeroAgi: transformer_1.default({
                GetHeroStatBJ: {
                    parameters: ['HeroStatAgi', 0, 1]
                }
            }),
            GetHeroInt: transformer_1.default({
                GetHeroStatBJ: {
                    parameters: ['HeroStatInt', 0, 1]
                }
            }),
            UnitModifySkillPoints: transformer_1.default({
                ModifyHeroSkillPoints: {
                    parameters: [0, '0', 1]
                }
            }),
            AddHeroXP: swap102('AddHeroXPSwapped'),
            GetUnitAbilityLevel: swap10('GetUnitAbilityLevelSwapped'),
            DecUnitAbilityLevel: swap10('DecUnitAbilityLevelSwapped'),
            IncUnitAbilityLevel: swap10('IncUnitAbilityLevelSwapped'),
            SetUnitAbilityLevel: swap102('SetUnitAbilityLevelSwapped'),
            SetUnitExploded: rename('SetUnitExplodedBJ'),
            PauseUnit: swap10('PauseUnitBJ'),
            IsUnitPaused: rename('IsUnitPausedBJ'),
            SelectUnit: transformer_1.default({
                SelectUnitAdd: {
                    test: [1, 'true'],
                    parameters: [0]
                },
                SelectUnitRemove: {
                    test: [1, 'false'],
                    parameters: [0]
                }
            }),
            UnitAddItem: swap10('UnitAddItemSwapped'),
            UnitRemoveItem: swap10('UnitRemoveItemSwapped'),
            UnitRemoveItemFromSlot: transformer_1.default({
                UnitRemoveItemFromSlotSwapped: {
                    parameters: [0, [1, '+', 1]]
                }
            }),
            UnitItemInSlot: transformer_1.default({
                UnitItemInSlotBJ: {
                    parameters: [0, [1, '+', 1]]
                }
            }),
            UnitInventorySize: rename('UnitInventorySizeBJ'),
            UnitDropItemSlot: transformer_1.default({
                UnitDropItemSlotBJ: {
                    parameters: [0, 1, [2, '+', 1]]
                }
            }),
            UnitDropItemTarget: rename('UnitDropItemTargetBJ'),
            GetUnitState: swap10('GetUnitStateSwap'),
            SetUnitUseFood: swap10('SetUnitUseFoodBJ'),
            IsUnitOwnedByPlayer: specific_1.transformerIsUnitOwnedByPlayer,
            IsUnitRace: specific_1.transformerIsUnitRace,
            IsUnitType: specific_1.transformerIsUnitType,
            IsUnitHidden: rename('IsUnitHiddenBJ'),
            IsUnitIllusion: rename('IsUnitIllusionBJ'),
            IsUnitInTransport: rename('IsUnitInTransportBJ'),
            IsUnitLoaded: rename('IsUnitLoadedBJ'),
            UnitShareVision: swap201('UnitShareVisionBJ'),
            UnitSuspendDecay: swap10('UnitSuspendDecayBJ'),
            UnitAddType: swap10('UnitAddTypeBJ'),
            UnitRemoveType: swap10('UnitRemoveTypeBJ'),
            UnitAddAbility: swap10('UnitAddAbilityBJ'),
            UnitRemoveAbility: swap10('UnitRemoveAbilityBJ'),
            UnitRemoveBuffs: transformer_1.default({
                UnitRemoveBuffsBJ: [
                    {
                        tests: [[1, 'true'], [2, 'false']],
                        parameters: ['BuffTypePositive', 0]
                    },
                    {
                        tests: [[1, 'false'], [2, 'true']],
                        parameters: ['BuffTypeNegative', 0]
                    },
                    {
                        tests: [[1, 'true'], [2, 'true']],
                        parameters: ['BuffTypeAll', 0]
                    }
                ]
            }),
            UnitRemoveBuffsEx: transformer_1.default({
                UnitRemoveBuffsBJ: {
                    tests: [[1, 'true'], [2, 'true'], [3, 'false'], [4, 'false'], [5, 'false'], [6, 'true'], [7, 'false']],
                    parameters: ['BuffTypeNonTLife', 0]
                }
            }),
            UnitAddSleep: rename('UnitSetCanSleepBJ'),
            UnitCanSleep: rename('UnitCanSleepBJ'),
            UnitIsSleeping: rename('UnitIsSleepingBJ'),
            UnitWakeUp: rename('UnitWakeUpBJ'),
            UnitApplyTimedLife: swap210('UnitApplyTimedLifeBJ'),
            UnitPauseTimedLife: swap10('UnitPauseTimedLifeBJ'),
            UnitSetUsesAltIcon: swap10('UnitSetUsesAltIconBJ'),
            UnitDamageTarget: transformer_1.default({
                UnitDamageTargetBJ: {
                    tests: [[3, 'true'], [4, 'false'], [7, 'WEAPON_TYPE_WHOKNOWS']],
                    parameters: [0, 1, 2, 5, 6]
                }
            }),
            IssueImmediateOrderById: rename('IssueTrainOrderByIdBJ'),
            AddResourceAmount: swap10('AddResourceAmountBJ'),
            WaygateActivate: swap10('WaygateActivateBJ'),
            WaygateIsActive: rename('WaygateIsActiveBJ'),
            AddItemToStock: swap1023('AddItemToStockBJ'),
            AddUnitToStock: swap1023('AddUnitToStockBJ'),
            RemoveItemFromStock: swap10('RemoveItemFromStockBJ'),
            RemoveUnitFromStock: swap10('RemoveUnitFromStockBJ'),
            // Player API
            Player: transformer_1.default({
                ConvertedPlayer: {
                    parameters: [[0, '+', 1]]
                }
            }),
            SetPlayerHandicap: transformer_1.default({
                SetPlayerHandicapBJ: {
                    parameters: [0, [1, '*', 100]]
                }
            }),
            SetPlayerHandicapXP: transformer_1.default({
                SetPlayerHandicapXPBJ: {
                    parameters: [0, [1, '*', 100]]
                }
            }),
            SetPlayerTechMaxAllowed: swap120('SetPlayerTechMaxAllowedSwap'),
            GetPlayerTechMaxAllowed: swap10('GetPlayerTechMaxAllowedSwap'),
            SetPlayerTechResearched: swap120('SetPlayerTechResearchedSwap'),
            GetPlayerTechCount: transformer_1.default({
                GetPlayerTechCountSimple: {
                    test: [2, 'true'],
                    parameters: [1, 0]
                }
            }),
            SetPlayerAbilityAvailable: swap210('SetPlayerAbilityAvailableBJ'),
            // Fog of War API
            FogMaskEnable: transformer_1.default({
                FogMaskEnableOn: {
                    test: [0, 'true'],
                    parameters: []
                },
                FogMaskEnableOff: {
                    test: [0, 'false'],
                    parameters: []
                }
            }),
            FogEnable: transformer_1.default({
                FogEnableOn: {
                    test: [0, 'true'],
                    parameters: []
                },
                FogEnableOff: {
                    test: [0, 'false'],
                    parameters: []
                }
            }),
            // Game API
            SetCampaignMenuRace: transformer_1.default({
                SetCampaignMenuRaceBJ: [
                    {
                        test: [0, 'RACE_OTHER'],
                        parameters: ['CampaignIndexT']
                    },
                    {
                        test: [0, 'RACE_HUMAN'],
                        parameters: ['CampaignIndexH']
                    },
                    {
                        test: [0, 'RACE_UNDEAD'],
                        parameters: ['CampaignIndexU']
                    },
                    {
                        test: [0, 'RACE_ORC'],
                        parameters: ['CampaignIndexO']
                    },
                    {
                        test: [0, 'RACE_NIGHTELF'],
                        parameters: ['CampaignIndexN']
                    }
                ]
            }),
            SetCampaignMenuRaceEx: transformer_1.default({
                SetCampaignMenuRaceBJ: [
                    {
                        test: [0, 'bj_CAMPAIGN_OFFSET_XN'],
                        parameters: ['CampaignIndexXN']
                    },
                    {
                        test: [0, 'bj_CAMPAIGN_OFFSET_XH'],
                        parameters: ['CampaignIndexXH']
                    },
                    {
                        test: [0, 'bj_CAMPAIGN_OFFSET_XU'],
                        parameters: ['CampaignIndexXU']
                    },
                    {
                        test: [0, 'bj_CAMPAIGN_OFFSET_XO'],
                        parameters: ['CampaignIndexXO']
                    }
                ]
            }),
            LoadGame: rename('LoadGameBJ'),
            RenameSaveDirectory: rename('RenameSaveDirectoryBJ'),
            RemoveSaveDirectory: rename('RemoveSaveDirectoryBJ'),
            CopySaveGame: rename('CopySaveGameBJ'),
            GetFloatGameState: transformer_1.default({
                GetTimeOfDay: {
                    test: [0, 'GAME_STATE_TIME_OF_DAY'],
                    parameters: []
                }
            }),
            SetFloatGameState: transformer_1.default({
                SetTimeOfDay: {
                    test: [0, 'GAME_STATE_TIME_OF_DAY'],
                    parameters: [1]
                }
            }),
            // Campaign API
            SetCustomCampaignButtonVisible: transformer_1.default({
                ShowCustomCampaignButton: {
                    parameters: [[0, '+', 1], 1]
                }
            }),
            GetCustomCampaignButtonVisible: transformer_1.default({
                IsCustomCampaignButtonVisibile: {
                    parameters: [[0, '+', 1]]
                }
            }),
            // Dialog API
            DialogClear: rename('DialogClearBJ'),
            DialogSetMessage: rename('DialogSetMessageBJ'),
            DialogDisplay: swap210('DialogDisplayBJ'),
            InitGameCache: rename('InitGameCacheBJ'),
            SaveGameCache: rename('SaveGameCacheBJ'),
            StoreInteger: swap3210('StoreIntegerBJ'),
            StoreReal: swap3210('StoreRealBJ'),
            StoreBoolean: swap3210('StoreBooleanBJ'),
            StoreUnit: swap3210('StoreUnitBJ'),
            StoreString: swap3210('StoreStringBJ'),
            HaveStoredBoolean: transformer_1.default({
                HaveStoredValue: {
                    parameters: [2, 'CacheValueTypeBoolean', 1, 0]
                }
            }),
            HaveStoredInteger: transformer_1.default({
                HaveStoredValue: {
                    parameters: [2, 'CacheValueTypeInteger', 1, 0]
                }
            }),
            HaveStoredReal: transformer_1.default({
                HaveStoredValue: {
                    parameters: [2, 'CacheValueTypeReal', 1, 0]
                }
            }),
            HaveStoredUnit: transformer_1.default({
                HaveStoredValue: {
                    parameters: [2, 'CacheValueTypeUnit', 1, 0]
                }
            }),
            HaveStoredString: transformer_1.default({
                HaveStoredValue: {
                    parameters: [2, 'CacheValueTypeString', 1, 0]
                }
            }),
            FlushGameCache: rename('FlushGameCacheBJ'),
            FlushStoredMission: swap10('FlushStoredMissionBJ'),
            GetStoredInteger: swap210('GetStoredIntegerBJ'),
            GetStoredReal: swap210('GetStoredRealBJ'),
            GetStoredBoolean: swap210('GetStoredBooleanBJ'),
            GetStoredString: swap210('GetStoredStringBJ'),
            InitHashtable: rename('InitHashtableBJ'),
            SaveInteger: swap3210('SaveIntegerBJ'),
            SaveReal: swap3210('SaveRealBJ'),
            SaveBoolean: swap3210('SaveBooleanBJ'),
            SaveStr: swap3210('SaveStringBJ'),
            SavePlayerHandle: swap3210('SavePlayerHandleBJ'),
            SaveWidgetHandle: swap3210('SaveWidgetHandleBJ'),
            SaveDestructableHandle: swap3210('SaveDestructableHandleBJ'),
            SaveItemHandle: swap3210('SaveItemHandleBJ'),
            SaveUnitHandle: swap3210('SaveUnitHandleBJ'),
            SaveAbilityHandle: swap3210('SaveAbilityHandleBJ'),
            SaveTimerHandle: swap3210('SaveTimerHandleBJ'),
            SaveTriggerHandle: swap3210('SaveTriggerHandleBJ'),
            SaveTriggerConditionHandle: swap3210('SaveTriggerConditionHandleBJ'),
            SaveTriggerActionHandle: swap3210('SaveTriggerActionHandleBJ'),
            SaveTriggerEventHandle: swap3210('SaveTriggerEventHandleBJ'),
            SaveForceHandle: swap3210('SaveForceHandleBJ'),
            SaveGroupHandle: swap3210('SaveGroupHandleBJ'),
            SaveLocationHandle: swap3210('SaveLocationHandleBJ'),
            SaveRectHandle: swap3210('SaveRectHandleBJ'),
            SaveBooleanExprHandle: swap3210('SaveBooleanExprHandleBJ'),
            SaveSoundHandle: swap3210('SaveSoundHandleBJ'),
            SaveEffectHandle: swap3210('SaveEffectHandleBJ'),
            SaveUnitPoolHandle: swap3210('SaveUnitPoolHandleBJ'),
            SaveItemPoolHandle: swap3210('SaveItemPoolHandleBJ'),
            SaveQuestHandle: swap3210('SaveQuestHandleBJ'),
            SaveQuestItemHandle: swap3210('SaveQuestItemHandleBJ'),
            SaveDefeatConditionHandle: swap3210('SaveDefeatConditionHandleBJ'),
            SaveTimerDialogHandle: swap3210('SaveTimerDialogHandleBJ'),
            SaveLeaderboardHandle: swap3210('SaveLeaderboardHandleBJ'),
            SaveMultiboardHandle: swap3210('SaveMultiboardHandleBJ'),
            SaveMultiboardItemHandle: swap3210('SaveMultiboardItemHandleBJ'),
            SaveTrackableHandle: swap3210('SaveTrackableHandleBJ'),
            SaveDialogHandle: swap3210('SaveDialogHandleBJ'),
            SaveButtonHandle: swap3210('SaveButtonHandleBJ'),
            SaveTextTagHandle: swap3210('SaveTextTagHandleBJ'),
            SaveLightningHandle: swap3210('SaveLightningHandleBJ'),
            SaveImageHandle: swap3210('SaveImageHandleBJ'),
            SaveUbersplatHandle: swap3210('SaveUbersplatHandleBJ'),
            SaveRegionHandle: swap3210('SaveRegionHandleBJ'),
            SaveFogStateHandle: swap3210('SaveFogStateHandleBJ'),
            SaveFogModifierHandle: swap3210('SaveFogModifierHandleBJ'),
            LoadInteger: swap210('LoadIntegerBJ'),
            LoadReal: swap210('LoadRealBJ'),
            LoadBoolean: swap210('LoadBooleanBJ'),
            LoadStr: swap210('LoadStringBJ'),
            LoadPlayerHandle: swap210('LoadPlayerHandleBJ'),
            LoadWidgetHandle: swap210('LoadWidgetHandleBJ'),
            LoadDestructableHandle: swap210('LoadDestructableHandleBJ'),
            LoadItemHandle: swap210('LoadItemHandleBJ'),
            LoadUnitHandle: swap210('LoadUnitHandleBJ'),
            LoadAbilityHandle: swap210('LoadAbilityHandleBJ'),
            LoadTimerHandle: swap210('LoadTimerHandleBJ'),
            LoadTriggerHandle: swap210('LoadTriggerHandleBJ'),
            LoadTriggerConditionHandle: swap210('LoadTriggerConditionHandleBJ'),
            LoadTriggerActionHandle: swap210('LoadTriggerActionHandleBJ'),
            LoadTriggerEventHandle: swap210('LoadTriggerEventHandleBJ'),
            LoadForceHandle: swap210('LoadForceHandleBJ'),
            LoadGroupHandle: swap210('LoadGroupHandleBJ'),
            LoadLocationHandle: swap210('LoadLocationHandleBJ'),
            LoadRectHandle: swap210('LoadRectHandleBJ'),
            LoadBooleanExprHandle: swap210('LoadBooleanExprHandleBJ'),
            LoadSoundHandle: swap210('LoadSoundHandleBJ'),
            LoadEffectHandle: swap210('LoadEffectHandleBJ'),
            LoadUnitPoolHandle: swap210('LoadUnitPoolHandleBJ'),
            LoadItemPoolHandle: swap210('LoadItemPoolHandleBJ'),
            LoadQuestHandle: swap210('LoadQuestHandleBJ'),
            LoadQuestItemHandle: swap210('LoadQuestItemHandleBJ'),
            LoadDefeatConditionHandle: swap210('LoadDefeatConditionHandleBJ'),
            LoadTimerDialogHandle: swap210('LoadTimerDialogHandleBJ'),
            LoadLeaderboardHandle: swap210('LoadLeaderboardHandleBJ'),
            LoadMultiboardHandle: swap210('LoadMultiboardHandleBJ'),
            LoadMultiboardItemHandle: swap210('LoadMultiboardItemHandleBJ'),
            LoadTrackableHandle: swap210('LoadTrackableHandleBJ'),
            LoadDialogHandle: swap210('LoadDialogHandleBJ'),
            LoadButtonHandle: swap210('LoadButtonHandleBJ'),
            LoadTextTagHandle: swap210('LoadTextTagHandleBJ'),
            LoadLightningHandle: swap210('LoadLightningHandleBJ'),
            LoadImageHandle: swap210('LoadImageHandleBJ'),
            LoadUbersplatHandle: swap210('LoadUbersplatHandleBJ'),
            LoadRegionHandle: swap210('LoadRegionHandleBJ'),
            LoadFogStateHandle: swap210('LoadFogStateHandleBJ'),
            LoadFogModifierHandle: swap210('LoadFogModifierHandleBJ'),
            HaveSavedBoolean: transformer_1.default({
                HaveSavedValue: {
                    parameters: [2, 'HashtableValueTypeBoolean', 1, 0]
                }
            }),
            HaveSavedInteger: transformer_1.default({
                HaveSavedValue: {
                    parameters: [2, 'HashtableValueTypeInteger', 1, 0]
                }
            }),
            HaveSavedReal: transformer_1.default({
                HaveSavedValue: {
                    parameters: [2, 'HashtableValueTypeReal', 1, 0]
                }
            }),
            HaveSavedString: transformer_1.default({
                HaveSavedValue: {
                    parameters: [2, 'HashtableValueTypeString', 1, 0]
                }
            }),
            HaveSavedHandle: transformer_1.default({
                HaveSavedValue: {
                    parameters: [2, 'HashtableValueTypeHandle', 1, 0]
                }
            }),
            FlushParentHashtable: rename('FlushParentHashtableBJ'),
            FlushChildHashtable: swap10('FlushChildHashtableBJ'),
            // Randomization API
            ChooseRandomCreep: rename('ChooseRandomCreepBJ'),
            ChooseRandomNPBuilding: rename('ChooseRandomNPBuildingBJ'),
            ChooseRandomItem: rename('ChooseRandomItemBJ'),
            ChooseRandomItemEx: swap10('ChooseRandomItemExBJ'),
            // Visual API
            ResetTerrainFog: rename('ResetTerrainFogBJ'),
            SetTerrainFogEx: transformer_1.default({
                SetTerrainFogExBJ: {
                    parameters: [0, 1, 2, 3, [4, '*', 100], [5, '*', 100], [6, '*', 100]]
                }
            }),
            SetTimeOfDayScale: transformer_1.default({
                SetTimeOfDayScalePercentBJ: {
                    parameters: [[0, '*', 100]]
                }
            }),
            PauseGame: transformer_1.default({
                PauseGameOn: {
                    test: [0, 'true'],
                    parameters: []
                },
                PauseGameOff: {
                    test: [0, 'false'],
                    parameters: []
                }
            }),
            DestroyTextTag: rename('DestroyTextTagBJ'),
            SetTextTagPosUnit: rename('SetTextTagPosUnitBJ'),
            SetTextTagSuspended: rename('SetTextTagSuspendedBJ'),
            SetTextTagPermanent: rename('SetTextTagPermanentBJ'),
            SetTextTagAge: rename('SetTextTagAgeBJ'),
            SetTextTagLifespan: rename('SetTextTagLifespanBJ'),
            SetTextTagFadepoint: rename('SetTextTagFadepointBJ'),
            // Quest API
            DestroyQuest: rename('DestroyQuestBJ'),
            QuestSetTitle: rename('QuestSetTitleBJ'),
            QuestSetDescription: rename('QuestSetDescriptionBJ'),
            QuestSetCompleted: rename('QuestSetCompletedBJ'),
            QuestSetDiscovered: rename('QuestSetDiscoveredBJ'),
            QuestSetFailed: rename('QuestSetFailedBJ'),
            QuestSetEnabled: swap10('QuestSetEnabledBJ'),
            QuestItemSetDescription: rename('QuestItemSetDescriptionBJ'),
            QuestItemSetCompleted: rename('QuestItemSetCompletedBJ'),
            DestroyDefeatCondition: rename('DestroyDefeatConditionBJ'),
            DefeatConditionSetDescription: rename('DefeatConditionSetDescriptionBJ'),
            FlashQuestDialogButton: rename('FlashQuestDialogButtonBJ'),
            // Timer Dialog API
            DestroyTimerDialog: rename('DestroyTimerDialogBJ'),
            TimerDialogSetTitle: rename('TimerDialogSetTitleBJ'),
            TimerDialogDisplay: swap10('TimerDialogDisplayBJ'),
            // Leaderboard API
            DestroyLeaderboard: rename('DestroyLeaderboardBJ'),
            LeaderboardDisplay: swap10('LeaderboardDisplayBJ'),
            LeaderboardRemovePlayerItem: swap10('LeaderboardRemovePlayerItemBJ'),
            LeaderboardSortItemsByValue: transformer_1.default({
                LeaderboardSortItemsBJ: {
                    parameters: [0, 'LeaderboardSortByValue', 1]
                }
            }),
            LeaderboardSortItemsByPlayer: transformer_1.default({
                LeaderboardSortItemsBJ: {
                    parameters: [0, 'LeaderboardSortByPlayer', 1]
                }
            }),
            LeaderboardSortItemsByLabel: transformer_1.default({
                LeaderboardSortItemsBJ: {
                    parameters: [0, 'LeaderboardSortByLabel', 1]
                }
            }),
            LeaderboardHasPlayerItem: rename('LeaderboardHasPlayerItemBJ'),
            LeaderboardSetLabel: rename('LeaderboardSetLabelBJ'),
            PlayerGetLeaderboard: rename('PlayerGetLeaderboardBJ'),
            LeaderboardSetStyle: rename('LeaderboardSetStyleBJ'),
            // Multiboard API
            DestroyMultiboard: rename('DestroyMultiboardBJ'),
            MultiboardDisplay: swap10('MultiboardDisplayBJ'),
            MultiboardMinimize: swap10('MultiboardMinimizeBJ'),
            // Camera API
            CameraSetupGetField: swap10('CameraSetupGetFieldSwap'),
            CameraSetSmoothingFactor: rename('CameraSetSmoothingFactorBJ'),
            DisplayCineFilter: rename('DisplayCineFilterBJ'),
            ForceCinematicSubtitles: rename('ForceCinematicSubtitlesBJ'),
            // Sound API
            SetSoundDistanceCutoff: rename('SetSoundDistanceCutoffBJ'),
            SetSoundPitch: rename('SetSoundPitchBJ'),
            AttachSoundToUnit: rename('AttachSoundToUnitBJ'),
            StopSound: transformer_1.default({
                StopSoundBJ: {
                    test: [1, 'false'],
                    parameters: [0, 2]
                }
            }),
            KillSoundWhenDone: rename('KillSoundWhenDoneBJ'),
            SetMapMusic: transformer_1.default({
                SetMapMusicIndexedBJ: {
                    test: [1, 'false'],
                    parameters: [0, 2]
                },
                SetMapMusicRandomBJ: {
                    tests: [[1, 'true'], [2, '0']],
                    parameters: [0]
                }
            }),
            ClearMapMusic: rename('ClearMapMusicBJ'),
            PlayMusic: rename('PlayMusicBJ'),
            StopMusic: rename('StopMusicBJ'),
            ResumeMusic: rename('ResumeMusicBJ'),
            PlayThematicMusic: rename('PlayThematicMusicBJ'),
            EndThematicMusic: rename('EndThematicMusicBJ'),
            VolumeGroupSetVolume: transformer_1.default({
                VolumeGroupSetVolumeBJ: {
                    parameters: [0, [1, '*', 100]]
                }
            }),
            // Effects API
            AddWeatherEffect: rename('AddWeatherEffectSaveLast'),
            RemoveWeatherEffect: rename('RemoveWeatherEffectBJ'),
            AddSpecialEffectLoc: swap10('AddSpecialEffectLocBJ'),
            AddSpecialEffectTarget: swap210('AddSpecialEffectTargetUnitBJ'),
            DestroyEffect: rename('DestroyEffectBJ'),
            DestroyLightning: rename('DestroyLightningBJ'),
            GetLightningColorA: rename('GetLightningColorABJ'),
            GetLightningColorR: rename('GetLightningColorRBJ'),
            GetLightningColorG: rename('GetLightningColorGBJ'),
            GetLightningColorB: rename('GetLightningColorBBJ'),
            SetLightningColor: rename('SetLightningColorBJ'),
            GetAbilityEffectById: rename('GetAbilityEffectBJ'),
            GetAbilitySoundById: rename('GetAbilitySoundBJ'),
            // Image API
            ShowImage: swap10('ShowImageBJ'),
            // Ubersplat API
            ShowUbersplat: swap10('ShowUbersplatBJ'),
            // Blight API
            SetBlightRect: swap201('SetBlightRectBJ'),
            SetBlightLoc: swap3012('SetBlightRadiusLocBJ'),
            // Doodad API
            SetDoodadAnimationRect: transformer_1.default({
                SetDoodadAnimationRectBJ: {
                    test: [3, 'false'],
                    parameters: [2, 1, 0]
                },
            }),
        };
    }
}
function transformFunction(data, object) {
    if (!initialized) {
        initialize();
    }
    const transform = transformers[object.name];
    if (transform) {
        return transform(data, object);
    }
    return blz_1.default(data, object);
}
exports.default = transformFunction;
//# sourceMappingURL=functions.js.map