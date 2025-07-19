/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Dialog, DialogButton } from "./dialog";
import { Frame } from "./frame";
import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Unit } from "./unit";
import { Widget } from "./widget";
export declare class Trigger extends Handle<trigger> {
    /** @deprecated use `Trigger.create` instead. */
    constructor();
    static create(): Trigger;
    set enabled(flag: boolean);
    get enabled(): boolean;
    get evalCount(): number;
    static get eventId(): eventid | undefined;
    get execCount(): number;
    /**
     * Marks the given trigger to wait/no longer wait for `TriggerSleepAction`s in sub trigger executions started via `TriggerExecuteWait`.
     * Since this is an attribute of the execution rather than the trigger object, this affects future runs of the given trigger, and not
     * those already started.
     */
    set waitOnSleeps(flag: boolean);
    get waitOnSleeps(): boolean;
    addAction(actionFunc: () => void): triggeraction;
    /**
     * Adds a new condition to the trigger.
     *
     * Adding more conditions later wil join them by AND (that means all conditions need to evaluate to `true`)
     *
     * @example
     * ```ts
     * const t = Trigger.create()
     *
     * // trigger fires if a unit is attacked
     * t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_ATTACKED)
     *
     * // but only if the unit name matches
     * t.addCondition(Condition(() => Unit.fromHandle(GetAttacker()).name === 'Attacker Unit'))
     *
     * t.addAction(() => {
     *  //do something...
     * })
     * ```
     * @param condition The condition which must evaluate to true in order to run the trigger's actions.
     */
    addCondition(condition: boolexpr | (() => boolean)): triggercondition | undefined;
    /**
     * @bug Do not destroy the current running Trigger (when waits are involved)
     * as it can cause handle stack corruption as documented [here](http://www.wc3c.net/showthread.php?t=110519).
     */
    destroy(): void;
    /**
     * Evaluates all functions that were added to the trigger via `addCondition`.
     * All return-values from all added condition-functions are `and`ed together as the final return-value.
     * Returns the boolean value of the return value from the condition-function.
     * So if 0/0.0/null would be returned in the condition-function, `eval`
     * would return false. Note that `""` would return `true`.
     * @note If a condition-function crashes the thread or does not return any value `eval` will return false.
     * @note If you want to return false for a condition-function that returns string (for whatever reason) return `null` instead of `""`
     * @note *All* functions added via `addCondition` are run. There is no short-circuting. If you want short-circuting use `And` or `Or`.
     * @note All functions added via `addCondition` are run in the order they were added.
     */
    eval(): boolean;
    /**
     * Calls the actions of a trigger in a new execution context.
     * Control will return to the caller when the trigger has finished or has been suspended via TriggerSleepAction.
     */
    exec(): void;
    /**
     * Does the same as `exec` but if the caller has been marked with `waitOnSleeps` before its
     * execution, it will additionally wait for `TriggerSleepAction`s of the callee, so this really ensures that
     * the callee has finished. If there was a `TriggerSleepAction`, there will be a short delay before returning.
     */
    execWait(): void;
    registerAnyUnitEvent(whichPlayerUnitEvent: playerunitevent): void;
    registerCommandEvent(whichAbility: number, order: string): event | undefined;
    registerDeathEvent(whichWidget: Widget): event | undefined;
    registerDialogButtonEvent(whichButton: DialogButton): event | undefined;
    registerDialogEvent(whichDialog: Dialog): event | undefined;
    registerEnterRegion(whichRegion: region, filter: boolexpr | (() => boolean) | undefined): event | undefined;
    registerFilterUnitEvent(whichUnit: unit, whichEvent: unitevent, filter: boolexpr | (() => boolean) | undefined): event | undefined;
    registerGameEvent(whichGameEvent: gameevent): event | undefined;
    registerGameStateEvent(whichState: gamestate, opcode: limitop, limitval: number): event | undefined;
    registerLeaveRegion(whichRegion: region, filter: boolexpr | (() => boolean) | undefined): event | undefined;
    registerPlayerAllianceChange(whichPlayer: MapPlayer, whichAlliance: alliancetype): event | undefined;
    registerPlayerChatEvent(whichPlayer: MapPlayer, chatMessageToDetect: string, exactMatchOnly: boolean): event | undefined;
    registerPlayerEvent(whichPlayer: MapPlayer, whichPlayerEvent: playerevent): event | undefined;
    registerPlayerKeyEvent(whichPlayer: MapPlayer, whichKey: oskeytype, metaKey: number, fireOnKeyDown: boolean): event | undefined;
    registerPlayerMouseEvent(whichPlayer: MapPlayer, whichMouseEvent: number): event | undefined;
    registerPlayerStateEvent(whichPlayer: MapPlayer, whichState: playerstate, opcode: limitop, limitval: number): event | undefined;
    registerPlayerSyncEvent(whichPlayer: MapPlayer, prefix: string, fromServer: boolean): event | undefined;
    registerPlayerUnitEvent(whichPlayer: MapPlayer, whichPlayerUnitEvent: playerunitevent, filter: boolexpr | (() => boolean) | undefined): event | undefined;
    registerTimerEvent(timeout: number, periodic: boolean): event | undefined;
    registerTimerExpireEvent(t: timer): event | undefined;
    registerTrackableHitEvent(whichTrackable: trackable): event | undefined;
    registerTrackableTrackEvent(whichTrackable: trackable): event | undefined;
    registerUnitEvent(whichUnit: Unit, whichEvent: unitevent): event | undefined;
    registerUnitInRage(whichUnit: unit, range: number, filter: boolexpr | (() => boolean) | undefined): event | undefined;
    registerUnitStateEvent(whichUnit: Unit, whichState: unitstate, opcode: limitop, limitval: number): event | undefined;
    registerUpgradeCommandEvent(whichUpgrade: number): event | undefined;
    registerVariableEvent(varName: string, opcode: limitop, limitval: number): event | undefined;
    removeAction(whichAction: triggeraction): void;
    removeActions(): void;
    removeCondition(whichCondition: triggercondition): void;
    removeConditions(): void;
    reset(): void;
    triggerRegisterFrameEvent(frame: Frame, eventId: frameeventtype): event | undefined;
    static fromEvent(): Trigger | undefined;
    static fromHandle(handle: trigger | undefined): Trigger | undefined;
}
