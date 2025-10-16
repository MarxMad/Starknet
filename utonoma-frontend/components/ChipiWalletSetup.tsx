"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Wallet, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useChipiWallet } from "@/hooks/useChipiWallet";

export function ChipiWalletSetup() {
  const { isSignedIn } = useUser();
  const { wallet, isLoading, error, isConnected } = useChipiWallet();

  if (!isSignedIn) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid rgba(147, 51, 234, 0.3)',
        backdropFilter: 'blur(8px)',
        marginBottom: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <Wallet className="w-5 h-5" style={{ color: '#a855f7' }} />
        <span style={{ fontWeight: 600, color: '#ffffff' }}>Wallet ChipiPay</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span style={{ fontSize: '0.875rem' }}>
              {wallet ? 'Verificando wallet...' : 'Generando tu wallet embebida...'}
            </span>
          </div>
        )}
        
        {isConnected && wallet && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
              <CheckCircle className="w-4 h-4" />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Wallet activa</span>
            </div>
            <div 
              style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                fontFamily: 'monospace',
                background: 'rgba(17, 24, 39, 0.5)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                border: '1px solid rgba(31, 41, 55, 0.5)',
                wordBreak: 'break-all'
              }}
            >
              {wallet.address}
            </div>
          </div>
        )}
        
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
            <AlertCircle className="w-4 h-4" />
            <span style={{ fontSize: '0.875rem' }}>Error: {error}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
