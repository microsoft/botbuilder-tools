// Generated from ../LUFileLexer.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u001e\u0197\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\u0004\u0002",
    "\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004\u0004\u0005\t\u0005",
    "\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004\b\t\b\u0004\t\t\t\u0004",
    "\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e",
    "\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004\u0011\t\u0011\u0004\u0012",
    "\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t\u0014\u0004\u0015\t\u0015",
    "\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004\u0018\t\u0018\u0004\u0019",
    "\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t\u001b\u0004\u001c\t\u001c",
    "\u0004\u001d\t\u001d\u0004\u001e\t\u001e\u0004\u001f\t\u001f\u0004 ",
    "\t \u0004!\t!\u0004\"\t\"\u0004#\t#\u0004$\t$\u0004%\t%\u0004&\t&\u0004",
    "\'\t\'\u0004(\t(\u0004)\t)\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0007\u0006b\n\u0006\f\u0006\u000e\u0006e\u000b\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0006\u0006k\n\u0006\r\u0006\u000e",
    "\u0006l\u0003\u0007\u0003\u0007\u0006\u0007q\n\u0007\r\u0007\u000e\u0007",
    "r\u0003\u0007\u0003\u0007\u0003\b\u0006\bx\n\b\r\b\u000e\by\u0003\b",
    "\u0003\b\u0003\t\u0005\t\u007f\n\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\n\u0006\n\u0086\n\n\r\n\u000e\n\u0087\u0003\n\u0006\n\u008b\n\n\r\n",
    "\u000e\n\u008c\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0006",
    "\u000b\u0095\n\u000b\r\u000b\u000e\u000b\u0096\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0007\u000e",
    "\u00a9\n\u000e\f\u000e\u000e\u000e\u00ac\u000b\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000f\u0003\u000f\u0007\u000f\u00b2\n\u000f\f\u000f\u000e",
    "\u000f\u00b5\u000b\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0011",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011",
    "\u0007\u0011\u00d3\n\u0011\f\u0011\u000e\u0011\u00d6\u000b\u0011\u0003",
    "\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003",
    "\u0013\u0006\u0013\u00df\n\u0013\r\u0013\u000e\u0013\u00e0\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0014\u0006\u0014\u00e8\n",
    "\u0014\r\u0014\u000e\u0014\u00e9\u0003\u0014\u0003\u0014\u0003\u0015",
    "\u0005\u0015\u00ef\n\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003",
    "\u0015\u0003\u0015\u0003\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u00f9",
    "\n\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0007\u0016\u00fe\n\u0016",
    "\f\u0016\u000e\u0016\u0101\u000b\u0016\u0003\u0016\u0003\u0016\u0003",
    "\u0017\u0003\u0017\u0003\u0018\u0006\u0018\u0108\n\u0018\r\u0018\u000e",
    "\u0018\u0109\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0019",
    "\u0006\u0019\u0111\n\u0019\r\u0019\u000e\u0019\u0112\u0003\u0019\u0003",
    "\u0019\u0003\u001a\u0005\u001a\u0118\n\u001a\u0003\u001a\u0003\u001a",
    "\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b",
    "\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b",
    "\u0003\u001b\u0005\u001b\u0129\n\u001b\u0003\u001c\u0003\u001c\u0003",
    "\u001c\u0003\u001c\u0007\u001c\u012f\n\u001c\f\u001c\u000e\u001c\u0132",
    "\u000b\u001c\u0003\u001c\u0007\u001c\u0135\n\u001c\f\u001c\u000e\u001c",
    "\u0138\u000b\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001d\u0006",
    "\u001d\u013e\n\u001d\r\u001d\u000e\u001d\u013f\u0003\u001d\u0003\u001d",
    "\u0003\u001e\u0006\u001e\u0145\n\u001e\r\u001e\u000e\u001e\u0146\u0003",
    "\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001f\u0006\u001f\u014e",
    "\n\u001f\r\u001f\u000e\u001f\u014f\u0003\u001f\u0003\u001f\u0003 \u0005",
    " \u0155\n \u0003 \u0003 \u0003 \u0003 \u0003 \u0003 \u0003!\u0003!\u0003",
    "!\u0006!\u0160\n!\r!\u000e!\u0161\u0003!\u0003!\u0003\"\u0003\"\u0007",
    "\"\u0168\n\"\f\"\u000e\"\u016b\u000b\"\u0003#\u0003#\u0007#\u016f\n",
    "#\f#\u000e#\u0172\u000b#\u0003$\u0003$\u0003%\u0003%\u0003&\u0006&\u0179",
    "\n&\r&\u000e&\u017a\u0003&\u0003&\u0003&\u0003&\u0003\'\u0006\'\u0182",
    "\n\'\r\'\u000e\'\u0183\u0003\'\u0003\'\u0003(\u0005(\u0189\n(\u0003",
    "(\u0003(\u0003(\u0003(\u0003(\u0003(\u0003)\u0006)\u0192\n)\r)\u000e",
    ")\u0193\u0003)\u0003)\u0005\u00aa\u00b3\u00d4\u0002*\u0007\u0002\t\u0002",
    "\u000b\u0002\r\u0002\u000f\u0003\u0011\u0004\u0013\u0005\u0015\u0006",
    "\u0017\u0007\u0019\b\u001b\t\u001d\n\u001f\u000b!\f#\r%\u000e\'\u000f",
    ")\u0010+\u0002-\u0002/\u00111\u00123\u00135\u00027\u00029\u0014;\u0015",
    "=\u0016?\u0017A\u0002C\u0002E\u0018G\u0019I\u001aK\u001bM\u001cO\u001d",
    "Q\u0002S\u0002U\u001e\u0007\u0002\u0003\u0004\u0005\u0006\r\u0004\u0002",
    "C\\c|\u0006\u0002\u000b\u000b\"\"\u00a2\u00a2\uff01\uff01\u0004\u0002",
    ",-//\u0004\u0002\f\f\u000f\u000f\u0004\u0002//aa\u0007\u0002__ppttv",
    "v\u007f\u007f\u0006\u0002\f\f\u000f\u000f}}\u007f\u007f\u0007\u0002",
    "\u000b\f\u000f\u000f\"\"}}\u007f\u007f\u0005\u0002/0aa~~\b\u0002\f\f",
    "\u000f\u000f*+]]}}\u007f\u007f\u0005\u0002##..??\u0002\u01b7\u0002\u000f",
    "\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013",
    "\u0003\u0002\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017",
    "\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b",
    "\u0003\u0002\u0002\u0002\u0002\u001d\u0003\u0002\u0002\u0002\u0002\u001f",
    "\u0003\u0002\u0002\u0002\u0002!\u0003\u0002\u0002\u0002\u0002#\u0003",
    "\u0002\u0002\u0002\u0002%\u0003\u0002\u0002\u0002\u0002\'\u0003\u0002",
    "\u0002\u0002\u0003)\u0003\u0002\u0002\u0002\u0003+\u0003\u0002\u0002",
    "\u0002\u0003-\u0003\u0002\u0002\u0002\u0003/\u0003\u0002\u0002\u0002",
    "\u00031\u0003\u0002\u0002\u0002\u00043\u0003\u0002\u0002\u0002\u0004",
    "5\u0003\u0002\u0002\u0002\u00047\u0003\u0002\u0002\u0002\u00049\u0003",
    "\u0002\u0002\u0002\u0004;\u0003\u0002\u0002\u0002\u0004=\u0003\u0002",
    "\u0002\u0002\u0005?\u0003\u0002\u0002\u0002\u0005A\u0003\u0002\u0002",
    "\u0002\u0005C\u0003\u0002\u0002\u0002\u0005E\u0003\u0002\u0002\u0002",
    "\u0005G\u0003\u0002\u0002\u0002\u0005I\u0003\u0002\u0002\u0002\u0005",
    "K\u0003\u0002\u0002\u0002\u0005M\u0003\u0002\u0002\u0002\u0006O\u0003",
    "\u0002\u0002\u0002\u0006Q\u0003\u0002\u0002\u0002\u0006S\u0003\u0002",
    "\u0002\u0002\u0006U\u0003\u0002\u0002\u0002\u0007W\u0003\u0002\u0002",
    "\u0002\tY\u0003\u0002\u0002\u0002\u000b[\u0003\u0002\u0002\u0002\r]",
    "\u0003\u0002\u0002\u0002\u000f_\u0003\u0002\u0002\u0002\u0011n\u0003",
    "\u0002\u0002\u0002\u0013w\u0003\u0002\u0002\u0002\u0015~\u0003\u0002",
    "\u0002\u0002\u0017\u0085\u0003\u0002\u0002\u0002\u0019\u0094\u0003\u0002",
    "\u0002\u0002\u001b\u009c\u0003\u0002\u0002\u0002\u001d\u00a1\u0003\u0002",
    "\u0002\u0002\u001f\u00a6\u0003\u0002\u0002\u0002!\u00af\u0003\u0002",
    "\u0002\u0002#\u00b8\u0003\u0002\u0002\u0002%\u00c5\u0003\u0002\u0002",
    "\u0002\'\u00db\u0003\u0002\u0002\u0002)\u00de\u0003\u0002\u0002\u0002",
    "+\u00e7\u0003\u0002\u0002\u0002-\u00ee\u0003\u0002\u0002\u0002/\u00f8",
    "\u0003\u0002\u0002\u00021\u0104\u0003\u0002\u0002\u00023\u0107\u0003",
    "\u0002\u0002\u00025\u0110\u0003\u0002\u0002\u00027\u0117\u0003\u0002",
    "\u0002\u00029\u0128\u0003\u0002\u0002\u0002;\u012a\u0003\u0002\u0002",
    "\u0002=\u013d\u0003\u0002\u0002\u0002?\u0144\u0003\u0002\u0002\u0002",
    "A\u014d\u0003\u0002\u0002\u0002C\u0154\u0003\u0002\u0002\u0002E\u015f",
    "\u0003\u0002\u0002\u0002G\u0165\u0003\u0002\u0002\u0002I\u016c\u0003",
    "\u0002\u0002\u0002K\u0173\u0003\u0002\u0002\u0002M\u0175\u0003\u0002",
    "\u0002\u0002O\u0178\u0003\u0002\u0002\u0002Q\u0181\u0003\u0002\u0002",
    "\u0002S\u0188\u0003\u0002\u0002\u0002U\u0191\u0003\u0002\u0002\u0002",
    "WX\t\u0002\u0002\u0002X\b\u0003\u0002\u0002\u0002YZ\u00042;\u0002Z\n",
    "\u0003\u0002\u0002\u0002[\\\t\u0003\u0002\u0002\\\f\u0003\u0002\u0002",
    "\u0002]^\t\u0004\u0002\u0002^\u000e\u0003\u0002\u0002\u0002_c\u0007",
    "@\u0002\u0002`b\u0005\u000b\u0004\u0002a`\u0003\u0002\u0002\u0002be",
    "\u0003\u0002\u0002\u0002ca\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002",
    "\u0002df\u0003\u0002\u0002\u0002ec\u0003\u0002\u0002\u0002fg\u0007#",
    "\u0002\u0002gh\u0007%\u0002\u0002hj\u0003\u0002\u0002\u0002ik\n\u0005",
    "\u0002\u0002ji\u0003\u0002\u0002\u0002kl\u0003\u0002\u0002\u0002lj\u0003",
    "\u0002\u0002\u0002lm\u0003\u0002\u0002\u0002m\u0010\u0003\u0002\u0002",
    "\u0002np\u0007@\u0002\u0002oq\n\u0005\u0002\u0002po\u0003\u0002\u0002",
    "\u0002qr\u0003\u0002\u0002\u0002rp\u0003\u0002\u0002\u0002rs\u0003\u0002",
    "\u0002\u0002st\u0003\u0002\u0002\u0002tu\b\u0007\u0002\u0002u\u0012",
    "\u0003\u0002\u0002\u0002vx\u0005\u000b\u0004\u0002wv\u0003\u0002\u0002",
    "\u0002xy\u0003\u0002\u0002\u0002yw\u0003\u0002\u0002\u0002yz\u0003\u0002",
    "\u0002\u0002z{\u0003\u0002\u0002\u0002{|\b\b\u0002\u0002|\u0014\u0003",
    "\u0002\u0002\u0002}\u007f\u0007\u000f\u0002\u0002~}\u0003\u0002\u0002",
    "\u0002~\u007f\u0003\u0002\u0002\u0002\u007f\u0080\u0003\u0002\u0002",
    "\u0002\u0080\u0081\u0007\f\u0002\u0002\u0081\u0082\u0003\u0002\u0002",
    "\u0002\u0082\u0083\b\t\u0002\u0002\u0083\u0016\u0003\u0002\u0002\u0002",
    "\u0084\u0086\u0007%\u0002\u0002\u0085\u0084\u0003\u0002\u0002\u0002",
    "\u0086\u0087\u0003\u0002\u0002\u0002\u0087\u0085\u0003\u0002\u0002\u0002",
    "\u0087\u0088\u0003\u0002\u0002\u0002\u0088\u008a\u0003\u0002\u0002\u0002",
    "\u0089\u008b\u0005\u000b\u0004\u0002\u008a\u0089\u0003\u0002\u0002\u0002",
    "\u008b\u008c\u0003\u0002\u0002\u0002\u008c\u008a\u0003\u0002\u0002\u0002",
    "\u008c\u008d\u0003\u0002\u0002\u0002\u008d\u008e\u0003\u0002\u0002\u0002",
    "\u008e\u008f\u0007A\u0002\u0002\u008f\u0090\b\n\u0003\u0002\u0090\u0091",
    "\u0003\u0002\u0002\u0002\u0091\u0092\b\n\u0004\u0002\u0092\u0018\u0003",
    "\u0002\u0002\u0002\u0093\u0095\u0007%\u0002\u0002\u0094\u0093\u0003",
    "\u0002\u0002\u0002\u0095\u0096\u0003\u0002\u0002\u0002\u0096\u0094\u0003",
    "\u0002\u0002\u0002\u0096\u0097\u0003\u0002\u0002\u0002\u0097\u0098\u0003",
    "\u0002\u0002\u0002\u0098\u0099\b\u000b\u0005\u0002\u0099\u009a\u0003",
    "\u0002\u0002\u0002\u009a\u009b\b\u000b\u0006\u0002\u009b\u001a\u0003",
    "\u0002\u0002\u0002\u009c\u009d\u0005\r\u0005\u0002\u009d\u009e\b\f\u0007",
    "\u0002\u009e\u009f\u0003\u0002\u0002\u0002\u009f\u00a0\b\f\b\u0002\u00a0",
    "\u001c\u0003\u0002\u0002\u0002\u00a1\u00a2\u0007&\u0002\u0002\u00a2",
    "\u00a3\b\r\t\u0002\u00a3\u00a4\u0003\u0002\u0002\u0002\u00a4\u00a5\b",
    "\r\n\u0002\u00a5\u001e\u0003\u0002\u0002\u0002\u00a6\u00aa\u0007]\u0002",
    "\u0002\u00a7\u00a9\u000b\u0002\u0002\u0002\u00a8\u00a7\u0003\u0002\u0002",
    "\u0002\u00a9\u00ac\u0003\u0002\u0002\u0002\u00aa\u00ab\u0003\u0002\u0002",
    "\u0002\u00aa\u00a8\u0003\u0002\u0002\u0002\u00ab\u00ad\u0003\u0002\u0002",
    "\u0002\u00ac\u00aa\u0003\u0002\u0002\u0002\u00ad\u00ae\u0007_\u0002",
    "\u0002\u00ae \u0003\u0002\u0002\u0002\u00af\u00b3\u0007*\u0002\u0002",
    "\u00b0\u00b2\u000b\u0002\u0002\u0002\u00b1\u00b0\u0003\u0002\u0002\u0002",
    "\u00b2\u00b5\u0003\u0002\u0002\u0002\u00b3\u00b4\u0003\u0002\u0002\u0002",
    "\u00b3\u00b1\u0003\u0002\u0002\u0002\u00b4\u00b6\u0003\u0002\u0002\u0002",
    "\u00b5\u00b3\u0003\u0002\u0002\u0002\u00b6\u00b7\u0007+\u0002\u0002",
    "\u00b7\"\u0003\u0002\u0002\u0002\u00b8\u00b9\u0007,\u0002\u0002\u00b9",
    "\u00ba\u0007,\u0002\u0002\u00ba\u00bb\u0007H\u0002\u0002\u00bb\u00bc",
    "\u0007k\u0002\u0002\u00bc\u00bd\u0007n\u0002\u0002\u00bd\u00be\u0007",
    "v\u0002\u0002\u00be\u00bf\u0007g\u0002\u0002\u00bf\u00c0\u0007t\u0002",
    "\u0002\u00c0\u00c1\u0007u\u0002\u0002\u00c1\u00c2\u0007<\u0002\u0002",
    "\u00c2\u00c3\u0007,\u0002\u0002\u00c3\u00c4\u0007,\u0002\u0002\u00c4",
    "$\u0003\u0002\u0002\u0002\u00c5\u00c6\u0007b\u0002\u0002\u00c6\u00c7",
    "\u0007b\u0002\u0002\u00c7\u00c8\u0007b\u0002\u0002\u00c8\u00c9\u0007",
    "o\u0002\u0002\u00c9\u00ca\u0007c\u0002\u0002\u00ca\u00cb\u0007t\u0002",
    "\u0002\u00cb\u00cc\u0007m\u0002\u0002\u00cc\u00cd\u0007f\u0002\u0002",
    "\u00cd\u00ce\u0007q\u0002\u0002\u00ce\u00cf\u0007y\u0002\u0002\u00cf",
    "\u00d0\u0007p\u0002\u0002\u00d0\u00d4\u0003\u0002\u0002\u0002\u00d1",
    "\u00d3\u000b\u0002\u0002\u0002\u00d2\u00d1\u0003\u0002\u0002\u0002\u00d3",
    "\u00d6\u0003\u0002\u0002\u0002\u00d4\u00d5\u0003\u0002\u0002\u0002\u00d4",
    "\u00d2\u0003\u0002\u0002\u0002\u00d5\u00d7\u0003\u0002\u0002\u0002\u00d6",
    "\u00d4\u0003\u0002\u0002\u0002\u00d7\u00d8\u0007b\u0002\u0002\u00d8",
    "\u00d9\u0007b\u0002\u0002\u00d9\u00da\u0007b\u0002\u0002\u00da&\u0003",
    "\u0002\u0002\u0002\u00db\u00dc\u000b\u0002\u0002\u0002\u00dc(\u0003",
    "\u0002\u0002\u0002\u00dd\u00df\u0005\u000b\u0004\u0002\u00de\u00dd\u0003",
    "\u0002\u0002\u0002\u00df\u00e0\u0003\u0002\u0002\u0002\u00e0\u00de\u0003",
    "\u0002\u0002\u0002\u00e0\u00e1\u0003\u0002\u0002\u0002\u00e1\u00e2\u0003",
    "\u0002\u0002\u0002\u00e2\u00e3\u0006\u0013\u0002\u0002\u00e3\u00e4\u0003",
    "\u0002\u0002\u0002\u00e4\u00e5\b\u0013\u0002\u0002\u00e5*\u0003\u0002",
    "\u0002\u0002\u00e6\u00e8\u0005\u000b\u0004\u0002\u00e7\u00e6\u0003\u0002",
    "\u0002\u0002\u00e8\u00e9\u0003\u0002\u0002\u0002\u00e9\u00e7\u0003\u0002",
    "\u0002\u0002\u00e9\u00ea\u0003\u0002\u0002\u0002\u00ea\u00eb\u0003\u0002",
    "\u0002\u0002\u00eb\u00ec\b\u0014\u000b\u0002\u00ec,\u0003\u0002\u0002",
    "\u0002\u00ed\u00ef\u0007\u000f\u0002\u0002\u00ee\u00ed\u0003\u0002\u0002",
    "\u0002\u00ee\u00ef\u0003\u0002\u0002\u0002\u00ef\u00f0\u0003\u0002\u0002",
    "\u0002\u00f0\u00f1\u0007\f\u0002\u0002\u00f1\u00f2\u0003\u0002\u0002",
    "\u0002\u00f2\u00f3\b\u0015\f\u0002\u00f3\u00f4\b\u0015\r\u0002\u00f4",
    ".\u0003\u0002\u0002\u0002\u00f5\u00f9\u0005\u0007\u0002\u0002\u00f6",
    "\u00f9\u0005\t\u0003\u0002\u00f7\u00f9\u0007a\u0002\u0002\u00f8\u00f5",
    "\u0003\u0002\u0002\u0002\u00f8\u00f6\u0003\u0002\u0002\u0002\u00f8\u00f7",
    "\u0003\u0002\u0002\u0002\u00f9\u00ff\u0003\u0002\u0002\u0002\u00fa\u00fe",
    "\u0005\u0007\u0002\u0002\u00fb\u00fe\u0005\t\u0003\u0002\u00fc\u00fe",
    "\t\u0006\u0002\u0002\u00fd\u00fa\u0003\u0002\u0002\u0002\u00fd\u00fb",
    "\u0003\u0002\u0002\u0002\u00fd\u00fc\u0003\u0002\u0002\u0002\u00fe\u0101",
    "\u0003\u0002\u0002\u0002\u00ff\u00fd\u0003\u0002\u0002\u0002\u00ff\u0100",
    "\u0003\u0002\u0002\u0002\u0100\u0102\u0003\u0002\u0002\u0002\u0101\u00ff",
    "\u0003\u0002\u0002\u0002\u0102\u0103\b\u0016\u000e\u0002\u01030\u0003",
    "\u0002\u0002\u0002\u0104\u0105\u00070\u0002\u0002\u01052\u0003\u0002",
    "\u0002\u0002\u0106\u0108\u0005\u000b\u0004\u0002\u0107\u0106\u0003\u0002",
    "\u0002\u0002\u0108\u0109\u0003\u0002\u0002\u0002\u0109\u0107\u0003\u0002",
    "\u0002\u0002\u0109\u010a\u0003\u0002\u0002\u0002\u010a\u010b\u0003\u0002",
    "\u0002\u0002\u010b\u010c\u0006\u0018\u0003\u0002\u010c\u010d\u0003\u0002",
    "\u0002\u0002\u010d\u010e\b\u0018\u0002\u0002\u010e4\u0003\u0002\u0002",
    "\u0002\u010f\u0111\u0005\u000b\u0004\u0002\u0110\u010f\u0003\u0002\u0002",
    "\u0002\u0111\u0112\u0003\u0002\u0002\u0002\u0112\u0110\u0003\u0002\u0002",
    "\u0002\u0112\u0113\u0003\u0002\u0002\u0002\u0113\u0114\u0003\u0002\u0002",
    "\u0002\u0114\u0115\b\u0019\u000b\u0002\u01156\u0003\u0002\u0002\u0002",
    "\u0116\u0118\u0007\u000f\u0002\u0002\u0117\u0116\u0003\u0002\u0002\u0002",
    "\u0117\u0118\u0003\u0002\u0002\u0002\u0118\u0119\u0003\u0002\u0002\u0002",
    "\u0119\u011a\u0007\f\u0002\u0002\u011a\u011b\b\u001a\u000f\u0002\u011b",
    "\u011c\u0003\u0002\u0002\u0002\u011c\u011d\b\u001a\f\u0002\u011d\u011e",
    "\b\u001a\r\u0002\u011e8\u0003\u0002\u0002\u0002\u011f\u0120\u0007^\u0002",
    "\u0002\u0120\u0129\u0007}\u0002\u0002\u0121\u0122\u0007^\u0002\u0002",
    "\u0122\u0129\u0007]\u0002\u0002\u0123\u0124\u0007^\u0002\u0002\u0124",
    "\u0129\u0007^\u0002\u0002\u0125\u0126\u0007^\u0002\u0002\u0126\u0127",
    "\t\u0007\u0002\u0002\u0127\u0129\b\u001b\u0010\u0002\u0128\u011f\u0003",
    "\u0002\u0002\u0002\u0128\u0121\u0003\u0002\u0002\u0002\u0128\u0123\u0003",
    "\u0002\u0002\u0002\u0128\u0125\u0003\u0002\u0002\u0002\u0129:\u0003",
    "\u0002\u0002\u0002\u012a\u0136\u0007}\u0002\u0002\u012b\u0135\n\b\u0002",
    "\u0002\u012c\u0130\u0007}\u0002\u0002\u012d\u012f\n\u0005\u0002\u0002",
    "\u012e\u012d\u0003\u0002\u0002\u0002\u012f\u0132\u0003\u0002\u0002\u0002",
    "\u0130\u012e\u0003\u0002\u0002\u0002\u0130\u0131\u0003\u0002\u0002\u0002",
    "\u0131\u0133\u0003\u0002\u0002\u0002\u0132\u0130\u0003\u0002\u0002\u0002",
    "\u0133\u0135\u0007\u007f\u0002\u0002\u0134\u012b\u0003\u0002\u0002\u0002",
    "\u0134\u012c\u0003\u0002\u0002\u0002\u0135\u0138\u0003\u0002\u0002\u0002",
    "\u0136\u0134\u0003\u0002\u0002\u0002\u0136\u0137\u0003\u0002\u0002\u0002",
    "\u0137\u0139\u0003\u0002\u0002\u0002\u0138\u0136\u0003\u0002\u0002\u0002",
    "\u0139\u013a\u0007\u007f\u0002\u0002\u013a\u013b\b\u001c\u0011\u0002",
    "\u013b<\u0003\u0002\u0002\u0002\u013c\u013e\n\t\u0002\u0002\u013d\u013c",
    "\u0003\u0002\u0002\u0002\u013e\u013f\u0003\u0002\u0002\u0002\u013f\u013d",
    "\u0003\u0002\u0002\u0002\u013f\u0140\u0003\u0002\u0002\u0002\u0140\u0141",
    "\u0003\u0002\u0002\u0002\u0141\u0142\b\u001d\u0012\u0002\u0142>\u0003",
    "\u0002\u0002\u0002\u0143\u0145\u0005\u000b\u0004\u0002\u0144\u0143\u0003",
    "\u0002\u0002\u0002\u0145\u0146\u0003\u0002\u0002\u0002\u0146\u0144\u0003",
    "\u0002\u0002\u0002\u0146\u0147\u0003\u0002\u0002\u0002\u0147\u0148\u0003",
    "\u0002\u0002\u0002\u0148\u0149\u0006\u001e\u0004\u0002\u0149\u014a\u0003",
    "\u0002\u0002\u0002\u014a\u014b\b\u001e\u0002\u0002\u014b@\u0003\u0002",
    "\u0002\u0002\u014c\u014e\u0005\u000b\u0004\u0002\u014d\u014c\u0003\u0002",
    "\u0002\u0002\u014e\u014f\u0003\u0002\u0002\u0002\u014f\u014d\u0003\u0002",
    "\u0002\u0002\u014f\u0150\u0003\u0002\u0002\u0002\u0150\u0151\u0003\u0002",
    "\u0002\u0002\u0151\u0152\b\u001f\u000b\u0002\u0152B\u0003\u0002\u0002",
    "\u0002\u0153\u0155\u0007\u000f\u0002\u0002\u0154\u0153\u0003\u0002\u0002",
    "\u0002\u0154\u0155\u0003\u0002\u0002\u0002\u0155\u0156\u0003\u0002\u0002",
    "\u0002\u0156\u0157\u0007\f\u0002\u0002\u0157\u0158\b \u0013\u0002\u0158",
    "\u0159\u0003\u0002\u0002\u0002\u0159\u015a\b \f\u0002\u015a\u015b\b",
    " \r\u0002\u015bD\u0003\u0002\u0002\u0002\u015c\u0160\u0005\u0007\u0002",
    "\u0002\u015d\u0160\u0005\t\u0003\u0002\u015e\u0160\t\n\u0002\u0002\u015f",
    "\u015c\u0003\u0002\u0002\u0002\u015f\u015d\u0003\u0002\u0002\u0002\u015f",
    "\u015e\u0003\u0002\u0002\u0002\u0160\u0161\u0003\u0002\u0002\u0002\u0161",
    "\u015f\u0003\u0002\u0002\u0002\u0161\u0162\u0003\u0002\u0002\u0002\u0162",
    "\u0163\u0003\u0002\u0002\u0002\u0163\u0164\b!\u0014\u0002\u0164F\u0003",
    "\u0002\u0002\u0002\u0165\u0169\u0007]\u0002\u0002\u0166\u0168\n\u000b",
    "\u0002\u0002\u0167\u0166\u0003\u0002\u0002\u0002\u0168\u016b\u0003\u0002",
    "\u0002\u0002\u0169\u0167\u0003\u0002\u0002\u0002\u0169\u016a\u0003\u0002",
    "\u0002\u0002\u016aH\u0003\u0002\u0002\u0002\u016b\u0169\u0003\u0002",
    "\u0002\u0002\u016c\u0170\u00071\u0002\u0002\u016d\u016f\n\u0005\u0002",
    "\u0002\u016e\u016d\u0003\u0002\u0002\u0002\u016f\u0172\u0003\u0002\u0002",
    "\u0002\u0170\u016e\u0003\u0002\u0002\u0002\u0170\u0171\u0003\u0002\u0002",
    "\u0002\u0171J\u0003\u0002\u0002\u0002\u0172\u0170\u0003\u0002\u0002",
    "\u0002\u0173\u0174\u0007<\u0002\u0002\u0174L\u0003\u0002\u0002\u0002",
    "\u0175\u0176\t\f\u0002\u0002\u0176N\u0003\u0002\u0002\u0002\u0177\u0179",
    "\u0005\u000b\u0004\u0002\u0178\u0177\u0003\u0002\u0002\u0002\u0179\u017a",
    "\u0003\u0002\u0002\u0002\u017a\u0178\u0003\u0002\u0002\u0002\u017a\u017b",
    "\u0003\u0002\u0002\u0002\u017b\u017c\u0003\u0002\u0002\u0002\u017c\u017d",
    "\u0006&\u0005\u0002\u017d\u017e\u0003\u0002\u0002\u0002\u017e\u017f",
    "\b&\u0002\u0002\u017fP\u0003\u0002\u0002\u0002\u0180\u0182\u0005\u000b",
    "\u0004\u0002\u0181\u0180\u0003\u0002\u0002\u0002\u0182\u0183\u0003\u0002",
    "\u0002\u0002\u0183\u0181\u0003\u0002\u0002\u0002\u0183\u0184\u0003\u0002",
    "\u0002\u0002\u0184\u0185\u0003\u0002\u0002\u0002\u0185\u0186\b\'\u000b",
    "\u0002\u0186R\u0003\u0002\u0002\u0002\u0187\u0189\u0007\u000f\u0002",
    "\u0002\u0188\u0187\u0003\u0002\u0002\u0002\u0188\u0189\u0003\u0002\u0002",
    "\u0002\u0189\u018a\u0003\u0002\u0002\u0002\u018a\u018b\u0007\f\u0002",
    "\u0002\u018b\u018c\b(\u0015\u0002\u018c\u018d\u0003\u0002\u0002\u0002",
    "\u018d\u018e\b(\f\u0002\u018e\u018f\b(\r\u0002\u018fT\u0003\u0002\u0002",
    "\u0002\u0190\u0192\n\t\u0002\u0002\u0191\u0190\u0003\u0002\u0002\u0002",
    "\u0192\u0193\u0003\u0002\u0002\u0002\u0193\u0191\u0003\u0002\u0002\u0002",
    "\u0193\u0194\u0003\u0002\u0002\u0002\u0194\u0195\u0003\u0002\u0002\u0002",
    "\u0195\u0196\b)\u0016\u0002\u0196V\u0003\u0002\u0002\u0002+\u0002\u0003",
    "\u0004\u0005\u0006clry~\u0087\u008c\u0096\u00aa\u00b3\u00d4\u00e0\u00e9",
    "\u00ee\u00f8\u00fd\u00ff\u0109\u0112\u0117\u0128\u0130\u0134\u0136\u013f",
    "\u0146\u014f\u0154\u015f\u0161\u0169\u0170\u017a\u0183\u0188\u0193\u0017",
    "\b\u0002\u0002\u0003\n\u0002\u0007\u0006\u0002\u0003\u000b\u0003\u0007",
    "\u0003\u0002\u0003\f\u0004\u0007\u0004\u0002\u0003\r\u0005\u0007\u0005",
    "\u0002\t\u0005\u0002\t\u0006\u0002\u0006\u0002\u0002\u0003\u0016\u0006",
    "\u0003\u001a\u0007\u0003\u001b\b\u0003\u001c\t\u0003\u001d\n\u0003 ",
    "\u000b\u0003!\f\u0003(\r\u0003)\u000e"].join("");


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
LUFileLexer.MODEL_INFO = 1;
LUFileLexer.COMMENT = 2;
LUFileLexer.WS = 3;
LUFileLexer.NEWLINE = 4;
LUFileLexer.QNA = 5;
LUFileLexer.HASH = 6;
LUFileLexer.DASH = 7;
LUFileLexer.DOLLAR = 8;
LUFileLexer.IMPORT_DESC = 9;
LUFileLexer.IMPORT_PATH = 10;
LUFileLexer.FILTER_MARK = 11;
LUFileLexer.MULTI_LINE_TEXT = 12;
LUFileLexer.INVALID_TOKEN_DEFAULT_MODE = 13;
LUFileLexer.WS_IN_NAME_IGNORED = 14;
LUFileLexer.IDENTIFIER = 15;
LUFileLexer.DOT = 16;
LUFileLexer.WS_IN_BODY_IGNORED = 17;
LUFileLexer.ESCAPE_CHARACTER = 18;
LUFileLexer.EXPRESSION = 19;
LUFileLexer.TEXT = 20;
LUFileLexer.WS_IN_ENTITY_IGNORED = 21;
LUFileLexer.ENTITY_IDENTIFIER = 22;
LUFileLexer.COMPOSITE_ENTITY = 23;
LUFileLexer.REGEX_ENTITY = 24;
LUFileLexer.COLON_MARK = 25;
LUFileLexer.SPECIAL_CHAR_MARK = 26;
LUFileLexer.WS_IN_QNA_IGNORED = 27;
LUFileLexer.QNA_TEXT = 28;

