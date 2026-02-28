import { motion } from 'motion/react';
import { Download, CloudOff, Clock, Check } from 'lucide-react';
import { useOffline } from '../contexts/OfflineContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface OfflineBadgeProps {
  contentType: 'lesson' | 'story' | 'assignment';
  contentId: string;
  contentTitle: string;
  level?: string;
  character?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'button';
}

export function OfflineBadge({
  contentType,
  contentId,
  contentTitle,
  level,
  character,
  size = 'md',
  variant = 'badge',
}: OfflineBadgeProps) {
  const {
    isOnline,
    isContentDownloaded,
    downloadContent,
    removeDownload,
    queueDownload,
    queuedDownloads,
  } = useOffline();

  const [downloading, setDownloading] = useState(false);

  const downloaded = isContentDownloaded(contentType, contentId);
  const queued = queuedDownloads.some(
    item => item.type === contentType && item.id === contentId
  );

  const handleDownload = () => {
    if (downloaded) {
      // Remove from downloads
      removeDownload(contentType, contentId);
    } else if (isOnline) {
      // Download immediately
      setDownloading(true);
      
      // Simulate download delay
      setTimeout(() => {
        downloadContent({
          id: contentId,
          type: contentType,
          title: contentTitle,
          size: Math.floor(Math.random() * 5000) + 1000, // Random size between 1-6 MB
          level,
          character,
        });
        setDownloading(false);
      }, 1500);
    } else {
      // Queue for later
      queueDownload({
        id: contentId,
        type: contentType,
        title: contentTitle,
        level,
        character,
      });
    }
  };

  // Badge variant
  if (variant === 'badge') {
    if (downloaded) {
      return (
        <Badge className="bg-green-100 text-green-700 border-2 border-green-300 font-black px-2 py-1 flex items-center gap-1">
          <Check className="w-3 h-3" />
          Offline
        </Badge>
      );
    }

    if (queued) {
      return (
        <Badge className="bg-purple-100 text-purple-700 border-2 border-purple-300 font-black px-2 py-1 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Queued
        </Badge>
      );
    }

    if (!isOnline) {
      return (
        <Badge className="bg-orange-100 text-orange-700 border-2 border-orange-300 font-black px-2 py-1 flex items-center gap-1">
          <CloudOff className="w-3 h-3" />
          Online Only
        </Badge>
      );
    }

    return null;
  }

  // Button variant
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={downloading || (!isOnline && !downloaded && !queued)}
      className={`
        ${sizeClasses[size]} font-bold rounded-xl transition-all
        ${downloaded 
          ? 'bg-green-500 hover:bg-green-600 text-white border-2 border-green-300' 
          : queued
          ? 'bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-300'
          : !isOnline
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed border-2 border-gray-400'
          : 'bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-300'
        }
      `}
    >
      {downloading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Download className={iconSizes[size]} />
          </motion.div>
          <span className="ml-2">Downloading...</span>
        </>
      ) : downloaded ? (
        <>
          <Check className={iconSizes[size]} />
          <span className="ml-2">Downloaded</span>
        </>
      ) : queued ? (
        <>
          <Clock className={iconSizes[size]} />
          <span className="ml-2">Queued</span>
        </>
      ) : !isOnline ? (
        <>
          <CloudOff className={iconSizes[size]} />
          <span className="ml-2">Offline</span>
        </>
      ) : (
        <>
          <Download className={iconSizes[size]} />
          <span className="ml-2">Download</span>
        </>
      )}
    </Button>
  );
}
