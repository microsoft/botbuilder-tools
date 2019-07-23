// Generated from ../LUFileLexer.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0014\u0118\b\u0001\b\u0001\b\u0001\b\u0001\u0004\u0002\t\u0002",
    "\u0004\u0003\t\u0003\u0004\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006",
    "\t\u0006\u0004\u0007\t\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004",
    "\u000b\t\u000b\u0004\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f",
    "\t\u000f\u0004\u0010\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012",
    "\u0004\u0013\t\u0013\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016",
    "\t\u0016\u0004\u0017\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019",
    "\u0004\u001a\t\u001a\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0004\u001d",
    "\t\u001d\u0004\u001e\t\u001e\u0004\u001f\t\u001f\u0004 \t \u0004!\t",
    "!\u0004\"\t\"\u0004#\t#\u0004$\t$\u0004%\t%\u0004&\t&\u0004\'\t\'\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003",
    "\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003",
    "\f\u0003\f\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000f\u0003",
    "\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0007\u0011s",
    "\n\u0011\f\u0011\u000e\u0011v\u000b\u0011\u0003\u0011\u0003\u0011\u0003",
    "\u0011\u0007\u0011{\n\u0011\f\u0011\u000e\u0011~\u000b\u0011\u0003\u0011",
    "\u0005\u0011\u0081\n\u0011\u0003\u0012\u0003\u0012\u0006\u0012\u0085",
    "\n\u0012\r\u0012\u000e\u0012\u0086\u0003\u0012\u0003\u0012\u0003\u0013",
    "\u0006\u0013\u008c\n\u0013\r\u0013\u000e\u0013\u008d\u0003\u0013\u0003",
    "\u0013\u0003\u0014\u0005\u0014\u0093\n\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0018\u0006\u0018",
    "\u00a8\n\u0018\r\u0018\u000e\u0018\u00a9\u0003\u0018\u0003\u0018\u0003",
    "\u0019\u0005\u0019\u00af\n\u0019\u0003\u0019\u0003\u0019\u0003\u0019",
    "\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0003\u001a\u0005\u001a",
    "\u00b9\n\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0007\u001a\u00be",
    "\n\u001a\f\u001a\u000e\u001a\u00c1\u000b\u001a\u0003\u001b\u0003\u001b",
    "\u0003\u001c\u0006\u001c\u00c6\n\u001c\r\u001c\u000e\u001c\u00c7\u0003",
    "\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001d\u0006\u001d\u00cf",
    "\n\u001d\r\u001d\u000e\u001d\u00d0\u0003\u001d\u0003\u001d\u0003\u001e",
    "\u0005\u001e\u00d6\n\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003",
    "\u001e\u0003\u001e\u0003\u001e\u0003\u001f\u0003\u001f\u0003\u001f\u0003",
    "\u001f\u0003\u001f\u0003\u001f\u0003\u001f\u0003\u001f\u0003\u001f\u0005",
    "\u001f\u00e7\n\u001f\u0003 \u0003 \u0005 \u00eb\n \u0003!\u0003!\u0003",
    "!\u0007!\u00f0\n!\f!\u000e!\u00f3\u000b!\u0003!\u0003!\u0003!\u0003",
    "\"\u0003\"\u0003\"\u0003#\u0006#\u00fc\n#\r#\u000e#\u00fd\u0003#\u0003",
    "#\u0003$\u0006$\u0103\n$\r$\u000e$\u0104\u0003$\u0003$\u0003%\u0005",
    "%\u010a\n%\u0003%\u0003%\u0003%\u0003%\u0003%\u0003&\u0003&\u0006&\u0113",
    "\n&\r&\u000e&\u0114\u0003\'\u0003\'\u0002\u0002(\u0006\u0002\b\u0002",
    "\n\u0002\f\u0002\u000e\u0002\u0010\u0002\u0012\u0002\u0014\u0002\u0016",
    "\u0002\u0018\u0002\u001a\u0002\u001c\u0002\u001e\u0002 \u0002\"\u0002",
    "$\u0002&\u0003(\u0004*\u0005,\u0006.\u00070\b2\t4\u00026\n8\u000b:\f",
    "<\u0002>\u0002@\rB\u000eD\u000fF\u0010H\u0011J\u0012L\u0002N\u0013P",
    "\u0014\u0006\u0002\u0003\u0004\u0005\u0018\u0004\u0002C\\c|\u0006\u0002",
    "\u000b\u000b\"\"\u00a2\u00a2\uff01\uff01\u0004\u0002CCcc\u0004\u0002",
    "EEee\u0004\u0002FFff\u0004\u0002GGgg\u0004\u0002HHhh\u0004\u0002JJj",
    "j\u0004\u0002KKkk\u0004\u0002NNnn\u0004\u0002UUuu\u0004\u0002VVvv\u0004",
    "\u0002WWww\u0004\u0002YYyy\u0005\u0002\f\f\u000f\u000f))\u0005\u0002",
    "\f\f\u000f\u000f$$\u0004\u0002\f\f\u000f\u000f\u0004\u0002//aa\u0007",
    "\u0002__ppttvv\u007f\u007f\u0006\u0002\f\f\u000f\u000f}}\u007f\u007f",
    "\n\u0002\u000b\f\u000f\u000f\"\"*+]]__}}\u007f\u007f\t\u0002\u000b\f",
    "\u000f\u000f\"\"*+]_}}\u007f\u007f\u0002\u011f\u0002&\u0003\u0002\u0002",
    "\u0002\u0002(\u0003\u0002\u0002\u0002\u0002*\u0003\u0002\u0002\u0002",
    "\u0002,\u0003\u0002\u0002\u0002\u0002.\u0003\u0002\u0002\u0002\u0002",
    "0\u0003\u0002\u0002\u0002\u00032\u0003\u0002\u0002\u0002\u00034\u0003",
    "\u0002\u0002\u0002\u00036\u0003\u0002\u0002\u0002\u00038\u0003\u0002",
    "\u0002\u0002\u0004:\u0003\u0002\u0002\u0002\u0004<\u0003\u0002\u0002",
    "\u0002\u0004>\u0003\u0002\u0002\u0002\u0004@\u0003\u0002\u0002\u0002",
    "\u0004B\u0003\u0002\u0002\u0002\u0004D\u0003\u0002\u0002\u0002\u0004",
    "F\u0003\u0002\u0002\u0002\u0004H\u0003\u0002\u0002\u0002\u0005J\u0003",
    "\u0002\u0002\u0002\u0005L\u0003\u0002\u0002\u0002\u0005N\u0003\u0002",
    "\u0002\u0002\u0005P\u0003\u0002\u0002\u0002\u0006R\u0003\u0002\u0002",
    "\u0002\bT\u0003\u0002\u0002\u0002\nV\u0003\u0002\u0002\u0002\fX\u0003",
    "\u0002\u0002\u0002\u000eZ\u0003\u0002\u0002\u0002\u0010\\\u0003\u0002",
    "\u0002\u0002\u0012^\u0003\u0002\u0002\u0002\u0014`\u0003\u0002\u0002",
    "\u0002\u0016b\u0003\u0002\u0002\u0002\u0018d\u0003\u0002\u0002\u0002",
    "\u001af\u0003\u0002\u0002\u0002\u001ch\u0003\u0002\u0002\u0002\u001e",
    "j\u0003\u0002\u0002\u0002 l\u0003\u0002\u0002\u0002\"n\u0003\u0002\u0002",
    "\u0002$\u0080\u0003\u0002\u0002\u0002&\u0082\u0003\u0002\u0002\u0002",
    "(\u008b\u0003\u0002\u0002\u0002*\u0092\u0003\u0002\u0002\u0002,\u0098",
    "\u0003\u0002\u0002\u0002.\u009c\u0003\u0002\u0002\u00020\u00a1\u0003",
    "\u0002\u0002\u00022\u00a7\u0003\u0002\u0002\u00024\u00ae\u0003\u0002",
    "\u0002\u00026\u00b8\u0003\u0002\u0002\u00028\u00c2\u0003\u0002\u0002",
    "\u0002:\u00c5\u0003\u0002\u0002\u0002<\u00ce\u0003\u0002\u0002\u0002",
    ">\u00d5\u0003\u0002\u0002\u0002@\u00e6\u0003\u0002\u0002\u0002B\u00e8",
    "\u0003\u0002\u0002\u0002D\u00ec\u0003\u0002\u0002\u0002F\u00f7\u0003",
    "\u0002\u0002\u0002H\u00fb\u0003\u0002\u0002\u0002J\u0102\u0003\u0002",
    "\u0002\u0002L\u0109\u0003\u0002\u0002\u0002N\u0112\u0003\u0002\u0002",
    "\u0002P\u0116\u0003\u0002\u0002\u0002RS\t\u0002\u0002\u0002S\u0007\u0003",
    "\u0002\u0002\u0002TU\u00042;\u0002U\t\u0003\u0002\u0002\u0002VW\t\u0003",
    "\u0002\u0002W\u000b\u0003\u0002\u0002\u0002XY\t\u0004\u0002\u0002Y\r",
    "\u0003\u0002\u0002\u0002Z[\t\u0005\u0002\u0002[\u000f\u0003\u0002\u0002",
    "\u0002\\]\t\u0006\u0002\u0002]\u0011\u0003\u0002\u0002\u0002^_\t\u0007",
    "\u0002\u0002_\u0013\u0003\u0002\u0002\u0002`a\t\b\u0002\u0002a\u0015",
    "\u0003\u0002\u0002\u0002bc\t\t\u0002\u0002c\u0017\u0003\u0002\u0002",
    "\u0002de\t\n\u0002\u0002e\u0019\u0003\u0002\u0002\u0002fg\t\u000b\u0002",
    "\u0002g\u001b\u0003\u0002\u0002\u0002hi\t\f\u0002\u0002i\u001d\u0003",
    "\u0002\u0002\u0002jk\t\r\u0002\u0002k\u001f\u0003\u0002\u0002\u0002",
    "lm\t\u000e\u0002\u0002m!\u0003\u0002\u0002\u0002no\t\u000f\u0002\u0002",
    "o#\u0003\u0002\u0002\u0002pt\u0007)\u0002\u0002qs\n\u0010\u0002\u0002",
    "rq\u0003\u0002\u0002\u0002sv\u0003\u0002\u0002\u0002tr\u0003\u0002\u0002",
    "\u0002tu\u0003\u0002\u0002\u0002uw\u0003\u0002\u0002\u0002vt\u0003\u0002",
    "\u0002\u0002w\u0081\u0007)\u0002\u0002x|\u0007$\u0002\u0002y{\n\u0011",
    "\u0002\u0002zy\u0003\u0002\u0002\u0002{~\u0003\u0002\u0002\u0002|z\u0003",
    "\u0002\u0002\u0002|}\u0003\u0002\u0002\u0002}\u007f\u0003\u0002\u0002",
    "\u0002~|\u0003\u0002\u0002\u0002\u007f\u0081\u0007$\u0002\u0002\u0080",
    "p\u0003\u0002\u0002\u0002\u0080x\u0003\u0002\u0002\u0002\u0081%\u0003",
    "\u0002\u0002\u0002\u0082\u0084\u0007@\u0002\u0002\u0083\u0085\n\u0012",
    "\u0002\u0002\u0084\u0083\u0003\u0002\u0002\u0002\u0085\u0086\u0003\u0002",
    "\u0002\u0002\u0086\u0084\u0003\u0002\u0002\u0002\u0086\u0087\u0003\u0002",
    "\u0002\u0002\u0087\u0088\u0003\u0002\u0002\u0002\u0088\u0089\b\u0012",
    "\u0002\u0002\u0089\'\u0003\u0002\u0002\u0002\u008a\u008c\u0005\n\u0004",
    "\u0002\u008b\u008a\u0003\u0002\u0002\u0002\u008c\u008d\u0003\u0002\u0002",
    "\u0002\u008d\u008b\u0003\u0002\u0002\u0002\u008d\u008e\u0003\u0002\u0002",
    "\u0002\u008e\u008f\u0003\u0002\u0002\u0002\u008f\u0090\b\u0013\u0002",
    "\u0002\u0090)\u0003\u0002\u0002\u0002\u0091\u0093\u0007\u000f\u0002",
    "\u0002\u0092\u0091\u0003\u0002\u0002\u0002\u0092\u0093\u0003\u0002\u0002",
    "\u0002\u0093\u0094\u0003\u0002\u0002\u0002\u0094\u0095\u0007\f\u0002",
    "\u0002\u0095\u0096\u0003\u0002\u0002\u0002\u0096\u0097\b\u0014\u0002",
    "\u0002\u0097+\u0003\u0002\u0002\u0002\u0098\u0099\u0007%\u0002\u0002",
    "\u0099\u009a\u0003\u0002\u0002\u0002\u009a\u009b\b\u0015\u0003\u0002",
    "\u009b-\u0003\u0002\u0002\u0002\u009c\u009d\u0007/\u0002\u0002\u009d",
    "\u009e\b\u0016\u0004\u0002\u009e\u009f\u0003\u0002\u0002\u0002\u009f",
    "\u00a0\b\u0016\u0005\u0002\u00a0/\u0003\u0002\u0002\u0002\u00a1\u00a2",
    "\u0007&\u0002\u0002\u00a2\u00a3\b\u0017\u0006\u0002\u00a3\u00a4\u0003",
    "\u0002\u0002\u0002\u00a4\u00a5\b\u0017\u0007\u0002\u00a51\u0003\u0002",
    "\u0002\u0002\u00a6\u00a8\u0005\n\u0004\u0002\u00a7\u00a6\u0003\u0002",
    "\u0002\u0002\u00a8\u00a9\u0003\u0002\u0002\u0002\u00a9\u00a7\u0003\u0002",
    "\u0002\u0002\u00a9\u00aa\u0003\u0002\u0002\u0002\u00aa\u00ab\u0003\u0002",
    "\u0002\u0002\u00ab\u00ac\b\u0018\u0002\u0002\u00ac3\u0003\u0002\u0002",
    "\u0002\u00ad\u00af\u0007\u000f\u0002\u0002\u00ae\u00ad\u0003\u0002\u0002",
    "\u0002\u00ae\u00af\u0003\u0002\u0002\u0002\u00af\u00b0\u0003\u0002\u0002",
    "\u0002\u00b0\u00b1\u0007\f\u0002\u0002\u00b1\u00b2\u0003\u0002\u0002",
    "\u0002\u00b2\u00b3\b\u0019\b\u0002\u00b3\u00b4\b\u0019\t\u0002\u00b4",
    "5\u0003\u0002\u0002\u0002\u00b5\u00b9\u0005\u0006\u0002\u0002\u00b6",
    "\u00b9\u0005\b\u0003\u0002\u00b7\u00b9\u0007a\u0002\u0002\u00b8\u00b5",
    "\u0003\u0002\u0002\u0002\u00b8\u00b6\u0003\u0002\u0002\u0002\u00b8\u00b7",
    "\u0003\u0002\u0002\u0002\u00b9\u00bf\u0003\u0002\u0002\u0002\u00ba\u00be",
    "\u0005\u0006\u0002\u0002\u00bb\u00be\u0005\b\u0003\u0002\u00bc\u00be",
    "\t\u0013\u0002\u0002\u00bd\u00ba\u0003\u0002\u0002\u0002\u00bd\u00bb",
    "\u0003\u0002\u0002\u0002\u00bd\u00bc\u0003\u0002\u0002\u0002\u00be\u00c1",
    "\u0003\u0002\u0002\u0002\u00bf\u00bd\u0003\u0002\u0002\u0002\u00bf\u00c0",
    "\u0003\u0002\u0002\u0002\u00c07\u0003\u0002\u0002\u0002\u00c1\u00bf",
    "\u0003\u0002\u0002\u0002\u00c2\u00c3\u00070\u0002\u0002\u00c39\u0003",
    "\u0002\u0002\u0002\u00c4\u00c6\u0005\n\u0004\u0002\u00c5\u00c4\u0003",
    "\u0002\u0002\u0002\u00c6\u00c7\u0003\u0002\u0002\u0002\u00c7\u00c5\u0003",
    "\u0002\u0002\u0002\u00c7\u00c8\u0003\u0002\u0002\u0002\u00c8\u00c9\u0003",
    "\u0002\u0002\u0002\u00c9\u00ca\u0006\u001c\u0002\u0002\u00ca\u00cb\u0003",
    "\u0002\u0002\u0002\u00cb\u00cc\b\u001c\u0002\u0002\u00cc;\u0003\u0002",
    "\u0002\u0002\u00cd\u00cf\u0005\n\u0004\u0002\u00ce\u00cd\u0003\u0002",
    "\u0002\u0002\u00cf\u00d0\u0003\u0002\u0002\u0002\u00d0\u00ce\u0003\u0002",
    "\u0002\u0002\u00d0\u00d1\u0003\u0002\u0002\u0002\u00d1\u00d2\u0003\u0002",
    "\u0002\u0002\u00d2\u00d3\b\u001d\n\u0002\u00d3=\u0003\u0002\u0002\u0002",
    "\u00d4\u00d6\u0007\u000f\u0002\u0002\u00d5\u00d4\u0003\u0002\u0002\u0002",
    "\u00d5\u00d6\u0003\u0002\u0002\u0002\u00d6\u00d7\u0003\u0002\u0002\u0002",
    "\u00d7\u00d8\u0007\f\u0002\u0002\u00d8\u00d9\b\u001e\u000b\u0002\u00d9",
    "\u00da\u0003\u0002\u0002\u0002\u00da\u00db\b\u001e\b\u0002\u00db\u00dc",
    "\b\u001e\t\u0002\u00dc?\u0003\u0002\u0002\u0002\u00dd\u00de\u0007^\u0002",
    "\u0002\u00de\u00e7\u0007}\u0002\u0002\u00df\u00e0\u0007^\u0002\u0002",
    "\u00e0\u00e7\u0007]\u0002\u0002\u00e1\u00e2\u0007^\u0002\u0002\u00e2",
    "\u00e7\u0007^\u0002\u0002\u00e3\u00e4\u0007^\u0002\u0002\u00e4\u00e5",
    "\t\u0014\u0002\u0002\u00e5\u00e7\b\u001f\f\u0002\u00e6\u00dd\u0003\u0002",
    "\u0002\u0002\u00e6\u00df\u0003\u0002\u0002\u0002\u00e6\u00e1\u0003\u0002",
    "\u0002\u0002\u00e6\u00e3\u0003\u0002\u0002\u0002\u00e7A\u0003\u0002",
    "\u0002\u0002\u00e8\u00ea\u0007^\u0002\u0002\u00e9\u00eb\n\u0012\u0002",
    "\u0002\u00ea\u00e9\u0003\u0002\u0002\u0002\u00ea\u00eb\u0003\u0002\u0002",
    "\u0002\u00ebC\u0003\u0002\u0002\u0002\u00ec\u00f1\u0007}\u0002\u0002",
    "\u00ed\u00f0\n\u0015\u0002\u0002\u00ee\u00f0\u0005$\u0011\u0002\u00ef",
    "\u00ed\u0003\u0002\u0002\u0002\u00ef\u00ee\u0003\u0002\u0002\u0002\u00f0",
    "\u00f3\u0003\u0002\u0002\u0002\u00f1\u00ef\u0003\u0002\u0002\u0002\u00f1",
    "\u00f2\u0003\u0002\u0002\u0002\u00f2\u00f4\u0003\u0002\u0002\u0002\u00f3",
    "\u00f1\u0003\u0002\u0002\u0002\u00f4\u00f5\u0007\u007f\u0002\u0002\u00f5",
    "\u00f6\b!\r\u0002\u00f6E\u0003\u0002\u0002\u0002\u00f7\u00f8\t\u0016",
    "\u0002\u0002\u00f8\u00f9\b\"\u000e\u0002\u00f9G\u0003\u0002\u0002\u0002",
    "\u00fa\u00fc\n\u0017\u0002\u0002\u00fb\u00fa\u0003\u0002\u0002\u0002",
    "\u00fc\u00fd\u0003\u0002\u0002\u0002\u00fd\u00fb\u0003\u0002\u0002\u0002",
    "\u00fd\u00fe\u0003\u0002\u0002\u0002\u00fe\u00ff\u0003\u0002\u0002\u0002",
    "\u00ff\u0100\b#\u000f\u0002\u0100I\u0003\u0002\u0002\u0002\u0101\u0103",
    "\u0005\n\u0004\u0002\u0102\u0101\u0003\u0002\u0002\u0002\u0103\u0104",
    "\u0003\u0002\u0002\u0002\u0104\u0102\u0003\u0002\u0002\u0002\u0104\u0105",
    "\u0003\u0002\u0002\u0002\u0105\u0106\u0003\u0002\u0002\u0002\u0106\u0107",
    "\b$\u0002\u0002\u0107K\u0003\u0002\u0002\u0002\u0108\u010a\u0007\u000f",
    "\u0002\u0002\u0109\u0108\u0003\u0002\u0002\u0002\u0109\u010a\u0003\u0002",
    "\u0002\u0002\u010a\u010b\u0003\u0002\u0002\u0002\u010b\u010c\u0007\f",
    "\u0002\u0002\u010c\u010d\u0003\u0002\u0002\u0002\u010d\u010e\b%\b\u0002",
    "\u010e\u010f\b%\t\u0002\u010fM\u0003\u0002\u0002\u0002\u0110\u0113\u0005",
    "\u0006\u0002\u0002\u0111\u0113\u0005\b\u0003\u0002\u0112\u0110\u0003",
    "\u0002\u0002\u0002\u0112\u0111\u0003\u0002\u0002\u0002\u0113\u0114\u0003",
    "\u0002\u0002\u0002\u0114\u0112\u0003\u0002\u0002\u0002\u0114\u0115\u0003",
    "\u0002\u0002\u0002\u0115O\u0003\u0002\u0002\u0002\u0116\u0117\u0007",
    "<\u0002\u0002\u0117Q\u0003\u0002\u0002\u0002\u001d\u0002\u0003\u0004",
    "\u0005t|\u0080\u0086\u008d\u0092\u00a9\u00ae\u00b8\u00bd\u00bf\u00c7",
    "\u00d0\u00d5\u00e6\u00ea\u00ef\u00f1\u00fd\u0104\u0109\u0112\u0114\u0010",
    "\b\u0002\u0002\u0007\u0003\u0002\u0003\u0016\u0002\u0007\u0004\u0002",
    "\u0003\u0017\u0003\u0007\u0005\u0002\t\u0005\u0002\u0006\u0002\u0002",
    "\t\u0004\u0002\u0003\u001e\u0004\u0003\u001f\u0005\u0003!\u0006\u0003",
    "\"\u0007\u0003#\b"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function LUFileLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

