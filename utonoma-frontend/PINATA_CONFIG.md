# 🔧 Configuración de Pinata para UTONOMA

## ❌ Error Actual
```
pinFileToIPFS:1 Failed to load resource: the server responded with a status of 401 ()
```

## ✅ Solución

### 1. Crear archivo `.env.local`

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# Pinata Configuration (REQUIRED for video uploads)
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_token_here
# Alternative: Use API Key and Secret instead of JWT
# NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key_here
# NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key_here
```

### 2. Obtener Token de Pinata

1. Ve a [Pinata.cloud](https://pinata.cloud)
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys" en el dashboard
4. Crea una nueva API Key con permisos de "pinFileToIPFS"
5. Copia el JWT token

### 3. Configurar Variables

```bash
# Opción 1: Usar JWT (Recomendado)
NEXT_PUBLIC_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Opción 2: Usar API Key y Secret
NEXT_PUBLIC_PINATA_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_PINATA_SECRET_KEY=tu_secret_key_aqui
```

### 4. Reiniciar el Servidor

```bash
npm run dev
```

## 🔍 Verificación

Una vez configurado, deberías ver:
- ✅ "Subiendo a Pinata..." en la consola
- ✅ "Video subido a Pinata. IPFS Hash: Qm..." en la consola
- ✅ Sin errores 401

## 📝 Notas

- El JWT es más seguro que API Key + Secret
- Asegúrate de que el token tenga permisos de "pinFileToIPFS"
- El archivo `.env.local` está en `.gitignore` por seguridad
