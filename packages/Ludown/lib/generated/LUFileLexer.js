// Generated from ../LUFileLexer.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u001d\u0184\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\u0004\u0002",
    "\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004\u0004\u0005\t\u0005",
    "\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004\b\t\b\u0004\t\t\t\u0004",
    "\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e",
    "\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004\u0011\t\u0011\u0004\u0012",
    "\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t\u0014\u0004\u0015\t\u0015",
    "\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004\u0018\t\u0018\u0004\u0019",
    "\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t\u001b\u0004\u001c\t\u001c",
    "\u0004\u001d\t\u001d\u0004\u001e\t\u001e\u0004\u001f\t\u001f\u0004 ",
    "\t \u0004!\t!\u0004\"\t\"\u0004#\t#\u0004$\t$\u0004%\t%\u0004&\t&\u0004",
    "\'\t\'\u0004(\t(\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0006\u0006_",
    "\n\u0006\r\u0006\u000e\u0006`\u0003\u0006\u0003\u0006\u0003\u0007\u0005",
    "\u0007f\n\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\b\u0006\bm\n\b\r\b\u000e\bn\u0003\b\u0006\br\n\b\r\b\u000e\bs\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0006\t|\n\t\r\t\u000e\t",
    "}\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\f\u0003\f\u0006\f\u0090\n\f\r\f\u000e\f\u0091\u0003\r\u0003\r\u0007",
    "\r\u0096\n\r\f\r\u000e\r\u0099\u000b\r\u0003\r\u0003\r\u0003\u000e\u0003",
    "\u000e\u0007\u000e\u009f\n\u000e\f\u000e\u000e\u000e\u00a2\u000b\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0007\u0010\u00c0\n",
    "\u0010\f\u0010\u000e\u0010\u00c3\u000b\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0012\u0006\u0012",
    "\u00cc\n\u0012\r\u0012\u000e\u0012\u00cd\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0003\u0012\u0003\u0013\u0006\u0013\u00d5\n\u0013\r\u0013\u000e",
    "\u0013\u00d6\u0003\u0013\u0003\u0013\u0003\u0014\u0005\u0014\u00dc\n",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0005\u0015\u00e6\n\u0015\u0003\u0015",
    "\u0003\u0015\u0003\u0015\u0007\u0015\u00eb\n\u0015\f\u0015\u000e\u0015",
    "\u00ee\u000b\u0015\u0003\u0015\u0003\u0015\u0003\u0016\u0003\u0016\u0003",
    "\u0017\u0006\u0017\u00f5\n\u0017\r\u0017\u000e\u0017\u00f6\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0018\u0006\u0018\u00fe\n",
    "\u0018\r\u0018\u000e\u0018\u00ff\u0003\u0018\u0003\u0018\u0003\u0019",
    "\u0005\u0019\u0105\n\u0019\u0003\u0019\u0003\u0019\u0003\u0019\u0003",
    "\u0019\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0003\u001a\u0003",
    "\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0005",
    "\u001a\u0116\n\u001a\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b",
    "\u0007\u001b\u011c\n\u001b\f\u001b\u000e\u001b\u011f\u000b\u001b\u0003",
    "\u001b\u0007\u001b\u0122\n\u001b\f\u001b\u000e\u001b\u0125\u000b\u001b",
    "\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001c\u0006\u001c\u012b\n",
    "\u001c\r\u001c\u000e\u001c\u012c\u0003\u001c\u0003\u001c\u0003\u001d",
    "\u0006\u001d\u0132\n\u001d\r\u001d\u000e\u001d\u0133\u0003\u001d\u0003",
    "\u001d\u0003\u001d\u0003\u001d\u0003\u001e\u0006\u001e\u013b\n\u001e",
    "\r\u001e\u000e\u001e\u013c\u0003\u001e\u0003\u001e\u0003\u001f\u0005",
    "\u001f\u0142\n\u001f\u0003\u001f\u0003\u001f\u0003\u001f\u0003\u001f",
    "\u0003\u001f\u0003\u001f\u0003 \u0003 \u0003 \u0006 \u014d\n \r \u000e",
    " \u014e\u0003 \u0003 \u0003!\u0003!\u0007!\u0155\n!\f!\u000e!\u0158",
    "\u000b!\u0003\"\u0003\"\u0007\"\u015c\n\"\f\"\u000e\"\u015f\u000b\"",
    "\u0003#\u0003#\u0003$\u0003$\u0003%\u0006%\u0166\n%\r%\u000e%\u0167",
    "\u0003%\u0003%\u0003%\u0003%\u0003&\u0006&\u016f\n&\r&\u000e&\u0170",
    "\u0003&\u0003&\u0003\'\u0005\'\u0176\n\'\u0003\'\u0003\'\u0003\'\u0003",
    "\'\u0003\'\u0003\'\u0003(\u0006(\u017f\n(\r(\u000e(\u0180\u0003(\u0003",
    "(\u0005\u0097\u00a0\u00c1\u0002)\u0007\u0002\t\u0002\u000b\u0002\r\u0002",
    "\u000f\u0003\u0011\u0004\u0013\u0005\u0015\u0006\u0017\u0007\u0019\b",
    "\u001b\t\u001d\n\u001f\u000b!\f#\r%\u000e\'\u000f)\u0002+\u0002-\u0010",
    "/\u00111\u00123\u00025\u00027\u00139\u0014;\u0015=\u0016?\u0002A\u0002",
    "C\u0017E\u0018G\u0019I\u001aK\u001bM\u001cO\u0002Q\u0002S\u001d\u0007",
    "\u0002\u0003\u0004\u0005\u0006\r\u0004\u0002C\\c|\u0006\u0002\u000b",
    "\u000b\"\"\u00a2\u00a2\uff01\uff01\u0004\u0002,-//\u0004\u0002\f\f\u000f",
    "\u000f\u0004\u0002//aa\u0007\u0002__ppttvv\u007f\u007f\u0006\u0002\f",
    "\f\u000f\u000f}}\u007f\u007f\u0007\u0002\u000b\f\u000f\u000f\"\"}}\u007f",
    "\u007f\u0005\u0002//aa~~\b\u0002\f\f\u000f\u000f*+]]}}\u007f\u007f\u0004",
    "\u0002..??\u0002\u01a2\u0002\u000f\u0003\u0002\u0002\u0002\u0002\u0011",
    "\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002\u0002\u0002\u0002\u0015",
    "\u0003\u0002\u0002\u0002\u0002\u0017\u0003\u0002\u0002\u0002\u0002\u0019",
    "\u0003\u0002\u0002\u0002\u0002\u001b\u0003\u0002\u0002\u0002\u0002\u001d",
    "\u0003\u0002\u0002\u0002\u0002\u001f\u0003\u0002\u0002\u0002\u0002!",
    "\u0003\u0002\u0002\u0002\u0002#\u0003\u0002\u0002\u0002\u0002%\u0003",
    "\u0002\u0002\u0002\u0003\'\u0003\u0002\u0002\u0002\u0003)\u0003\u0002",
    "\u0002\u0002\u0003+\u0003\u0002\u0002\u0002\u0003-\u0003\u0002\u0002",
    "\u0002\u0003/\u0003\u0002\u0002\u0002\u00041\u0003\u0002\u0002\u0002",
    "\u00043\u0003\u0002\u0002\u0002\u00045\u0003\u0002\u0002\u0002\u0004",
    "7\u0003\u0002\u0002\u0002\u00049\u0003\u0002\u0002\u0002\u0004;\u0003",
    "\u0002\u0002\u0002\u0005=\u0003\u0002\u0002\u0002\u0005?\u0003\u0002",
    "\u0002\u0002\u0005A\u0003\u0002\u0002\u0002\u0005C\u0003\u0002\u0002",
    "\u0002\u0005E\u0003\u0002\u0002\u0002\u0005G\u0003\u0002\u0002\u0002",
    "\u0005I\u0003\u0002\u0002\u0002\u0005K\u0003\u0002\u0002\u0002\u0006",
    "M\u0003\u0002\u0002\u0002\u0006O\u0003\u0002\u0002\u0002\u0006Q\u0003",
    "\u0002\u0002\u0002\u0006S\u0003\u0002\u0002\u0002\u0007U\u0003\u0002",
    "\u0002\u0002\tW\u0003\u0002\u0002\u0002\u000bY\u0003\u0002\u0002\u0002",
    "\r[\u0003\u0002\u0002\u0002\u000f^\u0003\u0002\u0002\u0002\u0011e\u0003",
    "\u0002\u0002\u0002\u0013l\u0003\u0002\u0002\u0002\u0015{\u0003\u0002",
    "\u0002\u0002\u0017\u0083\u0003\u0002\u0002\u0002\u0019\u0088\u0003\u0002",
    "\u0002\u0002\u001b\u008d\u0003\u0002\u0002\u0002\u001d\u0093\u0003\u0002",
    "\u0002\u0002\u001f\u009c\u0003\u0002\u0002\u0002!\u00a5\u0003\u0002",
    "\u0002\u0002#\u00b2\u0003\u0002\u0002\u0002%\u00c8\u0003\u0002\u0002",
    "\u0002\'\u00cb\u0003\u0002\u0002\u0002)\u00d4\u0003\u0002\u0002\u0002",
    "+\u00db\u0003\u0002\u0002\u0002-\u00e5\u0003\u0002\u0002\u0002/\u00f1",
    "\u0003\u0002\u0002\u00021\u00f4\u0003\u0002\u0002\u00023\u00fd\u0003",
    "\u0002\u0002\u00025\u0104\u0003\u0002\u0002\u00027\u0115\u0003\u0002",
    "\u0002\u00029\u0117\u0003\u0002\u0002\u0002;\u012a\u0003\u0002\u0002",
    "\u0002=\u0131\u0003\u0002\u0002\u0002?\u013a\u0003\u0002\u0002\u0002",
    "A\u0141\u0003\u0002\u0002\u0002C\u014c\u0003\u0002\u0002\u0002E\u0152",
    "\u0003\u0002\u0002\u0002G\u0159\u0003\u0002\u0002\u0002I\u0160\u0003",
    "\u0002\u0002\u0002K\u0162\u0003\u0002\u0002\u0002M\u0165\u0003\u0002",
    "\u0002\u0002O\u016e\u0003\u0002\u0002\u0002Q\u0175\u0003\u0002\u0002",
    "\u0002S\u017e\u0003\u0002\u0002\u0002UV\t\u0002\u0002\u0002V\b\u0003",
    "\u0002\u0002\u0002WX\u00042;\u0002X\n\u0003\u0002\u0002\u0002YZ\t\u0003",
    "\u0002\u0002Z\f\u0003\u0002\u0002\u0002[\\\t\u0004\u0002\u0002\\\u000e",
    "\u0003\u0002\u0002\u0002]_\u0005\u000b\u0004\u0002^]\u0003\u0002\u0002",
    "\u0002_`\u0003\u0002\u0002\u0002`^\u0003\u0002\u0002\u0002`a\u0003\u0002",
    "\u0002\u0002ab\u0003\u0002\u0002\u0002bc\b\u0006\u0002\u0002c\u0010",
    "\u0003\u0002\u0002\u0002df\u0007\u000f\u0002\u0002ed\u0003\u0002\u0002",
    "\u0002ef\u0003\u0002\u0002\u0002fg\u0003\u0002\u0002\u0002gh\u0007\f",
    "\u0002\u0002hi\u0003\u0002\u0002\u0002ij\b\u0007\u0002\u0002j\u0012",
    "\u0003\u0002\u0002\u0002km\u0007%\u0002\u0002lk\u0003\u0002\u0002\u0002",
    "mn\u0003\u0002\u0002\u0002nl\u0003\u0002\u0002\u0002no\u0003\u0002\u0002",
    "\u0002oq\u0003\u0002\u0002\u0002pr\u0005\u000b\u0004\u0002qp\u0003\u0002",
    "\u0002\u0002rs\u0003\u0002\u0002\u0002sq\u0003\u0002\u0002\u0002st\u0003",
    "\u0002\u0002\u0002tu\u0003\u0002\u0002\u0002uv\u0007A\u0002\u0002vw",
    "\b\b\u0003\u0002wx\u0003\u0002\u0002\u0002xy\b\b\u0004\u0002y\u0014",
    "\u0003\u0002\u0002\u0002z|\u0007%\u0002\u0002{z\u0003\u0002\u0002\u0002",
    "|}\u0003\u0002\u0002\u0002}{\u0003\u0002\u0002\u0002}~\u0003\u0002\u0002",
    "\u0002~\u007f\u0003\u0002\u0002\u0002\u007f\u0080\b\t\u0005\u0002\u0080",
    "\u0081\u0003\u0002\u0002\u0002\u0081\u0082\b\t\u0006\u0002\u0082\u0016",
    "\u0003\u0002\u0002\u0002\u0083\u0084\u0005\r\u0005\u0002\u0084\u0085",
    "\b\n\u0007\u0002\u0085\u0086\u0003\u0002\u0002\u0002\u0086\u0087\b\n",
    "\b\u0002\u0087\u0018\u0003\u0002\u0002\u0002\u0088\u0089\u0007&\u0002",
    "\u0002\u0089\u008a\b\u000b\t\u0002\u008a\u008b\u0003\u0002\u0002\u0002",
    "\u008b\u008c\b\u000b\n\u0002\u008c\u001a\u0003\u0002\u0002\u0002\u008d",
    "\u008f\u0007@\u0002\u0002\u008e\u0090\n\u0005\u0002\u0002\u008f\u008e",
    "\u0003\u0002\u0002\u0002\u0090\u0091\u0003\u0002\u0002\u0002\u0091\u008f",
    "\u0003\u0002\u0002\u0002\u0091\u0092\u0003\u0002\u0002\u0002\u0092\u001c",
    "\u0003\u0002\u0002\u0002\u0093\u0097\u0007]\u0002\u0002\u0094\u0096",
    "\u000b\u0002\u0002\u0002\u0095\u0094\u0003\u0002\u0002\u0002\u0096\u0099",
    "\u0003\u0002\u0002\u0002\u0097\u0098\u0003\u0002\u0002\u0002\u0097\u0095",
    "\u0003\u0002\u0002\u0002\u0098\u009a\u0003\u0002\u0002\u0002\u0099\u0097",
    "\u0003\u0002\u0002\u0002\u009a\u009b\u0007_\u0002\u0002\u009b\u001e",
    "\u0003\u0002\u0002\u0002\u009c\u00a0\u0007*\u0002\u0002\u009d\u009f",
    "\u000b\u0002\u0002\u0002\u009e\u009d\u0003\u0002\u0002\u0002\u009f\u00a2",
    "\u0003\u0002\u0002\u0002\u00a0\u00a1\u0003\u0002\u0002\u0002\u00a0\u009e",
    "\u0003\u0002\u0002\u0002\u00a1\u00a3\u0003\u0002\u0002\u0002\u00a2\u00a0",
    "\u0003\u0002\u0002\u0002\u00a3\u00a4\u0007+\u0002\u0002\u00a4 \u0003",
    "\u0002\u0002\u0002\u00a5\u00a6\u0007,\u0002\u0002\u00a6\u00a7\u0007",
    ",\u0002\u0002\u00a7\u00a8\u0007H\u0002\u0002\u00a8\u00a9\u0007k\u0002",
    "\u0002\u00a9\u00aa\u0007n\u0002\u0002\u00aa\u00ab\u0007v\u0002\u0002",
    "\u00ab\u00ac\u0007g\u0002\u0002\u00ac\u00ad\u0007t\u0002\u0002\u00ad",
    "\u00ae\u0007u\u0002\u0002\u00ae\u00af\u0007<\u0002\u0002\u00af\u00b0",
    "\u0007,\u0002\u0002\u00b0\u00b1\u0007,\u0002\u0002\u00b1\"\u0003\u0002",
    "\u0002\u0002\u00b2\u00b3\u0007b\u0002\u0002\u00b3\u00b4\u0007b\u0002",
    "\u0002\u00b4\u00b5\u0007b\u0002\u0002\u00b5\u00b6\u0007o\u0002\u0002",
    "\u00b6\u00b7\u0007c\u0002\u0002\u00b7\u00b8\u0007t\u0002\u0002\u00b8",
    "\u00b9\u0007m\u0002\u0002\u00b9\u00ba\u0007f\u0002\u0002\u00ba\u00bb",
    "\u0007q\u0002\u0002\u00bb\u00bc\u0007y\u0002\u0002\u00bc\u00bd\u0007",
    "p\u0002\u0002\u00bd\u00c1\u0003\u0002\u0002\u0002\u00be\u00c0\u000b",
    "\u0002\u0002\u0002\u00bf\u00be\u0003\u0002\u0002\u0002\u00c0\u00c3\u0003",
    "\u0002\u0002\u0002\u00c1\u00c2\u0003\u0002\u0002\u0002\u00c1\u00bf\u0003",
    "\u0002\u0002\u0002\u00c2\u00c4\u0003\u0002\u0002\u0002\u00c3\u00c1\u0003",
    "\u0002\u0002\u0002\u00c4\u00c5\u0007b\u0002\u0002\u00c5\u00c6\u0007",
    "b\u0002\u0002\u00c6\u00c7\u0007b\u0002\u0002\u00c7$\u0003\u0002\u0002",
    "\u0002\u00c8\u00c9\u000b\u0002\u0002\u0002\u00c9&\u0003\u0002\u0002",
    "\u0002\u00ca\u00cc\u0005\u000b\u0004\u0002\u00cb\u00ca\u0003\u0002\u0002",
    "\u0002\u00cc\u00cd\u0003\u0002\u0002\u0002\u00cd\u00cb\u0003\u0002\u0002",
    "\u0002\u00cd\u00ce\u0003\u0002\u0002\u0002\u00ce\u00cf\u0003\u0002\u0002",
    "\u0002\u00cf\u00d0\u0006\u0012\u0002\u0002\u00d0\u00d1\u0003\u0002\u0002",
    "\u0002\u00d1\u00d2\b\u0012\u0002\u0002\u00d2(\u0003\u0002\u0002\u0002",
    "\u00d3\u00d5\u0005\u000b\u0004\u0002\u00d4\u00d3\u0003\u0002\u0002\u0002",
    "\u00d5\u00d6\u0003\u0002\u0002\u0002\u00d6\u00d4\u0003\u0002\u0002\u0002",
    "\u00d6\u00d7\u0003\u0002\u0002\u0002\u00d7\u00d8\u0003\u0002\u0002\u0002",
    "\u00d8\u00d9\b\u0013\u000b\u0002\u00d9*\u0003\u0002\u0002\u0002\u00da",
    "\u00dc\u0007\u000f\u0002\u0002\u00db\u00da\u0003\u0002\u0002\u0002\u00db",
    "\u00dc\u0003\u0002\u0002\u0002\u00dc\u00dd\u0003\u0002\u0002\u0002\u00dd",
    "\u00de\u0007\f\u0002\u0002\u00de\u00df\u0003\u0002\u0002\u0002\u00df",
    "\u00e0\b\u0014\f\u0002\u00e0\u00e1\b\u0014\r\u0002\u00e1,\u0003\u0002",
    "\u0002\u0002\u00e2\u00e6\u0005\u0007\u0002\u0002\u00e3\u00e6\u0005\t",
    "\u0003\u0002\u00e4\u00e6\u0007a\u0002\u0002\u00e5\u00e2\u0003\u0002",
    "\u0002\u0002\u00e5\u00e3\u0003\u0002\u0002\u0002\u00e5\u00e4\u0003\u0002",
    "\u0002\u0002\u00e6\u00ec\u0003\u0002\u0002\u0002\u00e7\u00eb\u0005\u0007",
    "\u0002\u0002\u00e8\u00eb\u0005\t\u0003\u0002\u00e9\u00eb\t\u0006\u0002",
    "\u0002\u00ea\u00e7\u0003\u0002\u0002\u0002\u00ea\u00e8\u0003\u0002\u0002",
    "\u0002\u00ea\u00e9\u0003\u0002\u0002\u0002\u00eb\u00ee\u0003\u0002\u0002",
    "\u0002\u00ec\u00ea\u0003\u0002\u0002\u0002\u00ec\u00ed\u0003\u0002\u0002",
    "\u0002\u00ed\u00ef\u0003\u0002\u0002\u0002\u00ee\u00ec\u0003\u0002\u0002",
    "\u0002\u00ef\u00f0\b\u0015\u000e\u0002\u00f0.\u0003\u0002\u0002\u0002",
    "\u00f1\u00f2\u00070\u0002\u0002\u00f20\u0003\u0002\u0002\u0002\u00f3",
    "\u00f5\u0005\u000b\u0004\u0002\u00f4\u00f3\u0003\u0002\u0002\u0002\u00f5",
    "\u00f6\u0003\u0002\u0002\u0002\u00f6\u00f4\u0003\u0002\u0002\u0002\u00f6",
    "\u00f7\u0003\u0002\u0002\u0002\u00f7\u00f8\u0003\u0002\u0002\u0002\u00f8",
    "\u00f9\u0006\u0017\u0003\u0002\u00f9\u00fa\u0003\u0002\u0002\u0002\u00fa",
    "\u00fb\b\u0017\u0002\u0002\u00fb2\u0003\u0002\u0002\u0002\u00fc\u00fe",
    "\u0005\u000b\u0004\u0002\u00fd\u00fc\u0003\u0002\u0002\u0002\u00fe\u00ff",
    "\u0003\u0002\u0002\u0002\u00ff\u00fd\u0003\u0002\u0002\u0002\u00ff\u0100",
    "\u0003\u0002\u0002\u0002\u0100\u0101\u0003\u0002\u0002\u0002\u0101\u0102",
    "\b\u0018\u000b\u0002\u01024\u0003\u0002\u0002\u0002\u0103\u0105\u0007",
    "\u000f\u0002\u0002\u0104\u0103\u0003\u0002\u0002\u0002\u0104\u0105\u0003",
    "\u0002\u0002\u0002\u0105\u0106\u0003\u0002\u0002\u0002\u0106\u0107\u0007",
    "\f\u0002\u0002\u0107\u0108\b\u0019\u000f\u0002\u0108\u0109\u0003\u0002",
    "\u0002\u0002\u0109\u010a\b\u0019\f\u0002\u010a\u010b\b\u0019\r\u0002",
    "\u010b6\u0003\u0002\u0002\u0002\u010c\u010d\u0007^\u0002\u0002\u010d",
    "\u0116\u0007}\u0002\u0002\u010e\u010f\u0007^\u0002\u0002\u010f\u0116",
    "\u0007]\u0002\u0002\u0110\u0111\u0007^\u0002\u0002\u0111\u0116\u0007",
    "^\u0002\u0002\u0112\u0113\u0007^\u0002\u0002\u0113\u0114\t\u0007\u0002",
    "\u0002\u0114\u0116\b\u001a\u0010\u0002\u0115\u010c\u0003\u0002\u0002",
    "\u0002\u0115\u010e\u0003\u0002\u0002\u0002\u0115\u0110\u0003\u0002\u0002",
    "\u0002\u0115\u0112\u0003\u0002\u0002\u0002\u01168\u0003\u0002\u0002",
    "\u0002\u0117\u0123\u0007}\u0002\u0002\u0118\u0122\n\b\u0002\u0002\u0119",
    "\u011d\u0007}\u0002\u0002\u011a\u011c\n\u0005\u0002\u0002\u011b\u011a",
    "\u0003\u0002\u0002\u0002\u011c\u011f\u0003\u0002\u0002\u0002\u011d\u011b",
    "\u0003\u0002\u0002\u0002\u011d\u011e\u0003\u0002\u0002\u0002\u011e\u0120",
    "\u0003\u0002\u0002\u0002\u011f\u011d\u0003\u0002\u0002\u0002\u0120\u0122",
    "\u0007\u007f\u0002\u0002\u0121\u0118\u0003\u0002\u0002\u0002\u0121\u0119",
    "\u0003\u0002\u0002\u0002\u0122\u0125\u0003\u0002\u0002\u0002\u0123\u0121",
    "\u0003\u0002\u0002\u0002\u0123\u0124\u0003\u0002\u0002\u0002\u0124\u0126",
    "\u0003\u0002\u0002\u0002\u0125\u0123\u0003\u0002\u0002\u0002\u0126\u0127",
    "\u0007\u007f\u0002\u0002\u0127\u0128\b\u001b\u0011\u0002\u0128:\u0003",
    "\u0002\u0002\u0002\u0129\u012b\n\t\u0002\u0002\u012a\u0129\u0003\u0002",
    "\u0002\u0002\u012b\u012c\u0003\u0002\u0002\u0002\u012c\u012a\u0003\u0002",
    "\u0002\u0002\u012c\u012d\u0003\u0002\u0002\u0002\u012d\u012e\u0003\u0002",
    "\u0002\u0002\u012e\u012f\b\u001c\u0012\u0002\u012f<\u0003\u0002\u0002",
    "\u0002\u0130\u0132\u0005\u000b\u0004\u0002\u0131\u0130\u0003\u0002\u0002",
    "\u0002\u0132\u0133\u0003\u0002\u0002\u0002\u0133\u0131\u0003\u0002\u0002",
    "\u0002\u0133\u0134\u0003\u0002\u0002\u0002\u0134\u0135\u0003\u0002\u0002",
    "\u0002\u0135\u0136\u0006\u001d\u0004\u0002\u0136\u0137\u0003\u0002\u0002",
    "\u0002\u0137\u0138\b\u001d\u0002\u0002\u0138>\u0003\u0002\u0002\u0002",
    "\u0139\u013b\u0005\u000b\u0004\u0002\u013a\u0139\u0003\u0002\u0002\u0002",
    "\u013b\u013c\u0003\u0002\u0002\u0002\u013c\u013a\u0003\u0002\u0002\u0002",
    "\u013c\u013d\u0003\u0002\u0002\u0002\u013d\u013e\u0003\u0002\u0002\u0002",
    "\u013e\u013f\b\u001e\u000b\u0002\u013f@\u0003\u0002\u0002\u0002\u0140",
    "\u0142\u0007\u000f\u0002\u0002\u0141\u0140\u0003\u0002\u0002\u0002\u0141",
    "\u0142\u0003\u0002\u0002\u0002\u0142\u0143\u0003\u0002\u0002\u0002\u0143",
    "\u0144\u0007\f\u0002\u0002\u0144\u0145\b\u001f\u0013\u0002\u0145\u0146",
    "\u0003\u0002\u0002\u0002\u0146\u0147\b\u001f\f\u0002\u0147\u0148\b\u001f",
    "\r\u0002\u0148B\u0003\u0002\u0002\u0002\u0149\u014d\u0005\u0007\u0002",
    "\u0002\u014a\u014d\u0005\t\u0003\u0002\u014b\u014d\t\n\u0002\u0002\u014c",
    "\u0149\u0003\u0002\u0002\u0002\u014c\u014a\u0003\u0002\u0002\u0002\u014c",
    "\u014b\u0003\u0002\u0002\u0002\u014d\u014e\u0003\u0002\u0002\u0002\u014e",
    "\u014c\u0003\u0002\u0002\u0002\u014e\u014f\u0003\u0002\u0002\u0002\u014f",
    "\u0150\u0003\u0002\u0002\u0002\u0150\u0151\b \u0014\u0002\u0151D\u0003",
    "\u0002\u0002\u0002\u0152\u0156\u0007]\u0002\u0002\u0153\u0155\n\u000b",
    "\u0002\u0002\u0154\u0153\u0003\u0002\u0002\u0002\u0155\u0158\u0003\u0002",
    "\u0002\u0002\u0156\u0154\u0003\u0002\u0002\u0002\u0156\u0157\u0003\u0002",
    "\u0002\u0002\u0157F\u0003\u0002\u0002\u0002\u0158\u0156\u0003\u0002",
    "\u0002\u0002\u0159\u015d\u00071\u0002\u0002\u015a\u015c\n\u0005\u0002",
    "\u0002\u015b\u015a\u0003\u0002\u0002\u0002\u015c\u015f\u0003\u0002\u0002",
    "\u0002\u015d\u015b\u0003\u0002\u0002\u0002\u015d\u015e\u0003\u0002\u0002",
    "\u0002\u015eH\u0003\u0002\u0002\u0002\u015f\u015d\u0003\u0002\u0002",
    "\u0002\u0160\u0161\u0007<\u0002\u0002\u0161J\u0003\u0002\u0002\u0002",
    "\u0162\u0163\t\f\u0002\u0002\u0163L\u0003\u0002\u0002\u0002\u0164\u0166",
    "\u0005\u000b\u0004\u0002\u0165\u0164\u0003\u0002\u0002\u0002\u0166\u0167",
    "\u0003\u0002\u0002\u0002\u0167\u0165\u0003\u0002\u0002\u0002\u0167\u0168",
    "\u0003\u0002\u0002\u0002\u0168\u0169\u0003\u0002\u0002\u0002\u0169\u016a",
    "\u0006%\u0005\u0002\u016a\u016b\u0003\u0002\u0002\u0002\u016b\u016c",
    "\b%\u0002\u0002\u016cN\u0003\u0002\u0002\u0002\u016d\u016f\u0005\u000b",
    "\u0004\u0002\u016e\u016d\u0003\u0002\u0002\u0002\u016f\u0170\u0003\u0002",
    "\u0002\u0002\u0170\u016e\u0003\u0002\u0002\u0002\u0170\u0171\u0003\u0002",
    "\u0002\u0002\u0171\u0172\u0003\u0002\u0002\u0002\u0172\u0173\b&\u000b",
    "\u0002\u0173P\u0003\u0002\u0002\u0002\u0174\u0176\u0007\u000f\u0002",
    "\u0002\u0175\u0174\u0003\u0002\u0002\u0002\u0175\u0176\u0003\u0002\u0002",
    "\u0002\u0176\u0177\u0003\u0002\u0002\u0002\u0177\u0178\u0007\f\u0002",
    "\u0002\u0178\u0179\b\'\u0015\u0002\u0179\u017a\u0003\u0002\u0002\u0002",
    "\u017a\u017b\b\'\f\u0002\u017b\u017c\b\'\r\u0002\u017cR\u0003\u0002",
    "\u0002\u0002\u017d\u017f\n\t\u0002\u0002\u017e\u017d\u0003\u0002\u0002",
    "\u0002\u017f\u0180\u0003\u0002\u0002\u0002\u0180\u017e\u0003\u0002\u0002",
    "\u0002\u0180\u0181\u0003\u0002\u0002\u0002\u0181\u0182\u0003\u0002\u0002",
    "\u0002\u0182\u0183\b(\u0016\u0002\u0183T\u0003\u0002\u0002\u0002)\u0002",
    "\u0003\u0004\u0005\u0006`ens}\u0091\u0097\u00a0\u00c1\u00cd\u00d6\u00db",
    "\u00e5\u00ea\u00ec\u00f6\u00ff\u0104\u0115\u011d\u0121\u0123\u012c\u0133",
    "\u013c\u0141\u014c\u014e\u0156\u015d\u0167\u0170\u0175\u0180\u0017\b",
    "\u0002\u0002\u0003\b\u0002\u0007\u0006\u0002\u0003\t\u0003\u0007\u0003",
    "\u0002\u0003\n\u0004\u0007\u0004\u0002\u0003\u000b\u0005\u0007\u0005",
    "\u0002\t\u0003\u0002\t\u0004\u0002\u0006\u0002\u0002\u0003\u0015\u0006",
    "\u0003\u0019\u0007\u0003\u001a\b\u0003\u001b\t\u0003\u001c\n\u0003\u001f",
    "\u000b\u0003 \f\u0003\'\r\u0003(\u000e"].join("");


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
LUFileLexer.WS = 1;
LUFileLexer.NEWLINE = 2;
LUFileLexer.QNA = 3;
LUFileLexer.HASH = 4;
LUFileLexer.DASH = 5;
LUFileLexer.DOLLAR = 6;
LUFileLexer.COMMENT = 7;
LUFileLexer.IMPORT_DESC = 8;
LUFileLexer.IMPORT_PATH = 9;
LUFileLexer.Filter_MARK = 10;
LUFileLexer.MULTI_LINE_TEXT = 11;
LUFileLexer.INVALID_TOKEN_DEFAULT_MODE = 12;
LUFileLexer.WS_IN_NAME_IGNORED = 13;
LUFileLexer.IDENTIFIER = 14;
LUFileLexer.DOT = 15;
LUFileLexer.WS_IN_BODY_IGNORED = 16;
LUFileLexer.ESCAPE_CHARACTER = 17;
LUFileLexer.EXPRESSION = 18;
LUFileLexer.TEXT = 19;
LUFileLexer.WS_IN_ENTITY_IGNORED = 20;
LUFileLexer.ENTITY_IDENTIFIER = 21;
LUFileLexer.COMPOSITE_ENTITY = 22;
LUFileLexer.REGEX_ENTITY = 23;
LUFileLexer.COLON_MARK = 24;
LUFileLexer.SPECIAL_CHAR_MARK = 25;
LUFileLexer.WS_IN_QNA_IGNORED = 26;
LUFileLexer.QNA_TEXT = 27;

