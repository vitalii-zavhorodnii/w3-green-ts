"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConstructorDecoratingExpression = exports.createClassPropertyDecoratingExpression = exports.createClassAccessorDecoratingExpression = exports.createClassMethodDecoratingExpression = exports.createClassDecoratingExpression = exports.transformDecoratorExpression = void 0;
const ts = require("typescript");
const lua = require("../../../LuaAST");
const diagnostics_1 = require("../../utils/diagnostics");
const function_context_1 = require("../../utils/function-context");
const lualib_1 = require("../../utils/lualib");
const utils_1 = require("../../../utils");
const method_1 = require("./members/method");
const literal_1 = require("../literal");
const utils_2 = require("./utils");
function transformDecoratorExpression(context, decorator) {
    const expression = decorator.expression;
    const type = context.checker.getTypeAtLocation(expression);
    const callContext = (0, function_context_1.getFunctionContextType)(context, type);
    if (callContext === function_context_1.ContextType.Void) {
        context.diagnostics.push((0, diagnostics_1.decoratorInvalidContext)(decorator));
    }
    return context.transformExpression(expression);
}
exports.transformDecoratorExpression = transformDecoratorExpression;
function createClassDecoratingExpression(context, classDeclaration, className) {
    var _a, _b, _c, _d;
    const classDecorators = (_b = (_a = ts.getDecorators(classDeclaration)) === null || _a === void 0 ? void 0 : _a.map(d => transformDecoratorExpression(context, d))) !== null && _b !== void 0 ? _b : [];
    // If experimentalDecorators flag is set, decorate with legacy decorator logic
    if (context.options.experimentalDecorators) {
        return createLegacyDecoratingExpression(context, classDeclaration.kind, classDecorators, className);
    }
    // Else: TypeScript 5.0 decorator
    return createDecoratingExpression(context, className, className, classDecorators, {
        kind: lua.createStringLiteral("class"),
        name: lua.createStringLiteral((_d = (_c = classDeclaration.name) === null || _c === void 0 ? void 0 : _c.getText()) !== null && _d !== void 0 ? _d : ""),
    });
}
exports.createClassDecoratingExpression = createClassDecoratingExpression;
function createClassMethodDecoratingExpression(context, methodDeclaration, originalMethod, className) {
    var _a, _b;
    const parameterDecorators = getParameterDecorators(context, methodDeclaration);
    const methodDecorators = (_b = (_a = ts.getDecorators(methodDeclaration)) === null || _a === void 0 ? void 0 : _a.map(d => transformDecoratorExpression(context, d))) !== null && _b !== void 0 ? _b : [];
    const methodName = (0, method_1.transformMethodName)(context, methodDeclaration);
    // If experimentalDecorators flag is set, decorate with legacy decorator logic
    if (context.options.experimentalDecorators) {
        const methodTable = (0, method_1.transformMemberExpressionOwnerName)(methodDeclaration, className);
        return createLegacyDecoratingExpression(context, methodDeclaration.kind, [...methodDecorators, ...parameterDecorators], methodTable, methodName);
    }
    // Else: TypeScript 5.0 decorator
    return createDecoratingExpression(context, className, originalMethod, methodDecorators, {
        kind: lua.createStringLiteral("method"),
        name: methodName,
        private: lua.createBooleanLiteral((0, utils_2.isPrivateNode)(methodDeclaration)),
        static: lua.createBooleanLiteral((0, utils_2.isStaticNode)(methodDeclaration)),
    });
}
exports.createClassMethodDecoratingExpression = createClassMethodDecoratingExpression;
function createClassAccessorDecoratingExpression(context, accessor, originalAccessor, className) {
    var _a, _b;
    const accessorDecorators = (_b = (_a = ts.getDecorators(accessor)) === null || _a === void 0 ? void 0 : _a.map(d => transformDecoratorExpression(context, d))) !== null && _b !== void 0 ? _b : [];
    const propertyName = (0, literal_1.transformPropertyName)(context, accessor.name);
    // If experimentalDecorators flag is set, decorate with legacy decorator logic
    if (context.options.experimentalDecorators) {
        const propertyOwnerTable = (0, method_1.transformMemberExpressionOwnerName)(accessor, className);
        return createLegacyDecoratingExpression(context, accessor.kind, accessorDecorators, propertyOwnerTable, propertyName);
    }
    // Else: TypeScript 5.0 decorator
    return createDecoratingExpression(context, className, originalAccessor, accessorDecorators, {
        kind: lua.createStringLiteral(accessor.kind === ts.SyntaxKind.SetAccessor ? "setter" : "getter"),
        name: propertyName,
        private: lua.createBooleanLiteral((0, utils_2.isPrivateNode)(accessor)),
        static: lua.createBooleanLiteral((0, utils_2.isStaticNode)(accessor)),
    });
}
exports.createClassAccessorDecoratingExpression = createClassAccessorDecoratingExpression;
function createClassPropertyDecoratingExpression(context, property, className) {
    var _a;
    const decorators = (_a = ts.getDecorators(property)) !== null && _a !== void 0 ? _a : [];
    const propertyDecorators = decorators.map(d => transformDecoratorExpression(context, d));
    // If experimentalDecorators flag is set, decorate with legacy decorator logic
    if (context.options.experimentalDecorators) {
        const propertyName = (0, literal_1.transformPropertyName)(context, property.name);
        const propertyOwnerTable = (0, method_1.transformMemberExpressionOwnerName)(property, className);
        return createLegacyDecoratingExpression(context, property.kind, propertyDecorators, propertyOwnerTable, propertyName);
    }
    // Else: TypeScript 5.0 decorator
    // Add a diagnostic when something is returned from a field decorator
    for (const decorator of decorators) {
        const signature = context.checker.getResolvedSignature(decorator);
        const decoratorReturnType = signature === null || signature === void 0 ? void 0 : signature.getReturnType();
        // If return type of decorator is NOT void
        if (decoratorReturnType && (decoratorReturnType.flags & ts.TypeFlags.Void) === 0) {
            context.diagnostics.push((0, diagnostics_1.incompleteFieldDecoratorWarning)(property));
        }
    }
    return createDecoratingExpression(context, className, lua.createNilLiteral(), propertyDecorators, {
        kind: lua.createStringLiteral("field"),
        name: lua.createStringLiteral(property.name.getText()),
        private: lua.createBooleanLiteral((0, utils_2.isPrivateNode)(property)),
        static: lua.createBooleanLiteral((0, utils_2.isStaticNode)(property)),
    });
}
exports.createClassPropertyDecoratingExpression = createClassPropertyDecoratingExpression;
function createDecoratingExpression(context, className, originalValue, decorators, decoratorContext) {
    const decoratorTable = lua.createTableExpression(decorators.map(d => lua.createTableFieldExpression(d)));
    const decoratorContextTable = objectToLuaTableLiteral(decoratorContext);
    return (0, lualib_1.transformLuaLibFunction)(context, lualib_1.LuaLibFeature.Decorate, undefined, className, originalValue, decoratorTable, decoratorContextTable);
}
function objectToLuaTableLiteral(obj) {
    return lua.createTableExpression(Object.entries(obj).map(([key, value]) => lua.createTableFieldExpression(value, lua.createStringLiteral(key))));
}
// Legacy decorators:
function createLegacyDecoratingExpression(context, kind, decorators, targetTableName, targetFieldExpression) {
    const decoratorTable = lua.createTableExpression(decorators.map(e => lua.createTableFieldExpression(e)));
    const trailingExpressions = [decoratorTable, targetTableName];
    if (targetFieldExpression) {
        trailingExpressions.push(targetFieldExpression);
        const isMethodOrAccessor = kind === ts.SyntaxKind.MethodDeclaration ||
            kind === ts.SyntaxKind.GetAccessor ||
            kind === ts.SyntaxKind.SetAccessor;
        trailingExpressions.push(isMethodOrAccessor ? lua.createBooleanLiteral(true) : lua.createNilLiteral());
    }
    return (0, lualib_1.transformLuaLibFunction)(context, lualib_1.LuaLibFeature.DecorateLegacy, undefined, ...trailingExpressions);
}
function getParameterDecorators(context, node) {
    return node.parameters
        .flatMap((parameter, index) => {
        var _a;
        return (_a = ts
            .getDecorators(parameter)) === null || _a === void 0 ? void 0 : _a.map(decorator => (0, lualib_1.transformLuaLibFunction)(context, lualib_1.LuaLibFeature.DecorateParam, node, lua.createNumericLiteral(index), transformDecoratorExpression(context, decorator)));
    })
        .filter(utils_1.isNonNull);
}
function createConstructorDecoratingExpression(context, node, className) {
    const parameterDecorators = getParameterDecorators(context, node);
    if (parameterDecorators.length > 0) {
        const decorateMethod = createLegacyDecoratingExpression(context, node.kind, parameterDecorators, className);
        return lua.createExpressionStatement(decorateMethod);
    }
}
exports.createConstructorDecoratingExpression = createConstructorDecoratingExpression;
//# sourceMappingURL=decorators.js.map