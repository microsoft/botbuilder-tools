"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const util = require("util");
const exec = util.promisify(child_process.exec);
function runCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(command);
        let p = yield exec(command, { maxBuffer: 1024 * 2048 });
        try {
            return JSON.parse(p.stdout);
        }
        catch (err) {
            return p.stdout;
        }
    });
}
exports.runCommand = runCommand;
//# sourceMappingURL=utils.js.map