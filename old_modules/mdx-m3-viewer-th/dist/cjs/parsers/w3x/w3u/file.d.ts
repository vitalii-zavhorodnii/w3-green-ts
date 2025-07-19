import BinaryStream from "../../../common/binarystream";
import ModificationTable from "./modificationtable";
/**
 * war3map.w3u - the unit modification file.
 *
 * Also used for war3map.w3t (items), war3map.w3b (destructibles), and war3map.w3h (buffs).
 */
export default class War3MapW3u {
    version: number;
    originalTable: ModificationTable;
    customTable: ModificationTable;
    load(bufferOrStream: ArrayBuffer | Uint8Array | BinaryStream): void;
    save(): Uint8Array;
    getByteLength(): number;
}
