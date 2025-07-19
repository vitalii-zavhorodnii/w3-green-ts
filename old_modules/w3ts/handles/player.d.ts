/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Force } from "./force";
import { Handle } from "./handle";
import { Point } from "./point";
export declare class MapPlayer extends Handle<player> {
    /**
     * @deprecated use `MapPlayer.create` instead.
     */
    private constructor();
    private static create;
    set color(color: playercolor);
    get color(): playercolor;
    get controller(): mapcontrol;
    get handicap(): number;
    set handicap(handicap: number);
    get handicapXp(): number;
    set handicapXp(handicap: number);
    get id(): number;
    get name(): string;
    set name(value: string);
    get race(): race | undefined;
    get slotState(): playerslotstate;
    get startLocation(): number;
    get startLocationX(): number;
    get startLocationY(): number;
    get startLocationPoint(): location | undefined;
    get team(): number;
    get townHallCount(): number;
    /**
     * In upgrades that have multiple levels, it will research the upgrade by the number of levels specified.
     * @param techId The four digit rawcode ID of the upgrade.
     * @param levels The number of levels to add to the current research level of the upgrade.
     */
    addTechResearched(techId: number, levels: number): void;
    decTechResearched(techId: number, levels: number): void;
    /**
     * Used to store hero level data for the scorescreen, before units are moved to neutral passive in melee games.
     */
    cacheHeroData(): void;
    compareAlliance(otherPlayer: MapPlayer, whichAllianceSetting: alliancetype): boolean;
    coordsFogged(x: number, y: number): boolean;
    coordsMasked(x: number, y: number): boolean;
    coordsVisible(x: number, y: number): boolean;
    /**
     * Reveals a player's remaining buildings to a force.
     * The black mask over the buildings will be removed as if the territory had been discovered
     * @param toWhichPlayers The players who will see whichPlayer's buildings.
     * @param flag If true, the buildings will be revealed. If false, the buildings will not be revealed.
     * Note that if you set it to false, it will not hide the buildings with a black mask.
     * @note his function will not check whether the player has a town hall before revealing.
     */
    cripple(toWhichPlayers: Force, flag: boolean): void;
    getScore(whichPlayerScore: playerscore): number;
    getState(whichPlayerState: playerstate): number;
    getStructureCount(includeIncomplete: boolean): number;
    getTaxRate(otherPlayer: player, whichResource: playerstate): number;
    getTechCount(techId: number, specificonly: boolean): number;
    getTechMaxAllowed(techId: number): number;
    getTechResearched(techId: number, specificonly: boolean): boolean;
    getUnitCount(includeIncomplete: boolean): number;
    getUnitCountByType(unitName: string, includeIncomplete: boolean, includeUpgrades: boolean): number;
    inForce(whichForce: Force): boolean;
    isLocal(): boolean;
    isObserver(): boolean;
    isPlayerAlly(otherPlayer: MapPlayer): boolean;
    isPlayerEnemy(otherPlayer: MapPlayer): boolean;
    isRacePrefSet(pref: racepreference): boolean;
    isSelectable(): boolean;
    pointFogged(whichPoint: Point): boolean;
    pointMasked(whichPoint: Point): boolean;
    pointVisible(whichPoint: Point): boolean;
    remove(gameResult: playergameresult): void;
    removeAllGuardPositions(): void;
    setAbilityAvailable(abilId: number, avail: boolean): void;
    setAlliance(otherPlayer: MapPlayer, whichAllianceSetting: alliancetype, value: boolean): void;
    setOnScoreScreen(flag: boolean): void;
    setState(whichPlayerState: playerstate, value: number): void;
    setTaxRate(otherPlayer: MapPlayer, whichResource: playerstate, rate: number): void;
    setTechMaxAllowed(techId: number, maximum: number): void;
    setTechResearched(techId: number, setToLevel: number): void;
    setUnitsOwner(newOwner: number): void;
    static fromEnum(): MapPlayer | undefined;
    static fromEvent(): MapPlayer | undefined;
    static fromFilter(): MapPlayer | undefined;
    static fromHandle(handle: player | undefined): MapPlayer | undefined;
    static fromIndex(index: number): MapPlayer | undefined;
    /**
     * @async
     */
    static fromLocal(): MapPlayer;
}
