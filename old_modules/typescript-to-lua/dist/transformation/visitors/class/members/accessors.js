"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAccessorDeclarations = void 0;
const ts = require("typescript");
const lua = require("../../../../LuaAST");
const lua_ast_1 = require("../../../utils/lua-ast");
const lualib_1 = require("../../../utils/lualib");
const function_1 = require("../../function");
const literal_1 = require("../../literal");
const utils_1 = require("../utils");
const constructor_1 = require("./constructor");
const decorators_1 = require("../decorators");
function transformAccessor(context, node, className) {
    var _a;
    const [params, dot, restParam] = (0, function_1.transformParameters)(context, node.parameters, (0, lua_ast_1.createSelfIdentifier)());
    const body = node.body ? (0, function_1.transformFunctionBody)(context, node.parameters, node.body, restParam)[0] : [];
    const accessorFunction = lua.createFunctionExpression(lua.createBlock(body), params, dot, lua.NodeFlags.Declaration);
    if ((_a = ts.getDecorators(node)) === null || _a === void 0 ? void 0 : _a.length) {
        return (0, decorators_1.createClassAccessorDecoratingExpression)(context, node, accessorFunction, className);
    }
    else {
        return accessorFunction;
    }
}
function transformAccessorDeclarations(context, { firstAccessor, getAccessor, setAccessor }, className) {
    const propertyName = (0, literal_1.transformPropertyName)(context, firstAccessor.name);
    const descriptor = lua.createTableExpression([]);
    if (getAccessor) {
        const getterFunction = transformAccessor(context, getAccessor, className);
        descriptor.fields.push(lua.createTableFieldExpression(getterFunction, lua.createStringLiteral("get")));
    }
    if (setAccessor) {
        const setterFunction = transformAccessor(context, setAccessor, className);
        descriptor.fields.push(lua.createTableFieldExpression(setterFunction, lua.createStringLiteral("set")));
    }
    const isStatic = (0, utils_1.isStaticNode)(firstAccessor);
    const target = isStatic ? lua.cloneIdentifier(className) : (0, constructor_1.createPrototypeName)(className);
    const feature = isStatic ? lualib_1.LuaLibFeature.ObjectDefineProperty : lualib_1.LuaLibFeature.SetDescriptor;
    const parameters = [target, propertyName, descriptor];
    if (!isStatic)
        parameters.push(lua.createBooleanLiteral(true));
    const call = (0, lualib_1.transformLuaLibFunction)(context, feature, undefined, ...parameters);
    return lua.createExpressionStatement(call);
}
exports.transformAccessorDeclarations = transformAccessorDeclarations;
//# sourceMappingURL=accessors.js.map