// Generated from ../LUFileParser.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');
var LUFileParserListener = require('./LUFileParserListener').LUFileParserListener;
var LUFileParserVisitor = require('./LUFileParserVisitor').LUFileParserVisitor;

var grammarFileName = "LUFileParser.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u001e\u00e0\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
    "\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b",
    "\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e\t\u001e",
    "\u0004\u001f\t\u001f\u0003\u0002\u0006\u0002@\n\u0002\r\u0002\u000e",
    "\u0002A\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003L\n\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005S\n\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0007\u0007[\n\u0007\f\u0007\u000e\u0007^\u000b\u0007\u0003\b\u0003",
    "\b\u0003\b\u0007\bc\n\b\f\b\u000e\bf\u000b\b\u0003\t\u0003\t\u0003\n",
    "\u0003\n\u0003\n\u0006\nm\n\n\r\n\u000e\nn\u0003\u000b\u0003\u000b\u0007",
    "\u000bs\n\u000b\f\u000b\u000e\u000bv\u000b\u000b\u0003\f\u0003\f\u0003",
    "\f\u0005\f{\n\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\u000e",
    "\u0003\u000e\u0007\u000e\u0084\n\u000e\f\u000e\u000e\u000e\u0087\u000b",
    "\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0007\u000f\u008f\n\u000f\f\u000f\u000e\u000f\u0092\u000b\u000f",
    "\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0006\u0013\u009d\n\u0013\r\u0013",
    "\u000e\u0013\u009e\u0003\u0014\u0003\u0014\u0007\u0014\u00a3\n\u0014",
    "\f\u0014\u000e\u0014\u00a6\u000b\u0014\u0003\u0015\u0003\u0015\u0003",
    "\u0015\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0017\u0003",
    "\u0017\u0003\u0017\u0003\u0017\u0003\u0018\u0007\u0018\u00b4\n\u0018",
    "\f\u0018\u000e\u0018\u00b7\u000b\u0018\u0003\u0019\u0003\u0019\u0003",
    "\u0019\u0007\u0019\u00bc\n\u0019\f\u0019\u000e\u0019\u00bf\u000b\u0019",
    "\u0003\u001a\u0003\u001a\u0007\u001a\u00c3\n\u001a\f\u001a\u000e\u001a",
    "\u00c6\u000b\u001a\u0003\u001b\u0005\u001b\u00c9\n\u001b\u0003\u001b",
    "\u0003\u001b\u0003\u001c\u0003\u001c\u0006\u001c\u00cf\n\u001c\r\u001c",
    "\u000e\u001c\u00d0\u0003\u001d\u0003\u001d\u0007\u001d\u00d5\n\u001d",
    "\f\u001d\u000e\u001d\u00d8\u000b\u001d\u0003\u001d\u0003\u001d\u0003",
    "\u001e\u0003\u001e\u0003\u001f\u0003\u001f\u0003\u001f\u0003A\u0002",
    " \u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a",
    "\u001c\u001e \"$&(*,.02468:<\u0002\u0006\u0003\u0003\u0006\u0006\u0004",
    "\u0002\u0005\u0005\u0014\u0016\u0004\u0002\u0005\u0005\u0016\u0016\u0004",
    "\u0002\u0005\u0005\u001e\u001e\u0002\u00de\u0002?\u0003\u0002\u0002",
    "\u0002\u0004K\u0003\u0002\u0002\u0002\u0006M\u0003\u0002\u0002\u0002",
    "\bO\u0003\u0002\u0002\u0002\nT\u0003\u0002\u0002\u0002\fW\u0003\u0002",
    "\u0002\u0002\u000e_\u0003\u0002\u0002\u0002\u0010g\u0003\u0002\u0002",
    "\u0002\u0012l\u0003\u0002\u0002\u0002\u0014p\u0003\u0002\u0002\u0002",
    "\u0016w\u0003\u0002\u0002\u0002\u0018|\u0003\u0002\u0002\u0002\u001a",
    "\u0085\u0003\u0002\u0002\u0002\u001c\u0090\u0003\u0002\u0002\u0002\u001e",
    "\u0093\u0003\u0002\u0002\u0002 \u0095\u0003\u0002\u0002\u0002\"\u0097",
    "\u0003\u0002\u0002\u0002$\u009c\u0003\u0002\u0002\u0002&\u00a0\u0003",
    "\u0002\u0002\u0002(\u00a7\u0003\u0002\u0002\u0002*\u00aa\u0003\u0002",
    "\u0002\u0002,\u00ae\u0003\u0002\u0002\u0002.\u00b5\u0003\u0002\u0002",
    "\u00020\u00bd\u0003\u0002\u0002\u00022\u00c0\u0003\u0002\u0002\u0002",
    "4\u00c8\u0003\u0002\u0002\u00026\u00cc\u0003\u0002\u0002\u00028\u00d2",
    "\u0003\u0002\u0002\u0002:\u00db\u0003\u0002\u0002\u0002<\u00dd\u0003",
    "\u0002\u0002\u0002>@\u0005\u0004\u0003\u0002?>\u0003\u0002\u0002\u0002",
    "@A\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002\u0002A?\u0003\u0002\u0002",
    "\u0002BC\u0003\u0002\u0002\u0002CD\u0007\u0002\u0002\u0003D\u0003\u0003",
    "\u0002\u0002\u0002EL\u0005\u0006\u0004\u0002FL\u0005\b\u0005\u0002G",
    "L\u0005\u0016\f\u0002HL\u0005(\u0015\u0002IL\u0005*\u0016\u0002JL\u0005",
    "<\u001f\u0002KE\u0003\u0002\u0002\u0002KF\u0003\u0002\u0002\u0002KG",
    "\u0003\u0002\u0002\u0002KH\u0003\u0002\u0002\u0002KI\u0003\u0002\u0002",
    "\u0002KJ\u0003\u0002\u0002\u0002L\u0005\u0003\u0002\u0002\u0002MN\t",
    "\u0002\u0002\u0002N\u0007\u0003\u0002\u0002\u0002OP\u0005\n\u0006\u0002",
    "PR\u0005\u0006\u0004\u0002QS\u0005\u0010\t\u0002RQ\u0003\u0002\u0002",
    "\u0002RS\u0003\u0002\u0002\u0002S\t\u0003\u0002\u0002\u0002TU\u0007",
    "\b\u0002\u0002UV\u0005\f\u0007\u0002V\u000b\u0003\u0002\u0002\u0002",
    "W\\\u0005\u000e\b\u0002X[\u0007\u0005\u0002\u0002Y[\u0005\u000e\b\u0002",
    "ZX\u0003\u0002\u0002\u0002ZY\u0003\u0002\u0002\u0002[^\u0003\u0002\u0002",
    "\u0002\\Z\u0003\u0002\u0002\u0002\\]\u0003\u0002\u0002\u0002]\r\u0003",
    "\u0002\u0002\u0002^\\\u0003\u0002\u0002\u0002_d\u0007\u0011\u0002\u0002",
    "`a\u0007\u0012\u0002\u0002ac\u0007\u0011\u0002\u0002b`\u0003\u0002\u0002",
    "\u0002cf\u0003\u0002\u0002\u0002db\u0003\u0002\u0002\u0002de\u0003\u0002",
    "\u0002\u0002e\u000f\u0003\u0002\u0002\u0002fd\u0003\u0002\u0002\u0002",
    "gh\u0005\u0012\n\u0002h\u0011\u0003\u0002\u0002\u0002ij\u0005\u0014",
    "\u000b\u0002jk\u0005\u0006\u0004\u0002km\u0003\u0002\u0002\u0002li\u0003",
    "\u0002\u0002\u0002mn\u0003\u0002\u0002\u0002nl\u0003\u0002\u0002\u0002",
    "no\u0003\u0002\u0002\u0002o\u0013\u0003\u0002\u0002\u0002pt\u0007\t",
    "\u0002\u0002qs\t\u0003\u0002\u0002rq\u0003\u0002\u0002\u0002sv\u0003",
    "\u0002\u0002\u0002tr\u0003\u0002\u0002\u0002tu\u0003\u0002\u0002\u0002",
    "u\u0015\u0003\u0002\u0002\u0002vt\u0003\u0002\u0002\u0002wx\u0005\u0018",
    "\r\u0002xz\u0005\u0006\u0004\u0002y{\u0005$\u0013\u0002zy\u0003\u0002",
    "\u0002\u0002z{\u0003\u0002\u0002\u0002{\u0017\u0003\u0002\u0002\u0002",
    "|}\u0007\n\u0002\u0002}~\u0005\u001a\u000e\u0002~\u007f\u0007\u001b",
    "\u0002\u0002\u007f\u0080\u0005\u001c\u000f\u0002\u0080\u0019\u0003\u0002",
    "\u0002\u0002\u0081\u0084\u0005\"\u0012\u0002\u0082\u0084\u0007\u0005",
    "\u0002\u0002\u0083\u0081\u0003\u0002\u0002\u0002\u0083\u0082\u0003\u0002",
    "\u0002\u0002\u0084\u0087\u0003\u0002\u0002\u0002\u0085\u0083\u0003\u0002",
    "\u0002\u0002\u0085\u0086\u0003\u0002\u0002\u0002\u0086\u001b\u0003\u0002",
    "\u0002\u0002\u0087\u0085\u0003\u0002\u0002\u0002\u0088\u008f\u0005\"",
    "\u0012\u0002\u0089\u008f\u0005\u001e\u0010\u0002\u008a\u008f\u0005 ",
    "\u0011\u0002\u008b\u008f\u0007\u001c\u0002\u0002\u008c\u008f\u0007\u001b",
    "\u0002\u0002\u008d\u008f\u0007\u0005\u0002\u0002\u008e\u0088\u0003\u0002",
    "\u0002\u0002\u008e\u0089\u0003\u0002\u0002\u0002\u008e\u008a\u0003\u0002",
    "\u0002\u0002\u008e\u008b\u0003\u0002\u0002\u0002\u008e\u008c\u0003\u0002",
    "\u0002\u0002\u008e\u008d\u0003\u0002\u0002\u0002\u008f\u0092\u0003\u0002",
    "\u0002\u0002\u0090\u008e\u0003\u0002\u0002\u0002\u0090\u0091\u0003\u0002",
    "\u0002\u0002\u0091\u001d\u0003\u0002\u0002\u0002\u0092\u0090\u0003\u0002",
    "\u0002\u0002\u0093\u0094\u0007\u0019\u0002\u0002\u0094\u001f\u0003\u0002",
    "\u0002\u0002\u0095\u0096\u0007\u001a\u0002\u0002\u0096!\u0003\u0002",
    "\u0002\u0002\u0097\u0098\u0007\u0018\u0002\u0002\u0098#\u0003\u0002",
    "\u0002\u0002\u0099\u009a\u0005&\u0014\u0002\u009a\u009b\u0005\u0006",
    "\u0004\u0002\u009b\u009d\u0003\u0002\u0002\u0002\u009c\u0099\u0003\u0002",
    "\u0002\u0002\u009d\u009e\u0003\u0002\u0002\u0002\u009e\u009c\u0003\u0002",
    "\u0002\u0002\u009e\u009f\u0003\u0002\u0002\u0002\u009f%\u0003\u0002",
    "\u0002\u0002\u00a0\u00a4\u0007\t\u0002\u0002\u00a1\u00a3\t\u0004\u0002",
    "\u0002\u00a2\u00a1\u0003\u0002\u0002\u0002\u00a3\u00a6\u0003\u0002\u0002",
    "\u0002\u00a4\u00a2\u0003\u0002\u0002\u0002\u00a4\u00a5\u0003\u0002\u0002",
    "\u0002\u00a5\'\u0003\u0002\u0002\u0002\u00a6\u00a4\u0003\u0002\u0002",
    "\u0002\u00a7\u00a8\u0007\u000b\u0002\u0002\u00a8\u00a9\u0007\f\u0002",
    "\u0002\u00a9)\u0003\u0002\u0002\u0002\u00aa\u00ab\u0005,\u0017\u0002",
    "\u00ab\u00ac\u00050\u0019\u0002\u00ac\u00ad\u00054\u001b\u0002\u00ad",
    "+\u0003\u0002\u0002\u0002\u00ae\u00af\u0007\u0007\u0002\u0002\u00af",
    "\u00b0\u0005.\u0018\u0002\u00b0\u00b1\u0005\u0006\u0004\u0002\u00b1",
    "-\u0003\u0002\u0002\u0002\u00b2\u00b4\t\u0005\u0002\u0002\u00b3\u00b2",
    "\u0003\u0002\u0002\u0002\u00b4\u00b7\u0003\u0002\u0002\u0002\u00b5\u00b3",
    "\u0003\u0002\u0002\u0002\u00b5\u00b6\u0003\u0002\u0002\u0002\u00b6/",
    "\u0003\u0002\u0002\u0002\u00b7\u00b5\u0003\u0002\u0002\u0002\u00b8\u00b9",
    "\u00052\u001a\u0002\u00b9\u00ba\u0005\u0006\u0004\u0002\u00ba\u00bc",
    "\u0003\u0002\u0002\u0002\u00bb\u00b8\u0003\u0002\u0002\u0002\u00bc\u00bf",
    "\u0003\u0002\u0002\u0002\u00bd\u00bb\u0003\u0002\u0002\u0002\u00bd\u00be",
    "\u0003\u0002\u0002\u0002\u00be1\u0003\u0002\u0002\u0002\u00bf\u00bd",
    "\u0003\u0002\u0002\u0002\u00c0\u00c4\u0007\t\u0002\u0002\u00c1\u00c3",
    "\t\u0004\u0002\u0002\u00c2\u00c1\u0003\u0002\u0002\u0002\u00c3\u00c6",
    "\u0003\u0002\u0002\u0002\u00c4\u00c2\u0003\u0002\u0002\u0002\u00c4\u00c5",
    "\u0003\u0002\u0002\u0002\u00c53\u0003\u0002\u0002\u0002\u00c6\u00c4",
    "\u0003\u0002\u0002\u0002\u00c7\u00c9\u00056\u001c\u0002\u00c8\u00c7",
    "\u0003\u0002\u0002\u0002\u00c8\u00c9\u0003\u0002\u0002\u0002\u00c9\u00ca",
    "\u0003\u0002\u0002\u0002\u00ca\u00cb\u0005:\u001e\u0002\u00cb5\u0003",
    "\u0002\u0002\u0002\u00cc\u00ce\u0007\r\u0002\u0002\u00cd\u00cf\u0005",
    "8\u001d\u0002\u00ce\u00cd\u0003\u0002\u0002\u0002\u00cf\u00d0\u0003",
    "\u0002\u0002\u0002\u00d0\u00ce\u0003\u0002\u0002\u0002\u00d0\u00d1\u0003",
    "\u0002\u0002\u0002\u00d17\u0003\u0002\u0002\u0002\u00d2\u00d6\u0007",
    "\t\u0002\u0002\u00d3\u00d5\t\u0004\u0002\u0002\u00d4\u00d3\u0003\u0002",
    "\u0002\u0002\u00d5\u00d8\u0003\u0002\u0002\u0002\u00d6\u00d4\u0003\u0002",
    "\u0002\u0002\u00d6\u00d7\u0003\u0002\u0002\u0002\u00d7\u00d9\u0003\u0002",
    "\u0002\u0002\u00d8\u00d6\u0003\u0002\u0002\u0002\u00d9\u00da\u0005\u0006",
    "\u0004\u0002\u00da9\u0003\u0002\u0002\u0002\u00db\u00dc\u0007\u000e",
    "\u0002\u0002\u00dc;\u0003\u0002\u0002\u0002\u00dd\u00de\u0007\u0003",
    "\u0002\u0002\u00de=\u0003\u0002\u0002\u0002\u0017AKRZ\\dntz\u0083\u0085",
    "\u008e\u0090\u009e\u00a4\u00b5\u00bd\u00c4\u00c8\u00d0\u00d6"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, null, null, null, null, null, null, 
                     null, null, "'**Filters:**'", null, null, null, null, 
                     "'.'", null, null, null, null, null, null, null, null, 
                     "':'" ];

