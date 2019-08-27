import * as fs from 'fs-extra';
import * as path from 'path';
import * as txtfile from 'read-text-file';
import * as chalk from 'chalk';
import { ErrorType } from './helpers';
import { MSLGTool } from 'botbuilder-lg';

const readlineSync = require('readline-sync');

export class Expander {
    private tool: MSLGTool = new MSLGTool();

    public Expand(program: any) {
        let fileToExpand: any;
        if (program.in) {
            fileToExpand = program.in;
        }

        let errors: string[] = [];
        errors = this.parseFile(fileToExpand, program.inline);

        if (errors.filter(error => error.startsWith(ErrorType.Error)).length > 0) {
            throw new Error("parsing lg file or inline expression failed.");
        }

        let templatesName: string[] = [];
        if (program.template) {
            templatesName.push(program.template);
        }

        if (program.all) {
            templatesName = Array.from(new Set(templatesName.concat(this.getTemplatesName(this.tool.CollatedTemplates))));
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
            for (const variableValue of variablesValue) {
                if (variableValue[1] === undefined) {
                    if (program.interactive) {
                        let value = readlineSync.question(`Please enter variable value of ${variableValue[0]} in template ${templateName}: `);
                        let valueObj: any;
                        try {
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

            const variableObj: any = this.generateVariableObj(variablesValue)
            const expandedTemplate: string[] = this.tool.ExpandTemplate(templateName, variableObj);
            expandedTemplates.set(templateName, expandedTemplate);
        }

        if(expandedTemplates === undefined || expandedTemplates.size === 0) {
            throw new Error('expanding templates or inline expression failed');
        }

        let expandedTemplatesFile: string = this.generateExpandedTemplatesFile(expandedTemplates)

        let fileName: string = program.in;
        if (fileName === undefined) {
            expandedTemplatesFile = expandedTemplatesFile.replace('# __temp__\n- ', '');
        }

        process.stdout.write(expandedTemplatesFile + '\n');
    }

    private parseFile(fileName: string, inlineExpression: any = undefined): string[] {
        let fileContent: string = '';
        let filePath: string = '';
        if (fileName !== undefined) {
            if (!fs.existsSync(path.resolve(fileName))) {
                throw new Error('unable to open file: ' + fileName);
            }

            fileContent = txtfile.readSync(fileName);
            if (!fileContent) {
                throw new Error('unable to read file: ' + fileName);
            }

            filePath = path.resolve(fileName)
        }

        if (inlineExpression !== undefined) {
            const fakeTemplateId: string = '__temp__';
            const wrappedStr: string = `\n# ${fakeTemplateId} \r\n - ${inlineExpression}`;
            fileContent += wrappedStr;
            filePath = path.resolve('./');
        }

        const errors: string[] = this.tool.ValidateFile(fileContent, filePath);
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

    private generateExpandedTemplatesFile(expandedTemplates: Map<string, string[]>): string {
        let result: string = '';
        for (const template of expandedTemplates) {
            result += '# ' + template[0] + '\n';
            if (template[1] instanceof Array) {
                (template[1]).forEach(templateStr => {
                    result += '- ' + templateStr + '\n';
                });
            } else {
                throw new Error(`generating expanded lg file failed`);
            }

            result += '\n'
        }

        return result;
    }

    private getTemplatesName(collatedTemplates: Map<string, any>): string[] {
        let result: string[] = [];
        for (const template of collatedTemplates) {
            result.push(template[0]);
        }

        return result;
    }

    private getVariableValues(testFileName: string, expectedVariables: string[], userInputValues: Map<string, any>): Map<string, any> {
        let result: Map<string, any> = new Map<string, any>();;
        let variablesObj: any;
        if (testFileName !== undefined) {
            const filePath: string = path.resolve(testFileName);
            if (!fs.existsSync(filePath)) {
                throw new Error('unable to open file: ' + filePath);
            }

            let fileContent = txtfile.readSync(filePath);
            if (!fileContent) {
                throw new Error('unable to read file: ' + filePath);
            }

            variablesObj = JSON.parse(fileContent);
        }

        if (expectedVariables !== undefined) {
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