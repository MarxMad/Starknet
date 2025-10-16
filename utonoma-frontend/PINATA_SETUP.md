# 📌 Configuración de Pinata para UTONOMA

UTONOMA usa **Pinata** para almacenar videos en IPFS de forma descentralizada.

---

## 🚀 Paso 1: Crear Cuenta en Pinata

1. Ve a https://pinata.cloud
2. Click en "Start Building"
3. Regístrate con tu email
4. Verifica tu cuenta

---

## 🔑 Paso 2: Obtener API Keys

1. **Login** en https://app.pinata.cloud
2. Ve a **API Keys** en el menú lateral
3. Click en **"New Key"**
4. Configura los permisos:
   - ✅ `pinFileToIPFS`
   - ✅ `pinJSONToIPFS`
   - ⬜ (opcional) `unpin`
   - ⬜ (opcional) `pinList`
5. Dale un nombre: `UTONOMA-Upload`
6. Click en **"Create Key"**
7. **⚠️ IMPORTANTE**: Guarda las keys inmediatamente, solo se muestran una vez

---

## 🔧 Paso 3: Configurar en el Proyecto

### Opción 1: Editar `.env.local` manualmente

```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend
nano .env.local
```

Agrega estas líneas:
```env
NEXT_PUBLIC_PINATA_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_PINATA_SECRET_KEY=tu_secret_key_aqui
```

### Opción 2: Usar comandos

```bash
cd /Users/gerryp/Starknet-Hackathon/utonoma-frontend

# Reemplaza con tus keys reales
echo "NEXT_PUBLIC_PINATA_API_KEY=tu_api_key" >> .env.local
echo "NEXT_PUBLIC_PINATA_SECRET_KEY=tu_secret_key" >> .env.local
```

---

## ✅ Paso 4: Verificar Configuración

```bash
# Ver que las keys estén configuradas
cat .env.local | grep PINATA

# Debería mostrar:
# NEXT_PUBLIC_PINATA_API_KEY=tu_key...
# NEXT_PUBLIC_PINATA_SECRET_KEY=tu_secret...
```

---

## 🔄 Paso 5: Reiniciar el Servidor

```bash
# Detener el servidor actual
pkill -f "next dev"

# Iniciar de nuevo (para cargar las nuevas variables)
npm run dev
```

---

## 🧪 Paso 6: Probar el Upload

1. Abre http://localhost:3000
2. Conecta tu wallet
3. Ve a la pestaña "Upload"
4. Sube un video de prueba
5. Verifica en la consola del navegador (F12):
   - Deberías ver: `Respuesta de Pinata: { IpfsHash: 'Qm...' }`
   - ✅ Si ves el hash, ¡funciona!
   - ❌ Si ves error 401: Keys incorrectas
   - ❌ Si ves "using mock hash": Keys no configuradas

---

## 📊 Paso 7: Ver tus Archivos en Pinata

1. Ve a https://app.pinata.cloud/pinmanager
2. Verás todos los videos subidos
3. Cada archivo tiene un **CID** (Content Identifier)
4. Puedes acceder al video en:
   - Gateway de Pinata: `https://gateway.pinata.cloud/ipfs/{CID}`
   - Gateway público: `https://ipfs.io/ipfs/{CID}`

---

## 🎯 Límites del Plan Gratuito

| Característica | Plan Gratuito |
|----------------|---------------|
| **Storage** | 1 GB |
| **Bandwidth** | 100 GB/mes |
| **Pinned Files** | 100 archivos |
| **Gateway Requests** | Ilimitadas |

**Suficiente para:**
- ~10-20 videos de 50-100MB cada uno
- Perfecto para desarrollo y testing
- Ideal para un MVP o hackathon

---

## 💡 Tips y Mejores Prácticas

### 1. Comprimir Videos Antes de Subir

```bash
# Usando ffmpeg (instalar con: brew install ffmpeg)
ffmpeg -i input.mov -c:v libx264 -crf 28 -preset fast output.mp4

# Esto reduce el tamaño sin perder mucha calidad
```

### 2. Validar Tamaño en el Frontend

Ya está implementado en `VideoUpload.tsx`:
```typescript
// Máximo 100MB
if (file.size > 100 * 1024 * 1024) {
  setError('El archivo no debe superar los 100MB.');
  return;
}
```

### 3. Generar Thumbnails

```typescript
// TODO: Implementar generación de thumbnails
const generateThumbnail = async (videoFile: File): Promise<Blob> => {
  const video = document.createElement('video');
  video.src = URL.createObjectURL(videoFile);
  
  await new Promise(resolve => {
    video.onloadeddata = resolve;
  });
  
  video.currentTime = 1; // Segundo 1
  
  await new Promise(resolve => {
    video.onseeked = resolve;
  });
  
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  const ctx = canvas.getContext('2d');
  ctx!.drawImage(video, 0, 0);
  
  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob!), 'image/jpeg', 0.8);
  });
};
```

