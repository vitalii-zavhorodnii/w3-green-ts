/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { MapPlayer } from "./player";
import { Point } from "./point";
import { Widget } from "./widget";
export declare class Effect extends Handle<effect> {
    readonly attachWidget?: Widget;
    readonly attachPointName?: string;
    /**
     * @deprecated use `Effect.create` or `Effect.createAttachment` instead.
     * @param modelName The path of the model that the effect will use.
     * @param x
     * @param y
     */
    constructor(modelName: string, x: number, y: number);
    /**
     * @deprecated use `Effect.create` or `Effect.createAttachment` instead.
     * @param modelName The path of the model that the effect will use.
     * @param targetWidget The widget to attach the effect to.
     * @param attachPointName The attachment point of the widget where the effect will
     * be placed. Attachment points are points in a model that can be referenced to as
     * areas for effects to be attached, whether it be from a spell or this function.
     * If the attachment point does not exist, it will attach the effect to the model's origin.
     */
    constructor(modelName: string, targetWidget: Widget, attachPointName: string);
    /**
     * Creates a special effect.
     * @param modelName The path of the model that the effect will use.
     * @param x
     * @param y
     */
    static create(modelName: string, x: number, y: number): Effect | undefined;
    /**
     * Creates a special effect attached to a widget.
     * @param modelName The path of the model that the effect will use.
     * @param targetWidget The widget to attach the effect to.
     * @param attachPointName The attachment point of the widget where the effect will
     * be placed. Attachment points are points in a model that can be referenced to as
     * areas for effects to be attached, whether it be from a spell or this function.
     * If the attachment point does not exist, it will attach the effect to the model's origin.
     */
    static createAttachment(modelName: string, targetWidget: Widget, attachPointName: string): Effect | undefined;
    /**
     * Creates a spell visual effect at position.
     * ```ts
     * // Create Thunder Clap's caster art effect at [0,0]
     * const clap = Effect.createSpell(FourCC("AHtz"), EFFECT_TYPE_CASTER, 0, 0);
     * ```
     */
    static createSpell(abilityId: number, effectType: effecttype, x: number, y: number): Effect | undefined;
    /**
     * Creates a spell visual effect at position.
     * ```ts
     * const red = Players[0];
     * const peasant = Unit.create(red, FourCC("hpea"), 0, 0);
     * // Create Thunder Clap's caster art effect attached to "origin" of peasant.
     * const clap = Effect.createSpellAttachment(FourCC("AHtc"), EFFECT_TYPE_CASTER, peasant, "origin");
     * clap?.destroy();
     * ```
     */
    static createSpellAttachment(abilityId: number, effectType: effecttype, targetWidget: Widget, attachPointName: string): Effect | undefined;
    get scale(): number;
    set scale(scale: number);
    /**
     * Warning: asynchronous
     * @async
     */
    get x(): number;
    set x(x: number);
    /**
     * Warning: asynchronous
     * @async
     */
    get y(): number;
    set y(y: number);
    /**
     * Warning: asynchronous
     * @async
     */
    get z(): number;
    set z(z: number);
    addSubAnimation(subAnim: subanimtype): void;
    clearSubAnimations(): void;
    /**
     * Destroy the effect handle. This will play the effect's death animation.
     */
    destroy(): void;
    playAnimation(animType: animtype): void;
    playWithTimeScale(animType: animtype, timeScale: number): void;
    removeSubAnimation(subAnim: subanimtype): void;
    resetScaleMatrix(): void;
    setAlpha(alpha: number): void;
    setColor(red: number, green: number, blue: number): void;
    setColorByPlayer(whichPlayer: MapPlayer): void;
    setHeight(height: number): void;
    setOrientation(yaw: number, pitch: number, roll: number): void;
    setPitch(pitch: number): void;
    setPoint(p: Point): void;
    setPosition(x: number, y: number, z: number): void;
    setRoll(roll: number): void;
    setScaleMatrix(x: number, y: number, z: number): void;
    setTime(value: number): void;
    setTimeScale(timeScale: number): void;
    setYaw(y: number): void;
    static fromHandle(handle: effect | undefined): Effect | undefined;
}
