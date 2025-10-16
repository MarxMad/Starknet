"use client";

import { useProvider, useAccount } from "@starknet-react/core";
import { Contract } from "starknet";
import { useChipiWallet } from "./useChipiWallet";
import { useEffect, useState } from "react";
import { CONTRACT_CONFIG } from "@/lib/config";

export function useContract() {
  const provider = useProvider();
  const { account } = useAccount();
  const { wallet, isConnected } = useChipiWallet();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provider || !isConnected || !wallet) {
      setContract(null);
      return;
    }

    try {
      // Crear instancia del contrato
      const contractInstance = new Contract(
        CONTRACT_CONFIG.platformAbi,
        CONTRACT_CONFIG.platformAddress,
        provider
      );

      setContract(contractInstance);
      setError(null);
    } catch (err) {
      console.error('Error creando contrato:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, [provider, isConnected, wallet?.address]); // Usar wallet?.address en lugar de wallet

  const uploadVideo = async (ipfsHash: string, title: string) => {
    if (!contract || !account) {
      throw new Error('Contrato o cuenta no disponible');
    }

    try {
      setIsLoading(true);
      setError(null);

      // Convertir strings a felt252
      const ipfsHashFelt = ipfsHash;
      const titleFelt = title;

      console.log('📤 Subiendo video:', { ipfsHash, title });

      // Llamar al contrato
      const result = await contract.upload_video(ipfsHashFelt, titleFelt);
      
      console.log('✅ Video subido exitosamente:', result);
      return result;
    } catch (err) {
      console.error('❌ Error subiendo video:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const likeVideo = async (videoId: string) => {
    if (!contract || !account) {
      throw new Error('Contrato o cuenta no disponible');
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('❤️ Dando like al video:', videoId);

      // Llamar al contrato
      const result = await contract.like_video(videoId);
      
      console.log('✅ Like dado exitosamente:', result);
      return result;
    } catch (err) {
      console.error('❌ Error dando like:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const claimWelcomeBonus = async () => {
    if (!contract || !account) {
      throw new Error('Contrato o cuenta no disponible');
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('🎁 Reclamando bonus de bienvenida...');

      // Llamar al contrato
      const result = await contract.claim_welcome_bonus();
      
      console.log('✅ Bonus reclamado exitosamente:', result);
      return result;
    } catch (err) {
      console.error('❌ Error reclamando bonus:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getVideos = async () => {
    if (!contract) {
      throw new Error('Contrato no disponible');
    }

    try {
      const result = await contract.get_all_videos();
      return result;
    } catch (err) {
      console.error('❌ Error obteniendo videos:', err);
      throw err;
    }
  };

  const getVideo = async (videoId: string) => {
    if (!contract) {
      throw new Error('Contrato no disponible');
    }

    try {
      const result = await contract.get_video(videoId);
      return result;
    } catch (err) {
      console.error('❌ Error obteniendo video:', err);
      throw err;
    }
  };

  const hasClaimedWelcome = async (userAddress: string) => {
    if (!contract) {
      throw new Error('Contrato no disponible');
    }

    try {
      const result = await contract.has_claimed_welcome(userAddress);
      return result;
    } catch (err) {
      console.error('❌ Error verificando bonus:', err);
      throw err;
    }
  };

  return {
    contract,
    isLoading,
    error,
    isConnected: isConnected && !!contract,
    uploadVideo,
    likeVideo,
    claimWelcomeBonus,
    getVideos,
    getVideo,
    hasClaimedWelcome
  };
}
