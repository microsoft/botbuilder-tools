## Exporting Services

You can export all of the resources necessary for someone to recreate in their own
subscription by using the **msbot export services** command.  This is useful for you to
be able to check-in resources without the keys. 

The result of the command is a folder with all of the QnAMaker, and LUIS models exported 
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


| Option                    | Description                                                          |
|---------------------------|----------------------------------------------------------------------|
| -f, --folder <folder>     | folder to put the bot recipe into                                    |
| -n, --name <name>         | name of the bot to register in Azure Bot Service and the .bot file   |
| --luisAuthoringKey <key>  | LUIS.ai authoring key for creating LUIS subscription                 |
| -l, --location <location> | The azure region location to create the Azure Group and resources in |
| -h, --help                | output usage information                                             |
