# 🖥️ Comandos para Manejar el Servidor

## 🚀 Iniciar el Servidor

### Opción 1: En primer plano (RECOMENDADO para desarrollo)
```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
npm run dev
```
**Ventajas:**
- ✅ Ves los logs en tiempo real
- ✅ Se detiene con `Ctrl+C`
- ✅ Se cierra automáticamente al cerrar la terminal

### Opción 2: En background (servidor persistente)
```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
npm run dev > /dev/null 2>&1 &
```
**Ventajas:**
- ✅ Sigue corriendo aunque cierres la terminal
- ✅ No ocupa la terminal
- ⚠️ Debes detenerlo manualmente

### Opción 3: Con logs guardados
```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
npm run dev > dev.log 2>&1 &
# Para ver los logs:
tail -f dev.log
```

---

## 🛑 Detener el Servidor

### Método 1: Si está en primer plano
```bash
# Presiona: Ctrl + C
```

### Método 2: Si está en background
```bash
# Detener TODOS los procesos de Next.js
pkill -f "next dev"

# O detener por puerto específico
lsof -ti:3000 | xargs kill -9
```

### Método 3: Detener por PID específico
```bash
# 1. Ver procesos corriendo
ps aux | grep "next dev"

# 2. Anotar el PID (primer número después de tu usuario)
# Ejemplo: gerryp 12345 ...

# 3. Matar ese proceso específico
kill 12345

# O forzar si no responde:
kill -9 12345
```

---

## 🔍 Ver Estado del Servidor

### Ver si está corriendo
```bash
# Ver procesos de Next.js
ps aux | grep "next dev" | grep -v grep

# Ver qué está usando el puerto 3000
lsof -i:3000

# Verificar desde el navegador
curl -I http://localhost:3000
```

### Ver logs en tiempo real
```bash
# Si guardaste logs:
tail -f dev.log

# Ver últimas 50 líneas:
tail -n 50 dev.log
```

---

## 🔄 Reiniciar el Servidor

### Método rápido (recomendado)
```bash
# Detener
pkill -f "next dev"

# Esperar 2 segundos
sleep 2

# Iniciar de nuevo
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
npm run dev
```

### Con script (crear archivo `restart.sh`)
```bash
#!/bin/bash
echo "🛑 Deteniendo servidor..."
pkill -f "next dev"
sleep 2
echo "🗑️  Limpiando caché..."
rm -rf .next
echo "🚀 Iniciando servidor..."
npm run dev
```

Uso:
```bash
chmod +x restart.sh
./restart.sh
```

---

## 🧹 Limpiar y Reiniciar (cuando hay problemas)

```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend

# 1. Detener servidor
pkill -f "next dev"

# 2. Limpiar todo
rm -rf .next node_modules

# 3. Reinstalar dependencias
npm install --legacy-peer-deps

# 4. Iniciar limpio
npm run dev
```

---

## 📊 Comandos de Monitoreo

### Ver uso de recursos
```bash
# CPU y memoria del proceso Next.js
ps aux | grep "next dev" | awk '{print "CPU: "$3"% | RAM: "$4"%"}'

# Ver todos los puertos en uso
lsof -i -P -n | grep LISTEN
```

### Ver errores recientes
```bash
# Si estás usando logs:
tail -n 100 dev.log | grep -i error
```

---

## 🎯 Troubleshooting Común

### Problema: Puerto 3000 ya en uso

**Solución 1: Detener proceso en el puerto**
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Solución 2: Usar otro puerto**
```bash
# En package.json, cambiar:
"dev": "next dev -p 3001"

# O ejecutar directamente:
next dev -p 3001
```

### Problema: "EADDRINUSE" error

```bash
# Matar TODO en el puerto 3000
sudo lsof -ti:3000 | xargs kill -9

# Reiniciar
npm run dev
```

### Problema: Cambios no se reflejan

```bash
# Limpiar caché y reiniciar
pkill -f "next dev"
rm -rf .next
npm run dev
```

### Problema: "Cannot find module" errors

```bash
# Reinstalar dependencias
pkill -f "next dev"
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

---

## 💡 Tips Pro

### 1. Usar tmux para sesiones persistentes
```bash
# Instalar tmux (si no lo tienes)
brew install tmux

# Crear sesión
tmux new -s utonoma

# Iniciar servidor
npm run dev

# Desconectar (servidor sigue corriendo): Ctrl+B luego D
# Reconectar después:
tmux attach -t utonoma
```

### 2. Alias útiles (agregar a ~/.zshrc o ~/.bashrc)
```bash
# Aliases para UTONOMA
alias utonoma-start='cd ~/Starknet-Hackathon/utonoma-frontend && npm run dev'
alias utonoma-stop='pkill -f "next dev"'
alias utonoma-restart='pkill -f "next dev" && sleep 2 && cd ~/Starknet-Hackathon/utonoma-frontend && npm run dev'
alias utonoma-clean='cd ~/Starknet-Hackathon/utonoma-frontend && pkill -f "next dev" && rm -rf .next && npm run dev'

# Aplicar cambios:
source ~/.zshrc
```

### 3. Crear scripts npm personalizados

En `package.json`, agregar:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "dev:bg": "next dev --turbopack > /dev/null 2>&1 &",
    "stop": "pkill -f 'next dev'",
    "restart": "pkill -f 'next dev' && sleep 2 && npm run dev",
    "clean": "rm -rf .next && npm run dev"
  }
}
```

Uso:
```bash
npm run dev:bg    # Iniciar en background
npm run stop      # Detener
npm run restart   # Reiniciar
npm run clean     # Limpiar y reiniciar
```

---

## 📱 Acceso desde otros dispositivos

### En tu red local
```bash
# Obtener tu IP local
ifconfig | grep "inet " | grep -v 127.0.0.1

# Ejemplo de salida: 192.168.1.100
# Accede desde otro dispositivo: http://192.168.1.100:3000
```

### Configurar Next.js para permitir acceso externo
```bash
# Iniciar con:
next dev -H 0.0.0.0
```

---

## 🔐 Seguridad

### NO ejecutar en producción con `npm run dev`

Para producción:
```bash
# Build
npm run build

# Iniciar producción
npm start

# O con PM2 (recomendado)
npm install -g pm2
pm2 start npm --name "utonoma" -- start
pm2 logs utonoma
pm2 stop utonoma
```

---

## 📝 Resumen de Comandos Más Usados

| Acción | Comando |
|--------|---------|
| Iniciar servidor | `npm run dev` |
| Detener servidor | `Ctrl+C` o `pkill -f "next dev"` |
| Ver si está corriendo | `lsof -i:3000` |
| Limpiar caché | `rm -rf .next` |
| Reiniciar limpio | `pkill -f "next dev" && rm -rf .next && npm run dev` |
| Ver logs | `tail -f dev.log` |
| Puerto alternativo | `next dev -p 3001` |

---

## 🆘 Ayuda Rápida

```bash
# ¿Está corriendo el servidor?
lsof -i:3000

# ¿Qué proceso es?
ps aux | grep "next dev"

# Detener TODO en puerto 3000
lsof -ti:3000 | xargs kill -9

# Reinicio completo
pkill -f "next dev" && \
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend && \
rm -rf .next && \
npm run dev
```

---

**Última actualización:** 15 de Octubre, 2025  
**Proyecto:** UTONOMA Frontend

