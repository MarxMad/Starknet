export interface Video {
  video_id: string;
  creator: string;
  ipfs_hash: string;
  title: string;
  likes: string;
  created_at: string;
}

export interface User {
  address: string;
  balance: string;
  hasClaimed: boolean;
}

export interface ContractConfig {
  tokenAddress: string;
  platformAddress: string;
  network: string;
  rpcUrl: string;
}

// ChipiPay Types
export interface ChipiWallet {
  address: string;
  privateKey?: string;
  publicKey?: string;
}

export interface ChipiPaySDK {
  createWallet: (params: { userId: string; email?: string }) => Promise<ChipiWallet>;
  getWallet: (userId: string) => Promise<ChipiWallet | null>;
  signTransaction: (params: { wallet: ChipiWallet; transaction: any }) => Promise<string>;
}

// Extend Window interface
declare global {
  interface Window {
    ChipiPay?: ChipiPaySDK;
  }
}

