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
var fs = require("fs-extra");
var glob = require("globby");
var os = require("os");
var path = require("path");
var readline = require("readline");
var st = require("./schemaTracker");
var LGFile = /** @class */ (function () {
    function LGFile(file) {
        this.file = file;
        this.templates = [];
    }
    LGFile.prototype.toString = function () {
        return path.basename(this.file, ".schema");
    };
    LGFile.prototype.locale = function () {
        var filename = path.basename(this.file, ".lg");
        return filename.substring(filename.indexOf("-") + 1);
    };
    return LGFile;
}());
exports.LGFile = LGFile;
var Template = /** @class */ (function () {
    function Template(name, locale, contents, file, line) {
        this.name = name;
        this.locale = locale;
        this.file = file;
        this.line = line;
        this.contents = contents;
        if (file) {
            file.templates.push(this);
        }
    }
    Template.prototype.equalContents = function (other) {
        return this.contents === other.contents;
    };
    Template.prototype.toString = function () {
        return this.file + ":" + this.name;
    };
    return Template;
}());
exports.Template = Template;
var LGTracker = /** @class */ (function () {
    function LGTracker(schema) {
        this.files = [];
        this.index = {};
        if (schema) {
            this.schema = schema;
            for (var prop in schema.typeToType) {
                var type = schema.typeToType.get(prop);
                for (var name_1 in type.lgProperties) {
                    this.addTemplate(new Template(name_1, ""));
                }
            }
        }
        else {
            this.schema = new st.schemaTracker();
        }
    }
    LGTracker.prototype.addTemplate = function (template) {
        var locale = template.locale;
        if (!this.index.hasOwnProperty(locale)) {
            this.index[locale] = {};
        }
        var root = this.index[locale];
        var pathName = template.name.split('.');
        for (var pos = 0; pos < pathName.length; ++pos) {
            var name_2 = pathName[pos];
            if (!root.hasOwnProperty(name_2)) {
                root[name_2] = {};
            }
            root = root[name_2];
        }
        if (!root.hasOwnProperty("$templates")) {
            root.$templates = [];
        }
        root.$templates.push(template);
    };
    /** Add LG file to tracker.  */
    LGTracker.prototype.addLGFile = function (lgPath) {
        return __awaiter(this, void 0, void 0, function () {
            var file, namePath, indent, lineNum, definition;
            var _this = this;
            return __generator(this, function (_a) {
                file = new LGFile(lgPath);
                namePath = [];
                indent = 1;
                lineNum = 0;
                definition = "";
                this.readLines(lgPath, function (line) {
                    if (line.startsWith('#')) {
                        if (definition) {
                            _this.addTemplate(new Template(_this.pathToName(namePath), file.locale(), definition, file, lineNum));
                            definition = "";
                        }
                        var pos = 1;
                        while (line.length > pos && line[pos] === "#") {
                            ++pos;
                        }
                        while (pos < indent) {
                            namePath.pop();
                            --indent;
                        }
                        while (pos > indent) {
                            namePath.push(".");
                            ++indent;
                        }
                        var templateName = line.substring(pos).trim();
                        var templatePath = templateName.split('.');
                        for (var _i = 0, templatePath_1 = templatePath; _i < templatePath_1.length; _i++) {
                            var name_3 = templatePath_1[_i];
                            namePath.push(name_3);
                            ++indent;
                        }
                    }
                    else {
                        definition += line + os.EOL;
                    }
                    ++lineNum;
                }, function () {
                    if (definition) {
                        _this.addTemplate(new Template(_this.pathToName(namePath), file.locale(), definition, file, lineNum));
                    }
                });
                this.files.push(file);
                return [2 /*return*/];
            });
        });
    };
    /** Add all LG files matching glob patterns to tracker. */
    LGTracker.prototype.addLGFiles = function (patterns) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, path_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0;
                        return [4 /*yield*/, glob(patterns)];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        path_1 = _a[_i];
                        return [4 /*yield*/, this.addLGFile(path_1)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LGTracker.prototype.writeFiles = function (basePath, flat) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, key, filename, _c, contents, hasTemplate;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = [];
                        for (_b in this.index)
                            _a.push(_b);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key = _a[_i];
                        filename = path.join(path.dirname(basePath), path.basename(basePath, ".lg") + (key ? "-" + key : "") + ".lg");
                        _c = this.buildContents(this.index[key], 1, flat), contents = _c[0], hasTemplate = _c[1];
                        if (!hasTemplate) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.outputFile(filename, contents)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Union templates into this one. */
    LGTracker.prototype.union = function (other) {
        this.unionR(this.index, other.index);
        this.files.push.apply(other.files);
    };
    /** Subtract templates from this one. */
    LGTracker.prototype.diff = function (other) {
        this.diffR(this.index, other.index);
    };
    LGTracker.prototype.buildContents = function (val, depth, flat) {
        var contents = "";
        var hasTemplate = false;
        for (var key in val) {
            if (key === "$templates") {
                for (var _i = 0, _a = val.$templates; _i < _a.length; _i++) {
                    var template = _a[_i];
                    if (flat && template.name) {
                        contents += "# " + template.name + os.EOL;
                    }
                    contents += template.contents + os.EOL;
                }
                hasTemplate = hasTemplate || val.$templates.length > 0;
            }
            else {
                var _b = this.buildContents(val[key], depth + 1, flat), childContents = _b[0], childTemplate = _b[1];
                if (childTemplate) {
                    if (flat) {
                        contents += childContents;
                    }
                    else {
                        contents += "#".repeat(depth) + " " + key + os.EOL + childContents;
                    }
                    hasTemplate = true;
                }
            }
        }
        return [contents, hasTemplate];
    };
    LGTracker.prototype.diffR = function (current, other) {
        var remove = true;
        for (var key in other) {
            if (current.hasOwnProperty(key)) {
                var oldVal = current[key];
                var newVal = other[key];
                if (key === "$templates") {
                    this.diffTemplates(oldVal, newVal);
                    remove = remove && current.$templates.length == 0;
                }
                else {
                    if (!this.diffR(oldVal, newVal)) {
                        remove = false;
                    }
                    else {
                        delete current[key];
                    }
                }
            }
        }
        return remove;
    };
    LGTracker.prototype.unionR = function (current, other) {
        for (var key in other) {
            if (!current.hasOwnProperty(key)) {
                current[key] = other[key];
            }
            else {
                var oldVal = current[key];
                var newVal = other[key];
                if (key === "$templates") {
                    this.mergeTemplates(oldVal, newVal);
                }
                else {
                    this.unionR(oldVal, newVal);
                }
            }
        }
    };
    LGTracker.prototype.mergeTemplates = function (current, other) {
        for (var _i = 0, other_1 = other; _i < other_1.length; _i++) {
            var newTemplate = other_1[_i];
            var found = false;
            for (var _a = 0, current_1 = current; _a < current_1.length; _a++) {
                var oldTemplate = current_1[_a];
                if (newTemplate.equalContents(oldTemplate)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                current.push(newTemplate);
            }
        }
    };
    LGTracker.prototype.diffTemplates = function (current, other) {
        for (var _i = 0, other_2 = other; _i < other_2.length; _i++) {
            var newTemplate = other_2[_i];
            var pos = 0;
            for (var _a = 0, current_2 = current; _a < current_2.length; _a++) {
                var oldTemplate = current_2[_a];
                if (newTemplate.equalContents(oldTemplate)) {
                    current.splice(pos, 1);
                    break;
                }
            }
        }
    };
    LGTracker.prototype.pathToName = function (pathName) {
        var name = pathName[0];
        for (var i = 1; i < pathName.length; ++i) {
            name = name + "." + pathName[i];
        }
        return name;
    };
    LGTracker.prototype.readLines = function (path, lineFun, closeFun) {
        var lineReader = readline.createInterface({
            input: fs.createReadStream(path)
        });
        lineReader.on('line', lineFun);
        if (closeFun) {
            lineReader.on('close', closeFun);
        }
    };
    return LGTracker;
}());
exports.LGTracker = LGTracker;
