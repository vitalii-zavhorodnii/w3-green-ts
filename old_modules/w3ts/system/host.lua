local ____lualib = require("lualib_bundle")
local __TS__New = ____lualib.__TS__New
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local ____exports = {}
local ____index = require("handles.index")
local MapPlayer = ____index.MapPlayer
local ____timer = require("handles.timer")
local Timer = ____timer.Timer
local ____index = require("hooks.index")
local addScriptHook = ____index.addScriptHook
local W3TS_HOOK = ____index.W3TS_HOOK
local ____base64 = require("system.base64")
local base64Decode = ____base64.base64Decode
local base64Encode = ____base64.base64Encode
local ____binaryreader = require("system.binaryreader")
local BinaryReader = ____binaryreader.BinaryReader
local ____binarywriter = require("system.binarywriter")
local BinaryWriter = ____binarywriter.BinaryWriter
local ____sync = require("system.sync")
local SyncRequest = ____sync.SyncRequest
local lobbyTimes = {}
local hostCallbacks = {}
local localJoinTime = 0
local localStartTime = 0
local host
local checkTimer
local isChecking = false
function ____exports.onHostDetect(callback)
    if host then
        callback()
    else
        hostCallbacks[#hostCallbacks + 1] = callback
    end
end
local function onConfig()
    if localJoinTime == 0 then
        localJoinTime = os.clock()
    end
end
local function findHost()
    isChecking = true
    if localStartTime == 0 then
        localStartTime = os.clock()
    end
    local writer = __TS__New(BinaryWriter)
    writer:writeFloat(localStartTime - localJoinTime)
    local ____self_0 = __TS__New(
        SyncRequest,
        MapPlayer:fromLocal(),
        base64Encode(tostring(writer))
    )
    ____self_0["then"](
        ____self_0,
        function(res, req)
            local data = base64Decode(res.data)
            local reader = __TS__New(BinaryReader, data)
            local syncedTime = reader:readFloat()
            local from = MapPlayer:fromEvent()
            lobbyTimes[from.id + 1] = syncedTime
            local hostTime = 0
            local hostId = 0
            do
                local i = 0
                while i < bj_MAX_PLAYERS do
                    do
                        local p = MapPlayer:fromIndex(i)
                        if p == nil or p.slotState ~= PLAYER_SLOT_STATE_PLAYING or p.controller ~= MAP_CONTROL_USER then
                            goto __continue11
                        end
                        if not lobbyTimes[p.id + 1] then
                            return
                        end
                        if lobbyTimes[p.id + 1] > hostTime then
                            hostTime = lobbyTimes[p.id + 1]
                            hostId = p.id
                        end
                    end
                    ::__continue11::
                    i = i + 1
                end
            end
            host = MapPlayer:fromIndex(hostId)
            if checkTimer then
                checkTimer:destroy()
            end
            __TS__ArrayForEach(
                hostCallbacks,
                function(____, cb)
                    cb()
                end
            )
        end
    ):catch(function(res)
        print("findHost Error: " .. tostring(res.status))
        isChecking = false
    end)
end
local function onMain()
    checkTimer = Timer:create()
    checkTimer:start(0, false, findHost)
end
addScriptHook(W3TS_HOOK.MAIN_AFTER, onMain)
addScriptHook(W3TS_HOOK.CONFIG_BEFORE, onConfig)
return ____exports
