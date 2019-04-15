import * as fs from 'async-file';
import * as path from 'path';
import * as txtfile from 'read-text-file';
import { URL } from 'url';

export class LuisRecognizer {
    private dialogPath: string;

    constructor() {
        (<any>this)['$type'] = 'Microsoft.LuisRecognizer';
        this.dialogPath = '';
        this.applicationId = null;
        this.endpoint = null;
        this.endpointKey = "{settings.luis.endpointKey}";
    }

    static async load(dialogPath: string): Promise<LuisRecognizer> {

        if (await fs.exists(dialogPath)) {
            let recognizer = new LuisRecognizer();
            recognizer.dialogPath = dialogPath;
            let json = await txtfile.read(dialogPath);
            Object.assign(recognizer, JSON.parse(json));
            return recognizer;
        }
        var recognizer = new LuisRecognizer();
        recognizer.dialogPath = dialogPath;
        return recognizer;
    }

    async save(): Promise<void> {
        await fs.writeTextFile(this.dialogPath, JSON.stringify(this, null, 4), 'utf8');
    }

    getCloud() {
        if (this.endpoint) {
            let url = new URL(this.endpoint);
            return path.extname(url.hostname);
        }
        return null;
    }

    getRegion() {
        if (this.endpoint) {
            let url = new URL(this.endpoint);
            return url.hostname.substring(0, url.hostname.indexOf('.'));
        }
        return null;
    }

    getCulture(): string {
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

    getFileName() : string {
        return path.basename(this.dialogPath);
    }

    getLuFile(files: string[]) {
        for(let file of files) {
            if (path.basename(file, '.lu') == path.basename(this.dialogPath, '.dialog'))
                return file;
        }
        return null;
    }

    applicationId: string | null;
    endpoint: string | null;
    endpointKey: string | null;
}

