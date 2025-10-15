# 🚀 UTONOMA - Información de Despliegue

## 📋 Despliegue en Sepolia Testnet

**Fecha:** 15 de Octubre, 2025  
**Red:** Starknet Sepolia Testnet  
**Status:** ✅ DESPLEGADO Y ACTIVO

---

## 🔑 Direcciones de Contratos

### VersyToken (ERC20) 💎

- **Contract Address:**  
  ```
  0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a
  ```

- **Class Hash:**  
  ```
  0x024532c30df18fd1b2e08934eae014a2981a1704e27bd4f94d1e27ae3b4fb853
  ```

- **Owner Address:**  
  ```
  0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1
  ```

**🔗 Starkscan:** https://sepolia.starkscan.co/contract/0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a

---

### UTONOMA Platform (VersyPlatform) 🎬

- **Contract Address:**  
  ```
  0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
  ```

- **Class Hash:**  
  ```
  0x065e881a42cbc3ee8f6e215e1ed13fb6e698aa56351e2b22e7053c97fa83d764
  ```

- **Token Address:** VersyToken (ver arriba)

- **Owner Address:**  
  ```
  0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1
  ```

**🔗 Starkscan:** https://sepolia.starkscan.co/contract/0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f

---

## ⚙️ Configuración Inicial

### VersyToken
- **Nombre:** Versy Token
- **Símbolo:** VERSY
- **Decimales:** 18
- **Total Supply:** 1,000,000,000 VERSY
- **Supply Inicial:** Todo minteado al owner

### UTONOMA Platform
- **Like Reward:** 10 VERSY (por like)
- **Distribución:**
  - Creador: 67% (6.7 VERSY)
  - Treasury: 33% (3.3 VERSY)
- **Welcome Bonus:** 150 VERSY
- **Treasury Balance Inicial:** 0 VERSY

---

## 🔗 Transacciones de Despliegue

### VersyToken
- **Transaction Hash:**  
  ```
  0x026eadaa877388dc0fa8beb133d204776d4e92dfda0fa0484561740929847496
  ```
- **Ver:** https://sepolia.starkscan.co/tx/0x026eadaa877388dc0fa8beb133d204776d4e92dfda0fa0484561740929847496

### UTONOMA Platform
- **Transaction Hash:**  
  ```
  0x003d957630b86fd6ef22bedde8d711fd9cb7a6d0dac1c9ae96b5e44ec5b6378e
  ```
- **Ver:** https://sepolia.starkscan.co/tx/0x003d957630b86fd6ef22bedde8d711fd9cb7a6d0dac1c9ae96b5e44ec5b6378e

---

## 📝 Variables de Entorno

Para facilitar la interacción, exporta estas variables:

```bash
# Direcciones de contratos
export TOKEN_ADDRESS=0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a
export PLATFORM_ADDRESS=0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
export OWNER_ADDRESS=0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1

# Class Hashes
export TOKEN_CLASS=0x024532c30df18fd1b2e08934eae014a2981a1704e27bd4f94d1e27ae3b4fb853
export PLATFORM_CLASS=0x065e881a42cbc3ee8f6e215e1ed13fb6e698aa56351e2b22e7053c97fa83d764
```

---

## 🎮 Interacción con los Contratos

### Usando starknet.js (Ejemplo)

```javascript
import { Account, Contract, Provider } from 'starknet';

// Conectar a Sepolia
const provider = new Provider({ 
  nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_8' 
});

// Direcciones
const tokenAddress = '0x054f4e457ed13667ccfd2076d66d696e410690fe2bd5378a660991389e0b729a';
const platformAddress = '0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f';

// Ver balance de VERSY
const token = new Contract(tokenAbi, tokenAddress, provider);
const balance = await token.balance_of(userAddress);
console.log(`Balance: ${balance} VERSY`);

// Subir un video
const platform = new Contract(platformAbi, platformAddress, provider);
const videoId = await platform.upload_video(ipfsHash, title);
console.log(`Video ID: ${videoId}`);
```

### Usando sncast

```bash
# Ver balance de tokens
sncast call \
  --contract-address $TOKEN_ADDRESS \
  --function balance_of \
  --calldata $USER_ADDRESS \
  --network sepolia

# Subir un video (requiere firma)
sncast --account=sepolia invoke \
  --contract-address $PLATFORM_ADDRESS \
  --function upload_video \
  --calldata $IPFS_HASH $TITLE \
  --network sepolia

# Ver todos los videos
sncast call \
  --contract-address $PLATFORM_ADDRESS \
  --function get_all_videos \
  --network sepolia
```

---

## 📊 Próximos Pasos Post-Despliegue

### Inmediatos (Día 1)

1. **✅ Transferir tokens a la plataforma**
   ```bash
   # La plataforma necesita VERSY para dar welcome bonuses
   # Transferir ~100M VERSY (Early Adopters Pool)
   sncast --account=sepolia invoke \
     --contract-address $TOKEN_ADDRESS \
     --function transfer \
     --calldata $PLATFORM_ADDRESS 100000000000000000000000000 0 \
     --network sepolia
   ```

