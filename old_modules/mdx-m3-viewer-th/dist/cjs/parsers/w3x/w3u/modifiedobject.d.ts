import BinaryStream from "../../../common/binarystream";
import Modification from "./modification";
/**
 * A modified object.
 */
export default class ModifiedObject {
    oldId: string;
    newId: string;
    sets: number;
    setsFlag: number[];
    modifications: Modification[];
    load(stream: BinaryStream, useOptionalInts: boolean, formatVersion: number): void;
    save(stream: BinaryStream, useOptionalInts: boolean, formatVersion: number): void;
    getByteLength(useOptionalInts: boolean, formatVersion: number): number;
}
