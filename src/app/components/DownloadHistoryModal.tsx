import { motion } from 'motion/react';
import { Download, Trash2, Calendar, FileImage, BookOpen, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useDownload } from '../contexts/DownloadContext';

interface DownloadHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadHistoryModal({ isOpen, onClose }: DownloadHistoryModalProps) {
  const { downloadHistory, clearDownloadHistory } = useDownload();

  const typeIcons = {
    lesson: BookOpen,
    story: Sparkles,
    assignment: FileImage,
  };

  const typeColors = {
    lesson: 'from-blue-500 to-cyan-500',
    story: 'from-purple-500 to-pink-500',
    assignment: 'from-orange-500 to-yellow-500',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-3xl border-4 border-blue-300 max-h-[90vh]">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-center flex items-center justify-center gap-3">
              <Download className="w-8 h-8" />
              My Downloads 📥
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-blue-100 mt-2">
            {downloadHistory.length} total download{downloadHistory.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto">
          {downloadHistory.length > 0 ? (
            <>
              {/* Clear All Button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all download history?')) {
                      clearDownloadHistory();
                    }
                  }}
                  variant="outline"
                  className="border-2 border-red-300 text-red-600 hover:bg-red-50 font-bold"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>

              {/* Download List */}
              <div className="space-y-4">
                {downloadHistory.map((item, index) => {
                  const Icon = typeIcons[item.type];
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-5 border-4 border-purple-200 bg-white hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`p-4 rounded-2xl bg-gradient-to-br ${typeColors[item.type]} flex-shrink-0`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-black text-gray-800 truncate">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                                {item.character}
                              </span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                                {item.difficulty}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(item.downloadedAt)}
                              </span>
                            </div>
                          </div>

                          {/* Image Preview */}
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-xl border-4 border-white shadow-md flex-shrink-0"
                            />
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mb-6">
                <Download className="w-16 h-16 text-purple-500" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">
                No Downloads Yet! 📥
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                When you download lessons, stories, or assignments, they'll appear here so you can keep track of your awesome creations!
              </p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
