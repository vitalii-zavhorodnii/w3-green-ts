local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local ____exports = {}
--- Packs primitive types into a binary string.
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
____exports.BinaryWriter = __TS__Class()
local BinaryWriter = ____exports.BinaryWriter
BinaryWriter.name = "BinaryWriter"
function BinaryWriter.prototype.____constructor(self)
    self.values = {}
    self.fmj = ">"
end
function BinaryWriter.prototype.__tostring(self)
    return string.pack(
        self.fmj,
        table.unpack(self.values)
    )
end
function BinaryWriter.prototype.writeDouble(self, value)
    self.fmj = self.fmj .. "d"
    local ____self_values_0 = self.values
    ____self_values_0[#____self_values_0 + 1] = value
end
function BinaryWriter.prototype.writeFloat(self, value)
    self.fmj = self.fmj .. "f"
    local ____self_values_1 = self.values
    ____self_values_1[#____self_values_1 + 1] = value
end
function BinaryWriter.prototype.writeInt16(self, value)
    self.fmj = self.fmj .. "h"
    local ____self_values_2 = self.values
    ____self_values_2[#____self_values_2 + 1] = value
end
function BinaryWriter.prototype.writeInt32(self, value)
    self.fmj = self.fmj .. "i4"
    local ____self_values_3 = self.values
    ____self_values_3[#____self_values_3 + 1] = value
end
function BinaryWriter.prototype.writeInt8(self, value)
    self.fmj = self.fmj .. "b"
    local ____self_values_4 = self.values
    ____self_values_4[#____self_values_4 + 1] = value
end
function BinaryWriter.prototype.writeString(self, value)
    self.fmj = self.fmj .. "z"
    local ____self_values_5 = self.values
    ____self_values_5[#____self_values_5 + 1] = value
end
function BinaryWriter.prototype.writeUInt16(self, value)
    self.fmj = self.fmj .. "H"
    local ____self_values_6 = self.values
    ____self_values_6[#____self_values_6 + 1] = value
end
function BinaryWriter.prototype.writeUInt32(self, value)
    self.fmj = self.fmj .. "I4"
    local ____self_values_7 = self.values
    ____self_values_7[#____self_values_7 + 1] = value
end
function BinaryWriter.prototype.writeUInt8(self, value)
    self.fmj = self.fmj .. "B"
    local ____self_values_8 = self.values
    ____self_values_8[#____self_values_8 + 1] = value
end
return ____exports
