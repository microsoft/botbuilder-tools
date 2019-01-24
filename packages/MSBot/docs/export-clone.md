## Exporting Services

You can export all of the resources necessary for someone to recreate in their own
subscription by using the **msbot export services** command.  The result of the command is a folder with QnAMaker and LUIS models exported  
and a .bot.recipe file which are the instructions for **msbot clone services** to recreate.

```shell
msbot export services --folder folderName --bot your.bot 
```

| Option                | Description                                                           |
|-----------------------|-----------------------------------------------------------------------|                                       
| -b, --bot <path>      | path to bot file.  If omitted, local folder will look for a .bot file |
| --secret <secret>     | bot file secret password for encrypting service secrets               |
| -f, --folder <folder> | folder to put the bot recipe into                                     |
| --prefix              | Append [msbot] prefix to all messages                                 |
| --appId               | (OPTIONAL) Application ID for an existing application, if not passed  |
|                       | then a new Application will be created                                |
| --appSecret           | (OPTIONAL) Application Secret for an existing application, if not     |
|                       | passed then a new Application will be created                         |
| -h, --help            | output usage information                                              |

## Cloning Services

The **msbot clone services** command will take a .bot.recipe file and folder which was created via
**msbot export services** and use it to recreate all of the services you need to run a project.  

It will create a new Azure Resource Group and all of the services you need in that resource group
and emit a new .bot file with all of the service data and secrets stored.

```shell
msbot clone services --folder folderName --name NewBot --luisAuthoringKey 000000000000000000 --location westus 
```

### Pre-requisites
The **msbot clone services** command depends on and requires the following tools to be installed - 
1. [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) version >= 2.0.52.
2. [Azure Bot Service extension](https://github.com/Microsoft/botbuilder-tools/tree/master/AzureCli#installation) version >= 0.4.2
3. [LUIS CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/LUIS#installation) if the the clone operation includes LUIS or Dispatch resources.
4. [QnA Maker CLI](https://github.com/Microsoft/botbuilder-tools/tree/master/packages/QnAMaker#as-a-cli) if the clone operation includes QnA Maker resources.

> **NOTE:** msbot clone services does NOT encrypt the .bot file with a secret.  If you want to secure your 
> secrets you should do that via the **msbot secret** command after it has been created.


| Option                                      | Description                                                                                                          |
|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| -n, --name <name>                           | name of new bot                                                                                                      |
| -f, --folder <folder>                       | path to folder containing exported resources                                                                         |
| -l, --location <location>                   | location to create the bot service in (westus, ...)                                                                  |
| --luisAuthoringKey <luisAuthoringKey>       | authoring key from the appropriate luisAuthoringRegion for luis resources                                            |
| --luisAuthoringRegion <luisAuthoringRegion> | (OPTIONAL) [westus,westeurope,australiaeast] authoring region to put LUIS models into (default is based on location) |
| --luisPublishRegion <luisRegion>            | (OPTIONAL) region to publish LUIS models to (default fallback is based location luisAuthoringRegion)                 |
| --subscriptionId <subscriptionId>           | (OPTIONAL) Azure subscriptionId to clone bot to, if not passed then current az account will be used                  |
| --insightsRegion <insightsRegion>           | (OPTIONAL) region to create appInsights account in (default is based on location)                                    |
| --groupName <groupName>                     | (OPTIONAL) groupName for cloned bot, if not passed then new bot name will be used for the new group                  |
| --sdkLanguage <sdkLanguage>                 | (OPTIONAL) language for bot [Csharp,Node] (Default:CSharp)                                                           |
| --sdkVersion <sdkVersion>                   | (OPTIONAL) SDK version for bot [v3,v4] (Default:v4)                                                                  |
| --prefix                                    | Append [msbot] prefix to all messages                                  |
| --appId                                     | (OPTIONAL) Application ID for an existing application, if not passed                   |
|                                             | then a new Application will be created                                                 |
| --appSecret                                 | (OPTIONAL) Application Secret for an existing application, if not                      |
|                                             | passed then a new Application will be created                         |
| --proj-file                                 | (OPTIONAL) auto publish the local project file to created bot service |
| --code-dir <path>                           | (OPTIONAL) auto publish the folder path to created bot service        |
| -q, --quiet                                 | disable output                                                         |
| --verbose                                   | Show commands
| --force                                     | Do not prompt for confirmation
| -h, --help                                  | output usage information                                              |


> **NOTE:** If you are explicitly passing in appSecret as an argument you need to escape any special characters in the password that might be interpreted by the shell to be a command. 
- For *Windows command prompt*, enclose the appSecret in double quotes. e.g. 
msbot clone services --name xxxx --luisAuthoringKey xxxx --location xxxx --folder bot.recipt ***--appSecret "!|%gr%"***
- For *Windows PowerShell, try passing in appSecret after the --% argument. e.g. 
msbot clone services --name xxxx --luisAuthoringKey xxxx --location xxxx --folder bot.recipt ***--% --appSecret "!|%gr%"***
- For *MacOS or Linux*, enclose the appSecret in single quotes. e.g. 
msbot clone services --name xxxx --luisAuthoringKey xxxx --location xxxx --folder bot.recipt ***--appSecret '!|%gr%'***
