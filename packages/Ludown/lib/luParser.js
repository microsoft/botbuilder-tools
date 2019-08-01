const antlr4 = require('antlr4');
const LUFileLexer = require('./generated/LUFileLexer').LUFileLexer;
const LUFileParser = require('./generated/LUFileParser').LUFileParser;
const FileContext = require('./generated/LUFileParser').LUFileParser.FileContext;
const LUResource = require('./luResource');
const LUIntent = require('./luIntent');
const LUEntity = require('./luEntity');
const LUImport = require('./luImport');
const LUQna = require('./luQna');

class LUParser {
    /**
     * @param {string} text
     * @param {string} id
     */
    static parse(text, id = '') {
        let fileContent = this.getFileContent(text, id);
        let luIntents = this.extractLUIntents(fileContent, id);
        let luEntities = this.extractLUEntities(fileContent, id);
        let luImports = this.extractLUImports(fileContent, id);
        let qnas = this.extractLUQnas(fileContent, id);

        return new LUResource(luIntents, luEntities, luImports, qnas, id);
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
        parser.buildParseTrees = true;
        const tree = parser.file();
        
        return tree;
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