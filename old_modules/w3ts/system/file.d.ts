/** @noSelfInFile */
/** @noSelfInFile */
/**
 * A system which provides the ability to read and write files. There are no standard IO natives
 * so this system relies on an exploit which ended up being sanctioned by Blizzard, and because of this
 * there are some caveats.
 *
 * - All files are confined to the `Documents\Warcraft III\CustomMapData` folder.
 * - The only allowed file extensions are `.txt` and `.pld`.
 * - Generated files contain boilerplate JASS code.
 * - You cannot delete files but you can empty their contents.
 * @example
 * ```ts
 * // Write to the file
 * File.write("data.txt", "Hello world!");
 *
 * // Read it's contents
 * const contents = File.read("data.txt");
 *
 * // Display the contents
 * if (contents) {
 *  print(contents);
 * }
 * ```
 */
export declare class File {
    private static dummyAbility;
    private static preloadLimit;
    private constructor();
    /**
     * Character we use for escape sequences. Avoiding `\` since it is
     * automatically escaped by `Preload`.
     */
    private static escapeCharacter;
    private static escapedSelf;
    private static escapedQuote;
    /**
     * Escapes the double quote character, which would otherwise bork file
     * reading.
     */
    private static escape;
    /**
     * Undos File.escape, returning a string back to its original form.
     */
    private static unescape;
    /**
     * Read text from a file inside of the CustomMapData folder.
     * @param filename The name of the file to read.
     * @returns Returns undefined when the file could not be read.
     */
    static read(filename: string): string | undefined;
    /**
     * Write text to a file with the option to not include boilerplate for reading the file back.
     * @param filename The name of the file to write to. Supported extensions are `.txt` and `.pld`.
     * @param contents The contents to write to the file.
     * @param allowReading If set to true, boilerplate code will be included for reading the file with `File.read`.
     */
    static writeRaw(filename: string, contents: string, allowReading?: boolean): File;
    /**
     * Write text to a file inside. All files are placed within the CustomMapData folder.
     * @param filename The name of the file to write to. Supported extensions are `.txt` and `.pld`.
     * @param contents The contents to write to the file.
     */
    static write(filename: string, contents: string): File;
}
