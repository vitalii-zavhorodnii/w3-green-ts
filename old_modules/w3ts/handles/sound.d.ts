/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
export declare class Sound extends Handle<sound> {
    /**
     * @deprecated use `Sound.create` instead.
     */
    constructor(fileName: string, looping: boolean, is3D: boolean, stopWhenOutOfRange: boolean, fadeInRate: number, fadeOutRate: number, eaxSetting: string);
    /**
     * Creates a sound handle.
     * @note You can only play the same sound handle once.
     * @note You can only play the same sound filepath four times.
     * @note You can only play 16 sounds in general.
     * @note Sounds of the same filepath (on different sound handles) must have a delay
     * of at least 0.1 seconds inbetween them to be played.
     * You can overcome this by starting one earlier and then using `SetSoundPosition`.
     * @param fileName The path to the file.
     * @param looping Looping sounds will restart once the sound duration has finished.
     * @param is3D 3D Sounds can be played on particular areas of the map. They are at their loudest when the camera is close to the sound's coordinates.
     * @param stopWhenOutOfRange
     * @param fadeInRate How quickly the sound fades in. The higher the number, the faster the sound fades in. Maximum number is 127.
     * @param fadeOutRate How quickly the sound fades out. The higher the number, the faster the sound fades out. Maximum number is 127.
     * @param eaxSetting EAX is an acronym for environmental audio extensions. In the sound editor, this corresponds to the "Effect" setting.
     */
    static create(fileName: string, looping: boolean, is3D: boolean, stopWhenOutOfRange: boolean, fadeInRate: number, fadeOutRate: number, eaxSetting: string): Sound | undefined;
    get dialogueSpeakerNameKey(): string;
    set dialogueSpeakerNameKey(speakerName: string);
    get dialogueTextKey(): string;
    set dialogueTextKey(dialogueText: string);
    get duration(): number;
    set duration(duration: number);
    get loading(): boolean;
    get playing(): boolean;
    killWhenDone(): void;
    registerStacked(byPosition: boolean, rectWidth: number, rectHeight: number): void;
    setChannel(channel: number): void;
    /**
     * @note This call is only valid if the sound was created with 3d enabled
     */
    setConeAngles(inside: number, outside: number, outsideVolume: number): void;
    /**
     * @note This call is only valid if the sound was created with 3d enabled
     */
    setConeOrientation(x: number, y: number, z: number): void;
    setDistanceCutoff(cutoff: number): void;
    /**
     * @note This call is only valid if the sound was created with 3d enabled
     */
    setDistances(minDist: number, maxDist: number): void;
    setFacialAnimationFilepath(animationSetFilepath: string): void;
    setFacialAnimationGroupLabel(groupLabel: string): void;
    setFacialAnimationLabel(animationLabel: string): void;
    /**
     * pplies default settings to the sound.
     * @param soundLabel The label out of one of the SLK-files, whose settings should be used, e.g. values like volume, pitch, pitch variance, priority, channel, min distance, max distance, distance cutoff or eax.
     */
    setParamsFromLabel(soundLabel: string): void;
    /**
     * Tones the pitch of the sound, default value is 1.
     * Increasing it you get the chipmunk version and the sound becomes shorter, when decremented the sound becomes low-pitched and longer.
     * @param pitch
     * @bug This native has very weird behaviour.
     * See [this](http://www.hiveworkshop.com/threads/setsoundpitch-weirdness.215743/#post-2145419) for an explenation
     * and [this](http://www.hiveworkshop.com/threads/snippet-rapidsound.258991/#post-2611724) for a non-bugged implementation.
     */
    setPitch(pitch: number): void;
    /**
     * Must be called immediately after starting the sound
     * @param millisecs
     */
    setPlayPosition(millisecs: number): void;
    /**
     * @note This call is only valid if the sound was created with 3d enabled
     */
    setPosition(x: number, y: number, z: number): void;
    /**
     * @note This call is only valid if the sound was created with 3d enabled
     */
    setVelocity(x: number, y: number, z: number): void;
    /**
     * Sets the sounds volume
     * @param volume Volume, between 0 and 127
     */
    setVolume(volume: number): void;
    /**
     * Starts the sound.
     * @note You can only play the same sound handle once.
     * @note You can only play 16 sounds in general.
     * @note Sounds of the same filepath (on different sound handles) must have a delay of at least 0.1 seconds inbetween them to be played.
     * You can overcome this by starting one earlier and then using `setPosition`.
     */
    start(): void;
    /**
     * Stops the sound.
     * @param killWhenDone The sound gets destroyed if true.
     * @param fadeOut Turns down the volume with `fadeOutRate` as stated in constructor.
     */
    stop(killWhenDone: boolean, fadeOut: boolean): void;
    unregisterStacked(byPosition: boolean, rectWidth: number, rectHeight: number): void;
    static fromHandle(handle: sound | undefined): Sound | undefined;
    static getFileDuration(fileName: string): number;
}
