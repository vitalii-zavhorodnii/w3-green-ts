local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__StringSubstr = ____lualib.__TS__StringSubstr
local ____exports = {}
local ____handle = require("handles.handle")
local Handle = ____handle.Handle
local ____widget = require("handles.widget")
local Widget = ____widget.Widget
____exports.Item = __TS__Class()
local Item = ____exports.Item
Item.name = "Item"
__TS__ClassExtends(Item, Widget)
function Item.prototype.____constructor(self, itemId, x, y, skinId)
    if Handle:initFromHandle() then
        Widget.prototype.____constructor(self)
        return
    end
    local ____temp_0
    if skinId == nil then
        ____temp_0 = CreateItem(itemId, x, y)
    else
        ____temp_0 = BlzCreateItemWithSkin(itemId, x, y, skinId)
    end
    local handle = ____temp_0
    if handle == nil then
        error("w3ts failed to create item handle.", 3)
    end
    Widget.prototype.____constructor(self, handle)
end
__TS__SetDescriptor(
    Item.prototype,
    "charges",
    {
        get = function(self)
            return GetItemCharges(self.handle)
        end,
        set = function(self, value)
            SetItemCharges(self.handle, value)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "invulnerable",
    {
        get = function(self)
            return IsItemInvulnerable(self.handle)
        end,
        set = function(self, flag)
            SetItemInvulnerable(self.handle, true)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "level",
    {get = function(self)
        return GetItemLevel(self.handle)
    end},
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "description",
    {
        get = function(self)
            return BlzGetItemDescription(self.handle) or ""
        end,
        set = function(self, description)
            BlzSetItemDescription(self.handle, description)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "extendedTooltip",
    {
        get = function(self)
            return BlzGetItemExtendedTooltip(self.handle) or ""
        end,
        set = function(self, tooltip)
            BlzSetItemExtendedTooltip(self.handle, tooltip)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "icon",
    {
        get = function(self)
            return BlzGetItemIconPath(self.handle) or ""
        end,
        set = function(self, path)
            BlzSetItemIconPath(self.handle, path)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "name",
    {
        get = function(self)
            return GetItemName(self.handle) or ""
        end,
        set = function(self, value)
            BlzSetItemName(self.handle, value)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "tooltip",
    {
        get = function(self)
            return BlzGetItemTooltip(self.handle) or ""
        end,
        set = function(self, tooltip)
            BlzSetItemTooltip(self.handle, tooltip)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "pawnable",
    {
        get = function(self)
            return IsItemPawnable(self.handle)
        end,
        set = function(self, flag)
            SetItemPawnable(self.handle, flag)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "player",
    {get = function(self)
        return GetItemPlayer(self.handle)
    end},
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "type",
    {get = function(self)
        return GetItemType(self.handle)
    end},
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "typeId",
    {get = function(self)
        return GetItemTypeId(self.handle)
    end},
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "userData",
    {
        get = function(self)
            return GetItemUserData(self.handle)
        end,
        set = function(self, value)
            SetItemUserData(self.handle, value)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "visible",
    {
        get = function(self)
            return IsItemVisible(self.handle)
        end,
        set = function(self, flag)
            SetItemVisible(self.handle, flag)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "skin",
    {
        get = function(self)
            return BlzGetItemSkin(self.handle)
        end,
        set = function(self, skinId)
            BlzSetItemSkin(self.handle, skinId)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "x",
    {
        get = function(self)
            return GetItemX(self.handle)
        end,
        set = function(self, value)
            SetItemPosition(self.handle, value, self.y)
        end
    },
    true
)
__TS__SetDescriptor(
    Item.prototype,
    "y",
    {
        get = function(self)
            return GetItemY(self.handle)
        end,
        set = function(self, value)
            SetItemPosition(self.handle, self.x, value)
        end
    },
    true
)
function Item.create(self, itemId, x, y, skinId)
    local ____temp_1
    if skinId == nil then
        ____temp_1 = CreateItem(itemId, x, y)
    else
        ____temp_1 = BlzCreateItemWithSkin(itemId, x, y, skinId)
    end
    local handle = ____temp_1
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Item.prototype.addAbility(self, abilCode)
    BlzItemAddAbility(self.handle, abilCode)
end
function Item.prototype.getAbility(self, abilCode)
    return BlzGetItemAbility(self.handle, abilCode)
end
function Item.prototype.getAbilityByIndex(self, index)
    return BlzGetItemAbilityByIndex(self.handle, index)
end
function Item.prototype.removeAbility(self, abilCode)
    BlzItemRemoveAbility(self.handle, abilCode)
end
function Item.prototype.destroy(self)
    RemoveItem(self.handle)
end
function Item.prototype.getField(self, field)
    local fieldType = __TS__StringSubstr(
        tostring(field),
        0,
        (string.find(
            tostring(field),
            ":",
            nil,
            true
        ) or 0) - 1
    )
    repeat
        local ____switch43 = fieldType
        local ____cond43 = ____switch43 == "unitbooleanfield"
        if ____cond43 then
            return BlzGetItemBooleanField(self.handle, field)
        end
        ____cond43 = ____cond43 or ____switch43 == "unitintegerfield"
        if ____cond43 then
            return BlzGetItemIntegerField(self.handle, field)
        end
        ____cond43 = ____cond43 or ____switch43 == "unitrealfield"
        if ____cond43 then
            return BlzGetItemRealField(self.handle, field)
        end
        ____cond43 = ____cond43 or ____switch43 == "unitstringfield"
        if ____cond43 then
            return BlzGetItemStringField(self.handle, field)
        end
        do
            return 0
        end
    until true
end
function Item.prototype.isOwned(self)
    return IsItemOwned(self.handle)
end
function Item.prototype.isPawnable(self)
    return IsItemPawnable(self.handle)
end
function Item.prototype.isPowerup(self)
    return IsItemPowerup(self.handle)
end
function Item.prototype.isSellable(self)
    return IsItemSellable(self.handle)
end
function Item.prototype.setDropId(self, unitId)
    SetItemDropID(self.handle, unitId)
end
function Item.prototype.setDropOnDeath(self, flag)
    SetItemDropOnDeath(self.handle, flag)
end
function Item.prototype.setDroppable(self, flag)
    SetItemDroppable(self.handle, flag)
end
function Item.prototype.setField(self, field, value)
    local fieldType = __TS__StringSubstr(
        tostring(field),
        0,
        (string.find(
            tostring(field),
            ":",
            nil,
            true
        ) or 0) - 1
    )
    if fieldType == "unitbooleanfield" and type(value) == "boolean" then
        return BlzSetItemBooleanField(self.handle, field, value)
    end
    if fieldType == "unitintegerfield" and type(value) == "number" then
        return BlzSetItemIntegerField(self.handle, field, value)
    end
    if fieldType == "unitrealfield" and type(value) == "number" then
        return BlzSetItemRealField(self.handle, field, value)
    end
    if fieldType == "unitstringfield" and type(value) == "string" then
        return BlzSetItemStringField(self.handle, field, value)
    end
    return false
end
function Item.prototype.setOwner(self, whichPlayer, changeColor)
    SetItemPlayer(self.handle, whichPlayer.handle, changeColor)
end
function Item.prototype.setPoint(self, whichPoint)
    SetItemPosition(self.handle, whichPoint.x, whichPoint.y)
end
function Item.prototype.setPosition(self, x, y)
    SetItemPosition(self.handle, x, y)
end
function Item.fromEvent(self)
    return self:fromHandle(GetManipulatedItem())
end
function Item.fromHandle(self, handle)
    local ____handle_2
    if handle then
        ____handle_2 = self:getObject(handle)
    else
        ____handle_2 = nil
    end
    return ____handle_2
end
function Item.isIdPawnable(self, itemId)
    return IsItemIdPawnable(itemId)
end
function Item.isIdPowerup(self, itemId)
    return IsItemIdPowerup(itemId)
end
function Item.isIdSellable(self, itemId)
    return IsItemIdSellable(itemId)
end
return ____exports
