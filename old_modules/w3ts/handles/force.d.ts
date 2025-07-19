/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile * */
import { Handle } from "./handle";
import { MapPlayer } from "./player";
export declare class Force extends Handle<force> {
    /**
     * @deprecated use `Force.create` instead.
     */
    constructor();
    static create(): Force | undefined;
    addPlayer(whichPlayer: MapPlayer): void;
    clear(): void;
    destroy(): void;
    enumAllies(whichPlayer: MapPlayer, filter: boolexpr | (() => boolean)): void;
    enumEnemies(whichPlayer: MapPlayer, filter: boolexpr | (() => boolean)): void;
    enumPlayers(filter: boolexpr | (() => boolean)): void;
    enumPlayersCounted(filter: boolexpr | (() => boolean), countLimit: number): void;
    for(callback: () => void): void;
    /**
     * Returns all player handles belonging to this force
     */
    getPlayers(): MapPlayer[];
    hasPlayer(whichPlayer: MapPlayer): boolean;
    removePlayer(whichPlayer: MapPlayer): void;
    static fromPlayer(whichPlayer: MapPlayer): Force | undefined;
    static fromHandle(handle: force | undefined): Force | undefined;
}
