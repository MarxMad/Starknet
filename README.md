# 🚀 UTONOMA - Plataforma de Videos Descentralizada en Starknet

**La revolución del contenido descentralizado con recompensas en tokens VERSY**

![Starknet](https://img.shields.io/badge/Starknet-Sepolia-blueviolet)
![Cairo](https://img.shields.io/badge/Cairo-1.0-orange)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![License](https://img.shields.io/badge/License-Hackathon_2025-green)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Contratos Desplegados](#-contratos-desplegados)
- [Características](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Inicio Rápido](#-inicio-rápido)
- [Arquitectura](#-arquitectura-del-proyecto)
- [Documentación](#-documentación-completa)
- [Roadmap](#-roadmap-utonoma)
- [Contribuir](#-contribuir)

---

## 📖 Descripción

**UTONOMA** es una plataforma de videos descentralizada construida en Starknet donde los usuarios pueden:

- 📹 **Subir videos** a IPFS con metadata on-chain
- ❤️ **Dar likes** y ganar recompensas en tokens VERSY
- 🎁 **Recibir 150 VERSY** de bienvenida al unirse
- 💰 **Monetizar contenido** con un sistema de recompensas transparente
- 🔐 **Control total** sobre su contenido gracias a la blockchain

---

## 🎯 Contratos Desplegados en Sepolia

### VersyToken (ERC20) 💎
- **Address:** `0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a`
- **Class Hash:** `0x024532c30df18fd1b2e08934eae014a2981a1704e27bd4f94d1e27ae3b4fb853`
- **Total Supply:** 1,000,000,000 VERSY
- 🔗 [Ver en Starkscan](https://sepolia.starkscan.co/contract/0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a)

### UTONOMA Platform 🎬
- **Address:** `0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f`
- **Class Hash:** `0x065e881a42cbc3ee8f6e215e1ed13fb6e698aa56351e2b22e7053c97fa83d764`
- **Token:** VersyToken (arriba)
- 🔗 [Ver en Starkscan](https://sepolia.starkscan.co/contract/0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f)

**Owner/Deployer:** `0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1`

---

## ✨ Características Principales

### Para Usuarios

- 🎁 **Welcome Bonus:** 150 VERSY al unirte
- ❤️ **Sistema de Likes:** Cada like vale 10 VERSY
  - Creador recibe: 6.7 VERSY (67%)
  - Plataforma: 3.3 VERSY (33%)
- 📹 **Upload de Videos:** Sube videos a IPFS con metadata on-chain
- 👀 **Feed Infinito:** Descubre contenido de toda la comunidad
- 💰 **Balance en Tiempo Real:** Ve tus VERSY tokens actualizados

### Para Creadores

- 💵 **Monetización Directa:** Gana VERSY por cada like
- 📊 **Transparencia Total:** Todas las transacciones on-chain
- 🔐 **Sin Intermediarios:** Tu contenido, tus ganancias
- 📈 **Analytics:** Ve estadísticas de tus videos

### Para la Plataforma

- 🏦 **Treasury:** 33% de cada like va al treasury
- 🤝 **Colaboraciones:** Fondos para partnerships futuros
- 🎯 **Sustentabilidad:** Modelo económico sostenible

---

## 🛠️ Stack Tecnológico

### Blockchain
- **Starknet** - Layer 2 de Ethereum con validity rollups
- **Cairo 1.0** - Lenguaje de programación para smart contracts
- **OpenZeppelin Contracts** - Estándares ERC20 y Ownable

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Starknet React** - Hooks para Starknet
- **starknet.js** - SDK de Starknet

### Storage
- **IPFS/Pinata** - Almacenamiento descentralizado de videos
- **On-chain Metadata** - Título, likes, timestamp

### Wallets
- **Argent X** - Wallet de Starknet
- **Braavos** - Wallet de Starknet alternativa
- **ChipiPay** (próximamente) - Wallets embebidas

---

## 🚀 Inicio Rápido con UTONOMA

### Prerrequisitos

```bash
# Node.js 20+
node --version

# npm o yarn
npm --version

# Una wallet de Starknet (Argent X o Braavos)
# https://www.argent.xyz/argent-x/
# https://braavos.app/
```

### Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/MarxMad/Starknet-Hackathon.git
cd Starknet-Hackathon

# 2. Ir al frontend
cd utonoma-frontend

# 3. Instalar dependencias
npm install --legacy-peer-deps

# 4. Ejecutar en desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:3000
```

### Primeros Pasos

1. **Conecta tu Wallet**
   - Click en "Connect Wallet"
   - Selecciona Argent X o Braavos
   - Autoriza la conexión

2. **Reclama tu Welcome Bonus**
   - Verás un banner de bienvenida
   - Click en "Claim 150 VERSY"
   - Confirma la transacción

3. **Explora el Feed**
   - Ve videos de otros usuarios
   - Da likes para recompensar creadores

4. **Sube tu Primer Video**
   - Click en tab "Upload"
   - Ingresa título y selecciona archivo
   - Confirma transacción

---

## 🏗️ Arquitectura del Proyecto

```
Starknet-Hackathon/
├── versy_platform/              # Smart Contracts Cairo
│   ├── src/
│   │   ├── lib.cairo           # Entry point
│   │   ├── versy_token.cairo   # Token ERC20
│   │   └── versy_platform.cairo # Lógica de plataforma
│   ├── scripts/
│   │   ├── deploy_token.sh
│   │   └── deploy_platform.sh
│   ├── README.md
│   └── DEPLOYMENT.md           # Info de despliegue
│
├── utonoma-frontend/            # Frontend Next.js
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página principal
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── VideoFeed.tsx
│   │   ├── VideoCard.tsx
│   │   ├── VideoUpload.tsx
│   │   └── WelcomeBonus.tsx
│   ├── lib/
│   │   ├── config.ts
│   │   └── providers.tsx
│   ├── abis/
│   │   ├── platform.json
│   │   └── token.json
│   ├── README.md
│   └── SETUP_GUIDE.md          # Guía completa
│
├── marketplace_escrow/          # Proyecto secundario
│   └── ...
│
├── VERSY_TOKENOMICS.md         # Distribución de tokens
├── WALLET_INFO.md              # Info de wallet deployer
└── README.md                   # Este archivo
```

---

## 📚 Documentación Completa

### Contratos Inteligentes
- [📖 UTONOMA Platform README](./versy_platform/README.md) - Documentación técnica de contratos
- [🚀 DEPLOYMENT.md](./versy_platform/DEPLOYMENT.md) - Guía de despliegue completa
- [💰 VERSY_TOKENOMICS.md](./VERSY_TOKENOMICS.md) - Distribución de 1B de tokens

### Frontend
- [📱 Frontend README](./utonoma-frontend/README.md) - Documentación del frontend
- [⚡ SETUP_GUIDE.md](./utonoma-frontend/SETUP_GUIDE.md) - Guía de configuración paso a paso

### Wallet
- [🔐 WALLET_INFO.md](./WALLET_INFO.md) - Información de wallet deployer (**PRIVADA**)

---

## 💰 Tokenomics VERSY

**Total Supply:** 1,000,000,000 VERSY (1 Billion)

| Categoría | Tokens | Porcentaje | Propósito |
|-----------|--------|------------|-----------|
| **Early Adopters** | 100M | 10% | Primeros usuarios |
| **Rewards Pool** | 300M | 30% | Recompensas por likes |
| **Treasury** | 200M | 20% | Desarrollo y colabs |
| **Team & Advisors** | 100M | 10% | Equipo fundador |
| **Marketing** | 150M | 15% | Growth y promoción |
| **Liquidity** | 100M | 10% | Liquidez DEX |
| **Reserve** | 50M | 5% | Fondo de emergencia |

**Distribución Inicial:**
- ✅ 1B VERSY minteados al owner
- ✅ Owner distribuye según tokenomics
- ✅ Welcome bonus: 150 VERSY/usuario

---

## 🎬 Casos de Uso

### 1. Creadores de Contenido
- Sube videos educativos y gana VERSY por cada like
- Sin intermediarios, pagos instantáneos
- Construye tu audiencia y monetiza desde el día 1

### 2. Estudiantes
- Comparte tutoriales y proyectos
- Gana VERSY mientras estudias
- Colabora con otros estudiantes

### 3. Empresas
- Publica contenido de marca
- Recompensa a tu comunidad
- Analytics transparentes

### 4. Comunidades
- Crea canales temáticos
- Incentiva participación con VERSY
- Governance descentralizada

---

## 🌟 Roadmap UTONOMA

### ✅ Fase 1: MVP (Completada)
- ✅ Smart contracts en Cairo
- ✅ Token VERSY ERC20
- ✅ Sistema de likes y recompensas
- ✅ Welcome bonus
- ✅ Frontend funcional
- ✅ Despliegue en Sepolia

### 🔄 Fase 2: Beta (En Progreso)
- 🔄 Integración completa con Pinata IPFS
- 🔄 ChipiPay embedded wallets
- 🔄 Sistema de comentarios
- 🔄 Página de perfil de usuario
- ⏳ Testing exhaustivo
- ⏳ Feedback de usuarios

### 📅 Fase 3: Launch (Q1 2025)
- ⏳ Auditoría de seguridad
- ⏳ Despliegue en mainnet
- ⏳ Sistema de trending
- ⏳ Analytics para creadores
- ⏳ Mobile app (React Native)
- ⏳ Notificaciones en tiempo real

### 🚀 Fase 4: Growth (Q2-Q3 2025)
- ⏳ NFTs para videos virales
- ⏳ Staking de VERSY
- ⏳ DAO Governance
- ⏳ Live streaming
- ⏳ Multi-chain support
- ⏳ Premium features

### 🌐 Fase 5: Ecosystem (Q4 2025+)
- ⏳ Versy Studio (editor de video)
- ⏳ Creator DAOs
- ⏳ Integración con Metaverse
- ⏳ API para developers
- ⏳ SDK para otras dApps
- ⏳ Enterprise solutions

---

## 🤝 Contribuir

¡Nos encantaría tu ayuda para mejorar UTONOMA!

### Cómo Contribuir

1. **Fork** el proyecto
2. **Crea** tu branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Áreas donde Puedes Ayudar

- 🐛 **Reportar bugs**
- 💡 **Sugerir features**
- 📝 **Mejorar documentación**
- 🎨 **Diseño UI/UX**
- 🔧 **Optimizaciones de código**
- 🧪 **Testing**

---

## 👨‍💻 Equipo UTONOMA

**Desarrollado por @MarxMad**

Para el **Starknet Hackathon 2025**

---

## 📄 Licencia

Este proyecto fue desarrollado para el Starknet Hackathon 2025.

---

## 🎬 Mensaje Final

> "UTONOMA no es solo una plataforma de videos.  
> Es el futuro del contenido descentralizado.  
> Donde creadores y usuarios tienen el control.  
> Donde cada like tiene valor real.  
> Donde la transparencia es la norma."  
> 
> **— Equipo UTONOMA**

---

## 📞 Contacto y Links

- 🌐 **Starkscan Platform:** https://sepolia.starkscan.co/contract/0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
- 💎 **Starkscan Token:** https://sepolia.starkscan.co/contract/0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a
- 📚 **Starknet Docs:** https://docs.starknet.io
- 💬 **Cairo Book:** https://book.cairo-lang.org

---

## ⭐ Call to Action

**¿Te gusta UTONOMA?**

1. ⭐ Dale una estrella al repo
2. 🐦 Comparte en redes sociales
3. 💬 Únete a la discusión
4. 🚀 Prueba la plataforma en Sepolia

---

<div align="center">

### 🎉 ¡Gracias por ser parte de la revolución descentralizada!

**UTONOMA está VIVA en Starknet Sepolia** 🚀

Made with ❤️ for the Starknet Community

</div>
