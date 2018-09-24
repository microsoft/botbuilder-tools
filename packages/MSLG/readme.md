# MSLG

MSLG is a command line tool and a library for interacting with Microsoft Language Generation service using the LG REST API.

## Prerequisite

- [Node.js](https://nodejs.org/) version 8.0 or higher

## Installation

### As a CLI
Make sure you have Node.js >=8.0 and npm installed on your machine, then use:

`npm install -g mslg` (still not released)

### As a library
The LG APIs can be installed and used as a library in any Node.js or JavaScript UI projects for the browser:

`npm install -s mslg` (still not released)

You can then import and use service classes specific to the endpoint and operation you wish to call.

## Command line usage

| Command                                                  | Description                                                                                         |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **Endpoint**                                             |                                                                                                     |
| `mslg create endpoint [--in endpointDefinition.json]`    | Creates a new language generation endpoint. If definition file is not provided, the values in the `.lgrc` file will be used instead.|
| `mslg delete endpoint --id <string>`                     | Deletes the language generation model endpoint with the given id.|
| `mslg get endpoint --id <string>`                        | Gets the specified deployed language generation endpoint.                                   |
| `mslg update endpoint --id <string>  --in endpointUpdate.json` | Updates the mutable details of the language generation endpoint identified by its id.                                                               |
| **Endpoints**                                               |                                                                                                     |
| `mslg get endpoints`                                        | Gets all language generation endpoint of a subscription.                                                              |
| **Model**                                                   |                                                                                                     |
| `mslg create model --lg <path> [--in modelDefinition.json]`   | Creates a new language generation model. `<path>` can point to an lg file or a folder containing lg files. If definition file is not provided, the values in the `.lgrc` file will be used instead.                             |
| `mslg delete model --id <string>`                           | Deletes the language generation model with the given id.                                 |
| `mslg get model --id <string>`                | Gets the specified language generation model.                                        |
| `mslg update model --id <string> --in modelUpdate.json`                | Updates the mutable details of the language generation model identified by its id.                                      
| `mslg replace model --id <string> --lg <path>`                | Creates a new language generation model with same properties as existing model with specified id.  `<path>` can point to an lg file or a folder containing lg files.                                
| **Models**                                     |                                                                                                     |
| `mslg get models`                             | Gets all language generation model of a subscription.                                                      |
| **Locales**                                     |                                                                                                     |
| `mslg get supportedlocalesforendpoints`                             | Gets a list of supported locales for language generation endpoint creations.                                                     |
| `mslg get supportedlocalesformodels`                             | Gets a list of supported locales for language generation model creations.                                                      |
| **Translate**                                            |                                                                                                     |
| `mslg translate -k <translateKey> [--in <lgFile>] [-lgFolder <inputFolder>] [-s]`| Translates lg file(s) to a target language                 |
| **Parse and Collate**                                    |                                                                                                     |
| `mslg parse --lgFolder <inputFolder> [-s]`              | Parse and collates multiple .lg files                                                               |

> Note: If `--id` is not passed as an argument, the value in the `.lgrc` file will be used instead.

## Configuration
A configuration object is required to provide the authoring key, app ID, endpoint key and the endpoint base path to each outbound call. There are 3 ways to provide this information to the CLI:

1. As a `.lgrc` file in the cwd. 
The JSON format for the `.lgrc` file:
```json
{
  "authoringKey": "xxxxxxx-xxxxx-xxxx-xxxx-xxxxxxxx",
  "endpointKey": "https://xxxxxx.azurewebsites.net",
  "endpointBasePath": "xxxxxxx-xxxxx-xxxx-xxxx-xxxxxxxx",
  "lgAppId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "lgAppName": "xxxxxxxxxx",
  "lgAppLocale": "xxxxxxxxxx",
  "lgAppDomain": "xxxxxxxxxx",
  "lgAppVersion": "xxxxxxxxxx",
}
```

> NOTE: Simply run `mslg init` to answer simple questions to create your .lgrc file

2. As arguments to the CLI: `[--authoringKey|--endpointKey|--endpointBasePath|--lgAppId|--lgAppName|--lgAppLocale|--lgAppDomain|--lgAppVersion]`

3. As environment variables: `LG_AUTHORING_KEY`, `LG_ENDPOINT_KEY`, `LG_ENDPOINT_BASE_PATH`, `LG_APP_ID`, `LG_APP_NAME`, `LG_APP_LOCALE`, `LG_APP_DOMAIN`, `LG_APP_VERSION`

The CLI will first look for these named configuration variables in the arguments list, then inside the `.lgrc` file, then fallback to the environment variables. 

### Securing Your Access Key
To better secure your access key, it is recommended to omit the key from the `.lgrc` 
file and instead pass it in to the `--authoringKey` argument or store it as the `LG_AUTHORING_KEY` 
environment variable. If security is not a concern for your particular case, all configuration items 
can be stored in the `.lgrc` for convenience.

### Overriding Configurations
Since configuration items can be passed as arguments to the CLI, using arguments to specify 
the configuration will override the `.lgrc` and any environment variables that may have been specified.