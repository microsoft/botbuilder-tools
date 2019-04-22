import * as fs from 'async-file';
import * as path from 'path';
import * as txtfile from 'read-text-file';
import { ILuisSettings } from './ILuisSettings';

export class LuisRecognizer {
    private appId: string;
    private dialogPath: string | undefined;

    constructor(private luFile: string, targetFileName: string) {
        this.appId = '';
        this.applicationId = `{settings.luis.${targetFileName.split('.').join('_')}}`;
        this.endpoint = `{settings.luis.endpoint}`;
        this.endpointKey = "{settings.luis.endpointKey}";
        this.versionId = '0000000000';
    }

    static async load(luFile: string, targetFileName: string, dialogPath: string, luisSettings: ILuisSettings): Promise<LuisRecognizer> {
        if (await fs.exists(dialogPath)) {
            let recognizer = new LuisRecognizer(luFile, targetFileName);
            recognizer.dialogPath = dialogPath;
            let json = await txtfile.read(dialogPath);
            Object.assign(recognizer, JSON.parse(json));
            recognizer.setAppId(luisSettings.luis[path.basename(luFile).split('.').join('_')]);
            return recognizer;
        }
        var recognizer = new LuisRecognizer(luFile, targetFileName);
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

    getAppId(): string {
        return this.appId;
    }

    setAppId(appId: string) {
        this.appId = appId;
    }

    getDialogPath(): string {
        return <string>this.dialogPath;
    }

    getLuPath() {
        return this.luFile;
    }

    versionId: string | undefined;
    readonly applicationId: string | undefined;
    readonly endpoint: string | undefined;
    readonly endpointKey: string | undefined;
}

