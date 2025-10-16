# 🚀 Configuración de Vercel - UTONOMA

## ❌ Error Actual
```
Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.
```

## ✅ Solución Inmediata

### 1. Configurar Root Directory en Vercel Dashboard

**PASO CRÍTICO**: Ve a tu proyecto en Vercel Dashboard:

1. **Settings** → **General**
2. **Root Directory**: Cambia a `utonoma-frontend`
3. **Save**

### 2. Variables de Entorno

En **Settings** → **Environment Variables**, agrega:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGVhcm5pbmctcGFzcy0xLmNsZXJrLmFjY291bnRzLmRldiQ
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Starknet
NEXT_PUBLIC_VERSY_TOKEN_ADDRESS=0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
NEXT_PUBLIC_PLATFORM_ADDRESS=0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_RPC_URL=https://free-rpc.nethermind.io/sepolia-juno/v0_8

# App
NEXT_PUBLIC_APP_NAME=UTONOMA
NEXT_PUBLIC_WELCOME_BONUS=150
NEXT_PUBLIC_LIKE_REWARD=10
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Pinata (REQUERIDO)
NEXT_PUBLIC_PINATA_JWT=tu_jwt_token_aqui
```

### 3. Redesplegar

Después de configurar el Root Directory:
1. **Deployments** → **Redeploy** (último deployment)
2. O haz un nuevo commit para triggerar build

## 🔧 Configuración Alternativa

Si el Root Directory no funciona, puedes:

1. **Crear un nuevo proyecto** en Vercel
2. **Importar solo la carpeta** `utonoma-frontend`
3. **Configurar variables** de entorno

## 📋 Verificación

Una vez configurado correctamente, deberías ver:
- ✅ Build exitoso
- ✅ Next.js detectado
- ✅ Aplicación funcionando
- ✅ URL de despliegue activa

## 🚨 Importante

**El Root Directory debe ser `utonoma-frontend`** - esto es crítico para que Vercel encuentre el `package.json` con Next.js.
