# MSBot and LUIS CLI
Several of the [BotBuilder tools](../../../README.md) are designed to work together. This topic shows how MSBot CLI can work in conjunction with the [LUIS CLI](../../LUIS).

### Create and add a new LUIS application to .bot file
```bash
luis add application --in <application_description.json> --msbot | msbot connect luis --stdin [--secret <YOUR-SECRET>]
```

### Create a new LUIS application by importing a model file and adding it to .bot file
```bash
luis import application --in <application.json> --msbot | msbot connect luis --stdin [--secret <YOUR-SECRET>]
```

**Note:** There are two ways to create a LUIS application - luis add application followed by luis import version .OR. luis import application. luis import application combines add application and import version into one command.  

### Get LUIS configuration from bot file to drive LUIS CLI
```bash
msbot get <LUIS-SERVICE-NAME-OR-ID> [--secret <YOUR-SECRET>] | luis <COMMAND> --stdin
```

### Create a new LUIS application version based on LUIS configuration in .bot file
```bash
msbot get <LUIS-SERVICE-NAME-OR-ID> [--secret <YOUR-SECRET>] | luis import version --in <new_application.json> --stdin
```

### Train and publish LUIS application version using LUIS configuration in .bot file
```bash
> msbot get <LUIS-SERVICE-NAME-OR-ID> [--secret <YOUR-SECRET>] | luis train version [--wait] --stdin

> msbot get <LUIS-SERVICE-NAME-OR-ID> [--secret <YOUR-SECRET>] | luis publish version --stdin
```

### Create a new LUIS application version and update .bot file
You can chain multiple commands to pull the current LUIS configuration from .bot file, create a new LUIS application version 0.2 using the existing LUIS keys from .bot file and updating the .bot file with the new 0.2 version information.

```bash
msbot get <LUIS-SERVICE-NAME-OR-ID> [--secret <YOUR-SECRET>] | luis import version --in <new_application.json> --versionId 0.2 --stdin --msbot | msbot update luis --stdin
```
