## Creating a bot file

To create a bot file, run:

```shell
msbot init [options]
```

It will ask you for the name of the bot and the local endpoint for it and will create the *name.bot* file.

Arguments:

| Option                       | Description                                           |
|------------------------------|-------------------------------------------------------|
| -n, --name <name>            | name of the bot                                       |
| -a, --appId <appid>          | Microsoft appId used for auth with the endpoint       |
| -p, --appPassword <password> | Microsoft appPassword used for auth with the endpoint |
| -e, --endpoint <endpoint>    | local endpoint for the bot                            |
| --secret                     | generate a secret and encrypt service keys with it    |
| -q, --quiet                  | do not prompt                                         |
| -h, --help                   | output usage information                              |

Example:

```shell
msbot init --name TestBot --endpoint http://localhost:9499/api/messages
```
