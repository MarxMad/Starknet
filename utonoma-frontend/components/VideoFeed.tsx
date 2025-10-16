"use client";

import { useState, useEffect, useCallback } from "react";
import { useProvider } from "@starknet-react/core";
import { VideoCard } from "@/components/VideoCard";
import { Video } from "@/types";
import { config } from "@/lib/config";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Contract } from "starknet";
import platformAbi from "@/abis/platform.json";

export function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { provider } = useProvider();

  const loadVideos = useCallback(async () => {
    if (!provider || hasLoaded) return;
    
    try {
      setLoading(true);
      setError(false);
      setHasLoaded(true);
      
      // Check if contract address is configured
      if (!config.platformAddress || config.platformAddress === "") {
        console.warn("Platform contract address not configured - modo demo");
        setVideos([]);
        setLoading(false);
        return;
      }
      
      // Timeout para evitar bucles infinitos
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout loading videos')), 10000);
      });
      
      const fetchPromise = async () => {
        const contract = new Contract(platformAbi.abi, config.platformAddress);
        
        // Get all video IDs
        const videoIds = await contract.get_all_videos();
        
        // If no videos, show empty state
        if (!videoIds || videoIds.length === 0) {
          setVideos([]);
          return;
        }
        
        // Fetch each video's data
        const videoPromises = videoIds.map(async (id: unknown) => {
          try {
            const videoData = await contract.get_video(id);
            const videoId = String(id);
            return {
              video_id: videoId,
              creator: videoData.creator.toString(),
              ipfs_hash: videoData.ipfs_hash.toString(16),
              title: videoData.title.toString(16),
              likes: videoData.likes_count.toString(),
              created_at: videoData.created_at.toString(),
            };
          } catch (err) {
            console.error(`Error loading video ${String(id)}:`, err);
            return null;
          }
        });
        
        const loadedVideos = (await Promise.all(videoPromises))
          .filter((v) => v !== null) as Video[];
        setVideos(loadedVideos.reverse()); // Most recent first
      };
      
      await Promise.race([fetchPromise(), timeoutPromise]);
      
    } catch (err) {
      console.error("Error loading videos:", err);
      setError(true);
      // En caso de error, mostrar estado vacío en lugar de fallar
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [provider, hasLoaded]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const handleRefresh = () => {
    loadVideos();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          🎬
        </motion.div>
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Cargando videos...</p>
          <div className="flex gap-1.5 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 1rem',
          gap: '1rem',
          textAlign: 'center',
          background: 'rgba(17, 24, 39, 0.5)',
          borderRadius: '1rem',
          border: '1px solid rgba(31, 41, 55, 0.5)',
          margin: '1rem'
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>⚠️</div>
        <h3 
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0
          }}
        >
          Error de Conexión
        </h3>
        <p 
          style={{
            color: '#9ca3af',
            margin: 0,
            maxWidth: '20rem'
          }}
        >
          No se pudo conectar con el contrato. Verifica que las direcciones estén configuradas correctamente.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          style={{
            marginTop: '1rem',
            background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
            color: '#ffffff',
            fontWeight: 600,
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37, 99, 235, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Intentar de nuevo
        </motion.button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 1rem',
          gap: '1rem',
          textAlign: 'center',
          background: 'rgba(17, 24, 39, 0.5)',
          borderRadius: '1rem',
          border: '1px solid rgba(31, 41, 55, 0.5)',
          margin: '1rem',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📹</div>
        <h3 
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0
          }}
        >
          Aún no hay videos
        </h3>
        <p 
          style={{
            color: '#9ca3af',
            margin: 0,
            maxWidth: '20rem'
          }}
        >
          ¡Sé el primero en compartir contenido educativo!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          style={{
            marginTop: '1rem',
            background: 'transparent',
            color: '#ffffff',
            fontWeight: 600,
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            border: '2px solid rgba(75, 85, 99, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.8)';
            e.currentTarget.style.background = 'rgba(31, 41, 55, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Actualizar
        </motion.button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black gradient-text">Descubre</h2>
        <motion.button
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRefresh}
          className="p-2 rounded-xl hover:bg-secondary transition-colors"
          title="Actualizar"
        >
          <RefreshCw className="h-5 w-5 text-muted-foreground" />
        </motion.button>
      </div>

      {/* Videos Grid - Estilo EduTok */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {videos.map((video, index) => (
          <motion.div
            key={video.video_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <VideoCard video={video} onLikeSuccess={handleRefresh} />
          </motion.div>
        ))}
      </div>

      {/* Pagination hint */}
      {videos.length >= 10 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            Mostrando {videos.length} videos
          </p>
        </div>
      )}
    </div>
  );
}
