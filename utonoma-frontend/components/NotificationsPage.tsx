"use client";

import { motion } from "framer-motion";
import { Bell, Heart, User, Video, Coins } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "like",
    message: "Tu video 'Aprende React' recibió 15 nuevos likes",
    time: "hace 2 horas",
    icon: <Heart className="w-5 h-5 text-red-500" />,
    unread: true
  },
  {
    id: 2,
    type: "follow",
    message: "TechEdu empezó a seguirte",
    time: "hace 4 horas",
    icon: <User className="w-5 h-5 text-blue-500" />,
    unread: true
  },
  {
    id: 3,
    type: "reward",
    message: "Ganaste 150 VERSY por tu video educativo",
    time: "hace 1 día",
    icon: <Coins className="w-5 h-5 text-yellow-500" />,
    unread: false
  },
  {
    id: 4,
    type: "comment",
    message: "Nuevo comentario en tu video 'Matemáticas Básicas'",
    time: "hace 2 días",
    icon: <Video className="w-5 h-5 text-purple-500" />,
    unread: false
  },
];

export function NotificationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '1rem',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <Bell className="w-6 h-6" style={{ color: '#a855f7' }} />
        <h1 
          style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0
          }}
        >
          Notificaciones
        </h1>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'rgba(17, 24, 39, 0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: notification.unread 
                ? '1px solid rgba(168, 85, 247, 0.5)' 
                : '1px solid rgba(31, 41, 55, 0.5)',
              borderLeft: notification.unread ? '4px solid #a855f7' : '1px solid rgba(31, 41, 55, 0.5)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(17, 24, 39, 0.9)';
              e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(17, 24, 39, 0.8)';
              e.currentTarget.style.borderColor = notification.unread 
                ? 'rgba(168, 85, 247, 0.5)' 
                : 'rgba(31, 41, 55, 0.5)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ flexShrink: 0 }}>
                {notification.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p 
                  style={{
                    color: '#ffffff',
                    fontWeight: 500,
                    margin: 0,
                    lineHeight: '1.5'
                  }}
                >
                  {notification.message}
                </p>
                <p 
                  style={{
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem',
                    margin: 0
                  }}
                >
                  {notification.time}
                </p>
              </div>
              {notification.unread && (
                <div 
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: '#a855f7',
                    borderRadius: '50%',
                    flexShrink: 0,
                    marginTop: '0.5rem'
                  }}
                ></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State (if no notifications) */}
      {notifications.length === 0 && (
        <div 
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            background: 'rgba(17, 24, 39, 0.5)',
            borderRadius: '1rem',
            border: '1px solid rgba(31, 41, 55, 0.5)',
            margin: '1rem 0'
          }}
        >
          <Bell className="w-16 h-16" style={{ color: '#6b7280', margin: '0 auto 1rem' }} />
          <h3 
            style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '0.5rem',
              margin: 0
            }}
          >
            No hay notificaciones
          </h3>
          <p 
            style={{
              color: '#9ca3af',
              margin: 0
            }}
          >
            Cuando recibas likes o comentarios, aparecerán aquí
          </p>
        </div>
      )}
    </motion.div>
  );
}
