local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____handle = require("handles.handle")
local Handle = ____handle.Handle
local ____player = require("handles.player")
local MapPlayer = ____player.MapPlayer
____exports.Force = __TS__Class()
local Force = ____exports.Force
Force.name = "Force"
__TS__ClassExtends(Force, Handle)
function Force.prototype.____constructor(self)
    if Handle:initFromHandle() then
        Handle.prototype.____constructor(self)
        return
    end
    local handle = CreateForce()
    if handle == nil then
        error("w3ts failed to create force handle.", 3)
    end
    Handle.prototype.____constructor(self, handle)
end
function Force.create(self)
    local handle = CreateForce()
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Force.prototype.addPlayer(self, whichPlayer)
    ForceAddPlayer(self.handle, whichPlayer.handle)
end
function Force.prototype.clear(self)
    ForceClear(self.handle)
end
function Force.prototype.destroy(self)
    DestroyForce(self.handle)
end
function Force.prototype.enumAllies(self, whichPlayer, filter)
    ForceEnumAllies(
        self.handle,
        whichPlayer.handle,
        type(filter) == "function" and Filter(filter) or filter
    )
end
function Force.prototype.enumEnemies(self, whichPlayer, filter)
    ForceEnumEnemies(
        self.handle,
        whichPlayer.handle,
        type(filter) == "function" and Filter(filter) or filter
    )
end
function Force.prototype.enumPlayers(self, filter)
    ForceEnumPlayers(
        self.handle,
        type(filter) == "function" and Filter(filter) or filter
    )
end
function Force.prototype.enumPlayersCounted(self, filter, countLimit)
    ForceEnumPlayersCounted(
        self.handle,
        type(filter) == "function" and Filter(filter) or filter,
        countLimit
    )
end
Force.prototype["for"] = function(self, callback)
    ForForce(self.handle, callback)
end
function Force.prototype.getPlayers(self)
    local players = {}
    ForForce(
        self.handle,
        function()
            local pl = MapPlayer:fromEnum()
            if pl then
                players[#players + 1] = pl
            end
        end
    )
    return players
end
function Force.prototype.hasPlayer(self, whichPlayer)
    return IsPlayerInForce(whichPlayer.handle, self.handle)
end
function Force.prototype.removePlayer(self, whichPlayer)
    ForceRemovePlayer(self.handle, whichPlayer.handle)
end
function Force.fromPlayer(self, whichPlayer)
    return self:fromHandle(GetForceOfPlayer(whichPlayer.handle))
end
function Force.fromHandle(self, handle)
    local ____handle_0
    if handle then
        ____handle_0 = self:getObject(handle)
    else
        ____handle_0 = nil
    end
    return ____handle_0
end
return ____exports
