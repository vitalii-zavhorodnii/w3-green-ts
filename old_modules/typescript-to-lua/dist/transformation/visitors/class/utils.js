"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtendedType = exports.getExtendedNode = exports.getExtendsClause = exports.isStaticNode = exports.isPrivateNode = void 0;
const ts = require("typescript");
function isPrivateNode(node) {
    var _a;
    return ((_a = node.modifiers) === null || _a === void 0 ? void 0 : _a.some(m => m.kind === ts.SyntaxKind.PrivateKeyword)) === true;
}
exports.isPrivateNode = isPrivateNode;
function isStaticNode(node) {
    var _a;
    return ((_a = node.modifiers) === null || _a === void 0 ? void 0 : _a.some(m => m.kind === ts.SyntaxKind.StaticKeyword)) === true;
}
exports.isStaticNode = isStaticNode;
function getExtendsClause(node) {
    var _a;
    return (_a = node.heritageClauses) === null || _a === void 0 ? void 0 : _a.find(clause => clause.token === ts.SyntaxKind.ExtendsKeyword);
}
exports.getExtendsClause = getExtendsClause;
function getExtendedNode(node) {
    const extendsClause = getExtendsClause(node);
    if (!extendsClause)
        return;
    return extendsClause.types[0];
}
exports.getExtendedNode = getExtendedNode;
function getExtendedType(context, node) {
    const extendedNode = getExtendedNode(node);
    return extendedNode && context.checker.getTypeAtLocation(extendedNode);
}
exports.getExtendedType = getExtendedType;
//# sourceMappingURL=utils.js.map