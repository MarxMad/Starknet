# 🔐 Configuración de Clerk para UTONOMA

## 📝 Paso 1: Crear cuenta en Clerk

1. Ve a https://clerk.com
2. Haz clic en "Start building for free"
3. Regístrate con tu email o GitHub

## 🔑 Paso 2: Crear una aplicación

1. En el Dashboard de Clerk, clic en "Add application"
2. Nombre: **UTONOMA**
3. Selecciona los métodos de autenticación:
   - ✅ Email
   - ✅ Google (opcional)
   - ✅ GitHub (opcional)
   - Otros según prefieras
4. Clic en "Create application"

## 📋 Paso 3: Obtener las API Keys

1. En el Dashboard, ve a **API Keys** en el menú lateral
2. Copia tus keys:
   - **Publishable Key** (empieza con `pk_`)
   - **Secret Key** (empieza con `sk_`)

⚠️ **IMPORTANTE:** La Secret Key solo se muestra una vez. Guárdala en un lugar seguro.

## 🔧 Paso 4: Configurar las variables de entorno

Abre el archivo `.env.local` en el proyecto y reemplaza los placeholders:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_publishable_key_aqui
CLERK_SECRET_KEY=sk_test_tu_secret_key_aqui

# Pinata IPFS (ya configuradas)
NEXT_PUBLIC_PINATA_API_KEY=...
NEXT_PUBLIC_PINATA_SECRET_KEY=...

# Starknet (ya configuradas)
NEXT_PUBLIC_PLATFORM_CONTRACT_ADDRESS=...
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=...
```

## 🔄 Paso 5: Reiniciar el servidor

```bash
# Detener el servidor actual
pkill -f "next dev"

# Iniciar de nuevo
npm run dev
```

## ✅ Paso 6: Verificar la integración

1. Abre http://localhost:3000
2. Deberías ver opciones para:
   - **Sign in with Email** (Clerk)
   - **Sign in with Google** (si lo activaste)
   - **Connect Starknet Wallet** (ArgentX/Braavos)

## 🎨 Personalizar Clerk (Opcional)

### Cambiar colores y branding:

1. En el Dashboard de Clerk, ve a **Customization**
2. **Brand color:** `#8B5CF6` (morado de UTONOMA)
3. **Logo:** Sube el logo de UTONOMA
4. **Dark mode:** Activar/desactivar según preferencia

### Configurar emails:

1. Ve a **Email & SMS**
2. Personaliza los templates de:
   - Verificación de email
   - Reset de contraseña
   - Invitaciones

## 🔒 Seguridad

### ✅ HACER:
- Mantener `.env.local` en `.gitignore`
- Usar diferentes keys para desarrollo y producción
- Habilitar 2FA en tu cuenta de Clerk
- Revisar logs de autenticación regularmente

### ❌ NO HACER:
- Nunca subir las keys a Git
- No compartir las Secret Keys públicamente
- No usar las mismas keys en múltiples proyectos

## 🚀 Desplegar a Producción

### Vercel (Recomendado):

1. Ve a https://vercel.com
2. Importa el proyecto desde GitHub
3. En **Environment Variables**, agrega:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   ```
4. Deploy

### Otras plataformas:

Las mismas variables de entorno deben configurarse en:
- Netlify: Site settings → Environment variables
- Railway: Variables tab
- AWS/DigitalOcean: Según la plataforma

## 📊 Monitoreo de usuarios

En el Clerk Dashboard puedes ver:
- **Users:** Lista de todos los usuarios registrados
- **Sessions:** Sesiones activas
- **Events:** Log de eventos de autenticación
- **Analytics:** Estadísticas de sign-ups, logins, etc.

## 🔗 Integración con Starknet

UTONOMA permite **2 formas de autenticación**:

1. **Clerk (Email/OAuth):**
   - Usuario se registra con email
   - Se crea cuenta en Clerk
   - Usuario puede conectar wallet después

2. **Starknet Wallet (ArgentX/Braavos):**
   - Usuario conecta wallet directamente
   - No necesita email
   - Autenticación basada en blockchain

**Ambas pueden coexistir:** Un usuario puede tener cuenta de Clerk Y wallet conectada.

## 🆘 Troubleshooting

### Error: "Invalid Publishable Key"
- Verifica que copiaste la key completa
- Asegúrate de que empiece con `pk_test_` o `pk_live_`
- Reinicia el servidor después de agregar las keys

### Error: "Clerk is not configured"
- Verifica que `<ClerkProvider>` esté en `app/layout.tsx`
- Verifica que `middleware.ts` exista en la raíz
- Revisa que las variables de entorno estén en `.env.local`

### Los estilos de Clerk no se ven bien
- Agrega `appearance` props a los componentes de Clerk
- Usa el theme de Clerk que coincida con tu diseño

## 📚 Recursos

- [Clerk Docs](https://clerk.com/docs)
- [Next.js + Clerk Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [Clerk Dashboard](https://dashboard.clerk.com)

---

**¡Listo!** Clerk está integrado en UTONOMA 🎉

**Última actualización:** 15 de Octubre, 2025

