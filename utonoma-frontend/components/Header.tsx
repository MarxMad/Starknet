"use client";

import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { WalletInfo } from "./WalletInfo";

export function Header() {
  const { isSignedIn } = useUser();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(17, 24, 39, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(31, 41, 55, 0.5)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <div 
              style={{
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                boxShadow: '0 4px 12px -2px rgba(37, 99, 235, 0.25)'
              }}
            >
              🎬
            </div>
            <h1 
              style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.025em'
              }}
            >
              UTONOMA
            </h1>
            {isSignedIn && (
              <span 
                style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                  background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px -2px rgba(37, 99, 235, 0.25)'
                }}
              >
                Beta
              </span>
            )}
          </motion.div>

          {/* User Button and Wallet Info */}
          {isSignedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <WalletInfo />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(31, 41, 55, 0.5)',
                  borderRadius: '0.75rem',
                  padding: '0.25rem',
                  border: '1px solid rgba(55, 65, 81, 0.5)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-gray-900 border-gray-700",
                      userButtonPopoverActionButton: "text-gray-300 hover:text-white hover:bg-gray-800"
                    }
                  }}
                />
              </motion.div>
            </div>
          ) : (
            <div 
              style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                background: 'rgba(31, 41, 55, 0.5)',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(55, 65, 81, 0.5)'
              }}
            >
              No logueado
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
