// Generated from ../LUFileParser.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by LUFileParser.

function LUFileParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

LUFileParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
LUFileParserVisitor.prototype.constructor = LUFileParserVisitor;

// Visit a parse tree produced by LUFileParser#file.
LUFileParserVisitor.prototype.visitFile = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#paragraph.
LUFileParserVisitor.prototype.visitParagraph = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#newline.
LUFileParserVisitor.prototype.visitNewline = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#intentDefinition.
LUFileParserVisitor.prototype.visitIntentDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#intentNameLine.
LUFileParserVisitor.prototype.visitIntentNameLine = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#intentName.
LUFileParserVisitor.prototype.visitIntentName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#intentNameIdentifier.
LUFileParserVisitor.prototype.visitIntentNameIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#intentBody.
LUFileParserVisitor.prototype.visitIntentBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#normalIntentBody.
LUFileParserVisitor.prototype.visitNormalIntentBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#normalIntentString.
LUFileParserVisitor.prototype.visitNormalIntentString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#entityDefinition.
LUFileParserVisitor.prototype.visitEntityDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#entityLine.
LUFileParserVisitor.prototype.visitEntityLine = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#entityName.
LUFileParserVisitor.prototype.visitEntityName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#entityType.
LUFileParserVisitor.prototype.visitEntityType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#compositeEntityIdentifier.
LUFileParserVisitor.prototype.visitCompositeEntityIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#regexEntityIdentifier.
LUFileParserVisitor.prototype.visitRegexEntityIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#entityIdentifier.
LUFileParserVisitor.prototype.visitEntityIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#entityListBody.
LUFileParserVisitor.prototype.visitEntityListBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#normalItemString.
LUFileParserVisitor.prototype.visitNormalItemString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#importDefinition.
LUFileParserVisitor.prototype.visitImportDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#qnaDefinition.
LUFileParserVisitor.prototype.visitQnaDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#qnaQuestion.
LUFileParserVisitor.prototype.visitQnaQuestion = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#questionText.
LUFileParserVisitor.prototype.visitQuestionText = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#moreQuestionsBody.
LUFileParserVisitor.prototype.visitMoreQuestionsBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#moreQuestion.
LUFileParserVisitor.prototype.visitMoreQuestion = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#qnaAnswerBody.
LUFileParserVisitor.prototype.visitQnaAnswerBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#filterSection.
LUFileParserVisitor.prototype.visitFilterSection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#filterLine.
LUFileParserVisitor.prototype.visitFilterLine = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#multiLineAnswer.
LUFileParserVisitor.prototype.visitMultiLineAnswer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LUFileParser#modelInfoDefinition.
LUFileParserVisitor.prototype.visitModelInfoDefinition = function(ctx) {
  return this.visitChildren(ctx);
};



exports.LUFileParserVisitor = LUFileParserVisitor;