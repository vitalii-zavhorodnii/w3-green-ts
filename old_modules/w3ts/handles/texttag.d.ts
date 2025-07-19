/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { Unit } from "./unit";
export declare class TextTag extends Handle<texttag> {
    /** @deprecated use `TextTag.create` instead. */
    constructor();
    static create(): TextTag | undefined;
    destroy(): void;
    setAge(age: number): void;
    setColor(red: number, green: number, blue: number, alpha: number): void;
    setFadepoint(fadepoint: number): void;
    setLifespan(lifespan: number): void;
    setPermanent(flag: boolean): void;
    setPos(x: number, y: number, heightOffset: number): void;
    setPosUnit(u: Unit, heightOffset: number): void;
    setSuspended(flag: boolean): void;
    setText(s: string, height: number, adjustHeight?: boolean): void;
    setVelocity(xvel: number, yvel: number): void;
    setVelocityAngle(speed: number, angle: number): void;
    setVisible(flag: boolean): void;
    static fromHandle(handle: texttag | undefined): TextTag | undefined;
}
