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

## .LG file format
.lg file will be a lot similar to the .lu file (to keep consistency across our files). 
At the root of the .lg idea we have two main concepts
- Template
- Entity

the .lg file resembles a graph whose nodes are templates which might references other templates in addition to some explicit entity definitions.

### Template
- A template follows the follwoing pattern :
    ```sh
            # <TemplateName>
            - <Condition expression (optional, default expression always evaluates to true)>
                - <condition value> 
                - <condition value>
                .. ( and all the above could be repeated again, ie you can have n condition expression and their values)
            - Default
                - <default value> 
        ```
- The value in a template can refer to one or more other templates
- Value can include SSML/ markdown content 
- Circular references when nesting templates are not be supported
- Template references can be a fully resolved link
- Reference to another named template are denoted using [templateName] notation.  
Optionally, you can pass specific entities to a template resolution call using [templateName(entity1, entity2)] notation. 

- Example | simple conditionless template :
    ```sh
        # HelloTemplate
            - Hi 
            - Hello
            - Welcome
    ```
- Example | simple template with simple true/false condition :
    ```sh
        # SmartHelloTemplate
            - Case: {knowUserName}
                - Hi {userName}
            - Default
                - Hello
    ```
- Example | simple template with value condition :
    ```sh
        # OfferHelp
            - Case: {knowUserLocation = true} && {userLocation} = "Cairo"
                - Would you like to know our special offers in Cairo store ?
            - Case: {knowUserLocation = true} && {userLocation} != "Cairo"
                - Would you like to assign an operator from  {userLocation} store to help you ?
            - Default
                - How can I help you Today ?
    ```
- Example | simple conditionless parameterized template :
    ```sh
        # HelloTemplate(userName)
            - Hi {userName}
            - Hello {userName}
    ```
### Entity
- Denoted via {entityName} notation when used directly within a text value (ie L without explicit declaration, and in this case it's default type is assumed to be a string)
- When used as a parameter within a predefined macro helper function or as a parameter to a template resolution call, they are simply expressed as entityName 
- entities can have one of the following types and are defined the same way as they are defined in LU files. 
    -- Types: String, Int, Long, Float, Double, Bool, DateTime 
- when defiend explicitly in the .lg file the follow the following pattern :
`<entityName>:<entityType> `    
- Example:  
    -- `$partySize : Int` 
    -- `$deliveryAddress : String` 
- entities can optionally support a list of additional decorations like "Say-as" tags, "Capitalization" etc. They are represented as a list of <attribute>=<value> pairs on the entity type definition line 
    -- Example:  
        --- `$deliveryAddress : String say-as = Address` 
### Other concepts
- Comments are expressed via the standard markdown notation - '> this is a comment and the entire line will be treated as a comment' 
- Predefined macro helper functions - these are a collection of pre-defined helper functions available for developers to use in condition evaluation or inline in a text value. These will denoted using    
    -- {macroname(param1, param2, …)} notation. 
    -- "isEqual(foo, bar)" as a condition expression 
    -- "Sure, I will set an alarm for {dateReadOut(alarmDateTime)} {timeOfDay(alarmTime)}" as a text value
- Predefined macro helper function calls as well as template resolution calls can accept either an entity name or an explicit string value.  
    -- E.g. "isEqual(foo, 'expected value')" or "[templateName(entity1, 'AM')]" 
- Predefined macro helper functions support nested calls.  
    -- E.g. "isEqual(timeOfDay(alarmDateTime), 'morning')" 
- Use '\' as escape character. E.g. "You can say cheese and tomato \\[toppings are optional\\]" 
- Please refer to the callback.md file in the repository for more information about the available macro functions 
