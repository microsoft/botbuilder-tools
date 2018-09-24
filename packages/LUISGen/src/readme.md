# LUISGen Command Line Tool Source
This is the source for LUISGen, a tool for  which is a tool for generating a strongly typed C# class or Typescript interface file to make consuming LUIS output easier.  
This enables build-time checking and intellisense.

## Requirements
You need to have the [.Net Core SDK](https://www.microsoft.com/net/download) installed.

If you want to run the typescript tests you need to make sure [nodejs](https://nodejs.org/en/download/) is installed.

## Building the LUISGen tool
Build the [LUISGen project](LUISGen.csproj) to build the tool.  If you make changes be sure to update the project package description as well as the npm [readme.md](npm\readme.md).

## Testing the tool output in C#
The [LUISGenTest project](..\tests\LUISGenTest.csproj) tests a LUISGen C# generated class.  All tests should pass if you run them since it uses a mocked interface to LUIS. 

If you update LUISGen and want to test it, you should replace [Contoso_App.cs](..\tests\LUISGenTest\Contoso_App.cs) with your newly generated one with this debug command:

`"..\..\..\..\tests\LUISGenTest\Contoso app.json" -cs Microsoft.Bot.Builder.Ai.LUIS.Tests.Contoso_App -o ..\..\..\..\tests\LUISGenTest\`

If you want to run live tests against the LUIS service you need to make changes in [Tests.cs](..\tests\LUISGenTest\Tests.cs):
1) Set _mock = false and supply a LUIS endpoint key in _endpointKey.
2) Run the tests.  This will go against the LUIS service and if there are changes from the checked in oracle files they will be added to LUISGenTest\TestData as <test>.json.new.
3) If there are failures run [review.cmd](..\tests\LUISGenTest\TestData\review.cmd) to look at the changes and approve them as new oracle file.
4) When all oracles are correct, make sure _mock = true and remove your _endpointKey.

## Testing the tool output in Typescript
The project LUISGenTestJS tests a LUISGen Typescript generated inteface.  In order to build the test you should first execute npm install in the project directory.
If you build and run the tests, they should all pass since it uses a mocked interface to LUIS.

If you update LUISGen and want to test it, you should replace [Contoso_App.ts)[tests\LUISGenTestJS\src\Contoso_App.ts) in LUISGenTest with your newly generated one with this debug command:

`"..\..\..\..\LUISGenTest\Contoso App.json" -ts ..\..\..\..\LUISGenTestJS\src`

If you want to run live tests against the LUIS service you must make changes in src\tests.ts:
1) Set mockLuis = false and endpointKey to a LUIS endpoint key. 
2) Run the tests.  This will go against the LUIS service and if there are changes from the checked in oracle files they will be added to LUISGenTestJS\src\TestData as `<test>.json.new`.
3) If there are failures run LUISGenTestJS\src\TestData\review.cmd to look at the changes and approve them as new oracle file.
4) When all oracles are correct, make sure mockLuis = true and reset endpointKey.
