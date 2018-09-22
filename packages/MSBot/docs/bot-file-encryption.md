# Bot Secrets

It is useful for tools like the emulator to have secure access to keys it needs to work with the services that are connected to the bot.  The MSBot tool supports encrypting keys in your .bot file. When you request the .bot file be encrypted, a secret is generated using AES256 and provided to you. 

MSBot commands like add \<service\> and others that accepts the `--secret` option has data which needs to be encrypted with the secret. 
This allows you to check in a .bot file into a public repo safely and only need the secret to unlock all of the keys your bot uses.

**WARNING::**
- There are no retrieval mechanisms in place for retrieving a lost secret key. You should use best practices (e.g. secure your keys in [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/)) to secure your secret.  **It is strongly encouraged that you DO NOT check it into your source control and instead rely on technologies such as [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/) to securely store it.**
- You should make sure that you use the same secret when adding all services.

## Encryption life-cycle
You can use the MSBot secret command to manage the encryption life-cycle. 

```bash
>msbot secret -h
Usage: msbot secret [options]

Options:

  -b, --bot <path>   path to bot file.  If omitted, local folder will look for a .bot file
  --secret <secret>  secret used to confirm you can do secret operations
  -c, --clear        clear the secret and store keys unencrypted
  -n, --new          generate a new secret and store keys encrypted
  -h, --help         output usage information
```

## Encrypt a .bot file
To encrypt an decrypted bot file, use

```shell
msbot secret --new
```

**NOTE::** This command will generate a new encryption key and output it to the console window. Please store this key securely.

Example:
```bash
Your bot is encrypted with secret:
hWZp+rv5E+k4dqimok20Vh84M2tpvUcDfbOvZA27Cbk=

Please save this secret in a secure place to keep your keys safe.
```

This will encrypt all sensitive data and give you a new key which you can use with --secret switch to access the data again.

## Getting a new secret (rolling)

You can get a new secret for your file by using the msbot secret command with the --new switch.

```shell
msbot secret -b my.bot --secret OLDSECRET --new
```
This will encrypt all sensitive data and give you a new secret key which you can use with --secret switch.

## Clearing the secret

You can stop using encryption by passing in the secret with a --clear flag.

```shell
msbot secret -b my.bot --secret OLDSECRET --clear
```
This will leave your file decrypted and the old secret will not be used anymore.

