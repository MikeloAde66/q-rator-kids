import { createContext, useContext, useState, ReactNode } from 'react';

export interface DownloadItem {
  id: string;
  type: 'lesson' | 'story' | 'assignment';
  title: string;
  description: string;
  imageUrl?: string;
  downloadedAt: string;
  character: string;
  difficulty: string;
}

interface DownloadContextType {
  downloadHistory: DownloadItem[];
  addDownload: (item: Omit<DownloadItem, 'id' | 'downloadedAt'>) => void;
  clearDownloadHistory: () => void;
  getDownloadCount: () => number;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [downloadHistory, setDownloadHistory] = useState<DownloadItem[]>(() => {
    const saved = localStorage.getItem('download_history');
    return saved ? JSON.parse(saved) : [];
  });

  const addDownload = (item: Omit<DownloadItem, 'id' | 'downloadedAt'>) => {
    const newDownload: DownloadItem = {
      ...item,
      id: `download_${Date.now()}`,
      downloadedAt: new Date().toISOString()
    };

    const updated = [newDownload, ...downloadHistory];
    setDownloadHistory(updated);
    localStorage.setItem('download_history', JSON.stringify(updated));
  };

  const clearDownloadHistory = () => {
    setDownloadHistory([]);
    localStorage.removeItem('download_history');
  };

  const getDownloadCount = () => downloadHistory.length;

  return (
    <DownloadContext.Provider
      value={{
        downloadHistory,
        addDownload,
        clearDownloadHistory,
        getDownloadCount,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownload() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownload must be used within DownloadProvider');
  }
  return context;
}
