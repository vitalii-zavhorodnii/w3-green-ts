local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local ____exports = {}
local oldMain = main
local oldConfig = config
local hooksMainBefore = {}
local hooksMainAfter = {}
local hooksConfigBefore = {}
local hooksConfigAfter = {}
____exports.executeHooksMainBefore = function() return __TS__ArrayForEach(
    hooksMainBefore,
    function(____, func) return func() end
) end
____exports.executeHooksMainAfter = function() return __TS__ArrayForEach(
    hooksMainAfter,
    function(____, func) return func() end
) end
function ____exports.hookedMain()
    ____exports.executeHooksMainBefore()
    oldMain()
    ____exports.executeHooksMainAfter()
end
____exports.executeHooksConfigBefore = function() return __TS__ArrayForEach(
    hooksConfigBefore,
    function(____, func) return func() end
) end
____exports.executeHooksConfigAfter = function() return __TS__ArrayForEach(
    hooksConfigAfter,
    function(____, func) return func() end
) end
function ____exports.hookedConfig()
    ____exports.executeHooksConfigBefore()
    oldConfig()
    ____exports.executeHooksConfigAfter()
end
main = ____exports.hookedMain
config = ____exports.hookedConfig
____exports.W3TS_HOOK = W3TS_HOOK or ({})
____exports.W3TS_HOOK.MAIN_BEFORE = "main::before"
____exports.W3TS_HOOK.MAIN_AFTER = "main::after"
____exports.W3TS_HOOK.CONFIG_BEFORE = "config::before"
____exports.W3TS_HOOK.CONFIG_AFTER = "config::after"
local entryPoints = {[____exports.W3TS_HOOK.MAIN_BEFORE] = hooksMainBefore, [____exports.W3TS_HOOK.MAIN_AFTER] = hooksMainAfter, [____exports.W3TS_HOOK.CONFIG_BEFORE] = hooksConfigBefore, [____exports.W3TS_HOOK.CONFIG_AFTER] = hooksConfigAfter}
function ____exports.addScriptHook(entryPoint, hook)
    if not (entryPoints[entryPoint] ~= nil) then
        return false
    end
    local ____entryPoints_entryPoint_0 = entryPoints[entryPoint]
    ____entryPoints_entryPoint_0[#____entryPoints_entryPoint_0 + 1] = hook
    return true
end
return ____exports
