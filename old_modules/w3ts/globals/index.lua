local ____exports = {}
local ____player = require("handles.player")
local MapPlayer = ____player.MapPlayer
do
    local ____export = require("globals.order")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
____exports.Players = {}
do
    local i = 0
    while i < bj_MAX_PLAYER_SLOTS do
        local pl = MapPlayer:fromHandle(Player(i))
        if pl then
            ____exports.Players[i + 1] = pl
        end
        i = i + 1
    end
end
return ____exports
