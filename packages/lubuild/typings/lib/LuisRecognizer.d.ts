export declare class LuisRecognizer {
    private dialogPath;
    private luFile;
    constructor(luFile: string);
    static load(luFile: string, dialogPath: string): Promise<LuisRecognizer>;
    save(): Promise<void>;
    getDialogPath(): string;
    getLuPath(): string;
    applicationId: string | undefined;
    versionId: string | undefined;
    endpoint: string | undefined;
    endpointKey: string | undefined;
}
