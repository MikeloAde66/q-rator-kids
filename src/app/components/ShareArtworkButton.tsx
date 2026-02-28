import { useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, Mail, Link as LinkIcon, Sparkles } from 'lucide-react';
import { useShare } from '../contexts/ShareContext';
import { useAuth } from '../contexts/AuthContext';

interface ShareArtworkButtonProps {
  artworkType: 'lesson' | 'story' | 'assignment';
  artworkId: string;
  artworkTitle: string;
  className?: string;
}

export function ShareArtworkButton({ 
  artworkType, 
  artworkId, 
  artworkTitle,
  className = ''
}: ShareArtworkButtonProps) {
  const { shareArtwork } = useShare();
  const { activeChildProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  
  if (!activeChildProfile) return null;
  
  const handleShare = async (platform?: string) => {
    const result = await shareArtwork(artworkType, artworkId, artworkTitle, platform);
    
    setShareMessage(result.message);
    setShowMessage(true);
    setIsOpen(false);
    
    setTimeout(() => setShowMessage(false), 3000);
  };
  
  const platforms = [
    { 
      name: 'Share', 
      icon: Share2, 
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => handleShare()
    },
    { 
      name: 'Copy Link', 
      icon: LinkIcon, 
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => handleShare('copy')
    },
    { 
      name: 'Email', 
      icon: Mail, 
      color: 'bg-green-500 hover:bg-green-600',
      action: () => handleShare('email')
    },
  ];
  
  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
      >
        <Sparkles className="w-5 h-5" />
        Share My Artwork!
        <Share2 className="w-5 h-5" />
      </button>
      
      {/* Platform Selection Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Platform Menu */}
          <div className="absolute top-full mt-3 right-0 z-50 bg-white rounded-2xl shadow-2xl p-4 min-w-[280px] border-4 border-purple-200">
            <div className="mb-3">
              <p className="font-bold text-purple-900 text-center mb-1">
                Share {activeChildProfile.name}'s Art! 🎨
              </p>
              <p className="text-sm text-gray-600 text-center">
                (Parents can share to social media)
              </p>
            </div>
            
            <div className="space-y-2">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.name}
                    onClick={platform.action}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white transition-all duration-200 transform hover:scale-105 ${platform.color}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-bold">{platform.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-3 pt-3 border-t-2 border-purple-100">
              <p className="text-xs text-gray-500 text-center">
                ✨ Show off {activeChildProfile.name}'s creativity!
              </p>
            </div>
          </div>
        </>
      )}
      
      {/* Success Message Toast */}
      {showMessage && (
        <div className="fixed bottom-4 right-4 z-[60] bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce-in border-4 border-green-300">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <p className="font-bold">{shareMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
