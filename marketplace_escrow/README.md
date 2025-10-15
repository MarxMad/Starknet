# 🛒 Marketplace Escrow - Contrato Cairo

Sistema de escrow seguro para marketplace descentralizado en Starknet.

## 🎯 Características

- ✅ **Escrow seguro** - Protege a compradores y vendedores
- ✅ **Sistema de órdenes** - Crea, completa y cancela órdenes
- ✅ **Resolución de disputas** - Sistema de arbitraje por el owner
- ✅ **Comisiones de plataforma** - Configurable (default 5%)
- ✅ **Matemática segura u256** - Sin overflow/underflow
- ✅ **7 tests pasando** (100%)
- ✅ **Control de acceso** con OpenZeppelin Ownable

## 📋 Funciones Principales

### Para Compradores (Buyers)

- `create_order(seller, amount)` - Crear una orden de compra
- `complete_order(order_id)` - Confirmar recepción y liberar fondos
- `cancel_order(order_id)` - Cancelar orden (solo si está en estado Created)
- `dispute_order(order_id)` - Abrir disputa sobre la orden

### Para Vendedores (Sellers)

- `cancel_order(order_id)` - Cancelar orden (solo si está en estado Created)
- `dispute_order(order_id)` - Abrir disputa sobre la orden

### Para el Owner de la Plataforma

- `resolve_dispute(order_id, release_to_seller)` - Resolver disputas
- `withdraw_fees()` - Retirar comisiones acumuladas

### Consultas Públicas

- `get_order(order_id)` - Obtener detalles de una orden
- `get_user_orders(user)` - Obtener todas las órdenes de un usuario

## 🔄 Estados de Órdenes

```
Created → Completed    (buyer confirma)
Created → Cancelled    (buyer o seller cancela)
Created → Disputed     (buyer o seller disputa)
Disputed → Resolved    (owner resuelve)
```

## 🚀 Compilación y Tests

### Compilar

```bash
scarb build
```

### Ejecutar Tests

```bash
scarb test
```

**Resultado:**
```
Tests: 7 passed, 0 failed
- test_create_order ✅
- test_complete_order ✅
- test_cancel_order ✅
- test_dispute_and_resolve ✅
- test_get_user_orders ✅
- test_unauthorized_complete ✅
- test_zero_amount ✅
```

## 💰 Sistema de Comisiones

El contrato cobra una comisión sobre cada transacción completada:

```cairo
// Ejemplo: Orden de 1000 tokens con 5% de comisión
Monto total: 1000
Comisión (5%): 50
Al vendedor: 950
```

Las comisiones se acumulan y el owner puede retirarlas con `withdraw_fees()`.

## 📝 Ejemplo de Uso

### 1. Crear una Orden

```javascript
// Comprador crea orden
const orderId = await contract.create_order(
  sellerAddress,  // Dirección del vendedor
  1000           // Monto en tokens
);
```

### 2. Completar una Orden

```javascript
// Comprador confirma recepción
await contract.complete_order(orderId);
// El vendedor recibe 950 tokens (1000 - 5% comisión)
// La plataforma recibe 50 tokens de comisión
```

### 3. Cancelar una Orden

```javascript
// Comprador o vendedor puede cancelar
await contract.cancel_order(orderId);
// Los fondos regresan al comprador
```

### 4. Manejo de Disputas

```javascript
// Comprador o vendedor abre disputa
await contract.dispute_order(orderId);

// Owner de la plataforma resuelve
await contract.resolve_dispute(
  orderId,
  true  // true = liberar al vendedor, false = devolver al comprador
);
```

## 🔐 Seguridad

### Validaciones Implementadas

- ✅ Solo el comprador puede completar órdenes
- ✅ Solo comprador o vendedor pueden cancelar/disputar
- ✅ Solo el owner puede resolver disputas
- ✅ Validación de montos > 0
- ✅ Validación de direcciones válidas
- ✅ Prevención de auto-transacciones (buyer ≠ seller)
- ✅ Matemática segura con checked operations

