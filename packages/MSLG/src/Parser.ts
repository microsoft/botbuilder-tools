import * as fs from 'fs-extra';
import * as Exp from './exception';
import * as retCode from './CLI-errors';
import { helpers, ErrorType } from './helpers';
import * as path from 'path';
import * as txtfile from 'read-text-file';
import * as chalk from 'chalk';
import { MSLGTool } from '../../../../botbuilder-js/libraries/botbuilder-lg/lib/MSLGTool';

const readlineSync = require('readline-sync');

export class Parser {
    private tool: MSLGTool = new MSLGTool();

    public async Parser(program: any) {
        let filesToParse: any[] = [];
        let folderStat: any;
        if (program.in) {
            filesToParse.push(program.in);
        }

        if (program.lg_folder) {
            try {
                folderStat = fs.statSync(program.lg_folder);
            } catch (err) {
                throw (new Exp.Exception(retCode.ErrorCode.INPUT_FOLDER_INVALID, 'Sorry, ' + program.lg_folder + ' is not a folder or does not exist'));
            }
            if (!folderStat.isDirectory()) {
                throw (new Exp.Exception(retCode.ErrorCode.INPUT_FOLDER_INVALID, 'Sorry, ' + program.lg_folder + ' is not a folder or does not exist'));
            }
            if (program.subfolder) {
                filesToParse = helpers.findLGFiles(program.lg_folder, true);
            } else {
                filesToParse = helpers.findLGFiles(program.lg_folder, false);
            }
            if (filesToParse.length === 0) {
                throw (new Exp.Exception(retCode.ErrorCode.NO_LG_FILES_FOUND, 'Sorry, no .lg files found in the specified folder.'));
            }
        }

        let errors: string[] = [];

        while (filesToParse.length > 0) {
            let file = filesToParse[0];
            try {
                errors = errors.concat(await this.parseFile(file, program.verbose));
            } catch (err) {
                throw err;
            }

            filesToParse.splice(0, 1);
        }

        if (program.stdin) {
            let parsedJsonFromStdin;
            try {
                let value = readlineSync.question(`Please enter the lg file content: `);
                parsedJsonFromStdin = JSON.parse(value);
            } catch (err) {
                throw (new Exp.Exception(retCode.ErrorCode.INVALID_INPUT, `Sorry, unable to parse stdin as JSON! \n\n ${JSON.stringify(err, null, 2)}\n\n`));
            }

            errors = errors.concat(this.parseStream(parsedJsonFromStdin, program.verbose));
        }


        if (errors.filter(error => error.startsWith(ErrorType.Error)).length === 0) {
            let fileName: string;
            if (program.out) {
                fileName = program.out + '_mslg.lg';
            } else if (program.in) {
                fileName = program.in + '_mslg.lg';
            } else {
                fileName = program.lg_folder + '_mslg.lg'
            }

            let outFolder: string = process.cwd();
            if (program.out_folder) {
                if (path.isAbsolute(program.out_folder)) {
                    outFolder = program.out_folder;
                } else {
                    outFolder = path.resolve('', program.out_folder);
                }

                if (!fs.existsSync(outFolder)) {
                    throw (new Exp.Exception(retCode.ErrorCode.OUTPUT_FOLDER_INVALID, 'Output folder ' + outFolder + ' does not exist'))
                }
            }

            if (this.tool.CollationMessages.length > 0) {
                process.stdout.write(chalk.default.redBright("Errors happened when collating lg files" + '\n'));
                this.tool.CollationMessages.forEach(error => {
                    if (error.startsWith(ErrorType.Error)) {
                        process.stdout.write(chalk.default.redBright(error + '\n'));
                    } else {
                        process.stdout.write(chalk.default.yellowBright(error + '\n'));
                    }
                });
            } else {
                if (program.collate === undefined && this.tool.NameCollisions.length > 0) {
                    process.stdout.write(chalk.default.redBright('[ERROR]: Below template names are defined in multiple files: ' + this.tool.NameCollisions.toString() + '\n'));
                } else {
                    const mergedLgFileContent = this.tool.CollateTemplates();
                    if (mergedLgFileContent === undefined || mergedLgFileContent === '') {
                        process.stdout.write(chalk.default.redBright(`Error happened when generating collated lg file.\n`));
                    }
                    const filePath = outFolder + '\\' + fileName;
                    if (fs.existsSync(filePath)) {
                        process.stdout.write(chalk.default.redBright(`A file named ${fileName} already exists in the folder ${outFolder}.\n`));
                    } else {
                        fs.writeFileSync(filePath, mergedLgFileContent);
                    }

                    if (program.stdout) {
                        process.stdout.write(chalk.default.whiteBright(mergedLgFileContent));
                    }
                }
            }
        }
    }

    private parseFile(fileName: string, verbose: boolean): string[] {
        if (!fs.existsSync(path.resolve(fileName))) {
            throw (new Exp.Exception(retCode.ErrorCode.FILE_OPEN_ERROR, 'Sorry unable to open [' + fileName + ']'));
        }

        let fileContent = txtfile.readSync(fileName);
        if (!fileContent) {
            throw (new Exp.Exception(retCode.ErrorCode.FILE_OPEN_ERROR, 'Sorry, error reading file:' + fileName));
        }

        if (verbose) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + fileName + '\n'));

        const errors: string[] = this.tool.ValidateFile(fileContent);
        if (errors.length > 0) {
            errors.forEach(error => {
                if (error.startsWith(ErrorType.Error)) {
                    process.stdout.write(chalk.default.redBright(error + '\n'));
                } else {
                    process.stdout.write(chalk.default.yellowBright(error + '\n'));
                }
            });
        }

        return errors;
    }

    private parseStream(fileContent: string, verbose: boolean): string[] {
        if (verbose) process.stdout.write(chalk.default.whiteBright('Parsing from stdin.\n'));

        const errors: string[] = this.tool.ValidateFile(fileContent);
        if (errors.length > 0) {
            errors.forEach(error => {
                process.stdout.write(chalk.default.redBright(error + '\n'));
            });
        }

        return errors;
    }
}