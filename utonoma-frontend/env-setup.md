# Configuración de Variables de Entorno

Para solucionar los errores de CORS y conectividad, crea un archivo `.env.local` en la carpeta `utonoma-frontend` con el siguiente contenido:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGVhcm5pbmctcGFzcy0xLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_bGVhcm5pbmctcGFzcy0xLmNsZXJrLmFjY291bnRzLmRldiQ

# ChipiPay Configuration
NEXT_PUBLIC_CHIPI_API_KEY=your_chipi_api_key_here
CHIPI_SECRET_KEY=your_chipi_secret_key_here
NEXT_PUBLIC_CHIPI_ENV=development

# Starknet Configuration - RPC que funciona sin CORS
NEXT_PUBLIC_NETWORK=sepolia
NEXT_PUBLIC_RPC_URL=https://rpc.starknet.io/sepolia
NEXT_PUBLIC_PLATFORM_ADDRESS=0x0102f741c538504da4d69f49358d218a3e5c09b44d3177a562c74c6bab2a3f6f
NEXT_PUBLIC_VERSY_TOKEN_ADDRESS=0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

# App Configuration
NEXT_PUBLIC_APP_NAME=UTONOMA
NEXT_PUBLIC_WELCOME_BONUS=150
NEXT_PUBLIC_LIKE_REWARD=10
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Pinata Configuration (Agrega tus claves aquí)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key_here
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key_here
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_here
```

## Pasos para solucionar:

1. **Crea el archivo `.env.local`** en `utonoma-frontend/`
2. **Copia el contenido** de arriba
3. **Reinicia el servidor** con `npm run dev`
4. **Verifica** que no hay errores de CORS

## RPC Alternativos si el problema persiste:

- `https://starknet-sepolia.public.blastapi.io/rpc/v0_8` (puede tener CORS)
- `https://rpc.starknet.io/sepolia` (recomendado)
- `https://starknet-sepolia.infura.io/v3/YOUR_INFURA_KEY` (requiere clave)
