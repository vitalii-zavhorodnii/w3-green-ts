local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____handle = require("handles.handle")
local Handle = ____handle.Handle
local ____widget = require("handles.widget")
local Widget = ____widget.Widget
____exports.Destructable = __TS__Class()
local Destructable = ____exports.Destructable
Destructable.name = "Destructable"
__TS__ClassExtends(Destructable, Widget)
function Destructable.prototype.____constructor(self, objectId, x, y, z, face, scale, variation)
    if Handle:initFromHandle() then
        Widget.prototype.____constructor(self)
        return
    end
    local handle = CreateDestructableZ(
        objectId,
        x,
        y,
        z,
        face,
        scale,
        variation
    )
    if handle == nil then
        error("w3ts failed to create destructable handle.", 3)
    end
    Widget.prototype.____constructor(self, handle)
end
__TS__SetDescriptor(
    Destructable.prototype,
    "invulnerable",
    {
        get = function(self)
            return IsDestructableInvulnerable(self.handle)
        end,
        set = function(self, flag)
            SetDestructableInvulnerable(self.handle, flag)
        end
    },
    true
)
__TS__SetDescriptor(
    Destructable.prototype,
    "life",
    {
        get = function(self)
            return GetDestructableLife(self.handle)
        end,
        set = function(self, value)
            SetDestructableLife(self.handle, value)
        end
    },
    true
)
__TS__SetDescriptor(
    Destructable.prototype,
    "maxLife",
    {
        get = function(self)
            return GetDestructableMaxLife(self.handle)
        end,
        set = function(self, value)
            SetDestructableMaxLife(self.handle, value)
        end
    },
    true
)
__TS__SetDescriptor(
    Destructable.prototype,
    "name",
    {get = function(self)
        return GetDestructableName(self.handle)
    end},
    true
)
__TS__SetDescriptor(
    Destructable.prototype,
    "occluderHeight",
    {
        get = function(self)
            return GetDestructableOccluderHeight(self.handle)
        end,
        set = function(self, value)
            SetDestructableOccluderHeight(self.handle, value)
        end
    },
    true
)
__TS__SetDescriptor(
    Destructable.prototype,
    "typeId",
    {get = function(self)
        return GetDestructableTypeId(self.handle)
    end},
    true
)
__TS__SetDescriptor(
    Destructable.prototype,
    "x",
    {get = function(self)
        return GetDestructableX(self.handle)
    end},
    true
)
__TS__SetDescriptor(
    Destructable.prototype,
    "y",
    {get = function(self)
        return GetDestructableY(self.handle)
    end},
    true
)
function Destructable.create(self, objectId, x, y, face, scale, variation, skinId)
    if face == nil then
        face = 0
    end
    if scale == nil then
        scale = 1
    end
    if variation == nil then
        variation = 0
    end
    local handle
    if skinId ~= nil then
        handle = BlzCreateDestructableWithSkin(
            objectId,
            x,
            y,
            face,
            scale,
            variation,
            skinId
        )
    else
        handle = CreateDestructable(
            objectId,
            x,
            y,
            face,
            scale,
            variation
        )
    end
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        if skinId ~= nil then
            values.skin = skinId
        end
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Destructable.createZ(self, objectId, x, y, z, face, scale, variation, skinId)
    if face == nil then
        face = 0
    end
    if scale == nil then
        scale = 1
    end
    if variation == nil then
        variation = 0
    end
    local handle
    if skinId ~= nil then
        handle = BlzCreateDestructableZWithSkin(
            objectId,
            x,
            y,
            z,
            face,
            scale,
            variation,
            skinId
        )
    else
        handle = CreateDestructableZ(
            objectId,
            x,
            y,
            z,
            face,
            scale,
            variation
        )
    end
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        if skinId ~= nil then
            values.skin = skinId
        end
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Destructable.prototype.destroy(self)
    RemoveDestructable(self.handle)
end
function Destructable.prototype.heal(self, life, birth)
    DestructableRestoreLife(self.handle, life, birth)
end
function Destructable.prototype.kill(self)
    KillDestructable(self.handle)
end
function Destructable.prototype.queueAnim(self, whichAnimation)
    QueueDestructableAnimation(self.handle, whichAnimation)
end
function Destructable.prototype.setAnim(self, whichAnimation)
    SetDestructableAnimation(self.handle, whichAnimation)
end
function Destructable.prototype.setAnimSpeed(self, speedFactor)
    SetDestructableAnimationSpeed(self.handle, speedFactor)
end
function Destructable.prototype.show(self, flag)
    ShowDestructable(self.handle, flag)
end
function Destructable.fromEvent(self)
    return self:fromHandle(GetTriggerDestructable())
end
function Destructable.fromHandle(self, handle)
    local ____handle_0
    if handle then
        ____handle_0 = self:getObject(handle)
    else
        ____handle_0 = nil
    end
    return ____handle_0
end
return ____exports
