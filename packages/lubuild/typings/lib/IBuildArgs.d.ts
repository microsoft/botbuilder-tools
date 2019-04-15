export interface IBuildArgs {
    help: boolean;
    name: string;
    environment: string | undefined;
    authoringKey: string | undefined;
    authoringRegion: string | undefined;
    config: string | undefined;
    multilingual: boolean;
    autodelete: boolean;
    folder: string | undefined;
    force: boolean;
}
