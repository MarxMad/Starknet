import { ContractConfig } from "@/types";
import platformAbi from "@/abis/platform.json";

export const config: ContractConfig = {
  tokenAddress: process.env.NEXT_PUBLIC_VERSY_TOKEN_ADDRESS || "",
  platformAddress: process.env.NEXT_PUBLIC_PLATFORM_ADDRESS || "",
  network: process.env.NEXT_PUBLIC_NETWORK || "sepolia",
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://free-rpc.nethermind.io/sepolia-juno/v0_8",
};

export const CONTRACT_CONFIG = {
  ...config,
  platformAbi,
};

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "UTONOMA",
  welcomeBonus: parseInt(process.env.NEXT_PUBLIC_WELCOME_BONUS || "150"),
  likeReward: parseInt(process.env.NEXT_PUBLIC_LIKE_REWARD || "10"),
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY || "https://gateway.pinata.cloud/ipfs/",
};

