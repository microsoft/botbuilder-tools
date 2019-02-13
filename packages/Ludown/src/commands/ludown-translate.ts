import { Command, name } from 'commander';
import * as ludownTranslateRes from '../res/ludown-translate.json';
import { commandExecuterFactory } from '../utils/command-factory';
import { printError } from '../utils/printers.js';
import { invalidArgumentValueValidatorFactory } from '../utils/validators/invalid-argument-value.js';
import { invalidPathValidator } from '../utils/validators/invalid-path-validator.js';
import { missingArgumentValidatorFactory } from '../utils/validators/missing-argument-validator';

const mainCommand = commandExecuterFactory(() => {
    const translateCommand = name('ludown translate')
        .description(ludownTranslateRes.description)
        .usage(ludownTranslateRes.usage);

    translateCommand.option('--in <luFile>', ludownTranslateRes.options.in)
        .option('-t, --to_lang <tgtLang>', ludownTranslateRes.options.to_lang)
        .option('-k, --translate_key <trKey>', ludownTranslateRes.options.translate_key)
        .option('-l, --lu_folder <inputFolder>', ludownTranslateRes.options.lu_folder)
        .option('-o, --out_folder <outputFolder>', ludownTranslateRes.options.out_folder)
        .option('-f, --src_lang <srcLang>', ludownTranslateRes.options.src_lang)
        .option('-s, --subfolder', ludownTranslateRes.options.subfolder)
        .option('-n, --lu_file <LU_File>', ludownTranslateRes.options.lu_file)
        .option('-c, --translate_comments', ludownTranslateRes.options.translate_comments)
        .option('-u, --translate_link_text', ludownTranslateRes.options.translate_link_text)
        .option('-b, --batch_translate <linesToBatch>', ludownTranslateRes.options.batch_translate)
        .option('-v --verbose', ludownTranslateRes.options.verbose)
        .parse(process.argv);

    validateCommand(translateCommand)
        .then(() => { /** Fire handler here */ })
        .catch(err => {
            printError(err.message);
            translateCommand.help();
        });
});

mainCommand.execute();

function validateCommand(translateCommand: Command): Promise<boolean[]> {
    const validations: Promise<boolean>[] = [];

    validations.push(
        missingArgumentValidatorFactory([
            ['in', 'lu_folder'],
            ['translate_key'],
            ['to_lang']
        ]).execute(translateCommand)
    );

    if (translateCommand.in) {
        validations.push(invalidPathValidator(false).execute(translateCommand.in));
    }

    if (translateCommand.lu_folder) {
        validations.push(invalidPathValidator(true).execute(translateCommand.lu_folder));
    }

    if (translateCommand.batch_translate) {
        validations.push(invalidArgumentValueValidatorFactory(
            [...Array(25).keys()].map(v => v + 1)
        ).execute({
            name: 'batch_translate',
            value: translateCommand.batch_translate
        }));
    }

    return Promise.all(validations);
}