LUFileLexer.INTENT_NAME_MODE = 1;
LUFileLexer.INTENT_BODY_MODE = 2;
LUFileLexer.ENTITY_MODE = 3;
LUFileLexer.QNA_MODE = 4;

LUFileLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

LUFileLexer.prototype.modeNames = [ "DEFAULT_MODE", "INTENT_NAME_MODE", 
                                    "INTENT_BODY_MODE", "ENTITY_MODE", "QNA_MODE" ];

LUFileLexer.prototype.literalNames = [ null, null, null, null, null, null, 
                                       null, null, null, null, null, "'**Filters:**'", 
                                       null, null, null, null, "'.'", null, 
                                       null, null, null, null, null, null, 
                                       null, "':'" ];

LUFileLexer.prototype.symbolicNames = [ null, "MODEL_INFO", "COMMENT", "WS", 
                                        "NEWLINE", "QNA", "HASH", "DASH", 
                                        "DOLLAR", "IMPORT_DESC", "IMPORT_PATH", 
                                        "FILTER_MARK", "MULTI_LINE_TEXT", 
                                        "INVALID_TOKEN_DEFAULT_MODE", "WS_IN_NAME_IGNORED", 
                                        "IDENTIFIER", "DOT", "WS_IN_BODY_IGNORED", 
                                        "ESCAPE_CHARACTER", "EXPRESSION", 
                                        "TEXT", "WS_IN_ENTITY_IGNORED", 
                                        "ENTITY_IDENTIFIER", "COMPOSITE_ENTITY", 
                                        "REGEX_ENTITY", "COLON_MARK", "SPECIAL_CHAR_MARK", 
                                        "WS_IN_QNA_IGNORED", "QNA_TEXT" ];

