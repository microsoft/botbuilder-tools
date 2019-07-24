// Generated from ../LUFileLexer.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0014\u00eb\b\u0001\b\u0001\b\u0001\b\u0001\u0004\u0002\t\u0002",
    "\u0004\u0003\t\u0003\u0004\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006",
    "\t\u0006\u0004\u0007\t\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004",
    "\u000b\t\u000b\u0004\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f",
    "\t\u000f\u0004\u0010\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012",
    "\u0004\u0013\t\u0013\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016",
    "\t\u0016\u0004\u0017\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019",
    "\u0004\u001a\t\u001a\u0004\u001b\t\u001b\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0007",
    "\u0005C\n\u0005\f\u0005\u000e\u0005F\u000b\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0007\u0005K\n\u0005\f\u0005\u000e\u0005N\u000b\u0005\u0003",
    "\u0005\u0005\u0005Q\n\u0005\u0003\u0006\u0003\u0006\u0006\u0006U\n\u0006",
    "\r\u0006\u000e\u0006V\u0003\u0006\u0003\u0006\u0003\u0007\u0006\u0007",
    "\\\n\u0007\r\u0007\u000e\u0007]\u0003\u0007\u0003\u0007\u0003\b\u0005",
    "\bc\n\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\f\u0006\fx\n\f\r\f\u000e\fy\u0003",
    "\f\u0003\f\u0003\r\u0005\r\u007f\n\r\u0003\r\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u0089\n\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u008e\n\u000e\f\u000e",
    "\u000e\u000e\u0091\u000b\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0006",
    "\u0010\u0096\n\u0010\r\u0010\u000e\u0010\u0097\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0011\u0006\u0011\u009f\n\u0011\r\u0011",
    "\u000e\u0011\u00a0\u0003\u0011\u0003\u0011\u0003\u0012\u0005\u0012\u00a6",
    "\n\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u00b7\n",
    "\u0013\u0003\u0014\u0003\u0014\u0005\u0014\u00bb\n\u0014\u0003\u0015",
    "\u0003\u0015\u0003\u0015\u0007\u0015\u00c0\n\u0015\f\u0015\u000e\u0015",
    "\u00c3\u000b\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0016\u0003",
    "\u0016\u0003\u0016\u0003\u0017\u0006\u0017\u00cc\n\u0017\r\u0017\u000e",
    "\u0017\u00cd\u0003\u0017\u0003\u0017\u0003\u0018\u0006\u0018\u00d3\n",
    "\u0018\r\u0018\u000e\u0018\u00d4\u0003\u0018\u0003\u0018\u0003\u0019",
    "\u0005\u0019\u00da\n\u0019\u0003\u0019\u0003\u0019\u0003\u0019\u0003",
    "\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0006\u001a\u00e3\n\u001a",
    "\r\u001a\u000e\u001a\u00e4\u0003\u001a\u0005\u001a\u00e8\n\u001a\u0003",
    "\u001b\u0003\u001b\u0002\u0002\u001c\u0006\u0002\b\u0002\n\u0002\f\u0002",
    "\u000e\u0003\u0010\u0004\u0012\u0005\u0014\u0006\u0016\u0007\u0018\b",
    "\u001a\t\u001c\u0002\u001e\n \u000b\"\f$\u0002&\u0002(\r*\u000e,\u000f",
    ".\u00100\u00112\u00124\u00026\u00138\u0014\u0006\u0002\u0003\u0004\u0005",
    "\f\u0004\u0002C\\c|\u0006\u0002\u000b\u000b\"\"\u00a2\u00a2\uff01\uff01",
    "\u0005\u0002\f\f\u000f\u000f))\u0005\u0002\f\f\u000f\u000f$$\u0004\u0002",
    "\f\f\u000f\u000f\u0004\u0002//aa\u0007\u0002__ppttvv\u007f\u007f\u0006",
    "\u0002\f\f\u000f\u000f}}\u007f\u007f\n\u0002\u000b\f\u000f\u000f\"\"",
    "*+]]__}}\u007f\u007f\t\u0002\u000b\f\u000f\u000f\"\"*+]_}}\u007f\u007f",
    "\u0002\u00ff\u0002\u000e\u0003\u0002\u0002\u0002\u0002\u0010\u0003\u0002",
    "\u0002\u0002\u0002\u0012\u0003\u0002\u0002\u0002\u0002\u0014\u0003\u0002",
    "\u0002\u0002\u0002\u0016\u0003\u0002\u0002\u0002\u0002\u0018\u0003\u0002",
    "\u0002\u0002\u0003\u001a\u0003\u0002\u0002\u0002\u0003\u001c\u0003\u0002",
    "\u0002\u0002\u0003\u001e\u0003\u0002\u0002\u0002\u0003 \u0003\u0002",
    "\u0002\u0002\u0004\"\u0003\u0002\u0002\u0002\u0004$\u0003\u0002\u0002",
    "\u0002\u0004&\u0003\u0002\u0002\u0002\u0004(\u0003\u0002\u0002\u0002",
    "\u0004*\u0003\u0002\u0002\u0002\u0004,\u0003\u0002\u0002\u0002\u0004",
    ".\u0003\u0002\u0002\u0002\u00040\u0003\u0002\u0002\u0002\u00052\u0003",
    "\u0002\u0002\u0002\u00054\u0003\u0002\u0002\u0002\u00056\u0003\u0002",
    "\u0002\u0002\u00058\u0003\u0002\u0002\u0002\u0006:\u0003\u0002\u0002",
    "\u0002\b<\u0003\u0002\u0002\u0002\n>\u0003\u0002\u0002\u0002\fP\u0003",
    "\u0002\u0002\u0002\u000eR\u0003\u0002\u0002\u0002\u0010[\u0003\u0002",
    "\u0002\u0002\u0012b\u0003\u0002\u0002\u0002\u0014h\u0003\u0002\u0002",
    "\u0002\u0016l\u0003\u0002\u0002\u0002\u0018q\u0003\u0002\u0002\u0002",
    "\u001aw\u0003\u0002\u0002\u0002\u001c~\u0003\u0002\u0002\u0002\u001e",
    "\u0088\u0003\u0002\u0002\u0002 \u0092\u0003\u0002\u0002\u0002\"\u0095",
    "\u0003\u0002\u0002\u0002$\u009e\u0003\u0002\u0002\u0002&\u00a5\u0003",
    "\u0002\u0002\u0002(\u00b6\u0003\u0002\u0002\u0002*\u00b8\u0003\u0002",
    "\u0002\u0002,\u00bc\u0003\u0002\u0002\u0002.\u00c7\u0003\u0002\u0002",
    "\u00020\u00cb\u0003\u0002\u0002\u00022\u00d2\u0003\u0002\u0002\u0002",
    "4\u00d9\u0003\u0002\u0002\u00026\u00e2\u0003\u0002\u0002\u00028\u00e9",
    "\u0003\u0002\u0002\u0002:;\t\u0002\u0002\u0002;\u0007\u0003\u0002\u0002",
    "\u0002<=\u00042;\u0002=\t\u0003\u0002\u0002\u0002>?\t\u0003\u0002\u0002",
    "?\u000b\u0003\u0002\u0002\u0002@D\u0007)\u0002\u0002AC\n\u0004\u0002",
    "\u0002BA\u0003\u0002\u0002\u0002CF\u0003\u0002\u0002\u0002DB\u0003\u0002",
    "\u0002\u0002DE\u0003\u0002\u0002\u0002EG\u0003\u0002\u0002\u0002FD\u0003",
    "\u0002\u0002\u0002GQ\u0007)\u0002\u0002HL\u0007$\u0002\u0002IK\n\u0005",
    "\u0002\u0002JI\u0003\u0002\u0002\u0002KN\u0003\u0002\u0002\u0002LJ\u0003",
    "\u0002\u0002\u0002LM\u0003\u0002\u0002\u0002MO\u0003\u0002\u0002\u0002",
    "NL\u0003\u0002\u0002\u0002OQ\u0007$\u0002\u0002P@\u0003\u0002\u0002",
    "\u0002PH\u0003\u0002\u0002\u0002Q\r\u0003\u0002\u0002\u0002RT\u0007",
    "@\u0002\u0002SU\n\u0006\u0002\u0002TS\u0003\u0002\u0002\u0002UV\u0003",
    "\u0002\u0002\u0002VT\u0003\u0002\u0002\u0002VW\u0003\u0002\u0002\u0002",
    "WX\u0003\u0002\u0002\u0002XY\b\u0006\u0002\u0002Y\u000f\u0003\u0002",
    "\u0002\u0002Z\\\u0005\n\u0004\u0002[Z\u0003\u0002\u0002\u0002\\]\u0003",
    "\u0002\u0002\u0002][\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002",
    "^_\u0003\u0002\u0002\u0002_`\b\u0007\u0002\u0002`\u0011\u0003\u0002",
    "\u0002\u0002ac\u0007\u000f\u0002\u0002ba\u0003\u0002\u0002\u0002bc\u0003",
    "\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002de\u0007\f\u0002\u0002e",
    "f\u0003\u0002\u0002\u0002fg\b\b\u0002\u0002g\u0013\u0003\u0002\u0002",
    "\u0002hi\u0007%\u0002\u0002ij\u0003\u0002\u0002\u0002jk\b\t\u0003\u0002",
    "k\u0015\u0003\u0002\u0002\u0002lm\u0007/\u0002\u0002mn\b\n\u0004\u0002",
    "no\u0003\u0002\u0002\u0002op\b\n\u0005\u0002p\u0017\u0003\u0002\u0002",
    "\u0002qr\u0007&\u0002\u0002rs\b\u000b\u0006\u0002st\u0003\u0002\u0002",
    "\u0002tu\b\u000b\u0007\u0002u\u0019\u0003\u0002\u0002\u0002vx\u0005",
    "\n\u0004\u0002wv\u0003\u0002\u0002\u0002xy\u0003\u0002\u0002\u0002y",
    "w\u0003\u0002\u0002\u0002yz\u0003\u0002\u0002\u0002z{\u0003\u0002\u0002",
    "\u0002{|\b\f\u0002\u0002|\u001b\u0003\u0002\u0002\u0002}\u007f\u0007",
    "\u000f\u0002\u0002~}\u0003\u0002\u0002\u0002~\u007f\u0003\u0002\u0002",
    "\u0002\u007f\u0080\u0003\u0002\u0002\u0002\u0080\u0081\u0007\f\u0002",
    "\u0002\u0081\u0082\u0003\u0002\u0002\u0002\u0082\u0083\b\r\b\u0002\u0083",
    "\u0084\b\r\t\u0002\u0084\u001d\u0003\u0002\u0002\u0002\u0085\u0089\u0005",
    "\u0006\u0002\u0002\u0086\u0089\u0005\b\u0003\u0002\u0087\u0089\u0007",
    "a\u0002\u0002\u0088\u0085\u0003\u0002\u0002\u0002\u0088\u0086\u0003",
    "\u0002\u0002\u0002\u0088\u0087\u0003\u0002\u0002\u0002\u0089\u008f\u0003",
    "\u0002\u0002\u0002\u008a\u008e\u0005\u0006\u0002\u0002\u008b\u008e\u0005",
    "\b\u0003\u0002\u008c\u008e\t\u0007\u0002\u0002\u008d\u008a\u0003\u0002",
    "\u0002\u0002\u008d\u008b\u0003\u0002\u0002\u0002\u008d\u008c\u0003\u0002",
    "\u0002\u0002\u008e\u0091\u0003\u0002\u0002\u0002\u008f\u008d\u0003\u0002",
    "\u0002\u0002\u008f\u0090\u0003\u0002\u0002\u0002\u0090\u001f\u0003\u0002",
    "\u0002\u0002\u0091\u008f\u0003\u0002\u0002\u0002\u0092\u0093\u00070",
    "\u0002\u0002\u0093!\u0003\u0002\u0002\u0002\u0094\u0096\u0005\n\u0004",
    "\u0002\u0095\u0094\u0003\u0002\u0002\u0002\u0096\u0097\u0003\u0002\u0002",
    "\u0002\u0097\u0095\u0003\u0002\u0002\u0002\u0097\u0098\u0003\u0002\u0002",
    "\u0002\u0098\u0099\u0003\u0002\u0002\u0002\u0099\u009a\u0006\u0010\u0002",
    "\u0002\u009a\u009b\u0003\u0002\u0002\u0002\u009b\u009c\b\u0010\u0002",
    "\u0002\u009c#\u0003\u0002\u0002\u0002\u009d\u009f\u0005\n\u0004\u0002",
    "\u009e\u009d\u0003\u0002\u0002\u0002\u009f\u00a0\u0003\u0002\u0002\u0002",
    "\u00a0\u009e\u0003\u0002\u0002\u0002\u00a0\u00a1\u0003\u0002\u0002\u0002",
    "\u00a1\u00a2\u0003\u0002\u0002\u0002\u00a2\u00a3\b\u0011\n\u0002\u00a3",
    "%\u0003\u0002\u0002\u0002\u00a4\u00a6\u0007\u000f\u0002\u0002\u00a5",
    "\u00a4\u0003\u0002\u0002\u0002\u00a5\u00a6\u0003\u0002\u0002\u0002\u00a6",
    "\u00a7\u0003\u0002\u0002\u0002\u00a7\u00a8\u0007\f\u0002\u0002\u00a8",
    "\u00a9\b\u0012\u000b\u0002\u00a9\u00aa\u0003\u0002\u0002\u0002\u00aa",
    "\u00ab\b\u0012\b\u0002\u00ab\u00ac\b\u0012\t\u0002\u00ac\'\u0003\u0002",
    "\u0002\u0002\u00ad\u00ae\u0007^\u0002\u0002\u00ae\u00b7\u0007}\u0002",
    "\u0002\u00af\u00b0\u0007^\u0002\u0002\u00b0\u00b7\u0007]\u0002\u0002",
    "\u00b1\u00b2\u0007^\u0002\u0002\u00b2\u00b7\u0007^\u0002\u0002\u00b3",
    "\u00b4\u0007^\u0002\u0002\u00b4\u00b5\t\b\u0002\u0002\u00b5\u00b7\b",
    "\u0013\f\u0002\u00b6\u00ad\u0003\u0002\u0002\u0002\u00b6\u00af\u0003",
    "\u0002\u0002\u0002\u00b6\u00b1\u0003\u0002\u0002\u0002\u00b6\u00b3\u0003",
    "\u0002\u0002\u0002\u00b7)\u0003\u0002\u0002\u0002\u00b8\u00ba\u0007",
    "^\u0002\u0002\u00b9\u00bb\n\u0006\u0002\u0002\u00ba\u00b9\u0003\u0002",
    "\u0002\u0002\u00ba\u00bb\u0003\u0002\u0002\u0002\u00bb+\u0003\u0002",
    "\u0002\u0002\u00bc\u00c1\u0007}\u0002\u0002\u00bd\u00c0\n\t\u0002\u0002",
    "\u00be\u00c0\u0005\f\u0005\u0002\u00bf\u00bd\u0003\u0002\u0002\u0002",
    "\u00bf\u00be\u0003\u0002\u0002\u0002\u00c0\u00c3\u0003\u0002\u0002\u0002",
    "\u00c1\u00bf\u0003\u0002\u0002\u0002\u00c1\u00c2\u0003\u0002\u0002\u0002",
    "\u00c2\u00c4\u0003\u0002\u0002\u0002\u00c3\u00c1\u0003\u0002\u0002\u0002",
    "\u00c4\u00c5\u0007\u007f\u0002\u0002\u00c5\u00c6\b\u0015\r\u0002\u00c6",
    "-\u0003\u0002\u0002\u0002\u00c7\u00c8\t\n\u0002\u0002\u00c8\u00c9\b",
    "\u0016\u000e\u0002\u00c9/\u0003\u0002\u0002\u0002\u00ca\u00cc\n\u000b",
    "\u0002\u0002\u00cb\u00ca\u0003\u0002\u0002\u0002\u00cc\u00cd\u0003\u0002",
    "\u0002\u0002\u00cd\u00cb\u0003\u0002\u0002\u0002\u00cd\u00ce\u0003\u0002",
    "\u0002\u0002\u00ce\u00cf\u0003\u0002\u0002\u0002\u00cf\u00d0\b\u0017",
    "\u000f\u0002\u00d01\u0003\u0002\u0002\u0002\u00d1\u00d3\u0005\n\u0004",
    "\u0002\u00d2\u00d1\u0003\u0002\u0002\u0002\u00d3\u00d4\u0003\u0002\u0002",
    "\u0002\u00d4\u00d2\u0003\u0002\u0002\u0002\u00d4\u00d5\u0003\u0002\u0002",
    "\u0002\u00d5\u00d6\u0003\u0002\u0002\u0002\u00d6\u00d7\b\u0018\u0002",
    "\u0002\u00d73\u0003\u0002\u0002\u0002\u00d8\u00da\u0007\u000f\u0002",
    "\u0002\u00d9\u00d8\u0003\u0002\u0002\u0002\u00d9\u00da\u0003\u0002\u0002",
    "\u0002\u00da\u00db\u0003\u0002\u0002\u0002\u00db\u00dc\u0007\f\u0002",
    "\u0002\u00dc\u00dd\u0003\u0002\u0002\u0002\u00dd\u00de\b\u0019\b\u0002",
    "\u00de\u00df\b\u0019\t\u0002\u00df5\u0003\u0002\u0002\u0002\u00e0\u00e3",
    "\u0005\u0006\u0002\u0002\u00e1\u00e3\u0005\b\u0003\u0002\u00e2\u00e0",
    "\u0003\u0002\u0002\u0002\u00e2\u00e1\u0003\u0002\u0002\u0002\u00e3\u00e4",
    "\u0003\u0002\u0002\u0002\u00e4\u00e2\u0003\u0002\u0002\u0002\u00e4\u00e5",
    "\u0003\u0002\u0002\u0002\u00e5\u00e7\u0003\u0002\u0002\u0002\u00e6\u00e8",
    "\u0007?\u0002\u0002\u00e7\u00e6\u0003\u0002\u0002\u0002\u00e7\u00e8",
    "\u0003\u0002\u0002\u0002\u00e87\u0003\u0002\u0002\u0002\u00e9\u00ea",
    "\u0007<\u0002\u0002\u00ea9\u0003\u0002\u0002\u0002\u001e\u0002\u0003",
    "\u0004\u0005DLPV]by~\u0088\u008d\u008f\u0097\u00a0\u00a5\u00b6\u00ba",
    "\u00bf\u00c1\u00cd\u00d4\u00d9\u00e2\u00e4\u00e7\u0010\b\u0002\u0002",
    "\u0007\u0003\u0002\u0003\n\u0002\u0007\u0004\u0002\u0003\u000b\u0003",
    "\u0007\u0005\u0002\t\u0005\u0002\u0006\u0002\u0002\t\u0004\u0002\u0003",
    "\u0012\u0004\u0003\u0013\u0005\u0003\u0015\u0006\u0003\u0016\u0007\u0003",
    "\u0017\b"].join("");


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

