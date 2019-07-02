# lg-language README

Language Generation vscode extension. 

Get more detail -> [Language Generation](https://github.com/microsoft/BotBuilder-Samples/tree/master/experimental/language-generation)

# how to use for customer
- `npm install` to install packages
- `npm run compile`
- if `vsce` is not installed globally, please use `npm install -g vsce` to install it.
- use `vsce package` to export vsix file
- open vscode, and extension tab
- select 'install from VSIX...'
- select vsix file, and reopen vscode
- edit a lg file, try some features.
- input `LG live test` in `F1` space, try lgfile webview test

# how to use for developer
- `npm install` to install packages
- press `F5` to debug
- open lg file to debug
- reference doc: [vscode extension](https://code.visualstudio.com/api/language-extensions/overview)

# features show
#### Highlight
- keyword
- template name and parameters
- template reference
- expression
- multiline text
- comments

![highlight](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/Highlight.png?raw=true)

#### Snippet
- import
- switch
- if
- template

![Snippet](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/Snippets.gif?raw=true)

#### Hover
- template
- buildin function

![highlight](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/Hover.gif?raw=true)

#### Code Completion (Suggestion)
- building function name
- template reference
- imports

![CodeCompletion](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/CodeCompletion.gif?raw=true)

#### Show Definitions
- template definition
![ShowDefinitions](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/ShowDefinitions.gif?raw=true)

#### Diagnostic
- Error
- Warning

![Diagnostic](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/Diagnostic.gif?raw=true)

#### Live Test Tool
- template evaluation
- inline evaluation
- multi files/ addFiles api (not support.)

![TestTool](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/TestTool.gif?raw=true)

#### Signatures
- buildin function


# TODO
- R2 buildin function