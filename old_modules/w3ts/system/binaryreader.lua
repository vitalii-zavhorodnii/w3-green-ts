local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local ____exports = {}
--- Reads primitive types from a packed binary string.
-- 
-- @example ```ts
-- // Write the values
-- const writer = new BinaryWriter();
-- writer.writeUInt8(5);
-- writer.writeUInt8(32);
-- writer.writeUInt8(78);
-- writer.writeUInt8(200);
-- writer.writeUInt32(12345678);
-- writer.writeString("hello");
-- writer.writeUInt16(45000);
-- 
-- // Read the values
-- const binaryString = writer.toString();
-- const reader = new BinaryReader(binaryString);
-- const values: any[] = [];
-- 
-- values[0] = reader.readUInt8(); // 5
-- values[1] = reader.readUInt8(); // 32
-- values[2] = reader.readUInt8(); // 78
-- values[3] = reader.readUInt8(); // 200
-- values[4] = reader.readUInt32(); // 12345678
-- values[5] = reader.readString(); // hello
-- values[6] = reader.readUInt16(); // 45000
-- ```
____exports.BinaryReader = __TS__Class()
local BinaryReader = ____exports.BinaryReader
BinaryReader.name = "BinaryReader"
function BinaryReader.prototype.____constructor(self, binaryString)
    self.pos = 1
    self.data = binaryString
end
function BinaryReader.prototype.read(self, fmt, size)
    local unpacked = {string.unpack(fmt, self.data, self.pos)}
    self.pos = self.pos + size
    if #unpacked <= 0 then
        return 0
    end
    return unpacked[1]
end
function BinaryReader.prototype.readDouble(self)
    return self:read(">d", 4)
end
function BinaryReader.prototype.readFloat(self)
    return self:read(">f", 4)
end
function BinaryReader.prototype.readInt16(self)
    return self:read(">h", 2)
end
function BinaryReader.prototype.readInt32(self)
    return self:read(">i4", 4)
end
function BinaryReader.prototype.readInt8(self)
    return self:read(">b", 1)
end
function BinaryReader.prototype.readString(self)
    local value = self:read(">z", 0)
    self.pos = self.pos + (#value + 1)
    return value
end
function BinaryReader.prototype.readUInt16(self)
    return self:read(">H", 2)
end
function BinaryReader.prototype.readUInt32(self)
    return self:read(">I4", 4)
end
function BinaryReader.prototype.readUInt8(self)
    return self:read(">B", 1)
end
return ____exports
