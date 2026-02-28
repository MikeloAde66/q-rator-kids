import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Wifi, Download, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import { useOffline } from '../contexts/OfflineContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function OfflineIndicator() {
  const {
    isOnline,
    queuedDownloads,
    pendingSyncs,
    downloadedContent,
    processQueue,
    syncPendingData,
    getOfflineStats,
  } = useOffline();

  const [showBanner, setShowBanner] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [justWentOnline, setJustWentOnline] = useState(false);

  const stats = getOfflineStats();

  // Show banner when offline or when we just went online with pending items
  useEffect(() => {
    if (!isOnline) {
      setShowBanner(true);
    } else {
      // Just went online
      if (stats.queuedCount > 0 || stats.pendingSyncCount > 0) {
        setJustWentOnline(true);
        setShowBanner(true);
        
        // Auto-hide after showing sync complete
        setTimeout(() => {
          setShowBanner(false);
          setJustWentOnline(false);
        }, 5000);
      } else {
        setShowBanner(false);
        setJustWentOnline(false);
      }
    }
  }, [isOnline, stats.queuedCount, stats.pendingSyncCount]);

  const handleSync = async () => {
    setSyncing(true);
    await syncPendingData();
    processQueue();
    setTimeout(() => {
      setSyncing(false);
    }, 1000);
  };

  return (
    <>
      {/* Main Offline Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
          >
            <div className="max-w-7xl mx-auto px-4 pt-2">
              <div className={`
                pointer-events-auto rounded-2xl shadow-2xl border-4 p-4 backdrop-blur-sm
                ${isOnline 
                  ? 'bg-green-50/95 border-green-300' 
                  : 'bg-orange-50/95 border-orange-300'
                }
              `}>
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <motion.div
                    animate={isOnline ? {} : { scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                      ${isOnline 
                        ? 'bg-green-500' 
                        : 'bg-orange-500'
                      }
                    `}
                  >
                    {isOnline ? (
                      <Wifi className="w-6 h-6 text-white" />
                    ) : (
                      <WifiOff className="w-6 h-6 text-white" />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {isOnline ? (
                      <>
                        <h3 className="text-xl font-black text-green-800">
                          {justWentOnline ? '🎉 Back Online!' : 'You\'re Online!'}
                        </h3>
                        <p className="text-sm text-green-700 font-semibold">
                          {stats.pendingSyncCount > 0 || stats.queuedCount > 0 ? (
                            syncing ? (
                              'Syncing your progress...'
                            ) : (
                              `Syncing ${stats.pendingSyncCount} items and ${stats.queuedCount} downloads...`
                            )
                          ) : (
                            'All your progress is saved!'
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-black text-orange-800">
                          📴 You're Offline
                        </h3>
                        <p className="text-sm text-orange-700 font-semibold">
                          {stats.downloadedCount > 0 ? (
                            `${stats.downloadedCount} lessons available offline • Your progress will sync when online`
                          ) : (
                            'Download lessons to use offline • Your progress will sync when online'
                          )}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Stats Badges */}
                  <div className="hidden md:flex items-center gap-2">
                    {stats.downloadedCount > 0 && (
                      <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-300 font-black px-3 py-1">
                        <Download className="w-4 h-4 mr-1" />
                        {stats.downloadedCount} offline
                      </Badge>
                    )}
                    {stats.queuedCount > 0 && (
                      <Badge className="bg-purple-100 text-purple-700 border-2 border-purple-300 font-black px-3 py-1">
                        {stats.queuedCount} queued
                      </Badge>
                    )}
                    {stats.pendingSyncCount > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-700 border-2 border-yellow-300 font-black px-3 py-1">
                        {stats.pendingSyncCount} pending
                      </Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  {isOnline && (stats.queuedCount > 0 || stats.pendingSyncCount > 0) && (
                    <Button
                      onClick={handleSync}
                      disabled={syncing}
                      className={`
                        flex items-center gap-2 font-bold rounded-xl shadow-lg
                        ${syncing 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                        }
                      `}
                    >
                      {syncing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </motion.div>
                          Syncing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Sync Now
                        </>
                      )}
                    </Button>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={() => setShowBanner(false)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-black/10 flex items-center justify-center transition-colors"
                    aria-label="Close"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Status Indicator (always visible in corner) */}
      {!showBanner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-4 right-4 z-50"
        >
          <button
            onClick={() => setShowBanner(true)}
            className={`
              group relative w-12 h-12 rounded-full shadow-lg border-4 flex items-center justify-center transition-all
              ${isOnline 
                ? 'bg-green-500 border-green-200 hover:bg-green-600' 
                : 'bg-orange-500 border-orange-200 hover:bg-orange-600'
              }
            `}
          >
            {isOnline ? (
              <Wifi className="w-6 h-6 text-white" />
            ) : (
              <WifiOff className="w-6 h-6 text-white" />
            )}
            
            {/* Badge for pending items */}
            {(stats.queuedCount > 0 || stats.pendingSyncCount > 0) && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-white">
                {stats.queuedCount + stats.pendingSyncCount}
              </span>
            )}

            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className={`
                whitespace-nowrap px-3 py-2 rounded-lg shadow-lg border-2 text-sm font-bold
                ${isOnline 
                  ? 'bg-green-100 border-green-300 text-green-800' 
                  : 'bg-orange-100 border-orange-300 text-orange-800'
                }
              `}>
                {isOnline ? 'Online' : 'Offline'}
                {stats.downloadedCount > 0 && ` • ${stats.downloadedCount} downloaded`}
              </div>
            </div>
          </button>
        </motion.div>
      )}
    </>
  );
}