// Generated from ../LUFileLexer.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0017\u0123\b\u0001\b\u0001\b\u0001\b\u0001\u0004\u0002\t\u0002",
    "\u0004\u0003\t\u0003\u0004\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006",
    "\t\u0006\u0004\u0007\t\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004",
    "\u000b\t\u000b\u0004\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f",
    "\t\u000f\u0004\u0010\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012",
    "\u0004\u0013\t\u0013\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016",
    "\t\u0016\u0004\u0017\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019",
    "\u0004\u001a\t\u001a\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0004\u001d",
    "\t\u001d\u0004\u001e\t\u001e\u0004\u001f\t\u001f\u0004 \t \u0004!\t",
    "!\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003",
    "\u0004\u0003\u0005\u0003\u0005\u0007\u0005O\n\u0005\f\u0005\u000e\u0005",
    "R\u000b\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005W\n\u0005",
    "\f\u0005\u000e\u0005Z\u000b\u0005\u0003\u0005\u0005\u0005]\n\u0005\u0003",
    "\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0006\u0007c\n\u0007\r\u0007",
    "\u000e\u0007d\u0003\u0007\u0003\u0007\u0003\b\u0006\bj\n\b\r\b\u000e",
    "\bk\u0003\b\u0003\b\u0003\t\u0005\tq\n\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\r\u0003\r\u0007\r\u0088\n\r\f\r\u000e\r\u008b\u000b\r\u0003",
    "\r\u0003\r\u0003\u000e\u0003\u000e\u0007\u000e\u0091\n\u000e\f\u000e",
    "\u000e\u000e\u0094\u000b\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0006",
    "\u000f\u0099\n\u000f\r\u000f\u000e\u000f\u009a\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u0010\u0006\u0010\u00a2\n\u0010\r\u0010",
    "\u000e\u0010\u00a3\u0003\u0010\u0003\u0010\u0003\u0011\u0005\u0011\u00a9",
    "\n\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0005\u0012\u00b3\n\u0012\u0003",
    "\u0012\u0003\u0012\u0003\u0012\u0007\u0012\u00b8\n\u0012\f\u0012\u000e",
    "\u0012\u00bb\u000b\u0012\u0003\u0012\u0003\u0012\u0003\u0013\u0003\u0013",
    "\u0003\u0014\u0006\u0014\u00c2\n\u0014\r\u0014\u000e\u0014\u00c3\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0015\u0006\u0015\u00cb",
    "\n\u0015\r\u0015\u000e\u0015\u00cc\u0003\u0015\u0003\u0015\u0003\u0016",
    "\u0005\u0016\u00d2\n\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003",
    "\u0016\u0003\u0016\u0003\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0003",
    "\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0005",
    "\u0017\u00e3\n\u0017\u0003\u0018\u0003\u0018\u0005\u0018\u00e7\n\u0018",
    "\u0003\u0019\u0003\u0019\u0003\u0019\u0007\u0019\u00ec\n\u0019\f\u0019",
    "\u000e\u0019\u00ef\u000b\u0019\u0003\u0019\u0003\u0019\u0003\u0019\u0003",
    "\u001a\u0003\u001a\u0003\u001a\u0003\u001b\u0006\u001b\u00f8\n\u001b",
    "\r\u001b\u000e\u001b\u00f9\u0003\u001b\u0003\u001b\u0003\u001c\u0006",
    "\u001c\u00ff\n\u001c\r\u001c\u000e\u001c\u0100\u0003\u001c\u0003\u001c",
    "\u0003\u001c\u0003\u001c\u0003\u001d\u0006\u001d\u0108\n\u001d\r\u001d",
    "\u000e\u001d\u0109\u0003\u001d\u0003\u001d\u0003\u001e\u0005\u001e\u010f",
    "\n\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e",
    "\u0003\u001f\u0003\u001f\u0003\u001f\u0006\u001f\u0119\n\u001f\r\u001f",
    "\u000e\u001f\u011a\u0003\u001f\u0003\u001f\u0003 \u0003 \u0003 \u0003",
    "!\u0003!\u0004\u0089\u0092\u0002\"\u0006\u0002\b\u0002\n\u0002\f\u0002",
    "\u000e\u0002\u0010\u0003\u0012\u0004\u0014\u0005\u0016\u0006\u0018\u0007",
    "\u001a\b\u001c\t\u001e\n \u000b\"\u0002$\u0002&\f(\r*\u000e,\u0002.",
    "\u00020\u000f2\u00104\u00116\u00128\u0013:\u0014<\u0002>\u0002@\u0015",
    "B\u0016D\u0017\u0006\u0002\u0003\u0004\u0005\r\u0004\u0002C\\c|\u0006",
    "\u0002\u000b\u000b\"\"\u00a2\u00a2\uff01\uff01\u0005\u0002\f\f\u000f",
    "\u000f))\u0005\u0002\f\f\u000f\u000f$$\u0004\u0002,-//\u0004\u0002\f",
    "\f\u000f\u000f\u0004\u0002//aa\u0007\u0002__ppttvv\u007f\u007f\u0006",
    "\u0002\f\f\u000f\u000f}}\u007f\u007f\n\u0002\u000b\f\u000f\u000f\"\"",
    "*+]]__}}\u007f\u007f\t\u0002\u000b\f\u000f\u000f\"\"*+]_}}\u007f\u007f",
    "\u0002\u013a\u0002\u0010\u0003\u0002\u0002\u0002\u0002\u0012\u0003\u0002",
    "\u0002\u0002\u0002\u0014\u0003\u0002\u0002\u0002\u0002\u0016\u0003\u0002",
    "\u0002\u0002\u0002\u0018\u0003\u0002\u0002\u0002\u0002\u001a\u0003\u0002",
    "\u0002\u0002\u0002\u001c\u0003\u0002\u0002\u0002\u0002\u001e\u0003\u0002",
    "\u0002\u0002\u0003 \u0003\u0002\u0002\u0002\u0003\"\u0003\u0002\u0002",
    "\u0002\u0003$\u0003\u0002\u0002\u0002\u0003&\u0003\u0002\u0002\u0002",
    "\u0003(\u0003\u0002\u0002\u0002\u0004*\u0003\u0002\u0002\u0002\u0004",
    ",\u0003\u0002\u0002\u0002\u0004.\u0003\u0002\u0002\u0002\u00040\u0003",
    "\u0002\u0002\u0002\u00042\u0003\u0002\u0002\u0002\u00044\u0003\u0002",
    "\u0002\u0002\u00046\u0003\u0002\u0002\u0002\u00048\u0003\u0002\u0002",
    "\u0002\u0005:\u0003\u0002\u0002\u0002\u0005<\u0003\u0002\u0002\u0002",
    "\u0005>\u0003\u0002\u0002\u0002\u0005@\u0003\u0002\u0002\u0002\u0005",
    "B\u0003\u0002\u0002\u0002\u0005D\u0003\u0002\u0002\u0002\u0006F\u0003",
    "\u0002\u0002\u0002\bH\u0003\u0002\u0002\u0002\nJ\u0003\u0002\u0002\u0002",
    "\f\\\u0003\u0002\u0002\u0002\u000e^\u0003\u0002\u0002\u0002\u0010`\u0003",
    "\u0002\u0002\u0002\u0012i\u0003\u0002\u0002\u0002\u0014p\u0003\u0002",
    "\u0002\u0002\u0016v\u0003\u0002\u0002\u0002\u0018{\u0003\u0002\u0002",
    "\u0002\u001a\u0080\u0003\u0002\u0002\u0002\u001c\u0085\u0003\u0002\u0002",
    "\u0002\u001e\u008e\u0003\u0002\u0002\u0002 \u0098\u0003\u0002\u0002",
    "\u0002\"\u00a1\u0003\u0002\u0002\u0002$\u00a8\u0003\u0002\u0002\u0002",
    "&\u00b2\u0003\u0002\u0002\u0002(\u00be\u0003\u0002\u0002\u0002*\u00c1",
    "\u0003\u0002\u0002\u0002,\u00ca\u0003\u0002\u0002\u0002.\u00d1\u0003",
    "\u0002\u0002\u00020\u00e2\u0003\u0002\u0002\u00022\u00e4\u0003\u0002",
    "\u0002\u00024\u00e8\u0003\u0002\u0002\u00026\u00f3\u0003\u0002\u0002",
    "\u00028\u00f7\u0003\u0002\u0002\u0002:\u00fe\u0003\u0002\u0002\u0002",
    "<\u0107\u0003\u0002\u0002\u0002>\u010e\u0003\u0002\u0002\u0002@\u0118",
    "\u0003\u0002\u0002\u0002B\u011e\u0003\u0002\u0002\u0002D\u0121\u0003",
    "\u0002\u0002\u0002FG\t\u0002\u0002\u0002G\u0007\u0003\u0002\u0002\u0002",
    "HI\u00042;\u0002I\t\u0003\u0002\u0002\u0002JK\t\u0003\u0002\u0002K\u000b",
    "\u0003\u0002\u0002\u0002LP\u0007)\u0002\u0002MO\n\u0004\u0002\u0002",
    "NM\u0003\u0002\u0002\u0002OR\u0003\u0002\u0002\u0002PN\u0003\u0002\u0002",
    "\u0002PQ\u0003\u0002\u0002\u0002QS\u0003\u0002\u0002\u0002RP\u0003\u0002",
    "\u0002\u0002S]\u0007)\u0002\u0002TX\u0007$\u0002\u0002UW\n\u0005\u0002",
    "\u0002VU\u0003\u0002\u0002\u0002WZ\u0003\u0002\u0002\u0002XV\u0003\u0002",
    "\u0002\u0002XY\u0003\u0002\u0002\u0002Y[\u0003\u0002\u0002\u0002ZX\u0003",
    "\u0002\u0002\u0002[]\u0007$\u0002\u0002\\L\u0003\u0002\u0002\u0002\\",
    "T\u0003\u0002\u0002\u0002]\r\u0003\u0002\u0002\u0002^_\t\u0006\u0002",
    "\u0002_\u000f\u0003\u0002\u0002\u0002`b\u0007@\u0002\u0002ac\n\u0007",
    "\u0002\u0002ba\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002db\u0003",
    "\u0002\u0002\u0002de\u0003\u0002\u0002\u0002ef\u0003\u0002\u0002\u0002",
    "fg\b\u0007\u0002\u0002g\u0011\u0003\u0002\u0002\u0002hj\u0005\n\u0004",
    "\u0002ih\u0003\u0002\u0002\u0002jk\u0003\u0002\u0002\u0002ki\u0003\u0002",
    "\u0002\u0002kl\u0003\u0002\u0002\u0002lm\u0003\u0002\u0002\u0002mn\b",
    "\b\u0002\u0002n\u0013\u0003\u0002\u0002\u0002oq\u0007\u000f\u0002\u0002",
    "po\u0003\u0002\u0002\u0002pq\u0003\u0002\u0002\u0002qr\u0003\u0002\u0002",
    "\u0002rs\u0007\f\u0002\u0002st\u0003\u0002\u0002\u0002tu\b\t\u0002\u0002",
    "u\u0015\u0003\u0002\u0002\u0002vw\u0007%\u0002\u0002wx\b\n\u0003\u0002",
    "xy\u0003\u0002\u0002\u0002yz\b\n\u0004\u0002z\u0017\u0003\u0002\u0002",
    "\u0002{|\u0005\u000e\u0006\u0002|}\b\u000b\u0005\u0002}~\u0003\u0002",
    "\u0002\u0002~\u007f\b\u000b\u0006\u0002\u007f\u0019\u0003\u0002\u0002",
    "\u0002\u0080\u0081\u0007&\u0002\u0002\u0081\u0082\b\f\u0007\u0002\u0082",
    "\u0083\u0003\u0002\u0002\u0002\u0083\u0084\b\f\b\u0002\u0084\u001b\u0003",
    "\u0002\u0002\u0002\u0085\u0089\u0007]\u0002\u0002\u0086\u0088\u000b",
    "\u0002\u0002\u0002\u0087\u0086\u0003\u0002\u0002\u0002\u0088\u008b\u0003",
    "\u0002\u0002\u0002\u0089\u008a\u0003\u0002\u0002\u0002\u0089\u0087\u0003",
    "\u0002\u0002\u0002\u008a\u008c\u0003\u0002\u0002\u0002\u008b\u0089\u0003",
    "\u0002\u0002\u0002\u008c\u008d\u0007_\u0002\u0002\u008d\u001d\u0003",
    "\u0002\u0002\u0002\u008e\u0092\u0007*\u0002\u0002\u008f\u0091\u000b",
    "\u0002\u0002\u0002\u0090\u008f\u0003\u0002\u0002\u0002\u0091\u0094\u0003",
    "\u0002\u0002\u0002\u0092\u0093\u0003\u0002\u0002\u0002\u0092\u0090\u0003",
    "\u0002\u0002\u0002\u0093\u0095\u0003\u0002\u0002\u0002\u0094\u0092\u0003",
    "\u0002\u0002\u0002\u0095\u0096\u0007+\u0002\u0002\u0096\u001f\u0003",
    "\u0002\u0002\u0002\u0097\u0099\u0005\n\u0004\u0002\u0098\u0097\u0003",
    "\u0002\u0002\u0002\u0099\u009a\u0003\u0002\u0002\u0002\u009a\u0098\u0003",
    "\u0002\u0002\u0002\u009a\u009b\u0003\u0002\u0002\u0002\u009b\u009c\u0003",
    "\u0002\u0002\u0002\u009c\u009d\u0006\u000f\u0002\u0002\u009d\u009e\u0003",
    "\u0002\u0002\u0002\u009e\u009f\b\u000f\u0002\u0002\u009f!\u0003\u0002",
    "\u0002\u0002\u00a0\u00a2\u0005\n\u0004\u0002\u00a1\u00a0\u0003\u0002",
    "\u0002\u0002\u00a2\u00a3\u0003\u0002\u0002\u0002\u00a3\u00a1\u0003\u0002",
    "\u0002\u0002\u00a3\u00a4\u0003\u0002\u0002\u0002\u00a4\u00a5\u0003\u0002",
    "\u0002\u0002\u00a5\u00a6\b\u0010\t\u0002\u00a6#\u0003\u0002\u0002\u0002",
    "\u00a7\u00a9\u0007\u000f\u0002\u0002\u00a8\u00a7\u0003\u0002\u0002\u0002",
    "\u00a8\u00a9\u0003\u0002\u0002\u0002\u00a9\u00aa\u0003\u0002\u0002\u0002",
    "\u00aa\u00ab\u0007\f\u0002\u0002\u00ab\u00ac\u0003\u0002\u0002\u0002",
    "\u00ac\u00ad\b\u0011\n\u0002\u00ad\u00ae\b\u0011\u000b\u0002\u00ae%",
    "\u0003\u0002\u0002\u0002\u00af\u00b3\u0005\u0006\u0002\u0002\u00b0\u00b3",
    "\u0005\b\u0003\u0002\u00b1\u00b3\u0007a\u0002\u0002\u00b2\u00af\u0003",
    "\u0002\u0002\u0002\u00b2\u00b0\u0003\u0002\u0002\u0002\u00b2\u00b1\u0003",
    "\u0002\u0002\u0002\u00b3\u00b9\u0003\u0002\u0002\u0002\u00b4\u00b8\u0005",
    "\u0006\u0002\u0002\u00b5\u00b8\u0005\b\u0003\u0002\u00b6\u00b8\t\b\u0002",
    "\u0002\u00b7\u00b4\u0003\u0002\u0002\u0002\u00b7\u00b5\u0003\u0002\u0002",
    "\u0002\u00b7\u00b6\u0003\u0002\u0002\u0002\u00b8\u00bb\u0003\u0002\u0002",
    "\u0002\u00b9\u00b7\u0003\u0002\u0002\u0002\u00b9\u00ba\u0003\u0002\u0002",
    "\u0002\u00ba\u00bc\u0003\u0002\u0002\u0002\u00bb\u00b9\u0003\u0002\u0002",
    "\u0002\u00bc\u00bd\b\u0012\f\u0002\u00bd\'\u0003\u0002\u0002\u0002\u00be",
    "\u00bf\u00070\u0002\u0002\u00bf)\u0003\u0002\u0002\u0002\u00c0\u00c2",
    "\u0005\n\u0004\u0002\u00c1\u00c0\u0003\u0002\u0002\u0002\u00c2\u00c3",
    "\u0003\u0002\u0002\u0002\u00c3\u00c1\u0003\u0002\u0002\u0002\u00c3\u00c4",
    "\u0003\u0002\u0002\u0002\u00c4\u00c5\u0003\u0002\u0002\u0002\u00c5\u00c6",
    "\u0006\u0014\u0003\u0002\u00c6\u00c7\u0003\u0002\u0002\u0002\u00c7\u00c8",
    "\b\u0014\u0002\u0002\u00c8+\u0003\u0002\u0002\u0002\u00c9\u00cb\u0005",
    "\n\u0004\u0002\u00ca\u00c9\u0003\u0002\u0002\u0002\u00cb\u00cc\u0003",
    "\u0002\u0002\u0002\u00cc\u00ca\u0003\u0002\u0002\u0002\u00cc\u00cd\u0003",
    "\u0002\u0002\u0002\u00cd\u00ce\u0003\u0002\u0002\u0002\u00ce\u00cf\b",
    "\u0015\t\u0002\u00cf-\u0003\u0002\u0002\u0002\u00d0\u00d2\u0007\u000f",
    "\u0002\u0002\u00d1\u00d0\u0003\u0002\u0002\u0002\u00d1\u00d2\u0003\u0002",
    "\u0002\u0002\u00d2\u00d3\u0003\u0002\u0002\u0002\u00d3\u00d4\u0007\f",
    "\u0002\u0002\u00d4\u00d5\b\u0016\r\u0002\u00d5\u00d6\u0003\u0002\u0002",
    "\u0002\u00d6\u00d7\b\u0016\n\u0002\u00d7\u00d8\b\u0016\u000b\u0002\u00d8",
    "/\u0003\u0002\u0002\u0002\u00d9\u00da\u0007^\u0002\u0002\u00da\u00e3",
    "\u0007}\u0002\u0002\u00db\u00dc\u0007^\u0002\u0002\u00dc\u00e3\u0007",
    "]\u0002\u0002\u00dd\u00de\u0007^\u0002\u0002\u00de\u00e3\u0007^\u0002",
    "\u0002\u00df\u00e0\u0007^\u0002\u0002\u00e0\u00e1\t\t\u0002\u0002\u00e1",
    "\u00e3\b\u0017\u000e\u0002\u00e2\u00d9\u0003\u0002\u0002\u0002\u00e2",
    "\u00db\u0003\u0002\u0002\u0002\u00e2\u00dd\u0003\u0002\u0002\u0002\u00e2",
    "\u00df\u0003\u0002\u0002\u0002\u00e31\u0003\u0002\u0002\u0002\u00e4",
    "\u00e6\u0007^\u0002\u0002\u00e5\u00e7\n\u0007\u0002\u0002\u00e6\u00e5",
    "\u0003\u0002\u0002\u0002\u00e6\u00e7\u0003\u0002\u0002\u0002\u00e73",
    "\u0003\u0002\u0002\u0002\u00e8\u00ed\u0007}\u0002\u0002\u00e9\u00ec",
    "\n\n\u0002\u0002\u00ea\u00ec\u0005\f\u0005\u0002\u00eb\u00e9\u0003\u0002",
    "\u0002\u0002\u00eb\u00ea\u0003\u0002\u0002\u0002\u00ec\u00ef\u0003\u0002",
    "\u0002\u0002\u00ed\u00eb\u0003\u0002\u0002\u0002\u00ed\u00ee\u0003\u0002",
    "\u0002\u0002\u00ee\u00f0\u0003\u0002\u0002\u0002\u00ef\u00ed\u0003\u0002",
    "\u0002\u0002\u00f0\u00f1\u0007\u007f\u0002\u0002\u00f1\u00f2\b\u0019",
    "\u000f\u0002\u00f25\u0003\u0002\u0002\u0002\u00f3\u00f4\t\u000b\u0002",
    "\u0002\u00f4\u00f5\b\u001a\u0010\u0002\u00f57\u0003\u0002\u0002\u0002",
    "\u00f6\u00f8\n\f\u0002\u0002\u00f7\u00f6\u0003\u0002\u0002\u0002\u00f8",
    "\u00f9\u0003\u0002\u0002\u0002\u00f9\u00f7\u0003\u0002\u0002\u0002\u00f9",
    "\u00fa\u0003\u0002\u0002\u0002\u00fa\u00fb\u0003\u0002\u0002\u0002\u00fb",
    "\u00fc\b\u001b\u0011\u0002\u00fc9\u0003\u0002\u0002\u0002\u00fd\u00ff",
    "\u0005\n\u0004\u0002\u00fe\u00fd\u0003\u0002\u0002\u0002\u00ff\u0100",
    "\u0003\u0002\u0002\u0002\u0100\u00fe\u0003\u0002\u0002\u0002\u0100\u0101",
    "\u0003\u0002\u0002\u0002\u0101\u0102\u0003\u0002\u0002\u0002\u0102\u0103",
    "\u0006\u001c\u0004\u0002\u0103\u0104\u0003\u0002\u0002\u0002\u0104\u0105",
    "\b\u001c\u0002\u0002\u0105;\u0003\u0002\u0002\u0002\u0106\u0108\u0005",
    "\n\u0004\u0002\u0107\u0106\u0003\u0002\u0002\u0002\u0108\u0109\u0003",
    "\u0002\u0002\u0002\u0109\u0107\u0003\u0002\u0002\u0002\u0109\u010a\u0003",
    "\u0002\u0002\u0002\u010a\u010b\u0003\u0002\u0002\u0002\u010b\u010c\b",
    "\u001d\t\u0002\u010c=\u0003\u0002\u0002\u0002\u010d\u010f\u0007\u000f",
    "\u0002\u0002\u010e\u010d\u0003\u0002\u0002\u0002\u010e\u010f\u0003\u0002",
    "\u0002\u0002\u010f\u0110\u0003\u0002\u0002\u0002\u0110\u0111\u0007\f",
    "\u0002\u0002\u0111\u0112\u0003\u0002\u0002\u0002\u0112\u0113\b\u001e",
    "\n\u0002\u0113\u0114\b\u001e\u000b\u0002\u0114?\u0003\u0002\u0002\u0002",
    "\u0115\u0119\u0005\u0006\u0002\u0002\u0116\u0119\u0005\b\u0003\u0002",
    "\u0117\u0119\t\b\u0002\u0002\u0118\u0115\u0003\u0002\u0002\u0002\u0118",
    "\u0116\u0003\u0002\u0002\u0002\u0118\u0117\u0003\u0002\u0002\u0002\u0119",
    "\u011a\u0003\u0002\u0002\u0002\u011a\u0118\u0003\u0002\u0002\u0002\u011a",
    "\u011b\u0003\u0002\u0002\u0002\u011b\u011c\u0003\u0002\u0002\u0002\u011c",
    "\u011d\b\u001f\u0012\u0002\u011dA\u0003\u0002\u0002\u0002\u011e\u011f",
    "\u0007<\u0002\u0002\u011f\u0120\b \u0013\u0002\u0120C\u0003\u0002\u0002",
    "\u0002\u0121\u0122\u0007?\u0002\u0002\u0122E\u0003\u0002\u0002\u0002",
    "!\u0002\u0003\u0004\u0005PX\\dkp\u0089\u0092\u009a\u00a3\u00a8\u00b2",
    "\u00b7\u00b9\u00c3\u00cc\u00d1\u00e2\u00e6\u00eb\u00ed\u00f9\u0100\u0109",
    "\u010e\u0118\u011a\u0014\b\u0002\u0002\u0003\n\u0002\u0007\u0003\u0002",
    "\u0003\u000b\u0003\u0007\u0004\u0002\u0003\f\u0004\u0007\u0005\u0002",
    "\t\u0004\u0002\t\u0005\u0002\u0006\u0002\u0002\u0003\u0012\u0005\u0003",
    "\u0016\u0006\u0003\u0017\u0007\u0003\u0019\b\u0003\u001a\t\u0003\u001b",
    "\n\u0003\u001f\u000b\u0003 \f"].join("");


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
LUFileLexer.IMPORT_DESC = 7;
LUFileLexer.IMPORT_PATH = 8;
LUFileLexer.WS_IN_NAME_IGNORED = 9;
LUFileLexer.IDENTIFIER = 10;
LUFileLexer.DOT = 11;
LUFileLexer.WS_IN_BODY_IGNORED = 12;
LUFileLexer.ESCAPE_CHARACTER = 13;
LUFileLexer.INVALID_ESCAPE = 14;
LUFileLexer.EXPRESSION = 15;
LUFileLexer.TEXT_SEPARATOR = 16;
LUFileLexer.TEXT = 17;
LUFileLexer.WS_IN_ENTITY_IGNORED = 18;
LUFileLexer.ENTITY_IDENTIFIER = 19;
LUFileLexer.COLON_MARK = 20;
LUFileLexer.EQUAL_MARK = 21;

