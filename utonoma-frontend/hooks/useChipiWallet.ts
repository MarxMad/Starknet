"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useGetWallet, useCreateWallet } from "@chipi-stack/nextjs";
import { useEffect, useState, useRef } from "react";
import { ChipiWallet } from "@/types";

export function useChipiWallet() {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { data: existingWallet, isLoading: isLoadingWallet, error: walletError } = useGetWallet();
  const { createWalletAsync, isLoading: isCreatingWallet } = useCreateWallet();
  const [wallet, setWallet] = useState<ChipiWallet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const initializationRef = useRef(false);

  useEffect(() => {
    if (!isSignedIn || !user) {
      setWallet(null);
      setInitialized(false);
      initializationRef.current = false;
      return;
    }

    // Evitar múltiples ejecuciones con ref
    if (initializationRef.current || isLoading) {
      return;
    }

    const initializeWallet = async () => {
      initializationRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        // 1. Verificar si ya existe wallet en metadata de Clerk
        const existingWalletFromMetadata = user.unsafeMetadata?.chipiWalletAddress as string;
        if (existingWalletFromMetadata) {
          console.log('✅ Wallet encontrada en Clerk:', existingWalletFromMetadata.slice(0, 10) + '...');
          setWallet({ address: existingWalletFromMetadata });
          setInitialized(true);
          setIsLoading(false);
          return;
        }

        // 2. Si ya existe una wallet desde ChipiPay, la usamos
        if (existingWallet && (existingWallet as any).address) {
          console.log('✅ Wallet encontrada en ChipiPay:', (existingWallet as any).address.slice(0, 10) + '...');
          setWallet({ address: (existingWallet as any).address });
          setInitialized(true);
          setIsLoading(false);
          return;
        }

        // 3. Si hay error al obtener wallet, lo mostramos
        if (walletError) {
          console.error('❌ Error obteniendo wallet:', walletError);
          setError(walletError instanceof Error ? walletError.message : 'Error desconocido');
          setInitialized(true);
          setIsLoading(false);
          return;
        }

        // 4. Si no hay wallet, crear una nueva SOLO UNA VEZ
        if (!existingWallet && !isLoadingWallet) {
          console.log('🔧 Creando nueva wallet...');
          
          // Obtener token de autenticación de Clerk
          const token = await getToken();
          if (!token) {
            throw new Error('No se pudo obtener el token de autenticación');
          }

          const newWallet = await createWalletAsync({
            params: {
              externalUserId: user.id,
              encryptKey: `chipi_${user.id}_${Date.now()}`
            },
            bearerToken: token
          });

          // Verificar diferentes estructuras de respuesta
          let walletAddress = null;
          
          if (newWallet && typeof newWallet === 'object') {
            // Buscar en diferentes campos posibles
            const possibleFields = [
              'address',
              'wallet.address',
              'walletPublicKey',
              'normalizedPublicKey',
              'data.address',
              'data.wallet.address',
              'result.address',
              'result.wallet.address'
            ];
            
            for (const field of possibleFields) {
              const value = field.split('.').reduce((obj: any, key) => obj?.[key], newWallet);
              if (value && typeof value === 'string' && value.startsWith('0x')) {
                walletAddress = value;
                console.log(`✅ Wallet encontrada en ${field}:`, value.slice(0, 10) + '...');
                break;
              }
            }
          }

          if (walletAddress) {
            console.log('✅ Wallet creada:', walletAddress.slice(0, 10) + '...');
            
            // Guardar wallet en metadata de Clerk
            try {
              await user.update({
                unsafeMetadata: {
                  ...user.unsafeMetadata,
                  chipiWalletAddress: walletAddress,
                  chipiWalletCreated: new Date().toISOString()
                }
              });
              console.log('✅ Wallet guardada en Clerk');
            } catch (metadataError) {
              console.warn('⚠️ Error guardando en Clerk:', metadataError);
            }
            
            setWallet({ address: walletAddress });
            setInitialized(true);
          } else {
            console.error('❌ Error creando wallet:', newWallet);
            throw new Error(`No se pudo crear la wallet. Respuesta: ${JSON.stringify(newWallet)}`);
          }
        }

      } catch (err) {
        console.error('❌ Error inicializando wallet:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWallet();
  }, [isSignedIn, user, existingWallet, walletError, isLoadingWallet, createWalletAsync, getToken, isLoading]);

  return {
    wallet,
    isLoading: isLoading || isLoadingWallet || isCreatingWallet,
    error,
    isConnected: !!wallet
  };
}
