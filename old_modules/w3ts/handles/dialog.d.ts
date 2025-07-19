/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
import { MapPlayer } from "./player";
export declare class DialogButton extends Handle<button> {
    /**
     * @deprecated use `DialogButton.create` instead.
     */
    constructor(whichDialog: Dialog, text: string, hotkey?: number, quit?: boolean, score?: boolean);
    static create(whichDialog: Dialog, text: string, hotkey?: number, quit?: boolean, score?: boolean): DialogButton | undefined;
    static fromEvent(): DialogButton | undefined;
    static fromHandle(handle: button | undefined): DialogButton | undefined;
}
/**
 *
 * @example Create a simple dialog.
 * ```ts
 * const dialog = Dialog.create();
 * if (dialog) {
 *   const trigger = Trigger.create();
 *
 *   trigger.registerDialogEvent(dialog);
 *   trigger.addAction(() => {
 *     const clicked = DialogButton.fromEvent();
 *   });
 *
 *   Timer.create().start(1.00, false, () => {
 *     DialogButton.create(dialog, "Stay", 0);
 *     DialogButton.create(dialog, "Leave", 0, true);
 *
 *     dialog.setMessage("Welcome to TypeScript!");
 *     dialog.display(Players[0], true);
 *   });
 * }
 * ```
 */
export declare class Dialog extends Handle<dialog> {
    /**
     * @deprecated use `Dialog.create` instead.
     */
    constructor();
    static create(): Dialog | undefined;
    addButton(text: string, hotkey?: number, quit?: boolean, score?: boolean): DialogButton | undefined;
    clear(): void;
    destroy(): void;
    /**
     * @note Dialogs can not be shown at map-init. Use a wait or a zero-timer to display as soon as possible.
     */
    display(whichPlayer: MapPlayer, flag: boolean): void;
    setMessage(whichMessage: string): void;
    static fromEvent(): Dialog | undefined;
    static fromHandle(handle: dialog | undefined): Dialog | undefined;
}
