/** @noSelfInFile */
/** @noSelfInFile */
import { MapPlayer } from "../handles/player";
export declare const enum SyncStatus {
    None = 0,
    Syncing = 1,
    Success = 2,
    Timeout = 3
}
export interface ISyncResponse {
    data: string;
    status: SyncStatus;
    time: number;
}
export interface ISyncOptions {
    timeout: number;
}
export type SyncCallback = (res: ISyncResponse, req: SyncRequest) => void;
/**
 * A system which provides an easy way to synchronize data between game clients.
 * The data will be split into chunks and sent in order until all of them are recieved by
 * every player. Splitting the data is required as `BlzSendSyncData` only allows 255 characters
 * per request.
 *
 * @example
 * ```ts
 * const data = File.read("savecode.txt");
 *
 * // Synchronize the contents of the file from the first player's computer.
 * new SyncRequest(Players[0], data).then((res, req) => {
 *  print(res.data);
 * });
 * ```
 */
export declare class SyncRequest {
    readonly from: MapPlayer;
    readonly id: number;
    readonly options: ISyncOptions;
    private _startTime;
    private chunks;
    private currentChunk;
    private destroyed;
    private onError?;
    private onResponse?;
    private status;
    private static readonly cache;
    private static counter;
    private static defaultOptions;
    private static eventTrigger;
    private static index;
    private static indicies;
    private static initialized;
    /**
     * Creates a new sync request.
     * @param from The player to send the data from.
     */
    constructor(from: MapPlayer);
    /**
     * Creates a new sync request and immediately attempts to send the data.
     * @param from The player to send the data from.
     * @param data The data to send.
     */
    constructor(from: MapPlayer, data: string);
    /**
     * Get the time that the sync request started syncing.
     */
    get startTime(): number;
    /**
     * Sets the callback for when a request failed.
     * @param callback
     */
    catch(callback: SyncCallback): this;
    /**
     * Recycles the request index and prevents it from sending any more data.
     */
    destroy(): void;
    /**
     * Start syncing
     * @param data The data to sync. If data was passed to the constructor then nothing will happen.
     */
    start(data: string): boolean;
    /**
     * Sets the callback for when a request has sucessfully synchronized.
     * @param callback
     */
    then(callback: SyncCallback): this;
    /**
     * Allocates a unique index.
     */
    private static allocate;
    /**
     * Encode and send the data from the correct player.
     * @param data
     */
    private send;
    /**
     * Retrieve a request based on it's index
     * @param index The request index
     */
    static fromIndex(index: number): SyncRequest;
    /**
     * Initialize
     */
    private static init;
    /**
     * Handler for all sync responses
     */
    private static onSync;
}
