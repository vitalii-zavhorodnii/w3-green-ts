local ____lualib = require("lualib_bundle")
local __TS__StringCharAt = ____lualib.__TS__StringCharAt
local __TS__StringAccess = ____lualib.__TS__StringAccess
local __TS__StringSubstr = ____lualib.__TS__StringSubstr
local ____exports = {}
---
-- @noSelfInFile
local chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
--- Encode a string to base64.
-- 
-- @param input The string to encode.
function ____exports.base64Encode(input)
    local output = ""
    do
        local block = 0
        local charCode = 0
        local idx = 0
        local map = chars
        while true do
            local ____temp_2 = #__TS__StringCharAt(
                input,
                math.floor(idx) | 0
            ) > 0
            if not ____temp_2 then
                map = "="
                local ____ = map
                ____temp_2 = idx % 1
            end
            if not ____temp_2 then
                break
            end
            local ____string_byte_1 = string.byte
            local ____input_0 = input
            idx = idx + 3 / 4
            charCode = ____string_byte_1(
                ____input_0,
                math.floor(idx) + 1
            ) or 0
            if math.floor(idx) > #input and charCode == 0 then
                if #output % 4 == 1 then
                    return output .. "="
                end
                return output .. "=="
            end
            if charCode > 255 then
                print("'base64Encode' failed: The string to be encoded contains characters outside of the Latin1 range.")
                return output
            end
            block = block << 8 | charCode
            output = output .. __TS__StringCharAt(
                map,
                math.floor(63 & block >> 8 - idx % 1 * 8)
            )
        end
    end
    return output
end
--- Decode a base64 string.
-- 
-- @param input The base64 string to decode.
function ____exports.base64Decode(input)
    local i = #input
    do
        while i > 0 and __TS__StringAccess(input, i) ~= "=" do
            i = i - 1
        end
    end
    local str = __TS__StringSubstr(input, 0, i - 1)
    local output = ""
    if #str % 4 == 1 then
        print("'base64Decode' failed: The string to be decoded is not correctly encoded.")
        return output
    end
    local bs = 0
    do
        local bc = 0
        local buffer
        local idx = 0
        while true do
            buffer = __TS__StringCharAt(str, idx)
            if not buffer then
                break
            end
            if #buffer == 0 then
                break
            end
            buffer = (string.find(chars, buffer, nil, true) or 0) - 1
            idx = idx + 1
            local ____temp_5
            local ____temp_4 = ~buffer
            if ____temp_4 then
                bs = bc % 4 ~= 0 and bs * 64 + buffer or buffer
                local ____ = bs
                local ____bc_3 = bc
                bc = ____bc_3 + 1
                ____temp_4 = ____bc_3 % 4 ~= 0
            end
            if ____temp_4 then
                output = output .. string.char(255 & bs >> (-2 * bc & 6))
                ____temp_5 = output
            else
                ____temp_5 = 0
            end
        end
    end
    return output
end
return ____exports
