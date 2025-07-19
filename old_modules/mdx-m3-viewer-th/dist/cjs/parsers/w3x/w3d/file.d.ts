import BinaryStream from "../../../common/binarystream";
import ModificationTable from "../w3u/modificationtable";
/**
 * war3map.w3d - the doodad modification file.
 *
 * Also used for war3map.w3a (abilities), and war3map.w3q (upgrades).
 */
export default class War3MapW3d {
    version: number;
    originalTable: ModificationTable;
    customTable: ModificationTable;
    load(bufferOrStream: ArrayBuffer | Uint8Array | BinaryStream): void;
    save(): Uint8Array;
    getByteLength(): number;
}
