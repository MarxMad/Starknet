"use client";

import { motion } from "framer-motion";
import { Video, Heart, Coins, Users, ArrowRight, X } from "lucide-react";

interface OnboardingTutorialProps {
  onComplete: () => void;
}

export function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const steps = [
    {
      icon: <Video className="w-8 h-8 text-purple-600" />,
      title: "Sube Videos",
      description: "Comparte contenido educativo y gana VERSY tokens por cada like que recibas."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Recibe Likes",
      description: "Cada like que recibas te da 10 VERSY tokens. ¡Más engagement = más recompensas!"
    },
    {
      icon: <Coins className="w-8 h-8 text-yellow-500" />,
      title: "Gana VERSY",
      description: "Usa tus tokens VERSY para colaboraciones, premium features y más."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Conecta",
      description: "Únete a la comunidad educativa más grande de Starknet."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        style={{
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(24px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          maxWidth: '28rem',
          width: '100%',
          margin: '0 1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(31, 41, 55, 0.5)',
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0
            }}
          >
            ¡Bienvenido a UTONOMA!
          </h2>
          <button
            onClick={onComplete}
            style={{
              padding: '0.5rem',
              background: 'rgba(31, 41, 55, 0.5)',
              border: '1px solid rgba(55, 65, 81, 0.5)',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(31, 41, 55, 0.7)';
              e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(31, 41, 55, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
            }}
          >
            <X className="w-5 h-5" style={{ color: '#9ca3af' }} />
          </button>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
            >
              <div 
                style={{
                  flexShrink: 0,
                  width: '3rem',
                  height: '3rem',
                  background: 'rgba(31, 41, 55, 0.5)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(55, 65, 81, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.7)';
                  e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.5)';
                  e.currentTarget.style.borderColor = 'rgba(55, 65, 81, 0.5)';
                }}
              >
                {step.icon}
              </div>
              <div>
                <h3 
                  style={{
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '0.25rem',
                    margin: 0,
                    fontSize: '1rem'
                  }}
                >
                  {step.title}
                </h3>
                <p 
                  style={{
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    margin: 0,
                    lineHeight: '1.5'
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 100%)',
            color: '#ffffff',
            fontWeight: 600,
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37, 99, 235, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span>¡Empezar a crear!</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
