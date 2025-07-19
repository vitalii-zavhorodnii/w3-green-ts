/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { Point } from "./point";
import { Rectangle } from "./rect";
import { Unit } from "./unit";
export declare class Region extends Handle<region> {
    /**
     * @deprecated use `Region.create` instead.
     */
    constructor();
    static create(): Region;
    addCell(x: number, y: number): void;
    addCellPoint(whichPoint: Point): void;
    addRect(r: Rectangle): void;
    clearCell(x: number, y: number): void;
    clearCellPoint(whichPoint: Point): void;
    clearRect(r: Rectangle): void;
    containsCoords(x: number, y: number): boolean;
    containsPoint(whichPoint: Point): void;
    containsUnit(whichUnit: Unit): boolean;
    destroy(): void;
    static fromEvent(): Region | undefined;
    static fromHandle(handle: region | undefined): Region | undefined;
}
