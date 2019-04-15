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
const fs = require("async-file");
const path = require("path");
const txtfile = require("read-text-file");
const url_1 = require("url");
class LuisRecognizer {
    constructor() {
        this['$type'] = 'Microsoft.LuisRecognizer';
        this.dialogPath = '';
        this.applicationId = null;
        this.endpoint = null;
        this.endpointKey = "{settings.luis.endpointKey}";
    }
    static load(dialogPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield fs.exists(dialogPath)) {
                let recognizer = new LuisRecognizer();
                recognizer.dialogPath = dialogPath;
                let json = yield txtfile.read(dialogPath);
                Object.assign(recognizer, JSON.parse(json));
                return recognizer;
            }
            var recognizer = new LuisRecognizer();
            recognizer.dialogPath = dialogPath;
            return recognizer;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.writeTextFile(this.dialogPath, JSON.stringify(this, null, 4), 'utf8');
        });
    }
    getCloud() {
        if (this.endpoint) {
            let url = new url_1.URL(this.endpoint);
            return path.extname(url.hostname);
        }
        return null;
    }
    getRegion() {
        if (this.endpoint) {
            let url = new url_1.URL(this.endpoint);
            return url.hostname.substring(0, url.hostname.indexOf('.'));
        }
        return null;
    }
    getCulture() {
        let fn = path.basename(this.dialogPath, '.dialog');
        let lang = path.extname(fn).substring(1);
        switch (lang.toLowerCase()) {
            case 'en-us':
            case 'zh-cn':
            case 'nl-nl':
            case 'fr-fr':
            case 'fr-ca':
            case 'de-de':
            case 'it-it':
            case 'ja-jp':
            case 'ko-kr':
            case 'pt-br':
            case 'es-es':
            case 'es-mx':
            case 'tr-tr':
                return lang;
            default:
                return 'en-us';
        }
    }
    getFileName() {
        return path.basename(this.dialogPath);
    }
    getLuFile(files) {
        for (let file of files) {
            if (path.basename(file, '.lu') == path.basename(this.dialogPath, '.dialog'))
                return file;
        }
        return null;
    }
}
exports.LuisRecognizer = LuisRecognizer;
//# sourceMappingURL=LuisRecognizer.js.map