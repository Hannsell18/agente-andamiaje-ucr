# Tarea 10 — Diseño del Protocolo de Evaluación y Matriz de Consistencia

**Curso:** Agentes Virtuales — Posgrado en Computación e Informática
**Universidad de Costa Rica, Sede Rodrigo Facio**
**Autor:** Hansell Solís Ramírez
**Proyecto institucional asociado:** ECCI/CITIC 834-C5-207
**Fecha:** Mayo 2026

---

## Nota de encuadre: la Prueba de Concepto y su relación con la tesis

La Prueba de Concepto (PoC) que se evalúa en este protocolo es una variante *embodied* (con avatar, voz y comportamiento no verbal) del agente conversacional con andamiaje socrático adaptativo que constituye el núcleo de la tesis de maestría del autor. El proyecto del curso de Investigación de Usuarios (HCI) documentó la tensión de diseño que articula este experimento: el andamiaje socrático es pedagógicamente efectivo, pero impone un costo de usabilidad y un riesgo afectivo —las respuestas indirectas pueden desalentar a la persona estudiante cuando no percibe progreso (Wu et al., 2025). Este experimento se diseña para responder, en condiciones controladas, si el *embodiment* del agente mitiga ese costo sin colapsar la fricción cognitiva productiva que el andamiaje busca preservar.

La doble ganancia con la tesis es explícita y se detalla al final de cada apartado: el diseño alimenta los Objetivos Específicos 2 (requisitos), 3 (diseño e implementación) y 4 (evaluación).

---

## Apartado A — Definición de Condiciones

### Condición Experimental (Condición A): Agente socrático *embodied*

La Condición A presenta el agente conversacional con andamiaje socrático adaptativo dotado de *embodiment* completo. Técnicamente, se implementa sobre el mismo motor de la PoC de la tesis (un modelo de lenguaje a gran escala configurado mediante un *system prompt* pedagógico que prohíbe la entrega de código completo y exige la formulación de preguntas guía, pistas graduales y devolución del razonamiento), pero se expone a través de una interfaz web que incorpora un avatar animado. En el plano visual, el agente cuenta con un personaje con expresión facial, dirección de mirada y gestos comunicativos sincronizados con el habla, junto con voz sintetizada (texto a voz) de prosodia natural. En el plano conductual, además de la lógica socrática, incorpora una capa de soporte relacional inspirada en los agentes relacionales: un saludo personalizado, el reconocimiento explícito de la frustración cuando esta se detecta, y el refuerzo del progreso de la persona estudiante. La pedagogía —el conjunto de *prompts*, la lógica de adaptación del andamiaje y los guardarraíles que impiden revelar la solución— es idéntica a la de la Condición B; únicamente cambia la presencia corporeizada, vocal, no verbal y relacional del agente.

### Condición de Control o *Baseline* (Condición B): Agente socrático en texto plano

La Condición B presenta exactamente el mismo agente socrático —el mismo motor, los mismos *prompts*, la misma lógica de andamiaje adaptativo y los mismos guardarraíles pedagógicos— pero desprovisto por completo de *embodiment*. La interacción ocurre mediante una interfaz de chat en texto plano: sin avatar, sin voz, sin comportamiento no verbal y sin la capa de soporte relacional (las respuestas se entregan en un registro neutro, sin saludo personalizado ni refuerzo afectivo). La Condición B constituye así la versión funcional mínima del agente y representa el formato conversacional textual con el que las personas estudiantes ya interactúan habitualmente al usar herramientas comerciales de IA.

### Justificación

La comparación está diseñada para aislar el efecto del *embodiment* manteniendo constante la pedagogía. Dado que ambas condiciones comparten el motor, los *prompts*, la lógica de andamiaje y la tarea, la única variable manipulada entre grupos es la presencia del avatar, la voz, el comportamiento no verbal y la capa relacional. En un diseño entre-sujetos con asignación aleatoria, cualquier diferencia sistemática observada en usabilidad percibida, carga cognitiva, experiencia afectiva o percepción del agente puede atribuirse al *embodiment* y no a la estrategia pedagógica. Esta lógica de control responde directamente a la pregunta abierta que dejó el estudio de HCI: si el costo de usabilidad del andamiaje socrático (Wu et al., 2025) puede compensarse mediante el diseño afectivo y no verbal del agente.

