# Agente Conversacional con Andamiaje Pedagógico Adaptativo

> Diseño e implementación de un agente conversacional con embodiment visual y andamiaje pedagógico adaptativo para el apoyo del pensamiento computacional en estudiantes de programación introductoria de la Universidad de Costa Rica.

**Curso:** PF-3311 Agentes Virtuales Inteligentes
**Estudiante:** Hansell Solís Ramírez
**Programa:** Maestría en Computación e Informática — UCR, Sede Rodrigo Facio
**Ciclo:** I-2026

---

## Descripción del proyecto

Este repositorio contiene la propuesta y el desarrollo iterativo de un agente conversacional con dos características diferenciadoras:

1. **Andamiaje pedagógico adaptativo** — el agente no entrega soluciones de código directas, sino que formula preguntas guía, ofrece pistas graduales y devuelve el razonamiento al estudiante, alineado con los principios de Wood, Bruner y Ross (1976) y la Resolución R-469-2025 de la UCR.
2. **Embodiment visual 3D** — el agente cuenta con una representación corpórea estilizada (Ready Player Me + Three.js) que añade un canal social al texto y mitiga el *uncanny valley*.

El proyecto responde a evidencia empírica recogida en la UCR (Solís-Ramírez et al., 2025; N=455) que documenta una adopción del 97.4% de IA generativa entre estudiantes universitarios, una desconfianza generalizada (24.5% confía) y la identificación explícita de la dependencia cognitiva (79.3%) como riesgo principal.

---

## Estructura del repositorio

```
.
├── README.md                  # Este archivo
├── .gitignore                 # Exclusiones de Git
├── docs/                      # Documentación académica
│   └── PF3311_Entregable1_HansellSolis.pdf
├── prompts/                   # System prompts del orquestador pedagógico
│   └── README.md
└── src/                       # Código fuente del agente
    ├── frontend/              # Aplicación web (React + Three.js)
    │   └── README.md
    └── backend/               # API y orquestador (FastAPI + Gemini)
        └── README.md
```

---

## Estado actual del proyecto

| Etapa | Estado |
|-------|:------:|
| Entregable 1 — Propuesta de Agente e Investigación | ✅ Completo |
| Entregable 2 — Diseño detallado | ⏳ Pendiente |
| Entregable 3 — Prototipo funcional | ⏳ Pendiente |
| Entregable 4 — Evaluación con expertos / piloto | ⏳ Pendiente |

> El documento completo de la propuesta está disponible en [`docs/PF3311_Entregable1_HansellSolis.pdf`](docs/PF3311_Entregable1_HansellSolis.pdf).

---

## Arquitectura técnica preliminar

El agente se implementa como una **aplicación web independiente** que integra cuatro subsistemas:

- **Frontend (Web):** React + TypeScript + Three.js + Ready Player Me (avatar 3D estilizado), con Monaco Editor para edición de código embebida.
- **Backend:** FastAPI (Python) con orquestador pedagógico que envuelve cada llamada al LLM con un *system prompt* adaptativo.
- **LLM base:** Gemini API (Google), con capa de abstracción para evaluación comparativa.
- **Capa de voz:** ElevenLabs (TTS) y OpenAI Whisper (STT).
- **Persistencia:** PostgreSQL para registro estructurado de sesiones.

Para detalles de la arquitectura, ver el diagrama y la justificación en el documento de propuesta (Sección 6).

---

## Stack tecnológico planeado

### Frontend
- React 18 + TypeScript
- Next.js 14 (deployment: Vercel)
- Three.js (renderizado 3D)
- Ready Player Me (modelos de avatar)
- Monaco Editor (editor de código)

### Backend
- Python 3.11+
- FastAPI (API REST + WebSockets)
- Google Generative AI SDK (Gemini)
- ElevenLabs SDK (TTS)
- OpenAI Whisper (STT, modelo local)
- PostgreSQL 15+

### Infraestructura
- Vercel (frontend)
- Railway / Render (backend)
- GitHub Actions (CI/CD básico)

---

## Cómo contribuir / ejecutar (próximamente)

> ⚠️ La estructura de código en `src/` está actualmente vacía. Las instrucciones de instalación y ejecución se agregarán a partir del Entregable 2.

---

## Consideraciones éticas y de gobernanza

- Este proyecto se alinea con la **Resolución R-469-2025** de la UCR sobre uso de IA en procesos pedagógicos.
- Las evaluaciones del curso se realizarán mediante **pilotos controlados y revisión por expertos**, sin participación de usuarios reales hasta obtener la autorización correspondiente del Comité Ético Científico (CEC).
- **No se almacenarán API keys ni credenciales en este repositorio.** Toda configuración sensible se maneja vía variables de entorno (ver `.env.example` en próximos entregables).

---

## Referencias clave

- Prather, J. et al. (2024). *The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers.* ICER '24.
- Solís-Ramírez, H. et al. (2025). *Patterns of Artificial Intelligence Use Among University Students.* UCR — CITIC/ECCI.
- Wood, D., Bruner, J. S., & Ross, G. (1976). *The Role of Tutoring in Problem Solving.* Journal of Child Psychology and Psychiatry, 17(2).
- Wing, J. M. (2006). *Computational Thinking.* Communications of the ACM, 49(3).
- Cassell, J. et al. (2000). *Embodied Conversational Agents.* MIT Press.

> La lista completa (30 referencias en formato IEEE) se encuentra en el documento de propuesta.

---

## Licencia

Este proyecto se desarrolla con fines académicos en el marco del curso PF-3311 de la Universidad de Costa Rica. Los términos de uso y distribución se definirán al cierre del proyecto.

---

## Contacto

**Hansell Solís Ramírez**
Maestría en Computación e Informática
Universidad de Costa Rica — Sede Rodrigo Facio
