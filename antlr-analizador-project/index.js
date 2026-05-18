import AnalizadorLexer from "./generated/AnalizadorLexer.js";
import AnalizadorParser from "./generated/AnalizadorParser.js";
import CustomAnalizadorVisitor from "./CustomAnalizadorVisitor.js";
import antlr4, { CharStreams, CommonTokenStream } from "antlr4";
import readline from 'readline';
import fs from 'fs';

async function main() {
    let input;

    // Leer desde input.txt; si no existe, pedir por teclado
    try {
        input = fs.readFileSync('../input.txt', 'utf8');
        console.log("Archivo leído correctamente.\n");
    } catch (err) {
        input = await leerCadena();
        console.log(input);
    }

    // ── FASE 1: ANÁLISIS LÉXICO ──────────────────────────────────
    console.log("=".repeat(52));
    console.log("  FASE 1: Análisis Léxico");
    console.log("=".repeat(52));

    let inputStream = CharStreams.fromString(input);
    let lexer = new AnalizadorLexer(inputStream);
    const tokens = lexer.getAllTokens();

    if (tokens.length === 0) {
        console.error("No se generaron tokens. Verificá la entrada y la gramática.");
        return;
    }

    console.log("\nTabla de Tokens y Lexemas:");
    console.log("-".repeat(54));
    console.log("| Línea | Lexema           | Token                  |");
    console.log("-".repeat(54));

    const symNames = AnalizadorLexer.symbolicNames;
    const litNames = AnalizadorLexer.literalNames;

    for (let token of tokens) {
        const lexema = token.text;
        const nombre = symNames[token.type]
                    || (litNames[token.type] ? litNames[token.type].replace(/'/g, '') : `UNKNOWN(${token.type})`);
        const linea  = String(token.line).padEnd(5);
        console.log(`| ${linea} | ${lexema.padEnd(16)} | ${nombre.padEnd(22)} |`);
    }
    console.log("-".repeat(54));

    // ── FASE 2: ANÁLISIS SINTÁCTICO ──────────────────────────────
    console.log("\n" + "=".repeat(52));
    console.log("  FASE 2: Análisis Sintáctico");
    console.log("=".repeat(52));

    // Re-procesar: getAllTokens() vacía el lexer
    inputStream      = CharStreams.fromString(input);
    lexer            = new AnalizadorLexer(inputStream);
    let tokenStream  = new CommonTokenStream(lexer);
    let parser       = new AnalizadorParser(tokenStream);
    let tree         = parser.prog();

    if (parser.syntaxErrorsCount > 0) {
        console.error(`\n✘ Se encontraron ${parser.syntaxErrorsCount} error(es) de sintaxis.`);
        return;
    }

    console.log("\n✔ Entrada válida — sin errores sintácticos.");
    const arbol = tree.toStringTree(parser.ruleNames);

// Imprimir árbol indentado
function prettyTree(str) {
    let result = '';
    let indent = 0;
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (ch === '(') {
            result += '\n' + '  '.repeat(indent) + '(';
            indent++;
        } else if (ch === ')') {
            indent--;
            result += ')';
        } else {
            result += ch;
        }
    }
    return result.trim();
}

console.log(`\nÁrbol de derivación:\n${prettyTree(arbol)}`);

    // ── FASE 3: SEMÁNTICA CON VISITOR ────────────────────────────
    console.log("\n" + "=".repeat(52));
    console.log("  FASE 3: Evaluación semántica (Visitor)");
    console.log("=".repeat(52) + "\n");

    const visitor = new CustomAnalizadorVisitor();
    visitor.visit(tree);

    console.log("\n" + "=".repeat(52));
    console.log("  Variables en memoria al finalizar:");
    console.log("=".repeat(52));
    if (visitor.memory.size === 0) {
        console.log("  (ninguna)");
    } else {
        for (const [k, v] of visitor.memory) {
            console.log(`  ${k} = ${v}`);
        }
    }
    console.log("=".repeat(52));
}

function leerCadena() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question("Ingresá el código fuente: ", answer => {
            rl.close();
            resolve(answer);
        });
    });
}

main();