"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, RefreshCw, Database } from "lucide-react";

export function ClerkMetadataDebug() {
  const { user, isSignedIn } = useUser();
  const [metadata, setMetadata] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMetadata = async () => {
    if (!user) return;
    
    setIsRefreshing(true);
    
    // Obtener metadata actualizado
    await user.reload();
    
    const currentMetadata = {
      publicMetadata: user.publicMetadata,
      privateMetadata: user.privateMetadata,
      unsafeMetadata: user.unsafeMetadata,
      timestamp: new Date().toISOString()
    };
    
    setMetadata(currentMetadata);
    console.log('🔍 Clerk Metadata Debug:', currentMetadata);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (user) {
      refreshMetadata();
    }
  }, [user]);

  if (!isSignedIn || !user) {
    return null;
  }

  const hasWalletInMetadata = !!metadata?.unsafeMetadata?.chipiWalletAddress;
  const walletAddress = metadata?.unsafeMetadata?.chipiWalletAddress;
  const walletCreated = metadata?.unsafeMetadata?.chipiWalletCreated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(17, 24, 39, 0.95)',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid rgba(31, 41, 55, 0.5)',
        marginBottom: '1rem',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {hasWalletInMetadata ? (
            <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
          ) : (
            <AlertCircle className="w-5 h-5" style={{ color: '#ef4444' }} />
          )}
          <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
            Clerk Metadata Status
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshMetadata}
          disabled={isRefreshing}
          style={{
            padding: '0.5rem',
            background: 'rgba(31, 41, 55, 0.5)',
            border: '1px solid rgba(55, 65, 81, 0.5)',
            borderRadius: '0.5rem',
            cursor: isRefreshing ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: '#9ca3af',
            transition: 'all 0.3s ease'
          }}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Wallet Status */}
        <div>
          <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            💾 Wallet en Clerk
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div style={{ color: hasWalletInMetadata ? '#10b981' : '#ef4444' }}>
              Status: {hasWalletInMetadata ? '✅ Guardada' : '❌ No encontrada'}
            </div>
            {walletAddress && (
              <div style={{ color: '#9ca3af' }}>
                Address: {walletAddress}
              </div>
            )}
            {walletCreated && (
              <div style={{ color: '#9ca3af' }}>
                Creada: {new Date(walletCreated).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div>
          <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            👤 User Info
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div style={{ color: '#9ca3af' }}>
              ID: {user.id}
            </div>
            <div style={{ color: '#9ca3af' }}>
              Email: {user.emailAddresses[0]?.emailAddress || 'No email'}
            </div>
            <div style={{ color: '#9ca3af' }}>
              Username: {user.username || 'No username'}
            </div>
          </div>
        </div>

        {/* Metadata Raw */}
        <div>
          <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            📊 Raw Metadata
          </h4>
          <div style={{ 
            background: 'rgba(17, 24, 39, 0.5)',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(31, 41, 55, 0.5)',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: '#9ca3af',
            maxHeight: '200px',
            overflow: 'auto'
          }}>
            <pre>{JSON.stringify(metadata?.unsafeMetadata, null, 2)}</pre>
          </div>
        </div>

        {/* Timestamp */}
        <div style={{ color: '#9ca3af', fontSize: '0.75rem', fontFamily: 'monospace' }}>
          Last Updated: {metadata?.timestamp}
        </div>
      </div>
    </motion.div>
  );
}
