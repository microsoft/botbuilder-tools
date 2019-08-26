lexer grammar LUFileLexer;

@lexer::members {
  this.ignoreWS = true;             // usually we ignore whitespace, but inside template, whitespace is significant
}

fragment LETTER: 'a'..'z' | 'A'..'Z';
fragment NUMBER: '0'..'9';

fragment WHITESPACE
  : ' '|'\t'|'\ufeff'|'\u00a0'
  ;

fragment UTTERANCE_MARK: '-' | '*' | '+';

MODEL_INFO
  : '>' WHITESPACE* '!#' ~('\r'|'\n')+
  ;

COMMENT
  : '>' ~('\r'|'\n')+ -> skip
  ;

WS
  : WHITESPACE+ -> skip
  ;

NEWLINE
  : '\r'? '\n' -> skip
  ;

QNA
  : '#'+ WHITESPACE+ '?' {this.ignoreWS = false;} -> pushMode(QNA_MODE)
  ;

HASH
  : '#'+ {this.ignoreWS = true;} -> pushMode(INTENT_NAME_MODE)
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

FILTER_MARK
  : '**Filters:**'
  ;

MULTI_LINE_TEXT
  : '```markdown' .*? '```'
  ;

INVALID_TOKEN_DEFAULT_MODE
  : .
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
  : (LETTER | NUMBER | '_') (LETTER | NUMBER | '-' | '_')* { this.ignoreWS = false;}
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
  : '\\{' | '\\[' | '\\\\' | '\\'[rtn\]}]  { this.ignoreWS = false;}
  ;

EXPRESSION
  : '{' (~[\r\n{}] | ('{' ~[\r\n]* '}'))* '}'  { this.ignoreWS = false;}
  ;

TEXT
  : ~[ \t\r\n{}]+  { this.ignoreWS = false;}
  ;

mode ENTITY_MODE;

WS_IN_ENTITY_IGNORED
  : WHITESPACE+ {this.ignoreWS}? -> skip
  ;

WS_IN_ENTITY
  : WHITESPACE+ -> type(WS)
  ;

NEWLINE_IN_ENTITY
  : '\r'? '\n' {this.ignoreWS = true;} -> type(NEWLINE), popMode
  ;

ENTITY_IDENTIFIER
  : (LETTER | NUMBER | '_' | '-' | '|' | '.')+ { this.ignoreWS = false;}
  ;

COMPOSITE_ENTITY
  : '[' (~[\r\n{}[()])*
  ;

REGEX_ENTITY
  : '/' (~[\r\n])*
  ;

COLON_MARK
  : ':'
  ;

SPECIAL_CHAR_MARK 
  : '=' | ',' | '!'
  ;

mode QNA_MODE;

WS_IN_QNA_IGNORED
  : WHITESPACE+ {this.ignoreWS}? -> skip
  ;

WS_IN_QNA
  : WHITESPACE+ -> type(WS)
  ;

NEWLINE_IN_QNA
  : '\r'? '\n' {this.ignoreWS = true;} ->  type(NEWLINE), popMode
  ;

QNA_TEXT
  : ~[ \t\r\n{}]+  { this.ignoreWS = false;}
  ;