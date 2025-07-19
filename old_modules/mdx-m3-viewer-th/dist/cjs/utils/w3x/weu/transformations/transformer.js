"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameter_1 = require("../../../../parsers/w3x/wtg/parameter");
const subparameters_1 = require("../../../../parsers/w3x/wtg/subparameters");
const conversions_1 = require("../conversions");
function runTests(data, object, args, mapping, convertedParameters) {
    const parameters = object.parameters;
    const tests = [];
    if (mapping.test) {
        tests.push(mapping.test);
    }
    if (mapping.tests) {
        tests.push(...mapping.tests);
    }
    for (const [index, value] of tests) {
        // Convert and cache the parameter.
        if (convertedParameters[index] === undefined) {
            convertedParameters[index] = conversions_1.convertParameterInline(data, parameters[index], args[index]);
        }
        if (value !== convertedParameters[index]) {
            return false;
        }
    }
    return true;
}
function setNameAndType(data, object, name) {
    object.name = name;
    object.type = data.triggerData.getFunctionType(name);
    if (object instanceof subparameters_1.default) {
        const parameter = data.stack[1];
        parameter.value = name;
    }
}
function setParameters(data, object, args, mapping) {
    if (mapping.parameters) {
        const parameters = object.parameters;
        object.parameters = mapping.parameters.map((value) => {
            if (typeof value === 'number') {
                return parameters[value];
            }
            else if (typeof value === 'string') {
                const parameter = new parameter_1.default();
                if (data.triggerData.getPreset(value)) {
                    parameter.type = 0;
                }
                else {
                    parameter.type = 3;
                }
                parameter.value = value;
                return parameter;
            }
            else {
                const whichParameter = value[0];
                const whichOperator = value[1];
                const operandValue = value[2];
                const argType = args[whichParameter];
                let typedFunction;
                let mathOp;
                if (argType === 'integer') {
                    typedFunction = 'OperatorInt';
                }
                else if (argType === 'real') {
                    typedFunction = 'OperatorReal';
                }
                else {
                    throw new Error(`Attempted to use an operator on a non-number parameter of type "${argType}`);
                }
                if (whichOperator === '+') {
                    mathOp = 'OperatorAdd';
                }
                else if (whichOperator === '-') {
                    mathOp = 'OperatorSubtract';
                }
                else if (whichOperator === '*') {
                    mathOp = 'OperatorMultiply';
                }
                else {
                    mathOp = 'OperatorDivide';
                }
                const parameter = new parameter_1.default();
                parameter.value = typedFunction;
                parameter.type = 2;
                const subParameters = new subparameters_1.default();
                subParameters.name = typedFunction;
                subParameters.type = 3;
                const operandA = parameters[whichParameter];
                const operator = new parameter_1.default();
                operator.type = 0;
                operator.value = mathOp;
                const operandB = new parameter_1.default();
                operandB.type = 3;
                operandB.value = `${operandValue}`;
                subParameters.beginParameters = 1;
                subParameters.parameters = [operandA, operator, operandB];
                parameter.subParameters = subParameters;
                return parameter;
            }
        });
    }
}
function transformer(transformations) {
    return function (data, object) {
        // The signature for the input (to be replaced) function.
        const signature = data.triggerData.getFunction(object.type, object.name);
        // This can happen if there is a transformer that is implemented, however it's not found in the custom TriggerData.txt
        // Perhaps it will be worthwhile in the future to also query the signature from common.j, however that's an extra download etc.
        // For now I am going to assume the used YDWE TriggerData.txt exposes more or less everything.
        if (!signature) {
            console.warn(`transformer failed to get the signature for the input function: ${object.name}`);
            return false;
        }
        const args = signature.args;
        // A cache for converted parameters.
        // If there are multiple transformations, or transformations with multiple mappings, usually they branch on the same parameter(s).
        // The first time a parameter is tested, it will be converted, and stored here.
        // The next time it is tested, it will be fetched directly.
        const convertedParameters = [];
        for (const [name, mappings] of Object.entries(transformations)) {
            let mappingAsArray;
            if (Array.isArray(mappings)) {
                mappingAsArray = mappings;
            }
            else {
                mappingAsArray = [mappings];
            }
            for (const mapping of mappingAsArray) {
                if (runTests(data, object, args, mapping, convertedParameters)) {
                    setNameAndType(data, object, name);
                    setParameters(data, object, args, mapping);
                    return true;
                }
            }
        }
        return false;
    };
}
exports.default = transformer;
//# sourceMappingURL=transformer.js.map