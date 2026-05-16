import AnalizadorListener from "./generated/AnalizadorListener.js";
 
export default class CustomAnalizadorListener extends AnalizadorListener {
 
    // Se llama al entrar a cualquier statement
    enterStat(ctx) {
        console.log(`  [Listener] Entrando a: ${ctx.constructor.name}`);
    }
 
    enterWhileStat(ctx) {
        console.log(`  [Listener] while detectado en línea ${ctx.start.line}`);
    }
 
    enterAssignStat(ctx) {
        const id = ctx.ID().getText();
        console.log(`  [Listener] Asignación a variable '${id}' en línea ${ctx.start.line}`);
    }
 
    enterConsoleStat(ctx) {
        console.log(`  [Listener] console.log detectado en línea ${ctx.start.line}`);
   }
}