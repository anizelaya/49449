grammar Analizador;

// ========================
//        PARSER
// ========================

prog: stat* EOF;

stat
    : whileStat
    | assignStat
    | consoleStat
    ;

whileStat   : WHILE '(' expression ')' block ;
assignStat  : ID '=' expression ';' ;
consoleStat : CONSOLE '.' LOG '(' expression ')' ';' ;

block: '{' stat* '}' ;

// Expresión sin recursividad izquierda: se usa repetición iterativa
expression: term ( ('+' | '-' | '*' | '/') term )* ;

term
    : ID
    | NUMBER
    | '(' expression ')'
    ;

// ========================
//         LEXER
// ========================

WHILE   : 'while'   ;
CONSOLE : 'console' ;
LOG     : 'log'     ;

ID     : LETTER ( LETTER | DIGIT | '_' )* ;
NUMBER : DIGIT+ ;

// LETTER y DIGIT como fragment para que no generen tokens propios
fragment LETTER : [a-zA-Z] ;
fragment DIGIT  : [0-9] ;

WS           : [ \t\r\n]+ -> skip ;
LINE_COMMENT : '//' ~[\r\n]* -> skip ;
