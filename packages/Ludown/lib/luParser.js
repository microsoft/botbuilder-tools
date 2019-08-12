const antlr4 = require('antlr4');
const LUFileLexer = require('./generated/LUFileLexer').LUFileLexer;
const LUFileParser = require('./generated/LUFileParser').LUFileParser;
const FileContext = require('./generated/LUFileParser').LUFileParser.FileContext;
const LUResource = require('./luResource');
const LUIntent = require('./luIntent');
const LUEntity = require('./luEntity');
const LUImport = require('./luImport');
const LUQna = require('./luQna');
const LUModelInfo = require('./luModelInfo');
const LUErrorListener = require('./luErrorListener');

class LUParser {
    /**
     * @param {string} text
     */
    static parse(text) {
        let luIntents;
        let luEntities;
        let luImports;
        let qnas;
        let modelInfos;

        let { fileContent, errors } = this.getFileContent(text);
        if (errors.length > 0) {
            return new LUResource(luIntents, luEntities, luImports, qnas, modelInfos, errors);
        }

        luIntents = this.extractLUIntents(fileContent);
        luIntents.forEach(luIntent => errors = errors.concat(luIntent.Errors));

        luEntities = this.extractLUEntities(fileContent);
        luEntities.forEach(luEntity => errors = errors.concat(luEntity.Errors));

        luImports = this.extractLUImports(fileContent);
        luImports.forEach(luImport => errors = errors.concat(luImport.Errors));
        
        qnas = this.extractLUQnas(fileContent);

        modelInfos = this.extractLUModelInfos(fileContent);

        return new LUResource(luIntents, luEntities, luImports, qnas, modelInfos, errors);
    }

    /**
     * @param {string} text
     */
    static getFileContent(text) {
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
        const listener = new LUErrorListener(errors)
        parser.removeErrorListeners();
        parser.addErrorListener(listener);
        parser.buildParseTrees = true;
        const fileContent = parser.file();
        
        return { fileContent, errors };
    }

    /**
     * @param {FileContext} fileContext 
     */
    static extractLUIntents(fileContext) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let intentDefinitions = fileContext.paragraph()
            .map(x => x.intentDefinition())
            .filter(x => x !== undefined && x !== null);

        let intents = intentDefinitions.map(x => new LUIntent(x));

        return intents;
    }

    /**
     * @param {FileContext} fileContext 
     */
    static extractLUEntities(fileContext) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let entityDefinitions = fileContext.paragraph()
            .map(x => x.entityDefinition())
            .filter(x => x !== undefined && x != null);

        let entities = entityDefinitions.map(x => new LUEntity(x));

        return entities;
    }

    /**
     * @param {FileContext} fileContext 
     */
    static extractLUImports(fileContext) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let entityDefinitions = fileContext.paragraph()
            .map(x => x.importDefinition())
            .filter(x => x !== undefined && x != null);

        let imports = entityDefinitions.map(x => new LUImport(x));

        return imports;
    }

    /**
     * @param {FileContext} fileContext 
     */
    static extractLUQnas(fileContext) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let qnaDefinitions = fileContext.paragraph()
            .map(x => x.qnaDefinition())
            .filter(x => x !== undefined && x != null);

        let qnas = qnaDefinitions.map(x => new LUQna(x));

        return qnas;
    }

    /**
     * @param {FileContext} fileContext 
     */
    static extractLUModelInfos(fileContext) {
        if (fileContext === undefined
            || fileContext === null) {
                return [];
        }

        let modelInfoDefinitions = fileContext.paragraph()
            .map(x => x.modelInfoDefinition())
            .filter(x => x !== undefined && x != null);

        let modelInfos = modelInfoDefinitions.map(x => new LUModelInfo(x));

        return modelInfos;
    }
}

module.exports = LUParser;