import * as fs from 'fs-extra';
import { helpers, ErrorType } from './helpers';
import * as path from 'path';
import * as txtfile from 'read-text-file';
import * as chalk from 'chalk';
import { MSLGTool } from 'botbuilder-lg';

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
                process.stderr.write(chalk.default.redBright('Sorry, ' + program.lg_folder + ' is not a folder or does not exist'));
                return;
            }
            if (!folderStat.isDirectory()) {
                process.stderr.write(chalk.default.redBright('Sorry, ' + program.lg_folder + ' is not a folder or does not exist'));
                return;
            }
            if (program.subfolder) {
                filesToParse = helpers.findLGFiles(program.lg_folder, true);
            } else {
                filesToParse = helpers.findLGFiles(program.lg_folder, false);
            }
            if (filesToParse.length === 0) {
                process.stderr.write(chalk.default.redBright('Sorry, no .lg files found in the specified folder.'));
                return;
            }
        }

        if ((filesToParse === undefined || filesToParse.length === 0) && program.stdin === undefined) {
            process.stderr.write(chalk.default.redBright(`Sorry, no .lg files are provided.` + '\n'));
            return;
        }

        let errors: string[] = [];

        while (filesToParse.length > 0) {
            let file = filesToParse[0];
            try {
                const parseRes = await this.parseFile(file, program.verbose);
                if (parseRes === undefined) {
                    return;
                }

                errors = errors.concat(parseRes);
            } catch (err) {
                process.stderr.write(err);
                return;
            }

            filesToParse.splice(0, 1);
        }

        if (program.stdin) {
            let parsedJsonFromStdin;
            try {
                let value = readlineSync.question(`Please enter the lg file content: `);
                parsedJsonFromStdin = JSON.parse(value);
            } catch (err) {
                process.stderr.write(chalk.default.redBright(`Sorry, unable to parse stdin as JSON! \n\n ${JSON.stringify(err, null, 2)}\n\n`));
                return;
            }

            errors = errors.concat(this.parseStream(parsedJsonFromStdin, program.verbose));
        }


        if (errors.filter(error => error.startsWith(ErrorType.Error)).length === 0) {
            let fileName: string;
            if (program.out) {
                fileName = program.out + '_mslg.lg';
            } else if (program.in) {
                if(!path.isAbsolute(program.in)) {
                    fileName = path.resolve('', program.in);
                }
                else {
                    fileName = program.in;
                }

                fileName = fileName.split('\\').pop().replace('.lg', '') + '_mslg.lg';
            } else {
                if(!path.isAbsolute(program.lg_folder)) {
                    fileName = path.resolve('', program.lg_folder);
                }
                else {
                    fileName = program.lg_folder;
                }

                fileName = fileName.split('\\').pop() + '_mslg.lg'
            }

            let outFolder: string = process.cwd();
            if (program.out_folder) {
                if (path.isAbsolute(program.out_folder)) {
                    outFolder = program.out_folder;
                } else {
                    outFolder = path.resolve('', program.out_folder);
                }

                if (!fs.existsSync(outFolder)) {
                    process.stderr.write(chalk.default.redBright('Output folder ' + outFolder + ' does not exist'));
                    return;
                }
            }

            if (this.tool.CollationMessages.length > 0) {
                process.stderr.write(chalk.default.redBright("Errors happened when collating lg files" + '\n'));
                this.tool.CollationMessages.forEach(error => {
                    if (error.startsWith(ErrorType.Error)) {
                        process.stderr.write(chalk.default.redBright(error + '\n'));
                    } else {
                        process.stdout.write(chalk.default.yellowBright(error + '\n'));
                    }
                });
            } else {
                if (program.collate === undefined && this.tool.NameCollisions.length > 0) {
                    process.stderr.write(chalk.default.redBright('[ERROR]: Below template names are defined in multiple files: ' + this.tool.NameCollisions.toString() + '\n'));
                } else {
                    const mergedLgFileContent = this.tool.CollateTemplates();
                    if (mergedLgFileContent === undefined || mergedLgFileContent === '') {
                        process.stderr.write(chalk.default.redBright(`Error happened when generating collated lg file.\n`));
                    }
                    const filePath = outFolder + '\\' + fileName;
                    if (fs.existsSync(filePath)) {
                        process.stderr.write(chalk.default.redBright(`A file named ${fileName} already exists in the folder ${outFolder}.\n`));
                    } else {
                        process.stdout.write(chalk.default.whiteBright(`Collated successfully here ${filePath}.\n`));
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
            process.stderr.write(chalk.default.redBright('Sorry unable to open [' + fileName + ']'));
            return undefined;
        }

        let fileContent = txtfile.readSync(fileName);
        if (!fileContent) {
            process.stderr.write(chalk.default.redBright('Sorry, error reading file:' + fileName));
            return undefined;
        }

        if (verbose) process.stdout.write(chalk.default.whiteBright('Parsing file: ' + fileName + '\n'));

        const errors: string[] = this.tool.ValidateFile(fileContent);
        if (errors.length > 0) {
            errors.forEach(error => {
                if (error.startsWith(ErrorType.Error)) {
                    process.stderr.write(chalk.default.redBright(error + '\n'));
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
                process.stderr.write(chalk.default.redBright(error + '\n'));
            });
        }

        return errors;
    }
}