### Estados Protegidos

Cada acción solo puede ejecutarse en estados específicos:
- `complete`: Solo desde Created o Disputed
- `cancel`: Solo desde Created
- `dispute`: Solo desde Created
- `resolve`: Solo desde Disputed

## 🎮 Casos de Uso

### Marketplace de NFTs

```javascript
// Vendedor lista NFT por 100 ETH
const orderId = await buyer.create_order(seller, 100);

// Vendedor transfiere NFT
await nft.transferFrom(seller, buyer, tokenId);

// Comprador confirma recepción
await buyer.complete_order(orderId);
```

### Servicios Freelance

```javascript
// Cliente crea orden por servicio
const orderId = await client.create_order(freelancer, 500);

// Freelancer completa el trabajo
// Cliente confirma satisfacción
await client.complete_order(orderId);

// O si hay problema, abre disputa
await client.dispute_order(orderId);
```

### Ventas P2P

```javascript
// Comprador crea orden
const orderId = await buyer.create_order(seller, 200);

// Vendedor envía producto
// Comprador recibe y confirma
await buyer.complete_order(orderId);

// O cancela si vendedor no envía
await buyer.cancel_order(orderId);
```

## 📊 Estructura de Datos

### Order

```cairo
struct Order {
    order_id: u256,        // ID único de la orden
    buyer: ContractAddress, // Dirección del comprador
    seller: ContractAddress, // Dirección del vendedor
    amount: u256,          // Monto en tokens
    status: OrderStatus,   // Estado actual
    created_at: u64,       // Timestamp de creación
}
```

### OrderStatus

```cairo
enum OrderStatus {
    Created,    // Orden creada, esperando confirmación
    Completed,  // Orden completada, fondos liberados
    Cancelled,  // Orden cancelada, fondos devueltos
    Disputed,   // En disputa, esperando resolución
    Resolved    // Disputa resuelta
}
```

## 🛠️ Guía Completa de Despliegue en Starknet Sepolia

### Pre-requisitos

Asegúrate de tener instaladas las siguientes herramientas:

```bash
# Verificar Scarb
scarb --version
# Debe mostrar: scarb 2.11.4 o superior

# Verificar Starknet Foundry (sncast)
sncast --version
# Debe mostrar: sncast 0.44.0 o superior

# Si usas asdf, configura la versión de scarb
asdf set scarb 2.11.4
```

**Dependencias configuradas:**
- Starknet 2.11.4
- OpenZeppelin v0.20.0
- Starknet Foundry 0.44.0

---

### Paso 1: Crear Cuenta de Sepolia

Crea una nueva cuenta en Starknet Sepolia:

```bash
cd marketplace_escrow
sncast account create --network=sepolia --name=sepolia
```

**Resultado esperado:**
```
address: 0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1
estimated_fee: 0.002890272014058240 STRK
message: Account successfully created but it needs to be deployed
```

**📝 Guarda tu dirección** - la necesitarás en los siguientes pasos.

---

### Paso 2: Obtener Fondos del Faucet

Necesitas STRK o ETH en testnet para pagar las gas fees.

**🚰 Faucets disponibles:**

1. **Blast API Faucet** (Recomendado)
   - URL: https://blastapi.io/faucets/starknet-sepolia-eth
   - Proporciona: ETH y STRK

2. **Starknet Faucet Oficial**
   - URL: https://starknet-faucet.vercel.app/
   - Proporciona: ETH

**Pasos:**
1. Copia tu dirección de cuenta
2. Pégala en el faucet
3. Solicita tokens
4. Espera 30-60 segundos

**🔍 Verificar balance:**
```
https://sepolia.starkscan.co/contract/<TU_DIRECCION>
```

---

### Paso 3: Desplegar tu Cuenta

Una vez que tengas fondos, despliega tu cuenta:

```bash
sncast account deploy --network sepolia --name sepolia
```

**Resultado esperado:**
```
transaction_hash: 0x00e3096bda16dd7090b319d2efa2b541b299a401cf1426065268503e680f10bb
To see invocation details, visit:
transaction: https://sepolia.starkscan.co/tx/0x00e3096bda16dd7090b319d2efa2b541b299a401cf1426065268503e680f10bb
```

✅ Tu cuenta está lista para usar.

---

### Paso 4: Compilar el Contrato

```bash
scarb build
```

**Resultado esperado:**
```
Compiling marketplace_escrow v0.1.0
Finished `dev` profile target(s) in 10 seconds
```

---

### Paso 5: Declarar el Contrato

Declara el contrato en Starknet Sepolia:

```bash
sncast --account=sepolia declare \
    --contract-name=MarketplaceEscrow \
    --network=sepolia
```

**Resultado esperado:**
```
class_hash: 0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c
transaction_hash: 0x05ccde1bbd69a9d90bba9cad5da0b3ad05b58b6e68bbe9797c66d347507b9c92

To see declaration details, visit:
class: https://sepolia.starkscan.co/class/0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c
```

**📝 Guarda el `class_hash`** - lo necesitarás para desplegar.

---

### Paso 6: Desplegar el Contrato

Usa el script de despliegue automatizado:

```bash
./scripts/deploy.sh <CLASS_HASH> <TU_DIRECCION_OWNER> <FEE_PERCENT>
```

**Ejemplo:**
```bash
./scripts/deploy.sh \
    0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c \
    0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1 \
    5
```

**Parámetros:**
- `CLASS_HASH`: El hash obtenido en el paso anterior
- `OWNER_ADDRESS`: Tu dirección de cuenta (será el admin del contrato)
- `FEE_PERCENT`: Porcentaje de comisión (5 = 5%, 10 = 10%, etc.)

**Resultado esperado:**
```
📤 Desplegando MarketplaceEscrow...
   Class Hash: 0x00d856a8...
   Owner: 0x03b38871...
   Fee Percent: 5%

contract_address: 0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a
transaction_hash: 0x06861eddc5e6e0a6ce28f64214488ea2428b7eaf3ad5f997ea3d4116905c32ae

To see deployment details, visit:
contract: https://sepolia.starkscan.co/contract/0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a

✅ Contrato desplegado exitosamente
```

**🎉 ¡Guardá la `contract_address`!** - Es la dirección de tu contrato desplegado.

---

### Paso 7: Verificar el Despliegue

Visita Starkscan para verificar que tu contrato está activo:

```
https://sepolia.starkscan.co/contract/<CONTRACT_ADDRESS>
```

Deberías ver:
- ✅ Estado: Active
- ✅ Tipo: Contract
- ✅ Transacciones: 1 (el despliegue)

---

## 🎮 Interactuar con el Contrato Desplegado

### Usando el Script de Interacción

El proyecto incluye un script completo para interactuar con el contrato:

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> <COMANDO> [ARGS]
```

### Comandos Disponibles

#### 1. Crear una Orden (Buyer)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> create_order <SELLER_ADDRESS> <AMOUNT>
```

**Ejemplo:**
```bash
./scripts/interact.sh \
    0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a \
    create_order \
    0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef \
    1000
```

#### 2. Consultar una Orden

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> get_order <ORDER_ID>
```

**Ejemplo:**
```bash
./scripts/interact.sh \
    0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a \
    get_order \
    1
```

#### 3. Completar una Orden (Buyer)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> complete_order <ORDER_ID>
```

#### 4. Cancelar una Orden (Buyer o Seller)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> cancel_order <ORDER_ID>
```

#### 5. Disputar una Orden (Buyer o Seller)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> dispute_order <ORDER_ID>
```

