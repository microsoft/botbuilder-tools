## Listing connected services

To access the list of connected services:

```shell
msbot list [options]
```

Options:

| Option            | Description                                                           |
|-------------------|-----------------------------------------------------------------------|
| -b, --bot <path>  | path to bot file.  If omitted, local folder will look for a .bot file |
| --secret <secret> | bot file secret password for encrypting service secrets               |
| -h, --help        | output usage information                                              |

If you omit the secret, you will get the configured services with the secrets encrypted.  If you pass the secret password, you will see the secrets decrypted.


## get a connected services

To access a single  connected services:

```shell
msbot get <serviceNameOrId> [options]
```

Options:

| Option            | Description                                                           |
|-------------------|-----------------------------------------------------------------------|
| -b, --bot <path>  | path to bot file.  If omitted, local folder will look for a .bot file |
| --secret <secret> | bot file secret password for encrypting service secrets               |
| -h, --help        | output usage information                                              |

If you omit the secret, you will get the configured services with the secrets encrypted.  If you pass the secret password, you will see the secrets decrypted.
