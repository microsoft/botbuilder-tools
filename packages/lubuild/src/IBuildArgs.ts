export interface IBuildArgs {
    // show help
    help: boolean;

    // name of the application
    name: string;

    // target environment (username, production, etc.)
    environment: string | null;

    // cli override of authoringkey
    authoringKey: string | null;

    // authoring region
    region: string|null;

    // alternate path to lubuild.config
    config: string | null;

    // build all languages (default:true)
    multilingual: boolean;

    // delete old version after successfully creating version (default:True)
    autodelete: boolean;

    // publish to production (default:true, it will publish to staging slot)
    production: boolean;

    // output folder (default: models)
    folder: string | null;
}