### 4. Metadata Enriquecida

Puedes agregar metadata al subir:
```typescript
const metadata = JSON.stringify({
  name: title,
  keyvalues: {
    creator: address,
    timestamp: Date.now(),
    platform: 'UTONOMA'
  }
});

formData.append('pinataMetadata', metadata);
```

---

## 🐛 Troubleshooting

### Error: "401 Unauthorized"
**Causa:** API Keys incorrectas  
**Solución:**
1. Verifica que copiaste las keys completas
2. Sin espacios al inicio/final
3. Asegúrate de reiniciar el servidor después de agregar las keys

### Error: "Payment Required"
**Causa:** Límite de storage alcanzado  
**Solución:**
1. Ve a Pinata Dashboard
2. Elimina archivos antiguos
3. O actualiza a plan de pago

### Error: "File too large"
**Causa:** Archivo mayor a 100MB  
**Solución:**
1. Comprime el video con ffmpeg
2. O aumenta el límite en el código

### Videos no se reproducen
**Causa:** Gateway lento o CID incorrecto  
**Solución:**
1. Intenta otro gateway:
   - `https://cloudflare-ipfs.com/ipfs/{CID}`
   - `https://dweb.link/ipfs/{CID}`
2. Verifica que el CID sea correcto en Pinata Dashboard

---

## 🔒 Seguridad

### ⚠️ NO hagas esto:

```typescript
// ❌ MAL: API Keys en el código
const apiKey = "tu_key_aqui";

// ❌ MAL: Commit de .env.local
git add .env.local
```

### ✅ Haz esto:

```typescript
// ✅ BIEN: Usar variables de entorno
const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;

// ✅ BIEN: .env.local en .gitignore
# Ya está agregado automáticamente
```

---

## 📈 Monitoreo y Analytics

### Ver uso de tu cuenta

```bash
# API para ver stats (reemplaza con tu JWT)
curl -X GET \
  https://api.pinata.cloud/data/pinList?status=pinned \
  -H "Authorization: Bearer YOUR_JWT"
```

### Dashboard de Pinata

1. Ve a https://app.pinata.cloud
2. **Usage** tab muestra:
   - Storage usado
   - Bandwidth consumido
   - Files pinned
3. **Analytics** muestra requests por hora

---

## 🚀 Upgrade a Plan de Pago (Opcional)

Si tu app crece, considera:

| Plan | Precio | Storage | Bandwidth |
|------|--------|---------|-----------|
| **Free** | $0/mes | 1 GB | 100 GB |
| **Picnic** | $20/mes | 100 GB | 1 TB |
| **Fiesta** | $100/mes | 1 TB | 10 TB |

**Cuándo hacer upgrade:**
- Más de 20 videos subidos
- Más de 1000 visualizaciones/mes
- Necesitas más bandwidth

---

## 🔄 Alternativas a Pinata

Si quieres explorar otras opciones:

### 1. **Web3.Storage** (gratis, 5TB)
```bash
npm install @web3-storage/w3up-client
```

### 2. **NFT.Storage** (gratis, ilimitado)
```bash
npm install nft.storage
```

### 3. **Infura IPFS** (gratis hasta 5GB)
- Requiere cuenta de Infura
- Integración similar a Pinata

### 4. **IPFS Node Local**
```bash
# Instalar IPFS
brew install ipfs

# Iniciar nodo
ipfs daemon
```

---

## ✅ Checklist Final

Antes de ir a producción:

- [ ] API Keys configuradas en `.env.local`
- [ ] Servidor reiniciado después de configurar
- [ ] Upload de video de prueba exitoso
- [ ] Videos se reproducen correctamente
- [ ] Thumbnails funcionan (si implementaste)
- [ ] `.env.local` en `.gitignore`
- [ ] Límites de tamaño configurados
- [ ] Compresión de videos implementada
- [ ] Manejo de errores probado
- [ ] Plan de Pinata suficiente para tu uso

---

## 📚 Recursos

- [Pinata Docs](https://docs.pinata.cloud/)
- [IPFS Docs](https://docs.ipfs.tech/)
- [Pinata API Reference](https://docs.pinata.cloud/api-pinning/pin-file-or-directory)
- [IPFS Gateways List](https://ipfs.github.io/public-gateway-checker/)

---

**¡Listo!** Ya puedes subir videos a IPFS de forma descentralizada 🚀

**Última actualización:** 15 de Octubre, 2025  
**Proyecto:** UTONOMA

