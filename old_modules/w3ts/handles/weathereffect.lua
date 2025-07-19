local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____handle = require("handles.handle")
local Handle = ____handle.Handle
____exports.WeatherEffect = __TS__Class()
local WeatherEffect = ____exports.WeatherEffect
WeatherEffect.name = "WeatherEffect"
__TS__ClassExtends(WeatherEffect, Handle)
function WeatherEffect.prototype.____constructor(self, where, effectID)
    if Handle:initFromHandle() then
        Handle.prototype.____constructor(self)
        return
    end
    local handle = AddWeatherEffect(where.handle, effectID)
    if handle == nil then
        error("w3ts failed to create unit handle.", 3)
    end
    Handle.prototype.____constructor(self, handle)
end
function WeatherEffect.create(self, where, effectID)
    local handle = AddWeatherEffect(where.handle, effectID)
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function WeatherEffect.prototype.destroy(self)
    RemoveWeatherEffect(self.handle)
end
function WeatherEffect.prototype.enable(self, flag)
    EnableWeatherEffect(self.handle, flag)
end
function WeatherEffect.fromHandle(self, handle)
    return self:getObject(handle)
end
return ____exports
