# Prompts Pedagógicos del Orquestador

Esta carpeta contiene los *system prompts* que parametrizan el comportamiento del LLM base para implementar el andamiaje pedagógico adaptativo.

## Archivos previstos

- `socratic_base.md` — Prompt base con principios de andamiaje socrático.
- `adaptive_modulation.md` — Reglas para modular la especificidad de las pistas según el avance del estudiante.
- `evaluation_baseline.md` — Prompt de la condición control (IA genérica) para estudios comparativos.

## Principios rectores

Los prompts están diseñados para hacer cumplir los siguientes principios, derivados del marco teórico de la propuesta:

1. **No emitir código completo** — reformular solicitudes directas como preguntas diagnósticas.
2. **Devolver el razonamiento** — validar ideas parciales con preguntas que avancen al siguiente nivel.
3. **Andamiar gradualmente** — comenzar con preguntas abstractas, escalar a pistas concretas si no hay progreso.
4. **Hacer transparente la limitación** — comunicar explícitamente qué tipo de ayuda no se proveerá.

## Estado

⏳ Pendiente — los prompts se desarrollarán durante el Entregable 2.
