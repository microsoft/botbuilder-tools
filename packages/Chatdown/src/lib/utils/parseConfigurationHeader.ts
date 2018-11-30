import { TransientParserModel } from '../types/transientParserModel';

export function parseConfigurationHeader(header: string, parserModel: TransientParserModel): void {
  const [optionName, value, ...rest] = header.trim().split('=').map(str => str.trim());
  if (rest.length || !/^(user(s)?|bot)$/.test(optionName)) {
    throw new Error('Malformed configurations options detected. Options must be in the format user|users|bot=optionValue');
  }
  if (optionName.startsWith('user')) {
    parserModel.users = value.split(',');
  } else {
    parserModel.bot = value;
  }
}
