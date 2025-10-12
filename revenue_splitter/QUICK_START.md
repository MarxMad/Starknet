# 🚀 Quick Start - Despliegue Rápido

## Resumen Ejecutivo

Este contrato **RevenueSplitter** está listo para desplegarse en Starknet Sepolia testnet.

## ⚡ Despliegue en 3 Pasos

### 1️⃣ Configurar tu cuenta

```bash
# Si no tienes una cuenta, créala:
sncast account create --name my_account \
    --url https://starknet-sepolia.public.blastapi.io/rpc/v0_7

# Despliega la cuenta (necesitas fondos de faucet):
sncast account deploy --name my_account --max-fee auto \
    --url https://starknet-sepolia.public.blastapi.io/rpc/v0_7
```

💡 **Obtén ETH de testnet**: https://starknet-faucet.vercel.app/

### 2️⃣ Declarar y Desplegar

```bash
# Declarar el contrato
./scripts/declare.sh

# ⚠️ GUARDA EL CLASS HASH que aparece en el resultado

# Desplegar (reemplaza con tus valores)
./scripts/deploy.sh <CLASS_HASH> <TU_DIRECCION_OWNER>
```

### 3️⃣ Interactuar

```bash
# Ver el balance
./scripts/interact.sh <CONTRACT_ADDRESS> balance

# Agregar un receptor (solo owner)
./scripts/interact.sh <CONTRACT_ADDRESS> add_recipient <RECIPIENT_ADDR> 50

# Depositar fondos
./scripts/interact.sh <CONTRACT_ADDRESS> deposit 1000

# Distribuir fondos (solo owner)
./scripts/interact.sh <CONTRACT_ADDRESS> distribute
```

## 📚 Documentación Completa

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía detallada de despliegue
- **[README.md](./README.md)** - Documentación del contrato

## 🆘 Ayuda Rápida

### ¿Necesitas fondos de testnet?
👉 https://starknet-faucet.vercel.app/

### ¿Problemas con la cuenta?
```bash
sncast account list  # Ver cuentas disponibles
```

### ¿Verificar tu contrato desplegado?
👉 https://sepolia.starkscan.co/contract/<TU_CONTRACT_ADDRESS>

## 📝 Ejemplo Completo

```bash
# 1. Declarar
./scripts/declare.sh
# Resultado: Class Hash: 0x05a1b2c3d4e5f6...

# 2. Desplegar
./scripts/deploy.sh 0x05a1b2c3d4e5f6... 0x01234567890abc...
# Resultado: Contract Address: 0x04abc...

# 3. Configurar receptores
./scripts/interact.sh 0x04abc... add_recipient 0x0recipient1... 50
./scripts/interact.sh 0x04abc... add_recipient 0x0recipient2... 30
./scripts/interact.sh 0x04abc... add_recipient 0x0recipient3... 20

# 4. Depositar
./scripts/interact.sh 0x04abc... deposit 1000

# 5. Distribuir
./scripts/interact.sh 0x04abc... distribute
```

## ✨ Características

- ✅ Matemática segura u256
- ✅ Control de acceso con Ownable
- ✅ 4 tests pasando
- ✅ Scripts automatizados
- ✅ Documentación completa

---

💡 **Tip**: Edita `snfoundry.toml` si tu cuenta tiene un nombre diferente a "my_account"

