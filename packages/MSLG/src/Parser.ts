import * as fs from 'fs-extra';
import * as Exp from './exception';
import * as retCode from './CLI-errors';
import { helpers } from './helpers';
import * as path from 'path';
import * as txtfile from 'read-text-file';
import * as chalk from 'chalk';
import { LGReportMessage, LGReportMessageType } from 'botbuilder-ai/lib/lg/Exception';
import { MSLGTool } from 'botbuilder-ai/lib/lg/MSLGTool';

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

        let errors: LGReportMessage[] = [];

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

        if (errors.filter(error => error.ReportType === LGReportMessageType.Error).length > 0) {
            process.stdout.write(chalk.default.redBright("Errors happened when paring lg files" + '\n'));
        } else {
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

            if (program.collate) {
                if(this.tool.MergerMessages.length > 0) {
                    process.stdout.write(chalk.default.redBright("Errors happened when merging lg files" + '\n'));
                    this.tool.MergerMessages.forEach(error => {
                        if (error.ReportType === LGReportMessageType.Error) {
                            process.stdout.write(chalk.default.redBright('Error: ' + error.Message + '\n'));
                        } else {
                            process.stdout.write(chalk.default.yellowBright('Warning: ' + error.Message + '\n'));
                        }
                    });
                } else {
                    const mergedLgFileContent = this.generateLGFile(this.tool.MergedTemplates);
                    const filePath = outFolder + '/' + fileName;
                    // if(fs.existsSync(filePath)) {
                    //     process.stdout.write(chalk.default.redBright(`Error: a file named ${fileName} already exists in the folder ${outFolder}.\n`));
                    // } else {
                        fs.writeFileSync(filePath, mergedLgFileContent);
                    // }

                    if (program.stdout) {
                        process.stdout.write(chalk.default.whiteBright(mergedLgFileContent));
                    }
                }
            } else {
                if (this.tool.NameCollisions.length > 0) {
                    process.stdout.write(chalk.default.yellowBright('Warning: Below template names are defined in multiple files: ' + this.tool.NameCollisions.toString() + '\n'));
                }
            }
        }
    }

    private parseFile(fileName: string, verbose: boolean): LGReportMessage[] {
        if (!fs.existsSync(path.resolve(fileName))) {
            throw (new Exp.Exception(retCode.ErrorCode.FILE_OPEN_ERROR, 'Sorry unable to open [' + fileName + ']'));
        }

        let fileContent = txtfile.readSync(fileName);
        if (!fileContent) {
            throw (new Exp.Exception(retCode.ErrorCode.FILE_OPEN_ERROR, 'Sorry, error reading file:' + fileName));
        }

        if (verbose) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + fileName + '\n'));

        const errors: LGReportMessage[] = this.tool.ValidateFile(fileContent);
        if (errors.length > 0) {
            errors.forEach(error => {
                if (error.ReportType === LGReportMessageType.Error) {
                    process.stdout.write(chalk.default.redBright('Error: ' + error.Message + '\n'));
                } else {
                    process.stdout.write(chalk.default.yellowBright('Warning: ' + error.Message + '\n'));
                }
            });
        }

        return errors;
    }

    private parseStream(fileContent: string, verbose: boolean): LGReportMessage[] {
        if (verbose) process.stdout.write(chalk.default.whiteBright('Parsing from stdin.\n'));

        const errors: LGReportMessage[] = this.tool.ValidateFile(fileContent);
        if (errors.length > 0) {
            errors.forEach(error => {
                process.stdout.write(chalk.default.redBright(error + '\n'));
            });
        }

        return errors;
    }

    private generateLGFile(mergedTemplates: Map<string, any>): string {
        let result: string = '';
        for (const template of mergedTemplates) {
            result += '# ' + template[0] + '\n';
            if (template[1] instanceof Array) {
                (template[1] as string[]).forEach(templateStr => {
                    result += '- ' + templateStr + '\n';
                });
            } else if (template[1] instanceof Map) {
                for (const condition of (template[1] as Map<string, string[]>)) {
                    const conditionStr = condition[0];
                    if (conditionStr === 'DEFAULT') {
                        result += '- DEFAULT:\n';
                    } else {
                        result += '- CASE: ' + conditionStr + '\n';
                    }

                    condition[1].forEach(templateStr => {
                        result += '  - ' + templateStr + '\n';
                    })
                }
            } else {
                process.stdout.write(chalk.default.redBright(`Error happened when generating merged lg file.\n`));
            }

            result += '\n'
        }

        return result;
    } 
}