import { Contract, RpcProvider, Account, CallData, cairo } from 'starknet';
import axios from 'axios';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

/**
 * ChipiPay Integration Module for RevenueSplitter
 * Facilita los pagos y depósitos usando ChipiPay
 */
class ChipiPayIntegration {
  constructor() {
    this.config = JSON.parse(readFileSync('./config.json', 'utf8'));
    this.provider = new RpcProvider({ nodeUrl: process.env.STARKNET_RPC_URL });
    this.contractAddress = process.env.REVENUE_SPLITTER_CONTRACT;
    
    // Configuración de ChipiPay
    this.chipiPayApiKey = process.env.CHIPIPAY_API_KEY;
    this.chipiPayOrgId = process.env.CHIPIPAY_ORG_ID;
    this.chipiPayBaseUrl = 'https://api.chipipay.com/v1';
  }

  /**
   * Inicializa la cuenta de Starknet
   */
  initAccount() {
    if (!process.env.ACCOUNT_ADDRESS || !process.env.ACCOUNT_PRIVATE_KEY) {
      throw new Error('Account credentials not configured');
    }
    
    this.account = new Account(
      this.provider,
      process.env.ACCOUNT_ADDRESS,
      process.env.ACCOUNT_PRIVATE_KEY
    );
    
    console.log('✅ Account initialized:', process.env.ACCOUNT_ADDRESS);
  }

  /**
   * Crea un pago con ChipiPay
   * @param {string} amount - Cantidad a pagar
   * @param {string} currency - Moneda (ETH, USDC, etc.)
   * @param {string} description - Descripción del pago
   * @returns {Promise<object>} - Información del pago creado
   */
  async createPayment(amount, currency = 'ETH', description = 'Deposit to RevenueSplitter') {
    try {
      const response = await axios.post(
        `${this.chipiPayBaseUrl}/payments`,
        {
          amount,
          currency,
          description,
          metadata: {
            contract: this.contractAddress,
            action: 'deposit',
            network: this.config.network
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.chipiPayApiKey}`,
            'Content-Type': 'application/json',
            'X-Organization-ID': this.chipiPayOrgId
          }
        }
      );
      
      console.log('✅ Payment created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating payment:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Deposita fondos en el contrato RevenueSplitter
   * @param {string} amount - Cantidad a depositar (en wei)
   * @returns {Promise<string>} - Hash de la transacción
   */
  async deposit(amount) {
    try {
      if (!this.account) {
        this.initAccount();
      }

      console.log(`💰 Depositando ${amount} en el contrato...`);
      
      // Convertir amount a u256 (low, high)
      const amountU256 = cairo.uint256(amount);
      
      const call = {
        contractAddress: this.contractAddress,
        entrypoint: 'deposit',
        calldata: CallData.compile({
          amount: amountU256
        })
      };

      const tx = await this.account.execute(call);
      console.log('📤 Transaction sent:', tx.transaction_hash);
      
      // Esperar confirmación
      await this.provider.waitForTransaction(tx.transaction_hash);
      console.log('✅ Deposit confirmed!');
      
      return tx.transaction_hash;
    } catch (error) {
      console.error('❌ Error depositing:', error);
      throw error;
    }
  }

  /**
   * Agrega un receptor al contrato
   * @param {string} recipientAddress - Dirección del receptor
   * @param {string} shares - Cantidad de shares
   * @returns {Promise<string>} - Hash de la transacción
   */
  async addRecipient(recipientAddress, shares) {
    try {
      if (!this.account) {
        this.initAccount();
      }

      console.log(`➕ Agregando receptor ${recipientAddress} con ${shares} shares...`);
      
      const sharesU256 = cairo.uint256(shares);
      
      const call = {
        contractAddress: this.contractAddress,
        entrypoint: 'add_recipient',
        calldata: CallData.compile({
          recipient: recipientAddress,
          shares: sharesU256
        })
      };

      const tx = await this.account.execute(call);
      console.log('📤 Transaction sent:', tx.transaction_hash);
      
      await this.provider.waitForTransaction(tx.transaction_hash);
      console.log('✅ Recipient added!');
      
      return tx.transaction_hash;
    } catch (error) {
      console.error('❌ Error adding recipient:', error);
      throw error;
    }
  }

  /**
   * Distribuye los fondos entre los receptores
   * @returns {Promise<string>} - Hash de la transacción
   */
  async distribute() {
    try {
      if (!this.account) {
        this.initAccount();
      }

      console.log('🎁 Distribuyendo fondos...');
      
      const call = {
        contractAddress: this.contractAddress,
        entrypoint: 'distribute',
        calldata: []
      };

      const tx = await this.account.execute(call);
      console.log('📤 Transaction sent:', tx.transaction_hash);
      
      await this.provider.waitForTransaction(tx.transaction_hash);
      console.log('✅ Distribution completed!');
      
      return tx.transaction_hash;
    } catch (error) {
      console.error('❌ Error distributing:', error);
      throw error;
    }
  }

  /**
   * Obtiene el balance del contrato
   * @returns {Promise<string>} - Balance en wei
   */
  async getBalance() {
    try {
      const result = await this.provider.callContract({
        contractAddress: this.contractAddress,
        entrypoint: 'get_balance',
        calldata: []
      });
      
      const balance = cairo.uint256(result[0]);
      console.log('💰 Contract balance:', balance.toString());
      
      return balance.toString();
    } catch (error) {
      console.error('❌ Error getting balance:', error);
      throw error;
    }
  }

  /**
   * Webhook handler para procesar pagos de ChipiPay
   * @param {object} webhookData - Datos del webhook
   */
  async handleWebhook(webhookData) {
    try {
      console.log('📥 Processing ChipiPay webhook...');
      
      const { event, payment } = webhookData;
      
      switch (event) {
        case 'payment.succeeded':
          console.log('✅ Payment succeeded:', payment.id);
          
          // Depositar automáticamente cuando el pago se completa
          if (payment.metadata?.action === 'deposit') {
            await this.deposit(payment.amount);
          }
          break;
          
        case 'payment.failed':
          console.log('❌ Payment failed:', payment.id);
          break;
          
        default:
          console.log('ℹ️ Unknown event:', event);
      }
    } catch (error) {
      console.error('❌ Error handling webhook:', error);
      throw error;
    }
  }
}

export default ChipiPayIntegration;

