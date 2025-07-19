/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { OrderId } from "../globals/order";
import { Destructable } from "./destructable";
import { Force } from "./force";
import { Group } from "./group";
import { Item } from "./item";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Sound } from "./sound";
import { Widget } from "./widget";
export declare class Unit extends Widget {
    readonly handle: unit;
    /**
     * @deprecated use `Unit.create` instead.
     * @param owner The owner of the unit.
     * @param unitId The rawcode of the unit.
     * @param x The x-coordinate of the unit.
     * @param y The y-coordinate of the unit.
     * @param face The direction that the unit will be facing in degrees.
     * @param skinId The skin of the unit.
     */
    constructor(owner: MapPlayer, unitId: number, x: number, y: number, face?: number, skinId?: number);
    /**
     * Creates a unit.
     * @param owner The owner of the unit.
     * @param unitId The rawcode of the unit.
     * @param x The x-coordinate of the unit.
     * @param y The y-coordinate of the unit.
     * @param face The direction that the unit will be facing in degrees.
     * @param skinId The skin of the unit.
     */
    static create(owner: MapPlayer, unitId: number, x: number, y: number, face?: number, skinId?: number): Unit | undefined;
    /**
     * Sets a unit's acquire range.  This is the value that a unit uses to choose targets to
     * engage with.  Note that this is not the attack range.  When acquisition range is
     * greater than attack range, the unit will attempt to move towards acquired targets, and then attack.
     * Setting acquisition range lower than attack range in the object editor limits the
     * unit's attack range to the acquisition range, but changing a unit's acquisition range
     * with this native does not change its attack range, nor the value displayed in the UI.
     *
     * @note It is a myth that reducing acquire range with this native can limit a unit's attack range.
     */
    set acquireRange(value: number);
    get acquireRange(): number;
    get agility(): number;
    set agility(value: number);
    get armor(): number;
    set armor(armorAmount: number);
    set canSleep(flag: boolean);
    get canSleep(): boolean;
    get collisionSize(): number;
    set color(whichColor: playercolor);
    get currentOrder(): number;
    get defaultAcquireRange(): number;
    get defaultFlyHeight(): number;
    get defaultMoveSpeed(): number;
    /**
     * Returns a unit's default propulsion window angle in degrees.
     * @note This function is the odd case in the asymmetric prop window API, since the
     * other prop window natives use radians.
     */
    get defaultPropWindow(): number;
    get defaultTurnSpeed(): number;
    get experience(): number;
    set experience(newXpVal: number);
    set facing(value: number);
    /**
     * @returns The units facing in degrees.
     */
    get facing(): number;
    get foodMade(): number;
    get foodUsed(): number;
    get ignoreAlarmToggled(): boolean;
    get intelligence(): number;
    set intelligence(value: number);
    get inventorySize(): number;
    /**
     * Renders a unit invulnerable/lifts that specific invulnerability.
     *
     * @note The native seems to employ the `'Avul'` ability, which is defined in the default AbilityData.slk.
     * If there is no `'Avul'` defined, this will crash the game.
     */
    set invulnerable(flag: boolean);
    get invulnerable(): boolean;
    get level(): number;
    get localZ(): number;
    get mana(): number;
    set mana(value: number);
    get maxLife(): number;
    set maxLife(value: number);
    get maxMana(): number;
    set maxMana(value: number);
    set moveSpeed(value: number);
    get moveSpeed(): number;
    /**
     * @async
     */
    get name(): string;
    set name(value: string);
    set nameProper(value: string);
    /**
     * Returns the hero's "Proper Name", which is the name displayed above the level bar.
     *
     * @note Will return 'null' on non-hero units.
     * @note Will return 'null' on illusions.
     */
    get nameProper(): string;
    /**
     * @deprecated use getOwner/setOwner instead.
     */
    set owner(whichPlayer: MapPlayer);
    get owner(): MapPlayer;
    /**
     * Pauses a unit. A paused unit has the following properties:
     * 1. Buffs/effects are suspended
     * 2. Orders are stored when paused and fired on unpause
     * 3. The paused unit does not accept powerups. `addItem` returns true but the item is not picked up
     */
    set paused(flag: boolean);
    /**
     * @returns true if the unit is paused
     */
    get paused(): boolean;
    /**
     * @deprecated use getPoint/setPoint instead.
     */
    get point(): Point;
    set point(whichPoint: Point);
    get pointValue(): number;
    /**
     * Sets a unit's propulsion window to the specified angle (in radians).
     * The propulsion window determines at which facing angle difference to the target
     * command's location (move, attack, patrol, smart) a unit will begin to move if
     * movement is required to fulfil the command, or if it will turn without movement.
     * A propulsion window of 0 makes the unit unable to move at all.
     * A propulsion window of 180 will force it to start moving as soon as the command
     * is given (if movement is required). In practice, this means that setting a
     * unit's prop window to 0 will prevent it from attacking.
     *
     * http://www.hiveworkshop.com/forums/2391397-post20.html
  
     * @param newPropWindowAngle The propulsion window angle to assign. Should be in radians.
     */
    set propWindow(newPropWindowAngle: number);
    /**
     * Returns a unit's propulsion window angle in radians.
     */
    get propWindow(): number;
    get race(): race;
    get rallyDestructable(): Destructable | undefined;
    get rallyPoint(): Point | undefined;
    get rallyUnit(): Unit | undefined;
    set resourceAmount(amount: number);
    get resourceAmount(): number;
    get selectable(): boolean;
    set selectionScale(scale: number);
    get selectionScale(): number;
    set show(flag: boolean);
    get show(): boolean;
    get skin(): number;
    set skin(skinId: number);
    /**
     * Returns the units available skill points.
     */
    get skillPoints(): number;
    /**
     * Adds the amount to the units available skill points. Calling with a negative
     * number reduces the skill points by that amount.
     * Returns false if the amount of available skill points is already zero and
     * if it's called with any non-positive number.
     * Returns true in any other case.
     * @note If `skillPointDelta` is greater than the amount of skillpoints the hero
     * actually can spend (like 9 for three 3-level abilities) only that amount will
     * be added. Negative `skillPointDelta` works as expected.
     */
    set skillPoints(skillPointDelta: number);
    get sleeping(): boolean;
    get strength(): number;
    set strength(value: number);
    set turnSpeed(value: number);
    get turnSpeed(): number;
    get typeId(): number;
    get userData(): number;
    /**
     * Sets a single custom integer for a unit.
     *
     * @note This value is not used by any standard mechanisms in Warcraft III.
     */
    set userData(value: number);
    set waygateActive(flag: boolean);
    get waygateActive(): boolean;
    /**
     * @bug If the unit is loaded into a zeppelin this will not return the position
     * of the zeppelin but the last position of the unit before it was loaded into
     * the zeppelin.
     */
    get x(): number;
    /**
     * @note If the unit has movementspeed of zero the unit will be moved but the model of the unit will not move.
     * @note This does not cancel orders of the unit. `setPosition` does cancel orders.
     */
    set x(value: number);
    get y(): number;
    /**
     * @note If the unit has movementspeed of zero the unit will be moved but the model of the unit will not move.
     * @note This does not cancel orders of the unit. `setPosition` does cancel orders.
     */
    set y(value: number);
    /**
     * @async
     */
    get z(): number;
    addAbility(abilityId: number): boolean;
    addAnimationProps(animProperties: string, add: boolean): void;
    /**
     * Adds the input value of experience to the hero unit specified.
     *
     * If the experience added exceeds the amount required for the hero to gain a level,
     * then it will force the unit to gain a level and the remaining experience will spill over for the next level.
     *
     * @bug Adding negative value to experience will decrease it
     * by the stated value, but won't lower the level even if the experience value
     * after deduction is lower than the lower bound of the experience required to get
     * the stated level.
     * @bug If the value will become lower than zero, the experience won't be negative, instead of it it'll be equal
     * to `4294967296+(supposed_negative_experience_value)`.
     * @param xpToAdd The amount of experience to add to the hero unit.
     * @param showEyeCandy If the boolean input is true, then the hero-level-gain
     * effect will be shown if the hero gains a level from the added experience.
     */
    addExperience(xpToAdd: number, showEyeCandy: boolean): void;
    addIndicator(red: number, blue: number, green: number, alpha: number): void;
    addItem(whichItem: Item): boolean;
    addItemById(itemId: number): Item | undefined;
    addItemToSlotById(itemId: number, itemSlot: number): boolean;
    addItemToStock(itemId: number, currentStock: number, stockMax: number): void;
    /**
     * Adds the amount more gold to the whichUnit gold mine.
     *
     * @bug If the value after adding negative amount will be less than zero, then it
     * will display negative resource amount, but if some peasant or peon will try to
     * gather resources from such a mine, he will bring back 0 gold and the mine will
     * be auto-destroyed.
     * @param amount The amount of resources to add to the unit.
     */
    addResourceAmount(amount: number): void;
    addSleepPerm(add: boolean): void;
    addType(whichUnitType: unittype): boolean;
    addUnitToStock(unitId: number, currentStock: number, stockMax: number): void;
    applyTimedLife(buffId: number, duration: number): void;
    attachSound(sound: Sound): void;
    cancelTimedLife(): void;
    canSleepPerm(): boolean;
    countBuffs(removePositive: boolean, removeNegative: boolean, magic: boolean, physical: boolean, timedLife: boolean, aura: boolean, autoDispel: boolean): number;
    damageAt(delay: number, radius: number, x: number, y: number, amount: number, attack: boolean, ranged: boolean, attackType: attacktype, damageType: damagetype, weaponType: weapontype): boolean;
    /**
     * Deals damage to target widget from a source unit.
     *
     * @note For some insight about the different configurations of the different types see [this post](http://www.wc3c.net/showpost.php?p=1030046&postcount=19).
     * @param target The target being damaged.
     * @param amount How much damage is being dealt.
     * @param attack Consider the damage dealt as being an attack.
     * @param ranged Consider the damage dealt as being from a ranged source.
     * @param attackType
     * @param damageType
     * @param weaponType
     */
    damageTarget(target: widget, amount: number, attack: boolean, ranged: boolean, attackType: attacktype, damageType: damagetype, weaponType: weapontype): boolean;
    /**
     * Decreases the level of a unit's ability by 1. The level will not go below 1.
     * @param abilCode The four digit rawcode representation of the ability.
     * @returns The new ability level.
     */
    decAbilityLevel(abilCode: number): number;
    /**
     * Instantly removes the unit from the game.
     */
    destroy(): void;
    disableAbility(abilId: number, flag: boolean, hideUI: boolean): void;
    dropItem(whichItem: Item, x: number, y: number): boolean;
    dropItemFromSlot(whichItem: Item, slot: number): boolean;
    dropItemTarget(whichItem: Item, target: Widget): boolean;
    endAbilityCooldown(abilCode: number): void;
    getAbility(abilId: number): ability | undefined;
    getAbilityByIndex(index: number): ability | undefined;
    getAbilityCooldown(abilId: number, level: number): number;
    getAbilityCooldownRemaining(abilId: number): number;
    /**
     * Returns the level of the ability for the unit.
     * @note This function is **not** zero indexed.
     */
    getAbilityLevel(abilCode: number): number;
    getAbilityManaCost(abilId: number, level: number): number;
    getAgility(includeBonuses: boolean): number;
    getAttackCooldown(weaponIndex: number): number;
    getBaseDamage(weaponIndex: number): number;
    getDiceNumber(weaponIndex: number): number;
    getDiceSides(weaponIndex: number): number;
    getField(field: unitbooleanfield | unitintegerfield | unitrealfield | unitstringfield): string | number | boolean | undefined;
    getflyHeight(): number;
    getHeroLevel(): number;
    getIgnoreAlarm(flag: boolean): boolean;
    getIntelligence(includeBonuses: boolean): number;
    getItemInSlot(slot: number): Item | undefined;
    getState(whichUnitState: unitstate): number;
    getStrength(includeBonuses: boolean): number;
    hasBuffs(removePositive: boolean, removeNegative: boolean, magic: boolean, physical: boolean, timedLife: boolean, aura: boolean, autoDispel: boolean): boolean;
    hasItem(whichItem: Item): boolean;
    hideAbility(abilId: number, flag: boolean): void;
    /**
     * Increases the level of a unit's ability by 1.
     * @param abilCode The four digit rawcode representation of the ability.
     * @returns The new ability level.
     *
     * @note `incAbilityLevel` can increase an abilities level to maxlevel+1. On maxlevel+1 all ability fields are 0.
     *
     * http://www.wc3c.net/showthread.php?p=1029039#post1029039
     * http://www.hiveworkshop.com/forums/lab-715/silenceex-everything-you-dont-know-about-silence-274351/.
     */
    incAbilityLevel(abilCode: number): number;
    inForce(whichForce: Force): boolean;
    inGroup(whichGroup: Group): boolean;
    /**
     * Check if a unit is within range of a point. Collision size is taken into account.
     */
    inRange(x: number, y: number, distance: number): boolean;
    /**
     * Check if a unit is within range of a point. Collision size is taken into account.
     */
    inRangeOfPoint(whichPoint: Point, distance: number): boolean;
    /**
     * Check if a unit is within range of a another unit. Collision size is taken into account.
     */
    inRangeOfUnit(otherUnit: Unit, distance: number): boolean;
    interruptAttack(): void;
    inTransport(whichTransport: Unit): boolean;
    isAlive(): boolean;
    isAlly(whichPlayer: MapPlayer): boolean;
    isEnemy(whichPlayer: MapPlayer): boolean;
    isExperienceSuspended(): boolean;
    isFogged(whichPlayer: MapPlayer): boolean;
    isHero(): boolean;
    isIllusion(): boolean;
    isLoaded(): boolean;
    isMasked(whichPlayer: MapPlayer): boolean;
    isSelected(whichPlayer: MapPlayer): boolean;
    issueBuildOrder(unit: string | number, x: number, y: number): boolean;
    issueImmediateOrder(order: string | OrderId): boolean;
    issueInstantOrderAt(order: string | OrderId, x: number, y: number, instantTargetWidget: Widget): boolean;
    issueInstantTargetOrder(order: string | OrderId, targetWidget: Widget, instantTargetWidget: Widget): boolean;
    issueOrderAt(order: string | OrderId, x: number, y: number): boolean;
    issuePointOrder(order: string | OrderId, whichPoint: Point): boolean;
    issueTargetOrder(order: string | OrderId, targetWidget: Widget): boolean;
    /**
     * @note Useless. Use operator == instead.
     */
    isUnit(whichSpecifiedUnit: Unit): boolean;
    /**
     * @note This native returns a boolean, which when typecasted to integer might be greater than 1. It's probably implemented via a bitset.
     * @note In past patches this native bugged when used in conditionfuncs.
     * The fix back then was to compare with true (`==true`).
     * I cannot reproduce the faulty behaviour in patch 1.27 so this is only a note.
     * @param whichUnitType
     */
    isUnitType(whichUnitType: unittype): boolean;
    isVisible(whichPlayer: MapPlayer): boolean;
    /**
     * Kills the unit.
     */
    kill(): void;
    /**
     * Locks a unit's bone to face the target until ResetUnitLookAt is called.
     *
     * The offset coordinates ( X, Y, Z ) are taken from the target's origin.
     * The bones will lock to the lookAtTarget, offset by those coordinates. You can't
     * have both the head and the chest locked to the target at the same time.
     * @param whichBone The bone to lock onto the target. The engine only supports
     * locking the head and the chest. To lock the head, you can put in any input
     * except a null string. To lock the chest, the string must start with `"bone_chest"`.
     * All leading spaces are ignored, it is case insensitive, and anything after the
     * first non-leading space will be ignored.
     * @param lookAtTargetThe bone will be locked to face this unit.
     * @param offsetX The x-offset from lookAtTarget's origin point.
     * @param offsetY The y-offset from lookAtTarget's origin point.
     * @param offsetZ The z-offset from lookAtTarget's origin point (this already factors in the terrain Z).
     * @note The parameter `whichBone` can only move the head bones and the chest bones.
     * All other input will default to the head bone. However, the function only looks
     * for the helper named `"Bone_Head"` (or `"Bone_Chest"`) in the MDL, so you can just
     * rename a helper so that it will move that set of bones instead.
     * @note SetUnitLookAt is affected by animation speed and blend time.
     * @note [How to instantly set a unit's facing](http://www.wc3c.net/showthread.php?t=105830)
     */
    lookAt(whichBone: string, lookAtTarget: Unit, offsetX: number, offsetY: number, offsetZ: number): void;
    /**
     * This native is used to keep abilities when morphing units
     */
    makeAbilityPermanent(permanent: boolean, abilityId: number): void;
    modifySkillPoints(skillPointDelta: number): boolean;
    pauseEx(flag: boolean): void;
    pauseTimedLife(flag: boolean): void;
    queueAnimation(whichAnimation: string): void;
    recycleGuardPosition(): void;
    removeAbility(abilityId: number): boolean;
    removeBuffs(removePositive: boolean, removeNegative: boolean): void;
    removeBuffsEx(removePositive: boolean, removeNegative: boolean, magic: boolean, physical: boolean, timedLife: boolean, aura: boolean, autoDispel: boolean): void;
    removeGuardPosition(): void;
    /**
     * The item is removed from the Hero and placed on the ground at the Hero's feet.
     * @param whichItem The item to remove.
     */
    removeItem(whichItem: Item): void;
    /**
     * If an item exists in the given slot, it is removed from the Hero and placed on
     * the ground at the Hero's feed
     * @param itemSlot
     */
    removeItemFromSlot(itemSlot: number): Item | undefined;
    removeItemFromStock(itemId: number): void;
    removeType(whichUnitType: unittype): boolean;
    removeUnitFromStock(itemId: number): void;
    resetCooldown(): void;
    /**
     * Unlocks the bone oriented by `lookAt`, allowing it to move in accordance to the unit's regular animations.
     */
    resetLookAt(): void;
    revive(x: number, y: number, doEyecandy: boolean): boolean;
    reviveAtPoint(whichPoint: Point, doEyecandy: boolean): boolean;
    select(flag: boolean): void;
    selectSkill(abilCode: number): void;
    setAbilityCooldown(abilId: number, level: number, cooldown: number): void;
    setAbilityLevel(abilCode: number, level: number): number;
    setAbilityManaCost(abilId: number, level: number, manaCost: number): void;
    setAgility(value: number, permanent: boolean): void;
    setAnimation(whichAnimation: string | number): void;
    setAnimationWithRarity(whichAnimation: string, rarity: raritycontrol): void;
    setAttackCooldown(cooldown: number, weaponIndex: number): void;
    setBaseDamage(baseDamage: number, weaponIndex: number): void;
    setBlendTime(timeScale: number): void;
    setConstructionProgress(constructionPercentage: number): void;
    setCreepGuard(creepGuard: boolean): void;
    setDiceNumber(diceNumber: number, weaponIndex: number): void;
    setDiceSides(diceSides: number, weaponIndex: number): void;
    setExperience(newXpVal: number, showEyeCandy: boolean): void;
    setExploded(exploded: boolean): void;
    setFacingEx(facingAngle: number): void;
    setField(field: unitbooleanfield | unitintegerfield | unitrealfield | unitstringfield, value: boolean | number | string): boolean;
    setflyHeight(value: number, rate: number): void;
    setHeroLevel(level: number, showEyeCandy: boolean): void;
    setIntelligence(value: number, permanent: boolean): void;
    setItemTypeSlots(slots: number): void;
    setOwner(whichPlayer: MapPlayer, changeColor?: boolean): void;
    getOwner(): MapPlayer | undefined;
    setPoint(point: Point): void;
    /**
     * @bug If the unit is loaded into a zeppelin this will not return the position
     * of the zeppelin but the last position of the unit before it was loaded into
     * the zeppelin.
     */
    getPoint(): Point | undefined;
    setPathing(flag: boolean): void;
    /**
     * @note This cancels the orders of the unit. If you want to move a unit without canceling its orders set `x`/`y`.
     */
    setPosition(x: number, y: number): void;
    setRescuable(byWhichPlayer: MapPlayer, flag: boolean): void;
    setRescueRange(range: number): void;
    /**
     * @bug Only takes scaleX into account and uses scaleX for all three dimensions.
     * @param scaleX This is actually the scale for *all* dimensions
     * @param scaleY This parameter is not taken into account
     * @param scaleZ This parameter is not taken into account
     */
    setScale(scaleX: number, scaleY: number, scaleZ: number): void;
    setState(whichUnitState: unitstate, newVal: number): void;
    setStrength(value: number, permanent: boolean): void;
    setTimeScale(timeScale: number): void;
    setUnitAttackCooldown(cooldown: number, weaponIndex: number): void;
    setUnitTypeSlots(slots: number): void;
    setUpgradeProgress(upgradePercentage: number): void;
    setUseAltIcon(flag: boolean): void;
    setUseFood(useFood: boolean): void;
    /**
     * Sets the unit's color to the color defined by (red,green,blue,alpha).
     * @param red An integer from 0-255 determining the amount of red color.
     * @param green An integer from 0-255 determining the amount of green color.
     * @param blue An integer from 0-255 determining the amount of blue color.
     * @param alpha An integer from 0-255 determining the amount of alpha color.
     */
    setVertexColor(red: number, green: number, blue: number, alpha: number): void;
    shareVision(whichPlayer: MapPlayer, share: boolean): void;
    showTeamGlow(show: boolean): void;
    startAbilityCooldown(abilCode: number, cooldown: number): void;
    stripLevels(howManyLevels: number): boolean;
    suspendDecay(suspend: boolean): void;
    suspendExperience(flag: boolean): void;
    useItem(whichItem: Item): boolean;
    useItemAt(whichItem: Item, x: number, y: number): boolean;
    useItemTarget(whichItem: Item, target: Widget): boolean;
    wakeUp(): void;
    waygateGetDestinationX(): number;
    waygateGetDestinationY(): number;
    waygateSetDestination(x: number, y: number): void;
    static foodMadeByType(unitId: number): number;
    static foodUsedByType(unitId: number): number;
    static fromEnum(): Unit | undefined;
    static fromEvent(): Unit | undefined;
    static fromFilter(): Unit | undefined;
    static fromHandle(handle: unit | undefined): Unit | undefined;
    static getPointValueByType(unitType: number): number;
    static isUnitIdHero(unitId: number): boolean;
    static isUnitIdType(unitId: number, whichUnitType: unittype): boolean;
}
