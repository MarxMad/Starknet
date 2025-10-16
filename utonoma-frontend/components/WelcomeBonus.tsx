"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount, useProvider } from "@starknet-react/core";
import { Button } from "@/components/ui/Button";
import { config, APP_CONFIG } from "@/lib/config";
import { Gift, Loader2 } from "lucide-react";
import { Contract } from "starknet";
import platformAbi from "@/abis/platform.json";

export function WelcomeBonus() {
  const { address, isConnected, account } = useAccount();
  const { provider } = useProvider();
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkIfClaimed = useCallback(async () => {
    if (!address || !provider) {
      setLoading(false);
      return;
    }

    try {
      const contract = new Contract(platformAbi, config.platformAddress, provider);
      const hasClaimed = await contract.has_claimed_welcome(address);
      setClaimed(Boolean(hasClaimed));
    } catch (error) {
      console.error("Error checking welcome bonus:", error);
    } finally {
      setLoading(false);
    }
  }, [address, provider]);

  useEffect(() => {
    checkIfClaimed();
  }, [checkIfClaimed]);

  const handleClaim = async () => {
    if (!isConnected || !account || claiming || claimed) return;

    try {
      setClaiming(true);
      
      const contract = new Contract(platformAbi, config.platformAddress, account);
      await contract.claim_welcome_bonus();
      
      setClaimed(true);
      await checkIfClaimed();
    } catch (error) {
      console.error("Claim error:", error);
      // TODO: Show error toast
    } finally {
      setClaiming(false);
    }
  };

  if (!isConnected || claimed || loading) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border-2 border-primary/20">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/20 rounded-full">
          <Gift className="h-8 w-8 text-primary" />
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-bold">Welcome to UTONOMA! 🎉</h3>
            <p className="text-muted-foreground mt-1">
              Claim your welcome bonus of <span className="font-bold text-primary">{APP_CONFIG.welcomeBonus} VERSY</span> tokens to get started!
            </p>
          </div>

          <Button
            onClick={handleClaim}
            disabled={claiming}
            size="lg"
            className="gap-2"
          >
            {claiming ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Claiming...
              </>
            ) : (
              <>
                <Gift className="h-4 w-4" />
                Claim {APP_CONFIG.welcomeBonus} VERSY
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

