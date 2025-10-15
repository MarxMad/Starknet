# 📹 VERSY - Decentralized Video Sharing Platform

Sistema de videos descentralizado con recompensas en tokens VERSY por engagement social.

## 🎯 Visión

Versy es una plataforma de compartición de videos donde los creadores son recompensados directamente por el engagement de su contenido a través de un sistema de likes que distribuye tokens VERSY.

### Características Principales

- 🎥 **Subida de Videos** - Almacenamiento descentralizado en IPFS
- 💎 **Token VERSY (ERC20)** - Supply fijo de 1,000,000,000 tokens
- 👍 **Sistema de Likes** - Recompensas automáticas por engagement
- 💰 **Distribución de Rewards** - 67% creador / 33% plataforma
- 🎁 **Welcome Bonus** - 150 VERSY para nuevos usuarios
- 🔐 **Wallet Embed**idas** - Integración con ChipiPay
- 📊 **Feed Inteligente** - Todos los videos ordenados por relevancia

---

## 📊 Arquitectura del Sistema

### Contratos Inteligentes

1. **VersyToken (ERC20)**
   - Token nativo de la plataforma
   - Supply total: 1 Billion VERSY
   - Funciones: mint (solo owner), burn, transfer, approve

2. **VersyPlatform**
   - Gestión de videos (upload, metadata)
   - Sistema de likes con recompensas
   - Distribución automatizada de tokens
   - Treasury para colaboraciones futuras

### Flujo de Datos

```
Usuario → Upload Video → IPFS Storage → Blockchain Transaction
                                              ↓
                                    Metadata On-Chain
                                              ↓
                              (video_id, ipfs_hash, title,
                               creator, likes_count, timestamp)

Usuario → Like Video → Paga 10 VERSY → Distribución:
                                          ├─ 6.7 VERSY → Creador (67%)
                                          └─ 3.3 VERSY → Treasury (33%)
```

---

## 💎 Tokenomics - VERSY

### Supply Total: 1,000,000,000 VERSY

| Asignación | Cantidad | % | Propósito |
|------------|----------|---|-----------|
| Early Adopters | 100M | 10% | Welcome bonuses + rewards iniciales |
| Rewards Pool | 300M | 30% | Sistema de likes y engagement |
| Platform Treasury | 200M | 20% | Colaboraciones y desarrollo |
| Team & Advisors | 100M | 10% | Equipo (vesting 2 años) |
| Marketing & Growth | 150M | 15% | Marketing, airdrops, partnerships |
| Liquidity Pool | 100M | 10% | DEX liquidity |
| Reserve | 50M | 5% | Fondo de emergencia |

**Ver detalles completos:** [VERSY_TOKENOMICS.md](../VERSY_TOKENOMICS.md)

---

## 🎮 Funcionalidades

### Para Usuarios

#### 1. Registro y Onboarding
```cairo
// Al registrarse por primera vez
fn claim_welcome_bonus()
// Recibe: 150 VERSY gratis
```

#### 2. Subir Videos
```cairo
fn upload_video(ipfs_hash: felt252, title: felt252) -> u256
// Parámetros:
// - ipfs_hash: Hash del video en IPFS
// - title: Título del video
// Retorna: video_id
```

#### 3. Dar Likes
```cairo
fn like_video(video_id: u256)
// Costo: 10 VERSY
// Distribución:
// - Creador recibe: 6.7 VERSY (67%)
// - Treasury recibe: 3.3 VERSY (33%)
// Restricción: Solo 1 like por usuario por video
```

#### 4. Ver Videos
```cairo
// Feed principal - Todos los videos
fn get_all_videos() -> Array<u256>

// Perfil de usuario - Videos por creador
fn get_videos_by_user(user: ContractAddress) -> Array<u256>

// Detalles de video específico
fn get_video(video_id: u256) -> Video
```

### Para Administradores (Owner)

```cairo
// Retirar fondos del treasury para colaboraciones
fn withdraw_treasury(amount: u256)

// Actualizar cantidad de recompensa por like
fn update_like_reward(new_amount: u256)

// Mintear tokens adicionales si es necesario
fn mint(recipient: ContractAddress, amount: u256)
```

---

## 📋 Estructura de Datos

### Video
```cairo
struct Video {
    video_id: u256,           // ID único
    creator: ContractAddress,  // Dirección del creador
    ipfs_hash: felt252,       // Hash de IPFS
    title: felt252,           // Título del video
    likes_count: u256,        // Contador de likes
    created_at: u64,          // Timestamp de creación
}
```

### Eventos

```cairo
// Video subido
event VideoUploaded {
    video_id: u256,
    creator: ContractAddress,
    ipfs_hash: felt252,
    timestamp: u64,
}

// Video recibió un like
event VideoLiked {
    video_id: u256,
    liker: ContractAddress,
    creator: ContractAddress,
    reward_amount: u256,
}

// Recompensas distribuidas
event RewardDistributed {
    video_id: u256,
    creator: ContractAddress,
    creator_reward: u256,  // 67%
    treasury_fee: u256,    // 33%
}

// Welcome bonus reclamado
event WelcomeBonusClaimed {
    user: ContractAddress,
    amount: u256,  // 150 VERSY
}
```

---

## 🚀 Instalación y Despliegue

### Pre-requisitos

```bash
# Scarb (Cairo build tool)
scarb --version
# Debe mostrar: scarb 2.11.4 o superior

# Starknet Foundry
sncast --version
# Debe mostrar: sncast 0.44.0 o superior
```

### Compilación

```bash
cd versy_platform

# Compilar contratos
scarb build

# Ejecutar tests
scarb test
```

