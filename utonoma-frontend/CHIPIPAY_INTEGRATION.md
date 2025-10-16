# 🔗 Integración ChipiPay - UTONOMA

## 📋 **Resumen**

UTONOMA ahora integra **ChipiPay** para generar wallets embebidas automáticamente cuando los usuarios se registran o inician sesión.

## 🛠️ **Componentes Implementados**

### **1. Hook `useChipiWallet`**
- **Ubicación**: `hooks/useChipiWallet.ts`
- **Función**: Maneja la lógica de generación y obtención de wallets
- **Estados**: `wallet`, `isLoading`, `error`, `isConnected`

### **2. Componente `ChipiWalletSetup`**
- **Ubicación**: `components/ChipiWalletSetup.tsx`
- **Función**: Muestra el estado de la wallet en el perfil
- **Estados**: Verificando, Generando, Lista, Error

### **3. Componente `WalletInfo`**
- **Ubicación**: `components/WalletInfo.tsx`
- **Función**: Muestra la dirección de la wallet en el header
- **Funciones**: Copiar dirección al portapapeles

## 🔄 **Flujo de Integración**

### **Paso 1: Usuario se Registra/Inicia Sesión**
```typescript
// 1. Clerk autentica al usuario
const { user, isSignedIn } = useUser();

// 2. useChipiWallet se activa automáticamente
const { wallet, isLoading, error } = useChipiWallet();
```

### **Paso 2: Verificación de Wallet Existente**
```typescript
// Verificar si ya tiene wallet en metadata
const existingWallet = user.publicMetadata?.chipiWalletAddress;
if (existingWallet) {
  setWallet({ address: existingWallet });
  return;
}
```

### **Paso 3: Generación de Nueva Wallet**
```typescript
// Si no tiene wallet, crear una nueva
if (window.ChipiPay) {
  const newWallet = await window.ChipiPay.createWallet({
    userId: user.id,
    email: user.emailAddresses[0]?.emailAddress
  });
}
```

### **Paso 4: Actualización de UI**
- **Header**: Muestra dirección de wallet con opción de copiar
- **Perfil**: Muestra estado de la wallet (generando/lista/error)
- **Feed**: Usa la wallet para interactuar con contratos

## 🎯 **Características Implementadas**

### **✅ Generación Automática**
- Las wallets se generan automáticamente al iniciar sesión
- No requiere intervención del usuario

### **✅ Persistencia**
- Las wallets se almacenan en `user.publicMetadata`
- Se recuperan en sesiones posteriores

### **✅ Interfaz Intuitiva**
- Estados visuales claros (generando, lista, error)
- Dirección de wallet clickeable para copiar
- Diseño consistente con el tema tech

### **✅ Manejo de Errores**
- Fallback a wallet temporal si ChipiPay falla
- Mensajes de error descriptivos
- Estados de carga apropiados

## 🔧 **Configuración Requerida**

### **Variables de Entorno**
```bash
# ChipiPay
NEXT_PUBLIC_CHIPI_API_KEY=pk_prod_...
CHIPI_SECRET_KEY=sk_prod_...
NEXT_PUBLIC_CHIPI_ENV=production

# Clerk (para JWKS)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### **Layout Configuration**
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

## 🚀 **Uso en la Aplicación**

### **En el Header**
```typescript
import { WalletInfo } from "./WalletInfo";

// Muestra la dirección de la wallet
<WalletInfo />
```

### **En el Perfil**
```typescript
import { ChipiWalletSetup } from "./ChipiWalletSetup";

// Muestra el estado de la wallet
<ChipiWalletSetup />
```

### **Para Interacciones con Contratos**
```typescript
import { useChipiWallet } from "@/hooks/useChipiWallet";

const { wallet, isConnected } = useChipiWallet();

if (isConnected && wallet) {
  // Usar wallet.address para transacciones
  const tx = await contract.upload_video(wallet.address, ...);
}
```

## 🐛 **Debugging**

### **Verificar ChipiPay SDK**
```javascript
// En la consola del navegador
console.log('ChipiPay disponible:', !!window.ChipiPay);
console.log('ChipiPay SDK:', window.ChipiPay);
```

### **Verificar Wallet Generada**
```javascript
// En la consola del navegador
console.log('Wallet generada:', window.ChipiPay?.getWallet(userId));
```

### **Verificar Metadata de Usuario**
```javascript
// En la consola del navegador
console.log('User metadata:', user.publicMetadata);
console.log('ChipiPay wallet:', user.publicMetadata?.chipiWalletAddress);
```

## 📱 **Estados de la UI**

### **🔄 Generando Wallet**
- Spinner de carga
- Mensaje: "Generando tu wallet embebida..."
- Color: Púrpura

### **✅ Wallet Lista**
- Ícono de check verde
- Mensaje: "Wallet activa"
- Dirección completa mostrada
- Botón de copiar funcional

### **❌ Error**
- Ícono de alerta rojo
- Mensaje de error descriptivo
- Opción de reintentar

## 🎨 **Diseño Tech Elegante**

- **Glassmorphism**: Fondos translúcidos con blur
- **Gradientes**: Colores púrpura/azul para elementos ChipiPay
- **Animaciones**: Transiciones suaves con Framer Motion
- **Estados Visuales**: Colores distintivos para cada estado
- **Responsive**: Adaptable a móvil y desktop

## 🔮 **Próximos Pasos**

1. **Integración con Contratos**: Usar la wallet para transacciones
2. **Balance Display**: Mostrar balance de VERSY tokens
3. **Transaction History**: Historial de transacciones
4. **Multi-wallet Support**: Soporte para múltiples wallets
5. **Backup/Recovery**: Opciones de respaldo de wallet

---

**¡La integración de ChipiPay está completa y funcionando!** 🎉
