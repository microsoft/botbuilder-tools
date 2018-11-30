#!/usr/bin.old/env node
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var chalk_1 = require("chalk");
var fs = require("fs-extra");
var path = require("path");
var semver = require("semver");
var minimist = require("minimist");
var readTextFile = require("read-text-file");
var glob = require("glob");
var latestVersion = require("latest-version");
var intercept = require("intercept-stdout");
var pkg = fs.readJsonSync('../package.json');
var requiredVersion = pkg.engines.node;
if (!semver.satisfies(process.version, requiredVersion)) {
    console.log("Required node version " + requiredVersion + " not satisfied with current version " + process.version + ".");
    process.exit(1);
}
var help = require('../lib/help');
var chatdown = require('../index');
/**
 * Retrieves the content to be parsed from a file if
 * the --in argument was specified or from the stdin
 * stream otherwise. Currently, interactive mode is
 * not supported and will timeout if no data is received
 * from stdin within 1000ms.
 *
 * @param args An object containing the argument k/v pairs
 * @returns {Promise} a Promise that resolves to the content to be parsed
 */
function getInput(args) {
    if (args._.length > 0) {
        args["in"] = args._[0];
        return readTextFile.readSync(path.resolve(args["in"]));
    }
    else {
        return new Promise(function (resolve, reject) {
            var stdin = process.stdin;
            var timeout = setTimeout(reject, 1000);
            var input = '';
            stdin.setEncoding('utf8');
            stdin.on('data', function (chunk) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                input += chunk;
            });
            stdin.on('end', function () {
                resolve(input);
            });
            stdin.on('error', function (error) { return reject(error); });
        });
    }
}
/**
 * Writes the output either to a file if --out is
 * specified or to stdout otherwise.
 *
 * @param {Array<Activity>} activities The array of activities resulting from the dialog read
 * @param args An object containing the argument k/v pairs
 * @returns {Promise<boolean>} True if written to stdout
 */
function writeOut(activities, args) {
    return __awaiter(this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            output = JSON.stringify(activities, null, 2);
            return [2 /*return*/, new Promise(function (resolve) { return process.stdout.write(output, 'utf-8', function () { return resolve(true); }); })];
        });
    });
}
/**
 * Processes multiple files, and writes them to the output directory.
 *
 * @param {string} inputDir String representing a glob that specifies the input directory
 * @param {string} outputDir String representing the output directory for the processed files
 * @returns {Promise<number} The length of the files array that was processed
 */
function processFiles(inputDir, outputDir) {
    return __awaiter(this, void 0, void 0, function () {
        var files, i, fileName, slashIndex, activities, filePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = glob.sync(inputDir, { 'ignore': ['**/node_modules/**'] });
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < files.length)) return [3 /*break*/, 6];
                    fileName = files[i];
                    slashIndex = fileName.lastIndexOf('/');
                    if (slashIndex !== -1) {
                        fileName = fileName.substr(slashIndex);
                    }
                    fileName = fileName.split('.')[0];
                    return [4 /*yield*/, chatdown(readTextFile.readSync(files[i]))];
                case 2:
                    activities = _a.sent();
                    filePath = outputDir + "/" + fileName + ".transcript";
                    return [4 /*yield*/, fs.ensureFile(filePath)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fs.writeJson(filePath, activities, { spaces: 2 })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, files.length];
            }
        });
    });
}
/**
 * Runs the program
 *
 * @returns {Promise<number>} The exit code of the program. 0 if successful, > 0 if an error occurred
 */
function runProgram() {
    return __awaiter(this, void 0, void 0, function () {
        var args, latest, inputDir, outputDir, len, fileContents, activities, writeConfirmation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = minimist(process.argv.slice(2));
                    if (args.prefix) {
                        intercept(function (txt) {
                            return "[" + pkg.name + "]\n" + txt;
                        });
                    }
                    return [4 /*yield*/, latestVersion(pkg.name, { version: ">" + pkg.version })["catch"](function () { return pkg.version; })];
                case 1:
                    latest = _a.sent();
                    if (semver.gt(latest, pkg.version)) {
                        process.stderr.write(chalk_1["default"].white("\n     Update available "));
                        process.stderr.write(chalk_1["default"].grey("" + pkg.version));
                        process.stderr.write(chalk_1["default"].white(" -> "));
                        process.stderr.write(chalk_1["default"].greenBright(latest + "\n"));
                        process.stderr.write(chalk_1["default"].white("     Run "));
                        process.stderr.write(chalk_1["default"].blueBright("npm i -g " + pkg.name + " "));
                        process.stderr.write(chalk_1["default"].white("to update.\n"));
                    }
                    if (args.version || args.v) {
                        process.stdout.write(pkg.version);
                        return [2 /*return*/, 0];
                    }
                    if (args.h || args.help) {
                        help(process.stdout);
                        return [2 /*return*/, 0];
                    }
                    if (!(args.f || args.folder)) return [3 /*break*/, 3];
                    inputDir = args.f.trim();
                    outputDir = (args.o || args.out_folder) ? args.o.trim() : './';
                    if (outputDir.substr(0, 2) === './') {
                        outputDir = path.resolve(process.cwd(), outputDir.substr(2));
                    }
                    return [4 /*yield*/, processFiles(inputDir, outputDir)];
                case 2:
                    len = _a.sent();
                    process.stdout.write(chalk_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["{green Successfully wrote ", " files}\n"], ["{green Successfully wrote ", " files}\\n"])), '' + len));
                    return [2 /*return*/, 0];
                case 3: return [4 /*yield*/, getInput(args)];
                case 4:
                    fileContents = _a.sent();
                    if (!fileContents) return [3 /*break*/, 7];
                    return [4 /*yield*/, chatdown(fileContents, args)];
                case 5:
                    activities = _a.sent();
                    return [4 /*yield*/, writeOut(activities, args)];
                case 6:
                    writeConfirmation = _a.sent();
                    if (typeof writeConfirmation === 'string') {
                        process.stdout.write(chalk_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["{green Successfully wrote file:} {blue ", "}\n"], ["{green Successfully wrote file:} {blue ", "}\\n"])), writeConfirmation));
                    }
                    return [2 /*return*/, 0];
                case 7:
                    help();
                    return [2 /*return*/, 1];
            }
        });
    });
}
/**
 * Utility function that exist the process with an
 * optional error. If an Error is received, the error
 * message is written to stdout, otherwise, the help
 * content are displayed.
 *
 * @param {*} error Either an instance of Error or null
 */
function exitWithError(error) {
    if (error instanceof Error) {
        process.stderr.write(chalk_1["default"].red(error.toString()));
    }
    else {
        help();
    }
    process.exit(1);
}
runProgram()
    .then(function () { return process.exit(0); })["catch"](exitWithError);
var templateObject_1, templateObject_2;
