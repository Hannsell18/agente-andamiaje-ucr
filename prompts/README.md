# Prompts Pedagógicos del Agente Socrático

Esta carpeta contiene los prompts que parametrizan el comportamiento del LLM base para implementar el andamiaje pedagógico socrático del agente conversacional.

El objetivo de estos prompts no es entregar soluciones completas, sino guiar al estudiante mediante preguntas, pistas graduales, ejemplos análogos y recuperación de conceptos cuando sea pedagógicamente apropiado.

## Archivos incluidos

| Archivo | Descripción |
|---|---|
| `system_prompt_v1.md` | Versión inicial del prompt socrático utilizado en la primera prueba con estudiantes. |
| `system_prompt_v2.md` | Versión propuesta del prompt rediseñado a partir del análisis de logs, SUS, NASA-TLX y focus group. |
| `prompt_suficiencia.md` | Prompt de verificación previa para detectar si la consulta del estudiante tiene información suficiente antes de responder. |
| `prompt_limpieza_codigo.md` | Prompt de post-procesamiento para eliminar fragmentos de código que puedan resolver directamente el ejercicio asignado. |
| `README.md` | Descripción de la carpeta y trazabilidad del rediseño. |

> Nota: el documento completo que justifica el rediseño se encuentra en:
>
> `docs/propuesta_v2/Propuesta_System_Prompt_v2.pdf`

## Propósito del prompt socrático

El prompt configura al agente para actuar como apoyo académico en programación introductoria. Su función principal es acompañar el razonamiento del estudiante sin sustituirlo.

El agente debe:

1. Hacer preguntas diagnósticas.
2. Pedir que el estudiante explique su razonamiento.
3. Dar pistas graduales.
4. Evitar entregar código completo.
5. Ayudar a depurar errores sin resolver todo el ejercicio.
6. Distinguir entre dudas de razonamiento y dudas declarativas de sintaxis.
7. Ajustar la ayuda cuando el estudiante se atasca.

## Principios rectores

### 1. No entregar la solución completa

El agente no debe producir código completo ni fragmentos que resuelvan directamente el ejercicio asignado.

Cuando el estudiante pide una solución directa, el agente debe reformular la petición como una pregunta o una microtarea guiada.

Ejemplo:

```text
Estudiante: Dame el código.
Agente: No te voy a dar la solución completa, pero sí podemos construirla paso a paso. ¿Qué entrada recibe la función y qué debe devolver?
```

### 2. Andamiaje gradual

La ayuda debe aumentar de especificidad según el nivel de atasco del estudiante.

La versión 2.0 propone una progresión por niveles:

| Nivel | Tipo de ayuda | Descripción |
|---|---|---|
| Nivel 1 | Pregunta abierta | El agente ayuda a descomponer el problema. |
| Nivel 2 | Pista conceptual | El agente sugiere qué estructura o idea aplicar. |
| Nivel 3 | Ejemplo análogo | El agente muestra una sintaxis similar en un problema distinto. |
| Nivel 4 | Microacción concreta | El agente reduce el problema a un paso mínimo ejecutable. |

Este cambio surge porque el análisis de interacción mostró señales repetidas de atasco y sesiones largas donde el estudiante no avanzaba con preguntas demasiado abstractas.

### 3. Modo declarativo

La versión 2.0 distingue entre dos tipos de dudas:

| Tipo de duda | Ejemplo | Respuesta esperada |
|---|---|---|
| Razonamiento | “¿Cómo hago que esta lista rote?” | Guía socrática paso a paso. |
| Declarativa | “¿Cómo se llama el método para sacar un elemento?” | Respuesta directa y breve. |

Cuando la duda es declarativa, el agente puede responder de forma directa siempre que eso no resuelva el ejercicio completo.

Ejemplo:

```text
Estudiante: ¿Cómo se llama el método para quitar un elemento de una lista?
Agente: Es `pop()`. Ahora, ¿cómo lo usarías en tu caso sin perder el valor que quitaste?
```

