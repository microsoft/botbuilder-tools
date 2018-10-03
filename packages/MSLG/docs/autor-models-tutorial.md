# Author models using MSLG authoring tool from scratch :

In this tutorial, you will learn the following :
  - Run mslg authoring tool using the code base directly
  - Create LG model
  - Deploy LG model (a.k.a deploy model to endpoint)
  
Prerequisites :
  - Windows machine with NodeJS >= 8.0 or higher

## Installation

- Clone the repository
    ```bash
    git https://github.com/Microsoft/botbuilder-tools.git
    ```
- In a terminal, switch to MSLG branch, 
    ```bash
    git checkout mslg
    cd [YOUR_MSLG_CHECKEDOUT_REPO]\packages\MSLG
    ```
- Install dependencies using this command  
    ```bash
    npm install
    cd bin 
    ```
- Run the tool : 
     ```bash
    node mslg
    ```
    You should see the help of the tool in this step, which indicates that the previous steps were successful

## Configure, create and deploy models :

### Configure tool defaults
- Type 
    ```bash
    node mslg init
    ```
- Enter [YOUR_SUBSCRIPTION_KEY]
- Enter region
- When asked about endpointkey just leave it blank and hit enter to stay with the default
- Type any GUID id for lg app, or leave blank to be auto-generated for this tutorial
- Type any name for lg app
- Type locale or use the default "en-US"
- Type domain for your lg app (for this tutorial you might use your app name as the domain)
- Type app version (for this tutorial use defaul, ie : just hit enter)
- The tool will confirm that your configuration file woule look like this : 
    ```sh
        {
          "authoringKey": "[YOUR_SUBSCRIPTION_KEY]",
          "endpointKey": "",
          "endpointBasePath": "https://develop.cris.ai",
          "lgAppId": "[YOUR_ENTERED_APP_ID]",
          "lgAppName": "[YOUR_ENTERED_APP_NAME]",
          "lgAppDomain": "[YOUR_ENTERED_APP_DOMAIN]",
          "lgAppLocale": "[YOUR_LOCALE]",
          "lgAppVersion": "default"
        }
    ```
- if you could see the above configuration, then you successfullly created your default config file, just type "Yes" or hit enter to confirm.

### Create model
- Type 
    ```bash
    node mslg create model --lg  [YOUR_MODEL_FILE_PATH]
    ```
If the model created successfully the tool should print "Operation Succeeded" to cmd.
- Type 
     ```bash
    node mslg get models
    ```
- Make sure to find your model among the retrieved models attached to your subscription
- Copy your model id to use it in your next step

### Create endpoint for the model
- type
    ```bash
    node mslg create endpoint --lgAppId [THE_APP_ID_YOU_GOT_FROM_LAST_STEP]
    ```
If the endpoint created successfully the tool should print "Operation Succeeded" to cmd.

After the previous step you can start using your model to generate responses in your bot using botframework language generation library here : 
[Dotnet](https://github.com/Microsoft/botbuilder-dotnet/tree/MSLG) 
[NodeJS](https://github.com/Microsoft/botbuilder-js/tree/MSLG) 
