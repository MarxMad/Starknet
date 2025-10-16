# 🚀 Despliegue en Vercel - UTONOMA

## ❌ Error Actual
```
Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.
```

## ✅ Solución

### 1. Configuración en Vercel Dashboard

En el dashboard de Vercel, configura:

- **Root Directory**: `utonoma-frontend`
- **Framework Preset**: `Next.js`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 2. Variables de Entorno

Agrega estas variables en Vercel Dashboard > Settings > Environment Variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGVhcm5pbmctcGFzcy0xLmNsZXJrLmFjY291bnRzLmRldiQ
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# ChipiPay Configuration
NEXT_PUBLIC_CHIPIPAY_API_KEY=your_chipipay_api_key_here
NEXT_PUBLIC_CHIPIPAY_SECRET_KEY=your_chipipay_secret_key_here
NEXT_PUBLIC_CHIPIPAY_BASE_URL=https://api.chipipay.com

# Starknet Configuration
NEXT_PUBLIC_VERSY_TOKEN_ADDRESS=0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
NEXT_PUBLIC_PLATFORM_ADDRESS=0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_RPC_URL=https://free-rpc.nethermind.io/sepolia-juno/v0_8

# App Configuration
NEXT_PUBLIC_APP_NAME=UTONOMA
NEXT_PUBLIC_WELCOME_BONUS=150
NEXT_PUBLIC_LIKE_REWARD=10
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Pinata Configuration (REQUIRED)
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token_here
```

### 3. Archivos de Configuración

Los archivos `vercel.json` ya están creados:
- `/vercel.json` - Configuración raíz
- `/utonoma-frontend/vercel.json` - Configuración específica del frontend

### 4. Pasos para Desplegar

1. **Conectar Repositorio**:
   - Ve a Vercel Dashboard
   - Importa el repositorio `Starknet-Hackathon`
   - Configura Root Directory como `utonoma-frontend`

2. **Configurar Variables**:
   - Agrega todas las variables de entorno
   - Especialmente `NEXT_PUBLIC_PINATA_JWT`

3. **Desplegar**:
   - Haz commit y push de los cambios
   - Vercel detectará automáticamente el proyecto Next.js

### 5. Verificación

Una vez desplegado, deberías ver:
- ✅ Build exitoso
- ✅ Aplicación funcionando en Vercel
- ✅ Variables de entorno configuradas
- ✅ Subida de videos funcionando

## 🔧 Comandos para Commit

```bash
git add .
git commit -m "feat: configure Vercel deployment for UTONOMA frontend"
git push origin main
```

## 📝 Notas Importantes

- El Root Directory debe ser `utonoma-frontend`
- Todas las variables deben tener prefijo `NEXT_PUBLIC_`
- Pinata JWT es requerido para subida de videos
- El build debe ejecutarse desde `utonoma-frontend/`
