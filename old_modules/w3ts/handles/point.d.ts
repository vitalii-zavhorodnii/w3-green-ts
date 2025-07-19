/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
export declare class Point extends Handle<location> {
    /**
     * @deprecated use `Point.create` instead.
     */
    constructor(x: number, y: number);
    /**
     * Creates a new location handle. Generally, raw coordinates should be used instead.
     * @param x
     * @param y
     */
    static create(x: number, y: number): Point;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    /**
     * This function is asynchronous. The values it returns are not guaranteed synchronous between each player.
     * If you attempt to use it in a synchronous manner, it may cause a desync.
     * @note Reasons for returning different values might be terrain-deformations caused by spells/abilities and different graphic settings.
     * Other reasons could be the rendering state of destructables and visibility differences.
     * @async
     */
    get z(): number;
    destroy(): void;
    setPosition(x: number, y: number): void;
    static fromHandle(handle: location | undefined): Point | undefined;
}
