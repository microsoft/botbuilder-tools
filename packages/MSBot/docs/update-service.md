## Updating Service
To update a service with new information you can use msbot update commands. Example updates including changing the LUIS application version information in the .bot file or keys etc. 

```shell
msbot update [serviceType] --[requiredArg] [value]
```

This allows you to rename a service, update keys, etc.

| ServiceType | Description                          | Required argument |
|-------------|--------------------------------------|-------------------|
| appinsights | update Azure AppInsights             | --serviceName     |
| blob        | update Azure Blob storage            | --serviceName     |
| cosmosdb    | update Azure CosmosDB                | --serviceName     |
| dispatch    | update Dispatch model                | --applicationId   |
| endpoint    | update endpoint                      | --endpoint        |
| generic     | update generic service configuration | --url             |
| luis        | update LUIS application              | --applicationId   |
| qna         | update QNA service                   | --kbId            |

These commands take the same args as the msbot connect <servicetype> commands, but only some properties can be updated.
For example, you can change the name of a Azure service, but you can't change the serviceName, tenantId or subscriptionId
as those values are immutable.

Here is an example with cosmosdb, where the unique required argument is serviceName and we are changing the property collection to "newCollection":
```shell
msbot update cosmosdb --serviceName myCosmosDb --collection newCollection
```

Update commands also support --stdin switch allow you to chain tools together.  In this case we
are importing a new version of a LUIS application and outputting the service record using **--msbot** flag
and piping it into the **msbot update luis --stdin** which will find the service record by appId and update
it with the new values piped in.

```shell
luis import version --in app.json --versionId 2.1 --msbot | msbot update luis --stdin
```