var symbolicNames = [ null, "MODEL_INFO", "COMMENT", "WS", "NEWLINE", "QNA", 
                      "HASH", "DASH", "DOLLAR", "IMPORT_DESC", "IMPORT_PATH", 
                      "FILTER_MARK", "MULTI_LINE_TEXT", "INVALID_TOKEN_DEFAULT_MODE", 
                      "WS_IN_NAME_IGNORED", "IDENTIFIER", "DOT", "WS_IN_BODY_IGNORED", 
                      "ESCAPE_CHARACTER", "EXPRESSION", "TEXT", "WS_IN_ENTITY_IGNORED", 
                      "ENTITY_IDENTIFIER", "COMPOSITE_ENTITY", "REGEX_ENTITY", 
                      "COLON_MARK", "SPECIAL_CHAR_MARK", "WS_IN_QNA_IGNORED", 
                      "QNA_TEXT" ];

var ruleNames =  [ "file", "paragraph", "newline", "intentDefinition", "intentNameLine", 
                   "intentName", "intentNameIdentifier", "intentBody", "normalIntentBody", 
                   "normalIntentString", "entityDefinition", "entityLine", 
                   "entityName", "entityType", "compositeEntityIdentifier", 
                   "regexEntityIdentifier", "entityIdentifier", "entityListBody", 
                   "normalItemString", "importDefinition", "qnaDefinition", 
                   "qnaQuestion", "questionText", "moreQuestionsBody", "moreQuestion", 
                   "qnaAnswerBody", "filterSection", "filterLine", "multiLineAnswer", 
                   "modelInfoDefinition" ];

function LUFileParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

LUFileParser.prototype = Object.create(antlr4.Parser.prototype);
LUFileParser.prototype.constructor = LUFileParser;

Object.defineProperty(LUFileParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

LUFileParser.EOF = antlr4.Token.EOF;
LUFileParser.MODEL_INFO = 1;
LUFileParser.COMMENT = 2;
LUFileParser.WS = 3;
LUFileParser.NEWLINE = 4;
LUFileParser.QNA = 5;
LUFileParser.HASH = 6;
LUFileParser.DASH = 7;
LUFileParser.DOLLAR = 8;
LUFileParser.IMPORT_DESC = 9;
LUFileParser.IMPORT_PATH = 10;
LUFileParser.FILTER_MARK = 11;
LUFileParser.MULTI_LINE_TEXT = 12;
LUFileParser.INVALID_TOKEN_DEFAULT_MODE = 13;
LUFileParser.WS_IN_NAME_IGNORED = 14;
LUFileParser.IDENTIFIER = 15;
LUFileParser.DOT = 16;
LUFileParser.WS_IN_BODY_IGNORED = 17;
LUFileParser.ESCAPE_CHARACTER = 18;
LUFileParser.EXPRESSION = 19;
LUFileParser.TEXT = 20;
LUFileParser.WS_IN_ENTITY_IGNORED = 21;
LUFileParser.ENTITY_IDENTIFIER = 22;
LUFileParser.COMPOSITE_ENTITY = 23;
LUFileParser.REGEX_ENTITY = 24;
LUFileParser.COLON_MARK = 25;
LUFileParser.SPECIAL_CHAR_MARK = 26;
LUFileParser.WS_IN_QNA_IGNORED = 27;
LUFileParser.QNA_TEXT = 28;

LUFileParser.RULE_file = 0;
LUFileParser.RULE_paragraph = 1;
LUFileParser.RULE_newline = 2;
LUFileParser.RULE_intentDefinition = 3;
LUFileParser.RULE_intentNameLine = 4;
LUFileParser.RULE_intentName = 5;
LUFileParser.RULE_intentNameIdentifier = 6;
LUFileParser.RULE_intentBody = 7;
LUFileParser.RULE_normalIntentBody = 8;
LUFileParser.RULE_normalIntentString = 9;
LUFileParser.RULE_entityDefinition = 10;
LUFileParser.RULE_entityLine = 11;
LUFileParser.RULE_entityName = 12;
LUFileParser.RULE_entityType = 13;
LUFileParser.RULE_compositeEntityIdentifier = 14;
LUFileParser.RULE_regexEntityIdentifier = 15;
LUFileParser.RULE_entityIdentifier = 16;
LUFileParser.RULE_entityListBody = 17;
LUFileParser.RULE_normalItemString = 18;
LUFileParser.RULE_importDefinition = 19;
LUFileParser.RULE_qnaDefinition = 20;
LUFileParser.RULE_qnaQuestion = 21;
LUFileParser.RULE_questionText = 22;
LUFileParser.RULE_moreQuestionsBody = 23;
LUFileParser.RULE_moreQuestion = 24;
LUFileParser.RULE_qnaAnswerBody = 25;
LUFileParser.RULE_filterSection = 26;
LUFileParser.RULE_filterLine = 27;
LUFileParser.RULE_multiLineAnswer = 28;
LUFileParser.RULE_modelInfoDefinition = 29;


function FileContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_file;
    return this;
}

FileContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FileContext.prototype.constructor = FileContext;

FileContext.prototype.EOF = function() {
    return this.getToken(LUFileParser.EOF, 0);
};

FileContext.prototype.paragraph = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ParagraphContext);
    } else {
        return this.getTypedRuleContext(ParagraphContext,i);
    }
};

FileContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterFile(this);
	}
};

FileContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitFile(this);
	}
};

FileContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitFile(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.FileContext = FileContext;

LUFileParser.prototype.file = function() {

    var localctx = new FileContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, LUFileParser.RULE_file);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 61; 
        this._errHandler.sync(this);
        var _alt = 1+1;
        do {
        	switch (_alt) {
        	case 1+1:
        		this.state = 60;
        		this.paragraph();
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 63; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,0, this._ctx);
        } while ( _alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
        this.state = 65;
        this.match(LUFileParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ParagraphContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_paragraph;
    return this;
}

ParagraphContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParagraphContext.prototype.constructor = ParagraphContext;

ParagraphContext.prototype.newline = function() {
    return this.getTypedRuleContext(NewlineContext,0);
};

ParagraphContext.prototype.intentDefinition = function() {
    return this.getTypedRuleContext(IntentDefinitionContext,0);
};

ParagraphContext.prototype.entityDefinition = function() {
    return this.getTypedRuleContext(EntityDefinitionContext,0);
};

ParagraphContext.prototype.importDefinition = function() {
    return this.getTypedRuleContext(ImportDefinitionContext,0);
};

ParagraphContext.prototype.qnaDefinition = function() {
    return this.getTypedRuleContext(QnaDefinitionContext,0);
};

ParagraphContext.prototype.modelInfoDefinition = function() {
    return this.getTypedRuleContext(ModelInfoDefinitionContext,0);
};

ParagraphContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterParagraph(this);
	}
};

ParagraphContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitParagraph(this);
	}
};

ParagraphContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitParagraph(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.ParagraphContext = ParagraphContext;

LUFileParser.prototype.paragraph = function() {

    var localctx = new ParagraphContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, LUFileParser.RULE_paragraph);
    try {
        this.state = 73;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case LUFileParser.EOF:
        case LUFileParser.NEWLINE:
            this.enterOuterAlt(localctx, 1);
            this.state = 67;
            this.newline();
            break;
        case LUFileParser.HASH:
            this.enterOuterAlt(localctx, 2);
            this.state = 68;
            this.intentDefinition();
            break;
        case LUFileParser.DOLLAR:
            this.enterOuterAlt(localctx, 3);
            this.state = 69;
            this.entityDefinition();
            break;
        case LUFileParser.IMPORT_DESC:
            this.enterOuterAlt(localctx, 4);
            this.state = 70;
            this.importDefinition();
            break;
        case LUFileParser.QNA:
            this.enterOuterAlt(localctx, 5);
            this.state = 71;
            this.qnaDefinition();
            break;
        case LUFileParser.MODEL_INFO:
            this.enterOuterAlt(localctx, 6);
            this.state = 72;
            this.modelInfoDefinition();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function NewlineContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_newline;
    return this;
}

NewlineContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NewlineContext.prototype.constructor = NewlineContext;

NewlineContext.prototype.NEWLINE = function() {
    return this.getToken(LUFileParser.NEWLINE, 0);
};

NewlineContext.prototype.EOF = function() {
    return this.getToken(LUFileParser.EOF, 0);
};

NewlineContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterNewline(this);
	}
};

NewlineContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitNewline(this);
	}
};

NewlineContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitNewline(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.NewlineContext = NewlineContext;

LUFileParser.prototype.newline = function() {

    var localctx = new NewlineContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, LUFileParser.RULE_newline);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 75;
        _la = this._input.LA(1);
        if(!(_la===LUFileParser.EOF || _la===LUFileParser.NEWLINE)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function IntentDefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_intentDefinition;
    return this;
}

IntentDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IntentDefinitionContext.prototype.constructor = IntentDefinitionContext;

IntentDefinitionContext.prototype.intentNameLine = function() {
    return this.getTypedRuleContext(IntentNameLineContext,0);
};

IntentDefinitionContext.prototype.newline = function() {
    return this.getTypedRuleContext(NewlineContext,0);
};

IntentDefinitionContext.prototype.intentBody = function() {
    return this.getTypedRuleContext(IntentBodyContext,0);
};

IntentDefinitionContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterIntentDefinition(this);
	}
};

IntentDefinitionContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitIntentDefinition(this);
	}
};

IntentDefinitionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitIntentDefinition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.IntentDefinitionContext = IntentDefinitionContext;

LUFileParser.prototype.intentDefinition = function() {

    var localctx = new IntentDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, LUFileParser.RULE_intentDefinition);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 77;
        this.intentNameLine();
        this.state = 78;
        this.newline();
        this.state = 80;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===LUFileParser.DASH) {
            this.state = 79;
            this.intentBody();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function IntentNameLineContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_intentNameLine;
    return this;
}

IntentNameLineContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IntentNameLineContext.prototype.constructor = IntentNameLineContext;

IntentNameLineContext.prototype.HASH = function() {
    return this.getToken(LUFileParser.HASH, 0);
};

IntentNameLineContext.prototype.intentName = function() {
    return this.getTypedRuleContext(IntentNameContext,0);
};

IntentNameLineContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterIntentNameLine(this);
	}
};

IntentNameLineContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitIntentNameLine(this);
	}
};

IntentNameLineContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitIntentNameLine(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.IntentNameLineContext = IntentNameLineContext;

LUFileParser.prototype.intentNameLine = function() {

    var localctx = new IntentNameLineContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, LUFileParser.RULE_intentNameLine);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 82;
        this.match(LUFileParser.HASH);
        this.state = 83;
        this.intentName();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function IntentNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_intentName;
    return this;
}

IntentNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IntentNameContext.prototype.constructor = IntentNameContext;

IntentNameContext.prototype.intentNameIdentifier = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(IntentNameIdentifierContext);
    } else {
        return this.getTypedRuleContext(IntentNameIdentifierContext,i);
    }
};

IntentNameContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.WS);
    } else {
        return this.getToken(LUFileParser.WS, i);
    }
};


IntentNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterIntentName(this);
	}
};

IntentNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitIntentName(this);
	}
};

IntentNameContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitIntentName(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.IntentNameContext = IntentNameContext;

LUFileParser.prototype.intentName = function() {

    var localctx = new IntentNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, LUFileParser.RULE_intentName);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        this.intentNameIdentifier();
        this.state = 90;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===LUFileParser.WS || _la===LUFileParser.IDENTIFIER) {
            this.state = 88;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case LUFileParser.WS:
                this.state = 86;
                this.match(LUFileParser.WS);
                break;
            case LUFileParser.IDENTIFIER:
                this.state = 87;
                this.intentNameIdentifier();
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 92;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function IntentNameIdentifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_intentNameIdentifier;
    return this;
}

IntentNameIdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IntentNameIdentifierContext.prototype.constructor = IntentNameIdentifierContext;

IntentNameIdentifierContext.prototype.IDENTIFIER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.IDENTIFIER);
    } else {
        return this.getToken(LUFileParser.IDENTIFIER, i);
    }
};


IntentNameIdentifierContext.prototype.DOT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.DOT);
    } else {
        return this.getToken(LUFileParser.DOT, i);
    }
};


IntentNameIdentifierContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterIntentNameIdentifier(this);
	}
};

IntentNameIdentifierContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitIntentNameIdentifier(this);
	}
};

IntentNameIdentifierContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitIntentNameIdentifier(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.IntentNameIdentifierContext = IntentNameIdentifierContext;

LUFileParser.prototype.intentNameIdentifier = function() {

    var localctx = new IntentNameIdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, LUFileParser.RULE_intentNameIdentifier);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 93;
        this.match(LUFileParser.IDENTIFIER);
        this.state = 98;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===LUFileParser.DOT) {
            this.state = 94;
            this.match(LUFileParser.DOT);
            this.state = 95;
            this.match(LUFileParser.IDENTIFIER);
            this.state = 100;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function IntentBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_intentBody;
    return this;
}

IntentBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IntentBodyContext.prototype.constructor = IntentBodyContext;

IntentBodyContext.prototype.normalIntentBody = function() {
    return this.getTypedRuleContext(NormalIntentBodyContext,0);
};

IntentBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterIntentBody(this);
	}
};

IntentBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitIntentBody(this);
	}
};

IntentBodyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitIntentBody(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.IntentBodyContext = IntentBodyContext;

LUFileParser.prototype.intentBody = function() {

    var localctx = new IntentBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, LUFileParser.RULE_intentBody);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 101;
        this.normalIntentBody();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function NormalIntentBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_normalIntentBody;
    return this;
}

NormalIntentBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NormalIntentBodyContext.prototype.constructor = NormalIntentBodyContext;

NormalIntentBodyContext.prototype.normalIntentString = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(NormalIntentStringContext);
    } else {
        return this.getTypedRuleContext(NormalIntentStringContext,i);
    }
};

NormalIntentBodyContext.prototype.newline = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(NewlineContext);
    } else {
        return this.getTypedRuleContext(NewlineContext,i);
    }
};

NormalIntentBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterNormalIntentBody(this);
	}
};

NormalIntentBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitNormalIntentBody(this);
	}
};

NormalIntentBodyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitNormalIntentBody(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.NormalIntentBodyContext = NormalIntentBodyContext;

LUFileParser.prototype.normalIntentBody = function() {

    var localctx = new NormalIntentBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, LUFileParser.RULE_normalIntentBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 106; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 103;
            this.normalIntentString();
            this.state = 104;
            this.newline();
            this.state = 108; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===LUFileParser.DASH);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function NormalIntentStringContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_normalIntentString;
    return this;
}

NormalIntentStringContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NormalIntentStringContext.prototype.constructor = NormalIntentStringContext;

NormalIntentStringContext.prototype.DASH = function() {
    return this.getToken(LUFileParser.DASH, 0);
};

NormalIntentStringContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.WS);
    } else {
        return this.getToken(LUFileParser.WS, i);
    }
};


NormalIntentStringContext.prototype.TEXT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.TEXT);
    } else {
        return this.getToken(LUFileParser.TEXT, i);
    }
};


NormalIntentStringContext.prototype.EXPRESSION = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.EXPRESSION);
    } else {
        return this.getToken(LUFileParser.EXPRESSION, i);
    }
};


NormalIntentStringContext.prototype.ESCAPE_CHARACTER = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.ESCAPE_CHARACTER);
    } else {
        return this.getToken(LUFileParser.ESCAPE_CHARACTER, i);
    }
};


NormalIntentStringContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterNormalIntentString(this);
	}
};

NormalIntentStringContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitNormalIntentString(this);
	}
};

NormalIntentStringContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitNormalIntentString(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.NormalIntentStringContext = NormalIntentStringContext;

LUFileParser.prototype.normalIntentString = function() {

    var localctx = new NormalIntentStringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, LUFileParser.RULE_normalIntentString);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 110;
        this.match(LUFileParser.DASH);
        this.state = 114;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << LUFileParser.WS) | (1 << LUFileParser.ESCAPE_CHARACTER) | (1 << LUFileParser.EXPRESSION) | (1 << LUFileParser.TEXT))) !== 0)) {
            this.state = 111;
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << LUFileParser.WS) | (1 << LUFileParser.ESCAPE_CHARACTER) | (1 << LUFileParser.EXPRESSION) | (1 << LUFileParser.TEXT))) !== 0))) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 116;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EntityDefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_entityDefinition;
    return this;
}

EntityDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EntityDefinitionContext.prototype.constructor = EntityDefinitionContext;

EntityDefinitionContext.prototype.entityLine = function() {
    return this.getTypedRuleContext(EntityLineContext,0);
};

EntityDefinitionContext.prototype.newline = function() {
    return this.getTypedRuleContext(NewlineContext,0);
};

EntityDefinitionContext.prototype.entityListBody = function() {
    return this.getTypedRuleContext(EntityListBodyContext,0);
};

EntityDefinitionContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterEntityDefinition(this);
	}
};

EntityDefinitionContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitEntityDefinition(this);
	}
};

EntityDefinitionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitEntityDefinition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.EntityDefinitionContext = EntityDefinitionContext;

LUFileParser.prototype.entityDefinition = function() {

    var localctx = new EntityDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, LUFileParser.RULE_entityDefinition);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 117;
        this.entityLine();
        this.state = 118;
        this.newline();
        this.state = 120;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===LUFileParser.DASH) {
            this.state = 119;
            this.entityListBody();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EntityLineContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_entityLine;
    return this;
}

EntityLineContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EntityLineContext.prototype.constructor = EntityLineContext;

EntityLineContext.prototype.DOLLAR = function() {
    return this.getToken(LUFileParser.DOLLAR, 0);
};

EntityLineContext.prototype.entityName = function() {
    return this.getTypedRuleContext(EntityNameContext,0);
};

EntityLineContext.prototype.COLON_MARK = function() {
    return this.getToken(LUFileParser.COLON_MARK, 0);
};

EntityLineContext.prototype.entityType = function() {
    return this.getTypedRuleContext(EntityTypeContext,0);
};

EntityLineContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterEntityLine(this);
	}
};

EntityLineContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitEntityLine(this);
	}
};

EntityLineContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitEntityLine(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.EntityLineContext = EntityLineContext;

LUFileParser.prototype.entityLine = function() {

    var localctx = new EntityLineContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, LUFileParser.RULE_entityLine);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 122;
        this.match(LUFileParser.DOLLAR);
        this.state = 123;
        this.entityName();
        this.state = 124;
        this.match(LUFileParser.COLON_MARK);
        this.state = 125;
        this.entityType();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EntityNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_entityName;
    return this;
}

EntityNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EntityNameContext.prototype.constructor = EntityNameContext;

EntityNameContext.prototype.entityIdentifier = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EntityIdentifierContext);
    } else {
        return this.getTypedRuleContext(EntityIdentifierContext,i);
    }
};

EntityNameContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.WS);
    } else {
        return this.getToken(LUFileParser.WS, i);
    }
};


EntityNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterEntityName(this);
	}
};

EntityNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitEntityName(this);
	}
};

EntityNameContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitEntityName(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.EntityNameContext = EntityNameContext;

LUFileParser.prototype.entityName = function() {

    var localctx = new EntityNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, LUFileParser.RULE_entityName);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 131;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===LUFileParser.WS || _la===LUFileParser.ENTITY_IDENTIFIER) {
            this.state = 129;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case LUFileParser.ENTITY_IDENTIFIER:
                this.state = 127;
                this.entityIdentifier();
                break;
            case LUFileParser.WS:
                this.state = 128;
                this.match(LUFileParser.WS);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 133;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EntityTypeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_entityType;
    return this;
}

EntityTypeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EntityTypeContext.prototype.constructor = EntityTypeContext;

EntityTypeContext.prototype.entityIdentifier = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EntityIdentifierContext);
    } else {
        return this.getTypedRuleContext(EntityIdentifierContext,i);
    }
};

EntityTypeContext.prototype.compositeEntityIdentifier = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CompositeEntityIdentifierContext);
    } else {
        return this.getTypedRuleContext(CompositeEntityIdentifierContext,i);
    }
};

EntityTypeContext.prototype.regexEntityIdentifier = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RegexEntityIdentifierContext);
    } else {
        return this.getTypedRuleContext(RegexEntityIdentifierContext,i);
    }
};

EntityTypeContext.prototype.SPECIAL_CHAR_MARK = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.SPECIAL_CHAR_MARK);
    } else {
        return this.getToken(LUFileParser.SPECIAL_CHAR_MARK, i);
    }
};


EntityTypeContext.prototype.COLON_MARK = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.COLON_MARK);
    } else {
        return this.getToken(LUFileParser.COLON_MARK, i);
    }
};


EntityTypeContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.WS);
    } else {
        return this.getToken(LUFileParser.WS, i);
    }
};


EntityTypeContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterEntityType(this);
	}
};

EntityTypeContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitEntityType(this);
	}
};

EntityTypeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitEntityType(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.EntityTypeContext = EntityTypeContext;

LUFileParser.prototype.entityType = function() {

    var localctx = new EntityTypeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, LUFileParser.RULE_entityType);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 142;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << LUFileParser.WS) | (1 << LUFileParser.ENTITY_IDENTIFIER) | (1 << LUFileParser.COMPOSITE_ENTITY) | (1 << LUFileParser.REGEX_ENTITY) | (1 << LUFileParser.COLON_MARK) | (1 << LUFileParser.SPECIAL_CHAR_MARK))) !== 0)) {
            this.state = 140;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case LUFileParser.ENTITY_IDENTIFIER:
                this.state = 134;
                this.entityIdentifier();
                break;
            case LUFileParser.COMPOSITE_ENTITY:
                this.state = 135;
                this.compositeEntityIdentifier();
                break;
            case LUFileParser.REGEX_ENTITY:
                this.state = 136;
                this.regexEntityIdentifier();
                break;
            case LUFileParser.SPECIAL_CHAR_MARK:
                this.state = 137;
                this.match(LUFileParser.SPECIAL_CHAR_MARK);
                break;
            case LUFileParser.COLON_MARK:
                this.state = 138;
                this.match(LUFileParser.COLON_MARK);
                break;
            case LUFileParser.WS:
                this.state = 139;
                this.match(LUFileParser.WS);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 144;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function CompositeEntityIdentifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_compositeEntityIdentifier;
    return this;
}

CompositeEntityIdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CompositeEntityIdentifierContext.prototype.constructor = CompositeEntityIdentifierContext;

CompositeEntityIdentifierContext.prototype.COMPOSITE_ENTITY = function() {
    return this.getToken(LUFileParser.COMPOSITE_ENTITY, 0);
};

CompositeEntityIdentifierContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterCompositeEntityIdentifier(this);
	}
};

CompositeEntityIdentifierContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitCompositeEntityIdentifier(this);
	}
};

CompositeEntityIdentifierContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitCompositeEntityIdentifier(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.CompositeEntityIdentifierContext = CompositeEntityIdentifierContext;

LUFileParser.prototype.compositeEntityIdentifier = function() {

    var localctx = new CompositeEntityIdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, LUFileParser.RULE_compositeEntityIdentifier);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 145;
        this.match(LUFileParser.COMPOSITE_ENTITY);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function RegexEntityIdentifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_regexEntityIdentifier;
    return this;
}

RegexEntityIdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RegexEntityIdentifierContext.prototype.constructor = RegexEntityIdentifierContext;

RegexEntityIdentifierContext.prototype.REGEX_ENTITY = function() {
    return this.getToken(LUFileParser.REGEX_ENTITY, 0);
};

RegexEntityIdentifierContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterRegexEntityIdentifier(this);
	}
};

RegexEntityIdentifierContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitRegexEntityIdentifier(this);
	}
};

RegexEntityIdentifierContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitRegexEntityIdentifier(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.RegexEntityIdentifierContext = RegexEntityIdentifierContext;

LUFileParser.prototype.regexEntityIdentifier = function() {

    var localctx = new RegexEntityIdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, LUFileParser.RULE_regexEntityIdentifier);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 147;
        this.match(LUFileParser.REGEX_ENTITY);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EntityIdentifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_entityIdentifier;
    return this;
}

EntityIdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EntityIdentifierContext.prototype.constructor = EntityIdentifierContext;

EntityIdentifierContext.prototype.ENTITY_IDENTIFIER = function() {
    return this.getToken(LUFileParser.ENTITY_IDENTIFIER, 0);
};

EntityIdentifierContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterEntityIdentifier(this);
	}
};

EntityIdentifierContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitEntityIdentifier(this);
	}
};

EntityIdentifierContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitEntityIdentifier(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.EntityIdentifierContext = EntityIdentifierContext;

LUFileParser.prototype.entityIdentifier = function() {

    var localctx = new EntityIdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, LUFileParser.RULE_entityIdentifier);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 149;
        this.match(LUFileParser.ENTITY_IDENTIFIER);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EntityListBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_entityListBody;
    return this;
}

EntityListBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EntityListBodyContext.prototype.constructor = EntityListBodyContext;

EntityListBodyContext.prototype.normalItemString = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(NormalItemStringContext);
    } else {
        return this.getTypedRuleContext(NormalItemStringContext,i);
    }
};

EntityListBodyContext.prototype.newline = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(NewlineContext);
    } else {
        return this.getTypedRuleContext(NewlineContext,i);
    }
};

EntityListBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterEntityListBody(this);
	}
};

EntityListBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitEntityListBody(this);
	}
};

EntityListBodyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitEntityListBody(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.EntityListBodyContext = EntityListBodyContext;

LUFileParser.prototype.entityListBody = function() {

    var localctx = new EntityListBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, LUFileParser.RULE_entityListBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 154; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 151;
            this.normalItemString();
            this.state = 152;
            this.newline();
            this.state = 156; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===LUFileParser.DASH);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function NormalItemStringContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_normalItemString;
    return this;
}

NormalItemStringContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NormalItemStringContext.prototype.constructor = NormalItemStringContext;

NormalItemStringContext.prototype.DASH = function() {
    return this.getToken(LUFileParser.DASH, 0);
};

NormalItemStringContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.WS);
    } else {
        return this.getToken(LUFileParser.WS, i);
    }
};


NormalItemStringContext.prototype.TEXT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.TEXT);
    } else {
        return this.getToken(LUFileParser.TEXT, i);
    }
};


NormalItemStringContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterNormalItemString(this);
	}
};

NormalItemStringContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitNormalItemString(this);
	}
};

NormalItemStringContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitNormalItemString(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.NormalItemStringContext = NormalItemStringContext;

LUFileParser.prototype.normalItemString = function() {

    var localctx = new NormalItemStringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, LUFileParser.RULE_normalItemString);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 158;
        this.match(LUFileParser.DASH);
        this.state = 162;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===LUFileParser.WS || _la===LUFileParser.TEXT) {
            this.state = 159;
            _la = this._input.LA(1);
            if(!(_la===LUFileParser.WS || _la===LUFileParser.TEXT)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 164;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ImportDefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_importDefinition;
    return this;
}

ImportDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ImportDefinitionContext.prototype.constructor = ImportDefinitionContext;

ImportDefinitionContext.prototype.IMPORT_DESC = function() {
    return this.getToken(LUFileParser.IMPORT_DESC, 0);
};

ImportDefinitionContext.prototype.IMPORT_PATH = function() {
    return this.getToken(LUFileParser.IMPORT_PATH, 0);
};

ImportDefinitionContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterImportDefinition(this);
	}
};

ImportDefinitionContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitImportDefinition(this);
	}
};

ImportDefinitionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitImportDefinition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.ImportDefinitionContext = ImportDefinitionContext;

LUFileParser.prototype.importDefinition = function() {

    var localctx = new ImportDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, LUFileParser.RULE_importDefinition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 165;
        this.match(LUFileParser.IMPORT_DESC);
        this.state = 166;
        this.match(LUFileParser.IMPORT_PATH);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function QnaDefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_qnaDefinition;
    return this;
}

QnaDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
QnaDefinitionContext.prototype.constructor = QnaDefinitionContext;

QnaDefinitionContext.prototype.qnaQuestion = function() {
    return this.getTypedRuleContext(QnaQuestionContext,0);
};

QnaDefinitionContext.prototype.moreQuestionsBody = function() {
    return this.getTypedRuleContext(MoreQuestionsBodyContext,0);
};

QnaDefinitionContext.prototype.qnaAnswerBody = function() {
    return this.getTypedRuleContext(QnaAnswerBodyContext,0);
};

QnaDefinitionContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterQnaDefinition(this);
	}
};

QnaDefinitionContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitQnaDefinition(this);
	}
};

QnaDefinitionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitQnaDefinition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.QnaDefinitionContext = QnaDefinitionContext;

LUFileParser.prototype.qnaDefinition = function() {

    var localctx = new QnaDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, LUFileParser.RULE_qnaDefinition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 168;
        this.qnaQuestion();
        this.state = 169;
        this.moreQuestionsBody();
        this.state = 170;
        this.qnaAnswerBody();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function QnaQuestionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_qnaQuestion;
    return this;
}

QnaQuestionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
QnaQuestionContext.prototype.constructor = QnaQuestionContext;

QnaQuestionContext.prototype.QNA = function() {
    return this.getToken(LUFileParser.QNA, 0);
};

QnaQuestionContext.prototype.questionText = function() {
    return this.getTypedRuleContext(QuestionTextContext,0);
};

QnaQuestionContext.prototype.newline = function() {
    return this.getTypedRuleContext(NewlineContext,0);
};

QnaQuestionContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterQnaQuestion(this);
	}
};

QnaQuestionContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitQnaQuestion(this);
	}
};

QnaQuestionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitQnaQuestion(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.QnaQuestionContext = QnaQuestionContext;

LUFileParser.prototype.qnaQuestion = function() {

    var localctx = new QnaQuestionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, LUFileParser.RULE_qnaQuestion);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 172;
        this.match(LUFileParser.QNA);
        this.state = 173;
        this.questionText();
        this.state = 174;
        this.newline();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function QuestionTextContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_questionText;
    return this;
}

QuestionTextContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
QuestionTextContext.prototype.constructor = QuestionTextContext;

QuestionTextContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.WS);
    } else {
        return this.getToken(LUFileParser.WS, i);
    }
};


QuestionTextContext.prototype.QNA_TEXT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.QNA_TEXT);
    } else {
        return this.getToken(LUFileParser.QNA_TEXT, i);
    }
};


QuestionTextContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterQuestionText(this);
	}
};

QuestionTextContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitQuestionText(this);
	}
};

QuestionTextContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitQuestionText(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.QuestionTextContext = QuestionTextContext;

LUFileParser.prototype.questionText = function() {

    var localctx = new QuestionTextContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, LUFileParser.RULE_questionText);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 179;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===LUFileParser.WS || _la===LUFileParser.QNA_TEXT) {
            this.state = 176;
            _la = this._input.LA(1);
            if(!(_la===LUFileParser.WS || _la===LUFileParser.QNA_TEXT)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 181;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function MoreQuestionsBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_moreQuestionsBody;
    return this;
}

MoreQuestionsBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MoreQuestionsBodyContext.prototype.constructor = MoreQuestionsBodyContext;

MoreQuestionsBodyContext.prototype.moreQuestion = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(MoreQuestionContext);
    } else {
        return this.getTypedRuleContext(MoreQuestionContext,i);
    }
};

MoreQuestionsBodyContext.prototype.newline = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(NewlineContext);
    } else {
        return this.getTypedRuleContext(NewlineContext,i);
    }
};

MoreQuestionsBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterMoreQuestionsBody(this);
	}
};

MoreQuestionsBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitMoreQuestionsBody(this);
	}
};

MoreQuestionsBodyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitMoreQuestionsBody(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.MoreQuestionsBodyContext = MoreQuestionsBodyContext;

LUFileParser.prototype.moreQuestionsBody = function() {

    var localctx = new MoreQuestionsBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, LUFileParser.RULE_moreQuestionsBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 187;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===LUFileParser.DASH) {
            this.state = 182;
            this.moreQuestion();
            this.state = 183;
            this.newline();
            this.state = 189;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function MoreQuestionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_moreQuestion;
    return this;
}

MoreQuestionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MoreQuestionContext.prototype.constructor = MoreQuestionContext;

MoreQuestionContext.prototype.DASH = function() {
    return this.getToken(LUFileParser.DASH, 0);
};

MoreQuestionContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.WS);
    } else {
        return this.getToken(LUFileParser.WS, i);
    }
};


MoreQuestionContext.prototype.TEXT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.TEXT);
    } else {
        return this.getToken(LUFileParser.TEXT, i);
    }
};


MoreQuestionContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterMoreQuestion(this);
	}
};

MoreQuestionContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitMoreQuestion(this);
	}
};

MoreQuestionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitMoreQuestion(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.MoreQuestionContext = MoreQuestionContext;

LUFileParser.prototype.moreQuestion = function() {

    var localctx = new MoreQuestionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, LUFileParser.RULE_moreQuestion);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 190;
        this.match(LUFileParser.DASH);
        this.state = 194;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===LUFileParser.WS || _la===LUFileParser.TEXT) {
            this.state = 191;
            _la = this._input.LA(1);
            if(!(_la===LUFileParser.WS || _la===LUFileParser.TEXT)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 196;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function QnaAnswerBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_qnaAnswerBody;
    return this;
}

QnaAnswerBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
QnaAnswerBodyContext.prototype.constructor = QnaAnswerBodyContext;

QnaAnswerBodyContext.prototype.multiLineAnswer = function() {
    return this.getTypedRuleContext(MultiLineAnswerContext,0);
};

QnaAnswerBodyContext.prototype.filterSection = function() {
    return this.getTypedRuleContext(FilterSectionContext,0);
};

QnaAnswerBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterQnaAnswerBody(this);
	}
};

QnaAnswerBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitQnaAnswerBody(this);
	}
};

QnaAnswerBodyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitQnaAnswerBody(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.QnaAnswerBodyContext = QnaAnswerBodyContext;

LUFileParser.prototype.qnaAnswerBody = function() {

    var localctx = new QnaAnswerBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, LUFileParser.RULE_qnaAnswerBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 198;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===LUFileParser.FILTER_MARK) {
            this.state = 197;
            this.filterSection();
        }

        this.state = 200;
        this.multiLineAnswer();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function FilterSectionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_filterSection;
    return this;
}

FilterSectionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FilterSectionContext.prototype.constructor = FilterSectionContext;

FilterSectionContext.prototype.FILTER_MARK = function() {
    return this.getToken(LUFileParser.FILTER_MARK, 0);
};

FilterSectionContext.prototype.filterLine = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FilterLineContext);
    } else {
        return this.getTypedRuleContext(FilterLineContext,i);
    }
};

FilterSectionContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterFilterSection(this);
	}
};

FilterSectionContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitFilterSection(this);
	}
};

FilterSectionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitFilterSection(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.FilterSectionContext = FilterSectionContext;

LUFileParser.prototype.filterSection = function() {

    var localctx = new FilterSectionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, LUFileParser.RULE_filterSection);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 202;
        this.match(LUFileParser.FILTER_MARK);
        this.state = 204; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 203;
            this.filterLine();
            this.state = 206; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===LUFileParser.DASH);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function FilterLineContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_filterLine;
    return this;
}

FilterLineContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FilterLineContext.prototype.constructor = FilterLineContext;

FilterLineContext.prototype.DASH = function() {
    return this.getToken(LUFileParser.DASH, 0);
};

FilterLineContext.prototype.newline = function() {
    return this.getTypedRuleContext(NewlineContext,0);
};

FilterLineContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.WS);
    } else {
        return this.getToken(LUFileParser.WS, i);
    }
};


FilterLineContext.prototype.TEXT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(LUFileParser.TEXT);
    } else {
        return this.getToken(LUFileParser.TEXT, i);
    }
};


FilterLineContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterFilterLine(this);
	}
};

FilterLineContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitFilterLine(this);
	}
};

FilterLineContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitFilterLine(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.FilterLineContext = FilterLineContext;

LUFileParser.prototype.filterLine = function() {

    var localctx = new FilterLineContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, LUFileParser.RULE_filterLine);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 208;
        this.match(LUFileParser.DASH);
        this.state = 212;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===LUFileParser.WS || _la===LUFileParser.TEXT) {
            this.state = 209;
            _la = this._input.LA(1);
            if(!(_la===LUFileParser.WS || _la===LUFileParser.TEXT)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 214;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 215;
        this.newline();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function MultiLineAnswerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_multiLineAnswer;
    return this;
}

MultiLineAnswerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MultiLineAnswerContext.prototype.constructor = MultiLineAnswerContext;

MultiLineAnswerContext.prototype.MULTI_LINE_TEXT = function() {
    return this.getToken(LUFileParser.MULTI_LINE_TEXT, 0);
};

MultiLineAnswerContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterMultiLineAnswer(this);
	}
};

MultiLineAnswerContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitMultiLineAnswer(this);
	}
};

MultiLineAnswerContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitMultiLineAnswer(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.MultiLineAnswerContext = MultiLineAnswerContext;

LUFileParser.prototype.multiLineAnswer = function() {

    var localctx = new MultiLineAnswerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 56, LUFileParser.RULE_multiLineAnswer);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 217;
        this.match(LUFileParser.MULTI_LINE_TEXT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ModelInfoDefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = LUFileParser.RULE_modelInfoDefinition;
    return this;
}

ModelInfoDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ModelInfoDefinitionContext.prototype.constructor = ModelInfoDefinitionContext;

ModelInfoDefinitionContext.prototype.MODEL_INFO = function() {
    return this.getToken(LUFileParser.MODEL_INFO, 0);
};

ModelInfoDefinitionContext.prototype.enterRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.enterModelInfoDefinition(this);
	}
};

ModelInfoDefinitionContext.prototype.exitRule = function(listener) {
    if(listener instanceof LUFileParserListener ) {
        listener.exitModelInfoDefinition(this);
	}
};

ModelInfoDefinitionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof LUFileParserVisitor ) {
        return visitor.visitModelInfoDefinition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




LUFileParser.ModelInfoDefinitionContext = ModelInfoDefinitionContext;

LUFileParser.prototype.modelInfoDefinition = function() {

    var localctx = new ModelInfoDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 58, LUFileParser.RULE_modelInfoDefinition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 219;
        this.match(LUFileParser.MODEL_INFO);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.LUFileParser = LUFileParser;
