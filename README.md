# Agente Conversacional con Andamiaje Socrático para Programación Introductoria

> Prueba de Concepto de un agente conversacional web para apoyar el aprendizaje de programación introductoria mediante andamiaje socrático, niveles de ayuda adaptativos, registro de interacción y perfil persistente del estudiante.

**Curso:** PF-3311 Agentes Virtuales Inteligentes  
**Estudiante:** Hansell Solís Ramírez  
**Programa:** Maestría en Computación e Informática — Universidad de Costa Rica  
**Ciclo:** I-2026  

---

## Descripción del proyecto

Este repositorio contiene el avance técnico y metodológico de un agente conversacional diseñado para apoyar a estudiantes de programación introductoria en Python.

El sistema busca guiar al estudiante sin sustituir su razonamiento. Para ello, el agente no entrega soluciones completas de código, sino que utiliza preguntas, pistas graduales, ejemplos análogos y microacciones cuando detecta que el estudiante se encuentra atascado.

La Prueba de Concepto actual demuestra la integración de:

- una aplicación web de chat;
- un LLM base mediante API de Gemini;
- un sistema de sesiones por participante;
- logs en formato JSON;
- persistencia en base de datos SQLite;
- autenticación con usuario y contraseña;
- modelo persistente del estudiante;
- niveles de andamiaje;
- detección de conceptos demostrados;
- panel visual de perfil del estudiante;
- modo socrático y modo libre para comparación experimental.

---

## Estado actual del proyecto

| Etapa | Estado |
|---|:---:|
| Entregable 1 — Propuesta de agente e investigación | ✅ Completo |
| Entregable 2 — Avance de agente e investigación | ✅ En desarrollo avanzado |
| Prueba de Concepto funcional | ✅ Implementada |
| Arquitectura de 3 capas | ✅ Implementada |
| Logs JSON por sesión | ✅ Implementado |
| Persistencia en base de datos | ✅ Implementada |
| Autenticación de usuarios | ✅ Implementada |
| Perfil persistente del estudiante | ✅ Implementado |
| System prompt v2.0 | ✅ Propuesto y documentado |
| Barreras de suficiencia y limpieza | ✅ Integradas en la PoC |
| Evaluación completa con usuarios reales | ⏳ Pendiente de autorización formal / etapa posterior |

---

## ¿Qué hace el sistema?

El sistema funciona como un tutor conversacional para programación introductoria.

Cuando un estudiante consulta al agente, el modo socrático sigue este flujo:

1. Verifica si el mensaje tiene suficiente contexto.
2. Detecta si el estudiante solo pegó el enunciado sin intento propio.
3. Genera una respuesta guiada con andamiaje socrático.
4. Ajusta el nivel de ayuda según señales de atasco.
5. Limpia la respuesta para evitar entregar código que resuelva directamente el ejercicio.
6. Registra el evento en logs y base de datos.
7. Actualiza el perfil del estudiante con evidencia observada.

El sistema tiene dos modos de operación:

| Modo | URL | Descripción |
|---|---|---|
| **Socrático** | `/socratico` | Agente pedagógico con reglas, barreras y andamiaje. |
| **Libre** | `/libre` | Chat sin restricciones pedagógicas. Funciona como condición control. |

---

## Arquitectura general

```text
┌───────────────────────────────────────────────────────────────┐
│ CLIENTE WEB                                                    │
│ Login / registro → Chat → Panel de perfil del estudiante       │
└───────────────────────┬───────────────────────────────────────┘
                        │ HTTP/JSON + JWT
┌───────────────────────▼───────────────────────────────────────┐
│ SERVIDOR                                                       │
│ Express / Node.js                                              │
│                                                               │
│ /api/auth/register                                             │
│ /api/auth/login                                                │
│ /api/session/start                                             │
│ /api/session/end                                               │
│ /api/chat                                                      │
│ /api/log                                                       │
│ /api/profile                                                   │
│ /api/profile/history                                           │
│ /api/sessions                                                  │
└───────────────┬───────────────────────────────┬───────────────┘
                │                               │
                │ Gemini API                    │ SQLite
                ▼                               ▼
┌──────────────────────────────┐     ┌──────────────────────────┐
│ LLM base                      │     │ Base de datos             │
│ Gemini                         │     │ users                    │
│ Barrera 1: suficiencia         │     │ chat_sessions            │
│ Barrera 2: respuesta principal │     │ chat_events              │
│ Barrera 3: limpieza de código  │     │ student_concepts         │
└──────────────────────────────┘     │ student_profile          │
                                      └──────────────────────────┘
                │
                ▼
┌──────────────────────────────┐
│ logs/*.json                   │
│ Registro reproducible por     │
│ sesión de interacción          │
└──────────────────────────────┘
```

