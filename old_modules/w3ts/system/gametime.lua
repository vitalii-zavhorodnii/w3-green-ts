local ____exports = {}
local ____timer = require("handles.timer")
local Timer = ____timer.Timer
local ____index = require("hooks.index")
local addScriptHook = ____index.addScriptHook
local W3TS_HOOK = ____index.W3TS_HOOK
local elapsedTime = 0
local gameTimer
function ____exports.getElapsedTime()
    if not gameTimer then
        return 0
    end
    return elapsedTime + gameTimer.elapsed
end
addScriptHook(
    W3TS_HOOK.MAIN_AFTER,
    function()
        gameTimer = Timer:create():start(
            30,
            true,
            function()
                elapsedTime = elapsedTime + 30
            end
        )
    end
)
return ____exports
