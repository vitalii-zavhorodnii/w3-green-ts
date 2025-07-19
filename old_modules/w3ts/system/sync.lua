local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__StringSubstr = ____lualib.__TS__StringSubstr
local __TS__New = ____lualib.__TS__New
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local ____exports = {}
local ____player = require("handles.player")
local MapPlayer = ____player.MapPlayer
local ____timer = require("handles.timer")
local Timer = ____timer.Timer
local ____trigger = require("handles.trigger")
local Trigger = ____trigger.Trigger
local ____base64 = require("system.base64")
local base64Decode = ____base64.base64Decode
local base64Encode = ____base64.base64Encode
local ____binaryreader = require("system.binaryreader")
local BinaryReader = ____binaryreader.BinaryReader
local ____binarywriter = require("system.binarywriter")
local BinaryWriter = ____binarywriter.BinaryWriter
local ____gametime = require("system.gametime")
local getElapsedTime = ____gametime.getElapsedTime
local SYNC_PREFIX = "T"
local SYNC_PREFIX_CHUNK = "S"
local SYNC_MAX_CHUNK_SIZE = 244
local SyncIncomingPacket = __TS__Class()
SyncIncomingPacket.name = "SyncIncomingPacket"
function SyncIncomingPacket.prototype.____constructor(self, prefix, data)
    local isChunk = prefix == SYNC_PREFIX_CHUNK
    local header = base64Decode(isChunk and __TS__StringSubstr(data, 0, 10) or __TS__StringSubstr(data, 0, 5))
    local reader = __TS__New(BinaryReader, header)
    local id = reader:readUInt16()
    self.req = ____exports.SyncRequest:fromIndex(id)
    self.chunks = isChunk and reader:readUInt16() or 0
    self.chunk = isChunk and reader:readUInt16() or 0
    self.data = isChunk and __TS__StringSubstr(data, 10) or __TS__StringSubstr(data, 5)
end
local SyncOutgoingPacket = __TS__Class()
SyncOutgoingPacket.name = "SyncOutgoingPacket"
function SyncOutgoingPacket.prototype.____constructor(self, req, data, chunk, totalChunks)
    if chunk == nil then
        chunk = -1
    end
    if totalChunks == nil then
        totalChunks = 0
    end
    self.req = req
    self.data = data
    self.chunk = chunk
    self.chunks = totalChunks
end
function SyncOutgoingPacket.prototype.getHeader(self)
    local writer = __TS__New(BinaryWriter)
    writer:writeUInt16(self.req.id)
    if self.chunk ~= -1 then
        writer:writeUInt16(self.chunks)
        writer:writeUInt16(self.chunk)
    end
    return base64Encode(tostring(writer))
end
function SyncOutgoingPacket.prototype.__tostring(self)
    local header = self:getHeader()
    local writer = __TS__New(BinaryWriter)
    writer:writeString(self.data)
    return header .. tostring(writer)
end
--- A system which provides an easy way to synchronize data between game clients.
-- The data will be split into chunks and sent in order until all of them are recieved by
-- every player. Splitting the data is required as `BlzSendSyncData` only allows 255 characters
-- per request.
-- 
-- @example ```ts
-- const data = File.read("savecode.txt");
-- 
-- // Synchronize the contents of the file from the first player's computer.
-- new SyncRequest(Players[0], data).then((res, req) => {
--  print(res.data);
-- });
-- ```
____exports.SyncRequest = __TS__Class()
local SyncRequest = ____exports.SyncRequest
SyncRequest.name = "SyncRequest"
function SyncRequest.prototype.____constructor(self, from, data, options)
    self._startTime = 0
    self.chunks = {}
    self.currentChunk = 0
    self.destroyed = false
    self.status = 0
    self.options = not options and ____exports.SyncRequest.defaultOptions or options
    self.from = from
    self.id = ____exports.SyncRequest:allocate()
    ____exports.SyncRequest.indicies[self.id + 1] = -1
    ____exports.SyncRequest.cache[self.id + 1] = self
    ____exports.SyncRequest:init()
    if type(data) == "string" then
        self:start(data)
    end
end
__TS__SetDescriptor(
    SyncRequest.prototype,
    "startTime",
    {get = function(self)
        return self._startTime
    end},
    true
)
function SyncRequest.prototype.catch(self, callback)
    self.onError = callback
    return self
