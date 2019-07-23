const antlr4 = require('antlr4');
const LUFileLexer = require('./generated/LUFileLexer').LUFileLexer;
const LUFileParser = require('./generated/LUFileParser').LUFileParser;
const FileContext = require('./generated/LUFileParser').LUFileParser.FileContext;
const LUResource = require('./luResource');
const LUIntent = require('./luIntent');
const LUEntity = require('./luEntity');

class LUParser {
    /**
     * @param {string} text
     * @param {string} id
     */
    static parse(text, id = '') {
        var fileContent = this.getFileContent(text, id);
        var luIntents = this.extractLUIntents(fileContent, id);
        var luEntities = this.extractLUEntities(fileContent, id);

        return new LUResource(luIntents, luEntities, undefined, id);
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

        var intentDefinitions = fileContext.paragraph()
            .map(x => x.intentDefinition())
            .filter(x => x !== undefined && x !== null);

        var intents = intentDefinitions.map(x => new LUIntent(x, source));

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

        var entityDefinitions = fileContext.paragraph()
            .map(x => x.entityDefinition())
            .filter(x => x !== undefined && x != null);

        var entities = entityDefinitions.map(x => new LUEntity(x, source));

        return entities;
    }
}

module.exports = LUParser;