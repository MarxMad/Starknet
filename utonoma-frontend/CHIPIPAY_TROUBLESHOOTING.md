# 🔧 ChipiPay Troubleshooting Guide

## 🚨 **Problema Actual**
```
useChipiWallet.ts:34 ChipiPay SDK no está disponible
```

## 🔍 **Diagnóstico**

### **1. Verificar Configuración**
```bash
# Ejecutar script de verificación
node scripts/check-chipipay.js
```

### **2. Verificar Variables de Entorno**
```bash
# Verificar que las variables estén cargadas
echo $NEXT_PUBLIC_CHIPI_API_KEY
echo $NEXT_PUBLIC_CHIPI_ENV
```

### **3. Verificar en el Navegador**
Abrir la consola del navegador y ejecutar:
```javascript
// Verificar si ChipiPay está disponible
console.log('ChipiPay disponible:', !!window.ChipiPay);
console.log('ChipiPay objeto:', window.ChipiPay);

// Verificar variables de entorno
console.log('API Key:', process.env.NEXT_PUBLIC_CHIPI_API_KEY);
console.log('Environment:', process.env.NEXT_PUBLIC_CHIPI_ENV);
```

## 🛠️ **Soluciones**

### **Solución 1: Reiniciar Servidor**
```bash
# Detener servidor
pkill -f "npm run dev"

# Limpiar caché
rm -rf .next

# Reiniciar
npm run dev
```

### **Solución 2: Verificar Instalación**
```bash
# Reinstalar ChipiPay
npm uninstall @chipi-stack/nextjs
npm install @chipi-stack/nextjs@latest
```

### **Solución 3: Verificar Layout**
Asegurar que `app/layout.tsx` tenga:
```typescript
<ClerkProvider>
  <ChipiProvider>
    <StarknetProvider>
      {children}
    </StarknetProvider>
  </ChipiProvider>
</ClerkProvider>
```

### **Solución 4: Verificar Variables de Entorno**
Asegurar que `.env.local` tenga:
```bash
NEXT_PUBLIC_CHIPI_API_KEY=pk_prod_...
CHIPI_SECRET_KEY=sk_prod_...
NEXT_PUBLIC_CHIPI_ENV=production
```

## 🔄 **Flujo de Debug**

### **Paso 1: Verificar Componente ChipiPayLoader**
- Debe mostrar estado de carga
- Debe mostrar variables de entorno
- Debe permitir reintentar

### **Paso 2: Verificar Consola del Navegador**
- Buscar errores de ChipiPay
- Verificar que SDK se carga
- Verificar variables de entorno

### **Paso 3: Verificar Network Tab**
- Buscar requests a ChipiPay
- Verificar que no hay errores 404
- Verificar que las variables se envían

## 🎯 **Estados Esperados**

### **✅ Configuración Correcta**
```
ChipiPay SDK Status: ✅ ChipiPay SDK cargado correctamente
API Key: Present
Environment: production
```

### **❌ Configuración Incorrecta**
```
ChipiPay SDK Status: ❌ ChipiPay SDK no se pudo cargar
API Key: Missing
Environment: Not set
```

## 🚀 **Próximos Pasos**

1. **Verificar el componente ChipiPayLoader** en la UI
2. **Revisar la consola** del navegador
3. **Verificar variables de entorno** en el navegador
4. **Reiniciar servidor** si es necesario
5. **Reinstalar ChipiPay** si persiste el problema

## 📞 **Soporte**

Si el problema persiste:
1. Verificar documentación de ChipiPay
2. Revisar logs del servidor
3. Verificar configuración de Clerk
4. Contactar soporte de ChipiPay

---

**¡Sigue estos pasos para resolver el problema de ChipiPay!** 🔧
