/// <reference types="war3-types-strict/1.33.0" />
/** @noSelfInFile */
/** @noSelfInFile */
import { Handle } from "./handle";
/**
 * Warcraft III's UI uses a proprietary format known as FDF (Frame Definition Files).
 * This class provides the ability to manipulate and create them dynamically through code.
 *
 * @example Create a simple button.
 * ```ts
 * const gameui = Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0);
 * if (gameui) {
 *  // Create a "GLUEBUTTON" named "Facebutton", the clickable Button, for game UI
 *  const buttonFrame = Frame.createType("FaceButton", gameui, 0, "GLUEBUTTON", "");
 *  if (buttonFrame) {
 *    // Create a BACKDROP named "FaceButtonIcon", the visible image, for buttonFrame.
 *    const buttonIconFrame = Frame.createType("FaceButton", buttonFrame, 0, "BACKDROP", "");
 *    // buttonIconFrame will mimic buttonFrame in size and position
 *    buttonIconFrame?.setAllPoints(buttonFrame);
 *    // Set a Texture
 *    buttonIconFrame?.setTexture("ReplaceableTextures\\CommandButtons\\BTNSelectHeroOn", 0, true);
 *    // Place the buttonFrame to the center of the screen
 *    buttonFrame.setAbsPoint(FRAMEPOINT_CENTER, 0.4, 0.3);
 *    // Give that buttonFrame a size
 *    buttonFrame.setSize(0.05, 0.05);
 *  }
 *}
 *```
 *
 * There are many aspects to modifying the UI and it can become complicated, so here are some
 * guides:
 *
 * https://www.hiveworkshop.com/threads/ui-frames-starting-guide.318603/
 * https://www.hiveworkshop.com/pastebin/913bd439799b3d917e5b522dd9ef458f20598/
 * https://www.hiveworkshop.com/tags/ui-fdf/
 */
export declare class Frame extends Handle<framehandle> {
    /**
     * @deprecated use `Frame.create` instead.
     * @param name The name of the frame to be accessed with `Frame.fromName`.
     * @param owner The parent frame.
     * @param priority
     * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
     */
    constructor(name: string, owner: Frame, priority: number, createContext: number);
    /**
     * @deprecated use `Frame.createSimple` instead.
     *
     * https://www.hiveworkshop.com/threads/ui-simpleframes.320385/
     * @param name The name of the frame to be accessed with `Frame.fromName`.
     * @param priority
     * @param owner The parent frame.
     * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
     */
    constructor(name: string, owner: Frame, priority: number);
    /**
     * @deprecated use `Frame.createType` instead.
     * @param name The name of the frame to be accessed with `Frame.fromName`.
     * @param owner The parent frame.
     * @param priority
     * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
     * @param typeName The type of Frame.
     * @param inherits The name of the Frame it inherits.
     */
    constructor(name: string, owner: Frame, priority: number, createContext: number, typeName: string, inherits: string);
    /**
     * Creates a Frame.
     * @param name The name of the frame to be accessed with `Frame.fromName`.
     * @param owner The parent frame.
     * @param priority Should be a natural number (greater equal to 0).
     * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
     */
    static create(name: string, owner: Frame, priority: number, createContext: number): Frame | undefined;
    /**
     * Creates a SimpleFrame.
     *
     * https://www.hiveworkshop.com/threads/ui-simpleframes.320385/
     * @param name The name of the frame to be accessed with `Frame.fromName`.
     * @param owner The parent frame.
     * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
     */
    static createSimple(name: string, owner: Frame, createContext: number): Frame | undefined;
    /**
     * Create a Frame by type.
     * @param name The name of the frame to be accessed with `Frame.fromName`.
     * @param owner The parent frame.
     * @param createContext The ID assigned to a frame to be accessed with `Frame.fromName`. This value does not have to be unique and can be overwritten.
     * @param typeName The type of Frame.
     * @param inherits The name of the Frame it inherits.
     */
    static createType(name: string, owner: Frame, createContext: number, typeName: string, inherits: string): Frame | undefined;
    set alpha(alpha: number);
    get alpha(): number;
    get children(): Frame[];
    get childrenCount(): number;
    set enabled(flag: boolean);
    get enabled(): boolean;
    set height(height: number);
    get height(): number;
    /**
     * @deprecated use `getParent` and `setParent` instead.
     */
    set parent(parent: Frame);
    get parent(): Frame;
    set text(text: string);
    get text(): string;
    set textSizeLimit(size: number);
    get textSizeLimit(): number;
    set value(value: number);
    get value(): number;
    set visible(flag: boolean);
    get visible(): boolean;
    set width(width: number);
    get width(): number;
    addText(text: string): this;
    cageMouse(enable: boolean): this;
    clearPoints(): this;
    click(): this;
    destroy(): this;
    getChild(index: number): Frame | undefined;
    setAbsPoint(point: framepointtype, x: number, y: number): this;
    setAllPoints(relative: Frame): this;
    setAlpha(alpha: number): this;
    setEnabled(flag: boolean): this;
    setFocus(flag: boolean): this;
    setFont(filename: string, height: number, flags: number): this;
    setHeight(height: number): this;
    setLevel(level: number): this;
    setMinMaxValue(minValue: number, maxValue: number): this;
    setModel(modelFile: string, cameraIndex: number): this;
    getParent(): Frame | undefined;
    setParent(parent: Frame): this;
    setPoint(point: framepointtype, relative: Frame, relativePoint: framepointtype, x: number, y: number): this;
    setScale(scale: number): this;
    setSize(width: number, height: number): this;
    setSpriteAnimate(primaryProp: number, flags: number): this;
    setStepSize(stepSize: number): this;
    setText(text: string): this;
    setTextColor(color: number): this;
    setTextSizeLimit(size: number): this;
    setTexture(texFile: string, flag: number, blend: boolean): this;
    setTooltip(tooltip: Frame): this;
    setValue(value: number): this;
    setVertexColor(color: number): this;
    setVisible(flag: boolean): this;
    setWidth(width: number): this;
    static autoPosition(enable: boolean): void;
    static fromEvent(): Frame | undefined;
    static fromHandle(handle: framehandle | undefined): Frame | undefined;
    static fromName(name: string, createContext: number): Frame | undefined;
    static fromOrigin(frameType: originframetype, index: number): Frame | undefined;
    static getEventHandle(): frameeventtype | undefined;
    static getEventText(): number;
    static getEventValue(): number;
    static hideOrigin(enable: boolean): void;
    static loadTOC(filename: string): boolean;
}
