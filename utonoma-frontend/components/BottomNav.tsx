"use client";

import { useUser } from "@clerk/nextjs";
import { Home, Search, Plus, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeView: "feed" | "upload" | "profile" | "search" | "notifications";
  onViewChange: (view: "feed" | "upload" | "profile" | "search" | "notifications") => void;
}

export function BottomNav({ activeView, onViewChange }: BottomNavProps) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return null;

  const navItems = [
    { id: "feed" as const, icon: Home, label: "Home" },
    { id: "search" as const, icon: Search, label: "Discover" },
    { id: "upload" as const, icon: Plus, label: "", isPrimary: true },
    { id: "notifications" as const, icon: Bell, label: "Notifications" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ];

  const handleNavClick = (id: typeof navItems[number]["id"]) => {
    onViewChange(id);
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(31, 41, 55, 0.5)',
          boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div style={{ maxWidth: '32rem', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0.5rem 0' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              if (item.isPrimary) {
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    style={{ position: 'relative', marginTop: '-0.5rem' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
                        border: '2px solid rgba(17, 24, 39, 0.8)'
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: '#ffffff' }} strokeWidth={3} />
                    </div>
                  </motion.button>
                );
              }

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    background: isActive ? 'rgba(31, 41, 55, 0.5)' : 'transparent',
                    border: isActive ? '1px solid rgba(75, 85, 99, 0.5)' : '1px solid transparent'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(31, 41, 55, 0.3)';
                      e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <Icon
                      className="w-6 h-6"
                      style={{ 
                        color: isActive ? '#ffffff' : '#9ca3af',
                        strokeWidth: isActive ? 2.5 : 2
                      }}
                      fill={isActive ? "currentColor" : "none"}
                    />
                    {item.id === "notifications" && (
                      <span 
                        style={{
                          position: 'absolute',
                          top: '-0.125rem',
                          right: '-0.125rem',
                          width: '0.5rem',
                          height: '0.5rem',
                          backgroundColor: '#ef4444',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                  </div>
                  {item.label && (
                    <span 
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: isActive ? '#ffffff' : '#9ca3af'
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Safe area padding for mobile */}
      <div style={{ height: '5rem' }} />
    </>
  );
}

