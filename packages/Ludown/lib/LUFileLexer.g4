lexer grammar LUFileLexer;

// From a multiple-lanague perpective, it's not recommended to use members, predicates and actions to 
// put target-language-specific code in lexer rules 

// the reason we use it here is that
// 1. it greatly simplify the lexer rules, can avoid unnecessary lexer modes 
// 2. it helps us to output token more precisely
//    (for example, 'CASE:' not followed right after '-' will not be treated as a CASE token)
// 3. we only use very basic boolen variables, and basic predidates
//    so it would be very little effort to translate to other languages

@lexer::members {
  this.ignoreWS = true;             // usually we ignore whitespace, but inside template, whitespace is significant
}

fragment LETTER: 'a'..'z' | 'A'..'Z';
fragment NUMBER: '0'..'9';

fragment WHITESPACE
  : ' '|'\t'|'\ufeff'|'\u00a0'
  ;

fragment STRING_LITERAL : ('\'' (~['\r\n])* '\'') | ('"' (~["\r\n])* '"');

fragment UTTERANCE_MARK: '-' | '*' | '+';

COMMENTS
  : '>' ~('\r'|'\n')+ -> skip
  ;

WS
  : WHITESPACE+ -> skip
  ;

NEWLINE
  : '\r'? '\n' -> skip
  ;

HASH
  : '#' {this.ignoreWS = true;} -> pushMode(INTENT_NAME_MODE)
  ;

DASH
  : UTTERANCE_MARK {this.ignoreWS = true;} -> pushMode(INTENT_BODY_MODE)
  ;

DOLLAR
  : '$' {this.ignoreWS = true;} -> pushMode(ENTITY_MODE)
  ;

IMPORT_DESC
  : '[' .*? ']'
  ;

IMPORT_PATH
  : '(' .*? ')'
  ;

mode INTENT_NAME_MODE;

WS_IN_NAME_IGNORED
  : WHITESPACE+ {this.ignoreWS}? -> skip
  ;

WS_IN_NAME
  : WHITESPACE+ -> type(WS)
  ;

NEWLINE_IN_NAME
  : '\r'? '\n' -> type(NEWLINE), popMode
  ;

IDENTIFIER
  : (LETTER | NUMBER | '_') (LETTER | NUMBER | '-' | '_')* { this.ignoreWS = false}
  ;

DOT
  : '.'
  ;

mode INTENT_BODY_MODE;

// a little tedious on the rules, a big improvement on portability
WS_IN_BODY_IGNORED
  : WHITESPACE+  {this.ignoreWS}? -> skip
  ;

WS_IN_BODY
  : WHITESPACE+  -> type(WS)
  ;

NEWLINE_IN_BODY
  : '\r'? '\n' {this.ignoreWS = true;} -> type(NEWLINE), popMode
  ;

ESCAPE_CHARACTER
  : '\\{' | '\\[' | '\\\\' | '\\'[rtn\]}]  { this.ignoreWS = false}
  ;

INVALID_ESCAPE
  : '\\'~[\r\n]?
  ;

EXPRESSION
  : '{' (~[\r\n{}] | STRING_LITERAL)*  '}'  { this.ignoreWS = false}
  ;

TEXT_SEPARATOR
  : [ \t\r\n{}[\]()]  { this.ignoreWS = false}
  ;

TEXT
  : ~[ \\\t\r\n{}[\]()]+  { this.ignoreWS = false}
  ;

mode ENTITY_MODE;

WS_IN_ENTITY_IGNORED
  : WHITESPACE+ {this.ignoreWS}? -> skip
  ;

WS_IN_ENTITY
  : WHITESPACE+ -> type(WS)
  ;

NEWLINE_IN_ENTITY
  : '\r'? '\n' -> type(NEWLINE), popMode
  ;

ENTITY_IDENTIFIER
  : (LETTER | NUMBER | '_')+ { this.ignoreWS = false}
  ;

COLON_MARK
  : ':' { this.ignoreWS = true}
  ;

EQUAL_MARK 
  : '=' 
  ;