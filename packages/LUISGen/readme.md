# LUISGen Command Line Tool
This is the source for LUISGen, a tool for  which is a tool for generating a strongly typed C# class or Typescript interface file to make consuming LUIS output easier.  
This enables build-time checking and intellisense.

## Building the tool
If you open the .sln file and build the LUISGen project, it will produce a LUISGen\NodeTool directory which has everything required publishing or using the LUISGen tool. 
You can find detatils on using the tool  in the [readme](LUISGen\NodeTool\readme.md).  Once you build the tool, you can test it by running the tests.

## Testing the tool output in C#
The project LUISGenTest tests a LUISGen C# generated class.  All tests should pass if you run them since it uses a mocked interface to LUIS. 
If you update LUISGen and want to test it, you should replace the Contoso_App.cs in LUISGenTest with your newly generated one with this debug command:
`"..\..\..\..\LUISGenTest\Contoso App.json" -cs Microsoft.Bot.Builder.Ai.LUIS.Tests.Contoso_App  -o ..\..\..\..\LUISGenTest`
If you want to run live tests against the LUIS service you need to make changes in Tests.cs:
1) Set _mock = false and supply a LUIS endpoint key in _endpointKey.
2) Run the tests.  This will go against the LUIS service and if there are changes from the checked in oracle files they will be added to LUISGenTest\TestData as <test>.json.new.
3) If there are failures run LUISGenTest\TestData\review.cmd to look at the changes and approve them as new oracle file.

## Testing the tool output in Typescript
The project LUISGenTestJS tests a LUISGen Typescript generated inteface.  All test should pass if you run them since it uses a mocked interface to LUIS.
If you update LUISGen and want to test it, you should replace src\Contoso_App.ts in LUISGenTest with your newly generated one with this debug command:
`"..\..\..\..\LUISGenTest\Contoso App.json" -ts ..\..\..\..\LUISGenTestJS\src`
If you want to run live tests against the LUIS service you must make changes in src\tests.ts:
1) Set mockLuis = true and endpointKey to a LUIS endpoint key. 
2) Run the tests.  This will go against the LUIS service and if there are changes from the checked in oracle files they will be added to LUISGenTestJS\src\TestData as <test>.json.new.
3) If there are failures run LUISGenTestJS\src\TestData\review.cmd to look at the changes and approve them as new oracle file.
