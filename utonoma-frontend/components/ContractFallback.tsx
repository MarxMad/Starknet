"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";

interface ContractFallbackProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export function ContractFallback({ onRetry, isRetrying = false }: ContractFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '20rem',
        background: 'rgba(17, 24, 39, 0.5)',
        borderRadius: '1rem',
        border: '1px solid rgba(31, 41, 55, 0.5)',
        padding: '2rem',
        textAlign: 'center',
        color: '#ffffff'
      }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ marginBottom: '1.5rem' }}
      >
        <AlertTriangle 
          className="w-16 h-16" 
          style={{ color: '#fbbf24' }} 
        />
      </motion.div>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 700, 
        marginBottom: '1rem',
        color: '#fbbf24'
      }}>
        Error de Conexión
      </h3>

      <p style={{ 
        color: '#9ca3af', 
        marginBottom: '1.5rem',
        maxWidth: '24rem',
        lineHeight: '1.6'
      }}>
        No se pudo conectar con el contrato. Verifica que las direcciones estén configuradas correctamente.
      </p>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        marginBottom: '1.5rem',
        color: '#6b7280',
        fontSize: '0.875rem'
      }}>
        <WifiOff className="w-4 h-4" />
        <span>RPC: {process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.starknet.io/sepolia'}</span>
      </div>

      <motion.button
        onClick={onRetry}
        disabled={isRetrying}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
          color: '#ffffff',
          fontWeight: 600,
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          border: 'none',
          cursor: isRetrying ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          opacity: isRetrying ? 0.6 : 1,
          boxShadow: isRetrying ? 'none' : '0 10px 25px -5px rgba(37, 99, 235, 0.25)'
        }}
      >
        {isRetrying ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
            <span>Conectando...</span>
          </>
        ) : (
          <>
            <RefreshCw className="w-5 h-5" />
            <span>Intentar de nuevo</span>
          </>
        )}
      </motion.button>

      <div style={{ 
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(31, 41, 55, 0.3)',
        borderRadius: '0.5rem',
        fontSize: '0.75rem',
        color: '#9ca3af',
        maxWidth: '20rem'
      }}>
        <p style={{ margin: 0, marginBottom: '0.5rem' }}>
          <strong>Posibles soluciones:</strong>
        </p>
        <ul style={{ margin: 0, paddingLeft: '1rem', textAlign: 'left' }}>
          <li>Verifica tu conexión a internet</li>
          <li>Revisa las variables de entorno</li>
          <li>Confirma que el contrato esté desplegado</li>
        </ul>
      </div>
    </motion.div>
  );
}
