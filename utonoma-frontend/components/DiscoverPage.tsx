"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, BookOpen, Palette, Globe, Calculator, FlaskConical } from "lucide-react";

const categories = [
  { name: "Tendencia", icon: <TrendingUp className="w-5 h-5" />, color: "bg-red-500" },
  { name: "Matemáticas", icon: <Calculator className="w-5 h-5" />, color: "bg-blue-500" },
  { name: "Ciencias", icon: <FlaskConical className="w-5 h-5" />, color: "bg-green-500" },
  { name: "Arte", icon: <Palette className="w-5 h-5" />, color: "bg-purple-500" },
  { name: "Idiomas", icon: <Globe className="w-5 h-5" />, color: "bg-orange-500" },
  { name: "Historia", icon: <BookOpen className="w-5 h-5" />, color: "bg-indigo-500" },
  { name: "Tecnología", icon: <Users className="w-5 h-5" />, color: "bg-pink-500" },
];

const featuredVideos = [
  {
    id: 1,
    title: "Aprende React desde cero",
    creator: "TechEdu",
    views: "1.2M",
    likes: "45K",
    thumbnail: "https://via.placeholder.com/300x400?text=React+Tutorial"
  },
  {
    id: 2,
    title: "Matemáticas Avanzadas",
    creator: "MathPro",
    views: "890K",
    likes: "32K",
    thumbnail: "https://via.placeholder.com/300x400?text=Math+Advanced"
  },
  {
    id: 3,
    title: "Historia del Arte",
    creator: "ArtHistory",
    views: "567K",
    likes: "28K",
    thumbnail: "https://via.placeholder.com/300x400?text=Art+History"
  },
];

export function DiscoverPage() {
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
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.5rem',
            margin: 0
          }}
        >
          Descubre
        </h1>
        <p 
          style={{
            color: '#9ca3af',
            margin: 0
          }}
        >
          Explora contenido educativo increíble
        </p>
      </div>

      {/* Categories */}
      <div>
        <h2 
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: '1rem',
            margin: 0
          }}
        >
          Categorías
        </h2>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem'
          }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'rgba(17, 24, 39, 0.8)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                borderRadius: '0.75rem',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid rgba(31, 41, 55, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(17, 24, 39, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(17, 24, 39, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {category.icon}
              <span style={{ fontWeight: 600 }}>{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Featured Videos */}
      <div>
        <h2 
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: '1rem',
            margin: 0
          }}
        >
          Videos Destacados
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {featuredVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'rgba(17, 24, 39, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid rgba(31, 41, 55, 0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(17, 24, 39, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(17, 24, 39, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(31, 41, 55, 0.5)';
              }}
            >
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div 
                  style={{
                    width: '6rem',
                    height: '8rem',
                    background: 'rgba(31, 41, 55, 0.5)',
                    borderRadius: '0.5rem',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(55, 65, 81, 0.5)'
                  }}
                >
                  <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>📹</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 
                    style={{
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '0.25rem',
                      margin: 0
                    }}
                  >
                    {video.title}
                  </h3>
                  <p 
                    style={{
                      color: '#9ca3af',
                      fontSize: '0.875rem',
                      marginBottom: '0.5rem',
                      margin: 0
                    }}
                  >
                    por {video.creator}
                  </p>
                  <div 
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.875rem',
                      color: '#9ca3af'
                    }}
                  >
                    <span>{video.views} vistas</span>
                    <span>{video.likes} likes</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
