# Backend — API y Orquestador Pedagógico

API REST y orquestador del LLM con lógica de andamiaje pedagógico adaptativo.

## Stack planeado

- **Lenguaje:** Python 3.11+
- **Framework:** FastAPI (REST + WebSockets para streaming)
- **LLM:** Google Generative AI SDK (Gemini)
- **TTS:** ElevenLabs SDK (con respaldo en Google Cloud TTS)
- **STT:** OpenAI Whisper (modelo local) o Web Speech API (cliente)
- **Base de datos:** PostgreSQL 15+ (con SQLAlchemy + Alembic para migraciones)
- **Validación:** Pydantic v2
- **Deployment:** Railway / Render

## Estructura prevista

```
backend/
├── app/
│   ├── main.py             # Entry point FastAPI
│   ├── api/                # Endpoints REST
│   ├── core/
│   │   ├── orchestrator.py # Lógica de andamiaje
│   │   └── prompts.py      # Carga de system prompts
│   ├── llm/                # Clientes LLM (Gemini, otros)
│   ├── voice/              # Clientes TTS / STT
│   ├── models/             # Modelos SQLAlchemy
│   ├── schemas/            # Pydantic schemas
│   └── db/                 # Conexión y migraciones
├── tests/
├── pyproject.toml
└── .env.example            # Plantilla de variables (NUNCA subir .env real)
```

## Variables de entorno requeridas (futuras)

```
GEMINI_API_KEY=...
ELEVENLABS_API_KEY=...
DATABASE_URL=postgresql://...
```

## Estado

⏳ Pendiente — implementación a partir del Entregable 3.
