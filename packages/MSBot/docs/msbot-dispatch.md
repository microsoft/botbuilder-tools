# MSBot and Dispatch CLI
Several of the [BotBuilder tools](../../../README.md) are designed to work together. This topic shows how MSBot CLI can work in conjunction with the [Dispatch CLI](../../Dispatch).

### Create a new Dispatch model based on LUIS and QnA Maker configurations in .bot file
```bash
dispatch create -b <botfile> | msbot connect dispatch --stdin
```

