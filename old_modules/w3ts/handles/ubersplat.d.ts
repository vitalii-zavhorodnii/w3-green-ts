/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
export declare class Ubersplat extends Handle<ubersplat> {
    /** @deprecated use `Ubersplat.create` instead. */
    constructor(x: number, y: number, name: string, red: number, green: number, blue: number, alpha: number, forcePaused: boolean, noBirthTime: boolean);
    static create(x: number, y: number, name: string, red: number, green: number, blue: number, alpha: number, forcePaused: boolean, noBirthTime: boolean): Ubersplat | undefined;
    destroy(): void;
    /**
     * @bug Does nothing.
     */
    finish(): void;
    render(flag: boolean, always?: boolean): void;
    /**
     * @bug Does nothing.
     */
    reset(): void;
    show(flag: boolean): void;
    static fromHandle(handle: ubersplat | undefined): Ubersplat | undefined;
}
