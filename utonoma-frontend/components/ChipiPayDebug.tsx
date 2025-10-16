"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, Bug } from "lucide-react";

export function ChipiPayDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkChipiPay = async () => {
      setIsLoading(true);
      
      const info = {
        // Variables de entorno
        apiKey: process.env.NEXT_PUBLIC_CHIPI_API_KEY,
        environment: process.env.NEXT_PUBLIC_CHIPI_ENV,
        secretKey: process.env.CHIPI_SECRET_KEY ? 'Present' : 'Missing',
        
        // Window object
        windowChipiPay: typeof window !== 'undefined' ? !!window.ChipiPay : false,
        
        // ChipiPay SDK methods
        createWallet: typeof window !== 'undefined' && window.ChipiPay ? 
          typeof window.ChipiPay.createWallet : 'Not available',
        
        // Timestamp
        timestamp: new Date().toISOString(),
        
        // User agent
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
        
        // Location
        location: typeof window !== 'undefined' ? window.location.href : 'Server'
      };

      setDebugInfo(info);
      setIsLoading(false);
      
      console.log('🔍 ChipiPay Debug Info:', info);
    };

    checkChipiPay();
  }, []);

  const hasValidConfig = debugInfo.apiKey && debugInfo.environment;
  const hasChipiPaySDK = debugInfo.windowChipiPay;

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
        <Bug className="w-4 h-4" style={{ color: '#a855f7' }} />
        <span style={{ color: '#ffffff', fontWeight: 600 }}>
          ChipiPay Debug Info
        </span>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span style={{ fontSize: '0.875rem' }}>Verificando configuración...</span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
          <div style={{ color: debugInfo.apiKey ? '#10b981' : '#ef4444' }}>
            API Key: {debugInfo.apiKey ? `${debugInfo.apiKey.substring(0, 20)}...` : 'Missing'}
          </div>
          <div style={{ color: debugInfo.environment ? '#10b981' : '#ef4444' }}>
            Environment: {debugInfo.environment || 'Not set'}
          </div>
          <div style={{ color: debugInfo.secretKey === 'Present' ? '#10b981' : '#ef4444' }}>
            Secret Key: {debugInfo.secretKey}
          </div>
          <div style={{ color: hasChipiPaySDK ? '#10b981' : '#ef4444' }}>
            ChipiPay SDK: {hasChipiPaySDK ? 'Available' : 'Not loaded'}
          </div>
          <div style={{ color: debugInfo.createWallet !== 'Not available' ? '#10b981' : '#ef4444' }}>
            createWallet: {debugInfo.createWallet}
          </div>
          <div style={{ color: '#6b7280' }}>
            Timestamp: {debugInfo.timestamp}
          </div>
        </div>
      )}

      {/* Status Summary */}
      <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(31, 41, 55, 0.5)', borderRadius: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          {hasValidConfig && hasChipiPaySDK ? (
            <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
          ) : (
            <AlertCircle className="w-4 h-4" style={{ color: '#ef4444' }} />
          )}
          <span style={{ fontWeight: 600, color: hasValidConfig && hasChipiPaySDK ? '#10b981' : '#ef4444' }}>
            Status: {hasValidConfig && hasChipiPaySDK ? 'Ready' : 'Issues Found'}
          </span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
          {hasValidConfig && hasChipiPaySDK 
            ? 'ChipiPay está configurado correctamente' 
            : 'Hay problemas con la configuración de ChipiPay'
          }
        </div>
      </div>
    </motion.div>
  );
}
