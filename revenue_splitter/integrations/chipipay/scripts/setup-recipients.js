#!/usr/bin/env node

/**
 * Script para configurar receptores y sus shares
 * Uso: node scripts/setup-recipients.js <config-file>
 */

import ChipiPayIntegration from '../index.js';
import { readFileSync } from 'fs';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('❌ Error: Debes proporcionar un archivo de configuración');
    console.log('');
    console.log('Uso: node scripts/setup-recipients.js <config-file>');
    console.log('');
    console.log('Ejemplo:');
    console.log('  node scripts/setup-recipients.js recipients.json');
    console.log('');
    console.log('El archivo debe tener el formato:');
    console.log(JSON.stringify({
      recipients: [
        { address: '0x123...', shares: '50', name: 'Recipient 1' },
        { address: '0x456...', shares: '30', name: 'Recipient 2' }
      ]
    }, null, 2));
    process.exit(1);
  }

  const configFile = args[0];
  
  console.log('🚀 Configurando receptores...');
  console.log('📄 Archivo:', configFile);
  console.log('');

  try {
    // Leer configuración
    const config = JSON.parse(readFileSync(configFile, 'utf8'));
    
    if (!config.recipients || !Array.isArray(config.recipients)) {
      throw new Error('El archivo debe contener un array "recipients"');
    }
    
    const integration = new ChipiPayIntegration();
    
    console.log(`📋 Configurando ${config.recipients.length} receptores...`);
    console.log('');
    
    // Agregar cada receptor
    for (let i = 0; i < config.recipients.length; i++) {
      const recipient = config.recipients[i];
      
      console.log(`➕ [${i + 1}/${config.recipients.length}] Agregando ${recipient.name || 'Recipient ' + (i + 1)}`);
      console.log(`   Address: ${recipient.address}`);
      console.log(`   Shares: ${recipient.shares}`);
      
      try {
        const txHash = await integration.addRecipient(recipient.address, recipient.shares);
        console.log(`   ✅ Agregado exitosamente`);
        console.log(`   📝 Tx: ${txHash}`);
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
      
      console.log('');
    }
    
    console.log('✅ Configuración de receptores completada!');
    
  } catch (error) {
    console.error('');
    console.error('❌ Error al configurar receptores:', error.message);
    process.exit(1);
  }
}

main();