LUFileLexer.INTENT_NAME_MODE = 1;
LUFileLexer.INTENT_BODY_MODE = 2;
LUFileLexer.ENTITY_MODE = 3;
LUFileLexer.QNA_MODE = 4;

LUFileLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

LUFileLexer.prototype.modeNames = [ "DEFAULT_MODE", "INTENT_NAME_MODE", 
                                    "INTENT_BODY_MODE", "ENTITY_MODE", "QNA_MODE" ];

LUFileLexer.prototype.literalNames = [ null, null, null, null, null, null, 
                                       null, null, null, null, "'**Filters:**'", 
                                       null, null, null, null, "'.'", null, 
                                       null, null, null, null, null, null, 
                                       null, "':'" ];

LUFileLexer.prototype.symbolicNames = [ null, "WS", "NEWLINE", "QNA", "HASH", 
                                        "DASH", "DOLLAR", "COMMENT", "IMPORT_DESC", 
                                        "IMPORT_PATH", "Filter_MARK", "MULTI_LINE_TEXT", 
                                        "INVALID_TOKEN_DEFAULT_MODE", "WS_IN_NAME_IGNORED", 
                                        "IDENTIFIER", "DOT", "WS_IN_BODY_IGNORED", 
                                        "ESCAPE_CHARACTER", "EXPRESSION", 
                                        "TEXT", "WS_IN_ENTITY_IGNORED", 
                                        "ENTITY_IDENTIFIER", "COMPOSITE_ENTITY", 
                                        "REGEX_ENTITY", "COLON_MARK", "SPECIAL_CHAR_MARK", 
                                        "WS_IN_QNA_IGNORED", "QNA_TEXT" ];

