"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { User, Settings, LogOut, Coins, Video, Heart, Wallet, CheckCircle, Loader2 } from "lucide-react";
import { useChipiWallet } from "@/hooks/useChipiWallet";

export function UserProfile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { wallet, isLoading, error, isConnected } = useChipiWallet();

  if (!user) return null;

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
      {/* Profile Header */}
      <div 
        style={{
          background: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(31, 41, 55, 0.5)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div 
            style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '1.25rem',
              fontWeight: 700,
              boxShadow: '0 10px 25px -5px rgba(147, 51, 234, 0.25)'
            }}
          >
            {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0)}
          </div>
          <div>
            <h2 
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0
              }}
            >
              {user.fullName || "Usuario"}
            </h2>
            <p style={{ color: '#9ca3af', margin: 0 }}>
              @{user.username || "usuario"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div 
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0
              }}
            >
              0
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>Videos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div 
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0
              }}
            >
              0
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>Likes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div 
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fbbf24',
                margin: 0
              }}
            >
              150
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>VERSY</div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          style={{
            width: '100%',
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: '1px solid rgba(31, 41, 55, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(17, 24, 39, 0.9)';
            e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(17, 24, 39, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)';
          }}
        >
          <User className="w-5 h-5" style={{ color: '#9ca3af' }} />
          <span style={{ fontWeight: 500, color: '#ffffff' }}>Mi Perfil</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          style={{
            width: '100%',
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: '1px solid rgba(31, 41, 55, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(17, 24, 39, 0.9)';
            e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(17, 24, 39, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)';
          }}
        >
          <Coins className="w-5 h-5" style={{ color: '#fbbf24' }} />
          <span style={{ fontWeight: 500, color: '#ffffff' }}>Mis VERSY</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          style={{
            width: '100%',
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: '1px solid rgba(31, 41, 55, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(17, 24, 39, 0.9)';
            e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(17, 24, 39, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)';
          }}
        >
          <Video className="w-5 h-5" style={{ color: '#9ca3af' }} />
          <span style={{ fontWeight: 500, color: '#ffffff' }}>Mis Videos</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          style={{
            width: '100%',
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            border: '1px solid rgba(31, 41, 55, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(17, 24, 39, 0.9)';
            e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(17, 24, 39, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)';
          }}
        >
          <Settings className="w-5 h-5" style={{ color: '#9ca3af' }} />
          <span style={{ fontWeight: 500, color: '#ffffff' }}>Configuración</span>
        </motion.button>

        {/* ChipiPay Wallet Info */}
        <div 
          style={{
            background: isConnected 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            borderRadius: '0.75rem',
            padding: '1rem',
            border: isConnected 
              ? '1px solid rgba(16, 185, 129, 0.3)'
              : '1px solid rgba(147, 51, 234, 0.3)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            {isConnected ? (
              <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
            ) : isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#a855f7' }} />
            ) : (
              <Wallet className="w-5 h-5" style={{ color: '#a855f7' }} />
            )}
            <span style={{ fontWeight: 600, color: '#ffffff' }}>Wallet ChipiPay</span>
          </div>
          
          {isConnected && wallet ? (
            <>
              <p 
                style={{
                  fontSize: '0.875rem',
                  color: '#10b981',
                  marginBottom: '0.75rem',
                  margin: 0,
                  fontWeight: 500
                }}
              >
                ✅ Wallet activa y lista para usar
              </p>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  wordBreak: 'break-all'
                }}
              >
                {wallet.address}
              </div>
            </>
          ) : isLoading ? (
            <>
              <p 
                style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                  marginBottom: '0.75rem',
                  margin: 0
                }}
              >
                🔧 Generando tu wallet embebida...
              </p>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  fontFamily: 'monospace',
                  background: 'rgba(17, 24, 39, 0.5)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  border: '1px solid rgba(31, 41, 55, 0.5)'
                }}
              >
                Generando...
              </div>
            </>
          ) : error ? (
            <>
              <p 
                style={{
                  fontSize: '0.875rem',
                  color: '#ef4444',
                  marginBottom: '0.75rem',
                  margin: 0
                }}
              >
                ❌ Error al generar wallet
              </p>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: '#ef4444',
                  fontFamily: 'monospace',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
              >
                {error}
              </div>
            </>
          ) : (
            <>
              <p 
                style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                  marginBottom: '0.75rem',
                  margin: 0
                }}
              >
                Tu wallet embebida se genera automáticamente
              </p>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  fontFamily: 'monospace',
                  background: 'rgba(17, 24, 39, 0.5)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  border: '1px solid rgba(31, 41, 55, 0.5)'
                }}
              >
                Esperando...
              </div>
            </>
          )}
        </div>

        {/* Disconnect Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => signOut()}
          style={{
            width: '100%',
            background: 'transparent',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            color: '#ef4444',
            borderRadius: '0.75rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
          }}
        >
          <LogOut className="w-5 h-5" />
          <span style={{ fontWeight: 600 }}>Desconectar</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
