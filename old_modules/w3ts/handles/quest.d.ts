/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
export declare class QuestItem extends Handle<questitem> {
    readonly quest?: Quest;
    /** @deprecated use `QuestItem.create` instead. */
    constructor(whichQuest: Quest);
    static create(whichQuest: Quest): QuestItem | undefined;
    setDescription(description: string): void;
    get completed(): boolean;
    set completed(completed: boolean);
}
export declare class Quest extends Handle<quest> {
    /**
     * @deprecated use `Quest.create` instead.
     * @bug Do not use this in a global initialisation as it crashes the game there.
     */
    constructor();
    /**
     * @bug Do not use this in a global initialisation as it crashes the game there.
     */
    static create(): Quest | undefined;
    get completed(): boolean;
    set completed(completed: boolean);
    get discovered(): boolean;
    set discovered(discovered: boolean);
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get failed(): boolean;
    set failed(failed: boolean);
    get required(): boolean;
    set required(required: boolean);
    addItem(description: string): QuestItem | undefined;
    destroy(): void;
    setDescription(description: string): void;
    setIcon(iconPath: string): void;
    setTitle(title: string): void;
    static flashQuestDialogButton(): void;
    static forceQuestDialogUpdate(): void;
    static fromHandle(handle: quest | undefined): Quest | undefined;
}