#### 6. Resolver Disputa (Solo Owner)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> resolve_dispute <ORDER_ID> <1_o_0>
```

**Donde:**
- `1` = Liberar fondos al vendedor
- `0` = Devolver fondos al comprador

#### 7. Retirar Comisiones (Solo Owner)

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> withdraw_fees
```

#### 8. Ver Órdenes de un Usuario

```bash
./scripts/interact.sh <CONTRACT_ADDRESS> get_user_orders <USER_ADDRESS>
```

---

## 📊 Ejemplo de Flujo Completo

### Escenario: Venta de NFT

```bash
# Variables
CONTRACT=0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a
BUYER=0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1
SELLER=0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

# 1. Buyer crea una orden por 1000 tokens
./scripts/interact.sh $CONTRACT create_order $SELLER 1000

# 2. Seller transfiere el NFT al buyer (off-chain o en otro contrato)

# 3. Buyer consulta la orden para verificar
./scripts/interact.sh $CONTRACT get_order 1

# 4. Buyer confirma que recibió el NFT y completa la orden
./scripts/interact.sh $CONTRACT complete_order 1

# Resultado:
# - Seller recibe: 950 tokens (1000 - 5% comisión)
# - Plataforma acumula: 50 tokens (5% comisión)

# 5. Owner retira las comisiones acumuladas
./scripts/interact.sh $CONTRACT withdraw_fees
```

---

## 🔄 Actualizar el Contrato

Si necesitas actualizar el código del contrato:

1. **Modifica** el código en `src/lib.cairo`
2. **Compila**: `scarb build`
3. **Declara** la nueva versión:
   ```bash
   sncast --account=sepolia declare \
       --contract-name=MarketplaceEscrow \
       --network=sepolia
   ```
4. **Despliega** una nueva instancia con el nuevo `class_hash`

**Nota:** Los contratos en Starknet son inmutables. Para "actualizar", debes desplegar una nueva instancia.

---

## 🐛 Troubleshooting

### Error: "Account not found"

```bash
# Verificar que la cuenta existe
sncast account list
```

### Error: "Insufficient balance"

```bash
# Obtener más fondos del faucet
# https://blastapi.io/faucets/starknet-sepolia-eth
```

### Error: "Class already declared"

```bash
# Esto es normal, significa que el contrato ya fue declarado
# Puedes usar el class_hash existente para desplegar
```

### Ver logs de transacción

```bash
# Visita Starkscan con el transaction_hash
https://sepolia.starkscan.co/tx/<TRANSACTION_HASH>
```

---

## 📋 Información del Último Despliegue

**Contrato Desplegado:**
- **Dirección**: `0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a`
- **Class Hash**: `0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c`
- **Owner**: `0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1`
- **Fee**: 5%
- **Red**: Starknet Sepolia Testnet

**Enlaces:**
- 🔗 [Ver Contrato](https://sepolia.starkscan.co/contract/0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a)
- 🔗 [Ver Clase](https://sepolia.starkscan.co/class/0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c)

## 🔗 Integración con Frontend

Ver la carpeta `/frontend` para una interfaz completa de usuario que incluye:

- 📱 Dashboard de órdenes
- 🛒 Crear nuevas órdenes
- ✅ Completar/cancelar órdenes
- ⚖️ Sistema de disputas
- 💰 Gestión de comisiones (admin)
- 🔗 Integración con wallets (Argent X, Braavos)

## 📚 Recursos

- **Cairo Book**: https://book.cairo-lang.org/
- **Starknet Docs**: https://docs.starknet.io/
- **OpenZeppelin Cairo**: https://docs.openzeppelin.com/contracts-cairo/
- **Sepolia Explorer**: https://sepolia.starkscan.co/

## 🤝 Contribuir

Este proyecto es parte del Starknet Hackathon. Las contribuciones son bienvenidas.

## 📝 Licencia

Desarrollado para el Starknet Hackathon 2025.

---

💡 **Próximos pasos**: Integrar con frontend React/Next.js para una experiencia de usuario completa.


