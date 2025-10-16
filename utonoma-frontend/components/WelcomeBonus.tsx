"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Gift, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useChipiWallet } from "@/hooks/useChipiWallet";
import { useContract } from "@/hooks/useContract";
import { APP_CONFIG } from "@/lib/config";
import Image from "next/image";

export function WelcomeBonus() {
  const { wallet, isConnected } = useChipiWallet();
  const { claimWelcomeBonus, hasClaimedWelcome, isLoading, error } = useContract();
  
  const [claimed, setClaimed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const checkClaimed = useCallback(async () => {
    if (!isConnected || !wallet || hasChecked) {
      setChecking(false);
      return;
    }

    let timeoutId: NodeJS.Timeout | undefined;
    let isMounted = true;

    try {
      setChecking(true);
      setHasChecked(true);
      
      // Timeout después de 3 segundos para evitar rate limiting
      timeoutId = setTimeout(() => {
        if (isMounted) {
          console.log('⏰ Timeout verificando bonus - asumiendo no reclamado');
          setClaimed(false);
          setChecking(false);
        }
      }, 3000);

      // Verificar si hay contrato configurado antes de hacer la llamada
      if (!process.env.NEXT_PUBLIC_PLATFORM_ADDRESS || process.env.NEXT_PUBLIC_PLATFORM_ADDRESS === "") {
        console.log('📝 No hay contrato configurado - modo demo');
        if (isMounted) {
          if (timeoutId) clearTimeout(timeoutId);
          setClaimed(false);
          setChecking(false);
        }
        return;
      }

      const hasClaimed = await hasClaimedWelcome(wallet.address);
      
      if (isMounted) {
        if (timeoutId) clearTimeout(timeoutId);
        setClaimed(hasClaimed);
        setChecking(false);
      }
    } catch (err) {
      console.error('Error verificando bonus:', err);
      if (isMounted) {
        if (timeoutId) clearTimeout(timeoutId);
        // En caso de error, asumir que no está reclamado para permitir intentar
        setClaimed(false);
        setChecking(false);
      }
    }
  }, [isConnected, wallet, hasChecked, hasClaimedWelcome]);

  useEffect(() => {
    checkClaimed();
  }, [checkClaimed]);

  const handleClaim = async () => {
    if (!isConnected || !wallet) {
      return;
    }

    try {
      setClaiming(true);
      await claimWelcomeBonus();
      setClaimed(true);
      console.log('✅ Bonus reclamado exitosamente');
    } catch (err) {
      console.error('❌ Error reclamando bonus:', err);
    } finally {
      setClaiming(false);
    }
  };

  if (!isConnected || !wallet) {
    return null;
  }

  if (checking) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderRadius: '0.75rem',
          padding: '1rem',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#a855f7' }} />
          <span style={{ color: '#ffffff', fontSize: '0.875rem' }}>
            Verificando bonus...
          </span>
        </div>
      </motion.div>
    );
  }

  if (claimed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderRadius: '0.75rem',
          padding: '1rem',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
          <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: 500 }}>
            ¡Bonus de bienvenida ya reclamado!
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        marginBottom: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '1.5rem', height: '1.5rem', position: 'relative' }}>
            <Image
              src="/UtonomaLogo.png"
              alt="UTONOMA Logo"
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Gift className="w-5 h-5" style={{ color: '#a855f7' }} />
        </div>
        <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
          ¡Bonus de Bienvenida!
        </span>
      </div>

      <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem', margin: 0 }}>
        Reclama {APP_CONFIG.welcomeBonus} VERSY tokens como bonus de bienvenida
      </p>

      {error && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '0.75rem',
          color: '#ef4444',
          fontSize: '0.875rem'
        }}>
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClaim}
        disabled={claiming || isLoading}
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
          color: '#ffffff',
          fontWeight: 600,
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: (claiming || isLoading) ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          opacity: (claiming || isLoading) ? 0.7 : 1
        }}
      >
        {claiming || isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Reclamando...
          </>
        ) : (
          <>
            <Gift className="w-4 h-4" />
            Reclamar {APP_CONFIG.welcomeBonus} VERSY
          </>
        )}
      </motion.button>
    </motion.div>
  );
}