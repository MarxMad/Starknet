# 💳 ChipiPay Integration - RevenueSplitter

Integración completa de ChipiPay con el contrato RevenueSplitter en Starknet, permitiendo procesar pagos y distribuir ingresos de manera automatizada.

## 🎯 Características

- ✅ **Procesamiento de pagos** con ChipiPay
- ✅ **Depósitos automáticos** al contrato
- ✅ **Distribución programática** de fondos
- ✅ **Gestión de receptores** desde JavaScript
- ✅ **Webhooks** para automatización
- ✅ **Soporte multi-token** (ETH, USDC, USDT, STRK)

## 📦 Instalación

### 1. Instalar dependencias

```bash
cd integrations/chipipay
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp env.example .env
```

Edita el archivo `.env` con tus valores:

```env
# ChipiPay
CHIPIPAY_API_KEY=tu_api_key_aqui
CHIPIPAY_ORG_ID=org_33vpjluOC74vqNNmLK6YcmicTgu-dev

# Starknet
STARKNET_NETWORK=sepolia
REVENUE_SPLITTER_CONTRACT=0x... # Tu contrato desplegado

# Account
ACCOUNT_ADDRESS=0x... # Tu dirección
ACCOUNT_PRIVATE_KEY=0x... # Tu clave privada
```

### 3. Obtener API Key de ChipiPay

