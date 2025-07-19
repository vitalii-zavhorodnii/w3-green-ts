local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____handle = require("handles.handle")
local Handle = ____handle.Handle
____exports.DialogButton = __TS__Class()
local DialogButton = ____exports.DialogButton
DialogButton.name = "DialogButton"
__TS__ClassExtends(DialogButton, Handle)
function DialogButton.prototype.____constructor(self, whichDialog, text, hotkey, quit, score)
    if hotkey == nil then
        hotkey = 0
    end
    if quit == nil then
        quit = false
    end
    if score == nil then
        score = false
    end
    if Handle:initFromHandle() then
        Handle.prototype.____constructor(self)
        return
    end
    local handle
    if quit == false then
        handle = DialogAddButton(whichDialog.handle, text, hotkey)
    else
        handle = DialogAddQuitButton(whichDialog.handle, score, text, hotkey)
    end
    if handle == nil then
        error("w3ts failed to create button handle.", 3)
    end
    Handle.prototype.____constructor(self, handle)
end
function DialogButton.create(self, whichDialog, text, hotkey, quit, score)
    if hotkey == nil then
        hotkey = 0
    end
    if quit == nil then
        quit = false
    end
    if score == nil then
        score = false
    end
    local handle
    if quit == false then
        handle = DialogAddButton(whichDialog.handle, text, hotkey)
    else
        handle = DialogAddQuitButton(whichDialog.handle, score, text, hotkey)
    end
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function DialogButton.fromEvent(self)
    return self:fromHandle(GetClickedButton())
end
function DialogButton.fromHandle(self, handle)
    local ____handle_0
    if handle then
        ____handle_0 = self:getObject(handle)
    else
        ____handle_0 = nil
    end
    return ____handle_0
end
---
-- @example Create a simple dialog.
-- ```ts
-- const dialog = Dialog.create();
-- if (dialog) {
-- const trigger = Trigger.create();
-- 
-- trigger.registerDialogEvent(dialog);
-- trigger.addAction(() => {
-- const clicked = DialogButton.fromEvent();
-- });
-- 
-- Timer.create().start(1.00, false, () => {
-- DialogButton.create(dialog, "Stay", 0);
-- DialogButton.create(dialog, "Leave", 0, true);
-- 
-- dialog.setMessage("Welcome to TypeScript!");
-- dialog.display(Players[0], true);
-- });
-- }
-- ```
____exports.Dialog = __TS__Class()
local Dialog = ____exports.Dialog
Dialog.name = "Dialog"
__TS__ClassExtends(Dialog, Handle)
function Dialog.prototype.____constructor(self)
    if Handle:initFromHandle() then
        Handle.prototype.____constructor(self)
        return
    end
    local handle = DialogCreate()
    if handle == nil then
        error("w3ts failed to create dialog handle.", 3)
    end
    Handle.prototype.____constructor(self, handle)
end
function Dialog.create(self)
    local handle = DialogCreate()
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Dialog.prototype.addButton(self, text, hotkey, quit, score)
    if hotkey == nil then
        hotkey = 0
    end
    if quit == nil then
        quit = false
    end
    if score == nil then
        score = false
    end
    return ____exports.DialogButton:create(
        self,
        text,
        hotkey,
        quit,
        score
    )
end
function Dialog.prototype.clear(self)
    DialogClear(self.handle)
end
function Dialog.prototype.destroy(self)
    DialogDestroy(self.handle)
end
function Dialog.prototype.display(self, whichPlayer, flag)
    DialogDisplay(whichPlayer.handle, self.handle, flag)
end
function Dialog.prototype.setMessage(self, whichMessage)
    DialogSetMessage(self.handle, whichMessage)
end
function Dialog.fromEvent(self)
    return self:fromHandle(GetClickedDialog())
end
function Dialog.fromHandle(self, handle)
    local ____handle_1
    if handle then
        ____handle_1 = self:getObject(handle)
    else
        ____handle_1 = nil
    end
    return ____handle_1
end
return ____exports