LUFileLexer.INTENT_NAME_MODE = 1;
LUFileLexer.INTENT_BODY_MODE = 2;
LUFileLexer.ENTITY_MODE = 3;

LUFileLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

LUFileLexer.prototype.modeNames = [ "DEFAULT_MODE", "INTENT_NAME_MODE", 
                                    "INTENT_BODY_MODE", "ENTITY_MODE" ];

LUFileLexer.prototype.literalNames = [ null, null, null, null, null, null, 
                                       null, null, null, null, null, "'.'", 
                                       null, null, null, null, null, null, 
                                       null, null, "':'", "'='" ];

LUFileLexer.prototype.symbolicNames = [ null, "COMMENTS", "WS", "NEWLINE", 
                                        "HASH", "DASH", "DOLLAR", "IMPORT_DESC", 
                                        "IMPORT_PATH", "WS_IN_NAME_IGNORED", 
                                        "IDENTIFIER", "DOT", "WS_IN_BODY_IGNORED", 
                                        "ESCAPE_CHARACTER", "INVALID_ESCAPE", 
                                        "EXPRESSION", "TEXT_SEPARATOR", 
                                        "TEXT", "WS_IN_ENTITY_IGNORED", 
                                        "ENTITY_IDENTIFIER", "COLON_MARK", 
                                        "EQUAL_MARK" ];

