# 🔧 URGENTE: Actualizar JWKS URL en ChipiPay

## ⚠️ Problema

El JWKS URL configurado en ChipiPay **NO coincide** con tu proyecto actual de Clerk.

### JWKS Incorrecto (actualmente en ChipiPay):
```
https://sweeping-doe-10.clerk.accounts.dev/.well-known/jwks.json
```

### JWKS Correcto (tu proyecto actual):
```
https://daring-macaw-73.clerk.accounts.dev/.well-known/jwks.json
```

---

## ✅ Solución Rápida

### Paso 1: Ve al Dashboard de ChipiPay
1. Abre: https://dashboard.chipipay.com
2. Selecciona tu proyecto UTONOMA

### Paso 2: Encuentra "Authentication" o "JWKS Configuration"
Busca en el menú lateral o en la sección de configuración.

### Paso 3: Actualiza el JWKS URL
**Reemplaza:**
```
https://sweeping-doe-10.clerk.accounts.dev/.well-known/jwks.json
```

**Por:**
```
https://daring-macaw-73.clerk.accounts.dev/.well-known/jwks.json
```

### Paso 4: Guarda los cambios
Haz clic en "Save" o "Update"

### Paso 5: Espera 1-2 minutos
Para que los cambios se propaguen.

---

## 🧪 Verificar que funciona

### Opción 1: Página de Test

1. Ve a: http://localhost:3000/test-chipipay
2. Si no estás logueado, regístrate con un **nuevo email**
3. Espera 5-10 segundos
4. Deberías ver:
   - ✅ Tu email
   - ✅ "Wallet Activa"
   - ✅ Una dirección de Starknet (0x...)

### Opción 2: Consola del Navegador

1. Abre la consola (F12)
2. Ejecuta:
   ```javascript
   console.log(window.Clerk?.user?.publicMetadata);
   ```
3. Deberías ver algo como:
   ```javascript
   {
     chipiWalletAddress: "0x1234567890abcdef..."
   }
   ```

---

## 🎯 ¿Por qué es importante?

ChipiPay usa el JWKS (JSON Web Key Set) para:
1. **Verificar** que el usuario autenticado en Clerk es legítimo
2. **Generar** una wallet única para ese usuario
3. **Asociar** la wallet con la sesión del usuario

Si el JWKS no coincide:
- ❌ ChipiPay no puede verificar usuarios
- ❌ No se generan wallets
- ❌ Los usuarios no pueden hacer transacciones

---

## 📸 Dónde encontrar la configuración en ChipiPay

Busca una sección que se vea así:

```
┌─────────────────────────────────────┐
│  Authentication Settings            │
├─────────────────────────────────────┤
│  JWKS URL:                          │
│  [____________________________]  ✏️ │
│                                     │
│  Provider: Clerk                    │
│  Status: ⚠️ Needs Update            │
└─────────────────────────────────────┘
```

---

## ⚡ Comandos Rápidos

### Ver tu JWKS actual de Clerk:
```bash
curl https://daring-macaw-73.clerk.accounts.dev/.well-known/jwks.json
```

Deberías ver un JSON con las keys públicas.

### Verificar que las API keys están correctas:
```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
cat .env.local | grep CLERK
```

Debe mostrar:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZGFyaW5nLW1hY2F3LTczLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_ny2bSFeRpeNCMcIb7x1ATrEuTlKtDqHnJiIH1jhjej
```

---

## 🆘 Si sigue sin funcionar

1. **Limpia las cookies y caché del navegador:**
   - Chrome/Edge: Ctrl+Shift+Del
   - Firefox: Ctrl+Shift+Del
   - Safari: Cmd+Opt+E

2. **Cierra sesión y vuelve a registrarte:**
   - USA UN NUEVO EMAIL
   - Los usuarios antiguos con el JWKS incorrecto no funcionarán

3. **Revisa la consola del navegador:**
   - F12 → Console
   - Busca errores de ChipiPay o Clerk

4. **Verifica el servidor:**
   ```bash
   pkill -f "next dev"
   cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
   npm run dev
   ```

---

## ✅ Checklist Final

- [ ] JWKS URL actualizado en ChipiPay Dashboard
- [ ] Esperado 1-2 minutos
- [ ] Limpiado cookies/caché del navegador
- [ ] Registrado con un nuevo email
- [ ] Visitado http://localhost:3000/test-chipipay
- [ ] Veo "Wallet Activa" ✅
- [ ] Veo dirección de wallet (0x...) ✅

Si todos los pasos están ✅, **ChipiPay está funcionando correctamente** 🎉

---

**IMPORTANTE:** El JWKS URL debe coincidir EXACTAMENTE con tu proyecto de Clerk. Si cambiaste de proyecto, debes actualizar el JWKS en ChipiPay.

**Última actualización:** 15 de Octubre, 2025