### Despliegue en Sepolia

#### 1. Desplegar VersyToken

```bash
# Declarar el token
sncast --account=sepolia declare \
    --contract-name=VersyToken \
    --network=sepolia

# Desplegar (owner recibirá el total supply)
sncast --account=sepolia deploy \
    --class-hash=<TOKEN_CLASS_HASH> \
    --constructor-calldata=<OWNER_ADDRESS> \
    --network=sepolia
```

#### 2. Desplegar VersyPlatform

```bash
# Declarar la plataforma
sncast --account=sepolia declare \
    --contract-name=VersyPlatform \
    --network=sepolia

# Desplegar
sncast --account=sepolia deploy \
    --class-hash=<PLATFORM_CLASS_HASH> \
    --constructor-calldata=<OWNER_ADDRESS> <TOKEN_ADDRESS> \
    --network=sepolia
```

#### 3. Configurar Permisos

```bash
# Transferir ownership del token a la plataforma para que pueda mintear
# Esto permite welcome bonuses y subsidios

# También transferir tokens para:
# - Early Adopters Pool (100M)
# - Rewards Pool (300M)
# - Treasury (200M)
```

---

## 💡 Ejemplos de Uso

### Flujo Completo de Usuario

```typescript
// 1. Usuario nuevo se registra
await platform.claim_welcome_bonus();
// Balance: +150 VERSY

// 2. Usuario sube un video
const ipfsHash = await uploadToIPFS(videoFile);
const videoId = await platform.upload_video(
    ipfsHash,
    "Mi Primer Video"
);

// 3. Otro usuario da like
// Primero aprobar el gasto de tokens
await token.approve(platformAddress, 10 * 10**18);
await platform.like_video(videoId);
// Resultado:
// - Liker gasta: 10 VERSY
// - Creador recibe: 6.7 VERSY
// - Treasury recibe: 3.3 VERSY

// 4. Ver todos los videos en el feed
const videos = await platform.get_all_videos();

// 5. Ver videos de un creador específico
const userVideos = await platform.get_videos_by_user(creatorAddress);
```

---

## 🔐 Seguridad

### Controles Implementados

✅ **Solo 1 like por usuario por video** - Previene spam  
✅ **No puedes dar like a tus propios videos** - Previene auto-farming  
✅ **Matemática segura con checked operations** - Sin overflow/underflow  
✅ **Ownership protegido** - Solo owner puede withdraw treasury  
✅ **Transfer seguro de tokens** - Verificación de balances  
✅ **Welcome bonus una sola vez** - Previene sybil attacks  

### Límites y Validaciones

```cairo
// Upload video
- ipfs_hash != 0 (no vacío)
- title != 0 (no vacío)

// Like video  
- Video debe existir
- Usuario no ha dado like antes
- Usuario tiene suficientes tokens (10 VERSY)
- Usuario != creador

// Welcome bonus
- Usuario no lo ha reclamado antes
```

---

## 📈 Roadmap

### Fase 1: MVP (Actual)
- ✅ Token VERSY (ERC20)
- ✅ Plataforma base
- ✅ Sistema de likes
- ✅ Welcome bonus
- ✅ Treasury

### Fase 2: Mejoras (Próximo)
- 🔄 Frontend web3
- 🔄 Integración ChipiPay
- 🔄 Subsidio decreciente para likes
- 🔄 Sistema de comentarios
- 🔄 Shares/Retweets

### Fase 3: Features Avanzadas
- ⏳ NFTs de videos virales
- ⏳ Staking de VERSY
- ⏳ Governance (DAO)
- ⏳ Live streaming
- ⏳ Creator DAOs

### Fase 4: Expansión
- ⏳ Multi-chain
- ⏳ Mobile apps
- ⏳ Versy Studio (edición)
- ⏳ Premium features
- ⏳ Metaverse integration

---

## 🛠️ Tecnologías

- **Cairo 2.11.4** - Smart contracts language
- **Starknet** - Layer 2 scaling solution
- **Scarb 2.11.4** - Build tool y package manager
- **Starknet Foundry 0.44.0** - Testing framework
- **OpenZeppelin v0.20.0** - Security libraries (ERC20, Ownable)
- **IPFS/Pinata** - Decentralized storage
- **ChipiPay** - Embedded wallets (próximamente)

---

## 📚 Recursos

### Documentación Oficial
- **Starknet Docs**: https://docs.starknet.io/
- **Cairo Book**: https://book.cairo-lang.org/
- **OpenZeppelin Cairo**: https://docs.openzeppelin.com/contracts-cairo/

### Explorers
- **Sepolia Testnet**: https://sepolia.starkscan.co/
- **Mainnet**: https://starkscan.co/

### Faucets (Testnet)
- **Blast API**: https://blastapi.io/faucets/starknet-sepolia-eth
- **Starknet Official**: https://starknet-faucet.vercel.app/

---

## 🤝 Contribuir

Este es un proyecto open-source. Las contribuciones son bienvenidas!

### Cómo Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📝 Licencia

Desarrollado para el **Starknet Hackathon 2025**.

---

## 👨‍💻 Equipo

- **Lead Developer**: [@MarxMad](https://github.com/MarxMad)
- **Project**: [Starknet Hackathon](https://github.com/MarxMad/Starknet)

---

## 🎯 Vision Statement

> "Versy reimagina la monetización de contenido en web3, permitiendo que creadores sean recompensados directamente por su audiencia, sin intermediarios, de manera transparente y justa."

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

**🚀 Únete a la revolución del contenido descentralizado con Versy!**

