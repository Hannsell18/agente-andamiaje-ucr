$env:FORCE_MODE     = "libre"
$env:PORT           = "4001"
$env:GEMINI_MODEL   = "gemini-2.5-flash"
# $env:GEMINI_API_KEY = "TU_API_KEY_AQUI"   # o ponela en el entorno antes de correr esto
node server.js
