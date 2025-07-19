/** @noSelfInFile */
type scriptHookSignature = () => void;
export declare const executeHooksMainBefore: () => void;
export declare const executeHooksMainAfter: () => void;
export declare function hookedMain(): void;
export declare const executeHooksConfigBefore: () => void;
export declare const executeHooksConfigAfter: () => void;
export declare function hookedConfig(): void;
type W3tsHookType = "main::before" | "main::after" | "config::before" | "config::after";
export declare enum W3TS_HOOK {
    MAIN_BEFORE = "main::before",
    MAIN_AFTER = "main::after",
    CONFIG_BEFORE = "config::before",
    CONFIG_AFTER = "config::after"
}
export declare function addScriptHook(entryPoint: W3tsHookType, hook: scriptHookSignature): boolean;
export {};