---

## Arquitectura de 3 capas

El proyecto mantiene una arquitectura de tres capas, separando responsabilidades:

| Capa | Descripción |
|---|---|
| **Presentación** | Interfaz web de login, chat y panel de perfil del estudiante. |
| **Servicios / lógica de negocio** | Orquestación del agente, autenticación, actualización de perfil, niveles de andamiaje y procesamiento de sesiones. |
| **Acceso a datos** | Repositorios y persistencia en SQLite para usuarios, sesiones, eventos y conceptos. |

Esta separación permite evolucionar la memoria persistente y el perfil del estudiante sin modificar el motor principal de conversación del agente.

---

## Las 3 barreras del modo socrático

El modo socrático utiliza tres barreras para controlar la respuesta del agente:

```text
Mensaje del estudiante
        ↓
Barrera 1 — Verificación de suficiencia
        ↓
Barrera 2 — Respuesta socrática principal
        ↓
Barrera 3 — Limpieza de código
        ↓
Respuesta final limpia
```

### Barrera 1 — Verificación de suficiencia

Detecta si el mensaje contiene suficiente información para responder de forma pedagógica.

Casos que puede detectar:

- enunciado pegado sin intento propio;
- falta de código o error cuando el estudiante pide depuración;
- pregunta demasiado ambigua;
- ausencia de contexto mínimo.

Si el mensaje no es suficiente, el sistema responde con una guía de descomposición y no llama al núcleo principal.

### Barrera 2 — Respuesta socrática principal

Genera la respuesta pedagógica usando el system prompt del agente.

Esta barrera aplica reglas como:

- no entregar soluciones completas;
- preguntar antes de resolver;
- guiar paso a paso;
- distinguir entre razonamiento y dudas declarativas;
- permitir cambio de ejercicio;
- ajustar el nivel de ayuda.

### Barrera 3 — Limpieza de código

Revisa la respuesta generada antes de mostrarla al estudiante.

Su objetivo es evitar que se filtren fragmentos de código que resuelvan directamente el ejercicio asignado.

---

## Niveles de andamiaje

El sistema registra un nivel de andamiaje para cada respuesta socrática.

| Nivel | Condición general | Tipo de ayuda |
|---|---|---|
| **1** | Primer intento o estudiante orientado | Pregunta abierta de razonamiento. |
| **2** | Primera señal de atasco | Pista conceptual. |
| **3** | Atasco repetido | Ejemplo análogo o guía más concreta. |
| **Afloje** | Se alcanza el techo de fricción | Microacción concreta para destrabar. |

Además, el sistema utiliza:

- `scaffoldLevel`: nivel actual de andamiaje;
- `stickyCount`: contador de atasco;
- `frictionCeiling`: techo de fricción configurable;
- `conceptosDemostrados`: conceptos inferidos a partir de evidencia observada.

---

## Modelo persistente del estudiante

El sistema conserva un perfil del estudiante entre sesiones.

Este perfil no usa porcentajes de conocimiento. En su lugar, utiliza estados basados en evidencia observada:

| Estado | Significado |
|---|---|
| **Dominado** | El concepto aparece de forma consistente en varias sesiones. |
| **En progreso** | Hay evidencia parcial del concepto, pero aún no es estable. |
| **Requiere apoyo** | No hay evidencia suficiente o el estudiante necesita guía frecuente. |

Ejemplo:

| Concepto | Estado |
|---|---|
| Variables | Dominado |
| Condicionales | En progreso |
| Bucles | Requiere apoyo |

