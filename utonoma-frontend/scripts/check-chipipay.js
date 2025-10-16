#!/usr/bin/env node

// Script para verificar la configuración de ChipiPay
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de ChipiPay...\n');

// Verificar archivo .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ Archivo .env.local encontrado');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  const requiredVars = [
    'NEXT_PUBLIC_CHIPI_API_KEY',
    'CHIPI_SECRET_KEY',
    'NEXT_PUBLIC_CHIPI_ENV'
  ];
  
  console.log('\n📋 Variables de entorno:');
  requiredVars.forEach(varName => {
    const line = lines.find(l => l.startsWith(varName));
    if (line) {
      const value = line.split('=')[1];
      const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
      console.log(`  ✅ ${varName}: ${displayValue}`);
    } else {
      console.log(`  ❌ ${varName}: No encontrada`);
    }
  });
} else {
  console.log('❌ Archivo .env.local no encontrado');
}

// Verificar package.json
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const chipiDependency = packageJson.dependencies?.['@chipi-stack/nextjs'];
  
  console.log('\n📦 Dependencias:');
  if (chipiDependency) {
    console.log(`  ✅ @chipi-stack/nextjs: ${chipiDependency}`);
  } else {
    console.log('  ❌ @chipi-stack/nextjs: No encontrada');
  }
}

// Verificar layout.tsx
const layoutPath = path.join(__dirname, '..', 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  console.log('\n🔧 Configuración del Layout:');
  if (layoutContent.includes('ChipiProvider')) {
    console.log('  ✅ ChipiProvider encontrado en layout.tsx');
  } else {
    console.log('  ❌ ChipiProvider no encontrado en layout.tsx');
  }
  
  if (layoutContent.includes('ClerkProvider')) {
    console.log('  ✅ ClerkProvider encontrado en layout.tsx');
  } else {
    console.log('  ❌ ClerkProvider no encontrado en layout.tsx');
  }
}

console.log('\n🎯 Recomendaciones:');
console.log('1. Verifica que las variables de entorno estén correctas');
console.log('2. Reinicia el servidor de desarrollo');
console.log('3. Verifica que ChipiPay SDK se cargue en el navegador');
console.log('4. Revisa la consola del navegador para errores');
