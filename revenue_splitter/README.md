# RevenueSplitter - Contrato Cairo

## Descripción

RevenueSplitter es un contrato inteligente en Cairo 1.0 para Starknet que permite distribuir ingresos entre múltiples receptores según sus participaciones. El contrato implementa matemática segura con u256 para prevenir overflow y underflow.

## Características

- ✅ **Depósito de fondos**: Permite depositar fondos que serán distribuidos
- ✅ **Distribución proporcional**: Distribuye fondos según las participaciones de cada receptor
- ✅ **Control de acceso**: Usa OpenZeppelin Ownable para control de propietario
- ✅ **Matemática segura u256**: Protección contra overflow/underflow con operaciones checked
- ✅ **Gestión de receptores**: Agregar y remover receptores con sus participaciones
- ✅ **Eventos**: Emite eventos para todas las operaciones importantes

## Estructura del Proyecto

```
revenue_splitter/
├── Scarb.toml                      # Configuración del proyecto
├── snfoundry.toml                  # Configuración de Starknet Foundry
├── src/
│   └── lib.cairo                   # Implementación del contrato
├── tests/
│   └── test_revenue_splitter.cairo # Tests de integración
├── scripts/
│   ├── declare.sh                  # Script para declarar el contrato
│   └── deploy.sh                   # Script para desplegar el contrato
├── README.md                       # Este archivo
└── DEPLOYMENT.md                   # Guía completa de despliegue
```

## Funciones Principales

### Funciones Públicas

- `deposit(amount: u256)` - Deposita fondos en el contrato
- `distribute()` - Distribuye los fondos entre los receptores (solo owner)
- `add_recipient(recipient: ContractAddress, shares: u256)` - Agrega un receptor con sus participaciones (solo owner)
- `remove_recipient(recipient: ContractAddress)` - Remueve un receptor (solo owner)
- `get_recipient_shares(recipient: ContractAddress) -> u256` - Obtiene las participaciones de un receptor
- `get_total_shares() -> u256` - Obtiene el total de participaciones
- `get_balance() -> u256` - Obtiene el balance actual del contrato
- `get_pending_distribution(recipient: ContractAddress) -> u256` - Calcula la distribución pendiente para un receptor

## Compilación

```bash
scarb build
```

## Tests

El proyecto incluye 4 tests de integración:

1. **test_deposit_and_distribute**: Verifica el depósito y distribución correcta de fondos
2. **test_unauthorized_distribution**: Verifica que solo el owner puede distribuir
3. **test_rounding_edge_case**: Verifica el manejo de casos de redondeo
4. **test_overflow_check**: Verifica la protección contra overflow

Para ejecutar los tests:

```bash
scarb test
```

## Resultados de los Tests

```
Tests: 4 passed, 0 failed, 0 skipped, 0 ignored
```

## Seguridad

- ✅ Matemática segura con operaciones `checked_add`, `checked_sub`, `checked_mul`
- ✅ Validaciones de entrada (amounts > 0, direcciones válidas)
- ✅ Control de acceso con OpenZeppelin Ownable
- ✅ Protección contra overflow/underflow
- ✅ Validación de existencia de receptores

## Dependencias

- starknet 2.11.4
- openzeppelin_access v0.20.0
- snforge_std 0.44.0 (dev)
- assert_macros 2.11.4 (dev)

## Eventos

- `Deposit`: Se emite al depositar fondos
- `Distribution`: Se emite por cada receptor al distribuir
- `RecipientAdded`: Se emite al agregar un receptor
- `RecipientRemoved`: Se emite al remover un receptor
- `OwnershipTransferred`: Se emite al transferir la propiedad (de OpenZeppelin)

## 💳 Integración con ChipiPay

Este proyecto incluye una integración completa con [ChipiPay](https://dashboard.chipipay.com) para facilitar el procesamiento de pagos y depósitos.

### Características de la Integración

- ✅ Procesamiento de pagos con ChipiPay API
- ✅ Depósitos automáticos mediante webhooks
- ✅ Scripts JavaScript para interactuar con el contrato
- ✅ Soporte para múltiples tokens (ETH, USDC, USDT, STRK)

### Inicio Rápido con ChipiPay

```bash
# 1. Instalar dependencias
cd integrations/chipipay
npm install

# 2. Configurar variables de entorno
cp env.example .env
# Edita .env con tus credenciales

# 3. Depositar fondos
node scripts/deposit.js 1000000000000000000

# 4. Distribuir fondos
node scripts/distribute.js
```

📚 **Documentación completa**: Ver [integrations/chipipay/README.md](./integrations/chipipay/README.md)

## Despliegue en Starknet

Para desplegar este contrato en la testnet de Starknet (Sepolia), consulta la guía completa en [DEPLOYMENT.md](./DEPLOYMENT.md).

### Guía Rápida de Despliegue

1. **Declarar el contrato:**
   ```bash
   ./scripts/declare.sh
   ```

2. **Desplegar el contrato:**
   ```bash
   ./scripts/deploy.sh <CLASS_HASH> <OWNER_ADDRESS>
   ```

3. **Verificar en Starkscan:**
   ```
   https://sepolia.starkscan.co/contract/<CONTRACT_ADDRESS>
   ```

Para más detalles, consulta [DEPLOYMENT.md](./DEPLOYMENT.md).

## Ejemplo de Uso

```cairo
// 1. Deploy el contrato con un owner
let owner = starknet::contract_address_const::<'owner'>();
// ... deploy con owner ...

// 2. Agregar receptores (como owner)
dispatcher.add_recipient(recipient1, 50);  // 50%
dispatcher.add_recipient(recipient2, 30);  // 30%
dispatcher.add_recipient(recipient3, 20);  // 20%

// 3. Depositar fondos (cualquiera puede depositar)
dispatcher.deposit(1000);

// 4. Distribuir fondos (solo owner)
dispatcher.distribute();
// recipient1 recibe 500
// recipient2 recibe 300
// recipient3 recibe 200
```

## Licencia

Este proyecto fue creado como parte del Starknet Hackathon.

