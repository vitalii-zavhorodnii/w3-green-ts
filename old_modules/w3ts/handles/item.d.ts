/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Widget } from "./widget";
export declare class Item extends Widget {
    readonly handle: item;
    /**
     * @deprecated use `Item.create` instead.
     * @param itemId The rawcode of the item.
     * @param x The x-coordinate of the item
     * @param y The y-coordinate of the item
     * @param skinId  The skin ID of the item.
     */
    constructor(itemId: number, x: number, y: number, skinId?: number);
    /**
     * Creates an item object at the specified coordinates.
     * @param itemId The rawcode of the item.
     * @param x The x-coordinate of the item
     * @param y The y-coordinate of the item
     * @param skinId  The skin ID of the item.
     */
    static create(itemId: number, x: number, y: number, skinId?: number): Item | undefined;
    get charges(): number;
    set charges(value: number);
    set invulnerable(flag: boolean);
    get invulnerable(): boolean;
    get level(): number;
    /**
     * @async
     */
    get description(): string;
    set description(description: string);
    /**
     * @async
     */
    get extendedTooltip(): string;
    set extendedTooltip(tooltip: string);
    /**
     * @async
     */
    get icon(): string;
    set icon(path: string);
    /**
     * @async
     */
    get name(): string;
    set name(value: string);
    /**
     * @async
     */
    get tooltip(): string;
    set tooltip(tooltip: string);
    get pawnable(): boolean;
    set pawnable(flag: boolean);
    get player(): player | undefined;
    get type(): itemtype | undefined;
    get typeId(): number;
    get userData(): number;
    set userData(value: number);
    get visible(): boolean;
    set visible(flag: boolean);
    get skin(): number;
    set skin(skinId: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    addAbility(abilCode: number): void;
    getAbility(abilCode: number): ability | undefined;
    getAbilityByIndex(index: number): ability | undefined;
    removeAbility(abilCode: number): void;
    destroy(): void;
    getField(field: itembooleanfield | itemintegerfield | itemrealfield | itemstringfield): string | number | boolean | undefined;
    isOwned(): boolean;
    isPawnable(): boolean;
    isPowerup(): boolean;
    isSellable(): boolean;
    setDropId(unitId: number): void;
    setDropOnDeath(flag: boolean): void;
    setDroppable(flag: boolean): void;
    setField(field: itembooleanfield | itemintegerfield | itemrealfield | itemstringfield, value: boolean | number | string): boolean;
    setOwner(whichPlayer: MapPlayer, changeColor: boolean): void;
    setPoint(whichPoint: Point): void;
    setPosition(x: number, y: number): void;
    static fromEvent(): Item | undefined;
    static fromHandle(handle: item | undefined): Item | undefined;
    static isIdPawnable(itemId: number): boolean;
    static isIdPowerup(itemId: number): boolean;
    static isIdSellable(itemId: number): boolean;
}
