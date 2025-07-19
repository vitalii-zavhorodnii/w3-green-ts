/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
import { Widget } from "./widget";
export declare class Destructable extends Widget {
    readonly handle: destructable;
    readonly skin?: number;
    /** @deprecated use `Destructable.create` or `Destructable.createZ` instead. */
    constructor(objectId: number, x: number, y: number, z: number, face: number, scale: number, variation: number);
    /**
     * Creates a destructable at the specified x-y coordinates.
     * @param objectId The rawcode of the destructable to be created.
     * @param x The x-coordinate of the Destructable.
     * @param y The y-coordinate of the Destructable.
     * @param face The facing of the Destructable.
     * @param scale The X-Y-Z scaling value of the Destructable.
     * @param variation The integer representing the variation of the Destructable to be created.
     * @param skinId The integer representing the skin of the Destructable to be created.
     */
    static create(objectId: number, x: number, y: number, face?: number, scale?: number, variation?: number, skinId?: number): Destructable | undefined;
    /**
     * Creates a destructable at the specified x-y-z coordinates.
     * @param objectId The rawcode of the destructable to be created.
     * @param x The x-coordinate of the Destructable.
     * @param y The y-coordinate of the Destructable.
     * @param z The z-coordinate of the Destructable.
     * @param face The facing of the Destructable.
     * @param scale The X-Y-Z scaling value of the Destructable.
     * @param variation The integer representing the variation of the Destructable to be created.
     * @param skinId The integer representing the skin of the Destructable to be created.
     */
    static createZ(objectId: number, x: number, y: number, z: number, face?: number, scale?: number, variation?: number, skinId?: number): Destructable | undefined;
    set invulnerable(flag: boolean);
    get invulnerable(): boolean;
    get life(): number;
    set life(value: number);
    get maxLife(): number;
    set maxLife(value: number);
    /**
     * This will return different values depending on the locale.
     */
    get name(): string | undefined;
    get occluderHeight(): number;
    set occluderHeight(value: number);
    get typeId(): number;
    get x(): number;
    get y(): number;
    destroy(): void;
    /**
     * Resurrects a Destructable with the specified hit points.
     * @param life The amount of hit points the Destructable will have when it is
     * resurrected. A value of 0, or any value above the Destructable's maximum HP,
     * will give the Destructable its maximum HP (as defined in the object editor).
     * Any value below 0.5 will give the Destructable 0.5 hit points.
     * @param birth If true, the Destructable will play its birth animation upon resurrection.
     */
    heal(life: number, birth: boolean): void;
    kill(): void;
    queueAnim(whichAnimation: string): void;
    setAnim(whichAnimation: string): void;
    setAnimSpeed(speedFactor: number): void;
    show(flag: boolean): void;
    static fromEvent(): Destructable | undefined;
    static fromHandle(handle: destructable | undefined): Destructable | undefined;
}
