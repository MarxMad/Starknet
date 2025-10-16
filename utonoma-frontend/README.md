# 🎬 UTONOMA Frontend

Frontend de la plataforma de videos descentralizada UTONOMA, construida con Next.js 15, React 19, TypeScript, Tailwind CSS y Starknet.

## ✨ Características

- 🔐 **Autenticación con Starknet**: Conexión con Argent X y Braavos
- 📹 **Upload de Videos**: Sube videos a IPFS con metadata on-chain
- ❤️ **Sistema de Likes**: Recompensas en VERSY tokens por cada like
- 🎁 **Welcome Bonus**: 150 VERSY para nuevos usuarios
- 📊 **Feed de Videos**: Visualiza todos los videos de la plataforma
- 💰 **Balance en Tiempo Real**: Ve tu balance de VERSY tokens
- 🌙 **Modo Oscuro**: UI moderna y elegante

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 20+ (recomendado)
- npm o yarn
- Una wallet de Starknet (Argent X o Braavos)
- Fondos de testnet en Sepolia

### Instalación

1. **Clonar el repositorio** (si aún no lo has hecho):
```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
```

2. **Instalar dependencias**:
```bash
npm install --legacy-peer-deps
```

3. **Configurar variables de entorno**:
```bash
cp env.config.txt .env.local
```

Edita `.env.local` con tu configuración:
```env
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_RPC_URL=https://free-rpc.nethermind.io/sepolia-juno/v0_8
NEXT_PUBLIC_VERSY_TOKEN_ADDRESS=0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a
NEXT_PUBLIC_PLATFORM_ADDRESS=0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_here
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

4. **Ejecutar en desarrollo**:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
utonoma-frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal con providers
│   ├── page.tsx           # Página principal (Feed + Upload)
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── Header.tsx         # Header con conexión wallet
│   ├── VideoFeed.tsx      # Feed de videos
│   ├── VideoCard.tsx      # Card individual de video
│   ├── VideoUpload.tsx    # Formulario de upload
│   ├── WelcomeBonus.tsx   # Banner de bienvenida
│   └── ui/                # Componentes UI reutilizables
│       └── Button.tsx
├── lib/                   # Utilidades y configuración
│   ├── config.ts          # Configuración de contratos
│   └── providers.tsx      # Provider de Starknet
├── types/                 # TypeScript types
│   └── index.ts
├── abis/                  # ABIs de contratos
│   ├── platform.json
│   └── token.json
└── public/                # Assets estáticos
```

## 🔧 Tecnologías

- **Next.js 15**: Framework React con App Router
- **React 19**: Biblioteca UI
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utility-first
- **Starknet React**: Hooks para Starknet
- **starknet.js**: SDK de Starknet
- **Lucide React**: Iconos

## 🎮 Uso

### Conectar Wallet

1. Haz click en "Connect Wallet" en el header
2. Selecciona tu wallet (Argent X o Braavos)
3. Autoriza la conexión

### Reclamar Welcome Bonus

1. Después de conectar, verás un banner de bienvenida
2. Haz click en "Claim 150 VERSY"
3. Confirma la transacción en tu wallet
4. ¡Recibe 150 VERSY tokens!

### Subir un Video

1. Ve a la pestaña "Upload"
2. Ingresa el título del video
3. Selecciona el archivo de video (max 100MB)
4. Haz click en "Upload Video"
5. Espera a que se suba a IPFS y se registre en la blockchain

### Dar Like a un Video

1. En el feed, encuentra un video que te guste
2. Haz click en "Like (+10 VERSY)"
3. Confirma la transacción
4. El creador recibe 6.7 VERSY, la plataforma 3.3 VERSY

## 🔗 Contratos Desplegados

### Sepolia Testnet

- **VersyToken**: `0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a`
- **UTONOMA Platform**: `0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f`

Ver en [Starkscan Sepolia](https://sepolia.starkscan.co/)

## 🛠️ Scripts

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar producción
npm start

# Linting
npm run lint
```

## 🎨 Personalización

### Colores

Edita `app/globals.css` para cambiar los colores del tema:

```css
:root {
  --primary: 271.5 81.3% 55.9%;  /* Purple */
  --secondary: 210 40% 96.1%;    /* Light gray */
  /* ... más colores */
}
```

### Configuración de la App

Edita `lib/config.ts` para cambiar configuraciones:

```typescript
export const APP_CONFIG = {
  name: "UTONOMA",
  welcomeBonus: 150,
  likeReward: 10,
  // ...
};
```

## 📝 Próximas Características

- [ ] Integración completa con Pinata IPFS
- [ ] Perfil de usuario con videos subidos
- [ ] Búsqueda y filtros de videos
- [ ] Sistema de comentarios
- [ ] Trending videos
- [ ] Notificaciones en tiempo real
- [ ] Mobile app (React Native)
- [ ] Modo claro/oscuro toggle
- [ ] Estadísticas de creador

## 🐛 Troubleshooting

### Error: "Cannot connect to wallet"
- Asegúrate de tener Argent X o Braavos instalado
- Verifica que estés en Sepolia testnet
- Recarga la página

### Error: "Transaction failed"
- Verifica que tengas suficiente ETH para gas
- Confirma que tienes VERSY tokens (si es necesario)
- Intenta de nuevo en unos segundos

### Videos no cargan
- Verifica la conexión a internet
- Comprueba que los contratos estén desplegados
- Abre la consola del navegador para más detalles

## 📚 Documentación

- [Next.js Docs](https://nextjs.org/docs)
- [Starknet React](https://starknet-react.com/)
- [starknet.js](https://www.starknetjs.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Desarrollado para el **Starknet Hackathon 2025**

## 👨‍💻 Equipo

Desarrollado por **@MarxMad**

---

## 🎬 ¡Disfruta de UTONOMA!

**La revolución del contenido descentralizado en Starknet** 🚀
