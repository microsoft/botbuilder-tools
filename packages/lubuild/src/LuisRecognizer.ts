import * as fs from 'async-file';
import * as path from 'path';
import * as txtfile from 'read-text-file';
import { URL } from 'url';

export class LuisRecognizer {
    private dialogPath: string | undefined;
    private luFile: string;

    constructor(luFile: string) {
        this.luFile = luFile;
        this.applicationId = undefined;
        this.versionId = '0000000000';
        this.endpoint = `{settings.luis.endpointRegion}`;
        this.endpointKey = "{settings.luis.endpointKey}";
    }

    static async load(luFile: string, dialogPath: string): Promise<LuisRecognizer> {
        if (await fs.exists(dialogPath)) {
            let recognizer = new LuisRecognizer(luFile);
            recognizer.dialogPath = dialogPath;
            let json = await txtfile.read(dialogPath);
            Object.assign(recognizer, JSON.parse(json));
            return recognizer;
        }
        var recognizer = new LuisRecognizer(luFile);
        recognizer.dialogPath = dialogPath;
        return recognizer;
    }

    async save(): Promise<void> {
        let output = {
            "$type": 'Microsoft.LuisRecognizer',
            applicationId: this.applicationId,
            endpoint: this.endpoint,
            endpointKey: this.endpointKey
        }
        await fs.writeTextFile(<string>this.dialogPath, JSON.stringify(output, null, 4), 'utf8');
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

    getFileName(): string {
        return path.basename(<string>this.dialogPath);
    }

    getLuFile() {
        return this.luFile;
    }

    applicationId: string | undefined;
    versionId: string | undefined;
    endpoint: string | undefined;
    endpointKey: string | undefined;
}

