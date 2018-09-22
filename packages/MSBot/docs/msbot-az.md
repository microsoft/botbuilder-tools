# MSBot and Azure CLI
Several of the [BotBuilder tools](../../../README.md) are designed to work together. This topic shows how MSBot CLI can work in conjunction with the [Azure CLI](../../../AzureCli).

### Create a new Azure Bot Service bot and update the .bot file
```bash
az bot create [options] --msbot | msbot connect bot --stdin
```

### Get existing Azure Bot Service bot information and update the .bot file
```bash
az bot show [options] --msbot | msbot connect bot --stdin
```