Esta elección se adopta sobre alternativas que conviene declarar:

- **Alternativa 1 — Agente socrático vs. agente de respuesta directa (aislar la pedagogía).** Permitiría medir el efecto del andamiaje socrático frente a la entrega de soluciones. Se descarta porque esa comparación ya está documentada en la literatura de tutores socráticos para CS1 (mejoras del 10 %–33 % en comprensión de código) y porque el aporte específico de este curso es el componente de agente virtual, no la pedagogía, que la tesis ya sustenta.
- **Alternativa 2 — *Embodiment* completo vs. solo voz sin avatar (aislar el componente visual).** Sería más granular y permitiría separar el aporte del avatar del aporte de la voz, pero exigiría al menos tres condiciones y un tamaño muestral mayor, inviable con n ≈ 40 en un estudio exploratorio.
- **Opción adoptada — *Embodiment* completo vs. texto plano.** Equilibra limpieza causal y viabilidad estadística, y responde la pregunta de mayor valor para la tesis.

**Limitación honesta que debe declararse en el reporte final.** El *embodiment* es un "paquete" de variables (avatar visual, no verbal, voz y capa relacional). Por ello, un efecto significativo a favor de la Condición A no podrá atribuirse a un sub-componente específico. Esta es la misma crítica que Schroeder et al. (2025) dirigen al *principio de embodiment*, que tiende a confundir múltiples variables (movimiento corporal, mirada, gestos). La desagregación de estos componentes queda planteada como trabajo futuro.

> **Conexión con la tesis (OE3 y OE4).** La definición de las condiciones formaliza la decisión de diseño sobre si el agente de la tesis debe ser *embodied* o textual (OE3) y produce el aparato experimental con grupo de control que el piloto de la tesis aún no tenía definido (OE4).

---

## Apartado B — Matriz de Consistencia Metodológica

> **Advertencia de alineación.** Las preguntas de investigación (RQ) que se presentan a continuación son la formulación propuesta para este estudio de agente virtual y deben reconciliarse con las RQ exactas registradas en el Entregable 1 del curso antes de la entrega final. Cada RQ se ancla a la tarea única del guion —la resolución del ejercicio *¿Más positivos o negativos?* en Python interactuando con el agente (Condición A o B)— y a su batería post-tarea.

| Pregunta de Investigación (RQ) | Variable o Constructo | Instrumento Validado | Tarea Asociada (escenario del guion) |
|---|---|---|---|
| **RQ1.** ¿El *embodiment* del agente socrático mejora la usabilidad percibida frente a la versión en texto plano? | Usabilidad percibida | **SUS** (System Usability Scale, 10 ítems) | Aplicado inmediatamente después de los 35 min de resolución del ejercicio; refiere a la interacción completa con el agente asignado. |
| **RQ2.** ¿El *embodiment* incrementa, reduce o no altera la carga cognitiva percibida durante la tarea? | Carga cognitiva (mental, esfuerzo, frustración, temporal, rendimiento) | **NASA-TLX / Raw TLX** (6 subescalas) | Aplicado post-tarea (papel u oral según subgrupo); refiere al esfuerzo percibido durante la resolución del ejercicio con el agente. |
| **RQ3.** ¿El *embodiment* mejora la experiencia de usuario y la valencia afectiva durante la tarea socrática? | Experiencia de usuario y emociones (valencia/activación, percepción del producto) | **meCUE** (cuestionario modular de UX) — *alternativa de afecto puro:* **PANAS-SF**, aplicado pre/post | Aplicado post-tarea; refiere a la experiencia vivida durante la interacción con el agente al resolver el ejercicio. |
| **RQ4.** ¿Cómo perciben las personas estudiantes al agente en dimensiones de antropomorfismo, simpatía, inteligencia y seguridad percibidas? | Percepción del agente virtual | **Godspeed** (subescalas: antropomorfismo, *animacy*, simpatía, inteligencia percibida, seguridad percibida) | Aplicado post-tarea; refiere al agente específico (A o B) con el que la persona interactuó. |
| **RQ5.** ¿El *embodiment* modifica los patrones de interacción (frecuencia y profundidad de consulta, aceptación pasiva vs. razonamiento activo)? | Patrones de interacción / comportamiento de uso | **Logs automáticos del *plugin* + observación directa (*drifting*)** con hoja de notas con marcas de tiempo | Registrados durante los 35 min de resolución del ejercicio; se cruzan logs y notas de observación. |

