# Using .bot file in your [Bot Builder SDK](microsoft/botbuilder) bot
Apart from the [Bot Builder CLI tools](../../../README.MD) and the [Bot Framework Emulator V4](microsoft/botframework-emulator) working well with the .bot file, you can also use the .bot file to get service configuration information in your bot's code. 

The BotFramework-Configuration library available for [C#](https://www.nuget.org/packages/Microsoft.Bot.Configuration) and [JS](https://www.npmjs.com/package/botframework-configuration) helps you load a bot file and supports several methods to query and get the appropriate service configuration information. 

You can refer to the [samples](microsoft/botbuilder-samples) to see how the .bot file can be used in your bot's code to retrieve connected service configurations from the .bot file. 

**NOTE:** The bot configuration library would need the encryption key if your bot file is encrypted. You can use the standard mechanisms available for the platform you are on to securely make the key available to your bot. e.g. using application settings for Azure Bot Service bots, using appsettings.json for C#, .env file for Node.js etc. 