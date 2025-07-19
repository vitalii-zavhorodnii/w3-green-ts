local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SetDescriptor = ____lualib.__TS__SetDescriptor
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
local ____handle = require("handles.handle")
local Handle = ____handle.Handle
--- Warcraft III's UI uses a proprietary format known as FDF (Frame Definition Files).
-- This class provides the ability to manipulate and create them dynamically through code.
-- 
-- @example Create a simple button.
-- ```ts
-- const gameui = Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0);
-- if (gameui) {
-- // Create a "GLUEBUTTON" named "Facebutton", the clickable Button, for game UI
-- const buttonFrame = Frame.createType("FaceButton", gameui, 0, "GLUEBUTTON", "");
-- if (buttonFrame) {
-- // Create a BACKDROP named "FaceButtonIcon", the visible image, for buttonFrame.
-- const buttonIconFrame = Frame.createType("FaceButton", buttonFrame, 0, "BACKDROP", "");
-- // buttonIconFrame will mimic buttonFrame in size and position
-- buttonIconFrame?.setAllPoints(buttonFrame);
-- // Set a Texture
-- buttonIconFrame?.setTexture("ReplaceableTextures\\CommandButtons\\BTNSelectHeroOn", 0, true);
-- // Place the buttonFrame to the center of the screen
-- buttonFrame.setAbsPoint(FRAMEPOINT_CENTER, 0.4, 0.3);
-- // Give that buttonFrame a size
-- buttonFrame.setSize(0.05, 0.05);
-- }
-- }
-- ```
-- 
-- There are many aspects to modifying the UI and it can become complicated, so here are some
-- guides:
-- 
-- https://www.hiveworkshop.com/threads/ui-frames-starting-guide.318603/
-- https://www.hiveworkshop.com/pastebin/913bd439799b3d917e5b522dd9ef458f20598/
-- https://www.hiveworkshop.com/tags/ui-fdf/
____exports.Frame = __TS__Class()
local Frame = ____exports.Frame
Frame.name = "Frame"
__TS__ClassExtends(Frame, Handle)
function Frame.prototype.____constructor(self, name, owner, priority, createContext, typeName, inherits)
    if Handle:initFromHandle() then
        Handle.prototype.____constructor(self)
        return
    end
    local handle
    if createContext == nil then
        handle = BlzCreateSimpleFrame(name, owner.handle, priority)
    elseif typeName ~= nil and inherits ~= nil then
        handle = BlzCreateFrameByType(
            typeName,
            name,
            owner.handle,
            inherits,
            createContext
        )
    else
        handle = BlzCreateFrame(name, owner.handle, priority, createContext)
    end
    if handle == nil then
        error("w3ts failed to create framehandle handle.", 3)
    end
    Handle.prototype.____constructor(self, handle)
