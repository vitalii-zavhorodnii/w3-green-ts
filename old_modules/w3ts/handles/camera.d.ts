/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { Point } from "./point";
export declare class Camera {
    private constructor();
    static set visible(flag: boolean);
    static get visible(): boolean;
    /**
     * Return-value for the local players camera only.
     */
    static get boundMinX(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get boundMinY(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get boundMaxX(): number;
    static get boundMaxY(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get targetX(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get targetY(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get targetZ(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get eyeX(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get eyeY(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get eyeZ(): number;
    /**
     * Return-value for the local players camera only.
     */
    static get eyePoint(): Point | undefined;
    /**
     * Return-value for the local players camera only.
     */
    static get targetPoint(): Point | undefined;
    /**
     * Changes one of the game camera's options whichField by offset over duration seconds.
     * @param whichField
     * @param offset
     * @param duration
     */
    static adjustField(whichField: camerafield, offset: number, duration: number): void;
    static endCinematicScene(): void;
    static forceCinematicSubtitles(flag: boolean): void;
    /**
     * Return-value for the local players camera only.
     */
    static getField(field: camerafield): number;
    static getMargin(whichMargin: number): number;
    static pan(x: number, y: number, zOffsetDest: number | undefined): void;
    static panTimed(x: number, y: number, duration: number, zOffsetDest: number | undefined): void;
    static reset(duration: number): void;
    static setBounds(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): void;
    static setCameraOrientController(whichUnit: unit, xOffset: number, yOffset: number): void;
    static setCineFilterBlendMode(whichMode: blendmode): void;
    static setCineFilterDuration(duration: number): void;
    static setCineFilterEndColor(red: number, green: number, blue: number, alpha: number): void;
    static setCineFilterEndUV(minU: number, minV: number, maxU: number, maxV: number): void;
    static setCineFilterStartColor(red: number, green: number, blue: number, alpha: number): void;
    static setCineFilterStartUV(minU: number, minV: number, maxU: number, maxV: number): void;
    static setCineFilterTexMapFlags(whichFlags: texmapflags): void;
    static setCineFilterTexture(fileName: string): void;
    static setCinematicAudio(cinematicAudio: boolean): void;
    static setCinematicCamera(cameraModelFile: string): void;
    static SetCinematicScene(portraitUnitId: number, color: playercolor, speakerTitle: string, text: string, sceneDuration: number, voiceoverDuration: number): void;
    static setDepthOfFieldScale(scale: number): void;
    static setField(whichField: camerafield, value: number, duration: number): void;
    static setFocalDistance(distance: number): void;
    static setPos(x: number, y: number): void;
    static setRotateMode(x: number, y: number, radiansToSweep: number, duration: number): void;
    static setSmoothingFactor(factor: number): void;
    static setSourceNoise(mag: number, velocity: number, vertOnly?: boolean): void;
    static setTargetController(whichUnit: unit, xOffset: number, yOffset: number, inheritOrientation: boolean): void;
    static setTargetNoise(mag: number, velocity: number, vertOnly?: boolean): void;
    static stop(): void;
}
export declare class CameraSetup extends Handle<camerasetup> {
    /**
     * @deprecated use `CameraSetup.create` instead.
     */
    constructor();
    /**
     * Creates a new CameraSetup object.
     */
    static create(): CameraSetup | undefined;
    /**
     * Returns the target Point of a CameraSetup.
     */
    get destPoint(): Point | undefined;
    /**
     * Returns the target x-coordinate of a CameraSetup.
     */
    get destX(): number;
    /**
     * Sets the target x-coordinate of a CameraSetup.
     */
    set destX(x: number);
    /**
     * Returns the target y-coordinate of a CameraSetup.
     */
    get destY(): number;
    /**
     * Sets the target y-coordinate of a CameraSetup.
     */
    set destY(y: number);
    /**
     * Sets the label of a CameraSetup.
     */
    set label(label: string);
    /**
     * Gets the label of a CameraSetup.
     */
    get label(): string;
    /**
     * Applies the CameraSetup, altering the current camera's fields to match those of the camera setup.
     * @param doPan If set to true, it will move the current camera's target coordinates to the
     * camera setup's target coordinates. If false, the camera will not move
     * coordinates, but will still apply the other fields.
     * @param panTimed If set to true, then it will change the camera's properties over the times specified in `CameraSetup.setField`.
     */
    apply(doPan: boolean, panTimed: boolean): void;
    /**
     * Applies the camerasetup over a certain duration, altering the current camera's fields to match those of the camera setup.
     * @param doPan If set to true, it will move the current camera's target coordinates to the
     * camera setup's target coordinates. If false, the camera will not move
     * coordinates, but will still apply the other fields.
     * @param forceDuration The duration it will take to apply all the camera fields. It will ignore the times set by `CameraSetup.setField`.
     */
    applyForceDuration(doPan: boolean, forceDuration: number): void;
    /**
     *
     * @param doPan If set to true, it will move the current camera's target coordinates to the
     * camera setup's target coordinates. If false, the camera will not move
     * coordinates, but will still apply the other fields.
     * @param forcedDuration The duration it will take to apply all the camera fields. It will ignore the times set by `CameraSetup.setField`.
     * @param easeInDuration
     * @param easeOutDuration
     * @param smoothFactor
     */
    applyForceDurationSmooth(doPan: boolean, forcedDuration: number, easeInDuration: number, easeOutDuration: number, smoothFactor: number): void;
    /**
     * Applies the CameraSetup over a certain duration with a custom z-offset value,
     * altering the current camera's fields to match those of the camera setup.
     * The z-offset input will override the z-offset specified by `CameraSetup.setField`.
     * @param zDestOffset The camera's z-offset will gradually change to this value over the specified duration.
     * @param forceDuration The duration it will take to apply all the camera fields. It will ignore the times set by `CameraSetup.setField`.
     */
    applyForceDurationZ(zDestOffset: number, forceDuration: number): void;
    /**
     * Applies the CameraSetup with a custom z-offset, altering the current camera's
     * fields to match those of the camera setup. The z-offset input will override
     * the z-offset specified by the CameraSetup through `CameraSetup.setField`.
     * @param zDestOffset The camera's z-offset will gradually change to this value over the specified duration.
     * @bug If a player pauses the game after the CameraSetup has been applied, the z-offset of the game camera will change to the z-offset of the CameraSetup for that player.
     */
    applyZ(zDestOffset: number): void;
    /**
     * Returns the value of the specified field for a CameraSetup. The angle of attack,
     * field of view, roll, and rotation are all returned in degrees, unlike `Camera.getField`.
     * @param whichField The field of the CameraSetup.
     * @note The angle of attack, field of view, roll, and rotation are all returned in degrees.
     */
    getField(whichField: camerafield): number;
    /**
     * Sets the target coordinates for a CameraSetup over a duration. The coordinate
     * change will only be applied when `CameraSetup.apply` (or some other variant) is ran.
     * @param x The target x-coordinate.
     * @param y The target y-coordinate.
     * @param duration The coordinates will be applied over this duration once the camera setup is applied.
     */
    setDestPos(x: number, y: number, duration: number): void;
    /**
     * Assigns a value to the specified field for a CameraSetup. The input angles should be in degrees.
     * @param whichField The field of the CameraSetup.
     * @param value The value to assign to the field.
     * @param duration The duration over which the field will be set. If the duration is greater than 0, the changes will be made gradually once the camera setup is applied.
     */
    setField(whichField: camerafield, value: number, duration: number): void;
    static fromHandle(handle: camerasetup | undefined): CameraSetup | undefined;
}