**Notas críticas sobre la batería de instrumentos:**

1. **Riesgo de fatiga post-tarea.** La suma de SUS (10 ítems), NASA-TLX (6), Godspeed (hasta 24) y meCUE (modular) constituye una batería extensa. Se recomienda (a) emplear el Raw TLX en lugar de la versión ponderada, (b) usar solo las subescalas de Godspeed pertinentes a la hipótesis (*animacy*, simpatía e inteligencia percibida), y (c) contrabalancear el orden de administración entre participantes para controlar el efecto de orden y la fatiga. Esta decisión debe documentarse explícitamente.
2. **Sobre meCUE.** La literatura del curso lo cita como instrumento válido de UX; se recomienda verificar la edición y la cita bibliográfica exacta antes de la entrega final. PANAS-SF es una alternativa más breve y de validación muy consolidada si se prioriza la medición de afecto sobre la de UX integral.
3. **Validación lingüística.** Todos los instrumentos deben aplicarse en versión en español validada; el SUS ya cuenta con la versión empleada en el proyecto de HCI, lo que asegura continuidad metodológica con la tesis.

> **Conexión con la tesis (OE4).** SUS y NASA-TLX son los mismos instrumentos que la tesis prevé para su piloto, por lo que los resultados son directamente comparables. Godspeed y meCUE/PANAS-SF amplían el instrumental de evaluación de la tesis con métricas de percepción del agente y experiencia afectiva, que serán necesarias si el agente de la tesis incorpora *embodiment*.

---

## Apartado D — Justificación Teórica en HCI

Las decisiones de diseño del agente de la Condición A se fundamentan en tres cuerpos teóricos complementarios de la interacción humano-computadora, articulados en todo momento con la restricción pedagógica de la tesis: el *embodiment* debe apoyar a la persona estudiante sin eliminar la fricción cognitiva productiva necesaria para el desarrollo del pensamiento computacional.

### 1. Soporte no verbal del *embodiment* (Cassell)

La línea de los agentes conversacionales corporeizados (*embodied conversational agents*) establece que el comportamiento no verbal —la dirección de la mirada, los gestos, la expresión facial y la gestión de los turnos de habla— no es ornamental, sino que cumple funciones comunicativas reales: regula la conversación, señala atención y refuerza el contenido verbal (Cassell et al., 2000). Sobre esta base se justifican las características visuales y conductuales del avatar de la Condición A: la mirada y el asentimiento del agente señalan que "escucha" la articulación de la persona estudiante, y los gestos acompañan la formulación de las preguntas socráticas.

No obstante, esta decisión se adopta con una salvedad crítica respaldada por la evidencia reciente. Las revisiones de agentes pedagógicos reportan efectos del *embodiment* sobre el aprendizaje y la motivación que van de pequeños a medianos, y advierten que aún no es posible prescribir cómo diseñar un agente para un contexto educativo dado (Schroeder et al., 2025). Más importante para este diseño, las animaciones complejas y el exceso de señales no verbales pueden incrementar la carga cognitiva extraña y saturar a la persona aprendiz (Krämer & Bente, 2010). Esta es precisamente la razón por la cual el estudio mide la carga cognitiva con NASA-TLX (RQ2): el *embodiment* podría reducir el costo afectivo del andamiaje socrático y simultáneamente elevar su costo cognitivo, y el diseño debe estar preparado para detectar ese efecto contrapuesto.

### 2. Soporte relacional y lazos afectivos (Bickmore)

