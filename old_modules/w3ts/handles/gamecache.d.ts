/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { MapPlayer } from "./player";
export declare class GameCache extends Handle<gamecache> {
    readonly filename?: string;
    /**
     * @deprecated use `GameCache.create` instead.
     */
    constructor(campaignFile: string);
    /**
     * @note You cannot create more than 255 gamecaches
     */
    static create(campaignFile: string): GameCache | undefined;
    flush(): void;
    flushBoolean(missionKey: string, key: string): void;
    flushInteger(missionKey: string, key: string): void;
    flushMission(missionKey: string): void;
    flushNumber(missionKey: string, key: string): void;
    flushString(missionKey: string, key: string): void;
    flushUnit(missionKey: string, key: string): void;
    /**
     * Returns false if the specified value's data is not found in the cache.
     */
    getBoolean(missionKey: string, key: string): boolean;
    /**
     * Returns 0 if the specified value's data is not found in the cache.
     */
    getInteger(missionKey: string, key: string): number;
    /**
     * Returns 0 if the specified value's data is not found in the cache.
     */
    getNumber(missionKey: string, key: string): number;
    /**
     * Returns "" if the specified value's data is not found in the cache.
     */
    getString(missionKey: string, key: string): string | undefined;
    hasBoolean(missionKey: string, key: string): boolean;
    hasInteger(missionKey: string, key: string): boolean;
    hasNumber(missionKey: string, key: string): boolean;
    hasString(missionKey: string, key: string): boolean;
    /**
     * Returns null if the specified value's data is not found in the cache.
     */
    restoreUnit(missionKey: string, key: string, forWhichPlayer: MapPlayer, x: number, y: number, face: number): unit | undefined;
    save(): boolean;
    store(missionKey: string, key: string, value: number | string | boolean | unit): void;
    syncBoolean(missionKey: string, key: string): void;
    syncInteger(missionKey: string, key: string): void;
    syncNumber(missionKey: string, key: string): void;
    syncString(missionKey: string, key: string): void;
    syncUnit(missionKey: string, key: string): void;
    static fromHandle(handle: gamecache | undefined): GameCache | undefined;
    static reloadFromDisk(): boolean;
}
