const antlr4 = require('antlr4');
const LUFileLexer = require('./generated/LUFileLexer').LUFileLexer;
const LUFileParser = require('./generated/LUFileParser').LUFileParser;
const FileContext = require('./generated/LUFileParser').LUFileParser.FileContext;
const LUResource = require('./luResource');
const LUIntent = require('./luIntent');
const LUEntity = require('./luEntity');
const LUImport = require('./luImport');
const LUQna = require('./luQna');
const LUErrorListener = require('./luErrorListener');

class LUParser {
    /**
     * @param {string} text
     * @param {string} id
     */
    static parse(text, id = '') {
        let luIntents;
        let luEntities;
        let luImports;
        let qnas;

        let { fileContent, errors } = this.getFileContent(text, id);
        if (errors.length > 0) {
            return new LUResource(luIntents, luEntities, luImports, qnas, errors, id);
        }

        luIntents = this.extractLUIntents(fileContent, id);
        luIntents.forEach(luIntent => errors = errors.concat(luIntent.Errors));

        luEntities = this.extractLUEntities(fileContent, id);
        luEntities.forEach(luEntity => errors = errors.concat(luEntity.Errors));

        luImports = this.extractLUImports(fileContent, id);
        
        qnas = this.extractLUQnas(fileContent, id);

        return new LUResource(luIntents, luEntities, luImports, qnas, errors, id);
    }

    /**
     * @param {string} text
     * @param {string} source
     */
    static getFileContent(text, source) {
        if (text === undefined
            || text === ''
            || text === null) {
            
            return undefined;
        }

        const chars = new antlr4.InputStream(text);
        const lexer = new LUFileLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new LUFileParser(tokens);
        let errors = [];
        const listener = new LUErrorListener(errors, source)
        parser.removeErrorListeners();
        parser.addErrorListener(listener);
        parser.buildParseTrees = true;
        const fileContent = parser.file();
        
        return { fileContent, errors };
    }

    /**
     * @param {FileContext} fileContext 
     * @param {string} source 
     */
    static extractLUIntents(fileContext, source) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let intentDefinitions = fileContext.paragraph()
            .map(x => x.intentDefinition())
            .filter(x => x !== undefined && x !== null);

        let intents = intentDefinitions.map(x => new LUIntent(x, source));

        return intents;
    }

    /**
     * @param {FileContext} fileContext 
     * @param {string} source 
     */
    static extractLUEntities(fileContext, source) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let entityDefinitions = fileContext.paragraph()
            .map(x => x.entityDefinition())
            .filter(x => x !== undefined && x != null);

        let entities = entityDefinitions.map(x => new LUEntity(x, source));

        return entities;
    }

    /**
     * @param {FileContext} fileContext 
     * @param {string} source 
     */
    static extractLUImports(fileContext, source) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let entityDefinitions = fileContext.paragraph()
            .map(x => x.importDefinition())
            .filter(x => x !== undefined && x != null);

        let imports = entityDefinitions.map(x => new LUImport(x, source));

        return imports;
    }

    /**
     * @param {FileContext} fileContext 
     * @param {string} source 
     */
    static extractLUQnas(fileContext, source) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let qnaDefinitions = fileContext.paragraph()
            .map(x => x.qnaDefinition())
            .filter(x => x !== undefined && x != null);

        let qnas = qnaDefinitions.map(x => new LUQna(x, source));

        return qnas;
    }
}

module.exports = LUParser;