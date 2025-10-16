"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useGetWallet, useCreateWallet } from "@chipi-stack/nextjs";
import { useEffect, useState } from "react";
import { ChipiWallet } from "@/types";

export function useChipiWallet() {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { wallet: existingWallet, isLoading: isLoadingWallet, error: walletError } = useGetWallet();
  const { createWalletAsync, isLoading: isCreatingWallet } = useCreateWallet();
  const [wallet, setWallet] = useState<ChipiWallet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user) {
      setWallet(null);
      return;
    }

    // Evitar múltiples ejecuciones
    if (isLoading || wallet) {
      return;
    }

    const initializeWallet = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Si ya existe una wallet, la usamos
        if (existingWallet) {
          setWallet(existingWallet);
          setIsLoading(false);
          return;
        }

        // Si hay error al obtener wallet, lo mostramos
        if (walletError) {
          setError(walletError);
          setIsLoading(false);
          return;
        }

        // Si no hay wallet, intentamos crear una nueva
        if (!existingWallet && !isLoadingWallet) {
          console.log('No se encontró wallet existente, creando nueva...');
          
          // Obtener token de autenticación de Clerk
          const token = await getToken();
          if (!token) {
            throw new Error('No se pudo obtener el token de autenticación');
          }
          
          // Crear nueva wallet automáticamente
          console.log('🔧 Creando wallet con parámetros:', {
            externalUserId: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            encryptKey: `chipi_${user.id}_${Date.now()}`
          });

          const newWallet = await createWalletAsync({
            params: {
              externalUserId: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              encryptKey: `chipi_${user.id}_${Date.now()}` // Clave de encriptación única
            },
            bearerToken: token
          });

          console.log('🔍 Respuesta de createWalletAsync:', newWallet);

          if (newWallet && newWallet.wallet?.address) {
            console.log('✅ Wallet ChipiPay creada exitosamente:', newWallet);
            
            // Guardar wallet en metadata de Clerk
            try {
              await user.update({
                publicMetadata: {
                  ...user.publicMetadata,
                  chipiWalletAddress: newWallet.wallet.address,
                  chipiWalletCreated: new Date().toISOString()
                }
              });
              console.log('✅ Wallet guardada en metadata de Clerk');
            } catch (metadataError) {
              console.warn('⚠️ No se pudo guardar en metadata de Clerk:', metadataError);
            }
            
            setWallet({ address: newWallet.wallet.address });
          } else if (newWallet && newWallet.address) {
            // Fallback para estructura diferente
            console.log('✅ Wallet ChipiPay creada (estructura alternativa):', newWallet);
            setWallet({ address: newWallet.address });
          } else {
            console.error('❌ newWallet es null/undefined o no tiene address:', newWallet);
            throw new Error(`No se pudo crear la wallet. Respuesta: ${JSON.stringify(newWallet)}`);
          }
        }

      } catch (err) {
        console.error('Error inicializando wallet:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    initializeWallet();
  }, [isSignedIn, user, existingWallet, walletError, isLoadingWallet, createWalletAsync, getToken, isLoading, wallet]);

  return {
    wallet,
    isLoading: isLoading || isLoadingWallet || isCreatingWallet,
    error,
    isConnected: !!wallet
  };
}
