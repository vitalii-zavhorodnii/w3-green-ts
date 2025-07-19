"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var prettier_1 = require("prettier");
var get_all_comments_from_nodes_1 = require("../get-all-comments-from-nodes");
var get_import_nodes_1 = require("../get-import-nodes");
var get_sorted_nodes_1 = require("../get-sorted-nodes");
var remove_nodes_from_original_code_1 = require("../remove-nodes-from-original-code");
var code = "// first comment\n// second comment\nimport z from 'z';\nimport c from 'c';\nimport g from 'g';\nimport t from 't';\nimport k from 'k';\n// import a from 'a';\n  // import a from 'a';\nimport a from 'a';\n";
test('it should remove nodes from the original code', function () { return __awaiter(void 0, void 0, void 0, function () {
    var importNodes, sortedNodes, allCommentsFromImports, commentAndImportsToRemoveFromCode, codeWithoutImportDeclarations, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                importNodes = (0, get_import_nodes_1.getImportNodes)(code);
                sortedNodes = (0, get_sorted_nodes_1.getSortedNodes)(importNodes, {
                    importOrder: [],
                    importOrderCaseInsensitive: false,
                    importOrderSeparation: false,
                    importOrderGroupNamespaceSpecifiers: false,
                    importOrderSortSpecifiers: false,
                    importOrderSideEffects: true,
                });
                allCommentsFromImports = (0, get_all_comments_from_nodes_1.getAllCommentsFromNodes)(sortedNodes);
                commentAndImportsToRemoveFromCode = __spreadArray(__spreadArray([], sortedNodes, true), allCommentsFromImports, true);
                codeWithoutImportDeclarations = (0, remove_nodes_from_original_code_1.removeNodesFromOriginalCode)(code, commentAndImportsToRemoveFromCode);
                return [4 /*yield*/, (0, prettier_1.format)(codeWithoutImportDeclarations, {
                        parser: 'babel',
                    })];
            case 1:
                result = _a.sent();
                expect(result).toEqual('');
                return [2 /*return*/];
        }
    });
}); });
