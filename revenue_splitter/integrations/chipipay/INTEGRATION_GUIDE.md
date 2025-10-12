# 🚀 Guía de Integración ChipiPay + RevenueSplitter

## Casos de Uso

### 🎯 Caso 1: Plataforma de Subscripciones

Recibe pagos recurrentes de usuarios y distribuye automáticamente entre:
- Equipo de desarrollo (50%)
- Marketing (30%)
- Soporte (20%)

```javascript
// 1. Usuario paga subscripción via ChipiPay
const payment = await integration.createPayment('100', 'USD', 'Monthly subscription');

// 2. Webhook automático deposita al contrato
// (se dispara cuando el pago se completa)

// 3. Al final del mes, distribuyes los fondos
await integration.distribute();
```

### 💼 Caso 2: Freelancer Colectivo

Múltiples freelancers trabajan en proyectos y comparten ingresos:

```javascript
// Configurar shares por freelancer
const freelancers = [
  { address: '0xFreelancer1...', shares: '40', name: 'Designer' },
  { address: '0xFreelancer2...', shares: '35', name: 'Developer' },
  { address: '0xFreelancer3...', shares: '25', name: 'PM' }
];

// Agregar todos los freelancers
for (const freelancer of freelancers) {
  await integration.addRecipient(freelancer.address, freelancer.shares);
}

// Cuando llega un pago de cliente
await integration.deposit(paymentAmount);

// Distribuir al completar el proyecto
await integration.distribute();
```

### 🏪 Caso 3: Marketplace con Comisiones

Plataforma que cobra comisión y la distribuye:

```javascript
// Venta de $1000 USD
// - 70% para el vendedor
// - 20% para la plataforma
// - 10% para afiliado

const recipients = [
  { address: vendorAddress, shares: '70' },
  { address: platformAddress, shares: '20' },
  { address: affiliateAddress, shares: '10' }
];

// Configurar para esta transacción
// (puedes remover y re-agregar recipients dinámicamente)
```

## 🔄 Flujos de Trabajo

### Flujo 1: Pago Manual

```mermaid
Usuario → ChipiPay → Depósito Manual → Contrato → Distribución
```

```bash
# 1. Crear pago
node scripts/deposit.js 1000000000000000000

# 2. Verificar
node scripts/check-balance.js

# 3. Distribuir
node scripts/distribute.js
```

### Flujo 2: Webhook Automatizado

```mermaid
Usuario → ChipiPay → Webhook → Depósito Auto → Contrato
```

```javascript
// Servidor con webhook
app.post('/webhook', async (req, res) => {
  const { event, payment } = req.body;
  
  if (event === 'payment.succeeded') {
    // Depositar automáticamente
    await integration.deposit(payment.amount);
  }
  
  res.json({ success: true });
});
```

### Flujo 3: Distribución Programada

```mermaid
Cron Job → Check Balance → Distribute → Notify
```

```javascript
// Usando node-cron
import cron from 'node-cron';

// Distribuir cada viernes a las 18:00
cron.schedule('0 18 * * 5', async () => {
  const balance = await integration.getBalance();
  
  if (balance > 0) {
    await integration.distribute();
    // Enviar notificaciones...
  }
});
```

## 💡 Mejores Prácticas

### 1. Gestión de Shares

```javascript
// ✅ BUENO: Usar porcentajes que sumen 100
await integration.addRecipient(addr1, '50');  // 50%
await integration.addRecipient(addr2, '30');  // 30%
await integration.addRecipient(addr3, '20');  // 20%

// ❌ MALO: Shares arbitrarios difíciles de entender
await integration.addRecipient(addr1, '12345');
await integration.addRecipient(addr2, '67890');
```

### 2. Manejo de Errores

```javascript
try {
  await integration.deposit(amount);
} catch (error) {
  if (error.message.includes('Insufficient balance')) {
    console.log('Necesitas más ETH para fees');
  } else if (error.message.includes('Amount must be greater than 0')) {
    console.log('El monto debe ser mayor a 0');
  } else {
    console.log('Error:', error.message);
  }
}
```

### 3. Logging y Auditoría

```javascript
import fs from 'fs';

// Guardar cada transacción
const logTransaction = (type, txHash, amount) => {
  const log = {
    timestamp: new Date().toISOString(),
    type,
    txHash,
    amount,
    network: 'sepolia'
  };
  
  fs.appendFileSync('transactions.log', JSON.stringify(log) + '\n');
};

// Usar en cada operación
const txHash = await integration.deposit(amount);
logTransaction('deposit', txHash, amount);
```

### 4. Testing

```javascript
// Probar en testnet primero
const TEST_AMOUNT = '1000000000000000'; // 0.001 ETH

console.log('Testing deposit...');
await integration.deposit(TEST_AMOUNT);

console.log('Testing distribution...');
await integration.distribute();

console.log('All tests passed!');
```

## 🔐 Seguridad Avanzada

### Validación de Webhooks

```javascript
import crypto from 'crypto';

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-chipipay-signature'];
  const secret = process.env.CHIPIPAY_WEBHOOK_SECRET;
  
  if (!verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Procesar webhook...
});
```

### Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por ventana
});

app.use('/webhook', limiter);
```

## 📊 Monitoreo y Analytics

### Dashboard Simple

```javascript
async function getDashboardData() {
  const balance = await integration.getBalance();
  const totalShares = await integration.getTotalShares();
  
  return {
    balance,
    balanceEth: Number(BigInt(balance) / BigInt(10**18)),
    totalShares,
    timestamp: new Date().toISOString()
  };
}

// Guardar métricas cada hora
setInterval(async () => {
  const data = await getDashboardData();
  fs.appendFileSync('metrics.json', JSON.stringify(data) + '\n');
}, 3600000);
```

## 🚀 Despliegue en Producción

### Checklist

- [ ] Cambiar de Sepolia a Mainnet
- [ ] Actualizar RPC URL a mainnet
- [ ] Usar API keys de producción de ChipiPay
- [ ] Configurar webhooks en producción
- [ ] Implementar monitoreo y alertas
- [ ] Configurar backup de claves
- [ ] Auditar el contrato
- [ ] Probar con montos pequeños primero

### Variables de Entorno para Producción

```env
# Mainnet Configuration
STARKNET_NETWORK=mainnet
STARKNET_RPC_URL=https://starknet-mainnet.public.blastapi.io/rpc/v0_7
REVENUE_SPLITTER_CONTRACT=0x... # Mainnet contract

# Production API Keys
CHIPIPAY_API_KEY=prod_key_here
CHIPIPAY_ORG_ID=org_production_id

# Security
NODE_ENV=production
LOG_LEVEL=info
```

## 📞 Soporte

¿Tienes preguntas? Consulta:

1. [README principal de ChipiPay Integration](./README.md)
2. [Dashboard de ChipiPay](https://dashboard.chipipay.com/org_33vpjluOC74vqNNmLK6YcmicTgu-dev)
3. [Documentación del contrato](../../README.md)

---

Creado para Starknet Hackathon 🚀