### 4. Cambio de ejercicio permitido

La actividad contiene varios ejercicios independientes. Por eso, si el estudiante decide pasar a otro ejercicio, el agente debe aceptar el cambio y reiniciar el contexto de andamiaje.

Esto corrige una limitación observada en la primera versión, donde el agente tendía a insistir en volver al ejercicio anterior.

### 5. No evaluar al estudiante

El agente debe evitar expresiones evaluativas como:

```text
Excelente
Muy bien
Perfecto
Correcto
Exacto
Vas por buen camino
Buen trabajo
```

En lugar de evaluar, debe pedir verificación:

```text
¿Cómo podrías comprobar que eso funciona?
¿Qué pasaría si probás con esta entrada?
¿Qué resultado esperás obtener?
```

Este cambio se incorporó porque el análisis de fidelidad del prompt mostró que la regla de “no evaluar” fue una de las más difíciles de cumplir.

## Arquitectura propuesta de prompts

La versión 2.0 propone un flujo de tres barreras:

```text
Consulta del estudiante
        ↓
Barrera 1: Verificación de suficiencia
        ↓
Barrera 2: Respuesta socrática principal
        ↓
Barrera 3: Limpieza de código
        ↓
Respuesta final al estudiante
```

### Barrera 1: Verificación de suficiencia

Detecta si el estudiante solo pegó el enunciado o si falta contexto para responder.

Si falta información, el agente debe pedir una aclaración o descomponer el problema en:

- entrada,
- salida esperada,
- restricción,
- primer paso posible.

### Barrera 2: Respuesta socrática principal

Genera la respuesta pedagógica siguiendo el system prompt.

Debe mantener el rol de tutor socrático y guiar sin resolver completamente.

### Barrera 3: Limpieza de código

Revisa la respuesta antes de mostrarla al estudiante.

Su objetivo es evitar que se filtren fragmentos de código que resuelvan directamente el ejercicio asignado.

## Trazabilidad del rediseño

La versión 2.0 no se propone por preferencia personal, sino a partir de evidencia recogida en la evaluación.

| Problema observado | Evidencia | Cambio en v2.0 |
|---|---|---|
| El agente evaluaba demasiado al estudiante | Análisis de fidelidad del prompt | Refuerzo de la regla “no evaluar”. |
| Aparecieron fragmentos copiables | Logs y eventos `AGENT_COPY` | Barrera de limpieza de código. |
| El agente era muy rígido ante el atasco | Señales de “no sé”, “ni idea” y sesiones largas | Andamiaje por niveles. |
| Muchos estudiantes pegaban el enunciado | Logs de interacción | Barrera de suficiencia. |
| El agente insistía en ejercicios anteriores | Logs de cambio de ejercicio | Regla de cambio de ejercicio permitido. |
| Los estudiantes necesitaban nombres de funciones | Focus group | Modo declarativo. |
| Hubo errores técnicos del proveedor | Eventos Gemini 503 | Reintento con backoff en arquitectura. |

## Estado actual

La carpeta pasa de estado “pendiente” a estado **en desarrollo avanzado**.

| Componente | Estado |
|---|---|
| Prompt v1 | Documentado. |
| Prompt v2 | Propuesto y justificado. |
| Barrera de suficiencia | Propuesta. |
| Barrera de limpieza de código | Propuesta. |
| Implementación completa en arquitectura | Pendiente de integración en la PoC. |

## Relación con el Entregable 2

Estos prompts forman parte de la Prueba de Concepto del agente y respaldan las secciones de:

- estado actual del agente,
- diseño metodológico,
- métricas e instrumentos,
- protocolos de interacción,
- cambios desde el Entregable 1.

El documento completo de justificación debe consultarse en:

```text
docs/propuesta_v2/Propuesta_System_Prompt_v2.pdf
```
