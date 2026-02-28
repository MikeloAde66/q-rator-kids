import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  Trash2,
  HardDrive,
  Wifi,
  WifiOff,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { useOffline } from '../contexts/OfflineContext';
import { useToast } from '../components/ToastProvider';

export function OfflineDownloads() {
  const {
    isOnline,
    downloadedContent,
    queuedDownloads,
    pendingSyncs,
    removeDownload,
    removeFromQueue,
    getDownloadedSize,
    getOfflineStats,
    syncPendingData,
    processQueue,
  } = useOffline();

  const { toast } = useToast();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const stats = getOfflineStats();
  const totalSizeMB = (getDownloadedSize() / 1024).toFixed(2);

  const handleClearAll = () => {
    downloadedContent.forEach(item => {
      removeDownload(item.type, item.id);
    });
    setShowClearDialog(false);
    toast({
      title: "🗑️ Downloads Cleared!",
      description: "All offline content has been removed.",
    });
  };

  const handleSync = async () => {
    setSyncing(true);
    await syncPendingData();
    processQueue();
    setTimeout(() => {
      setSyncing(false);
      toast({
        title: "✅ Sync Complete!",
        description: "All your progress has been synced.",
      });
    }, 1000);
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return '📚';
      case 'story':
        return '✨';
      case 'assignment':
        return '📝';
      default:
        return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <Download className="w-20 h-20 mx-auto text-blue-500" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Offline Downloads
        </h1>
        <p className="text-xl text-gray-600 font-semibold">
          Learn anywhere, even without internet! 📡
        </p>
      </motion.div>

      {/* Status Card */}
      <Card className={`
        p-6 border-4 rounded-3xl
        ${isOnline 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
        }
      `}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isOnline ? 'bg-green-500' : 'bg-orange-500'}
            `}>
              {isOnline ? (
                <Wifi className="w-8 h-8 text-white" />
              ) : (
                <WifiOff className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h2 className={`text-2xl font-black ${isOnline ? 'text-green-800' : 'text-orange-800'}`}>
                {isOnline ? 'You\'re Online! 🎉' : 'You\'re Offline 📴'}
              </h2>
              <p className={`text-sm font-semibold ${isOnline ? 'text-green-600' : 'text-orange-600'}`}>
                {isOnline ? 'All features available' : 'Downloaded content only'}
              </p>
            </div>
          </div>
          {isOnline && (stats.pendingSyncCount > 0 || stats.queuedCount > 0) && (
            <Button
              onClick={handleSync}
              disabled={syncing}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl"
            >
              {syncing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                  </motion.div>
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Sync Now
                </>
              )}
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-200">
            <div className="text-3xl font-black text-blue-600">{stats.downloadedCount}</div>
            <div className="text-sm text-gray-600 font-semibold">Downloaded</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-purple-200">
            <div className="text-3xl font-black text-purple-600">{stats.queuedCount}</div>
            <div className="text-sm text-gray-600 font-semibold">Queued</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-yellow-200">
            <div className="text-3xl font-black text-yellow-600">{stats.pendingSyncCount}</div>
            <div className="text-sm text-gray-600 font-semibold">Pending Sync</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200">
            <div className="text-3xl font-black text-green-600">{totalSizeMB}</div>
            <div className="text-sm text-gray-600 font-semibold">MB Used</div>
          </div>
        </div>
      </Card>

      {/* Downloaded Content */}
      {downloadedContent.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              Downloaded Content ({downloadedContent.length})
            </h2>
            <Button
              onClick={() => setShowClearDialog(true)}
              variant="outline"
              className="border-2 border-red-300 hover:bg-red-50 text-red-600 font-bold rounded-xl"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>

          <div className="space-y-3">
            {downloadedContent.map((item) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">{getContentIcon(item.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-gray-800 truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="bg-green-100 text-green-700 font-bold capitalize">
                            {item.type}
                          </Badge>
                          {item.level && (
                            <Badge className="bg-purple-100 text-purple-700 font-bold">
                              {item.level}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {(item.size / 1024).toFixed(2)} MB • {formatDate(item.downloadedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeDownload(item.type, item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-100 rounded-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Queued Downloads */}
      {queuedDownloads.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <Clock className="w-8 h-8 text-purple-500" />
            Queued Downloads ({queuedDownloads.length})
          </h2>
          <p className="text-gray-600 font-semibold">
            These will download automatically when you're back online! 📡
          </p>

          <div className="space-y-3">
            {queuedDownloads.map((item) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">{getContentIcon(item.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-gray-800 truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="bg-purple-100 text-purple-700 font-bold capitalize">
                            {item.type}
                          </Badge>
                          {item.level && (
                            <Badge className="bg-pink-100 text-pink-700 font-bold">
                              {item.level}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            Queued {formatDate(item.queuedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeFromQueue(item.type, item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-100 rounded-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Syncs */}
      {pendingSyncs.length > 0 && (
        <Card className="p-6 border-4 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
            <div>
              <h3 className="text-2xl font-black text-gray-800">
                Pending Sync ({pendingSyncs.length})
              </h3>
              <p className="text-sm text-gray-600 font-semibold">
                Your progress will sync when you're back online
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {pendingSyncs.map((sync) => (
              <div
                key={sync.id}
                className="flex items-center justify-between p-3 bg-white/60 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-yellow-600" />
                  <div>
                    <span className="font-bold text-gray-800 capitalize">{sync.type}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDate(sync.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty State */}
      {downloadedContent.length === 0 && queuedDownloads.length === 0 && (
        <Card className="p-12 border-4 border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl text-center">
          <div className="space-y-4">
            <div className="text-6xl">📥</div>
            <h3 className="text-2xl font-black text-gray-800">
              No Offline Content Yet
            </h3>
            <p className="text-gray-600 font-semibold max-w-md mx-auto">
              Download lessons, stories, and assignments to access them offline! Perfect for road trips, planes, and places without internet! ✈️
            </p>
          </div>
        </Card>
      )}

      {/* Clear Confirmation Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent className="border-4 border-red-300 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-gray-800 flex items-center gap-2">
              <Trash2 className="w-8 h-8 text-red-500" />
              Clear All Downloads?
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600">
              This will remove all {downloadedContent.length} downloaded items from your device. You can download them again anytime!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setShowClearDialog(false)}
              className="border-2 border-gray-300 font-bold text-lg h-12 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleClearAll}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-lg h-12 rounded-xl"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