El concepto de agente relacional sostiene que un sistema interactivo puede establecer y mantener vínculos socioemocionales con la persona usuaria mediante recursos como la empatía, el diálogo social y el reconocimiento del estado afectivo, y que estos vínculos sostienen el compromiso a lo largo del tiempo (Bickmore & Picard, 2005). Esta teoría fundamenta la capa de soporte relacional de la Condición A: el saludo personalizado, el reconocimiento explícito de la frustración y el refuerzo del progreso.

Esta decisión responde de forma directa al problema central que motivó el experimento. El andamiaje socrático, al no entregar soluciones, puede percibirse como falta de progreso y desalentar a la persona estudiante (Wu et al., 2025). El soporte relacional busca contener afectivamente esa fricción para que sea productiva y no expulsiva. Además, conecta con un hallazgo del estudio precursor del autor: la paradoja de la desconfianza —97,4 % de adopción de IA frente a apenas 24,5 % de confianza en su información (Solís Ramírez et al., 2025)—. Un agente que pregunta en lugar de afirmar no requiere confianza ciega en su contenido, y una capa relacional bien calibrada podría favorecer una confianza calibrada hacia el proceso de acompañamiento, no hacia la veracidad de una respuesta.

### 3. Efecto Proteus y variaciones de comportamiento del usuario (Yee y Bailenson)

El Efecto Proteus establece que las personas infieren y adoptan comportamientos y actitudes a partir de la apariencia de su propio avatar: quienes encarnan avatares más altos negocian de forma más agresiva, y quienes encarnan avatares más atractivos se comportan de forma más extrovertida (Yee & Bailenson, 2007). Es fundamental ser preciso aquí, y esta precisión es en sí misma una decisión de rigor metodológico: el Efecto Proteus clásico se refiere a la auto-representación de la persona usuaria, no a la apariencia del agente. En este estudio, la persona estudiante no encarna ningún avatar; el avatar pertenece al agente. Por tanto, el Efecto Proteus en su formulación estricta no aplica de manera directa a este diseño.

Lo que sí resulta teóricamente pertinente es el mecanismo emparentado de cómo la apariencia y la persona del agente inducen expectativas y comportamientos en quien interactúa con él (por ejemplo, vía atracción por similitud o vía señales de autoridad frente a señales de par). Esta consideración conecta directamente con los tres escenarios de agente que el proyecto de HCI plantea en su *storyboard* —tutor, par programador y guía educativa—. La hipótesis exploratoria, formulada con la cautela que exige no extrapolar el efecto más allá de su evidencia, es que una persona-agente de tipo par podría reducir la ansiedad evaluativa y aumentar la disposición a preguntar, un comportamiento especialmente relevante para el perfil de estudiante de primer ingreso con baja autoeficacia que el proyecto de HCI caracterizó (la *user persona* "Daniela López", que casi no pregunta en público por temor a equivocarse). Esta variación de la persona del agente queda planteada como una dimensión de diseño a explorar, no como una predicción derivada del Efecto Proteus.

### Síntesis y anclaje pedagógico

Las tres teorías convergen en un principio de diseño: el *embodiment* del agente debe operar como un andamio afectivo y comunicativo que sostenga a la persona estudiante dentro de su Zona de Desarrollo Próximo (Vygotsky, 1978; Wood et al., 1976), sin sustituir el esfuerzo cognitivo que el andamiaje socrático devuelve deliberadamente. El experimento mide simultáneamente el beneficio esperado (usabilidad y afecto) y el riesgo asociado (carga cognitiva), de modo que la decisión de incorporar *embodiment* al agente de la tesis se tome sobre evidencia y no sobre supuestos.

> **Conexión con la tesis (OE2 y OE3).** Si la Condición A resulta superior en usabilidad y afecto sin penalizar la carga cognitiva, el *embodiment* pasa a ser un requisito funcional del agente (OE2) y una decisión de arquitectura fundamentada (OE3). Si penaliza la carga, la evidencia respalda mantener el agente textual y reservar recursos para la calibración del andamiaje.

