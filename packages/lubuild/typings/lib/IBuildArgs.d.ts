export interface IBuildArgs {
    help: boolean;
    name: string;
    environment: string | null;
    authoringKey: string | null;
    region: string | null;
    config: string | null;
    multilingual: boolean;
    autodelete: boolean;
    production: boolean;
    folder: string | null;
}
