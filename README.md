# 🚀 UTONOMA - Plataforma de Videos Descentralizada

**Powered by Versy Token**

Plataforma revolucionaria de compartición de videos descentralizada donde los creadores son recompensados directamente por su engagement a través del token VERSY.

---

## 🎬 Proyecto Principal: UTONOMA (Versy Platform)

Plataforma de videos descentralizada con recompensas en tokens por engagement social.

**Características:**
- 🎥 Videos almacenados en IPFS (Pinata)
- 💎 Token VERSY (ERC20) - 1 Billion supply
- 👍 Sistema de likes con recompensas (67% creador / 33% plataforma)
- 🎁 Welcome bonus: 150 VERSY para nuevos usuarios
- 📊 Feed inteligente de videos
- 🔐 Integración con wallets embebidas (ChipiPay)

**Tokenomics:**
- Total Supply: 1,000,000,000 VERSY
- Early Adopters: 100M (10%)
- Rewards Pool: 300M (30%)
- Treasury: 200M (20%)
- Ver roadmap completo: [VERSY_TOKENOMICS.md](./VERSY_TOKENOMICS.md)

**Documentación:**
- [README Principal](./versy_platform/README.md)
- [Tokenomics Completo](./VERSY_TOKENOMICS.md)

**Uso rápido:**
```bash
cd versy_platform

# Compilar
scarb build

# Ejecutar tests
scarb test

# Upload un video
./scripts/interact.sh <PLATFORM_ADDRESS> upload_video <IPFS_HASH> <TITLE>

# Dar like a un video
./scripts/interact.sh <PLATFORM_ADDRESS> like_video <VIDEO_ID>
```

---

## 📦 Proyecto Secundario

### Marketplace Escrow 🛒

Sistema de escrow seguro para marketplace descentralizado en Starknet.

**Características:**
- ✅ Escrow con protección buyer/seller
- ✅ Sistema de órdenes completo
- ✅ Resolución de disputas
- ✅ Comisiones de plataforma configurables
- ✅ Matemática segura con u256
- ✅ 7 tests pasando (100%)
- ✅ **Desplegado en Sepolia** 🎉

