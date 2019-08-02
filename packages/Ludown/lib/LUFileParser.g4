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
    | qnaDefinition
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
	: DASH (WS|TEXT|EXPRESSION|ESCAPE_CHARACTER)*
	;

entityDefinition
    : entityLine newline entityListBody?
    ;
    
entityLine
    : DOLLAR entityName COLON_MARK entityType
    ;

entityName
    : entityIdentifier
    ;

entityType
    : (entityIdentifier|compositeEntityIdentifier) (listTypeEntity|phraseTypeEntity)?
    ;

compositeEntityIdentifier
    : COMPOSITE_ENTITY
    ;

entityIdentifier
    : ENTITY_IDENTIFIER (WS|ENTITY_IDENTIFIER)*
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

qnaDefinition
    : qnaQuestion moreQuestionsBody qnaAnswerBody
    ;

qnaQuestion
    : QNA questionText newline
    ;

questionText
    : (WS|QNA_TEXT)*
    ;

moreQuestionsBody
    : (moreQuestion newline)*
    ;

moreQuestion
    : DASH (WS|TEXT)*
    ;

qnaAnswerBody
    : filterSection? multiLineAnswer
    ;

filterSection
    : Filter_MARK filterLine+
    ;

filterLine
    : DASH (WS|TEXT)* newline
    ;

multiLineAnswer
    : MULTI_LINE_TEXT
    ;