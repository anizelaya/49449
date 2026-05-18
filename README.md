## Consigna asignada
<img width="940" height="494" alt="image" src="https://github.com/user-attachments/assets/9610ddaa-89f0-4fb9-9f6a-d55636e51dfe" />

## ¿Qué hace este proyecto?

Es un analizador que lee código escrito en un sub-lenguaje reducido de JavaScript y verifica si está bien escrito. Si la entrada es correcta, muestra:

* Una tabla con los tokens reconocidos y su línea
* El árbol de análisis sintáctico
* Una evaluación semántica que ejecuta las asignaciones y los `console.log`

La gramática está definida con ANTLR4 y el programa corre en Node.js.

### Árbol de derivación visual
 <img width="480" height="573" alt="image" src="https://github.com/user-attachments/assets/769b880b-091e-44cc-8a52-8a60ebe5aea3" />


## Instalación

Cloná el repositorio:
```cmd
git clone https://github.com/anizelaya/49449.git
```

Luego entrá a la carpeta del proyecto:
```cmd
cd 49449/antlr-analizador-project
```

## Instrucciones de Uso

### Requisitos previos
- Node.js instalado

### Pasos para ejecutar

**1. Instalar dependencias (solo la primera vez):**
```cmd
npm install
```

**2. Ejecutar el analizador:**
```cmd
node index.js
```

### Archivo de entrada

El analizador lee por defecto el archivo `input.txt` de la raíz del repositorio. Para probar con otro código hay dos opciones:

**Opción 1:** Editar directamente el archivo `input.txt` con el código que se quiera analizar.

**Opción 2:** Modificar esta línea en `index.js` para usar los ejemplos propuestos:
```javascript
input = fs.readFileSync('../input.txt', 'utf8');
```
Reemplazar `'../input.txt'` por cualquiera de estos:
- `'../input_correcto_1.txt'` — contiene asignaciones y console.log
- `'../input_correcto_2.txt'` — contiene while con bloque
- `'../input_incorrecto_1.txt'` — genera error léxico (carácter inválido `@`)
- `'../input_incorrecto_2.txt'` — genera error sintáctico (tokens faltantes)

### Salida esperada

**Fase 1 — Análisis léxico:** tabla con línea, lexema y tipo de cada token.

**Fase 2 — Análisis sintáctico:** árbol de derivación o mensaje de error con línea y causa.

**Fase 3 — Evaluación semántica:** resultado de las asignaciones y `console.log`, y variables en memoria al finalizar.
