"use client";

import { useState } from "react";
import { useAccount } from "@starknet-react/core";
import { Video } from "@/types";
import { config, APP_CONFIG } from "@/lib/config";
import { Heart, User, Calendar, Play, Sparkles } from "lucide-react";
import { Contract, shortString } from "starknet";
import { motion } from "framer-motion";
import platformAbi from "@/abis/platform.json";

interface VideoCardProps {
  video: Video;
  onLikeSuccess?: () => void;
}

export function VideoCard({ video, onLikeSuccess }: VideoCardProps) {
  const { address, isConnected, account } = useAccount();
  const [isLiking, setIsLiking] = useState(false);
  const [localLikes, setLocalLikes] = useState(parseInt(video.likes));
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!isConnected || !account || isLiking || liked) return;

    try {
      setIsLiking(true);
      
      const contract = new Contract(platformAbi.abi);
      
      // Pagar por el like (esto se haría con el contrato real)
      console.log(`💸 Pagando ${APP_CONFIG.likeReward} VERSY por dar like`);
      await contract.like_video(video.video_id);
      
      // Update local state
      setLocalLikes(prev => prev + 1);
      setLiked(true);
      
      if (onLikeSuccess) {
        onLikeSuccess();
      }
    } catch (error) {
      console.error("Like error:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Ahora";
    if (diffInHours < 24) return `Hace ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays}d`;
    return date.toLocaleDateString("es", { month: "short", day: "numeric" });
  };

  // Decode felt252 values
  const decodeTitle = (felt: string) => {
    try {
      return shortString.decodeShortString("0x" + felt);
    } catch {
      return "Untitled Video";
    }
  };

  const decodeHash = (felt: string) => {
    try {
      return shortString.decodeShortString("0x" + felt);
    } catch {
      return felt;
    }
  };

  const videoTitle = decodeTitle(video.title);
  const ipfsHash = decodeHash(video.ipfs_hash);
  const videoUrl = `${APP_CONFIG.pinataGateway}${ipfsHash}`;
  const isOwnVideo = address?.toLowerCase() === video.creator.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="video-card group"
    >
      {/* Video Thumbnail/Player */}
      <div className="relative aspect-[9/14] sm:aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          poster={`${videoUrl}#t=0.1`}
          loop
          muted
          playsInline
        />

        {/* Play Button Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl cursor-pointer"
          >
            <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Like Count Badge */}
        {localLikes > 0 && (
          <div className="absolute top-3 right-3">
            <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              <span className="text-sm font-bold">{localLikes}</span>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-5 space-y-3.5">
        {/* Title */}
        <h3 className="text-xl font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {videoTitle}
        </h3>

        {/* Creator Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center ring-2 ring-background ring-offset-2">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">
              {formatAddress(video.creator)}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(video.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!isOwnVideo && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLike}
            disabled={isLiking || liked}
            className={`w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              liked
                ? 'bg-red-500/10 text-red-500 cursor-default'
                : isLiking
                ? 'bg-secondary text-secondary-foreground cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isLiking ? (
              <>
                <div className="spinner w-4 h-4" />
                Enviando...
              </>
            ) : liked ? (
              <>
                <Heart className="w-5 h-5 fill-current" />
                ¡Te gustó!
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                Me gusta (+10 VERSY)
              </>
            )}
          </motion.button>
        )}

        {/* Own Video Badge */}
        {isOwnVideo && (
          <div className="w-full py-3 px-4 rounded-2xl bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Tu video
          </div>
        )}
      </div>
    </motion.div>
  );
}
