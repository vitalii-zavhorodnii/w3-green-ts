/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Rectangle } from "./rect";
import { Unit } from "./unit";
import { Widget } from "./widget";
export declare class Group extends Handle<group> {
    /**
     * @deprecated use `Group.create` instead.
     */
    constructor();
    static create(): Group | undefined;
    addGroupFast(addGroup: Group): number;
    addUnit(whichUnit: Unit): boolean;
    clear(): void;
    destroy(): void;
    enumUnitsInRange(x: number, y: number, radius: number, filter: boolexpr | (() => boolean)): void;
    /**
     * @bug Causes irregular behavior when used with large numbers
     */
    enumUnitsInRangeCounted(x: number, y: number, radius: number, filter: boolexpr | (() => boolean), countLimit: number): void;
    enumUnitsInRangeOfPoint(whichPoint: Point, radius: number, filter: boolexpr | (() => boolean)): void;
    /**
     * @bug Causes irregular behavior when used with large numbers
     */
    enumUnitsInRangeOfPointCounted(whichPoint: Point, radius: number, filter: boolexpr | (() => boolean), countLimit: number): void;
    enumUnitsInRect(r: Rectangle, filter: boolexpr | (() => boolean)): void;
    /**
     * @bug Causes irregular behavior when used with large numbers
     */
    enumUnitsInRectCounted(r: Rectangle, filter: boolexpr | (() => boolean), countLimit: number): void;
    /**
     * @note In contrast to other Enum-functions this function enumarates units with locust.
     */
    enumUnitsOfPlayer(whichPlayer: MapPlayer, filter: boolexpr | (() => boolean)): void;
    enumUnitsOfType(unitName: string, filter: boolexpr | (() => boolean)): void;
    /**
     * @bug Causes irregular behavior when used with large numbers
     */
    enumUnitsOfTypeCounted(unitName: string, filter: boolexpr | (() => boolean), countLimit: number): void;
    enumUnitsSelected(whichPlayer: MapPlayer, filter: boolexpr | (() => boolean)): void;
    for(callback: () => void): void;
    /**
     * @bug May return `null` even if there are still units in the group.
     * This happens when a unit in the group dies and decays since the group still
     * holds a reference to that unit but that unit is pretty much null.
     * See http://wc3c.net/showthread.php?t=104464.
     */
    get first(): Unit | undefined;
    get size(): number;
    getUnits(): Unit[];
    getUnitAt(index: number): Unit | undefined;
    hasUnit(whichUnit: Unit): boolean;
    orderCoords(order: string | number, x: number, y: number): void;
    orderImmediate(order: string | number): void;
    orderPoint(order: string | number, whichPoint: Point): void;
    orderTarget(order: string | number, targetWidget: Widget | Unit): void;
    removeGroupFast(removeGroup: Group): number;
    removeUnit(whichUnit: Unit): boolean;
    static fromHandle(handle: group | undefined): Group | undefined;
    static getEnumUnit(): Unit | undefined;
    static getFilterUnit(): Unit | undefined;
}
