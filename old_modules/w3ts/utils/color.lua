local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local __TS__New = ____lualib.__TS__New
local __TS__NumberToString = ____lualib.__TS__NumberToString
local ____exports = {}
local toHex, orderedPlayerColors
function toHex(value)
    local hex = __TS__NumberToString(value, 16)
    if #hex < 2 then
        hex = "0" .. hex
    end
    return hex
end
____exports.Color = __TS__Class()
local Color = ____exports.Color
Color.name = "Color"
function Color.prototype.____constructor(self, red, green, blue, alpha)
    self.red = red
    self.green = green
    self.blue = blue
    if alpha then
        self.alpha = alpha
    else
        self.alpha = 255
    end
end
__TS__SetDescriptor(
    Color.prototype,
    "code",
    {get = function(self)
        return (("|c" .. toHex(self.alpha)) .. toHex(self.red)) .. toHex(self.green) .. toHex(self.blue)
    end},
    true
)
__TS__SetDescriptor(
    Color.prototype,
    "name",
    {get = function(self)
        local index = self:playerColorIndex()
        if index < #____exports.playerColors then
            return ____exports.playerColorNames[index + 1]
        end
        return "unknown"
    end},
    true
)
__TS__SetDescriptor(
    Color.prototype,
    "playerColor",
    {get = function(self)
        local index = self:playerColorIndex()
        if index < #____exports.playerColors then
            return orderedPlayerColors[index + 1]
        end
        return PLAYER_COLOR_RED
    end},
    true
)
function Color.prototype.equals(self, other)
    return self.red == other.red and self.green == other.green and self.blue == other.blue and self.alpha == other.alpha
end
function Color.prototype.playerColorIndex(self)
    local i = 0
    do
        while i < #____exports.playerColors do
            if ____exports.playerColors[i + 1]:equals(self) then
                break
            end
            i = i + 1
        end
    end
    return i
end
function Color.prototype.lerp(self, other, factor)
    local r = MathRound(self.red * (1 - factor) + other.red * factor)
    local g = MathRound(self.green * (1 - factor) + other.green * factor)
    local b = MathRound(self.blue * (1 - factor) + other.blue * factor)
    local a = MathRound(self.alpha * (1 - factor) + other.alpha * factor)
    return __TS__New(
        ____exports.Color,
        math.max(
            0,
            math.min(255, r)
        ),
        math.max(
            0,
            math.min(255, g)
        ),
        math.max(
            0,
            math.min(255, b)
        ),
        math.max(
            0,
            math.min(255, a)
        )
    )
end
____exports.color = function(red, green, blue, alpha) return __TS__New(
    ____exports.Color,
    red,
    green,
    blue,
    alpha
) end
--- The player colors sorted by index. Does not include
-- neutrals colors.
____exports.playerColors = {
    ____exports.color(255, 3, 3),
    ____exports.color(0, 66, 255),
    ____exports.color(28, 230, 185),
    ____exports.color(84, 0, 129),
    ____exports.color(255, 252, 0),
    ____exports.color(254, 138, 14),
    ____exports.color(32, 192, 0),
    ____exports.color(229, 91, 176),
    ____exports.color(149, 150, 151),
    ____exports.color(126, 191, 241),
    ____exports.color(16, 98, 70),
    ____exports.color(78, 42, 3),
    ____exports.color(155, 0, 0),
    ____exports.color(0, 0, 195),
    ____exports.color(0, 234, 255),
    ____exports.color(190, 0, 254),
    ____exports.color(235, 205, 135),
    ____exports.color(248, 164, 139),
    ____exports.color(191, 255, 128),
    ____exports.color(220, 185, 235),
    ____exports.color(80, 79, 85),
    ____exports.color(235, 240, 255),
    ____exports.color(0, 120, 30),
    ____exports.color(164, 111, 51)
}
--- The names of players colors sorted by player index.
____exports.playerColorNames = {
    "red",
    "blue",
    "teal",
    "purple",
    "yellow",
    "orange",
    "green",
    "pink",
    "gray",
    "light blue",
    "dark green",
    "brown",
    "maroon",
    "navy",
    "turquoise",
    "violet",
    "wheat",
    "peach",
    "mint",
    "lavender",
    "coal",
    "snow",
    "emerald",
    "peanut"
}
--- An ordered list of `playercolor`s, for lookup
orderedPlayerColors = {
    PLAYER_COLOR_RED,
    PLAYER_COLOR_BLUE,
    PLAYER_COLOR_CYAN,
    PLAYER_COLOR_PURPLE,
    PLAYER_COLOR_YELLOW,
    PLAYER_COLOR_ORANGE,
    PLAYER_COLOR_GREEN,
    PLAYER_COLOR_PINK,
    PLAYER_COLOR_LIGHT_GRAY,
    PLAYER_COLOR_LIGHT_BLUE,
    PLAYER_COLOR_AQUA,
    PLAYER_COLOR_BROWN,
    PLAYER_COLOR_MAROON,
    PLAYER_COLOR_NAVY,
    PLAYER_COLOR_TURQUOISE,
    PLAYER_COLOR_VIOLET,
    PLAYER_COLOR_WHEAT,
    PLAYER_COLOR_PEACH,
    PLAYER_COLOR_MINT,
    PLAYER_COLOR_LAVENDER,
    PLAYER_COLOR_COAL,
    PLAYER_COLOR_SNOW,
    PLAYER_COLOR_EMERALD,
    PLAYER_COLOR_PEANUT
}
return ____exports