LUFileLexer.prototype.ruleNames = [ "LETTER", "NUMBER", "WHITESPACE", "UTTERANCE_MARK", 
                                    "WS", "NEWLINE", "QNA", "HASH", "DASH", 
                                    "DOLLAR", "COMMENT", "IMPORT_DESC", 
                                    "IMPORT_PATH", "Filter_MARK", "MULTI_LINE_TEXT", 
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
	case 6:
		this.QNA_action(localctx, actionIndex);
		break;
	case 7:
		this.HASH_action(localctx, actionIndex);
		break;
	case 8:
		this.DASH_action(localctx, actionIndex);
		break;
	case 9:
		this.DOLLAR_action(localctx, actionIndex);
		break;
	case 19:
		this.IDENTIFIER_action(localctx, actionIndex);
		break;
	case 23:
		this.NEWLINE_IN_BODY_action(localctx, actionIndex);
		break;
	case 24:
		this.ESCAPE_CHARACTER_action(localctx, actionIndex);
		break;
	case 25:
		this.EXPRESSION_action(localctx, actionIndex);
		break;
	case 26:
		this.TEXT_action(localctx, actionIndex);
		break;
	case 29:
		this.NEWLINE_IN_ENTITY_action(localctx, actionIndex);
		break;
	case 30:
		this.ENTITY_IDENTIFIER_action(localctx, actionIndex);
		break;
	case 37:
		this.NEWLINE_IN_QNA_action(localctx, actionIndex);
		break;
	case 38:
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
		case 16:
			return this.WS_IN_NAME_IGNORED_sempred(localctx, predIndex);
		case 21:
			return this.WS_IN_BODY_IGNORED_sempred(localctx, predIndex);
		case 27:
			return this.WS_IN_ENTITY_IGNORED_sempred(localctx, predIndex);
		case 35:
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

