# Bot Secrets

It is useful for tools like the emulator to have secure access to keys it needs to work with the services that are connected to the bot.  The MSBot tool supports this by allowing you to specify a **secret** which is a password that is used to encrypt/decrypt secure keys in the .bot file.

Any command which accepts the `--secret` option has data which needs to be encrypted with the secret. 
This allows you to check in a .bot file into a public repo safely and only need the secret to unlock all of the keys your bot uses.

> NOTE: You should make sure that you use the same secret when adding all of the services.


# Bot Secrets

It is useful for tools like the emulator to have secure access to keys it needs to work with 
the services that are connected to the bot.  The MSBot tool supports this by allowing you to 
specify a **secret** which is a password that is used to encrypt/decrypt secure keys in the .bot file.

Any command which accepts the `--secret` option has data which needs to be encrypted with the
secret. This allows you to check in a .bot file into a public repo safely and only need the 
secret to unlock all of the keys your bot uses.

> NOTE: You cannot retrieve a secret, and it is being used to secure all of your sensitive information.  
> You should use best practices to secure your secret.  *It is strongly encouraged that you DO NOT check 
> it into your source repo or code directly and instead rely on technologies such as Azure Key Vault to securely store it. **

## Encrypting a bot file with a new secret
You can switch to encrypting your file by using the msbot secret command with the --new switch.

```shell
msbot secret -b my.bot --new
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
This will leave your file unencrypted and the old secret will not be used anymore.