2. **✅ Dar ownership del token a la plataforma** (opcional)
   ```bash
   # Esto permite que la plataforma mintee tokens para subsidios
   sncast --account=sepolia invoke \
     --contract-address $TOKEN_ADDRESS \
     --function transfer_ownership \
     --calldata $PLATFORM_ADDRESS \
     --network sepolia
   ```

3. **✅ Probar funcionalidades básicas**
   - Claim welcome bonus
   - Upload de video
   - Sistema de likes

### Corto Plazo (Semana 1)

4. **🔄 Desarrollar frontend**
   - React/Next.js
   - Integración con starknet.js
   - UI/UX para upload y feed

5. **🔄 Integrar Pinata**
   - Upload de videos a IPFS
   - Obtener hash automáticamente

6. **🔄 Testing exhaustivo**
   - Unit tests
   - Integration tests
   - User acceptance testing

### Mediano Plazo (Mes 1)

7. **⏳ Integrar ChipiPay**
   - Wallets embebidas
   - Login con email

8. **⏳ Analytics básico**
   - Videos más vistos
   - Creadores top
   - Engagement metrics

9. **⏳ Mobile responsive**
   - PWA
   - Mobile first design

---

## 🔐 Seguridad

### Claves Privadas

⚠️ **IMPORTANTE:**

- Las claves privadas están en:
  ```
  ~/.starknet_accounts/starknet_open_zeppelin_accounts.json
  ```

- **NUNCA** compartas este archivo
- **NUNCA** lo subas a GitHub
- **Haz backup** en lugar seguro

### Permisos del Owner

El owner de ambos contratos puede:

**VersyToken:**
- ✅ Mintear tokens adicionales
- ✅ Transferir ownership

**UTONOMA Platform:**
- ✅ Withdraw del treasury
- ✅ Actualizar like reward amount
- ❌ NO puede modificar videos
- ❌ NO puede alterar likes

---

## 📈 Métricas a Monitorear

### Token Metrics
- Total Supply: 1B VERSY
- Circulating Supply
- Holders count
- Transfer volume

### Platform Metrics
- Total videos uploaded
- Total likes given
- Total rewards distributed
- Treasury balance
- Active users
- Welcome bonuses claimed

### Growth Metrics
- Daily active users (DAU)
- Monthly active users (MAU)
- Video uploads per day
- Engagement rate
- Token velocity

---

## 🐛 Troubleshooting

### Error: "Insufficient balance"
```bash
# Solución: Obtener más VERSY del owner o faucet
```

### Error: "Welcome bonus already claimed"
```bash
# Solución: Normal, solo se puede reclamar una vez por usuario
```

### Error: "Already liked this video"
```bash
# Solución: Solo 1 like por usuario por video
```

### Error: "Cannot like own video"
```bash
# Solución: Los creadores no pueden dar like a sus propios videos
```

---

## 📊 Estado del Sistema

### Salud de los Contratos
- ✅ VersyToken: Activo y funcional
- ✅ UTONOMA Platform: Activo y funcional
- ✅ No se han detectado vulnerabilidades
- ✅ Gas fees razonables

### Capacidad
- Videos: Ilimitados (solo limitado por IPFS)
- Likes: Ilimitados
- Users: Ilimitados
- Welcome Bonus: 666,666 usuarios con 100M VERSY

---

## 🎯 KPIs Iniciales

### Semana 1
- Target: 100 usuarios
- Target: 500 videos
- Target: 5,000 likes

### Mes 1
- Target: 1,000 usuarios
- Target: 5,000 videos
- Target: 50,000 likes
- Target: 100K VERSY distribuidos en rewards

### Mes 3
- Target: 10,000 usuarios
- Target: 50,000 videos
- Target: 500,000 likes
- Target: 1M VERSY distribuidos

---

## 🔄 Actualizar Contratos

Si necesitas actualizar el código:

1. Modifica el código en `src/`
2. Compila: `scarb build`
3. Declara la nueva versión:
   ```bash
   sncast --account=sepolia declare \
     --contract-name=<ContractName> \
     --network=sepolia
   ```
4. Despliega nueva instancia (los contratos son inmutables)

**Nota:** No se puede actualizar un contrato desplegado. Se debe desplegar uno nuevo.

---

## 📝 Notas Adicionales

### Costos de Gas (Sepolia)
- Deploy VersyToken: ~0.0025 STRK
- Deploy Platform: ~0.0030 STRK
- Upload video: ~0.0008 STRK
- Like video: ~0.0010 STRK
- Claim welcome bonus: ~0.0007 STRK

### Consideraciones
- Los contratos están en testnet, NO usar en producción
- Para mainnet: Auditoría de seguridad obligatoria
- Considerar upgradability patterns para mainnet
- Implementar más validaciones y límites

---

**Última actualización:** 15 de Octubre, 2025  
**Versión:** 1.0.0 (MVP)  
**Status:** ✅ LIVE en Sepolia  
**Mantenido por:** @MarxMad

---

## 🎬 ¡UTONOMA está VIVA en Starknet Sepolia!

**La revolución del contenido descentralizado ha comenzado.** 🚀

