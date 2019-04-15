export declare class LuisRecognizer {
    private dialogPath;
    constructor();
    static load(dialogPath: string): Promise<LuisRecognizer>;
    save(): Promise<void>;
    getCloud(): string | null;
    getRegion(): string | null;
    getCulture(): string;
    getFileName(): string;
    getLuFile(files: string[]): string | null;
    applicationId: string | null;
    endpoint: string | null;
    endpointKey: string | null;
}
