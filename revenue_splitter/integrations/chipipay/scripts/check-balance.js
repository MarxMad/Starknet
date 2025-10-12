#!/usr/bin/env node

/**
 * Script para verificar el balance del contrato
 * Uso: node scripts/check-balance.js
 */

import ChipiPayIntegration from '../index.js';

async function main() {
  console.log('🚀 Verificando balance del contrato...');
  console.log('');

  try {
    const integration = new ChipiPayIntegration();
    
    const balance = await integration.getBalance();
    const balanceEth = Number(BigInt(balance) / BigInt(10**18));
    
    console.log('💰 Balance del contrato:');
    console.log('   Wei:', balance);
    console.log('   ETH:', balanceEth.toFixed(6));
    console.log('');
    
    if (balance === '0') {
      console.log('ℹ️  El contrato no tiene fondos');
      console.log('   Usa: node scripts/deposit.js <AMOUNT> para depositar');
    } else {
      console.log('✅ El contrato tiene fondos disponibles');
      console.log('   Usa: node scripts/distribute.js para distribuir');
    }
    
  } catch (error) {
    console.error('');
    console.error('❌ Error al verificar balance:', error.message);
    process.exit(1);
  }
}

main();

