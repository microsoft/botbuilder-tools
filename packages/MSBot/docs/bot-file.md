# Bot File

Bots usually consume lots of different services, such as [LUIS.ai](https://luis.ai), or [QnaMaker.ai](https://qnamaker.ai). When you are developing a bot, there is no uniform place to store the the metadata about the services that are in use.  This prevents us from building tooling that looks at a bot as a whole.

To address this problem, we have created a **.bot file** to act as the place to bring all service references together in one place to enable tooling.  For example, the [Bot Framework Emulator V4](https://github.com/Microsoft/BotFramework-Emulator/releases) uses a the .bot file to create a unified view over the connected services your bot consumes.  

Via the .bot file, you can register services like:

* **Localhost** local debugger endpoints
* [**Azure Bot Service**](https://azure.microsoft.com/en-us/services/bot-service/) Azure Bot Service registrations.
* [**LUIS.AI**](https://www.luis.ai/) LUIS gives your bot the ability to communicate with people using natural language.. 
* [**QnA Maker**](https://qnamaker.ai/) Build, train and publish a simple question and answer bot based on FAQ URLs, structured documents or editorial content in minutes.
* [**Dispatch**](https://github.com/Microsoft/botbuilder-tools/tree/master/Dispatch) models for dispatching across multiple services.
* [**Azure Application Insights**](https://azure.microsoft.com/en-us/services/application-insights/) for insights and bot analytics.
* [**Azure Blob Storage**](https://azure.microsoft.com/en-us/services/storage/blobs/) for bot state persistence. 
* [**Azure Cosmos DB**](https://azure.microsoft.com/en-us/services/cosmos-db/) - globally distributed, multi-model database service to persist bot state.

Apart from these, your bot might rely on other custom services. You can leverage the [generic service](./add-services.md) capability to connect a generic service configuration.

## When is a .bot file created? 
- If you create a bot using [Azure Bot Service](https://ms.portal.azure.com/#blade/Microsoft_Azure_Marketplace/GalleryResultsListBlade/selectedSubMenuItemId/%7B%22menuItemId%22%3A%22gallery%2FCognitiveServices_MP%2FBotService%22%2C%22resourceGroupId%22%3A%22%22%2C%22resourceGroupLocation%22%3A%22%22%2C%22dontDiscardJourney%22%3Afalse%2C%22launchingContext%22%3A%7B%22source%22%3A%5B%22GalleryFeaturedMenuItemPart%22%5D%2C%22menuItemId%22%3A%22CognitiveServices_MP%22%2C%22subMenuItemId%22%3A%22BotService%22%7D%7D), a .bot file is automatically created for you with list of connected services provisioned. The .bot is encrypted by default. See [here](./bot-file-encryption.md) to learn more about encrypting and decrypting the .bot file.
- If you create a bot using [Bot Builder V4 SDK Template for Visual Studio](https://marketplace.visualstudio.com/items?itemName=BotBuilder.botbuilderv4) or using [Yeoman BotBuilder Generator](https://www.npmjs.com/package/generator-botbuilder), a .bot file is automatically. No connected services are provisioned in this flow and the bot file is not encrypted.
- If you are starting with [BotBuilder-samples](microsoft/botbuilder-samples), every sample for Bot Builder V4 SDK includes a .bot file and the .bot file is not encrypted. 

## What does a bot file look like? 
[Here's](./sample-bot-file.json) an example .bot file.

## Why .bot file?

- Do I need to use the .bot file to build a bot? 
- Why do I need the bot file? 

.bot file is **not** a requirement to build bots with [Bot Builder SDK](microsoft/botbuilder).

Also, you can continue to use appsettings/ web.config/ env, keyvault or any mechanism they you see fit to keep track of service references and keys that your bot depend on. 

The advantages of using .bot file are:
- [Bot Builder V4 SDK](microsoft/botbuilder) will be available in 4 platforms x languages – C#, JS, Python, Java. Each platform have their recommended way of keeping track of keys + env settings (appsettings.json, web.config, .env ...).  
- Elegant tooling solutions around services creation and management is harder without a well defined schema (.bot file).  
- Bot Framework Emulator, CLI tools rely on and work great with tracking connected services in a consistent format (in a .bot file) 

