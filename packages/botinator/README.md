botinator
=========

Build bots and crush the world!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/botinator.svg)](https://npmjs.org/package/botinator)
[![Downloads/week](https://img.shields.io/npm/dw/botinator.svg)](https://npmjs.org/package/botinator)
[![License](https://img.shields.io/npm/l/botinator.svg)](https://github.com/Stevenic/botinator/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g botinator
$ botinator COMMAND
running command...
$ botinator (-v|--version|version)
botinator/0.0.0 win32-x64 node-v10.15.1
$ botinator --help [COMMAND]
USAGE
  $ botinator COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`botinator hello [FILE]`](#botinator-hello-file)
* [`botinator help [COMMAND]`](#botinator-help-command)

## `botinator hello [FILE]`

describe the command here

```
USAGE
  $ botinator hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ botinator hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/Stevenic/botinator/blob/v0.0.0/src\commands\hello.ts)_

## `botinator help [COMMAND]`

display help for botinator

```
USAGE
  $ botinator help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src\commands\help.ts)_
<!-- commandsstop -->
