"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigFileUpdater = exports.parseConfigFileWithSystem = exports.locateConfigFile = void 0;
const path = require("path");
const ts = require("typescript");
const utils_1 = require("../utils");
const cliDiagnostics = require("./diagnostics");
const parse_1 = require("./parse");
function locateConfigFile(commandLine) {
    const { project } = commandLine.options;
    if (!project) {
        if (commandLine.fileNames.length > 0) {
            return undefined;
        }
        const searchPath = (0, utils_1.normalizeSlashes)(process.cwd());
        return ts.findConfigFile(searchPath, ts.sys.fileExists);
    }
    if (commandLine.fileNames.length !== 0) {
        return cliDiagnostics.optionProjectCannotBeMixedWithSourceFilesOnACommandLine();
    }
    // TODO: Unlike tsc, this resolves `.` to absolute path
    const fileOrDirectory = (0, utils_1.normalizeSlashes)(path.resolve(process.cwd(), project));
    if (ts.sys.directoryExists(fileOrDirectory)) {
        const configFileName = path.posix.join(fileOrDirectory, "tsconfig.json");
        if (ts.sys.fileExists(configFileName)) {
            return configFileName;
        }
        else {
            return cliDiagnostics.cannotFindATsconfigJsonAtTheSpecifiedDirectory(project);
        }
    }
    else if (ts.sys.fileExists(fileOrDirectory)) {
        return fileOrDirectory;
    }
    else {
        return cliDiagnostics.theSpecifiedPathDoesNotExist(project);
    }
}
exports.locateConfigFile = locateConfigFile;
function parseConfigFileWithSystem(configFileName, commandLineOptions, system = ts.sys) {
    var _a;
    const configRootDir = path.dirname(configFileName);
    const parsedConfigFile = ts.parseJsonSourceFileConfigFileContent(ts.readJsonConfigFile(configFileName, system.readFile), system, configRootDir, commandLineOptions, configFileName);
    const cycleCache = new Set();
    const extendedTstlOptions = getExtendedTstlOptions(configFileName, configRootDir, cycleCache, system);
    parsedConfigFile.raw.tstl = Object.assign(extendedTstlOptions, (_a = parsedConfigFile.raw.tstl) !== null && _a !== void 0 ? _a : {});
    return (0, parse_1.updateParsedConfigFile)(parsedConfigFile);
}
exports.parseConfigFileWithSystem = parseConfigFileWithSystem;
function resolveNpmModuleConfig(moduleName, configRootDir, host) {
    const resolved = ts.nodeNextJsonConfigResolver(moduleName, path.join(configRootDir, "tsconfig.json"), host);
    if (resolved.resolvedModule) {
        return resolved.resolvedModule.resolvedFileName;
    }
}
function getExtendedTstlOptions(configFilePath, configRootDir, cycleCache, system) {
    const absolutePath = ts.pathIsAbsolute(configFilePath)
        ? configFilePath
        : ts.pathIsRelative(configFilePath)
            ? path.resolve(configRootDir, configFilePath)
            : resolveNpmModuleConfig(configFilePath, configRootDir, system); // if a path is neither relative nor absolute, it is probably a npm module
    if (!absolutePath) {
        return {};
    }
    const newConfigRoot = path.dirname(absolutePath);
    if (cycleCache.has(absolutePath)) {
        return {};
    }
    cycleCache.add(absolutePath);
    const fileContent = system.readFile(absolutePath);
    const options = {};
    if (fileContent) {
        const { config: parsedConfig } = ts.parseConfigFileTextToJson(configFilePath, fileContent);
        if (!parsedConfig) {
            return {};
        }
        if (parsedConfig.extends) {
            if (Array.isArray(parsedConfig.extends)) {
                for (const extendedConfigFile of parsedConfig.extends) {
                    Object.assign(options, getExtendedTstlOptions(extendedConfigFile, newConfigRoot, cycleCache, system));
                }
            }
            else {
                Object.assign(options, getExtendedTstlOptions(parsedConfig.extends, newConfigRoot, cycleCache, system));
            }
        }
        if (parsedConfig.tstl) {
            Object.assign(options, parsedConfig.tstl);
        }
    }
    return options;
}
function createConfigFileUpdater(optionsToExtend) {
    const configFileMap = new WeakMap();
    return options => {
        const { configFile, configFilePath } = options;
        if (!configFile || !configFilePath)
            return [];
        if (!configFileMap.has(configFile)) {
            const parsedConfigFile = (0, parse_1.updateParsedConfigFile)(ts.parseJsonSourceFileConfigFileContent(configFile, ts.sys, path.dirname(configFilePath), optionsToExtend, configFilePath));
            configFileMap.set(configFile, parsedConfigFile);
        }
        const parsedConfigFile = configFileMap.get(configFile);
        Object.assign(options, parsedConfigFile.options);
        return parsedConfigFile.errors;
    };
}
exports.createConfigFileUpdater = createConfigFileUpdater;
//# sourceMappingURL=tsconfig.js.map