# 🧪 Cómo Verificar ChipiPay - Guía Completa

## ✅ Estado Actual

**ChipiPay está configurado y listo para usar.** Las API keys están en `.env.local` y el `ChipiProvider` está correctamente integrado.

---

## 🚀 Método 1: Página de Test (RECOMENDADO)

He creado una página especial para verificar ChipiPay:

### Acceder a la página de test:

```
http://localhost:3000/test-chipipay
```

### Lo que verás:

1. **Si NO estás logueado:**
   - Mensaje para iniciar sesión
   - Botones de Sign In / Sign Up

2. **Si estás logueado:**
   - ✅ **Componente ChipiWalletInfo** mostrando:
     - Tu email/nombre de usuario
     - Dirección de wallet (si ya se generó)
     - Estado de la wallet (Activa / Configurando)
     - Botón para copiar dirección
   - 📋 **Instrucciones** de cómo funciona ChipiPay
   - 🔧 **Detalles técnicos** de la configuración
   - ⚠️ **Troubleshooting** si algo no funciona

---

## 🔍 Método 2: Consola del Navegador

### Paso 1: Iniciar sesión
1. Ve a http://localhost:3000
2. Haz clic en "Sign up" o "Sign in"
3. Completa el registro con tu email

### Paso 2: Abrir DevTools
1. Presiona `F12` o `Cmd+Opt+I` (Mac)
2. Ve a la pestaña **Console**

### Paso 3: Verificar Clerk User
En la consola, ejecuta:

```javascript
// Ver información del usuario de Clerk
console.log('Clerk User:', window.Clerk?.user);

// Ver metadata (donde debería estar la wallet)
console.log('Metadata:', window.Clerk?.user?.publicMetadata);
```

### Paso 4: Buscar la wallet de ChipiPay
Si ChipiPay está funcionando, deberías ver algo como:

```javascript
{
  publicMetadata: {
    chipiWalletAddress: "0x1234567890abcdef...",
    // ... otros datos
  }
}
```

---

## 📊 Método 3: Network Tab (Verificar Requests)

### Paso 1: Abrir Network Tab
1. `F12` → Pestaña **Network**
2. Filtra por "chipi" o "clerk"

### Paso 2: Registrarse/Iniciar sesión
1. Completa el proceso de auth con Clerk

### Paso 3: Buscar requests
Deberías ver requests a:
- `clerk.accounts.dev` (autenticación)
- `api.chipipay.com` (si hay requests de ChipiPay)

---

## 🎯 ¿Cómo saber si funciona?

### ✅ Señales de éxito:

1. **Página de test muestra:**
   - ✓ Usuario logueado
   - ✓ Email visible
   - ✓ "Wallet Activa" o "Configurando..."
   - ✓ Dirección de wallet (puede tardar unos segundos)

2. **En consola:**
   - ✓ `window.Clerk.user` tiene datos
   - ✓ `publicMetadata` existe
   - ✓ No hay errores en rojo

3. **Sin errores:**
   - ✓ No hay warnings de ChipiProvider
   - ✓ No hay errores de JWKS

### ⚠️ Señales de problema:

1. **"Wallet en proceso de creación" permanece mucho tiempo:**
   - Problema: JWKS no configurado en ChipiPay Dashboard
   - Solución: Ver sección "Configurar JWKS"

2. **Error en consola:**
   ```
   ChipiProvider: Invalid API Key
   ```
   - Problema: API keys incorrectas
   - Solución: Verificar `.env.local`

3. **Error CORS:**
   ```
   Access-Control-Allow-Origin
   ```
   - Problema: Dominio no autorizado en ChipiPay
   - Solución: Agregar `localhost:3000` en Dashboard

---

## 🔧 Configurar JWKS en ChipiPay Dashboard

**IMPORTANTE:** ChipiPay necesita el JWKS URL de Clerk para verificar usuarios.

### Paso 1: Obtener JWKS URL

Tu JWKS URL es:
```
https://daring-macaw-73.clerk.accounts.dev/.well-known/jwks.json
```

### Paso 2: Configurar en ChipiPay

1. Ve a https://dashboard.chipipay.com
2. Abre tu proyecto UTONOMA
3. Busca **"Authentication"** o **"JWKS Configuration"**
4. Pega la URL:
   ```
   https://daring-macaw-73.clerk.accounts.dev/.well-known/jwks.json
   ```
