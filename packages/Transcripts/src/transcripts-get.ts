/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
// tslint:disable:no-console
// tslint:disable:no-object-literal-type-assertion
import { Activity, FileTranscriptStore, TranscriptStore } from 'botbuilder';
import { AzureBlobTranscriptStore, BlobStorageSettings } from 'botbuilder-azure';
import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';

program.Command.prototype.unknownOption = (flag: string): void => {
    console.error(chalk.default.redBright(`Unknown arguments: ${flag}`));
    showErrorHelp();
};

interface IGetArgs {
    channelId: string;
    conversationId: string;
    folder: string;
    name: string;
    connectionString: string;
    [key: string]: string | string[];
}

program
    .name('transcript get <channelId> <conversationId>')
    .option('-f, --folder <folder>', 'path to folder output for FileTranscriptStore')
    .option('-n, --name <name>', 'azure blob container name for transcript')
    .option('-c, --connectionString <connectionString>', 'Azure blob connection string for transcript')
    .action((cmd: program.Command, actions: program.Command) => undefined);

const command: program.Command = program.parse(process.argv);
const args: IGetArgs = <IGetArgs>{};
Object.assign(args, command);

procesArgs()
    .catch((reason: Error) => {
        console.error(chalk.default.redBright(reason.toString().split('\n')[0]));
        showErrorHelp();
    });

async function procesArgs(): Promise<void> {

    if (args.args.length < 3) {
        throw new Error('missing the channelId and conversationId');
    }
    args.channelId = <string>args[1];
    args.conversationId = <string>args[2];

    let store: TranscriptStore;
    if (args.folder) {
        store = new FileTranscriptStore(args.folder);
    } else if (args.connectionString) {
        let settings: BlobStorageSettings = {
            storageAccountOrConnectionString: args.connectionString,
            containerName: args.name
        };
        store = new AzureBlobTranscriptStore(settings);
    } else {
        throw new Error('missing the folder or azure blob storage information');
    }

    let activities: Activity[] = [];
    let result = await store.getTranscriptActivities(args.channelId, args.conversationId);
    do {
        for (let activity of result.items) {
            activities.push(activity);
        }

        if (result.continuationToken) {
            result = await store.getTranscriptActivities(args.channelId, args.conversationId);
        } 
    } while (result.continuationToken);

    console.log(JSON.stringify(activities));
    return;
}

function showErrorHelp(): void {
    program.outputHelp((str: string) => {
        console.error(str);

        return '';
    });
    process.exit(1);
}

