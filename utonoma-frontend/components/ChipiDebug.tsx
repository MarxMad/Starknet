"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ChipiDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const checkChipiPay = () => {
      const info = {
        windowChipiPay: !!window.ChipiPay,
        chipiPayType: typeof window.ChipiPay,
        chipiPayMethods: window.ChipiPay ? Object.keys(window.ChipiPay) : [],
        environment: process.env.NEXT_PUBLIC_CHIPI_ENV,
        apiKey: process.env.NEXT_PUBLIC_CHIPI_API_KEY ? 'Present' : 'Missing',
        secretKey: process.env.CHIPI_SECRET_KEY ? 'Present' : 'Missing',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };
      
      setDebugInfo(info);
      console.log('🔍 ChipiPay Debug Info:', info);
    };

    // Verificar inmediatamente
    checkChipiPay();

    // Verificar después de un delay
    const timer = setTimeout(checkChipiPay, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(17, 24, 39, 0.9)',
        borderRadius: '0.75rem',
        padding: '1rem',
        border: '1px solid rgba(31, 41, 55, 0.5)',
        marginBottom: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.75rem'
      }}
    >
      <h3 style={{ color: '#ffffff', marginBottom: '0.5rem', margin: 0 }}>
        🔍 ChipiPay Debug Info
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ color: '#9ca3af' }}>
          <strong>window.ChipiPay:</strong> {debugInfo.windowChipiPay ? '✅ Available' : '❌ Not Available'}
        </div>
        <div style={{ color: '#9ca3af' }}>
          <strong>Type:</strong> {debugInfo.chipiPayType}
        </div>
        <div style={{ color: '#9ca3af' }}>
          <strong>Methods:</strong> {debugInfo.chipiPayMethods?.join(', ') || 'None'}
        </div>
        <div style={{ color: '#9ca3af' }}>
          <strong>Environment:</strong> {debugInfo.environment}
        </div>
        <div style={{ color: '#9ca3af' }}>
          <strong>API Key:</strong> {debugInfo.apiKey}
        </div>
        <div style={{ color: '#9ca3af' }}>
          <strong>Secret Key:</strong> {debugInfo.secretKey}
        </div>
        <div style={{ color: '#9ca3af' }}>
          <strong>Timestamp:</strong> {debugInfo.timestamp}
        </div>
      </div>
    </motion.div>
  );
}
