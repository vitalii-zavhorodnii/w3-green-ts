/** @noSelfInFile */
/**
 * Reads primitive types from a packed binary string.
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
export declare class BinaryReader {
    readonly data: string;
    private pos;
    constructor(binaryString: string);
    read(fmt: string, size: number): any;
    readDouble(): number;
    readFloat(): number;
    readInt16(): number;
    readInt32(): number;
    readInt8(): number;
    readString(): string;
    readUInt16(): number;
    readUInt32(): number;
    readUInt8(): number;
}