end
__TS__SetDescriptor(
    Frame.prototype,
    "alpha",
    {
        get = function(self)
            return BlzFrameGetAlpha(self.handle)
        end,
        set = function(self, alpha)
            BlzFrameSetAlpha(self.handle, alpha)
        end
    },
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "children",
    {get = function(self)
        local count = self.childrenCount
        local output = {}
        do
            local i = 0
            while i < count do
                local child = self:getChild(i)
                if child then
                    output[#output + 1] = child
                end
                i = i + 1
            end
        end
        return output
    end},
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "childrenCount",
    {get = function(self)
        return BlzFrameGetChildrenCount(self.handle)
    end},
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "enabled",
    {
        get = function(self)
            return BlzFrameGetEnable(self.handle)
        end,
        set = function(self, flag)
            BlzFrameSetEnable(self.handle, flag)
        end
    },
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "height",
    {
        get = function(self)
            return BlzFrameGetHeight(self.handle)
        end,
        set = function(self, height)
            BlzFrameSetSize(self.handle, self.width, height)
        end
    },
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "parent",
    {
        get = function(self)
            return ____exports.Frame:fromHandle(BlzFrameGetParent(self.handle))
        end,
        set = function(self, parent)
            BlzFrameSetParent(self.handle, parent.handle)
        end
    },
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "text",
    {
        get = function(self)
            return BlzFrameGetText(self.handle) or ""
        end,
        set = function(self, text)
            BlzFrameSetText(self.handle, text)
        end
    },
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "textSizeLimit",
    {
        get = function(self)
            return BlzFrameGetTextSizeLimit(self.handle)
        end,
        set = function(self, size)
            BlzFrameSetTextSizeLimit(self.handle, size)
        end
    },
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "value",
    {
        get = function(self)
            return BlzFrameGetValue(self.handle)
        end,
        set = function(self, value)
            BlzFrameSetValue(self.handle, value)
        end
    },
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "visible",
    {
        get = function(self)
            return BlzFrameIsVisible(self.handle)
        end,
        set = function(self, flag)
            BlzFrameSetVisible(self.handle, flag)
        end
    },
    true
)
__TS__SetDescriptor(
    Frame.prototype,
    "width",
    {
        get = function(self)
            return BlzFrameGetWidth(self.handle)
        end,
        set = function(self, width)
            BlzFrameSetSize(self.handle, width, self.height)
        end
    },
    true
)
function Frame.create(self, name, owner, priority, createContext)
    local handle = BlzCreateFrame(name, owner.handle, priority, createContext)
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Frame.createSimple(self, name, owner, createContext)
    local handle = BlzCreateSimpleFrame(name, owner.handle, createContext)
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Frame.createType(self, name, owner, createContext, typeName, inherits)
    local handle = BlzCreateFrameByType(
        typeName,
        name,
        owner.handle,
        inherits,
        createContext
    )
    if handle then
        local obj = self:getObject(handle)
        local values = {}
        values.handle = handle
        return __TS__ObjectAssign(obj, values)
    end
    return nil
end
function Frame.prototype.addText(self, text)
    BlzFrameAddText(self.handle, text)
    return self
end
function Frame.prototype.cageMouse(self, enable)
    BlzFrameCageMouse(self.handle, enable)
    return self
end
function Frame.prototype.clearPoints(self)
    BlzFrameClearAllPoints(self.handle)
    return self
end
function Frame.prototype.click(self)
    BlzFrameClick(self.handle)
    return self
end
function Frame.prototype.destroy(self)
    BlzDestroyFrame(self.handle)
    return self
end
function Frame.prototype.getChild(self, index)
    return ____exports.Frame:fromHandle(BlzFrameGetChild(self.handle, index))
end
function Frame.prototype.setAbsPoint(self, point, x, y)
    BlzFrameSetAbsPoint(self.handle, point, x, y)
    return self
end
function Frame.prototype.setAllPoints(self, relative)
    BlzFrameSetAllPoints(self.handle, relative.handle)
    return self
end
function Frame.prototype.setAlpha(self, alpha)
    BlzFrameSetAlpha(self.handle, alpha)
    return self
end
function Frame.prototype.setEnabled(self, flag)
    BlzFrameSetEnable(self.handle, flag)
    return self
end
function Frame.prototype.setFocus(self, flag)
    BlzFrameSetFocus(self.handle, flag)
    return self
end
function Frame.prototype.setFont(self, filename, height, flags)
    BlzFrameSetFont(self.handle, filename, height, flags)
    return self
end
function Frame.prototype.setHeight(self, height)
    BlzFrameSetSize(self.handle, self.width, height)
    return self
end
function Frame.prototype.setLevel(self, level)
    BlzFrameSetLevel(self.handle, level)
    return self
end
function Frame.prototype.setMinMaxValue(self, minValue, maxValue)
    BlzFrameSetMinMaxValue(self.handle, minValue, maxValue)
    return self
end
function Frame.prototype.setModel(self, modelFile, cameraIndex)
    BlzFrameSetModel(self.handle, modelFile, cameraIndex)
    return self
end
function Frame.prototype.getParent(self)
    return ____exports.Frame:fromHandle(BlzFrameGetParent(self.handle))
end
function Frame.prototype.setParent(self, parent)
    BlzFrameSetParent(self.handle, parent.handle)
    return self
end
function Frame.prototype.setPoint(self, point, relative, relativePoint, x, y)
    BlzFrameSetPoint(
        self.handle,
        point,
        relative.handle,
        relativePoint,
        x,
        y
    )
    return self
end
function Frame.prototype.setScale(self, scale)
    BlzFrameSetScale(self.handle, scale)
    return self
end
function Frame.prototype.setSize(self, width, height)
    BlzFrameSetSize(self.handle, width, height)
    return self
end
function Frame.prototype.setSpriteAnimate(self, primaryProp, flags)
    BlzFrameSetSpriteAnimate(self.handle, primaryProp, flags)
    return self
end
function Frame.prototype.setStepSize(self, stepSize)
    BlzFrameSetStepSize(self.handle, stepSize)
    return self
end
function Frame.prototype.setText(self, text)
    BlzFrameSetText(self.handle, text)
    return self
end
function Frame.prototype.setTextColor(self, color)
    BlzFrameSetTextColor(self.handle, color)
    return self
end
function Frame.prototype.setTextSizeLimit(self, size)
    BlzFrameSetTextSizeLimit(self.handle, size)
    return self
end
function Frame.prototype.setTexture(self, texFile, flag, blend)
    BlzFrameSetTexture(self.handle, texFile, flag, blend)
    return self
end
function Frame.prototype.setTooltip(self, tooltip)
    BlzFrameSetTooltip(self.handle, tooltip.handle)
    return self
end
function Frame.prototype.setValue(self, value)
    BlzFrameSetValue(self.handle, value)
    return self
end
function Frame.prototype.setVertexColor(self, color)
    BlzFrameSetVertexColor(self.handle, color)
    return self
end
function Frame.prototype.setVisible(self, flag)
    BlzFrameSetVisible(self.handle, flag)
    return self
end
function Frame.prototype.setWidth(self, width)
    BlzFrameSetSize(self.handle, width, self.height)
    return self
end
function Frame.autoPosition(self, enable)
    BlzEnableUIAutoPosition(enable)
end
function Frame.fromEvent(self)
    return self:fromHandle(BlzGetTriggerFrame())
end
function Frame.fromHandle(self, handle)
    local ____handle_0
    if handle then
        ____handle_0 = self:getObject(handle)
    else
        ____handle_0 = nil
    end
    return ____handle_0
end
function Frame.fromName(self, name, createContext)
    return self:fromHandle(BlzGetFrameByName(name, createContext))
end
function Frame.fromOrigin(self, frameType, index)
    return self:fromHandle(BlzGetOriginFrame(frameType, index))
end
function Frame.getEventHandle(self)
    return BlzGetTriggerFrameEvent()
end
function Frame.getEventText(self)
    return BlzGetTriggerFrameValue()
end
function Frame.getEventValue(self)
    return BlzGetTriggerFrameValue()
end
function Frame.hideOrigin(self, enable)
    BlzHideOriginFrames(enable)
end
function Frame.loadTOC(self, filename)
    return BlzLoadTOCFile(filename)
end
return ____exports