end
function SyncRequest.prototype.destroy(self)
    ____exports.SyncRequest.indicies[self.id + 1] = ____exports.SyncRequest.index
    ____exports.SyncRequest.index = self.id
    self.destroyed = true
end
function SyncRequest.prototype.start(self, data)
    if self.status ~= 0 or self.destroyed then
        return false
    end
    self.currentChunk = 0
    if #data <= SYNC_MAX_CHUNK_SIZE then
        self:send(__TS__New(SyncOutgoingPacket, self, data))
    else
        local chunks = math.floor(#data / SYNC_MAX_CHUNK_SIZE)
        do
            local i = 0
            while i <= chunks do
                self:send(__TS__New(
                    SyncOutgoingPacket,
                    self,
                    __TS__StringSubstr(data, i * SYNC_MAX_CHUNK_SIZE, SYNC_MAX_CHUNK_SIZE),
                    i,
                    chunks
                ))
                i = i + 1
            end
        end
    end
    self._startTime = getElapsedTime()
    self.status = 1
    if self.options.timeout > 0 then
        Timer:create():start(
            self.options.timeout,
            false,
            function()
                local ____opt_0 = Timer:fromExpired()
                if ____opt_0 ~= nil then
                    ____opt_0:destroy()
                end
                if self.onError and self.status == 1 then
                    self.onError({data = "Timeout", status = 3, time = self.startTime}, self)
                end
            end
        )
    end
    return true
end
SyncRequest.prototype["then"] = function(self, callback)
    self.onResponse = callback
    return self
end
function SyncRequest.allocate(self)
    if ____exports.SyncRequest.index ~= 0 then
        local id = ____exports.SyncRequest.index
        ____exports.SyncRequest.index = ____exports.SyncRequest.indicies[id + 1]
        return id
    end
    local ____exports_SyncRequest_2, ____counter_3 = ____exports.SyncRequest, "counter"
    ____exports_SyncRequest_2[____counter_3] = ____exports_SyncRequest_2[____counter_3] + 1
    return ____exports.SyncRequest.counter
end
function SyncRequest.prototype.send(self, packet)
    local prefix = packet.chunk == -1 and SYNC_PREFIX or SYNC_PREFIX_CHUNK
    if self.from == MapPlayer:fromLocal() and not BlzSendSyncData(
        prefix,
        tostring(packet)
    ) then
        print("SyncData: Network Error")
    end
end
function SyncRequest.fromIndex(self, index)
    return self.cache[index + 1]
end
function SyncRequest.init(self)
    if self.initialized then
        return
    end
    do
        local i = 0
        while i < bj_MAX_PLAYER_SLOTS do
            local p = MapPlayer:fromIndex(i)
            if p ~= nil and p.controller == MAP_CONTROL_USER and p.slotState == PLAYER_SLOT_STATE_PLAYING then
                self.eventTrigger:registerPlayerSyncEvent(p, SYNC_PREFIX, false)
                self.eventTrigger:registerPlayerSyncEvent(p, SYNC_PREFIX_CHUNK, false)
            end
            i = i + 1
        end
    end
    self.eventTrigger:addAction(function()
        self:onSync()
    end)
    self.initialized = true
end
function SyncRequest.onSync(self)
    local syncPrefix = BlzGetTriggerSyncPrefix()
    local syncData = BlzGetTriggerSyncData()
    if syncPrefix == nil or syncData == nil then
        return
    end
    local packet = __TS__New(SyncIncomingPacket, syncPrefix, syncData)
    if packet.req == nil then
        return
    end
    local ____packet_req_4, ____currentChunk_5 = packet.req, "currentChunk"
    ____packet_req_4[____currentChunk_5] = ____packet_req_4[____currentChunk_5] + 1
    packet.req.chunks[packet.chunk + 1] = packet.data
    if packet.chunk >= packet.chunks then
        if packet.req.onResponse then
            local data = table.concat(packet.req.chunks, "")
            local status = 2
            packet.req.status = 2
            packet.req.onResponse(
                {
                    data = data,
                    status = status,
                    time = getElapsedTime()
                },
                packet.req
            )
        end
    end
end
SyncRequest.cache = {}
SyncRequest.counter = 0
SyncRequest.defaultOptions = {timeout = 0}
SyncRequest.eventTrigger = Trigger:create()
SyncRequest.index = 0
SyncRequest.indicies = {}
SyncRequest.initialized = false
return ____exports