LUFileLexer.prototype.ruleNames = [ "LETTER", "NUMBER", "WHITESPACE", "UTTERANCE_MARK", 
                                    "MODEL_INFO", "COMMENT", "WS", "NEWLINE", 
                                    "QNA", "HASH", "DASH", "DOLLAR", "IMPORT_DESC", 
                                    "IMPORT_PATH", "FILTER_MARK", "MULTI_LINE_TEXT", 
                                    "INVALID_TOKEN_DEFAULT_MODE", "WS_IN_NAME_IGNORED", 
                                    "WS_IN_NAME", "NEWLINE_IN_NAME", "IDENTIFIER", 
                                    "DOT", "WS_IN_BODY_IGNORED", "WS_IN_BODY", 
                                    "NEWLINE_IN_BODY", "ESCAPE_CHARACTER", 
                                    "EXPRESSION", "TEXT", "WS_IN_ENTITY_IGNORED", 
                                    "WS_IN_ENTITY", "NEWLINE_IN_ENTITY", 
                                    "ENTITY_IDENTIFIER", "COMPOSITE_ENTITY", 
                                    "REGEX_ENTITY", "COLON_MARK", "SPECIAL_CHAR_MARK", 
                                    "WS_IN_QNA_IGNORED", "WS_IN_QNA", "NEWLINE_IN_QNA", 
                                    "QNA_TEXT" ];

