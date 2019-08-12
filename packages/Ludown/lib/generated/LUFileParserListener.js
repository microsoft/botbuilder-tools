// Generated from ../LUFileParser.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by LUFileParser.
function LUFileParserListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

LUFileParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
LUFileParserListener.prototype.constructor = LUFileParserListener;

// Enter a parse tree produced by LUFileParser#file.
LUFileParserListener.prototype.enterFile = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#file.
LUFileParserListener.prototype.exitFile = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#paragraph.
LUFileParserListener.prototype.enterParagraph = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#paragraph.
LUFileParserListener.prototype.exitParagraph = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#newline.
LUFileParserListener.prototype.enterNewline = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#newline.
LUFileParserListener.prototype.exitNewline = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#intentDefinition.
LUFileParserListener.prototype.enterIntentDefinition = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#intentDefinition.
LUFileParserListener.prototype.exitIntentDefinition = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#intentNameLine.
LUFileParserListener.prototype.enterIntentNameLine = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#intentNameLine.
LUFileParserListener.prototype.exitIntentNameLine = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#intentName.
LUFileParserListener.prototype.enterIntentName = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#intentName.
LUFileParserListener.prototype.exitIntentName = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#intentNameIdentifier.
LUFileParserListener.prototype.enterIntentNameIdentifier = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#intentNameIdentifier.
LUFileParserListener.prototype.exitIntentNameIdentifier = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#intentBody.
LUFileParserListener.prototype.enterIntentBody = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#intentBody.
LUFileParserListener.prototype.exitIntentBody = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#normalIntentBody.
LUFileParserListener.prototype.enterNormalIntentBody = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#normalIntentBody.
LUFileParserListener.prototype.exitNormalIntentBody = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#normalIntentString.
LUFileParserListener.prototype.enterNormalIntentString = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#normalIntentString.
LUFileParserListener.prototype.exitNormalIntentString = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#entityDefinition.
LUFileParserListener.prototype.enterEntityDefinition = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#entityDefinition.
LUFileParserListener.prototype.exitEntityDefinition = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#entityLine.
LUFileParserListener.prototype.enterEntityLine = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#entityLine.
LUFileParserListener.prototype.exitEntityLine = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#entityName.
LUFileParserListener.prototype.enterEntityName = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#entityName.
LUFileParserListener.prototype.exitEntityName = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#entityType.
LUFileParserListener.prototype.enterEntityType = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#entityType.
LUFileParserListener.prototype.exitEntityType = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#compositeEntityIdentifier.
LUFileParserListener.prototype.enterCompositeEntityIdentifier = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#compositeEntityIdentifier.
LUFileParserListener.prototype.exitCompositeEntityIdentifier = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#regexEntityIdentifier.
LUFileParserListener.prototype.enterRegexEntityIdentifier = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#regexEntityIdentifier.
LUFileParserListener.prototype.exitRegexEntityIdentifier = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#entityIdentifier.
LUFileParserListener.prototype.enterEntityIdentifier = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#entityIdentifier.
LUFileParserListener.prototype.exitEntityIdentifier = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#entityListBody.
LUFileParserListener.prototype.enterEntityListBody = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#entityListBody.
LUFileParserListener.prototype.exitEntityListBody = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#normalItemString.
LUFileParserListener.prototype.enterNormalItemString = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#normalItemString.
LUFileParserListener.prototype.exitNormalItemString = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#importDefinition.
LUFileParserListener.prototype.enterImportDefinition = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#importDefinition.
LUFileParserListener.prototype.exitImportDefinition = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#qnaDefinition.
LUFileParserListener.prototype.enterQnaDefinition = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#qnaDefinition.
LUFileParserListener.prototype.exitQnaDefinition = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#qnaQuestion.
LUFileParserListener.prototype.enterQnaQuestion = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#qnaQuestion.
LUFileParserListener.prototype.exitQnaQuestion = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#questionText.
LUFileParserListener.prototype.enterQuestionText = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#questionText.
LUFileParserListener.prototype.exitQuestionText = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#moreQuestionsBody.
LUFileParserListener.prototype.enterMoreQuestionsBody = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#moreQuestionsBody.
LUFileParserListener.prototype.exitMoreQuestionsBody = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#moreQuestion.
LUFileParserListener.prototype.enterMoreQuestion = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#moreQuestion.
LUFileParserListener.prototype.exitMoreQuestion = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#qnaAnswerBody.
LUFileParserListener.prototype.enterQnaAnswerBody = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#qnaAnswerBody.
LUFileParserListener.prototype.exitQnaAnswerBody = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#filterSection.
LUFileParserListener.prototype.enterFilterSection = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#filterSection.
LUFileParserListener.prototype.exitFilterSection = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#filterLine.
LUFileParserListener.prototype.enterFilterLine = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#filterLine.
LUFileParserListener.prototype.exitFilterLine = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#multiLineAnswer.
LUFileParserListener.prototype.enterMultiLineAnswer = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#multiLineAnswer.
LUFileParserListener.prototype.exitMultiLineAnswer = function(ctx) {
};


// Enter a parse tree produced by LUFileParser#modelInfoDefinition.
LUFileParserListener.prototype.enterModelInfoDefinition = function(ctx) {
};

// Exit a parse tree produced by LUFileParser#modelInfoDefinition.
LUFileParserListener.prototype.exitModelInfoDefinition = function(ctx) {
};



exports.LUFileParserListener = LUFileParserListener;