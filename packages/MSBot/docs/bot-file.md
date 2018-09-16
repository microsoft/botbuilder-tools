# What is a .bot file?

Bots usually consume lots of diverse services, such as [LUIS.ai](https://luis.ai), or [QnaMaker.ai](https://qnamaker.ai). When you are developing a bot, there is no uniform place to store the the metadata about the services that are in use.  This prevents us from building tooling that looks at a bot as a whole.

To address this problem, we have created a **.bot file** to act as the place to unify all of these services together to enable tooling.  For example, the [new v4 Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases) uses a the .bot file to create a unified view over the connected services your bot consumes.  

Via the .bot file, you can register services like:

* **Localhost** local debugger endpoints
* [**Azure Bot Service**](https://azure.microsoft.com/en-us/services/bot-service/) Azure Bot Service registrations.
* [**LUIS.AI**](https://www.luis.ai/) Language Understanding (LUIS) allows your application to understand what a person wants in their own words. 
* [**QnA Maker**](https://qnamaker.ai/) Build, train and publish a simple question and answer bot based on FAQ URLs, structured documents or editorial content in minutes.
* [**Dispatcher**](https://github.com/Microsoft/botbuilder-tools/tree/master/Dispatch) models for dispatching across heterogeneous sources.

# What is a .bot file?

Bots usually consume lots of diverse services, such as [LUIS.ai](https://luis.ai), or [QnaMaker.ai](https://qnamaker.ai). When you are developing a bot, there is no uniform place to store the metadata about the services that are in use.  This prevents us from building tooling that looks at a bot as a whole.

To address this problem, we have created a **.bot file** to act as the place to unify all of these services together to enable tooling.  For example, the [new v4 Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases) uses a the .bot file to create a unified view over the connected services your bot consumes.  

Via the .bot file, you can register services like:

* **Localhost** local debugger endpoints
* [**Azure Bot Service**](https://azure.microsoft.com/en-us/services/bot-service/) Azure Bot Service registrations.
* [**LUIS.AI**](https://www.luis.ai/) Language Understanding (LUIS) allows your application to understand what a person wants in their own words. 
* [**QnA Maker**](https://qnamaker.ai/) Build, train and publish a simple question and answer bot based on FAQ URLs, structured documents or editorial content in minutes.
* [**Dispatcher**](../Dispatch) models for dispatching across heterogeneous sources.
* Blob or CosmosDB storage 
* AppInsights
* etc.
