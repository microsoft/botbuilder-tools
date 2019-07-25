parser grammar LUFileParser;

options { tokenVocab=LUFileLexer; }

file
	: paragraph+? EOF
	;

paragraph
    : newline
    | intentDefinition
    | entityDefinition
    | importDefinition
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
    : intentNameIdentifier (WS intentNameIdentifier)*
    ;

intentNameIdentifier
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
    : DOLLAR entityName COLON_MARK entityType
    ;

entityName
    : ENTITY_IDENTIFIER (WS | ENTITY_IDENTIFIER)*
    ;

entityType
    : ENTITY_IDENTIFIER (listTypeEntity | phraseTypeEntity)?
    ;

listTypeEntity
    : WS? EQUAL_MARK
    ;

phraseTypeEntity
    : WS ENTITY_IDENTIFIER
    ;

entityListBody
    : (normalItemString newline)+
    ;

normalItemString
    : DASH (WS|TEXT)*
    ;

importDefinition
    : IMPORT_DESC IMPORT_PATH
    ;