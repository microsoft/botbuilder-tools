import * as fs from 'fs-extra';
import * as Exp from './exception';
import * as retCode from './CLI-errors';
import * as path from 'path';
import * as txtfile from 'read-text-file';
import * as chalk from 'chalk';
import { LGReportMessage, LGReportMessageType } from 'botbuilder-ai/lib/lg/Exception';
import { MSLGTool } from 'botbuilder-ai/lib/lg/MSLGTool';

const readlineSync = require('readline-sync');

export class Expander {
    private tool: MSLGTool = new MSLGTool();

    public async Expand(program: any) {
        let fileToExpand: any;
        if (program.in) {
            fileToExpand = program.in;
        }

        let errors: LGReportMessage[] = [];

        try {
            errors = await this.parseFile(fileToExpand, program.inline);
        } catch (err) {
            throw err;
        }

        if (this.tool.MergerMessages.length > 0) {
            process.stdout.write(chalk.default.redBright("Errors happened when collating lg templates." + '\n'));
            this.tool.MergerMessages.forEach(error => {
                if (error.ReportType === LGReportMessageType.Error) {
                    process.stdout.write(chalk.default.redBright('Error: ' + error.Message + '\n'));
                } else {
                    process.stdout.write(chalk.default.yellowBright('Warning: ' + error.Message + '\n'));
                }
            });
        }

        if (errors.length > 0 || this.tool.MergerMessages.length > 0) {
            process.stdout.write(chalk.default.redBright("Expand command stopped as errors happened when paring or collating lg templates." + '\n'));
        }

        let templatesName: string[] = [];
        if (program.template) {
            templatesName.push(program.template);
        }

        if (program.all) {
            templatesName = Array.from(new Set(templatesName.concat(this.getTemplatesName(this.tool.MergedTemplates))));
        }

        if (program.inline) {
            templatesName.push('__temp__');
        }

        let expandedTemplates: Map<string, string[]> = new Map<string, string[]>();
        let variablesValue: Map<string, any>;
        let userInputValues: Map<string, any> = new Map<string, any>();
        for (const templateName of templatesName) {
            const expectedVariables = this.tool.GetTemplateVariables(templateName);
            variablesValue = this.getVariableValues(program.testInput, expectedVariables, userInputValues);
            if (variablesValue !== undefined) {
                for (const variableValue of variablesValue) {
                    if (variableValue[1] === undefined) {
                        if (program.interactive) {
                            let value = readlineSync.question(`Please enter variable value of ${variableValue[0]} in template ${templateName}: `);
                            let valueObj: any;
                            try
                            { 
                                valueObj = JSON.parse(value);
                            }
                            catch
                            {
                                valueObj = value;
                            }

                            variablesValue.set(variableValue[0], valueObj);
                            userInputValues.set(variableValue[0], valueObj);
                        }
                    }
                }
            }

            const variableObj: any = this.generateVariableObj(variablesValue)
            const expandedTemplate: string[] = this.tool.ExpandTemplate(templateName, variableObj);
            expandedTemplates.set(templateName, expandedTemplate);
        }

        let expandedTemplatesFile: string = this.generateExpandedTemplatesFile(expandedTemplates)

        let fileName: string = program.in;
        if (fileName !== undefined) {
            fileName = fileName.replace('.lg', '_expanded.lg');
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
            const filePath = outFolder + '/' + fileName;
            fs.writeFileSync(filePath, expandedTemplatesFile);
        }
        else
        {
            expandedTemplatesFile = expandedTemplatesFile.replace('# __temp__\n- ', '');
        }

        process.stdout.write(expandedTemplatesFile);
    }

    private parseFile(fileName: string, inlineExpression: any = undefined): LGReportMessage[] {
        let fileContent: string = '';
        if (fileName !== undefined) {
            if (!fs.existsSync(path.resolve(fileName))) {
                throw (new Exp.Exception(retCode.ErrorCode.FILE_OPEN_ERROR, 'Sorry unable to open [' + fileName + ']'));
            }

            fileContent = txtfile.readSync(fileName);
            if (!fileContent) {
                throw (new Exp.Exception(retCode.ErrorCode.FILE_OPEN_ERROR, 'Sorry, error reading file:' + fileName));
            }
        }

        if (inlineExpression !== undefined) {
            const fakeTemplateId: string = '__temp__';
            const wrappedStr: string = `\n# ${fakeTemplateId} \r\n - ${inlineExpression}`;
            fileContent += wrappedStr;
        }

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

    private generateExpandedTemplatesFile(expandedTemplates: Map<string, string[]>): string {
        let result: string = '';
        for (const template of expandedTemplates) {
            result += '# ' + template[0] + '\n';
            if (template[1] instanceof Array) {
                (template[1]).forEach(templateStr => {
                    result += '- ' + templateStr + '\n';
                });
            } else {
                process.stdout.write(chalk.default.redBright(`Error happened when generating merged lg file.\n`));
            }

            result += '\n'
        }

        return result;
    }

    private getTemplatesName(mergedTemplates: Map<string, any>): string[] {
        let result: string[] = [];
        for (const template of mergedTemplates) {
            result.push(template[0]);
        }

        return result;
    }

    private getVariableValues(testFileName: string, expectedVariables: string[], userInputValues: Map<string, any>): Map<string, any> {
        let result: Map<string, any>;
        let variablesObj: any;
        if (testFileName !== undefined) {
            const filePath: string = path.resolve(testFileName);
            if (!fs.existsSync(filePath)) {
                throw (new Exp.Exception(retCode.ErrorCode.FILE_OPEN_ERROR, 'Sorry unable to open ' + filePath));
            }

            let fileContent = txtfile.readSync(filePath);
            if (!fileContent) {
                throw (new Exp.Exception(retCode.ErrorCode.FILE_OPEN_ERROR, 'Sorry, error reading file: ' + filePath));
            }

            variablesObj = JSON.parse(fileContent);
        }

        if (expectedVariables !== undefined) {
            result = new Map<string, any>();
            for (const variable of expectedVariables) {
                if (variablesObj !== undefined && variablesObj[variable] !== undefined) {
                    result.set(variable, variablesObj[variable]);
                } else if (userInputValues !== undefined && userInputValues.has(variable)) {
                    result.set(variable, userInputValues.get(variable));
                } else {
                    result.set(variable, undefined);
                }
            }
        }

        return result;
    }

    private generateVariableObj(variablesValue: Map<string, any>): any {
        let result: any = {};
        if (variablesValue !== undefined) {
            for (const variable of variablesValue) {
                result[variable[0]] =  variable[1];
            }
        }

        return result;
    }
}