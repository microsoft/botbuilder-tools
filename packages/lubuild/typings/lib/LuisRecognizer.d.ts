import { ILuisSettings } from './ILuisSettings';
export declare class LuisRecognizer {
    private luFile;
    private appId;
    private dialogPath;
    constructor(luFile: string, targetFileName: string);
    static load(luFile: string, targetFileName: string, dialogPath: string, luisSettings: ILuisSettings): Promise<LuisRecognizer>;
    save(): Promise<void>;
    getAppId(): string;
    setAppId(appId: string): void;
    getDialogPath(): string;
    getLuPath(): string;
    versionId: string | undefined;
    readonly applicationId: string | undefined;
    readonly endpoint: string | undefined;
    readonly endpointKey: string | undefined;
}