LUFileLexer.prototype.ruleNames = [ "LETTER", "NUMBER", "WHITESPACE", "STRING_LITERAL", 
                                    "UTTERANCE_MARK", "COMMENTS", "WS", 
                                    "NEWLINE", "HASH", "DASH", "DOLLAR", 
                                    "IMPORT_DESC", "IMPORT_PATH", "WS_IN_NAME_IGNORED", 
                                    "WS_IN_NAME", "NEWLINE_IN_NAME", "IDENTIFIER", 
                                    "DOT", "WS_IN_BODY_IGNORED", "WS_IN_BODY", 
                                    "NEWLINE_IN_BODY", "ESCAPE_CHARACTER", 
                                    "INVALID_ESCAPE", "EXPRESSION", "TEXT_SEPARATOR", 
                                    "TEXT", "WS_IN_ENTITY_IGNORED", "WS_IN_ENTITY", 
                                    "NEWLINE_IN_ENTITY", "ENTITY_IDENTIFIER", 
                                    "COLON_MARK", "EQUAL_MARK" ];

LUFileLexer.prototype.grammarFileName = "LUFileLexer.g4";


  this.ignoreWS = true;             // usually we ignore whitespace, but inside template, whitespace is significant


LUFileLexer.prototype.action = function(localctx, ruleIndex, actionIndex) {
	switch (ruleIndex) {
	case 8:
		this.HASH_action(localctx, actionIndex);
		break;
	case 9:
		this.DASH_action(localctx, actionIndex);
		break;
	case 10:
		this.DOLLAR_action(localctx, actionIndex);
		break;
	case 16:
		this.IDENTIFIER_action(localctx, actionIndex);
		break;
	case 20:
		this.NEWLINE_IN_BODY_action(localctx, actionIndex);
		break;
	case 21:
		this.ESCAPE_CHARACTER_action(localctx, actionIndex);
		break;
	case 23:
		this.EXPRESSION_action(localctx, actionIndex);
		break;
	case 24:
		this.TEXT_SEPARATOR_action(localctx, actionIndex);
		break;
	case 25:
		this.TEXT_action(localctx, actionIndex);
		break;
	case 29:
		this.ENTITY_IDENTIFIER_action(localctx, actionIndex);
		break;
	case 30:
		this.COLON_MARK_action(localctx, actionIndex);
		break;
	default:
		throw "No registered action for:" + ruleIndex;
	}
};


