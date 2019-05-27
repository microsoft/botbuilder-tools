# lg-language README

lg language extension, provide:
- Syntax Highlight
- if/switch/template Snippet
- buildin functions Code Completion Proposals
- init webview show of lgfile
- diagnostic show

# how to use for customer
- `npm install` to install packages
- use `vsce package --baseImagesUrl https://github.com/microsoft/botbuilder-tools/blob/lg-vscode-extension/packages/LGvscodeExt` to export vsix file
- open vscode, and extension tab
- select 'install from VSIX...'
- select vsix file, and reopen vscode
- edit a lg file, try some features.
- input `LG live test` in `F1` space, try lgfile webview test (just framework now)

# features show
Highlight
![highlight](./images/Highlight.png)

Snippet
![Snippet](./images/Snippets.gif)

Code Completion
![CodeCompletion](./images/CodeCompletion.gif)

Show Definitions
![ShowDefinitions](./images/ShowDefinitions.gif)

Diagnostic
![Diagnostic](./images/Diagnostic.gif)

Live Test Tool
![TestTool](./images/TestTool.gif)