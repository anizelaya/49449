import AnalizadorVisitor from "./generated/AnalizadorVisitor.js";
import AnalizadorParser from "./generated/AnalizadorParser.js";

export default class CustomAnalizadorVisitor extends AnalizadorVisitor {

    constructor() {
        super();
        // Memoria para guardar el valor de las variables asignadas
        this.memory = new Map();
    }

    // prog: stat* EOF
    visitProg(ctx) {
        return this.visitChildren(ctx);
    }

    // stat: whileStat | assignStat | consoleStat
    visitStat(ctx) {
        return this.visitChildren(ctx);
    }

    // whileStat: WHILE '(' expression ')' block
    visitWhileStat(ctx) {
        // Evalúa la condición del while
        let condition = this.visit(ctx.expression());
        while (condition) {
            this.visit(ctx.block());
            condition = this.visit(ctx.expression());
        }
        return null;
    }

    // assignStat: ID '=' expression ';'
    visitAssignStat(ctx) {
        const id    = ctx.ID().getText();
        const value = this.visit(ctx.expression());
        this.memory.set(id, value);
        console.log(`  [Asignación] ${id} = ${value}`);
        return value;
    }

    // consoleStat: CONSOLE '.' LOG '(' expression ')' ';'
    visitConsoleStat(ctx) {
        const value = this.visit(ctx.expression());
        console.log(`  [console.log] ${value}`);
        return value;
    }

    // block: '{' stat* '}'
    visitBlock(ctx) {
        return this.visitChildren(ctx);
    }

    // expression: term ( ('+' | '-' | '*' | '/') term )*
    visitExpression(ctx) {
        // ctx.term() devuelve todos los term hijos como array
        const terms = ctx.term();
        let result  = this.visit(terms[0]);

        // Los operadores son hijos del contexto intercalados entre terms
        // Tokens hijos del ctx en orden: term op term op term ...
        // Recorremos los hijos para obtener operadores
        let termIdx = 1;
        for (let i = 1; i < ctx.getChildCount(); i += 2) {
            const op    = ctx.getChild(i).getText();   // operador
            const right = this.visit(terms[termIdx++]); // siguiente term

            switch (op) {
                case '+': result = result + right; break;
                case '-': result = result - right; break;
                case '*': result = result * right; break;
                case '/': result = right !== 0 ? result / right : (() => { console.error('  [Error] División por cero'); return 0; })(); break;
            }
        }
        return result;
    }

    // term: ID | NUMBER | '(' expression ')'
    visitTerm(ctx) {
        if (ctx.ID()) {
            const id = ctx.ID().getText();
            if (this.memory.has(id)) return this.memory.get(id);
            console.warn(`  [Advertencia] Variable '${id}' no definida, se asume 0`);
            return 0;
        }
        if (ctx.NUMBER()) {
            return parseFloat(ctx.NUMBER().getText());
        }
        // '(' expression ')'
        return this.visit(ctx.expression());
    }
}