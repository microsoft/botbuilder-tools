import * as fs from 'async-file';
import * as txtfile from 'read-text-file';

export class LuisRecognizer {
    private dialogPath: string | undefined;
    private luFile: string;

    constructor(luFile: string) {
        this.luFile = luFile;
        this.applicationId = undefined;
        this.versionId = '0000000000';
        this.endpoint = `{settings.luis.endpoint}`;
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

    getDialogPath(): string {
        return <string>this.dialogPath;
    }

    getLuPath() {
        return this.luFile;
    }

    applicationId: string | undefined;
    versionId: string | undefined;
    endpoint: string | undefined;
    endpointKey: string | undefined;
}

