export interface IBuildArgs {
    help: boolean;
    name: string;
    environment: string | undefined;
    authoringKey: string | undefined;
    authoringRegion: string | undefined;
    config: string | undefined;
    autodelete: boolean;
    folder: string | undefined;
    force: boolean;
    defaultLanguage: string;
}
