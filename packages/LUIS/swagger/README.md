# BotFramework Connector

> see https://aka.ms/autorest

Configuration for generating BotFramework Connector SDK.

``` yaml
add-credentials: true
openapi-type: data-plane
```
The current release for the BotFramework Connector is v3.0.

# Releases

## Connector API 3.0

``` yaml
input-file: LUIS-Authoring.json
```

### luis-apis 3.0 - TypeScript Settings
These settings apply only when `--typescript` is specified on the command line.
``` yaml $(typescript)

typescript:
  override-client-name: LuisAuthoring
  package-name: luis-apis
  package-version: 4.0.0
  azure-arm: false
  clear-output-folder: true
  output-folder: generated
  generate-metadata: true
```