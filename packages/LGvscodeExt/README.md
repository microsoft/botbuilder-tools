# lg-language README

lg language extension, provide:
- Syntax Highlight
- if/switch/template Snippet
- buildin functions Code Completion Proposals
- init webview show of lgfile
- diagnostic show

# how to use for customer
- `npm install` to install packages
- `npm run compile`
- use `vsce package` to export vsix file
- open vscode, and extension tab
- select 'install from VSIX...'
- select vsix file, and reopen vscode
- edit a lg file, try some features.
- input `LG live test` in `F1` space, try lgfile webview test (just framework now)

# features show
Highlight
![highlight](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/Highlight.png?raw=true)

Snippet
![Snippet](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/Snippets.gif?raw=true)

Code Completion
![CodeCompletion](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/CodeCompletion.gif?raw=true)

Show Definitions
![ShowDefinitions](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/ShowDefinitions.gif?raw=true)

Diagnostic
![Diagnostic](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/Diagnostic.gif?raw=true)

Live Test Tool
![TestTool](https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt/images/TestTool.gif?raw=true)