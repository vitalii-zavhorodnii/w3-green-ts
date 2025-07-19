"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureNameSafety = exports.ensureCustomScriptCodeSafety = exports.isConditionECA = exports.convertSingleToMultiple = exports.createCustomScriptECA = exports.createCustomScriptOrCommentECA = void 0;
const utf8_1 = require("../../../common/utf8");
const eca_1 = require("../../../parsers/w3x/wtg/eca");
const parameter_1 = require("../../../parsers/w3x/wtg/parameter");
/**
 * Creates a new Custom Script or comment ECA with the given data.
 */
function createCustomScriptOrCommentECA(data, isComment) {
    const eca = new eca_1.default();
    eca.type = 2; // Action
    if (isComment) {
        eca.name = 'CommentString';
    }
    else {
        eca.name = 'CustomScriptCode';
    }
    eca.isEnabled = 1;
    const parameter = new parameter_1.default();
    parameter.type = 3; // String
    parameter.value = data;
    eca.parameters[0] = parameter;
    return eca;
}
exports.createCustomScriptOrCommentECA = createCustomScriptOrCommentECA;
/**
 * Creates a new Custom Script ECA with the given script.
 */
function createCustomScriptECA(script) {
    return createCustomScriptOrCommentECA(script, false);
}
exports.createCustomScriptECA = createCustomScriptECA;
// /**
//  * Creates a new comment ECA with the given comment.
//  */
// function createCommentECA(comment: string) {
//   return createCustomScriptOrCommentECA(comment, true);
// }
function subParametersToEca(subParameters, group) {
    const eca = new eca_1.default();
    eca.name = subParameters.name;
    eca.type = subParameters.type;
    eca.group = group;
    eca.isEnabled = 1;
    eca.parameters.push(...subParameters.parameters);
    return eca;
}
function convertSingleToMultiple(eca) {
    if (eca.name === 'IfThenElse') {
        const parameters = eca.parameters;
        const ifParam = subParametersToEca(parameters[0].subParameters, 0);
        const thenParam = subParametersToEca(parameters[1].subParameters, 1);
        const elseParam = subParametersToEca(parameters[2].subParameters, 2);
        eca.name = 'IfThenElseMultiple';
        eca.parameters.length = 0;
        eca.ecas.push(ifParam, thenParam, elseParam);
        return true;
    }
    else if (eca.name === 'ForGroup' || eca.name === 'ForForce') {
        const action = subParametersToEca(eca.parameters[1].subParameters, 0);
        eca.name = `${eca.name}Multiple`;
        eca.parameters.length = 1;
        eca.ecas.push(action);
        return true;
    }
    return false;
}
exports.convertSingleToMultiple = convertSingleToMultiple;
/**
 * Given the name of the parent of some child ECA, and the child's group, determine if it's a condition.
 */
function isConditionECA(name, group) {
    if (group !== 0) {
        return false;
    }
    return name === 'AndMultiple' || name === 'OrMultiple' || name === 'IfThenElseMultiple';
}
exports.isConditionECA = isConditionECA;
// The number of bytes that each custom script action can contain.
const SCRIPT_LINE_LENGTH = 239;
/**
 * CustomScriptCode ECAs have a maximum length for their (typically) string parameter.
 * If the script length exceeds the maximum length, WE will fail to load the map properly.
 * Either it crashes, or it loads the map and GUI up until the invalid ECA, after which everything is an error.
 * This function is used to split such ECAs.
 * Splitting is possible, because the Jass parser seems to not consider multiline comments as token delimiters.
 * For example, the following lines:
 *
 *   call BJDebug/*
 *   /*Msg("hi")
 *
 * When compiled result in the correct call:
 *
 *   call BJDebugMsg("hi")
 */
function ensureCustomScriptCodeSafety(ecas) {
    const outputEcas = [];
    for (const eca of ecas) {
        if (eca.name === 'CustomScriptCode') {
            const script = eca.parameters[0].value;
            const scriptByteLength = utf8_1.byteLengthUtf8(script);
            if (scriptByteLength > SCRIPT_LINE_LENGTH) {
                const chunks = utf8_1.splitUtf8ByteLength(script, SCRIPT_LINE_LENGTH);
                const lines = chunks.length;
                const lastLine = lines - 1;
                for (let i = 0; i < lines; i++) {
                    let text = '';
                    // If this is not the first line, end the previous line's comment.
                    if (i > 0) {
                        text += '*/';
                    }
                    text += chunks[i];
                    // If this is not the last line, start a new comment.
                    if (i < lastLine) {
                        text += '/*';
                    }
                    const customScript = createCustomScriptECA(text);
                    customScript.group = eca.group;
                    outputEcas.push(customScript);
                }
            }
            else {
                outputEcas.push(eca);
            }
        }
        else {
            outputEcas.push(eca);
        }
    }
    return outputEcas;
}
exports.ensureCustomScriptCodeSafety = ensureCustomScriptCodeSafety;
/**
 * Given a name, converts all of the non-ASCII characters and space characters to underlines.
 */
function ensureNameSafety(name) {
    // Convert non-ASCII characters to underlines, for locales other than en.
    return name.split('').map((c) => c.charCodeAt(0) > 127 ? '_' : c).join('').replace(/\s/g, '_');
}
exports.ensureNameSafety = ensureNameSafety;
//# sourceMappingURL=utils.js.map