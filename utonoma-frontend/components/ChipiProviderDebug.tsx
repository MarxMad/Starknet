"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function ChipiProviderDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const checkProvider = () => {
      const info = {
        apiKey: process.env.NEXT_PUBLIC_CHIPI_API_KEY,
        environment: process.env.NEXT_PUBLIC_CHIPI_ENV,
        clerkKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        windowChipiPay: typeof window !== 'undefined' ? !!window.ChipiPay : false,
        timestamp: new Date().toISOString()
      };
      
      setDebugInfo(info);
      console.log('🔍 ChipiProvider Debug:', info);
    };

    checkProvider();
  }, []);

  const hasValidConfig = debugInfo.apiKey && debugInfo.clerkKey;

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {hasValidConfig ? (
          <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
        ) : (
          <AlertCircle className="w-4 h-4" style={{ color: '#ef4444' }} />
        )}
        <span style={{ color: '#ffffff', fontWeight: 600 }}>
          ChipiProvider Configuration
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
        <div style={{ color: debugInfo.apiKey ? '#10b981' : '#ef4444' }}>
          API Key: {debugInfo.apiKey ? `${debugInfo.apiKey.substring(0, 20)}...` : 'Missing'}
        </div>
        <div style={{ color: debugInfo.environment ? '#10b981' : '#ef4444' }}>
          Environment: {debugInfo.environment || 'Not set'}
        </div>
        <div style={{ color: debugInfo.clerkKey ? '#10b981' : '#ef4444' }}>
          Clerk Key: {debugInfo.clerkKey ? 'Present' : 'Missing'}
        </div>
        <div style={{ color: debugInfo.windowChipiPay ? '#10b981' : '#ef4444' }}>
          window.ChipiPay: {debugInfo.windowChipiPay ? 'Available' : 'Not Available'}
        </div>
        <div style={{ color: '#6b7280' }}>
          Timestamp: {debugInfo.timestamp}
        </div>
      </div>

      {!hasValidConfig && (
        <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.375rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div style={{ color: '#ef4444', fontSize: '0.75rem' }}>
            ⚠️ ChipiProvider no está configurado correctamente. Verifica las variables de entorno.
          </div>
        </div>
      )}
    </motion.div>
  );
}
