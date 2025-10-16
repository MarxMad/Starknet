"use client";

import { useState, useEffect, useCallback } from "react";
import { useChipiWallet } from "@/hooks/useChipiWallet";
import { useContract } from "@/hooks/useContract";
import { motion } from "framer-motion";
import { Coins, Gift, TrendingUp, Video } from "lucide-react";

export function CreatorRewards() {
  const { wallet, isConnected } = useChipiWallet();
  const { contract, getCreatorRewards, claimCreatorRewards } = useContract();
  const [rewards, setRewards] = useState({
    totalEarned: 0,
    pendingRewards: 0,
    videosCount: 0,
    totalLikes: 0
  });
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  const loadRewards = useCallback(async () => {
    if (!contract || !wallet) return;
    
    try {
      setLoading(true);
      const rewardsData = await getCreatorRewards(wallet.address);
      setRewards(rewardsData);
    } catch (error) {
      console.error("Error loading rewards:", error);
    } finally {
      setLoading(false);
    }
  }, [contract, wallet, getCreatorRewards]);

  useEffect(() => {
    if (isConnected && wallet && contract) {
      loadRewards();
    }
  }, [isConnected, wallet, contract, loadRewards]);

  const claimRewards = async () => {
    if (!contract || !wallet) return;
    
    try {
      setClaiming(true);
      await claimCreatorRewards();
      
      // Actualizar estado local
      setRewards(prev => ({
        ...prev,
        totalEarned: prev.totalEarned + prev.pendingRewards,
        pendingRewards: 0
      }));
    } catch (error) {
      console.error("Error claiming rewards:", error);
    } finally {
      setClaiming(false);
    }
  };

  if (!isConnected || !wallet) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
        color: '#ffffff'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Coins className="w-6 h-6" style={{ color: '#10b981' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
          Mis Recompensas
        </h3>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: '#9ca3af' }}>Cargando recompensas...</div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1rem',
            marginBottom: '1.5rem'
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
                  {rewards.totalEarned}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>VERSY Ganados</div>
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
                  {rewards.pendingRewards}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Pendientes</div>
            </div>

            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Video className="w-5 h-5" style={{ color: '#3b82f6' }} />
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>
                  {rewards.videosCount}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Videos</div>
            </div>

            <div style={{
              background: 'rgba(147, 51, 234, 0.1)',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <TrendingUp className="w-5 h-5" style={{ color: '#9333ea' }} />
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#9333ea' }}>
                  {rewards.totalLikes}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Likes Totales</div>
            </div>
          </div>

          {/* Claim Button */}
          {rewards.pendingRewards > 0 && (
            <motion.button
              onClick={claimRewards}
              disabled={claiming}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: claiming ? 0.6 : 1,
                boxShadow: claiming ? 'none' : '0 10px 25px -5px rgba(16, 185, 129, 0.25)'
              }}
            >
              {claiming ? (
                <>
                  <div style={{ 
                    width: '1rem', 
                    height: '1rem', 
                    border: '2px solid #ffffff', 
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>Reclamando...</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  <span>Reclamar {rewards.pendingRewards} VERSY</span>
                </>
              )}
            </motion.button>
          )}
        </>
      )}
    </motion.div>
  );
}
