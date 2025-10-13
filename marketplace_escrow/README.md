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

## 🛠️ Despliegue

### 1. Configurar Scarb.toml

Ya configurado con:
- Starknet 2.11.4
- OpenZeppelin v0.20.0
- Starknet Foundry 0.44.0

### 2. Compilar

```bash
scarb build
```

### 3. Declarar en Sepolia

```bash
sncast --profile sepolia declare \
    --contract-name MarketplaceEscrow \
    --max-fee auto
```

### 4. Desplegar

```bash
sncast --profile sepolia deploy \
    --class-hash <CLASS_HASH> \
    --constructor-calldata <OWNER_ADDRESS> 5 0 \
    --max-fee auto
```

**Constructor args:**
- `owner`: Dirección del propietario de la plataforma
- `fee_percent`: Porcentaje de comisión (5 = 5%)

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

