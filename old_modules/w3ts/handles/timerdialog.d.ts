/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { Timer } from "./timer";
export declare class TimerDialog extends Handle<timerdialog> {
    /** @deprecated use `TimerDialog.create` instead. */
    constructor(t: Timer);
    static create(t: Timer): TimerDialog | undefined;
    get display(): boolean;
    set display(display: boolean);
    destroy(): void;
    setSpeed(speedMultFactor: number): void;
    setTimeRemaining(value: number): void;
    setTitle(title: string): void;
    /**
     * Sets the timer-dialogs color.
     * @param red An integer from 0-255 determining the amount of red color.
     * @param green An integer from 0-255 determining the amount of red color.
     * @param blue An integer from 0-255 determining the amount of red color.
     * @param alpha An integer from 0-255 determining the amount of red color.
     */
    setTitleColor(red: number, green: number, blue: number, alpha: number): void;
    /**
     * Sets the timer-dialogs time color.
     * @param red An integer from 0-255 determining the amount of red color.
     * @param green An integer from 0-255 determining the amount of red color.
     * @param blue An integer from 0-255 determining the amount of red color.
     * @param alpha An integer from 0-255 determining the amount of red color.
     */
    setTimeColor(red: number, green: number, blue: number, alpha: number): void;
    static fromHandle(handle: timerdialog | undefined): TimerDialog | undefined;
}
