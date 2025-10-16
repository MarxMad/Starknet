"use client";

import { useChipiWallet } from "@/hooks/useChipiWallet";
import { motion } from "framer-motion";
import { Wallet, Copy, Check } from "lucide-react";
import { useState } from "react";

export function WalletInfo() {
  const { wallet, isLoading, isConnected } = useChipiWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected || !wallet) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Wallet className="w-4 h-4" style={{ color: '#9ca3af' }} />
        <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          {isLoading ? 'Generando wallet...' : 'Sin wallet'}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(31, 41, 55, 0.5)',
        borderRadius: '0.5rem',
        padding: '0.5rem 0.75rem',
        border: '1px solid rgba(55, 65, 81, 0.5)',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={copyAddress}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(31, 41, 55, 0.7)';
        e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(31, 41, 55, 0.5)';
        e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
      }}
    >
      <Wallet className="w-4 h-4" style={{ color: '#a855f7' }} />
      <span style={{ color: '#ffffff', fontSize: '0.875rem', fontFamily: 'monospace' }}>
        {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
      </span>
      {copied ? (
        <Check className="w-3 h-3" style={{ color: '#10b981' }} />
      ) : (
        <Copy className="w-3 h-3" style={{ color: '#9ca3af' }} />
      )}
    </motion.div>
  );
}
