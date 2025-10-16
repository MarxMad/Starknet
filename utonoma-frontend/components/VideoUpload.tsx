"use client";

import { useState, useCallback, useRef } from "react";
import { useAccount } from "@starknet-react/core";
import { config } from "@/lib/config";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Contract, shortString } from "starknet";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import platformAbi from "@/abis/platform.json";

export function VideoUpload() {
  const { isConnected, account } = useAccount();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (!acceptedFiles.length) return;
    const selectedFile = acceptedFiles[0];
    
    // Validar tipo
    if (!selectedFile.type.startsWith('video/')) {
      setError('Solo se permiten archivos de video.');
      setFile(null);
      return;
    }
    
    // Validar tamaño (100MB)
    if (selectedFile.size > 100 * 1024 * 1024) {
      setError('El archivo no debe superar los 100MB.');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1
  });

  const uploadToIPFS = async (file: File): Promise<string> => {
    // Subir a Pinata
    const formData = new FormData();
    formData.append('file', file);

    // Usa variables de entorno
    const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
    const secretKey = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

    if (!apiKey || !secretKey) {
      console.warn('Pinata keys not configured, using mock hash');
      // Simular upload para demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      return "QmMockHash" + Math.random().toString(36).substring(2, 15);
    }

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': apiKey,
        'pinata_secret_api_key': secretKey
      },
      body: formData
    });

    if (!res.ok) {
      throw new Error('Error al subir a IPFS/Pinata.');
    }

    const data = await res.json();
    console.log('Respuesta de Pinata:', data);
    return data.IpfsHash;
  };

  const handleUpload = async () => {
    if (!file || !title || !isConnected || !account || error) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus("uploading");
    
    try {
      // Barra de progreso simulada mientras sube
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20 + 10;
        setUploadProgress(Math.min(progress, 70));
        if (progress >= 70) {
          clearInterval(interval);
        }
      }, 200);

      // Upload to IPFS
      const hash = await uploadToIPFS(file);
      clearInterval(interval);
      setUploadProgress(80);
      
      // Convert title and hash to felt252
      const titleFelt = shortString.encodeShortString(title.slice(0, 31)); // Max 31 chars for felt252
      const hashFelt = shortString.encodeShortString(hash.slice(0, 31));

      // Call smart contract
      const contract = new Contract(platformAbi, config.platformAddress, account);
      await contract.upload_video(hashFelt, titleFelt);

      setUploadProgress(100);
      setUploadStatus("success");
      setShowToast(true);
      
      if (toastTimeout.current) clearTimeout(toastTimeout.current);
      toastTimeout.current = setTimeout(() => setShowToast(false), 3000);
      
      // Reset form
      setTimeout(() => {
        setFile(null);
        setTitle("");
        setDescription("");
        setUploadStatus("idle");
        setUploadProgress(0);
      }, 3000);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      setError(err instanceof Error ? err.message : 'Error al subir el video');
    } finally {
      setUploading(false);
    }
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-card rounded-lg border text-center"
      >
        <p className="text-muted-foreground">Por favor conecta tu wallet para subir videos</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-card rounded-2xl border"
    >
      <h2 className="text-2xl font-bold mb-6">📹 Subir Video</h2>

      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Título *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del video (máx 31 caracteres)"
            maxLength={31}
            className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {title.length}/31 caracteres
          </p>
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Descripción (opcional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe tu video..."
            rows={3}
            className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={uploading}
          />
        </div>

        {/* Drag & Drop Zone */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Video *
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/10'
                : file
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} disabled={uploading} />
            {uploading && uploadStatus === "uploading" ? (
              <div className="space-y-2">
                <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Subiendo video... {Math.round(uploadProgress)}%
                </p>
              </div>
            ) : file ? (
              <div className="text-primary">
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : isDragActive ? (
              <p className="text-primary">Suelta el video aquí...</p>
            ) : (
              <div className="space-y-2">
                <div className="text-4xl">🎬</div>
                <p className="text-muted-foreground">
                  Arrastra y suelta un video aquí, o haz clic para seleccionar
                </p>
                <p className="text-xs text-muted-foreground">
                  Formatos: MP4, MOV, AVI, WEBM • Máx 100MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
          >
            <div className="flex items-center gap-2 text-red-500">
              <XCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {uploadStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-green-500/10 border border-green-500/20"
          >
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">¡Video subido exitosamente!</span>
            </div>
          </motion.div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || !title || uploading || !!error}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
            !file || !title || uploading || !!error
              ? 'bg-secondary text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-[1.02]'
          }`}
        >
          {uploading ? '⏳ Publicando...' : '🚀 Publicar Video'}
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          ✅ ¡Video publicado con éxito!
        </motion.div>
      )}
    </motion.div>
  );
}

