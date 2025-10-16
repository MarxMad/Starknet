"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Upload, X, CheckCircle, AlertCircle, Loader2, Video } from "lucide-react";
import { useChipiWallet } from "@/hooks/useChipiWallet";
import { useContract } from "@/hooks/useContract";
import { shortString } from "starknet";

export function VideoUpload() {
  const { wallet, isConnected } = useChipiWallet();
  const { uploadVideo } = useContract();
  
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB
  });

  const uploadToPinata = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pinataMetadata', JSON.stringify({
      name: file.name,
      keyvalues: {
        type: 'video',
        platform: 'utonoma'
      }
    }));

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY!,
        'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY!
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error subiendo a Pinata');
    }

    const result = await response.json();
    return result.IpfsHash;
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      setError('Por favor selecciona un archivo y escribe un título');
      return;
    }

    if (!isConnected || !wallet) {
      setError('Por favor conecta tu wallet para subir videos');
      return;
    }

    try {
      setUploading(true);
      setUploadStatus('uploading');
      setError(null);
      setUploadProgress(0);

      // Simular progreso de subida
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Subir a Pinata
      console.log('📤 Subiendo a Pinata...');
      const hash = await uploadToPinata(file);
      setIpfsHash(hash);
      setUploadProgress(90);

      // Subir al contrato
      console.log('📤 Subiendo al contrato...');
      const titleFelt = shortString.encodeShortString(title);
      const result = await uploadVideo(hash, titleFelt);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus('success');
      
      console.log('✅ Video subido exitosamente:', result);
      
      // Reset form
      setTimeout(() => {
        setFile(null);
        setTitle("");
        setDescription("");
        setUploadStatus('idle');
        setUploadProgress(0);
        setIpfsHash(null);
      }, 2000);

    } catch (err) {
      console.error('❌ Error subiendo video:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  if (!isConnected || !wallet) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1rem',
          textAlign: 'center',
          background: 'rgba(17, 24, 39, 0.5)',
          borderRadius: '1rem',
          border: '1px solid rgba(31, 41, 55, 0.5)',
          margin: '1rem'
        }}
      >
        <AlertCircle className="w-16 h-16" style={{ color: '#ef4444', marginBottom: '1rem' }} />
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.5rem',
            margin: 0
          }}
        >
          Wallet Requerida
        </h3>
        <p
          style={{
            color: '#9ca3af',
            margin: 0,
            maxWidth: '20rem'
          }}
        >
          Por favor conecta tu wallet para subir videos
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '1rem',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%)'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.5rem',
            margin: 0
          }}
        >
          Subir Video
        </h1>
        <p
          style={{
            color: '#9ca3af',
            margin: 0
          }}
        >
          Comparte tu contenido y gana VERSY tokens
        </p>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed',
          borderColor: isDragActive ? '#a855f7' : '#374151',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          background: isDragActive ? 'rgba(168, 85, 247, 0.1)' : 'rgba(17, 24, 39, 0.5)',
          borderStyle: 'dashed'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#a855f7';
          e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#374151';
          e.currentTarget.style.background = 'rgba(17, 24, 39, 0.5)';
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Video className="w-12 h-12" style={{ color: '#a855f7' }} />
            <div>
              <p style={{ color: '#ffffff', fontWeight: 600, margin: 0 }}>
                {file.name}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                color: '#ef4444',
                cursor: 'pointer'
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Upload className="w-12 h-12" style={{ color: '#9ca3af' }} />
            <div>
              <p style={{ color: '#ffffff', fontWeight: 600, margin: 0 }}>
                {isDragActive ? 'Suelta el archivo aquí' : 'Arrastra tu video aquí'}
              </p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
                o haz clic para seleccionar
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
            Título *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de tu video"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(17, 24, 39, 0.5)',
              border: '1px solid rgba(55, 65, 81, 0.5)',
              borderRadius: '0.5rem',
              color: '#ffffff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe tu video..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(17, 24, 39, 0.5)',
              border: '1px solid rgba(55, 65, 81, 0.5)',
              borderRadius: '0.5rem',
              color: '#ffffff',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#a855f7' }} />
            <span style={{ color: '#ffffff', fontSize: '0.875rem' }}>
              Subiendo video... {uploadProgress}%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '0.5rem',
              background: 'rgba(17, 24, 39, 0.5)',
              borderRadius: '0.25rem',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      )}

      {/* Status Messages */}
      {uploadStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '0.5rem',
            color: '#10b981'
          }}
        >
          <CheckCircle className="w-5 h-5" />
          <span>¡Video subido exitosamente!</span>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '0.5rem',
            color: '#ef4444'
          }}
        >
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Upload Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleUpload}
        disabled={!file || !title.trim() || uploading}
        style={{
          width: '100%',
          background: (!file || !title.trim() || uploading) 
            ? 'rgba(55, 65, 81, 0.5)' 
            : 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
          color: '#ffffff',
          fontWeight: 600,
          padding: '1rem',
          borderRadius: '0.75rem',
          border: 'none',
          cursor: (!file || !title.trim() || uploading) ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
      >
        {uploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Subiendo...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Subir Video
          </>
        )}
      </motion.button>
    </motion.div>
  );
}