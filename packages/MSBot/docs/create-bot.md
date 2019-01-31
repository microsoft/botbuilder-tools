## Creating a bot 

When you have a local bot that you would like to create an Azure Bot Service for you can use the
msbot create command.

```shell
msbot create [options]
```

It will create an Azure Bot Service and a new .bot file with secrets synchronized with the web service created.

Arguments:

| Option                            | Description                                                                                                     |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------|
| -n, --name <name>                 | name of new bot                                                                                                 |
| -l, --location <location>         | location to create the bot service in (westus, ...)                                                             |
| --subscriptionId <subscriptionId> | (OPTIONAL) Azure subscriptionId to create bot to, if not passed then current az account will be used            |
| --insightsRegion <insightsRegion> | (OPTIONAL) region to create appInsights account in (default is based on location)                               |
| --groupName <groupName>           | (OPTIONAL) groupName for created bot, if not passed then new bot name will be used for the new group            |
| --sdkLanguage <sdkLanguage>       | (OPTIONAL) language for bot [Csharp/Node] (Default:CSharp)                                                      |
| --sdkVersion <sdkVersion>         | (OPTIONAL) SDK version for bot [v3/v4] (Default:v4)                                                             |
| --prefix                          | Append [msbot] prefix to all messages                                                                           |
| --appId <appId>                   | (OPTIONAL) Application ID for an existing application, if not passed then a new Application will be created     |
| --appSecret <appSecret>           | (OPTIONAL) Application Secret for an existing application, if not passed then a new Application will be created |
| --proj-file <projfile>            | (OPTIONAL) auto publish the local project file to created bot service                                           |
| --code-dir <path>                 | (OPTIONAL) auto publish the folder path to created bot service                                                  |
| -q, --quiet                       | minimize output                                                                                                 |
| --verbose                         | show commands                                                                                                   |
| -f, --force                       | do not prompt for confirmation                                                                                  |
| -h, --help                        | output usage information                                                                                        |

Example:

```shell
msbot create --name TestBot --location westus
```
