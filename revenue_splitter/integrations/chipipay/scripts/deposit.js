#!/usr/bin/env node

/**
 * Script para depositar fondos usando ChipiPay
 * Uso: node scripts/deposit.js <AMOUNT>
 */

import ChipiPayIntegration from '../index.js';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('❌ Error: Debes proporcionar el monto a depositar');
    console.log('');
    console.log('Uso: node scripts/deposit.js <AMOUNT>');
    console.log('');
    console.log('Ejemplo:');
    console.log('  node scripts/deposit.js 1000000000000000000  # 1 ETH');
    console.log('  node scripts/deposit.js 100000000000000      # 0.0001 ETH');
    process.exit(1);
  }

  const amount = args[0];
  
  console.log('🚀 Iniciando depósito con ChipiPay...');
  console.log('📊 Monto:', amount, 'wei');
  console.log('');

  try {
    const integration = new ChipiPayIntegration();
    
    // Opción 1: Crear un pago con ChipiPay (para procesar pagos externos)
    console.log('💳 Opción 1: Crear pago con ChipiPay');
    console.log('   (Esto crea una orden de pago que puede ser pagada por usuarios)');
    
    // Descomenta para usar ChipiPay payments API
    // const payment = await integration.createPayment(amount, 'ETH', 'Deposit to RevenueSplitter');
    // console.log('   Payment URL:', payment.payment_url);
    // console.log('   Payment ID:', payment.id);
    // console.log('');
    
    // Opción 2: Depositar directamente desde tu cuenta
    console.log('💰 Opción 2: Depositar directamente desde tu cuenta');
    const txHash = await integration.deposit(amount);
    
    console.log('');
    console.log('✅ Depósito completado exitosamente!');
    console.log('📝 Transaction Hash:', txHash);
    console.log('🔍 Ver en Starkscan: https://sepolia.starkscan.co/tx/' + txHash);
    
    // Verificar balance actualizado
    console.log('');
    console.log('📊 Verificando balance actualizado...');
    const balance = await integration.getBalance();
    console.log('💰 Balance actual:', balance, 'wei');
    
  } catch (error) {
    console.error('');
    console.error('❌ Error al procesar depósito:', error.message);
    process.exit(1);
  }
}

main();

