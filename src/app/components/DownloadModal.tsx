import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, QrCode, Share2, Printer, FileImage, X, Check, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useDownload } from '../contexts/DownloadContext';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    type: 'lesson' | 'story' | 'assignment';
    title: string;
    description: string;
    imageUrl?: string;
    character: string;
    difficulty: string;
  } | null;
}

export function DownloadModal({ isOpen, onClose, item }: DownloadModalProps) {
  const { addDownload } = useDownload();
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'pdf' | 'jpeg'>('png');

  if (!item) return null;

  // Generate a shareable URL (in a real app, this would be a shortened link)
  const shareUrl = `${window.location.origin}/share/${item.type}/${encodeURIComponent(item.title)}`;

  const handleDownload = async () => {
    // Track the download
    addDownload({
      type: item.type,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      character: item.character,
      difficulty: item.difficulty,
    });

    // Simulate download process
    setDownloadComplete(false);
    
    // In a real app, you'd generate/fetch the actual file here
    // For demo, we'll create a simple download
    if (item.imageUrl) {
      try {
        const response = await fetch(item.imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${item.title.replace(/\s+/g, '_')}.${selectedFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      }
    } else {
      // For items without images, create a text file
      const content = `${item.title}\n\n${item.description}\n\nCharacter: ${item.character}\nDifficulty: ${item.difficulty}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }

    setDownloadComplete(true);
    setTimeout(() => setDownloadComplete(false), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const typeColors = {
    lesson: 'from-blue-500 to-cyan-500',
    story: 'from-purple-500 to-pink-500',
    assignment: 'from-orange-500 to-yellow-500',
  };

  const typeEmoji = {
    lesson: '📚',
    story: '📖',
    assignment: '✏️',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-4 border-purple-300">
        <div className={`bg-gradient-to-br ${typeColors[item.type]} p-6 text-white`}>
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-center">
              Download & Share {typeEmoji[item.type]}
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-white/90 mt-2">
            Save your artwork or share it with friends!
          </p>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Item Preview */}
          <Card className="p-6 border-4 border-purple-200 bg-gradient-to-br from-yellow-50 to-purple-50">
            <div className="flex items-start gap-4">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-2xl border-4 border-white shadow-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <div className="flex gap-2 mt-3">
                  <span className="px-3 py-1 bg-purple-200 text-purple-700 rounded-full text-sm font-bold">
                    {item.character}
                  </span>
                  <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm font-bold">
                    {item.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Download Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <Download className="w-6 h-6 text-purple-500" />
              Download Options
            </h4>

            {/* Format Selector */}
            <div className="flex gap-3">
              {['png', 'jpeg', 'pdf'].map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format as any)}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                    selectedFormat === format
                      ? 'bg-purple-500 text-white border-purple-500 shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                  }`}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl py-6 rounded-2xl shadow-lg font-black"
            >
              {downloadComplete ? (
                <>
                  <Check className="w-6 h-6 mr-2" />
                  Downloaded! 🎉
                </>
              ) : (
                <>
                  <Download className="w-6 h-6 mr-2" />
                  Download as {selectedFormat.toUpperCase()}
                </>
              )}
            </Button>

            {/* Print Button */}
            <Button
              onClick={handlePrint}
              variant="outline"
              className="w-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 text-lg py-6 rounded-2xl font-black"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print
            </Button>
          </div>

          {/* QR Code & Share Section */}
          <div className="space-y-4 pt-4 border-t-4 border-purple-200">
            <h4 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-purple-500" />
              Share with QR Code
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              {/* QR Code */}
              <div className="flex flex-col items-center">
                <div className="p-6 bg-white rounded-3xl border-4 border-purple-200 shadow-lg">
                  <QRCodeSVG
                    value={shareUrl}
                    size={180}
                    level="H"
                    includeMargin={true}
                    fgColor="#7c3aed"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center font-bold">
                  Scan to view on another device!
                </p>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                <p className="text-gray-700 font-bold">Share this link:</p>
                <div className="p-3 bg-gray-100 rounded-xl border-2 border-gray-300 break-all text-sm text-gray-600 font-mono">
                  {shareUrl}
                </div>
                <Button
                  onClick={handleCopyLink}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg py-4 rounded-2xl shadow-lg font-black"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  <button className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all">
                    📧 Email
                  </button>
                  <button className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all">
                    💬 Text
                  </button>
                  <button className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold transition-all">
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Success Animation */}
          <AnimatePresence>
            {downloadComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-green-50 border-2 border-green-300 rounded-2xl"
              >
                <p className="text-green-700 font-bold text-center flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Successfully downloaded! Check your downloads folder 📁
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
