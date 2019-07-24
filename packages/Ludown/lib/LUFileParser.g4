parser grammar LUFileParser;

options { tokenVocab=LUFileLexer; }

file
	: paragraph+? EOF
	;

paragraph
    : newline
    | intentDefinition
    | entityDefinition
    ;

// Treat EOF as newline to hanle file end gracefully
// It's possible that parser doesn't even have to handle NEWLINE, 
// but before the syntax is finalized, we still keep the NEWLINE in grammer 
newline
    : NEWLINE
    | EOF
    ;

intentDefinition
	: intentNameLine newline intentBody?
	;

intentNameLine
	: HASH intentName
	;

intentName
    : IDENTIFIER (DOT IDENTIFIER)*
    ;

intentBody
	: normalIntentBody
	;

normalIntentBody
    : (normalIntentString newline)+
    ;

normalIntentString
	: DASH (WS|TEXT|EXPRESSION|TEXT_SEPARATOR|ESCAPE_CHARACTER|INVALID_ESCAPE)*
	;

entityDefinition
    : entityLine newline entityListBody?
    ;
    
entityLine
    : DOLLAR entityName COLON entityType
    ;

entityName
    : ENTITY_IDENTIFIER
    ;

entityType
    : ENTITY_IDENTIFIER
    ;

entityListBody
    : (normalItemString newline)+
    ;

normalItemString
    : DASH (WS|TEXT)*
    ;