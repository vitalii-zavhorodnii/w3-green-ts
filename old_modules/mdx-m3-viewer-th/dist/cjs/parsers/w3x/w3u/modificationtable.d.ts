import BinaryStream from "../../../common/binarystream";
import ModifiedObject from "./modifiedobject";
/**
 * A modification table.
 */
export default class ModificationTable {
    objects: ModifiedObject[];
    load(stream: BinaryStream, useOptionalInts: boolean, formatVersion: number): void;
    save(stream: BinaryStream, useOptionalInts: boolean, formatVersion: number): void;
    getByteLength(useOptionalInts: boolean, formatVersion: number): number;
}
