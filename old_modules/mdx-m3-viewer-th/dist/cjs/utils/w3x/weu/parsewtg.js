"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eca_1 = require("../../../parsers/w3x/wtg/eca");
function typeFunctionCall(wtg, object, signatures, customTriggerData) {
    // If this object's signature was unknown, attempt to fill in the argument types.
    // Note that this is done every time the signature is encountered.
    // If a parameter's type isn't known in one call, maybe it will be known in another call.
    if (signatures.has(object.name)) {
        const signature = signatures.get(object.name);
        const args = signature.args;
        for (const [index, parameter] of object.parameters.entries()) {
            const { type, value } = parameter;
            if (type === 1) {
                for (const variable of wtg.variables) {
                    if (variable.name === value) {
                        args[index] = variable.type;
                        break;
                    }
                }
            }
            else if (type === 2) {
                if (parameter.subParameters) {
                    const subParameters = parameter.subParameters;
                    const childSignature = customTriggerData.getFunction(subParameters.type, subParameters.name);
                    if (childSignature) {
                        const returnType = childSignature.returnType;
                        if (returnType && returnType !== 'AnyType') {
                            args[index] = returnType;
                        }
                    }
                }
            }
            else if (type === 3) {
                if (value.startsWith('TRIGSTER_') || value.includes('\\')) {
                    args[index] = 'string';
                }
                else if (value === 'true' || value === 'false') {
                    args[index] = 'boolean';
                }
                else if (!isNaN(parseFloat(value))) {
                    const valueAsFloat = parseFloat(value);
                    if (!isNaN(valueAsFloat)) {
                        if (Number.isInteger(valueAsFloat) && !value.includes('.')) {
                            args[index] = 'integer';
                        }
                        else {
                            args[index] = 'real';
                        }
                    }
                }
            }
        }
    }
    // Continue the hierarchy down any function call parameter.
    for (const parameter of object.parameters) {
        if (parameter.type === 2 && parameter.subParameters) {
            typeFunctionCall(wtg, parameter.subParameters, signatures, customTriggerData);
        }
    }
    // Continue the hierarchy down any ECA.
    if (object instanceof eca_1.default) {
        for (const child of object.ecas) {
            typeFunctionCall(wtg, child, signatures, customTriggerData);
        }
    }
}
const BIGGEST_SIGNATURE = 20;
/**
 * Parses a WTG file, but with a twist - it also tries to fill in unknown function signatures.
 *
 * This lets the WEU converter to handle maps with small TriggerData modifications that are unknown.
 *
 * Unfortunately it only handles simple cases - if there is an unknown signature in an unknown signature, there is no way to parse it as far as I can tell.
 *
 * With that being said, it already managed to parse and mostly fill the signatures of relevant test maps.
 */
function parseWtg(map, customTriggerData, data) {
    let wtg;
    const signatures = new Map();
    let currentName;
    let currentSignature;
    let searching = true;
    // If there's an unknown signature exception while parsing the triggers, a new signature will be injected.
    // Initially the signature starts with 0 arguments.
    // The triggers are then read again.
    // If there's an exception, another argument is added to the signature, and this goes on up to BIGGEST_SIGNATURE arguments. 
    // If there's another unknown signature exception, the current signature is considered complete.
    // If the triggers are fully parsed, the current signature is considered complete.
    // Note that this will not work if there is an unknown signature with a child unknown signature.
    // For example, a function call given as an argument to a function call.
    // This is also the case if it's not a direct child, but anywhere down the hierarchy.
    // If both have unknown signatures, there is no deterministic way (that I can tell) to parse the data.
    while (searching) {
        try {
            wtg = map.readTriggers(customTriggerData);
            searching = false;
        }
        catch (e) {
            if (e instanceof Error) {
                const message = e.message;
                if (message.endsWith('Unknown signature')) {
                    const end = message.lastIndexOf('"');
                    const start = message.lastIndexOf('"', end - 1) + 1;
                    const nameAndType = message.slice(start, end);
                    const [name, type] = nameAndType.split(':');
                    const typeAsNumber = parseInt(type);
                    const signature = { args: [], scriptName: null, returnType: typeAsNumber === 3 ? 'AnyType' : null };
                    currentName = name.toLowerCase();
                    currentSignature = signature;
                    signatures.set(name, signature);
                    customTriggerData.externalFunctions[typeAsNumber][currentName] = currentSignature;
                }
                else if (currentName && currentSignature) {
                    currentSignature.args.push('AnyType');
                    if (currentSignature.args.length > BIGGEST_SIGNATURE) {
                        searching = false;
                    }
                }
            }
        }
    }
    if (signatures.size) {
        if (wtg) {
            for (const trigger of wtg.triggers) {
                for (const eca of trigger.ecas) {
                    typeFunctionCall(wtg, eca, signatures, customTriggerData);
                }
            }
        }
        for (const [name, signature] of signatures) {
            data.change('unknownsignature', `Unknown signature`, `${name}(${signature.args.join(', ')}) => ${signature.returnType ? signature.returnType : 'void'}`);
        }
    }
    return wtg;
}
exports.default = parseWtg;
//# sourceMappingURL=parsewtg.js.map