/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
export declare class Handle<T extends handle> {
    readonly handle: T;
    private static initHandle;
    protected constructor(handle?: T);
    /**
     * Get the unique ID of the handle. The ID is recycled once you destroy the object.
     * @returns The unique ID of a handle object.
     */
    get id(): number;
    protected static initFromHandle(): boolean;
    protected static getObject(handle: handle): any;
}
