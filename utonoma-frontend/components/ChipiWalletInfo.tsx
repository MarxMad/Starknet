"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Wallet, Copy, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export function ChipiWalletInfo() {
  const { user, isLoaded } = useUser();
  const [copied, setCopied] = useState(false);

  // ChipiPay wallet address (si existe)
  // Nota: ChipiPay genera la wallet automáticamente cuando el usuario se registra con Clerk
  const walletAddress = user?.publicMetadata?.chipiWalletAddress as string | undefined;

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
          <span className="text-gray-600">Cargando información de wallet...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="text-center">
          <Wallet className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600">Inicia sesión para ver tu wallet</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-purple-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Wallet Embebida</h3>
          <p className="text-sm text-gray-600">Powered by ChipiPay</p>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Usuario:</p>
        <p className="font-semibold text-gray-900">
          {user.primaryEmailAddress?.emailAddress || user.firstName || "Usuario"}
        </p>
      </div>

      {/* Wallet Address */}
      {walletAddress ? (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Dirección de Wallet:</p>
          <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-200">
            <code className="text-xs font-mono text-gray-700 flex-1 truncate">
              {walletAddress}
            </code>
            <button
              onClick={copyAddress}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Copiar dirección"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 mb-2">
            <span className="font-semibold">⏳ Wallet en proceso de creación</span>
          </p>
          <p className="text-xs text-yellow-700">
            ChipiPay está generando tu wallet embebida. Esto puede tomar unos segundos.
          </p>
        </div>
      )}

      {/* Status Badge */}
      <div className="flex items-center justify-between pt-4 border-t border-purple-200">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${walletAddress ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className="text-sm font-medium text-gray-700">
            {walletAddress ? 'Wallet Activa' : 'Configurando...'}
          </span>
        </div>
        {walletAddress && (
          <span className="text-xs text-gray-500">Starknet</span>
        )}
      </div>

      {/* Debug Info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 text-xs">
          <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
            🔧 Debug Info
          </summary>
          <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto text-xs">
            {JSON.stringify({
              userId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              hasWallet: !!walletAddress,
              metadata: user.publicMetadata
            }, null, 2)}
          </pre>
        </details>
      )}
    </motion.div>
  );
}

