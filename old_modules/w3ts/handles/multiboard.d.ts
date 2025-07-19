/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
export declare class MultiboardItem extends Handle<multiboarditem> {
    /**
     * @deprecated use `MultiboardItem.create` instead.
     */
    constructor(board: Multiboard, x: number, y: number);
    static create(board: Multiboard, x: number, y: number): MultiboardItem | undefined;
    destroy(): void;
    setIcon(icon: string): void;
    setStyle(showValue: boolean, showIcon: boolean): void;
    setValue(val: string): void;
    setValueColor(red: number, green: number, blue: number, alpha: number): void;
    setWidth(width: number): void;
    static fromHandle(handle: multiboarditem): MultiboardItem;
}
export declare class Multiboard extends Handle<multiboard> {
    /**
     * @deprecated use `Multiboard.create` instead.
     * @bug Do not use this in a global initialisation as it crashes the game there.
     */
    constructor();
    /**
     * Create a Multiboard object
     * @bug Do not use this in a global initialisation as it crashes the game there.
     */
    static create(): Multiboard | undefined;
    get columns(): number;
    set columns(count: number);
    get displayed(): boolean;
    get rows(): number;
    /**
     * @bug It is only safe to change the row count by one. Use multiple calls for bigger values.
     */
    set rows(count: number);
    set title(label: string);
    get title(): string;
    clear(): void;
    createItem(x: number, y: number): MultiboardItem | undefined;
    destroy(): void;
    /**
     * @note Multiboards can not be shown at map-init. Use a wait or a zero-timer to display as soon as possible.
     */
    display(show: boolean): void;
    minimize(flag: boolean): void;
    /**
     * @async
     */
    minimized(): boolean;
    setItemsIcons(icon: string): void;
    setItemsStyle(showValues: boolean, showIcons: boolean): void;
    setItemsValue(value: string): void;
    setItemsValueColor(red: number, green: number, blue: number, alpha: number): void;
    setItemsWidth(width: number): void;
    setTitleTextColor(red: number, green: number, blue: number, alpha: number): void;
    static fromHandle(handle: multiboard | undefined): Multiboard | undefined;
    /**
     * Meant to unequivocally suspend display of existing and subsequently displayed multiboards.
     */
    static suppressDisplay(flag: boolean): void;
}