LUFileLexer.prototype = Object.create(antlr4.Lexer.prototype);
LUFileLexer.prototype.constructor = LUFileLexer;

Object.defineProperty(LUFileLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

LUFileLexer.EOF = antlr4.Token.EOF;
LUFileLexer.COMMENTS = 1;
LUFileLexer.WS = 2;
LUFileLexer.NEWLINE = 3;
LUFileLexer.HASH = 4;
LUFileLexer.DASH = 5;
LUFileLexer.DOLLAR = 6;
LUFileLexer.WS_IN_NAME = 7;
LUFileLexer.IDENTIFIER = 8;
LUFileLexer.DOT = 9;
LUFileLexer.WS_IN_BODY_IGNORED = 10;
LUFileLexer.ESCAPE_CHARACTER = 11;
LUFileLexer.INVALID_ESCAPE = 12;
LUFileLexer.EXPRESSION = 13;
LUFileLexer.TEXT_SEPARATOR = 14;
LUFileLexer.TEXT = 15;
LUFileLexer.WS_IN_ENTITY = 16;
LUFileLexer.ENTITY_IDENTIFIER = 17;
LUFileLexer.COLON = 18;

LUFileLexer.INTENT_NAME_MODE = 1;
LUFileLexer.INTENT_BODY_MODE = 2;
LUFileLexer.ENTITY_MODE = 3;

LUFileLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

LUFileLexer.prototype.modeNames = [ "DEFAULT_MODE", "INTENT_NAME_MODE", 
                                    "INTENT_BODY_MODE", "ENTITY_MODE" ];

LUFileLexer.prototype.literalNames = [ null, null, null, null, "'#'", null, 
                                       null, null, null, "'.'", null, null, 
                                       null, null, null, null, null, null, 
                                       "':'" ];

LUFileLexer.prototype.symbolicNames = [ null, "COMMENTS", "WS", "NEWLINE", 
                                        "HASH", "DASH", "DOLLAR", "WS_IN_NAME", 
                                        "IDENTIFIER", "DOT", "WS_IN_BODY_IGNORED", 
                                        "ESCAPE_CHARACTER", "INVALID_ESCAPE", 
                                        "EXPRESSION", "TEXT_SEPARATOR", 
                                        "TEXT", "WS_IN_ENTITY", "ENTITY_IDENTIFIER", 
                                        "COLON" ];

LUFileLexer.prototype.ruleNames = [ "LETTER", "NUMBER", "WHITESPACE", "A", 
                                    "C", "D", "E", "F", "H", "I", "L", "S", 
                                    "T", "U", "W", "STRING_LITERAL", "COMMENTS", 
                                    "WS", "NEWLINE", "HASH", "DASH", "DOLLAR", 
                                    "WS_IN_NAME", "NEWLINE_IN_NAME", "IDENTIFIER", 
                                    "DOT", "WS_IN_BODY_IGNORED", "WS_IN_BODY", 
                                    "NEWLINE_IN_BODY", "ESCAPE_CHARACTER", 
                                    "INVALID_ESCAPE", "EXPRESSION", "TEXT_SEPARATOR", 
                                    "TEXT", "WS_IN_ENTITY", "NEWLINE_IN_ENTITY", 
                                    "ENTITY_IDENTIFIER", "COLON" ];

LUFileLexer.prototype.grammarFileName = "LUFileLexer.g4";


  this.ignoreWS = true;             // usually we ignore whitespace, but inside template, whitespace is significant
  this.expectKeywords = false;        // whether we are expecting IF/ELSEIF/ELSE or Switch/Case/Default keywords


LUFileLexer.prototype.action = function(localctx, ruleIndex, actionIndex) {
	switch (ruleIndex) {
	case 20:
		this.DASH_action(localctx, actionIndex);
		break;
	case 21:
		this.DOLLAR_action(localctx, actionIndex);
		break;
	case 28:
		this.NEWLINE_IN_BODY_action(localctx, actionIndex);
		break;
	case 29:
		this.ESCAPE_CHARACTER_action(localctx, actionIndex);
		break;
	case 31:
		this.EXPRESSION_action(localctx, actionIndex);
		break;
	case 32:
		this.TEXT_SEPARATOR_action(localctx, actionIndex);
		break;
	case 33:
		this.TEXT_action(localctx, actionIndex);
		break;
	default:
		throw "No registered action for:" + ruleIndex;
	}
};


LUFileLexer.prototype.DASH_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 0:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.DOLLAR_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 1:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.NEWLINE_IN_BODY_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 2:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.ESCAPE_CHARACTER_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 3:
		 this.ignoreWS = false; this.expectKeywords = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.EXPRESSION_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 4:
		 this.ignoreWS = false; this.expectKeywords = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.TEXT_SEPARATOR_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 5:
		 this.ignoreWS = false; this.expectKeywords = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.TEXT_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 6:
		 this.ignoreWS = false; this.expectKeywords = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};
LUFileLexer.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch (ruleIndex) {
		case 26:
			return this.WS_IN_BODY_IGNORED_sempred(localctx, predIndex);
    	default:
    		throw "No registered predicate for:" + ruleIndex;
    }
};

LUFileLexer.prototype.WS_IN_BODY_IGNORED_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.ignoreWS;
		default:
			throw "No predicate with index:" + predIndex;
	}
};



exports.LUFileLexer = LUFileLexer;