5. Guarda los cambios

### Paso 3: Verificar

1. Cierra sesión en UTONOMA
2. Regístrate de nuevo con un nuevo email
3. Ve a `/test-chipipay`
4. Debería aparecer la wallet en unos segundos

---

## 🧪 Test Completo - Checklist

Marca cada paso al completarlo:

- [ ] 1. Servidor corriendo (`npm run dev`)
- [ ] 2. Ve a `http://localhost:3000`
- [ ] 3. Haz clic en "Sign up"
- [ ] 4. Regístrate con email
- [ ] 5. Verifica email (si lo pide Clerk)
- [ ] 6. Ve a `http://localhost:3000/test-chipipay`
- [ ] 7. ¿Ves tu email? → ✅
- [ ] 8. ¿Ves "Wallet Activa"? → ✅
- [ ] 9. ¿Hay dirección de wallet? → ✅
- [ ] 10. ¿Puedes copiar la dirección? → ✅

Si todos los pasos tienen ✅, **ChipiPay está funcionando correctamente**. 🎉

---

## 🐛 Troubleshooting Común

### Problema 1: "Wallet en proceso de creación" por mucho tiempo

**Causa:** JWKS no configurado en ChipiPay

**Solución:**
1. Verifica el JWKS URL en ChipiPay Dashboard
2. Asegúrate de que coincida con tu Clerk project
3. Espera 1-2 minutos para propagación
4. Cierra sesión y vuelve a registrarte

### Problema 2: Errores en consola sobre ChipiProvider

**Causa:** API keys incorrectas o faltantes

**Solución:**
1. Abre `/Users/gerryp/Starknet-Hackathon/utonoma-frontend/.env.local`
2. Verifica:
   ```bash
   NEXT_PUBLIC_CHIPI_API_KEY=pk_prod_0bbe85b0ba7419b8e52978488c829366
   CHIPI_SECRET_KEY=sk_prod_ee127740bbf012426493d9eb94fb4ddff0e0a550e520aa0bf0e1f70fa31261b
   ```
3. Reinicia el servidor: `pkill -f "next dev" && npm run dev`

### Problema 3: "ChipiProvider not found"

**Causa:** Orden incorrecto de providers en `layout.tsx`

**Solución:**
Verifica que en `app/layout.tsx` esté así:
```typescript
<ClerkProvider>
  <ChipiProvider>
    <StarknetProvider>
      {children}
    </StarknetProvider>
  </ChipiProvider>
</ClerkProvider>
```

### Problema 4: La wallet no aparece nunca

**Causa posible:** Environment variables no se cargaron

**Solución:**
1. Detén el servidor: `pkill -f "next dev"`
2. Verifica `.env.local`: `cat .env.local`
3. Reinicia: `npm run dev`
4. Limpia caché del navegador (Cmd+Shift+R o Ctrl+Shift+R)

---

## 📈 Siguientes Pasos

Una vez que ChipiPay funciona:

1. **Usar la wallet en transacciones:**
   - Implementar calls a contratos usando la wallet de ChipiPay
   - Upload de videos con firma de la wallet

2. **Mostrar balance:**
   - Obtener balance de VERSY tokens
   - Mostrar en el perfil del usuario

3. **Top-up:**
   - Agregar funcionalidad para agregar fondos
   - Faucet para testnet

4. **UI mejorado:**
   - Agregar el `ChipiWalletInfo` en el perfil
   - Mostrar transacciones recientes

---

## 📞 Recursos

- **ChipiPay Docs:** https://docs.chipipay.com
- **Clerk Docs:** https://clerk.com/docs
- **UTONOMA Docs:** Ver `CHIPIPAY_SETUP.md`

---

## ✅ Resumen Rápido

### Para verificar ChipiPay:

1. **Abre:** http://localhost:3000/test-chipipay
2. **Regístrate/Inicia sesión**
3. **Verifica que aparezca:**
   - Tu email
   - "Wallet Activa" (puede tardar unos segundos)
   - Dirección de wallet

**Si ves estos 3 elementos, ChipiPay está funcionando** ✅

---

**Última actualización:** 15 de Octubre, 2025  
**Proyecto:** UTONOMA  
**Página de test:** `/test-chipipay`