El perfil se actualiza automáticamente a partir de los eventos registrados en los logs y en la base de datos.

---

## Panel visual del estudiante

La interfaz incluye una sección llamada **Perfil del Estudiante**.

Esta sección muestra:

- conceptos observados;
- estado actual de cada concepto;
- nivel de andamiaje actual;
- sticky count actual;
- tiempo de sesión;
- historial resumido de sesiones anteriores;
- métricas acumuladas de interacción.

---

## Estructura del repositorio

```text
.
├── README.md
├── .gitignore
│
├── docs/
│   ├── Entregable2_Avance_Agente_HansellSolis.pdf
│   ├── PF3311_Entregable1_HansellSolis.pdf
│   │
│   │
│   ├── propuesta_v2/
│   │   ├── Propuesta_System_Prompt_v2.pdf
│   
│
├── prompts/
│   ├── README.md
│   ├── system_prompt_v2.md
│   └── prompts.md
│
└── src/
    └── web-app-api/
        ├── server.js
        ├── package.json
        ├── package-lock.json
        ├── start-socratico.ps1
        ├── start-libre.ps1
        ├── ARQUITECTURA.md
        ├── PROMPTS.md
        │
        ├── public/
        │   ├── index.html
        │   └── widget.js
        │
        ├── db/
        │   ├── database.js
        │   └── ucr-research.db
        │
        ├── repositories/
        │   ├── userRepo.js
        │   ├── sessionRepo.js
        │   ├── conceptRepo.js
        │   └── profileRepo.js
        │
        ├── services/
        │   ├── authService.js
        │   └── studentService.js
        │
        ├── middleware/
        │   └── auth.js
        │
        ├── scripts/
        │   └── migrate-logs.js
        │
        └── logs/
            └── *.json
```

---

## Documentación académica

El documento principal del Entregable 2 se encuentra en:

```text
docs/Entregable2/Entregable2_Avance_Agente_HansellSolis.pdf
```


---

## Prompts del agente

Los prompts pedagógicos se encuentran en:

```text
prompts/
```

La versión propuesta actual es:

```text
prompts/system_prompt_v2.md
```

La justificación completa del rediseño se encuentra en:

```text
docs/propuesta_v2/Propuesta_System_Prompt_v2.pdf
```

El rediseño v2.0 incorpora:

- andamiaje por niveles;
- modo declarativo;
- cambio de ejercicio permitido;
- techo de fricción;
- refuerzo de la regla de no evaluación;
- barrera de suficiencia;
- barrera de limpieza de código;
- compatibilidad con logs existentes.

---

## Base de datos

El sistema usa SQLite para persistencia local.

### Tablas principales

```sql
users
  id INTEGER PRIMARY KEY
  username TEXT UNIQUE
  password_hash TEXT
  migrated INTEGER
  created_at TEXT
  last_login TEXT

chat_sessions
  id TEXT PRIMARY KEY
  user_id INTEGER
  mode TEXT
  prompt_version TEXT
  friction_ceiling INTEGER
  started_at TEXT
  ended_at TEXT
  duration_minutes REAL
  total_events INTEGER

chat_events
  id INTEGER PRIMARY KEY
  session_id TEXT
  timestamp TEXT
  time_since_start TEXT
  event_type TEXT
  data TEXT

student_concepts
  id INTEGER PRIMARY KEY
  user_id INTEGER
  concept TEXT
  state TEXT
  evidence_count INTEGER
  first_seen TEXT
  last_updated TEXT

student_profile
  user_id INTEGER PRIMARY KEY
  total_sessions INTEGER
  total_prompts INTEGER
  last_scaffold_level INTEGER
  last_sticky_count INTEGER
  total_time_minutes REAL
  updated_at TEXT
```

---

## API REST

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registra un usuario nuevo. |
| POST | `/api/auth/login` | Inicia sesión y devuelve un token JWT. |

### Sesión y chat

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/session/start` | Inicia una sesión de interacción. |
| POST | `/api/session/end` | Cierra una sesión. |
| POST | `/api/chat` | Envía un mensaje al agente. |
| POST | `/api/log` | Registra un evento de interacción. |

### Perfil del estudiante

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/profile` | Devuelve perfil, conceptos e historial reciente. |
| GET | `/api/profile/history` | Devuelve historial de sesiones. |

