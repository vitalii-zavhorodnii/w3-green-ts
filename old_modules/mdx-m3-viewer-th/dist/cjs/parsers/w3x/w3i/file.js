"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binarystream_1 = require("../../../common/binarystream");
const utf8_1 = require("../../../common/utf8");
const force_1 = require("./force");
const player_1 = require("./player");
const randomitemtable_1 = require("./randomitemtable");
const randomunittable_1 = require("./randomunittable");
const techavailabilitychange_1 = require("./techavailabilitychange");
const upgradeavailabilitychange_1 = require("./upgradeavailabilitychange");
/**
 * war3map.w3i - the general information file.
 */
class War3MapW3i {
    constructor() {
        this.version = 0;
        this.saves = 0;
        this.editorVersion = 0;
        this.buildVersion = new Uint32Array(4);
        this.name = '';
        this.author = '';
        this.description = '';
        this.recommendedPlayers = '';
        this.cameraBounds = new Float32Array(8);
        this.cameraBoundsComplements = new Int32Array(4);
        this.playableSize = new Int32Array(2);
        this.flags = 0;
        this.tileset = 'A';
        this.campaignBackground = 0;
        this.loadingScreenModel = '';
        this.loadingScreenText = '';
        this.loadingScreenTitle = '';
        this.loadingScreenSubtitle = '';
        this.loadingScreen = 0;
        this.prologueScreenModel = '';
        this.prologueScreenText = '';
        this.prologueScreenTitle = '';
        this.prologueScreenSubtitle = '';
        this.useTerrainFog = 0;
        this.fogHeight = new Float32Array(2);
        this.fogDensity = 0;
        this.fogColor = new Uint8Array(4);
        this.globalWeather = 0;
        this.soundEnvironment = '';
        this.lightEnvironmentTileset = '\0';
        this.waterVertexColor = new Uint8Array(4);
        this.scriptMode = 0;
        this.graphicsMode = 0;
        this.players = [];
        this.forces = [];
        this.upgradeAvailabilityChanges = [];
        this.techAvailabilityChanges = [];
        this.randomUnitTables = [];
        this.randomItemTables = [];
        this.unknown1 = 0;
    }
    load(buffer) {
        const stream = new binarystream_1.default(buffer);
        this.version = stream.readInt32();
        this.saves = stream.readInt32();
        this.editorVersion = stream.readInt32();
        if (this.version > 27) {
            stream.readUint32Array(this.buildVersion);
        }
        this.name = stream.readNull();
        this.author = stream.readNull();
        this.description = stream.readNull();
        this.recommendedPlayers = stream.readNull();
        stream.readFloat32Array(this.cameraBounds);
        stream.readInt32Array(this.cameraBoundsComplements);
        stream.readInt32Array(this.playableSize);
        this.flags = stream.readUint32();
        this.tileset = stream.readBinary(1);
        this.campaignBackground = stream.readInt32();
        if (this.version > 24) {
            this.loadingScreenModel = stream.readNull();
        }
        this.loadingScreenText = stream.readNull();
        this.loadingScreenTitle = stream.readNull();
        this.loadingScreenSubtitle = stream.readNull();
        this.loadingScreen = stream.readInt32();
        if (this.version > 24) {
            this.prologueScreenModel = stream.readNull();
        }
        this.prologueScreenText = stream.readNull();
        this.prologueScreenTitle = stream.readNull();
        this.prologueScreenSubtitle = stream.readNull();
        if (this.version > 24) {
            this.useTerrainFog = stream.readInt32();
            stream.readFloat32Array(this.fogHeight);
            this.fogDensity = stream.readFloat32();
            stream.readUint8Array(this.fogColor);
            this.globalWeather = stream.readInt32();
            this.soundEnvironment = stream.readNull();
            this.lightEnvironmentTileset = stream.readBinary(1);
            stream.readUint8Array(this.waterVertexColor);
        }
        if (this.version > 27) {
            this.scriptMode = stream.readUint32();
        }
        if (this.version > 30) {
            this.graphicsMode = stream.readUint32();
            this.unknown1 = stream.readUint32();
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            const player = new player_1.default();
            player.load(stream, this.version);
            this.players[i] = player;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            const force = new force_1.default();
            force.load(stream);
            this.forces[i] = force;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            const upgradeAvailabilityChange = new upgradeavailabilitychange_1.default();
            upgradeAvailabilityChange.load(stream);
            this.upgradeAvailabilityChanges[i] = upgradeAvailabilityChange;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            const techAvailabilityChange = new techavailabilitychange_1.default();
            techAvailabilityChange.load(stream);
            this.techAvailabilityChanges[i] = techAvailabilityChange;
        }
        for (let i = 0, l = stream.readInt32(); i < l; i++) {
            const randomUnitTable = new randomunittable_1.default();
            randomUnitTable.load(stream);
            this.randomUnitTables[i] = randomUnitTable;
        }
        if (this.version > 24) {
            for (let i = 0, l = stream.readInt32(); i < l; i++) {
                const randomItemTable = new randomitemtable_1.default();
                randomItemTable.load(stream);
                this.randomItemTables[i] = randomItemTable;
            }
        }
    }
    save() {
        const stream = new binarystream_1.default(new ArrayBuffer(this.getByteLength()));
        stream.writeInt32(this.version);
        stream.writeInt32(this.saves);
        stream.writeInt32(this.editorVersion);
        if (this.version > 27) {
            stream.writeUint32Array(this.buildVersion);
        }
        stream.writeNull(this.name);
        stream.writeNull(this.author);
        stream.writeNull(this.description);
        stream.writeNull(this.recommendedPlayers);
        stream.writeFloat32Array(this.cameraBounds);
        stream.writeInt32Array(this.cameraBoundsComplements);
        stream.writeInt32Array(this.playableSize);
        stream.writeUint32(this.flags);
        stream.writeBinary(this.tileset);
        stream.writeInt32(this.campaignBackground);
        if (this.version > 24) {
            stream.writeNull(this.loadingScreenModel);
        }
        stream.writeNull(this.loadingScreenText);
        stream.writeNull(this.loadingScreenTitle);
        stream.writeNull(this.loadingScreenSubtitle);
        stream.writeInt32(this.loadingScreen);
        if (this.version > 24) {
            stream.writeNull(this.prologueScreenModel);
        }
        stream.writeNull(this.prologueScreenText);
        stream.writeNull(this.prologueScreenTitle);
        stream.writeNull(this.prologueScreenSubtitle);
        if (this.version > 24) {
            stream.writeInt32(this.useTerrainFog);
            stream.writeFloat32Array(this.fogHeight);
            stream.writeFloat32(this.fogDensity);
            stream.writeUint8Array(this.fogColor);
            stream.writeInt32(this.globalWeather);
            stream.writeNull(this.soundEnvironment);
            stream.writeBinary(this.lightEnvironmentTileset);
            stream.writeUint8Array(this.waterVertexColor);
        }
        if (this.version > 27) {
            stream.writeUint32(this.scriptMode);
        }
        if (this.version > 30) {
            stream.writeUint32(this.graphicsMode);
            stream.writeUint32(this.unknown1);
        }
        stream.writeUint32(this.players.length);
        for (const player of this.players) {
            player.save(stream, this.version);
        }
        stream.writeUint32(this.forces.length);
        for (const force of this.forces) {
            force.save(stream);
        }
        stream.writeUint32(this.upgradeAvailabilityChanges.length);
        for (const change of this.upgradeAvailabilityChanges) {
            change.save(stream);
        }
        stream.writeUint32(this.techAvailabilityChanges.length);
        for (const change of this.techAvailabilityChanges) {
            change.save(stream);
        }
        stream.writeUint32(this.randomUnitTables.length);
        for (const table of this.randomUnitTables) {
            table.save(stream);
        }
        if (this.version > 24) {
            stream.writeUint32(this.randomItemTables.length);
            for (const table of this.randomItemTables) {
                table.save(stream);
            }
        }
        return stream.uint8array;
    }
    getByteLength() {
        let size = 111 + utf8_1.byteLengthUtf8(this.name) + utf8_1.byteLengthUtf8(this.author) + utf8_1.byteLengthUtf8(this.description) + utf8_1.byteLengthUtf8(this.recommendedPlayers) + utf8_1.byteLengthUtf8(this.loadingScreenText) + utf8_1.byteLengthUtf8(this.loadingScreenTitle) + utf8_1.byteLengthUtf8(this.loadingScreenSubtitle) + utf8_1.byteLengthUtf8(this.prologueScreenText) + utf8_1.byteLengthUtf8(this.prologueScreenTitle) + utf8_1.byteLengthUtf8(this.prologueScreenSubtitle);
        for (const player of this.players) {
            size += player.getByteLength(this.version);
        }
        for (const force of this.forces) {
            size += force.getByteLength();
        }
        size += this.upgradeAvailabilityChanges.length * 16;
        size += this.techAvailabilityChanges.length * 8;
        for (const table of this.randomUnitTables) {
            size += table.getByteLength();
        }
        if (this.version > 24) {
            size += 36 + utf8_1.byteLengthUtf8(this.loadingScreenModel) + utf8_1.byteLengthUtf8(this.prologueScreenModel) + utf8_1.byteLengthUtf8(this.soundEnvironment);
            for (const table of this.randomItemTables) {
                size += table.getByteLength();
            }
        }
        if (this.version > 27) {
            size += 20;
        }
        if (this.version > 30) {
            size += 8;
        }
        return size;
    }
    /**
     * Returns the build version as major+minor.
     *
     * For example version 1.31.X will return 131.
     *
     * Note that this will always return 0 for any version below 1.31.
     */
    getBuildVersion() {
        return this.buildVersion[0] * 100 + this.buildVersion[1];
    }
}
exports.default = War3MapW3i;
//# sourceMappingURL=file.js.map