**Contrato Desplegado:**
- **Address**: `0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a`
- **Network**: Starknet Sepolia
- **Explorer**: [Ver en Starkscan](https://sepolia.starkscan.co/contract/0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a)

**Documentación:**
- [README Principal](./marketplace_escrow/README.md)
- [Guía de Despliegue Completa](./marketplace_escrow/DEPLOYMENT.md)

**Uso rápido:**
```bash
cd marketplace_escrow

# Compilar
scarb build

# Ejecutar tests
scarb test

# Interactuar con el contrato desplegado
./scripts/interact.sh <CONTRACT_ADDRESS> <COMANDO> [ARGS]

# Ejemplo: Crear una orden
./scripts/interact.sh \
    0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a \
    create_order \
    <SELLER_ADDRESS> \
    1000
```

## 🛠️ Stack Tecnológico

### Blockchain & Smart Contracts
- **Cairo 2.11.4** - Lenguaje de smart contracts
- **Starknet** - Layer 2 de Ethereum (escalabilidad)
- **Scarb 2.11.4** - Build tool y package manager
- **Starknet Foundry 0.44.0** - Testing framework
- **OpenZeppelin v0.20.0** - Librerías de seguridad (ERC20, Ownable)

### Storage & Frontend
- **IPFS/Pinata** - Almacenamiento descentralizado de videos
- **ChipiPay** - Wallets embebidas (integración próxima)
- **React/Next.js** - Frontend (próximamente)
- **starknet.js** - Interacción con contratos

## 🚀 Inicio Rápido con UTONOMA

### Prerequisitos

```bash
# Instalar Scarb (Cairo build tool)
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Instalar Starknet Foundry (testing framework)
curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh

# Verificar instalación
scarb --version  # Debe mostrar: scarb 2.11.4 o superior
sncast --version # Debe mostrar: sncast 0.44.0 o superior
```

### Clonar y Configurar Proyecto

```bash
# Clonar repositorio
git clone https://github.com/MarxMad/Starknet.git
cd Starknet

# Ir al proyecto UTONOMA
cd versy_platform

# Compilar contratos
scarb build

# Ejecutar tests (próximamente)
scarb test
```

### Despliegue Rápido

```bash
# 1. Desplegar VersyToken (ERC20)
./scripts/deploy_token.sh <OWNER_ADDRESS>
# Guarda el TOKEN_ADDRESS que aparece

# 2. Desplegar UTONOMA Platform
./scripts/deploy_platform.sh <OWNER_ADDRESS> <TOKEN_ADDRESS>
# Guarda el PLATFORM_ADDRESS

# 3. Transferir tokens a la plataforma para welcome bonuses
# (usar starknet.js o sncast para transferir ~100M VERSY)
```

## 📚 Documentación Completa

### UTONOMA (Proyecto Principal)
- **[📖 README de UTONOMA](./versy_platform/README.md)** - Guía completa de la plataforma
- **[💎 Tokenomics VERSY](./VERSY_TOKENOMICS.md)** - Distribución completa de 1B tokens
- **[🚀 Scripts de Despliegue](./versy_platform/scripts/)** - Scripts automatizados

### Marketplace Escrow (Proyecto Secundario)
- **[📖 README de Escrow](./marketplace_escrow/README.md)** - Guía completa del contrato
- **[🚀 Guía de Despliegue](./marketplace_escrow/DEPLOYMENT.md)** - Paso a paso Sepolia
- **[⚡ Quick Reference](./marketplace_escrow/QUICK_REFERENCE.md)** - Comandos rápidos

## 🎯 Visión de UTONOMA

> **"Reimaginando la monetización de contenido en Web3"**

UTONOMA permite que los creadores sean recompensados directamente por su audiencia, sin intermediarios, de manera transparente y justa a través de la blockchain.

### ¿Por qué UTONOMA?

- **🎥 Descentralización Total** - Videos en IPFS, metadata on-chain
- **💰 Monetización Directa** - 67% de cada like va al creador
- **🚀 Sin Censura** - Nadie puede borrar tu contenido
- **🌍 Global desde Día 1** - Accesible desde cualquier lugar
- **💎 Token VERSY** - Economía sostenible y transparente
- **🎁 Welcome Bonus** - 150 VERSY gratis para empezar

### Casos de Uso

#### Para Creadores de Contenido
- **YouTubers** migrando a Web3
- **TikTokers** buscando monetización justa
- **Educadores** compartiendo cursos
- **Artistas** mostrando su trabajo
- **Desarrolladores** con tutoriales

#### Para la Comunidad
- **Early Adopters** ganan tokens por participar
- **Curadores** descubren contenido viral
- **Fans** apoyan directamente a creadores
- **Inversores** en el ecosistema VERSY

## 🔗 Enlaces Útiles

- **Starknet Docs**: https://docs.starknet.io/
- **Cairo Book**: https://book.cairo-lang.org/
- **Starknet Foundry**: https://foundry-rs.github.io/starknet-foundry/
- **OpenZeppelin Cairo**: https://docs.openzeppelin.com/contracts-cairo/
- **Sepolia Explorer**: https://sepolia.starkscan.co/
- **Faucet**: https://blastapi.io/faucets/starknet-sepolia-eth

## 🤝 Contribuir

Este es un proyecto de hackathon. Las contribuciones son bienvenidas.

## 🌟 Roadmap UTONOMA

### Q1 2025 - MVP ✅
- ✅ Smart contracts VersyToken y Platform
- ✅ Sistema de likes y recompensas
- ✅ Welcome bonus para usuarios
- ✅ Tokenomics completo diseñado

### Q2 2025 - Lanzamiento Beta
- 🔄 Frontend web responsive
- 🔄 Integración Pinata IPFS
- 🔄 Wallets embebidas (ChipiPay)
- 🔄 Despliegue en Sepolia testnet

### Q3 2025 - Growth
- ⏳ Mobile app (iOS/Android)
- ⏳ Sistema de comentarios
- ⏳ Shares y retweets
- ⏳ Trending algorithm
- ⏳ Creator analytics

### Q4 2025 - Scale
- ⏳ Mainnet launch
- ⏳ NFTs de videos virales
- ⏳ Staking de VERSY
- ⏳ DAO Governance
- ⏳ Live streaming

### 2026+ - Expansión
- ⏳ Multi-chain support
- ⏳ Versy Studio (edición de videos)
- ⏳ Premium features con VERSY
- ⏳ Metaverse integration
- ⏳ Creator DAOs

---

## 🤝 Contribuir

¡UTONOMA es un proyecto open-source! Las contribuciones son bienvenidas.

### Áreas donde puedes contribuir:
- 💻 **Frontend Development** - React/Next.js
- 🎨 **UI/UX Design** - Diseño de la plataforma
- 🔐 **Smart Contract Auditing** - Seguridad
- 📝 **Documentación** - Tutoriales y guías
- 🌐 **Traducción** - Multi-idioma
- 🧪 **Testing** - Unit tests y QA

---

## 📝 Licencia

Desarrollado para el **Starknet Hackathon 2025**.

---

## 👨‍💻 Equipo UTONOMA

- **Founder & Lead Developer**: [@MarxMad](https://github.com/MarxMad)
- **Proyecto**: [UTONOMA - Starknet Hackathon](https://github.com/MarxMad/Starknet)

### Conéctate con Nosotros
- 🐦 Twitter: @UtonomaPlatform (próximamente)
- 💬 Discord: UTONOMA Community (próximamente)
- 📧 Email: team@utonoma.xyz (próximamente)

---

## 🎬 Únete a la Revolución

**UTONOMA está cambiando la forma en que los creadores monetizan su contenido.**

✨ **Sin intermediarios**  
✨ **Sin censura**  
✨ **Sin comisiones abusivas**  

Solo creadores, audiencia y tecnología blockchain trabajando juntos.

---

⭐ **Si crees en el futuro del contenido descentralizado, dale una estrella en GitHub!**

🚀 **¡Únete a UTONOMA y sé parte de la revolución Web3!**


