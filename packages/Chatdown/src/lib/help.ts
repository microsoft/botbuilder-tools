import chalk from 'chalk';
/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import * as Table from 'cli-table3';
import * as windowSize from 'window-size';
import WriteStream = NodeJS.WriteStream;

export function help(output?: WriteStream) {
  if (!output) {
    output = process.stderr;
  }
  output.write('\nChatdown cli tool used to parse chat dialogs (.chat file) into a mock transcript file\n\n© 2018 Microsoft Corporation\n\n');
  output.write(chalk.cyan.bold(`chatdown [chat] [--help] [--version] [--static]\n\n`));
  let left = 20;
  let width = windowSize ? windowSize.width : 250;
  let right = width - left - 3; // 3 is for 3 vertical bar characters
  const table: Array<any> = new Table({
    head: [chalk.bold('Argument'), chalk.bold('Description')],
    // don't use lines for table
    chars: {
      'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
      'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
      'left': '', 'left-mid': '', 'right': '', 'right-mid': '',
      'mid': '', 'mid-mid': '', 'middle': ''
    },
    colWidths: [left, right],
    style: { head: ['white'], 'padding-left': 1, 'padding-right': 1 },
    wordWrap: true
  });
  table.push([chalk.cyan.bold('[chat]'), '[chat] is the location of the chat file to parse. If omitted, piping is assumed and stdin will be used for input.']);
  table.push([chalk.cyan.bold('-v, --version'), 'show version']);
  table.push([chalk.cyan.bold('--help'), 'Prints this help info to the console.']);
  table.push([chalk.cyan.bold('--static'), 'use static timestamps when generating timestamps on activities.']);
  output.write(table.toString() + '\n');
}