LUFileLexer.prototype.grammarFileName = "LUFileLexer.g4";


  this.ignoreWS = true;             // usually we ignore whitespace, but inside template, whitespace is significant


LUFileLexer.prototype.action = function(localctx, ruleIndex, actionIndex) {
	switch (ruleIndex) {
	case 8:
		this.QNA_action(localctx, actionIndex);
		break;
	case 9:
		this.HASH_action(localctx, actionIndex);
		break;
	case 10:
		this.DASH_action(localctx, actionIndex);
		break;
	case 11:
		this.DOLLAR_action(localctx, actionIndex);
		break;
	case 20:
		this.IDENTIFIER_action(localctx, actionIndex);
		break;
	case 24:
		this.NEWLINE_IN_BODY_action(localctx, actionIndex);
		break;
	case 25:
		this.ESCAPE_CHARACTER_action(localctx, actionIndex);
		break;
	case 26:
		this.EXPRESSION_action(localctx, actionIndex);
		break;
	case 27:
		this.TEXT_action(localctx, actionIndex);
		break;
	case 30:
		this.NEWLINE_IN_ENTITY_action(localctx, actionIndex);
		break;
	case 31:
		this.ENTITY_IDENTIFIER_action(localctx, actionIndex);
		break;
	case 38:
		this.NEWLINE_IN_QNA_action(localctx, actionIndex);
		break;
	case 39:
		this.QNA_TEXT_action(localctx, actionIndex);
		break;
	default:
		throw "No registered action for:" + ruleIndex;
	}
};


