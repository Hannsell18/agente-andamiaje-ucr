# Frontend — Aplicación Web del Agente

Aplicación web cliente que integra el avatar 3D, la interfaz conversacional y el editor de código embebido.

## Stack planeado

- **Framework:** React 18 + TypeScript + Next.js 14
- **Renderizado 3D:** Three.js
- **Avatar:** Ready Player Me (modelos 3D estilizados)
- **Sincronización labial:** Oculus LipSync / Rhubarb Lip-Sync
- **Editor de código:** Monaco Editor
- **Estilos:** Tailwind CSS
- **Estado:** Zustand o Context API
- **Deployment:** Vercel

## Estructura prevista

```
frontend/
├── app/                # Rutas Next.js (App Router)
├── components/
│   ├── Avatar/         # Componente 3D del avatar
│   ├── Chat/           # UI conversacional
│   ├── CodeEditor/     # Monaco Editor
│   └── Voice/          # Captura y reproducción de voz
├── lib/                # Utilidades y cliente API
├── hooks/              # Custom React hooks
└── public/             # Assets estáticos (modelos 3D, iconos)
```

## Estado

⏳ Pendiente — implementación a partir del Entregable 3.
