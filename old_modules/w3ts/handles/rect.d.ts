/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { Point } from "./point";
export declare class Rectangle extends Handle<rect> {
    /**
     * @deprecated use `Rectangle.create` instead.
     */
    constructor(minX: number, minY: number, maxX: number, maxY: number);
    static create(minX: number, minY: number, maxX: number, maxY: number): Rectangle;
    get centerX(): number;
    get centerY(): number;
    get maxX(): number;
    get maxY(): number;
    get minX(): number;
    get minY(): number;
    destroy(): void;
    enumDestructables(filter: boolexpr | (() => boolean), actionFunc: () => void): void;
    enumItems(filter: boolexpr | (() => boolean), actionFunc: () => void): void;
    move(newCenterX: number, newCenterY: number): void;
    movePoint(newCenterPoint: Point): void;
    setRect(minX: number, minY: number, maxX: number, maxY: number): void;
    setRectFromPoint(min: Point, max: Point): void;
    static fromHandle(handle: rect | undefined): Rectangle | undefined;
    static fromPoint(min: Point, max: Point): Rectangle | undefined;
    static getWorldBounds(): Rectangle | undefined;
}
