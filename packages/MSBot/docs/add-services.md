## Connecting Your Bot to a Service

To connect your bot to a service you run 

```shell
msbot connect [command]
```

Where the command is one of the services

| Command                                                 | Description                              |
|---------------------------------------------------------|------------------------------------------|
| [appinsights](#connecting-to-azure-appinsights-service) | connect to Azure AppInsights             |
| [blob](#connecting-to-azure-blob-service)               | connect to Azure Blob storage            |
| [bot](#connecting-to-azure-bot-service)                 | connect to Azure Bot Service             |
| [cosmosdb](#connecting-to-azure-cosmosdb-service)       | connect to Azure CosmosDB                |
| [dispatch](#connecting-to-bot-dispatch)                 | connect to a Dispatch model              |
| [endpoint](#connecting-to-a-endpoint-service)           | connect to endpoint                      |
| [file](#connecting-to-file)                             | connect to file to the bot               |
| [generic](#connecting-to-generic-service)               | connect to generic service configuration |
| [luis](#connecting-to-luis-application)                 | connect to a LUIS application            |
| [qna](#connecting-to-qna-maker-knowledge-base)          | connect to QNA a service                 |
| help [cmd]                                              | display help for [cmd]                   |

### Connecting to Azure AppInsights Service 

To connect your bot to azure app insights:

```shell
msbot connect appinsights [options]
```

With the following options

| Option                                        | Description                                               |
|-----------------------------------------------|-----------------------------------------------------------|
| -n, --name <name>                             | friendly name (defaults to serviceName)                   |
| -t, --tenantId <tenantId>                     | Azure Tenant id (either GUID or xxx.onmicrosoft.com)      |
| -s, --subscriptionId <subscriptionId>         | Azure Subscription Id                                     |
| -r, --resourceGroup <resourceGroup>           | Azure resource group name                                 |
| -s, --serviceName <serviceName>               | Azure service name                                        |
| -i, --instrumentationKey <instrumentationKey> | App Insights InstrumentationKey                           |
| -a, --applicationId <applicationId>           | (OPTIONAL) App Insights Application Id                    |
| --keys <keys>                                 | Json app keys, example: {'key1':'value1','key2':'value2'} |
| -b, --bot <path>                              | path to bot file.                                         |
| --input <jsonfile>                            | path to arguments in JSON format { id:'',name:'', ... }   |
| --secret <secret>                             | bot file secret password for encrypting service secrets   |
| --stdin                                       | arguments are passed in as JSON object via stdin          |
| -h, --help                                    | output usage information                                  |

### Connecting to Azure Blob Service 

To connect your bot to azure blob storage service:

```shell
msbot connect blob [options]
```

With the following options

| Option                                | Description                                             |
|---------------------------------------|---------------------------------------------------------|
| -n, --name <name>                     | friendly name (defaults to serviceName)                 |
| -t, --tenantId <tenantId>             | Azure Tenant id (either GUID or xxx.onmicrosoft.com)    |
| -s, --subscriptionId <subscriptionId> | Azure Subscription Id                                   |
| -r, --resourceGroup <resourceGroup>   | Azure resource group name                               |
| --serviceName <serviceName>           | Azure service name                                      |
| --connectionString <connectionString> | Blob storage connection string                          |
| -c, --container <container>           | blob container name                                     |
| -b, --bot <path>                      | path to bot file.                                       |
| --input <jsonfile>                    | path to arguments in JSON format { id:'',name:'', ... } |
| --secret <secret>                     | bot file secret password for encrypting service secrets |
| --stdin                               | arguments are passed in as JSON object via stdin        |
| -h, --help                            | output usage information                                |

### Connecting to Azure Bot Service  

To connect your bot to Azure Bot Service:

```shell
msbot connect bot [options]
```

Options:

| Option                                | Description                                                                 |
|---------------------------------------|-----------------------------------------------------------------------------|
| --serviceName <serviceName>           | Azure Bot Service bot id                                                    |
| -n, --name <name>                     | Friendly name for this service (defaults to serviceName)                    |
| -t, --tenantId <tenantId>             | id of the tenant for the Azure service (either GUID or xxx.onmicrosoft.com) |
| -s, --subscriptionId <subscriptionId> | GUID of the subscription for the Azure Service                              |
| -r, --resourceGroup <resourceGroup>   | name of the resourceGroup for the Azure Service                             |
| -e, --endpoint <endpoint>             | (OPTIONAL) Registered endpoint url for the Azure Bot Service                |
| -a, --appId<appid>                    | appId                                                                       |
| -p, --appPassword <appPassword>       | appPassword                                                                 |
| -b, --bot <path>                      | path to bot file.                                                           |
| --input <jsonfile>                    | path to arguments in JSON format { id:'',name:'', ... }                     |
| --secret <secret>                     | bot file secret password for encrypting service secrets                     |
| --stdin                               | arguments are passed in as JSON object via stdin                            |
| -h, --help                            | output usage information                                                    |

An example:
```shell
msbot connect bot --serviceName testbot --name "Test Bot" --appId <APP-ID> --appPassword 1abHDN3421342 --endpoint https://testbot.azurewebsites.net/api/messages --tenantId <TENANT-ID> --subscriptionId <SUBSCRIPTION-ID> --resourceGroup "Test"
```

### Connecting to Azure CosmosDB Service 

To connect your bot to azure CosmosDB storage service:

```shell
msbot connect cosmosdb [options]
```

With the following options

| Option                                | Description                                             |
|---------------------------------------|---------------------------------------------------------|
| -n, --name <name>                     | friendly name (defaults to serviceName)                 |
| -t, --tenantId <tenantId>             | Azure Tenant id (either GUID or xxx.onmicrosoft.com)    |
| -s, --subscriptionId <subscriptionId> | Azure Subscription Id                                   |
| -r, --resourceGroup <resourceGroup>   | Azure resource group name                               |
| --serviceName <serviceName>           | Azure service name                                      |
| --connectionString <connectionString> | CosmosDB connection string                              |
| -d, --database <database>             | CosmosDB database name                                  |
| -c, --collection <collection>         | CosmosDB collection name                                |
| -b, --bot <path>                      | path to bot file.                                       |
| --input <jsonfile>                    | path to arguments in JSON format { id:'',name:'', ... } |
| --secret <secret>                     | bot file secret password for encrypting service secrets |
| --stdin                               | arguments are passed in as JSON object via stdin        |
| -h, --help                            | output usage information                                |

### Connecting to a Endpoint Service  

To connect your bot to localhost server:

```shell
msbot connect endpoint [options]
```

With the following options

| Option                       | Description                                                            |
|------------------------------|------------------------------------------------------------------------|
| --secret <secret>            | bot file secret password for encrypting service secrets                |
| -n, --name <name>            | (Optional) name of the Azure Bot Service                               |
| -a, --appId  <appid>         | (Optional) Microsoft AppId for the Azure Bot Service                   |
| -p, --appPassword <password> | (Optional) Microsoft app password for the Azure Bot Service            |
| -e, --endpoint <endpoint>    | endpoint for the bot using the MSA AppId                               |
| -b, --bot <path>             | path to bot file.  If omitted, local folder will look for a .bot file. |
| --input <jsonfile>           | path to arguments in JSON format                                       |
| --stdin                      | arguments are passed in as a JSON object via stdin                     |
| -h, --help                   | output usage information                                               |

An example:

```shell
msbot connect endpoint --name "Debug TestBot" --appId <APP-ID> --appPassword 1abHDN3421342 --endpoint http://localhost:9090/api/messages
```
### Connecting to LUIS Application

To connect your bot to a LUIS application:

```shell
msbot connect luis [options]
```

With the following options:

| Option                              | Description                                                           |
|-------------------------------------|-----------------------------------------------------------------------|
| -n, --name <name>                   | name of the LUIS application                                          |
| -a, --appId  <appid>                | application ID for the LUIS application                               |
| --version <version>                 | version for the LUIS App, (example: v0.1)                             |
| --authoringKey <authoringkey>       | authoring key for authoring LUIS models via the authoring API         |
| --subscriptionKey <subscriptionKey> |                                                                       |
| --input <jsonfile>                  | path to arguments in JSON format                                      |
| --stdin                             | arguments are passed in as a JSON object via stdin                    |
| -b, --bot <path>                    | path to bot file.  If omitted, local folder will look for a .bot file |
| --secret <secret>                   | bot file secret password for encrypting service secrets               |
| -h, --help                          | output usage information                                              |

Here is an example invocation:

```shell
msbot connect luis --name "My Luis Model" --appId <APP-ID> --version v0.1 --authoringKey <AUTHORING-KEY>
```

### Connecting to QnA Maker Knowledge base

To connect your bot to a QNA maker knowledge base:

```shell
msbot connect qna [options]
```

With the following options:

| Option                              | Description                                                           |
|-------------------------------------|-----------------------------------------------------------------------|
| -n, --name <name>                   | name of the QnA knowledge base                                        |
| -k, --kbId <kbId>                   | QnA knowledge base Id                                                 |
| --subscriptionKey <subscriptionKey> | sSubscription key for accessing the QnA service                       |
| --endpointKey <endpointKey>         | endpoint key for calling the QnA service                              |
| --hostname <url>                    |                                                                       |
| -b, --bot <path>                    | path to bot file.  If omitted, local folder will look for a .bot file |
| --input <jsonfile>                  | path to arguments in JSON format                                      |
| --stdin                             | arguments are passed in as a JSON object via stdin                    |
| --secret <secret>                   | bot file secret password for encrypting service secrets               |
| -h, --help                          | output usage information                                              |

Here is an example invocation:

```shell
msbot connect qna --secret EncryptItPlease --name "QnA Sauce" --kbId <KB-ID> --subscriptionKey <KEY> --endpointKey <ENDPOINT-KEY> --hostname "https://myqna.azurewebsites.net"
```

### Connecting to Bot Dispatch

To connect your bot to bot dispatch definition:

```shell
msbot connect dispatch [options]
```

Options:

| Option                              | Description                                                                        |
|-------------------------------------|------------------------------------------------------------------------------------|
| -n, --name <name>                   | name for the dispatch                                                              |
| -a, --appId <appid>                 | LUIS AppId for the dispatch app                                                    |
| --version <version>                 | version for the dispatch app (example: 0.1)                                        |
| --subscriptionKey <subscriptionKey> | (Optional) subscription key used for querying the dispatch model                   |
| --authoringKey <authoringkey>       | authoring key for using manipulating the dispatch model via the LUIS authoring API |
| -b, --bot <path>                    | path to bot file.  If omitted, local folder will look for a .bot file              |
| --secret <secret>                   | bot file secret password for encrypting service secrets                            |
| --stdin                             | arguments are passed in as JSON object via stdin                                   |
| --input <dispatchfile>              | arguments passed in as path to arguments in JSON format                            |

Here is an example invocation:
```shell
msbot connect dispatch --input my.dispatch
```

### Connecting to file

To connect your bot to a file: 

```bash
msbot connect file [options]
```

Options:

| Option                              | Description                                                                        |
|-------------------------------------|------------------------------------------------------------------------------------|
| -n, --name <name>                   | name of the file service                                                           |
| -f, --file <file>                   | path to file to connect to                                                         |
| -p, --path <path>                   | path to file to connect to                                                         |
| -b, --bot <bot>                     | path to bot file.  If omitted, local folder will look for a .bot file              |
| --secret <secret>                   | bot file secret password for encrypting service secrets                            |
| -h, --help                          | output usage information                                                           |


### Connecting to generic service

To connect your bot to a generic service with key value pairs: 

```bash
msbot connect generic [options]
```

Options:

| Option                              | Description                                                                        |
|-------------------------------------|------------------------------------------------------------------------------------|
| -n, --name <name>                   | name of the service                                                                |
| -u, --url <url>                     | deep link url for the service                                                      |
| --keys <keys>                       | serialized json key/value configuration for the service                            |
| -b, --bot <bot>                     | path to bot file.  If omitted, local folder will look for a .bot file              |
| --input <jsonfile>                  | path to arguments in JSON format { id:'',name:'', ... }                            |
| --stdin                             | arguments are passed in as JSON object via stdin                                   |
| --secret <secret>                   | bot file secret password for encrypting service secrets                            |
| -h, --help                          | output usage information                                                           |
