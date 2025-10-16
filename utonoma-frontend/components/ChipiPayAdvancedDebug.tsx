"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";

export function ChipiPayAdvancedDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkChipiPayStatus = async () => {
    setIsRefreshing(true);
    
    const info = {
      timestamp: new Date().toISOString(),
      environment: {
        apiKey: process.env.NEXT_PUBLIC_CHIPI_API_KEY,
        secretKey: process.env.CHIPI_SECRET_KEY ? 'Present' : 'Missing',
        env: process.env.NEXT_PUBLIC_CHIPI_ENV,
        clerkKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      },
      window: {
        chipiPay: typeof window !== 'undefined' ? !!window.ChipiPay : false,
        createWallet: typeof window !== 'undefined' && window.ChipiPay?.createWallet ? 'Available' : 'Not available',
        getWallet: typeof window !== 'undefined' && window.ChipiPay?.getWallet ? 'Available' : 'Not available',
        signTransaction: typeof window !== 'undefined' && window.ChipiPay?.signTransaction ? 'Available' : 'Not available'
      },
      network: {
        online: typeof navigator !== 'undefined' ? navigator.onLine : 'Unknown',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'Unknown'
      }
    };

    // Intentar hacer una llamada de prueba a ChipiPay si está disponible
    if (typeof window !== 'undefined' && window.ChipiPay) {
      try {
        console.log('🔍 Probando ChipiPay SDK...');
        // Aquí podrías hacer una llamada de prueba si ChipiPay lo permite
        info.sdkTest = 'SDK disponible y funcional';
      } catch (error) {
        info.sdkTest = `Error en SDK: ${error}`;
      }
    } else {
      info.sdkTest = 'SDK no disponible';
    }

    setDebugInfo(info);
    console.log('🔍 ChipiPay Advanced Debug:', info);
    setIsRefreshing(false);
  };

  useEffect(() => {
    checkChipiPayStatus();
    const interval = setInterval(checkChipiPayStatus, 10000); // Actualizar cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const hasValidConfig = debugInfo.environment?.apiKey && debugInfo.environment?.secretKey === 'Present';
  const isSdkLoaded = debugInfo.window?.chipiPay;

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
          {isSdkLoaded && hasValidConfig ? (
            <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
          ) : (
            <AlertCircle className="w-5 h-5" style={{ color: '#ef4444' }} />
          )}
          <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem' }}>
            ChipiPay Advanced Debug
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkChipiPayStatus}
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
          onMouseEnter={(e) => {
            if (!isRefreshing) {
              e.currentTarget.style.background = 'rgba(31, 41, 55, 0.7)';
              e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isRefreshing) {
              e.currentTarget.style.background = 'rgba(31, 41, 55, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
            }
          }}
        >
          {isRefreshing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Environment Variables */}
        <div>
          <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            🔧 Environment Variables
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div style={{ color: debugInfo.environment?.apiKey ? '#10b981' : '#ef4444' }}>
              API Key: {debugInfo.environment?.apiKey ? `${debugInfo.environment.apiKey.substring(0, 20)}...` : 'Missing'}
            </div>
            <div style={{ color: debugInfo.environment?.secretKey === 'Present' ? '#10b981' : '#ef4444' }}>
              Secret Key: {debugInfo.environment?.secretKey}
            </div>
            <div style={{ color: debugInfo.environment?.env ? '#10b981' : '#ef4444' }}>
              Environment: {debugInfo.environment?.env || 'Not set'}
            </div>
            <div style={{ color: debugInfo.environment?.clerkKey ? '#10b981' : '#ef4444' }}>
              Clerk Key: {debugInfo.environment?.clerkKey ? `${debugInfo.environment.clerkKey.substring(0, 20)}...` : 'Missing'}
            </div>
          </div>
        </div>

        {/* Window Object */}
        <div>
          <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            🌐 Window Object
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div style={{ color: debugInfo.window?.chipiPay ? '#10b981' : '#ef4444' }}>
              window.ChipiPay: {debugInfo.window?.chipiPay ? 'Available' : 'Not available'}
            </div>
            <div style={{ color: debugInfo.window?.createWallet === 'Available' ? '#10b981' : '#ef4444' }}>
              createWallet: {debugInfo.window?.createWallet}
            </div>
            <div style={{ color: debugInfo.window?.getWallet === 'Available' ? '#10b981' : '#ef4444' }}>
              getWallet: {debugInfo.window?.getWallet}
            </div>
            <div style={{ color: debugInfo.window?.signTransaction === 'Available' ? '#10b981' : '#ef4444' }}>
              signTransaction: {debugInfo.window?.signTransaction}
            </div>
          </div>
        </div>

        {/* Network Status */}
        <div>
          <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            🌍 Network Status
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div style={{ color: debugInfo.network?.online ? '#10b981' : '#ef4444' }}>
              Online: {debugInfo.network?.online ? 'Yes' : 'No'}
            </div>
            <div style={{ color: '#9ca3af' }}>
              User Agent: {debugInfo.network?.userAgent}
            </div>
          </div>
        </div>

        {/* SDK Test */}
        <div>
          <h4 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            🧪 SDK Test
          </h4>
          <div style={{ 
            color: debugInfo.sdkTest?.includes('Error') ? '#ef4444' : '#10b981',
            fontFamily: 'monospace', 
            fontSize: '0.75rem',
            background: 'rgba(17, 24, 39, 0.5)',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(31, 41, 55, 0.5)'
          }}>
            {debugInfo.sdkTest || 'No test performed'}
          </div>
        </div>

        {/* Timestamp */}
        <div style={{ color: '#9ca3af', fontSize: '0.75rem', fontFamily: 'monospace' }}>
          Last Updated: {debugInfo.timestamp}
        </div>
      </div>
    </motion.div>
  );
}