LUFileLexer.prototype.HASH_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 0:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.DASH_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 1:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.DOLLAR_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 2:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.IDENTIFIER_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 3:
		 this.ignoreWS = false
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.NEWLINE_IN_BODY_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 4:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.ESCAPE_CHARACTER_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 5:
		 this.ignoreWS = false
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.EXPRESSION_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 6:
		 this.ignoreWS = false
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.TEXT_SEPARATOR_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 7:
		 this.ignoreWS = false
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.TEXT_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 8:
		 this.ignoreWS = false
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.ENTITY_IDENTIFIER_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 9:
		 this.ignoreWS = false
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.COLON_MARK_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 10:
		 this.ignoreWS = true
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};
LUFileLexer.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch (ruleIndex) {
		case 13:
			return this.WS_IN_NAME_IGNORED_sempred(localctx, predIndex);
		case 18:
			return this.WS_IN_BODY_IGNORED_sempred(localctx, predIndex);
		case 26:
			return this.WS_IN_ENTITY_IGNORED_sempred(localctx, predIndex);
    	default:
    		throw "No registered predicate for:" + ruleIndex;
    }
};

LUFileLexer.prototype.WS_IN_NAME_IGNORED_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.ignoreWS;
		default:
			throw "No predicate with index:" + predIndex;
	}
};

LUFileLexer.prototype.WS_IN_BODY_IGNORED_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 1:
			return this.ignoreWS;
		default:
			throw "No predicate with index:" + predIndex;
	}
};

LUFileLexer.prototype.WS_IN_ENTITY_IGNORED_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 2:
			return this.ignoreWS;
		default:
			throw "No predicate with index:" + predIndex;
	}
};



exports.LUFileLexer = LUFileLexer;

