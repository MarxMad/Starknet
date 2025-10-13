# 🚀 Guía de Despliegue - Marketplace Escrow

## Paso a Paso para Desplegar en Sepolia

### 📋 Pre-requisitos

1. **Cuenta configurada en Starknet Sepolia**
   ```bash
   sncast account list
   ```

2. **Fondos en tu cuenta** (ETH de testnet)
   - Obtén ETH de: https://starknet-faucet.vercel.app/

3. **Archivo `snfoundry.toml` configurado**
   - Ya está configurado en el proyecto

---

## 🔨 Paso 1: Declarar el Contrato

```bash
./scripts/declare.sh
```

**Resultado esperado:**
```
✅ Contrato declarado exitosamente

Class Hash: 0x05a1b2c3d4e5f6...
Transaction Hash: 0x07...def
```

⚠️ **IMPORTANTE**: Guarda el **Class Hash**, lo necesitarás para el despliegue.

---

## 🚀 Paso 2: Desplegar el Contrato

```bash
./scripts/deploy.sh <CLASS_HASH> <TU_DIRECCION> [FEE_PERCENT]
```

**Ejemplo:**
```bash
./scripts/deploy.sh \
    0x05a1b2c3d4e5f6... \
    0x0123456789abcd... \
    5
```

**Parámetros:**
- `CLASS_HASH`: El hash obtenido en el paso 1
- `TU_DIRECCION`: Tu dirección de wallet (serás el owner de la plataforma)
- `FEE_PERCENT`: Porcentaje de comisión (opcional, default: 5%)

**Resultado esperado:**
```
✅ Contrato desplegado exitosamente

Contract Address: 0x04abc...xyz
Transaction Hash: 0x06...ghi
```

⚠️ **IMPORTANTE**: Guarda la **Contract Address**.

---

## 🎮 Paso 3: Interactuar con el Contrato

### Crear una Orden (como Comprador)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> create_order <SELLER_ADDRESS> <AMOUNT>
```

**Ejemplo:**
```bash
./scripts/interact.sh \
    0x04abc...xyz \
    create_order \
    0x0seller...123 \
    1000
```

### Completar una Orden (como Comprador)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> complete_order <ORDER_ID>
```

**Ejemplo:**
```bash
./scripts/interact.sh 0x04abc...xyz complete_order 1
```

### Cancelar una Orden

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> cancel_order <ORDER_ID>
```

### Disputar una Orden

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> dispute_order <ORDER_ID>
```

### Resolver Disputa (solo Owner)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> resolve_dispute <ORDER_ID> <1_o_0>
```

- `1` = Liberar fondos al vendedor
- `0` = Devolver fondos al comprador

### Ver Detalles de una Orden

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> get_order <ORDER_ID>
```

### Ver Órdenes de un Usuario

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> get_user_orders <USER_ADDRESS>
```

### Retirar Comisiones (solo Owner)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> withdraw_fees
```

---

## 🔍 Verificar en Starkscan

Una vez desplegado, puedes ver tu contrato en:

```
https://sepolia.starkscan.co/contract/<CONTRACT_ADDRESS>
```

---

## 💡 Ejemplo de Flujo Completo

### Escenario: Venta de NFT

```bash
# 1. Comprador crea orden (como comprador)
./scripts/interact.sh 0x04abc create_order 0x0seller 100

# 2. Vendedor transfiere el NFT off-chain

# 3. Comprador confirma recepción
./scripts/interact.sh 0x04abc complete_order 1

# Resultado:
# - Vendedor recibe: 95 tokens (100 - 5% comisión)
# - Plataforma recibe: 5 tokens (comisión)
```

### Escenario: Disputa

```bash
# 1. Comprador crea orden
./scripts/interact.sh 0x04abc create_order 0x0seller 200

# 2. Comprador no recibe el producto
./scripts/interact.sh 0x04abc dispute_order 1

# 3. Owner investiga y resuelve (devolver al comprador)
./scripts/interact.sh 0x04abc resolve_dispute 1 0
```

---

## 🛠️ Comandos Útiles

### Verificar que el contrato está desplegado

```bash
sncast --profile sepolia call \
    --contract-address <CONTRACT_ADDRESS> \
    --function get_order \
    --calldata 1 0
```

### Ver tu balance

```bash
sncast --profile sepolia account info
```

---

## ❓ Solución de Problemas

### Error: "Account not found"
```bash
sncast account list  # Ver cuentas disponibles
```

### Error: "Insufficient balance"
Obtén ETH de testnet: https://starknet-faucet.vercel.app/

### Error: "Class already declared"
Esto está bien, puedes usar el class hash existente para desplegar.

### Error: "Invalid constructor arguments"
Verifica que estés pasando:
1. Owner address (felt252 válido)
2. Fee percent (número)
3. 0 (para completar el u256 del fee_percent)

---

## 📚 Recursos

- **Sepolia Explorer**: https://sepolia.starkscan.co/
- **Faucet**: https://starknet-faucet.vercel.app/
- **Docs**: https://docs.starknet.io/

---

¡Listo para desplegar tu marketplace descentralizado! 🚀

