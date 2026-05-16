### Consigna asignada
<img width="946" height="498" alt="image" src="https://github.com/user-attachments/assets/db5112b8-9d06-4f89-8464-4ec8be45ab40" />

## Instrucciones de Uso

### Requisitos previos
- Node.js instalado

### Pasos para ejecutar

**IMPORTANTE:** abrir la terminal dentro de la carpeta `antlr-analizador-project`, no desde la raíz del repositorio.

En VS Code: clic derecho sobre la carpeta `antlr-analizador-project` → **"Abrir en terminal integrado"**

**1. Instalar dependencias (solo la primera vez):**
```cmd
npm install
```

**2. Ejecutar el analizador:**
```cmd
node index.js
```

### Cambiar el archivo de entrada

Para probar distintos inputs, modificar esta línea en `index.js`:
```javascript
input = fs.readFileSync('../input.txt', 'utf8');
```
Reemplazar `'../input.txt'` por cualquiera de estos:
- `'../input_correcto_1.txt'` — asignaciones y console.log
- `'../input_correcto_2.txt'` — while con bloque
- `'../input_incorrecto_1.txt'` — error léxico (carácter inválido `@`)
- `'../input_incorrecto_2.txt'` — error sintáctico (tokens faltantes)

### Salida esperada

**Fase 1 — Análisis léxico:** tabla con línea, lexema y tipo de cada token.

**Fase 2 — Análisis sintáctico:** árbol de derivación o mensaje de error con línea y causa.

**Fase 3 — Evaluación semántica:** resultado de las asignaciones y `console.log`, y variables en memoria al finalizar.