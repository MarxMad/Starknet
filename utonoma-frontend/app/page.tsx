"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { VideoFeed } from "@/components/VideoFeed";
import { VideoUpload } from "@/components/VideoUpload";
import { WelcomeBonus } from "@/components/WelcomeBonus";
import { BottomNav } from "@/components/BottomNav";
import { OnboardingTutorial } from "@/components/OnboardingTutorial";
import { UserProfile } from "@/components/UserProfile";
import { DiscoverPage } from "@/components/DiscoverPage";
import { NotificationsPage } from "@/components/NotificationsPage";
import { DemoMode } from "@/components/DemoMode";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Mail, Wallet } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"feed" | "upload" | "profile" | "search" | "notifications">("feed");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  // Removed activeTab state - no longer needed

  useEffect(() => {
    setMounted(true);
    // Mostrar onboarding solo la primera vez
    const hasSeenOnboarding = localStorage.getItem('utonoma_onboarding_seen');
    if (isSignedIn && !hasSeenOnboarding) {
      setShowOnboarding(true);
    }
    
    // Detectar si estamos en modo demo (sin contrato)
    const checkDemoMode = () => {
      const hasContract = process.env.NEXT_PUBLIC_PLATFORM_ADDRESS && 
                         process.env.NEXT_PUBLIC_PLATFORM_ADDRESS !== "";
      setIsDemoMode(!hasContract);
    };
    
    checkDemoMode();
  }, [isSignedIn]);

  const completeOnboarding = () => {
    localStorage.setItem('utonoma_onboarding_seen', 'true');
    setShowOnboarding(false);
  };

  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-pulse">🎬</div>
          <p className="text-gray-600 font-medium">Cargando UTONOMA...</p>
        </div>
      </div>
    );
  }

  // Landing Page - Diseño Tech Elegante con Estilos Inline
  if (!isSignedIn) {
  return (
      <div 
        style={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Effects */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.5) 0%, rgba(0, 0, 0, 1) 50%, rgba(17, 24, 39, 0.5) 100%)'
          }}
        ></div>
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.2) 0%, transparent 70%)'
          }}
        ></div>
        
        {/* Grid Pattern */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Main Content */}
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '72rem', width: '100%' }}
          >
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'center'
              }}
            >
              
              {/* Lado Izquierdo - Hero Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {/* Logo y Título */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ position: 'relative' }}
                  >
                    <div 
                      style={{
                        width: '5rem',
                        height: '5rem',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)'
                      }}
          >
            <Image
                        src="/UtonomaLogo.png" 
                        alt="UTONOMA Logo" 
                        width={56}
                        height={56}
                        style={{ objectFit: 'contain' }}
                        priority
                      />
                    </div>
                    {/* Glow effect */}
                    <div 
                      style={{
                        position: 'absolute',
                        inset: '-0.5rem',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
                        borderRadius: '1rem',
                        filter: 'blur(1rem)',
                        zIndex: -1
                      }}
                    ></div>
                  </motion.div>
                  
                  <div>
                    <h1 
                      style={{
                        fontSize: '3.75rem',
                        fontWeight: 900,
                        color: '#ffffff',
                        marginBottom: '1rem',
                        letterSpacing: '-0.025em'
                      }}
                    >
                      UTONOMA
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span 
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
                          color: '#ffffff',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          borderRadius: '9999px'
                        }}
                      >
                        BETA
                      </span>
                      <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>v1.0.0</span>
                    </div>
                    <p 
                      style={{
                        color: '#d1d5db',
                        fontSize: '1.25rem',
                        lineHeight: '1.75',
                        margin: 0
                      }}
                    >
                      La primera plataforma descentralizada de videos educativos 
                      <span style={{ color: '#ffffff', fontWeight: 600 }}> impulsada por Starknet</span>
                    </p>
                  </div>
                </div>

                {/* Features Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.5rem'
                  }}
                >
                  {[
                    {
                      icon: <Video className="w-6 h-6" style={{ color: '#ffffff' }} />,
                      title: 'Sube Videos',
                      desc: 'Contenido educativo en IPFS',
                      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                      hoverColor: 'rgba(59, 130, 246, 0.5)'
                    },
                    {
                      icon: <span style={{ fontSize: '1.5rem' }}>💎</span>,
                      title: 'Gana VERSY',
                      desc: '10 tokens por like',
                      gradient: 'linear-gradient(135deg, #eab308 0%, #ea580c 100%)',
                      hoverColor: 'rgba(234, 179, 8, 0.5)'
                    },
                    {
                      icon: <Wallet className="w-6 h-6" style={{ color: '#ffffff' }} />,
                      title: 'Wallet Auto',
                      desc: 'Generación automática',
                      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      hoverColor: 'rgba(16, 185, 129, 0.5)'
                    },
                    {
                      icon: <span style={{ fontSize: '1.5rem' }}>🎁</span>,
                      title: 'Bonus 150',
                      desc: 'VERSY de bienvenida',
                      gradient: 'linear-gradient(135deg, #ec4899 0%, #e11d48 100%)',
                      hoverColor: 'rgba(236, 72, 153, 0.5)'
                    }
                  ].map((feature, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <div 
                        style={{
                          padding: '1.5rem',
                          background: 'rgba(17, 24, 39, 0.5)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '1rem',
                          border: '1px solid rgba(31, 41, 55, 0.5)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = feature.hoverColor;
                          e.currentTarget.style.background = 'rgba(17, 24, 39, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)';
                          e.currentTarget.style.background = 'rgba(17, 24, 39, 0.5)';
                        }}
                      >
                        <div 
                          style={{
                            width: '3rem',
                            height: '3rem',
                            background: feature.gradient,
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {feature.icon}
                        </div>
                        <h3 style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem', margin: 0 }}>{feature.title}</h3>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Lado Derecho - Auth Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ position: 'relative' }}
              >
                <div 
                  style={{
                    background: 'rgba(17, 24, 39, 0.8)',
                    backdropFilter: 'blur(24px)',
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    border: '1px solid rgba(31, 41, 55, 0.5)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    position: 'relative'
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: '-0.25rem',
                      background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
                      borderRadius: '1.5rem',
                      filter: 'blur(0.5rem)',
                      zIndex: -1
                    }}
                  ></div>
                  
                  <div style={{ position: 'relative' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <h2 
                        style={{
                          fontSize: '1.875rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          marginBottom: '0.75rem',
                          margin: 0
                        }}
                      >
                        Únete a la Revolución
                      </h2>
                      <p style={{ color: '#9ca3af', margin: 0 }}>Comienza tu viaje educativo descentralizado</p>
                    </div>

                    {/* Auth Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {/* Email Signup */}
                      <SignUpButton mode="modal">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            width: '100%',
                            background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
                            color: '#ffffff',
                            fontWeight: 600,
                            padding: '1rem 1.5rem',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37, 99, 235, 0.25)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Mail className="w-5 h-5" />
                          Registrarse con Email
                        </motion.button>
                      </SignUpButton>

                      {/* Wallet Connect */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: '2px solid #374151',
                          color: '#ffffff',
                          fontWeight: 600,
                          padding: '1rem 1.5rem',
                          borderRadius: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#4b5563';
                          e.currentTarget.style.background = 'rgba(31, 41, 55, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#374151';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <Wallet className="w-5 h-5" />
                        Conectar Wallet
                      </motion.button>

                      {/* Divider */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
                        <div 
                          style={{
                            flex: 1,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent 0%, #374151 50%, transparent 100%)'
                          }}
                        ></div>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>o</span>
                        <div 
                          style={{
                            flex: 1,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent 0%, #374151 50%, transparent 100%)'
                          }}
                        ></div>
                      </div>

                      {/* Login */}
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#9ca3af', marginBottom: '1rem', margin: 0 }}>¿Ya eres parte de la comunidad?</p>
                        <SignInButton mode="modal">
                          <button 
                            style={{
                              color: '#60a5fa',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: 500,
                              textDecoration: 'underline',
                              textDecorationColor: 'rgba(96, 165, 250, 0.5)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#93c5fd';
                              e.currentTarget.style.textDecorationColor = '#93c5fd';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#60a5fa';
                              e.currentTarget.style.textDecorationColor = 'rgba(96, 165, 250, 0.5)';
                            }}
                          >
                            Iniciar Sesión
                          </button>
                        </SignInButton>
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #1f2937' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>
                          <span>Starknet</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#9333ea', borderRadius: '50%' }}></div>
                          <span>Clerk</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                          <span>ChipiPay</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Onboarding Tutorial
  if (showOnboarding) {
    return (
      <OnboardingTutorial onComplete={completeOnboarding} />
    );
  }

  // App Principal - Estilo Negro y Blanco
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 max-w-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎬</span>
              <h1 className="text-xl font-black text-white">UTONOMA</h1>
            </div>
            {view === "feed" && (
              <button className="text-xs px-3 py-1 bg-white text-black rounded-full font-semibold">
                Beta
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-14 pb-20">
        <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="container mx-auto px-4 max-w-lg"
          style={{ paddingTop: '5rem', paddingBottom: '6rem' }}
        >
        {view === "feed" && (
          <div className="space-y-6 py-4">
            {isDemoMode ? (
              <DemoMode />
            ) : (
              <>
                <WelcomeBonus />
                <VideoFeed />
              </>
            )}
          </div>
        )}
            
            {view === "search" && <DiscoverPage />}
            {view === "upload" && <VideoUpload />}
            {view === "notifications" && <NotificationsPage />}
            {view === "profile" && <UserProfile />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeView={view} onViewChange={setView} />
    </div>
  );
}

// Los componentes ya están importados desde sus archivos separados