LUFileLexer.prototype.ruleNames = [ "LETTER", "NUMBER", "WHITESPACE", "STRING_LITERAL", 
                                    "COMMENTS", "WS", "NEWLINE", "HASH", 
                                    "DASH", "DOLLAR", "WS_IN_NAME", "NEWLINE_IN_NAME", 
                                    "IDENTIFIER", "DOT", "WS_IN_BODY_IGNORED", 
                                    "WS_IN_BODY", "NEWLINE_IN_BODY", "ESCAPE_CHARACTER", 
                                    "INVALID_ESCAPE", "EXPRESSION", "TEXT_SEPARATOR", 
                                    "TEXT", "WS_IN_ENTITY", "NEWLINE_IN_ENTITY", 
                                    "ENTITY_IDENTIFIER", "COLON" ];

LUFileLexer.prototype.grammarFileName = "LUFileLexer.g4";


  this.ignoreWS = true;             // usually we ignore whitespace, but inside template, whitespace is significant
  this.expectKeywords = false;        // whether we are expecting IF/ELSEIF/ELSE or Switch/Case/Default keywords


LUFileLexer.prototype.action = function(localctx, ruleIndex, actionIndex) {
	switch (ruleIndex) {
	case 8:
		this.DASH_action(localctx, actionIndex);
		break;
	case 9:
		this.DOLLAR_action(localctx, actionIndex);
		break;
	case 16:
		this.NEWLINE_IN_BODY_action(localctx, actionIndex);
		break;
	case 17:
		this.ESCAPE_CHARACTER_action(localctx, actionIndex);
		break;
	case 19:
		this.EXPRESSION_action(localctx, actionIndex);
		break;
	case 20:
		this.TEXT_SEPARATOR_action(localctx, actionIndex);
		break;
	case 21:
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
		case 14:
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

