# 🐛 Debug ChipiPay - Wallets No Se Generan

## 🔍 Diagnóstico Paso a Paso

### 1. Verificar Consola del Navegador

Abre **F12** → **Console** y busca estos errores:

```javascript
// Ejecuta en la consola:
console.log('Clerk User:', window.Clerk?.user);
console.log('ChipiPay:', window.ChipiPay);
console.log('Metadata:', window.Clerk?.user?.publicMetadata);
```

**¿Qué errores ves en la consola?**

### 2. Verificar Variables de Entorno

En la consola, ejecuta:
```javascript
console.log('ChipiPay API Key:', process.env.NEXT_PUBLIC_CHIPI_API_KEY);
console.log('Clerk Publishable Key:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
```

### 3. Verificar JWKS URL

```bash
# En terminal:
curl https://sweeping-doe-10.clerk.accounts.dev/.well-known/jwks.json
```

---

## 🚨 Problemas Comunes

### Problema 1: JWKS URL no coincide
**Síntoma:** ChipiPay no puede verificar usuarios de Clerk
**Solución:** Verificar que ChipiPay Dashboard tenga el JWKS correcto

### Problema 2: API Keys incorrectas
**Síntoma:** Error "Invalid API Key" en consola
**Solución:** Verificar .env.local

### Problema 3: ChipiPay no está configurado para el dominio
**Síntoma:** Error CORS o "Invalid host"
**Solución:** Agregar localhost:3000 en ChipiPay Dashboard

### Problema 4: Usuario ya existente
**Síntoma:** Usuario logueado pero sin wallet
**Solución:** Cerrar sesión y registrarse con nuevo email

---

## 🔧 Soluciones

### Solución 1: Verificar ChipiPay Dashboard

1. Ve a https://dashboard.chipipay.com
2. Verifica que el JWKS URL sea:
   ```
   https://sweeping-doe-10.clerk.accounts.dev/.well-known/jwks.json
   ```
3. Verifica que el dominio `localhost:3000` esté autorizado

### Solución 2: Limpiar y reiniciar

```bash
# 1. Detener servidor
pkill -f "next dev"

# 2. Limpiar caché
rm -rf .next

# 3. Reiniciar
npm run dev
```

### Solución 3: Nuevo usuario

1. Cerrar sesión completamente
2. Limpiar cookies del navegador
3. Registrarse con email completamente nuevo
4. Esperar 10-15 segundos

### Solución 4: Verificar logs de ChipiPay

En la consola del navegador, busca:
- Requests a `api.chipipay.com`
- Errores de CORS
- Errores de autenticación

---

## 📊 Estado Actual

| Componente | Estado | Nota |
|-----------|--------|------|
| Clerk | ✅ Funcionando | Usuario logueado |
| ChipiPay SDK | ✅ Instalado | Pero no genera wallets |
| JWKS | ❓ Verificar | Debe coincidir |
| API Keys | ❓ Verificar | En .env.local |
| Dominio | ❓ Verificar | En ChipiPay Dashboard |

---

## 🎯 Próximos Pasos

1. **Verificar consola** del navegador para errores
2. **Verificar ChipiPay Dashboard** configuración
3. **Probar con usuario nuevo** (email diferente)
4. **Revisar logs** del servidor para errores

---

**¿Qué errores específicos ves en la consola del navegador?**
