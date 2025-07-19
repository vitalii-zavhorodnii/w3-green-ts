local ____lualib = require("lualib_bundle")
local __TS__Promise = ____lualib.__TS__Promise
local __TS__New = ____lualib.__TS__New
local __TS__AsyncAwaiter = ____lualib.__TS__AsyncAwaiter
local __TS__Await = ____lualib.__TS__Await
local ____exports = {}
local ____timer = require("handles.timer")
local Timer = ____timer.Timer
do
    local ____export = require("utils.color")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
function ____exports.sleep(howMuch)
    return __TS__AsyncAwaiter(function(____awaiter_resolve)
        return ____awaiter_resolve(
            nil,
            __TS__New(
                __TS__Promise,
                function(____, resolve, reject)
                    local t = Timer:create()
                    t:start(
                        howMuch,
                        false,
                        function()
                            t:destroy()
                            resolve(nil, nil)
                        end
                    )
                end
            )
        )
    end)
end
return ____exports
