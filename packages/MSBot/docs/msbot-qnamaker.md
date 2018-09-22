# MSBot and QnAMaker CLI
Several of the [BotBuilder tools](../../../README.md) are designed to work together. This topic shows how MSBot CLI can work in conjunction with the [QnAMaker CLI](../../QnAMaker).

### Create and add a new QnA Maker KB to .bot file
```bash
qnamaker create kb --in <KB.json> --msbot | msbot connect qna --stdin [--secret <YOUR-SECRET>]
```

### Get QnA Maker configuration from bot file to drive QnA Maker CLI
```bash
msbot get <QnA-SERVICE-NAME-OR-ID> [--secret <YOUR-SECRET>] | qnamaker <COMMAND> --stdin
```

### Replace QnA Maker KB contents
```bash
msbot get <QnA-SERVICE-NAME-OR-ID> [--secret <YOUR-SECRET>] | qnamaker replace kb --in <new_KB.json> --stdin
```

### Train and publish QnA Maker KB
```
msbot get <QnA-SERVICE-NAME-OR-ID> [--secret <YOUR-SECRET>] | qnamaker publish kb --stdin
```

