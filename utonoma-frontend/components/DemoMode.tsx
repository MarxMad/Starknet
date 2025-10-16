"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Heart, Coins, Gift, AlertTriangle } from "lucide-react";
import Image from "next/image";

export function DemoMode() {
  const [demoVideos, setDemoVideos] = useState([
    {
      id: "1",
      title: "Introducción a Starknet",
      creator: "0x1234...5678",
      likes: 25,
      duration: "5:30"
    },
    {
      id: "2", 
      title: "Cairo Programming Basics",
      creator: "0xabcd...efgh",
      likes: 18,
      duration: "8:15"
    },
    {
      id: "3",
      title: "DeFi en Starknet",
      creator: "0x9876...5432",
      likes: 32,
      duration: "12:45"
    }
  ]);

  const [userBalance, setUserBalance] = useState(150);
  const [userRewards, setUserRewards] = useState(45);

  const handleLike = (videoId: string) => {
    setDemoVideos(prev => 
      prev.map(video => 
        video.id === videoId 
          ? { ...video, likes: video.likes + 1 }
          : video
      )
    );
    setUserBalance(prev => prev - 10); // Costo del like
  };

  const handleClaimRewards = () => {
    setUserBalance(prev => prev + userRewards);
    setUserRewards(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        padding: '1rem',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%)'
      }}
    >
      {/* Demo Mode Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#000000',
          fontWeight: 600
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '2rem', height: '2rem', position: 'relative' }}>
            <Image
              src="/UtonomaLogo.png"
              alt="UTONOMA Logo"
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>Modo Demo</div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            Simulando funcionalidades sin contrato desplegado
          </div>
        </div>
      </motion.div>

      {/* User Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '0.75rem',
          padding: '1rem',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Coins className="w-5 h-5" style={{ color: '#10b981' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>
              {userBalance}
            </span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>VERSY Balance</div>
        </div>

        <div style={{
          background: 'rgba(251, 191, 36, 0.1)',
          borderRadius: '0.75rem',
          padding: '1rem',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Gift className="w-5 h-5" style={{ color: '#fbbf24' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fbbf24' }}>
              {userRewards}
            </span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Recompensas</div>
        </div>
      </div>

      {/* Demo Videos */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          marginBottom: '1rem',
          color: '#ffffff'
        }}>
          Videos de Demostración
        </h2>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {demoVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'rgba(17, 24, 39, 0.8)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(31, 41, 55, 0.5)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}>
                  <Play className="w-6 h-6" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    {video.title}
                  </h3>
                  <p style={{ color: '#9ca3af', margin: '0.25rem 0 0 0' }}>
                    Por: {video.creator} • {video.duration}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <motion.button
                  onClick={() => handleLike(video.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={userBalance < 10}
                  style={{
                    background: userBalance < 10 
                      ? 'rgba(55, 65, 81, 0.5)' 
                      : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                    color: '#ffffff',
                    fontWeight: 600,
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: userBalance < 10 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: userBalance < 10 ? 0.5 : 1
                  }}
                >
                  <Heart className="w-4 h-4" />
                  {video.likes} likes
                  {userBalance >= 10 && <span style={{ fontSize: '0.75rem' }}>(10 VERSY)</span>}
                </motion.button>

                <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  {userBalance < 10 && "Saldo insuficiente"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Claim Rewards Button */}
      {userRewards > 0 && (
        <motion.button
          onClick={handleClaimRewards}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            fontWeight: 600,
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.25)'
          }}
        >
          <Gift className="w-5 h-5" />
          Reclamar {userRewards} VERSY en Recompensas
        </motion.button>
      )}

      {/* Demo Instructions */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(31, 41, 55, 0.3)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(55, 65, 81, 0.5)'
      }}>
        <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Instrucciones de Demo:</h4>
        <ul style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0, paddingLeft: '1rem' }}>
          <li>Da likes a los videos (cuesta 10 VERSY cada uno)</li>
          <li>Gana recompensas por crear contenido</li>
          <li>Reclama tus recompensas cuando estén disponibles</li>
          <li>Simula la experiencia completa de UTONOMA</li>
        </ul>
      </div>
    </motion.div>
  );
}
