import BinaryStream from '../../common/binarystream';
import IndexEntry from './indexentry';
/**
 * An unsupported entry.
 *
 * This is used for entries that have known structures (or at least sizes), but this parser isn't going to actually parse.
 * The entry will contain its own reader and version, in case the client code wants to do anything with it.
 */
export default class UnsupportedEntry {
    stream: BinaryStream;
    version: number;
    index: IndexEntry[];
    constructor(stream: BinaryStream, version: number, index: IndexEntry[]);
}
