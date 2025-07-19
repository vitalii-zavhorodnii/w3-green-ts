local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__StringSubstr = ____lualib.__TS__StringSubstr
local ____exports = {}
--- A system which provides the ability to read and write files. There are no standard IO natives
-- so this system relies on an exploit which ended up being sanctioned by Blizzard, and because of this
-- there are some caveats.
-- 
-- - All files are confined to the `Documents\Warcraft III\CustomMapData` folder.
-- - The only allowed file extensions are `.txt` and `.pld`.
-- - Generated files contain boilerplate JASS code.
-- - You cannot delete files but you can empty their contents.
-- 
-- @example ```ts
-- // Write to the file
-- File.write("data.txt", "Hello world!");
-- 
-- // Read it's contents
-- const contents = File.read("data.txt");
-- 
-- // Display the contents
-- if (contents) {
--  print(contents);
-- }
-- ```
____exports.File = __TS__Class()
local File = ____exports.File
File.name = "File"
function File.prototype.____constructor(self)
end
function File.escape(self, contents)
    contents = (string.gsub(contents, ____exports.File.escapeCharacter, ____exports.File.escapedSelf))
    contents = (string.gsub(contents, "\"", ____exports.File.escapedQuote))
    return contents
end
function File.unescape(self, contents)
    contents = (string.gsub(contents, ____exports.File.escapedQuote, "\""))
    contents = (string.gsub(contents, ____exports.File.escapedSelf, ____exports.File.escapeCharacter))
    return contents
end
function File.read(self, filename)
    local originalIcon = BlzGetAbilityIcon(self.dummyAbility)
    if originalIcon == nil then
        return nil
    end
    Preloader(filename)
    local preloadText = BlzGetAbilityIcon(self.dummyAbility)
    if preloadText == nil then
        return nil
    end
    BlzSetAbilityIcon(self.dummyAbility, originalIcon)
    if preloadText ~= originalIcon then
        return ____exports.File:unescape(preloadText)
    end
    return nil
end
function File.writeRaw(self, filename, contents, allowReading)
    if allowReading == nil then
        allowReading = false
    end
    PreloadGenClear()
    PreloadGenStart()
    if allowReading then
        Preload("\")\n//! beginusercode\nlocal o=''\nPreload=function(s)o=o..s end\nPreloadEnd=function()end\n//!endusercode\n//")
        contents = ____exports.File:escape(contents)
    end
    do
        local i = 0
        while i < #contents / ____exports.File.preloadLimit do
            Preload(__TS__StringSubstr(contents, i * ____exports.File.preloadLimit, ____exports.File.preloadLimit))
            i = i + 1
        end
    end
    if allowReading then
        Preload(("\")\n//! beginusercode\nBlzSetAbilityIcon(" .. tostring(self.dummyAbility)) .. ",o)\n//!endusercode\n//")
    end
    PreloadGenEnd(filename)
    return self
end
function File.write(self, filename, contents)
    return self:writeRaw(filename, contents, true)
end
File.dummyAbility = FourCC("Amls")
File.preloadLimit = 259
File.escapeCharacter = string.char(27)
File.escapedSelf = ____exports.File.escapeCharacter .. ____exports.File.escapeCharacter
File.escapedQuote = ____exports.File.escapeCharacter .. "q"
return ____exports