---

## Referencias (APA 7)

Bartneck, C., Kulić, D., Croft, E., & Zoghbi, S. (2009). Measurement instruments for the anthropomorphism, animacy, likeability, perceived intelligence, and safety of robots. *International Journal of Social Robotics, 1*(1), 71–81. https://doi.org/10.1007/s12369-008-0001-3

Bickmore, T. W., & Picard, R. W. (2005). Establishing and maintaining long-term human-computer relationships. *ACM Transactions on Computer-Human Interaction, 12*(2), 293–327. https://doi.org/10.1145/1067860.1067867

Brooke, J. (1996). SUS: A "quick and dirty" usability scale. En P. W. Jordan, B. Thomas, B. A. Weerdmeester, & I. L. McClelland (Eds.), *Usability evaluation in industry* (pp. 189–194). Taylor & Francis.

Cassell, J., Sullivan, J., Prevost, S., & Churchill, E. (Eds.). (2000). *Embodied conversational agents*. MIT Press.

Davis, R. O., Park, T., & Vincent, J. (2023). A meta-analytic review on embodied pedagogical agent design and testing formats. *Journal of Educational Computing Research, 61*(1), 30–34. https://doi.org/10.1177/07356331221100556

Hart, S. G., & Staveland, L. E. (1988). Development of NASA-TLX (Task Load Index): Results of empirical and theoretical research. En P. A. Hancock & N. Meshkati (Eds.), *Human mental workload* (pp. 139–183). North-Holland. https://doi.org/10.1016/S0166-4115(08)62386-9

Krämer, N. C., & Bente, G. (2010). Personalizing e-learning. The social effects of pedagogical agents. *Educational Psychology Review, 22*(1), 71–87. https://doi.org/10.1007/s10648-010-9123-x

Mayer, R. E. (2014). Principles based on social cues in multimedia learning: Personalization, voice, image, and embodiment principles. En R. E. Mayer (Ed.), *The Cambridge handbook of multimedia learning* (2.ª ed., pp. 345–368). Cambridge University Press.

Minge, M., & Thüring, M. (2018). The meCUE questionnaire: A modular tool for measuring user experience. *[Verificar cita y edición exacta antes de la entrega final]*.

Schroeder, N. L., Davis, R. O., & Yang, E. (2025). Designing and learning with pedagogical agents: An umbrella review. *Journal of Educational Computing Research*. https://doi.org/10.1177/07356331241288476

Solís Ramírez, H., Murillo, M. I., Díaz-Oreiro, I., Ramírez-Benavides, K., Quesada, L., Brenes, J. A., & López, G. (2025). Patterns of artificial intelligence use among university students: An exploratory study at the University of Costa Rica. *IEEE* (Proyecto ECCI/CITIC 834-C5-207).

Thompson, E. R. (2007). Development and validation of an internationally reliable short-form of the Positive and Negative Affect Schedule (PANAS). *Journal of Cross-Cultural Psychology, 38*(2), 227–242. https://doi.org/10.1177/0022022106297301

Vygotsky, L. S. (1978). *Mind in society: The development of higher psychological processes*. Harvard University Press.

Wing, J. M. (2006). Computational thinking. *Communications of the ACM, 49*(3), 33–35. https://doi.org/10.1145/1118178.1118215

Wood, D., Bruner, J. S., & Ross, G. (1976). The role of tutoring in problem solving. *Journal of Child Psychology and Psychiatry, 17*(2), 89–100. https://doi.org/10.1111/j.1469-7610.1976.tb00381.x

Wu, Z., Tang, Y., & Ericson, B. J. (2025). Learner and instructor needs in AI-supported programming learning tools: Design implications for features and adaptive control. En *Artificial Intelligence in Education (AIED 2025)* (pp. 146–161). Springer. https://doi.org/10.1007/978-3-031-98420-4_11

Yee, N., & Bailenson, J. (2007). The Proteus effect: The effect of transformed self-representation on behavior. *Human Communication Research, 33*(3), 271–290. https://doi.org/10.1111/j.1468-2958.2007.00299.x