### Investigación

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/sessions` | Lista sesiones registradas para inspección del investigador. |

---

## Requisitos del sistema

| Requisito | Versión mínima |
|---|---|
| Node.js | 18+ |
| npm | 8+ |
| SQLite | Incluido mediante `better-sqlite3` |

Dependencias principales:

```json
{
  "express": "^4.18.0",
  "better-sqlite3": "^9.6.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2"
}
```

---

## Configuración de credenciales

El sistema requiere una API key de Gemini.


## Instalación

```bash
# 1. Clonar el repositorio
git clone URL_DEL_REPOSITORIO
cd agente-andamiaje-ucr

# 2. Entrar a la PoC
cd src/web-app-api

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno
# Crear .env o configurar GEMINI_API_KEY manualmente

# 5. Ejecutar el servidor
npm start
```

Si no existe script `npm start`, ejecutar:

```bash
node server.js
```

---

## Ejecución por modo

### Modo socrático

```powershell
cd src/web-app-api
.\start-socratico.ps1
```

o bien:

```bash
FORCE_MODE=socratico PORT=3000 node server.js
```



## Acceso local

Después de iniciar el servidor:

| URL | Descripción |
|---|---|
| `http://localhost:3000` | Interfaz principal. |
| `http://localhost:3000/socratico` | Modo socrático. |
| `http://localhost:3000/libre` | Modo libre. |
| `http://localhost:3000/api/sessions` | Sesiones registradas. |

---

## Migración de logs existentes

Si existen logs JSON en la carpeta `logs/`, pueden migrarse a SQLite:

```bash
cd src/web-app-api
node scripts/migrate-logs.js
```

La migración:

1. Lee los archivos `.json` existentes.
2. Crea usuarios migrados por `participantId`.
3. Importa sesiones.
4. Importa eventos.
5. Reconstruye conceptos observados cuando sea posible.
6. Es idempotente: puede ejecutarse varias veces sin duplicar datos.

---

## Video de demostración

Enlace no listado de YouTube: https://youtu.be/sWq9ugx--Iw

---

## Consideraciones éticas y de investigación

- Las sesiones se registran para fines académicos y de análisis de interacción.
- El sistema no debe almacenar API keys en el repositorio.
- Las contraseñas se almacenan mediante hash seguro.
- Los datos de interacción deben tratarse con confidencialidad.
- La evaluación con usuarios reales requiere las autorizaciones correspondientes.
- Para el curso PF-3311, el diseño metodológico se orienta a pilotos y/o evaluación con expertos.

---

## Limitaciones actuales

- La PoC demuestra integración funcional, pero no representa aún un producto final.
- El modo de voz y embodiment visual quedan como trabajo pendiente o componente futuro.
- El análisis de perfil del estudiante depende de evidencia observada en logs; no mide conocimiento real de forma absoluta.
- La clasificación de conceptos puede requerir validación adicional en estudios posteriores.
- La evaluación formal con usuarios reales queda condicionada a los permisos éticos correspondientes.

---

## Referencias clave

- Brooke, J. (1996). SUS: A quick and dirty usability scale.
- Hart, S. G., & Staveland, L. E. (1988). Development of NASA-TLX.
- Liffiton, M., Sheese, B. E., Savelka, J., & Denny, P. (2023). CodeHelp: Using LLMs with Guardrails for Scalable Support in Programming Classes.
- Prather, J. et al. (2024). The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers.
- Sauro, J., & Lewis, J. R. (2016). Quantifying the User Experience.
- Wood, D., Bruner, J. S., & Ross, G. (1976). The role of tutoring in problem solving.
- Wing, J. M. (2006). Computational Thinking.

---

## Licencia

Este proyecto se desarrolla con fines académicos en el marco del curso PF-3311 Agentes Virtuales Inteligentes de la Universidad de Costa Rica.

Los términos de uso y distribución se definirán al cierre del proyecto.

---

## Contacto

**Hansell Solís Ramírez**  
Maestría en Computación e Informática  
Universidad de Costa Rica
