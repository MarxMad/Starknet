# 📝 Quick Reference - Marketplace Escrow

Guía rápida de comandos para el contrato Marketplace Escrow desplegado en Sepolia.

---

## 🔑 Información del Contrato

```bash
CONTRACT_ADDRESS=0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a
CLASS_HASH=0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c
OWNER_ADDRESS=0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1
```

**Explorer:** https://sepolia.starkscan.co/contract/0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a

---

## 🚀 Comandos de Desarrollo

### Compilar
```bash
cd marketplace_escrow
scarb build
```

### Ejecutar Tests
```bash
scarb test
```

### Ver versiones
```bash
scarb --version
sncast --version
```

---

## 📦 Comandos de Despliegue

### Crear cuenta nueva
```bash
sncast account create --network=sepolia --name=mi_cuenta
```

### Desplegar cuenta
```bash
sncast account deploy --network sepolia --name=mi_cuenta
```

### Declarar contrato
```bash
sncast --account=sepolia declare \
    --contract-name=MarketplaceEscrow \
    --network=sepolia
```

### Desplegar contrato (script)
```bash
./scripts/deploy.sh <CLASS_HASH> <OWNER_ADDRESS> <FEE_PERCENT>
```

---

## 🎮 Comandos de Interacción

### Crear Orden
```bash
./scripts/interact.sh $CONTRACT_ADDRESS \
    create_order \
    <SELLER_ADDRESS> \
    <AMOUNT>
```

**Ejemplo:**
```bash
./scripts/interact.sh $CONTRACT_ADDRESS \
    create_order \
    0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef \
    1000
```

### Ver Orden
```bash
./scripts/interact.sh $CONTRACT_ADDRESS get_order <ORDER_ID>
```

**Ejemplo:**
```bash
./scripts/interact.sh $CONTRACT_ADDRESS get_order 1
```

### Completar Orden (Buyer)
```bash
./scripts/interact.sh $CONTRACT_ADDRESS complete_order <ORDER_ID>
```

### Cancelar Orden (Buyer o Seller)
```bash
./scripts/interact.sh $CONTRACT_ADDRESS cancel_order <ORDER_ID>
```

### Disputar Orden (Buyer o Seller)
```bash
./scripts/interact.sh $CONTRACT_ADDRESS dispute_order <ORDER_ID>
```

### Resolver Disputa (Solo Owner)
```bash
./scripts/interact.sh $CONTRACT_ADDRESS resolve_dispute <ORDER_ID> <1_o_0>
```
- `1` = Liberar al vendedor
- `0` = Devolver al comprador

### Ver Órdenes de un Usuario
```bash
./scripts/interact.sh $CONTRACT_ADDRESS get_user_orders <USER_ADDRESS>
```

### Retirar Comisiones (Solo Owner)
```bash
./scripts/interact.sh $CONTRACT_ADDRESS withdraw_fees
```

---

## 🔍 Comandos de Consulta (usando sncast directamente)

### Ver estado de una orden
```bash
sncast call \
    --contract-address $CONTRACT_ADDRESS \
    --function get_order \
    --calldata <ORDER_ID> 0 \
    --network sepolia
```

### Ver órdenes de un usuario
```bash
sncast call \
    --contract-address $CONTRACT_ADDRESS \
    --function get_user_orders \
    --calldata <USER_ADDRESS> \
    --network sepolia
```

---

## 🌐 URLs Útiles

### Faucets (Testnet)
- **Blast API**: https://blastapi.io/faucets/starknet-sepolia-eth
- **Starknet Oficial**: https://starknet-faucet.vercel.app/

### Explorers
- **Starkscan Sepolia**: https://sepolia.starkscan.co/
- **Voyager Sepolia**: https://sepolia.voyager.online/

### Documentación
- **Starknet Docs**: https://docs.starknet.io/
- **Cairo Book**: https://book.cairo-lang.org/
- **OpenZeppelin Cairo**: https://docs.openzeppelin.com/contracts-cairo/

---

## 💡 Tips y Trucos

### Ver logs en tiempo real
```bash
# En Starkscan, agrega tu transaction hash:
https://sepolia.starkscan.co/tx/<TX_HASH>
```

### Verificar balance de cuenta
```bash
https://sepolia.starkscan.co/contract/<ACCOUNT_ADDRESS>
```

### Listar cuentas configuradas
```bash
sncast account list
```

### Exportar variables de entorno
```bash
export CONTRACT_ADDRESS=0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a
export OWNER_ADDRESS=0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1

# Ahora puedes usar $CONTRACT_ADDRESS y $OWNER_ADDRESS en tus comandos
```

---

## 🐛 Solución de Problemas Comunes

### Error: "Insufficient balance"
```bash
# Solución: Obtener más fondos del faucet
# https://blastapi.io/faucets/starknet-sepolia-eth
```

### Error: "Account not found"
```bash
# Solución: Verificar que la cuenta existe
sncast account list
```

### Error: "Class already declared"
```bash
# Esto es normal - usa el class_hash existente para desplegar
```

### Ver ayuda de comandos
```bash
sncast --help
sncast account --help
sncast deploy --help
```

---

## 📊 Estructura de Datos

### Order
```cairo
struct Order {
    order_id: u256,         // ID único
    buyer: ContractAddress,  // Comprador
    seller: ContractAddress, // Vendedor
    amount: u256,           // Monto
    status: OrderStatus,    // Estado
    created_at: u64,        // Timestamp
}
```

### OrderStatus
```cairo
enum OrderStatus {
    Created,    // Orden creada
    Completed,  // Orden completada
    Cancelled,  // Orden cancelada
    Disputed,   // En disputa
    Resolved    // Disputa resuelta
}
```

---

## 🔄 Flujo Típico de Uso

```bash
# 1. Buyer crea orden
./scripts/interact.sh $CONTRACT_ADDRESS create_order $SELLER 1000

# 2. Verificar orden creada (order_id = 1)
./scripts/interact.sh $CONTRACT_ADDRESS get_order 1

# 3. Seller envía producto/servicio (off-chain)

# 4. Buyer confirma recepción y completa orden
./scripts/interact.sh $CONTRACT_ADDRESS complete_order 1

# 5. Owner retira comisiones (50 tokens del ejemplo)
./scripts/interact.sh $CONTRACT_ADDRESS withdraw_fees
```

---

**Última actualización:** 15 de Octubre, 2025  
**Versión:** 1.0.0

