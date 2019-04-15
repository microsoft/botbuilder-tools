export interface IBuildArgs {
    // show help
    help: boolean;

    // name of the application
    name: string;

    // target environment (username, production, etc.)
    environment: string | undefined;

    // cli override of authoringkey
    authoringKey: string | undefined;

    // authoring region
    authoringRegion: string | undefined;

    // alternate path to lubuild.config
    config: string | undefined;

    // build all languages (default:true)
    multilingual: boolean;

    // delete old version after successfully creating version (default:True)
    autodelete: boolean;

    // output folder (default: models)
    folder: string | undefined;

    // force update of models
    force: boolean;
}
