# 💎 ChipiPay - Embedded Wallets para UTONOMA

## 🎯 ¿Qué es ChipiPay?

ChipiPay permite crear **wallets embebidas** (Embedded Wallets) en Starknet usando solo un email. Los usuarios NO necesitan instalar ArgentX o Braavos.

### Ventajas:
- ✅ Wallet creada automáticamente con email
- ✅ No necesita extensión de navegador
- ✅ Onboarding súper simple
- ✅ Compatible con Starknet
- ✅ Integración con Clerk

---

## 🔧 Configuración (YA COMPLETADA)

### ✅ 1. SDK Instalado
```bash
npm install @chipi-stack/nextjs
```

### ✅ 2. Variables de entorno configuradas
```bash
# .env.local
NEXT_PUBLIC_CHIPI_API_KEY=pk_prod_...
CHIPI_SECRET_KEY=sk_prod_...
```

### ✅ 3. Providers configurados
```typescript
// app/layout.tsx
<ClerkProvider>
  <ChipiProvider>
    <StarknetProvider>
      {children}
    </StarknetProvider>
  </ChipiProvider>
</ClerkProvider>
```

### ✅ 4. JWKS URL configurado en ChipiPay Dashboard
```
https://sweeping-doe-10.clerk.accounts.dev/.well-known/jwks.json
```

---

## 🚀 Cómo usar ChipiPay en UTONOMA

### Flujo de usuario:

1. **Usuario se registra con email** (Clerk)
2. **ChipiPay crea automáticamente una wallet** en Starknet
3. **Usuario puede usar la wallet** sin instalar nada
4. **Transacciones on-chain** funcionan igual que con ArgentX/Braavos

### Ejemplo de código:

```typescript
import { useChipi } from "@chipi-stack/nextjs";
import { useUser } from "@clerk/nextjs";

export function MyComponent() {
  const { user } = useUser();
  const { wallet, isConnected } = useChipi();
  
  if (isConnected) {
    return <p>Wallet: {wallet.address}</p>;
  }
  
  return <p>Conectando wallet...</p>;
}
```

---

## 🔗 Integración con UTONOMA

UTONOMA ahora soporta **3 formas de autenticación**:

### 1. Email/OAuth (Clerk + ChipiPay)
- Usuario se registra con email
- ChipiPay crea wallet automáticamente
- Wallet embebida lista para usar

### 2. Starknet Wallet (ArgentX/Braavos)
- Usuario conecta wallet existente
- No necesita email
- Para usuarios avanzados

### 3. Ambas combinadas
- Usuario se registra con email (Clerk)
- Usuario conecta wallet externa (ArgentX)
- Dos wallets disponibles

---

## 🎨 Componentes de ChipiPay

### ChipiWalletButton
```typescript
import { ChipiWalletButton } from "@chipi-stack/nextjs";

<ChipiWalletButton />
```

### ChipiWalletInfo
```typescript
import { ChipiWalletInfo } from "@chipi-stack/nextjs";

<ChipiWalletInfo />
```

### useChipi Hook
```typescript
import { useChipi } from "@chipi-stack/nextjs";

const { 
  wallet,        // Wallet address
  isConnected,   // Connection status
  connect,       // Connect function
  disconnect     // Disconnect function
} = useChipi();
```

---

## 💰 Transacciones con ChipiPay

### Enviar transacción:
```typescript
import { useChipi } from "@chipi-stack/nextjs";
import { Contract } from "starknet";

const { wallet } = useChipi();

const contract = new Contract(abi, contractAddress, wallet);
await contract.upload_video(ipfsHash, title);
```

**Es EXACTAMENTE igual** que con ArgentX/Braavos, pero sin extensión.

---

## 🔒 Seguridad

### ChipiPay maneja:
- ✅ Generación segura de wallets
- ✅ Almacenamiento encriptado de private keys
- ✅ Recovery con email
- ✅ 2FA (opcional)
- ✅ Verificación de transacciones

### Usuario NO ve:
- Private keys (manejadas por ChipiPay)
- Seed phrases (almacenadas de forma segura)

### Usuario SÍ puede:
- Recuperar wallet con email
- Ver historial de transacciones
- Exportar wallet (si quiere)

---

## 📊 Ventajas vs. Wallets tradicionales

| Característica | ChipiPay | ArgentX/Braavos |
|---------------|----------|-----------------|
| Instalación | ❌ No necesita | ✅ Extensión requerida |
| Onboarding | 🚀 1 click | 🐢 5+ pasos |
| Recovery | 📧 Email | 🔑 Seed phrase |
| Mobile | ✅ Funciona | ⚠️ Limitado |
| UX | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🌐 JWKS Configuration

El JWKS (JSON Web Key Set) permite a ChipiPay verificar usuarios de Clerk:

**JWKS URL:** `https://sweeping-doe-10.clerk.accounts.dev/.well-known/jwks.json`

Esto debe estar configurado en el Dashboard de ChipiPay para que funcione la integración.

---

## 🆘 Troubleshooting

### Error: "ChipiProvider not found"
- Verifica que `<ChipiProvider>` esté en `app/layout.tsx`
- Debe estar DENTRO de `<ClerkProvider>`

### Error: "Invalid API Key"
- Verifica las keys en `.env.local`
- Reinicia el servidor: `npm run dev`

### Wallet no se crea automáticamente
- Usuario debe estar logueado con Clerk primero
- ChipiPay espera a que Clerk termine la autenticación
- Puede tomar 1-2 segundos

### Transacciones fallan
- Verifica que la wallet tenga ETH para gas
- Usa el faucet de Starknet Sepolia
- Verifica que el contrato esté desplegado

---

## 📱 Próximos pasos

### 1. Actualizar página de perfil
Mostrar la wallet de ChipiPay en el perfil del usuario:
```typescript
<ChipiWalletInfo />
```

### 2. Agregar botón de "Top up"
Permitir a usuarios agregar fondos a su wallet:
```typescript
<ChipiTopUpButton />
```

### 3. Historial de transacciones
Mostrar transacciones de la wallet embebida.

---

## 📚 Recursos

- [ChipiPay Docs](https://docs.chipipay.com)
- [Clerk + ChipiPay Integration](https://docs.chipipay.com/integrations/clerk)
- [Starknet + ChipiPay](https://docs.chipipay.com/networks/starknet)
- [ChipiPay Dashboard](https://dashboard.chipipay.com)

---

## ✅ Estado de la integración

- ✅ SDK instalado
- ✅ Variables de entorno configuradas
- ✅ Providers configurados
- ✅ JWKS configurado
- ⏳ Componentes UI (próximo)

**¡ChipiPay está listo para usarse!** 🎉

---

**Última actualización:** 15 de Octubre, 2025  
**Proyecto:** UTONOMA