LUFileLexer.prototype.QNA_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 0:
		this.ignoreWS = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.HASH_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 1:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.DASH_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 2:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.DOLLAR_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 3:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.IDENTIFIER_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 4:
		 this.ignoreWS = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.NEWLINE_IN_BODY_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 5:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.ESCAPE_CHARACTER_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 6:
		 this.ignoreWS = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.EXPRESSION_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 7:
		 this.ignoreWS = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.TEXT_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 8:
		 this.ignoreWS = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.NEWLINE_IN_ENTITY_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 9:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.ENTITY_IDENTIFIER_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 10:
		 this.ignoreWS = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.NEWLINE_IN_QNA_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 11:
		this.ignoreWS = true;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

LUFileLexer.prototype.QNA_TEXT_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 12:
		 this.ignoreWS = false;
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};
LUFileLexer.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch (ruleIndex) {
		case 17:
			return this.WS_IN_NAME_IGNORED_sempred(localctx, predIndex);
		case 22:
			return this.WS_IN_BODY_IGNORED_sempred(localctx, predIndex);
		case 28:
			return this.WS_IN_ENTITY_IGNORED_sempred(localctx, predIndex);
		case 36:
			return this.WS_IN_QNA_IGNORED_sempred(localctx, predIndex);
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

LUFileLexer.prototype.WS_IN_QNA_IGNORED_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 3:
			return this.ignoreWS;
		default:
			throw "No predicate with index:" + predIndex;
	}
};



exports.LUFileLexer = LUFileLexer;

