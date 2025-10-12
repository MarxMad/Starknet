#!/usr/bin/env node

/**
 * Script para distribuir fondos entre receptores
 * Uso: node scripts/distribute.js
 */

import ChipiPayIntegration from '../index.js';

async function main() {
  console.log('🚀 Iniciando distribución de fondos...');
  console.log('');

  try {
    const integration = new ChipiPayIntegration();
    
    // Verificar balance antes de distribuir
    console.log('📊 Verificando balance antes de la distribución...');
    const balanceBefore = await integration.getBalance();
    console.log('💰 Balance actual:', balanceBefore, 'wei');
    console.log('');
    
    if (balanceBefore === '0') {
      console.log('⚠️  No hay fondos para distribuir');
      process.exit(0);
    }
    
    // Confirmar distribución
    console.log('🎁 Distribuyendo fondos entre receptores...');
    const txHash = await integration.distribute();
    
    console.log('');
    console.log('✅ Distribución completada exitosamente!');
    console.log('📝 Transaction Hash:', txHash);
    console.log('🔍 Ver en Starkscan: https://sepolia.starkscan.co/tx/' + txHash);
    
    // Verificar balance después de distribuir
    console.log('');
    console.log('📊 Verificando balance después de la distribución...');
    const balanceAfter = await integration.getBalance();
    console.log('💰 Balance actual:', balanceAfter, 'wei');
    console.log('✅ Fondos distribuidos:', (BigInt(balanceBefore) - BigInt(balanceAfter)).toString(), 'wei');
    
  } catch (error) {
    console.error('');
    console.error('❌ Error al distribuir fondos:', error.message);
    process.exit(1);
  }
}

main();

