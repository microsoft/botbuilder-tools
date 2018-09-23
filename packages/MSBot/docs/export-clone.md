## Exporting Services

You can export all of the resources necessary for someone to recreate in their own
subscription by using the **msbot export services** command.  The result of the command is a folder with QnAMaker and LUIS models exported  
and a .bot.recipe file which are the instructions for **msbot clone services** to recreate.

```shell
msbot export services --folder folderName --bot your.bot 
```

| Option                | Description                                                           |
|-----------------------|-----------------------------------------------------------------------|
| ----                  | ----                                                                  |
| -b, --bot <path>      | path to bot file.  If omitted, local folder will look for a .bot file |
| --secret <secret>     | bot file secret password for encrypting service secrets               |
| -f, --folder <folder> | folder to put the bot recipe into                                     |
| -h, --help            | output usage information                                              |

## Cloning Services

The **msbot clone services** command will take a .bot.recipe file and folder which was created via
**msbot export services** and use it to recreate all of the services you need to run a project.  

It will create a new Azure Resource Group and all of the services you need in that resource group
and emit a new .bot file with all of the service data and secrets stored.

```shell
msbot clone services --folder folderName --name NewBot --luisAuthoringKey 000000000000000000 --location westus 
```

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
| -q, --quiet                                 | disable output                                                                                                       |
| -h, --help                                  | output usage information                                                                                             |
