#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var ajv = require("ajv");
var fs = require("fs-extra");
var path = require("path");
var schemaTracker = /** @class */ (function () {
    function schemaTracker() {
        this.typeToType = new Map();
        this.validator = new ajv();
    }
    schemaTracker.prototype.getValidator = function (schemaPath) {
        return __awaiter(this, void 0, void 0, function () {
            var validator, schemaObject, defRef, unionRole_1, processRole, _i, _a, one, ref, def, type, _b, _c, role, metaSchemaName, metaSchemaCache, metaSchema, _d, _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        validator = this.validator.getSchema(schemaPath);
                        if (!!validator) return [3 /*break*/, 8];
                        return [4 /*yield*/, fs.readJSON(schemaPath)];
                    case 1:
                        schemaObject = _f.sent();
                        if (schemaObject.oneOf) {
                            defRef = "#/definitions/";
                            unionRole_1 = "unionType(";
                            processRole = function (role, type) {
                                if (role.startsWith(unionRole_1)) {
                                    role = role.substring(unionRole_1.length, role.length - 1);
                                    var unionType = _this.typeToType.get(role);
                                    if (!unionType) {
                                        unionType = new Type(role);
                                        _this.typeToType.set(role, unionType);
                                    }
                                    unionType.addImplementation(type);
                                }
                            };
                            for (_i = 0, _a = schemaObject.oneOf; _i < _a.length; _i++) {
                                one = _a[_i];
                                ref = one.$ref;
                                // NOTE: Assuming schema file format is from cogSchema or we will ignore.
                                // Assumption is that a given type name is the same across different schemas.
                                // All .cog in one app should use the same app.schema, but if you are using 
                                // a .cog from another app then it will use its own schema which if it follows the rules
                                // should have globally unique type names.
                                if (ref.startsWith(defRef)) {
                                    ref = ref.substring(defRef.length);
                                    if (!this.typeToType.get(ref)) {
                                        def = schemaObject.definitions[ref];
                                        if (def) {
                                            type = new Type(ref, def);
                                            this.typeToType.set(ref, type);
                                            if (def.$role) {
                                                if (typeof def.$role === "string") {
                                                    processRole(def.$role, type);
                                                }
                                                else {
                                                    for (_b = 0, _c = def.$role; _b < _c.length; _b++) {
                                                        role = _c[_b];
                                                        processRole(role, type);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        metaSchemaName = schemaObject.$schema;
                        metaSchemaCache = path.join(__dirname, path.basename(metaSchemaName));
                        metaSchema = void 0;
                        return [4 /*yield*/, fs.pathExists(metaSchemaCache)];
                    case 2:
                        if (!!(_f.sent())) return [3 /*break*/, 5];
                        _e = (_d = JSON).parse;
                        return [4 /*yield*/, this.getURL(metaSchemaName)];
                    case 3:
                        metaSchema = _e.apply(_d, [_f.sent()]);
                        return [4 /*yield*/, fs.writeJSON(metaSchemaCache, metaSchema, { spaces: 4 })];
                    case 4:
                        _f.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, fs.readJSON(metaSchemaCache)];
                    case 6:
                        metaSchema = _f.sent();
                        _f.label = 7;
                    case 7:
                        this.validator.addSchema(metaSchema, metaSchemaName);
                        this.validator.addSchema(schemaObject, schemaPath);
                        validator = this.validator.getSchema(schemaPath);
                        _f.label = 8;
                    case 8: return [2 /*return*/, validator];
                }
            });
        });
    };
    schemaTracker.prototype.getURL = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var http = require('http'), https = require('https');
                        var client = http;
                        if (url.toString().indexOf("https") === 0) {
                            client = https;
                        }
                        client.get(url, function (resp) {
                            var data = '';
                            // A chunk of data has been recieved.
                            resp.on('data', function (chunk) {
                                data += chunk;
                            });
                            // The whole response has been received. 
                            resp.on('end', function () {
                                resolve(data);
                            });
                        }).on("error", function (err) {
                            reject(err);
                        });
                    })];
            });
        });
    };
    ;
    return schemaTracker;
}());
exports.schemaTracker = schemaTracker;
/** Information about a type. */
var Type = /** @class */ (function () {
    function Type(name, schema) {
        this.name = name;
        this.lgProperties = [];
        this.implementations = [];
        this.unionTypes = [];
        if (schema) {
            this.walkProps(schema, name);
        }
    }
    Type.prototype.addImplementation = function (type) {
        this.implementations.push(type);
        type.unionTypes.push(this);
    };
    Type.prototype.toString = function () {
        return this.name;
    };
    Type.prototype.walkProps = function (val, path) {
        if (val.properties) {
            for (var propName in val.properties) {
                var prop = val.properties[propName];
                var newPath = path + "/" + propName;
                if (prop.$role === "lg") {
                    this.lgProperties.push(newPath);
                }
                else if (prop.properties) {
                    this.walkProps(prop, newPath);
                }
            }
        }
    };
    return Type;
}());
exports.Type = Type;
