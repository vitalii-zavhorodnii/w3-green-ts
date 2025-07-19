/** @noSelfInFile */
/**
 * Packs primitive types into a binary string.
 *
 * @example
 * ```ts
 * // Write the values
 * const writer = new BinaryWriter();
 * writer.writeUInt8(5);
 * writer.writeUInt8(32);
 * writer.writeUInt8(78);
 * writer.writeUInt8(200);
 * writer.writeUInt32(12345678);
 * writer.writeString("hello");
 * writer.writeUInt16(45000);
 *
 * // Read the values
 * const binaryString = writer.toString();
 * const reader = new BinaryReader(binaryString);
 * const values: any[] = [];
 *
 * values[0] = reader.readUInt8(); // 5
 * values[1] = reader.readUInt8(); // 32
 * values[2] = reader.readUInt8(); // 78
 * values[3] = reader.readUInt8(); // 200
 * values[4] = reader.readUInt32(); // 12345678
 * values[5] = reader.readString(); // hello
 * values[6] = reader.readUInt16(); // 45000
 * ```
 */
export declare class BinaryWriter {
    readonly values: (string | number)[];
    private fmj;
    toString(): string;
    writeDouble(value: number): void;
    writeFloat(value: number): void;
    writeInt16(value: number): void;
    writeInt32(value: number): void;
    writeInt8(value: number): void;
    writeString(value: string): void;
    writeUInt16(value: number): void;
    writeUInt32(value: number): void;
    writeUInt8(value: number): void;
}
