# 🚀 UTONOMA Frontend - Quick Start

## ✅ Lo que Ya Está Implementado

### 1. Video Upload Mejorado ✨
- **Drag & Drop** - Arrastra videos para subir
- **Pinata IPFS** - Almacenamiento descentralizado
- **Animaciones** - UI moderna con framer-motion
- **Validaciones** - Tipo y tamaño de archivo
- **Progress Bar** - Barra de progreso en tiempo real

### 2. Smart Contracts Connected
- VersyToken (ERC20)
- UTONOMA Platform
- Sistema de likes + recompensas
- Welcome bonus (150 VERSY)

---

## 🎬 Para Usar Ahora Mismo

### 1. Instalar dependencias (si aún no lo hiciste)
```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
npm install --legacy-peer-deps
```

### 2. Configurar Pinata (OPCIONAL para testing)
```bash
# Editar .env.local
nano .env.local

# Agregar tus keys (o dejar como está para usar mock):
NEXT_PUBLIC_PINATA_API_KEY=tu_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=tu_secret_key
```

**📝 Nota:** Sin keys de Pinata, usará un hash simulado (perfecto para testing)

### 3. Iniciar servidor
```bash
npm run dev
```

### 4. Abrir en navegador
```
http://localhost:3000
```

### 5. Conectar wallet y probar
1. Click en "Connect Wallet"
2. Conecta Argent X o Braavos (Sepolia)
3. Reclama 150 VERSY de bienvenida
4. Ve a tab "Upload"
5. Arrastra un video
6. Ponle título y descripción
7. Click en "Publicar Video"
8. ¡Listo! 🎉

---

## 📚 Documentación Completa

- **SETUP_GUIDE.md** - Guía completa de configuración
- **PINATA_SETUP.md** - Cómo configurar Pinata
- **SERVER_COMMANDS.md** - Comandos del servidor
- **FRONTEND_STATUS.md** - Estado actual y próximos pasos

---

## 🎯 Próximo Paso: Feed Estilo TikTok

El feed estilo TikTok está **pendiente de implementación**. 

Características que tendrá:
- Video a pantalla completa
- Navegación vertical (scroll/swipe)
- Autoplay
- Botones de interacción (like, comentar, compartir)
- Info del creador overlay

---

## ❓ ¿Necesitas Ayuda?

1. **Error al cargar:** `pkill -f "next dev" && rm -rf .next && npm run dev`
2. **Wallet no conecta:** Verifica que estés en Sepolia testnet
3. **Upload falla:** Revisa la consola del navegador (F12)
4. **Videos no cargan:** Los contratos están en Sepolia, asegúrate de estar conectado

---

**¡Todo listo para desarrollar! 🚀**

