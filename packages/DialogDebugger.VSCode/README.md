> *This is a preview release and will work with new V4.5-preview SDK dialogs only*

# Microsoft Bot Framework Dialog Debugger Extension
This extension adds a dialog debugger for debugging Bot Framework dialogs.
* You can set breakpoints in .cs and .dialog files
* You can step through execution
* inspect user, conversation, dialog state
* inspect dialog call stack

![screenshot](https://raw.githubusercontent.com/Microsoft/botbuilder-tools/master/packages/DialogDebugger.VSCode/screenshot.gif)

## Background
Bots are stateless web services made up of a graph of objects which a given conversation is executed over.
This architecture provides a highly scalable stateless execution environment but makes it hard to debug 
because the bots conversation is stepping through the instance object graph of dialogs as opposed to raw code.
Declarative .dialog files compound this, as the definition of your code moves to a declarative .json file.

The Bot Framework Debugger works by allowing you to set breakpoints on the execution flow going through the
instances of objects (either in source or .dialog files) and inspect the execution of your logic as it flows
through dialogs which make up your application.

## Setting up Visual Studio Code to use the debugger

To configure Visual Studio Code you need to add a target in your launch.settings file.

You can do that by the **add a configuration** in the debug panel.  

There should be 2 configuration templates available:

* **Bot: Launch .NET Core Configuration** - Configuration for building and launching your bot via **dotnet run** and connecting to it
* **Bot: Attach Configuration** - Configuration for attaching to the debug port of an already running bot (such as IIS express)

## Using

* Open any source file (*.cs or *.dialog) and set breakpoints.
* Hit F5 to start debugger.

As you interact with the bot your breakpoint should hit and you should be able to inspect memory, call context, etc.

## Troubleshooting
There are 2 places your bot can be running depending on the tools you are using.

* **Visual Studio** - Visual studio runs using IIS Express.  IIS Express keeps running even after visual studio shuts down
* **Visual Studio Code** - VS code uses **dotnet run** to run your bot.

If you are switching between environments make sure you are talking to the right instance of your bot.

