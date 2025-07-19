"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMethodDeclaration = exports.transformMethodName = exports.transformMemberExpressionOwnerName = void 0;
const ts = require("typescript");
const lua = require("../../../../LuaAST");
const function_1 = require("../../function");
const literal_1 = require("../../literal");
const utils_1 = require("../utils");
const constructor_1 = require("./constructor");
const decorators_1 = require("../decorators");
function transformMemberExpressionOwnerName(node, className) {
    return (0, utils_1.isStaticNode)(node) ? lua.cloneIdentifier(className) : (0, constructor_1.createPrototypeName)(className);
}
exports.transformMemberExpressionOwnerName = transformMemberExpressionOwnerName;
function transformMethodName(context, node) {
    const methodName = (0, literal_1.transformPropertyName)(context, node.name);
    if (lua.isStringLiteral(methodName) && methodName.value === "toString") {
        return lua.createStringLiteral("__tostring", node.name);
    }
    return methodName;
}
exports.transformMethodName = transformMethodName;
function transformMethodDeclaration(context, node, className) {
    var _a, _b;
    // Don't transform methods without body (overload declarations)
    if (!node.body)
        return [];
    const methodTable = transformMemberExpressionOwnerName(node, className);
    const methodName = transformMethodName(context, node);
    const [functionExpression] = (0, function_1.transformFunctionToExpression)(context, node);
    const methodHasDecorators = ((_b = (_a = ts.getDecorators(node)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
    const methodHasParameterDecorators = node.parameters.some(p => { var _a, _b; return ((_b = (_a = ts.getDecorators(p)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0; }); // Legacy decorators
    if (methodHasDecorators || methodHasParameterDecorators) {
        if (context.options.experimentalDecorators) {
            // Legacy decorator statement
            return [
                lua.createAssignmentStatement(lua.createTableIndexExpression(methodTable, methodName), functionExpression),
                lua.createExpressionStatement((0, decorators_1.createClassMethodDecoratingExpression)(context, node, functionExpression, className)),
            ];
        }
        else {
            return [
                lua.createAssignmentStatement(lua.createTableIndexExpression(methodTable, methodName), (0, decorators_1.createClassMethodDecoratingExpression)(context, node, functionExpression, className), node),
            ];
        }
    }
    else {
        return [
            lua.createAssignmentStatement(lua.createTableIndexExpression(methodTable, methodName), functionExpression, node),
        ];
    }
}
exports.transformMethodDeclaration = transformMethodDeclaration;
//# sourceMappingURL=method.js.map