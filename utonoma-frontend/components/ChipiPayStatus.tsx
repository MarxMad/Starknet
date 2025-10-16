"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";

export function ChipiPayStatus() {
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkChipiPay = () => {
      console.log('🔍 Verificando ChipiPay SDK...');
      
      // Verificar si window.ChipiPay existe
      if (typeof window !== 'undefined' && window.ChipiPay) {
        console.log('✅ ChipiPay SDK encontrado:', window.ChipiPay);
        setStatus('success');
        setError(null);
        return;
      }

      // Si no existe después de 3 segundos, marcar como error
      setTimeout(() => {
        if (!window.ChipiPay) {
          setError('ChipiPay SDK no se pudo cargar después de 3 segundos');
          setStatus('error');
        }
      }, 3000);
    };

    checkChipiPay();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setStatus('checking');
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(17, 24, 39, 0.9)',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid rgba(31, 41, 55, 0.5)',
        marginBottom: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {status === 'checking' && <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#3b82f6' }} />}
          {status === 'success' && <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />}
          {status === 'error' && <AlertCircle className="w-4 h-4" style={{ color: '#ef4444' }} />}
          <span style={{ color: '#ffffff', fontWeight: 600 }}>
            ChipiPay SDK Status
          </span>
        </div>
        
        {status === 'error' && (
          <button
            onClick={handleRetry}
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '0.375rem',
              padding: '0.25rem 0.5rem',
              color: '#60a5fa',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <RefreshCw className="w-3 h-3" />
            Reintentar
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {status === 'checking' && (
          <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            Verificando ChipiPay SDK...
          </div>
        )}
        
        {status === 'success' && (
          <div style={{ color: '#10b981', fontSize: '0.875rem' }}>
            ✅ ChipiPay SDK cargado correctamente
          </div>
        )}
        
        {status === 'error' && (
          <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>
            ❌ {error}
          </div>
        )}

        <div style={{ color: '#6b7280', fontSize: '0.75rem', fontFamily: 'monospace' }}>
          Retry Count: {retryCount}
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.75rem', fontFamily: 'monospace' }}>
          window.ChipiPay: {typeof window !== 'undefined' && window.ChipiPay ? 'Available' : 'Not Available'}
        </div>
      </div>
    </motion.div>
  );
}
