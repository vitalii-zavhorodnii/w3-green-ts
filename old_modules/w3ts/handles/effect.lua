local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____handle = require("handles.handle")
local Handle = ____handle.Handle
____exports.Effect = __TS__Class()
local Effect = ____exports.Effect
Effect.name = "Effect"
__TS__ClassExtends(Effect, Handle)
function Effect.prototype.____constructor(self, modelName, a, b)
    if Handle:initFromHandle() then
        Handle.prototype.____constructor(self)
        return
    end
    local handle
    if type(a) == "number" and type(b) == "number" then
        handle = AddSpecialEffect(modelName, a, b)
    elseif type(a) ~= "number" and type(b) == "string" then
        handle = AddSpecialEffectTarget(modelName, a.handle, b)
    end
    if handle == nil then
        error("w3ts failed to create effect handle.", 3)
    end
    Handle.prototype.____constructor(self, handle)
    if type(a) ~= "number" and type(b) == "string" then
        self.attachWidget = a
        self.attachPointName = b
    end
end
__TS__SetDescriptor(
    Effect.prototype,
    "scale",
    {
        get = function(self)
            return BlzGetSpecialEffectScale(self.handle)
        end,
        set = function(self, scale)
            BlzSetSpecialEffectScale(self.handle, scale)
        end
    },
    true
)
__TS__SetDescriptor(
    Effect.prototype,
    "x",
    {
        get = function(self)
            return BlzGetLocalSpecialEffectX(self.handle)
        end,
        set = function(self, x)
            BlzSetSpecialEffectX(self.handle, x)
        end
    },
    true
)
__TS__SetDescriptor(
    Effect.prototype,
    "y",
    {
        get = function(self)
            return BlzGetLocalSpecialEffectY(self.handle)
        end,
        set = function(self, y)
            BlzSetSpecialEffectY(self.handle, y)
        end
    },
    true
)
__TS__SetDescriptor(
    Effect.prototype,
    "z",
    {
        get = function(self)
            return BlzGetLocalSpecialEffectZ(self.handle)
        end,
        set = function(self, z)
            BlzSetSpecialEffectZ(self.handle, z)
        end
    },
    true
)
function Effect.create(self, modelName, x, y)
    local handle = AddSpecialEffect(modelName, x, y)
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Effect.createAttachment(self, modelName, targetWidget, attachPointName)
    local handle = AddSpecialEffectTarget(modelName, targetWidget.handle, attachPointName)
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        values.attachWidget = targetWidget
        values.attachPointName = attachPointName
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Effect.createSpell(self, abilityId, effectType, x, y)
    local handle = AddSpellEffectById(abilityId, effectType, x, y)
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Effect.createSpellAttachment(self, abilityId, effectType, targetWidget, attachPointName)
    local handle = AddSpellEffectTargetById(abilityId, effectType, targetWidget.handle, attachPointName)
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        values.attachWidget = targetWidget
        values.attachPointName = attachPointName
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Effect.prototype.addSubAnimation(self, subAnim)
    BlzSpecialEffectAddSubAnimation(self.handle, subAnim)
end
function Effect.prototype.clearSubAnimations(self)
    BlzSpecialEffectClearSubAnimations(self.handle)
end
function Effect.prototype.destroy(self)
    DestroyEffect(self.handle)
end
function Effect.prototype.playAnimation(self, animType)
    BlzPlaySpecialEffect(self.handle, animType)
end
function Effect.prototype.playWithTimeScale(self, animType, timeScale)
    BlzPlaySpecialEffectWithTimeScale(self.handle, animType, timeScale)
end
function Effect.prototype.removeSubAnimation(self, subAnim)
    BlzSpecialEffectRemoveSubAnimation(self.handle, subAnim)
end
function Effect.prototype.resetScaleMatrix(self)
    BlzResetSpecialEffectMatrix(self.handle)
end
function Effect.prototype.setAlpha(self, alpha)
    BlzSetSpecialEffectAlpha(self.handle, alpha)
end
function Effect.prototype.setColor(self, red, green, blue)
    BlzSetSpecialEffectColor(self.handle, red, green, blue)
end
function Effect.prototype.setColorByPlayer(self, whichPlayer)
    BlzSetSpecialEffectColorByPlayer(self.handle, whichPlayer.handle)
end
function Effect.prototype.setHeight(self, height)
    BlzSetSpecialEffectHeight(self.handle, height)
end
function Effect.prototype.setOrientation(self, yaw, pitch, roll)
    BlzSetSpecialEffectOrientation(self.handle, yaw, pitch, roll)
end
function Effect.prototype.setPitch(self, pitch)
    BlzSetSpecialEffectPitch(self.handle, pitch)
end
function Effect.prototype.setPoint(self, p)
    BlzSetSpecialEffectPositionLoc(self.handle, p.handle)
end
function Effect.prototype.setPosition(self, x, y, z)
    BlzSetSpecialEffectPosition(self.handle, x, y, z)
end
function Effect.prototype.setRoll(self, roll)
    BlzSetSpecialEffectRoll(self.handle, roll)
end
function Effect.prototype.setScaleMatrix(self, x, y, z)
    BlzSetSpecialEffectMatrixScale(self.handle, x, y, z)
end
function Effect.prototype.setTime(self, value)
    BlzSetSpecialEffectTime(self.handle, value)
end
function Effect.prototype.setTimeScale(self, timeScale)
    BlzSetSpecialEffectTimeScale(self.handle, timeScale)
end
function Effect.prototype.setYaw(self, y)
    BlzSetSpecialEffectYaw(self.handle, y)
end
function Effect.fromHandle(self, handle)
    local ____handle_0
    if handle then
        ____handle_0 = self:getObject(handle)
    else
        ____handle_0 = nil
    end
    return ____handle_0
end
return ____exports
