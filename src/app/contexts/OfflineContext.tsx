import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useActivity } from './ActivityContext';

export interface DownloadedContent {
  id: string;
  type: 'lesson' | 'story' | 'assignment';
  title: string;
  downloadedAt: string;
  size: number; // in KB
  level?: string;
  character?: string;
}

export interface QueuedDownload {
  id: string;
  type: 'lesson' | 'story' | 'assignment';
  title: string;
  queuedAt: string;
  level?: string;
  character?: string;
}

export interface PendingSync {
  id: string;
  type: 'progress' | 'activity' | 'completion';
  data: any;
  timestamp: string;
}

interface OfflineContextType {
  isOnline: boolean;
  downloadedContent: DownloadedContent[];
  queuedDownloads: QueuedDownload[];
  pendingSyncs: PendingSync[];
  
  // Content management
  isContentDownloaded: (type: string, id: string) => boolean;
  downloadContent: (content: Omit<DownloadedContent, 'downloadedAt'>) => void;
  removeDownload: (type: string, id: string) => void;
  getDownloadedSize: () => number;
  
  // Queue management
  queueDownload: (download: Omit<QueuedDownload, 'queuedAt'>) => void;
  removeFromQueue: (type: string, id: string) => void;
  processQueue: () => void;
  
  // Sync management
  addPendingSync: (sync: Omit<PendingSync, 'id' | 'timestamp'>) => void;
  syncPendingData: () => Promise<void>;
  clearSyncedData: () => void;
  
  // Stats
  getOfflineStats: () => {
    downloadedCount: number;
    queuedCount: number;
    pendingSyncCount: number;
    totalSize: number;
  };
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export function OfflineProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadedContent, setDownloadedContent] = useState<DownloadedContent[]>(() => {
    const saved = localStorage.getItem('qrator-downloaded-content');
    return saved ? JSON.parse(saved) : [];
  });
  const [queuedDownloads, setQueuedDownloads] = useState<QueuedDownload[]>(() => {
    const saved = localStorage.getItem('qrator-queued-downloads');
    return saved ? JSON.parse(saved) : [];
  });
  const [pendingSyncs, setPendingSyncs] = useState<PendingSync[]>(() => {
    const saved = localStorage.getItem('qrator-pending-syncs');
    return saved ? JSON.parse(saved) : [];
  });

  const { trackActivity } = useActivity();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('📡 Back online! Processing queue and syncing...');
      
      // Process queued downloads
      processQueue();
      
      // Sync pending data
      syncPendingData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('📴 Gone offline. Queueing actions...');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Persist downloaded content
  useEffect(() => {
    localStorage.setItem('qrator-downloaded-content', JSON.stringify(downloadedContent));
  }, [downloadedContent]);

  // Persist queued downloads
  useEffect(() => {
    localStorage.setItem('qrator-queued-downloads', JSON.stringify(queuedDownloads));
  }, [queuedDownloads]);

  // Persist pending syncs
  useEffect(() => {
    localStorage.setItem('qrator-pending-syncs', JSON.stringify(pendingSyncs));
  }, [pendingSyncs]);

  // Check if content is downloaded
  const isContentDownloaded = useCallback((type: string, id: string): boolean => {
    return downloadedContent.some(item => item.type === type && item.id === id);
  }, [downloadedContent]);

  // Download content for offline use
  const downloadContent = useCallback((content: Omit<DownloadedContent, 'downloadedAt'>) => {
    if (!isContentDownloaded(content.type, content.id)) {
      const newDownload: DownloadedContent = {
        ...content,
        downloadedAt: new Date().toISOString(),
      };
      setDownloadedContent(prev => [...prev, newDownload]);
      
      // Remove from queue if it was queued
      removeFromQueue(content.type, content.id);
    }
  }, [isContentDownloaded]);

  // Remove downloaded content
  const removeDownload = useCallback((type: string, id: string) => {
    setDownloadedContent(prev => prev.filter(item => !(item.type === type && item.id === id)));
  }, []);

  // Get total downloaded size
  const getDownloadedSize = useCallback((): number => {
    return downloadedContent.reduce((total, item) => total + item.size, 0);
  }, [downloadedContent]);

  // Queue a download for later
  const queueDownload = useCallback((download: Omit<QueuedDownload, 'queuedAt'>) => {
    if (!queuedDownloads.some(item => item.type === download.type && item.id === download.id)) {
      const newQueuedDownload: QueuedDownload = {
        ...download,
        queuedAt: new Date().toISOString(),
      };
      setQueuedDownloads(prev => [...prev, newQueuedDownload]);
    }
  }, [queuedDownloads]);

  // Remove from download queue
  const removeFromQueue = useCallback((type: string, id: string) => {
    setQueuedDownloads(prev => prev.filter(item => !(item.type === type && item.id === id)));
  }, []);

  // Process queued downloads
  const processQueue = useCallback(() => {
    if (!isOnline || queuedDownloads.length === 0) return;

    console.log(`📥 Processing ${queuedDownloads.length} queued downloads...`);
    
    // In a real app, this would download the actual content
    // For now, we'll simulate successful downloads
    queuedDownloads.forEach(item => {
      downloadContent({
        id: item.id,
        type: item.type,
        title: item.title,
        size: Math.floor(Math.random() * 5000) + 1000, // Random size between 1-6 MB
        level: item.level,
        character: item.character,
      });
    });

    // Clear the queue
    setQueuedDownloads([]);
  }, [isOnline, queuedDownloads, downloadContent]);

  // Add pending sync
  const addPendingSync = useCallback((sync: Omit<PendingSync, 'id' | 'timestamp'>) => {
    const newSync: PendingSync = {
      id: `sync-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      ...sync,
    };
    setPendingSyncs(prev => [...prev, newSync]);
  }, []);

  // Sync pending data
  const syncPendingData = useCallback(async () => {
    if (!isOnline || pendingSyncs.length === 0) return;

    console.log(`🔄 Syncing ${pendingSyncs.length} pending items...`);

    try {
      // In a real app, this would send data to the server
      // For now, we'll simulate successful sync
      for (const sync of pendingSyncs) {
        if (sync.type === 'activity') {
          // Track the activity that happened offline
          trackActivity(
            sync.data.activityType,
            sync.data.itemId,
            sync.data.itemTitle,
            sync.data.duration
          );
        }
        // Handle other sync types (progress, completion) here
      }

      // Clear synced data
      setPendingSyncs([]);
      console.log('✅ Sync complete!');
    } catch (error) {
      console.error('❌ Sync failed:', error);
      // Keep pending syncs for retry
    }
  }, [isOnline, pendingSyncs, trackActivity]);

  // Clear synced data manually
  const clearSyncedData = useCallback(() => {
    setPendingSyncs([]);
  }, []);

  // Get offline stats
  const getOfflineStats = useCallback(() => {
    return {
      downloadedCount: downloadedContent.length,
      queuedCount: queuedDownloads.length,
      pendingSyncCount: pendingSyncs.length,
      totalSize: getDownloadedSize(),
    };
  }, [downloadedContent, queuedDownloads, pendingSyncs, getDownloadedSize]);

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        downloadedContent,
        queuedDownloads,
        pendingSyncs,
        isContentDownloaded,
        downloadContent,
        removeDownload,
        getDownloadedSize,
        queueDownload,
        removeFromQueue,
        processQueue,
        addPendingSync,
        syncPendingData,
        clearSyncedData,
        getOfflineStats,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within OfflineProvider');
  }
  return context;
}
