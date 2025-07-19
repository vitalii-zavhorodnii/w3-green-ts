/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
export declare class Timer extends Handle<timer> {
    /** @deprecated use `Timer.create` instead. */
    constructor();
    static create(): Timer;
    get elapsed(): number;
    /**
     * @bug This might not return the correct value if the timer was paused and restarted at one point. See http://www.wc3c.net/showthread.php?t=95756.
     */
    get remaining(): number;
    get timeout(): number;
    destroy(): this;
    pause(): this;
    resume(): this;
    start(timeout: number, periodic: boolean, handlerFunc: () => void): this;
    /**
     * @bug Might crash the game if called when there is no expired timer.
     */
    static fromExpired(): Timer | undefined;
    static fromHandle(handle: timer | undefined): Timer | undefined;
}
