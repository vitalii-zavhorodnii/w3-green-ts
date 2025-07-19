/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
export declare class Widget extends Handle<widget> {
    /**
     * Get the Widget's life.
     */
    get life(): number;
    /**
     * Set the Widget's life.
     */
    set life(value: number);
    /**
     * Get the Widget's x-coordinate
     */
    get x(): number;
    /**
     * Get the Widget's y-coordinate
     */
    get y(): number;
    static fromEvent(): Widget | undefined;
    static fromHandle(handle: widget | undefined): Widget | undefined;
}