1. Ve a [ChipiPay Dashboard](https://dashboard.chipipay.com/org_33vpjluOC74vqNNmLK6YcmicTgu-dev)
2. Navega a **API Keys** en el menú
3. Crea una nueva API key
4. Cópiala a tu archivo `.env`

## 🚀 Uso

### Verificar Balance

```bash
node scripts/check-balance.js
```

Ejemplo de salida:
```
💰 Balance del contrato:
   Wei: 1000000000000000000
   ETH: 1.000000

✅ El contrato tiene fondos disponibles
```

### Depositar Fondos

```bash
node scripts/deposit.js <AMOUNT_IN_WEI>
```

Ejemplos:
```bash
# Depositar 1 ETH
node scripts/deposit.js 1000000000000000000

# Depositar 0.1 ETH
node scripts/deposit.js 100000000000000000

# Depositar 0.001 ETH
node scripts/deposit.js 1000000000000000
```

### Configurar Receptores

Primero, crea un archivo JSON con los receptores:

```json
{
  "recipients": [
    {
      "name": "Equipo Dev",
      "address": "0x0123...",
      "shares": "50"
    },
    {
      "name": "Marketing",
      "address": "0x0456...",
      "shares": "30"
    },
    {
      "name": "Operaciones",
      "address": "0x0789...",
      "shares": "20"
    }
  ]
}
```

Luego ejecuta:

```bash
node scripts/setup-recipients.js recipients.json
```

### Distribuir Fondos

```bash
node scripts/distribute.js
```

## 📊 Flujo Completo

```bash
# 1. Configurar receptores
node scripts/setup-recipients.js recipients.json

# 2. Depositar fondos
node scripts/deposit.js 1000000000000000000

# 3. Verificar balance
node scripts/check-balance.js

# 4. Distribuir fondos
node scripts/distribute.js

# 5. Verificar que el balance es 0
node scripts/check-balance.js
```

## 🔗 Integración con ChipiPay API

### Crear un Pago

```javascript
import ChipiPayIntegration from './index.js';

const integration = new ChipiPayIntegration();

// Crear un pago de 100 USD
const payment = await integration.createPayment(
  '100',
  'USD',
  'Pago por servicios'
);

console.log('Payment URL:', payment.payment_url);
console.log('Payment ID:', payment.id);
```

### Procesar Webhooks

Los webhooks de ChipiPay pueden automatizar el proceso de depósito:

```javascript
import ChipiPayIntegration from './index.js';

const integration = new ChipiPayIntegration();

// En tu servidor Express/Fastify
app.post('/webhook/chipipay', async (req, res) => {
  const webhookData = req.body;
  
  await integration.handleWebhook(webhookData);
  
  res.json({ success: true });
});
```

## 🎮 Uso Programático

### Ejemplo Completo

```javascript
import ChipiPayIntegration from './integrations/chipipay/index.js';

async function example() {
  const integration = new ChipiPayIntegration();
  
  // 1. Agregar receptores
  await integration.addRecipient(
    '0x0123...',  // address
    '50'          // shares
  );
  
  // 2. Crear pago con ChipiPay (opcional)
  const payment = await integration.createPayment(
    '1000000000000000000',  // 1 ETH
    'ETH',
    'Deposit to RevenueSplitter'
  );
  
  // 3. O depositar directamente
  await integration.deposit('1000000000000000000');
  
  // 4. Verificar balance
  const balance = await integration.getBalance();
  console.log('Balance:', balance);
  
  // 5. Distribuir
  await integration.distribute();
}

example();
```

## 🔐 Seguridad

### Variables de Entorno

⚠️ **NUNCA** commits el archivo `.env` con tus claves privadas.

El archivo `.gitignore` ya está configurado para excluir `.env`:

```gitignore
.env
node_modules/
```

### API Keys

- Guarda tus API keys de forma segura
- Usa diferentes keys para desarrollo y producción
- Rota las keys periódicamente
- Limita los permisos de las keys según sea necesario

## 🌐 Webhooks de ChipiPay

Para recibir notificaciones automáticas de pagos:

### 1. Configurar Webhook en ChipiPay Dashboard

1. Ve a [ChipiPay Dashboard](https://dashboard.chipipay.com/org_33vpjluOC74vqNNmLK6YcmicTgu-dev)
2. Navega a **Webhooks**
3. Agrega tu URL: `https://tu-dominio.com/webhook/chipipay`
4. Selecciona eventos: `payment.succeeded`, `payment.failed`

### 2. Ejemplo de Servidor con Webhooks

```javascript
import express from 'express';
import ChipiPayIntegration from './integrations/chipipay/index.js';

const app = express();
app.use(express.json());

const integration = new ChipiPayIntegration();

app.post('/webhook/chipipay', async (req, res) => {
  try {
    await integration.handleWebhook(req.body);
    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});
```

## 📚 API Reference

### ChipiPayIntegration

#### Constructor

```javascript
const integration = new ChipiPayIntegration();
```

#### Métodos

##### `createPayment(amount, currency, description)`

Crea un pago con ChipiPay.

```javascript
const payment = await integration.createPayment(
  '1000000000000000000',  // amount in wei
  'ETH',                   // currency
  'Payment description'    // description
);
```

##### `deposit(amount)`

Deposita fondos en el contrato.

```javascript
const txHash = await integration.deposit('1000000000000000000');
```

##### `addRecipient(address, shares)`

Agrega un receptor con sus shares.

```javascript
const txHash = await integration.addRecipient(
  '0x0123...',  // recipient address
  '50'          // shares
);
```

##### `distribute()`

Distribuye los fondos entre los receptores.

```javascript
const txHash = await integration.distribute();
```

##### `getBalance()`

Obtiene el balance actual del contrato.

```javascript
const balance = await integration.getBalance();
console.log('Balance:', balance, 'wei');
```

##### `handleWebhook(webhookData)`

Procesa webhooks de ChipiPay.

```javascript
await integration.handleWebhook(req.body);
```

## 🔧 Solución de Problemas

### Error: "Account not initialized"

**Solución**: Asegúrate de que `.env` tiene configurado `ACCOUNT_ADDRESS` y `ACCOUNT_PRIVATE_KEY`.

### Error: "Contract not deployed"

**Solución**: Despliega el contrato primero y actualiza `REVENUE_SPLITTER_CONTRACT` en `.env`.

### Error: "Insufficient balance"

**Solución**: Necesitas ETH en tu cuenta para pagar las fees. Obtén fondos del [faucet](https://starknet-faucet.vercel.app/).

### Error: "ChipiPay API error"

**Solución**: Verifica que tu `CHIPIPAY_API_KEY` es correcta y tiene los permisos necesarios.

## 📖 Recursos

- **ChipiPay Dashboard**: https://dashboard.chipipay.com/org_33vpjluOC74vqNNmLK6YcmicTgu-dev
- **Starknet Docs**: https://docs.starknet.io/
- **Sepolia Explorer**: https://sepolia.starkscan.co/
- **Faucet**: https://starknet-faucet.vercel.app/

## 🤝 Soporte

¿Necesitas ayuda?

- Revisa la [documentación principal](../../README.md)
- Revisa la [guía de despliegue](../../DEPLOYMENT.md)
- Contacta al equipo de ChipiPay en su dashboard

## 📝 Notas

- Esta integración está diseñada para Starknet Sepolia (testnet)
- Para producción, actualiza las URLs y usa mainnet
- Mantén tus claves privadas seguras
- Prueba todo en testnet antes de usar en mainnet

---

¡Listo para procesar pagos con ChipiPay! 💳🚀

