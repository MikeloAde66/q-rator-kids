import { useState, useEffect } from 'react';
import { Gift, Copy, Check, Users, Award, Sparkles, X } from 'lucide-react';
import { useShare } from '../contexts/ShareContext';
import { useAuth } from '../contexts/AuthContext';

interface ReferralCodeManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferralCodeManager({ isOpen, onClose }: ReferralCodeManagerProps) {
  const { parentUser } = useAuth();
  const { referralCode, generateReferralCode, applyReferralCode, getReferralStats } = useShare();
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [applyMessage, setApplyMessage] = useState('');
  const [showApplySuccess, setShowApplySuccess] = useState(false);
  
  useEffect(() => {
    // Auto-generate referral code if user doesn't have one
    if (parentUser && !referralCode) {
      generateReferralCode();
    }
  }, [parentUser, referralCode]);
  
  if (!isOpen || !parentUser) return null;
  
  const stats = getReferralStats();
  
  const handleCopyCode = async () => {
    if (!referralCode) return;
    
    try {
      await navigator.clipboard.writeText(referralCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleApplyCode = async () => {
    if (!inputCode.trim()) return;
    
    const result = await applyReferralCode(inputCode.trim().toUpperCase());
    setApplyMessage(result.message);
    
    if (result.success) {
      setShowApplySuccess(true);
      setInputCode('');
      setTimeout(() => {
        setShowApplySuccess(false);
        setApplyMessage('');
      }, 3000);
    }
  };
  
  const shareReferralCode = () => {
    if (!referralCode) return;
    
    const shareText = `🎨 Join me on Q Rator Kids! Use my referral code "${referralCode.code}" and we both get 1 FREE MONTH! 🎁\n\nHelp your kids learn drawing and coloring with fun animal art teachers! 🦊🦉🐰`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Q Rator Kids Referral',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-purple-200">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Referral Rewards</h2>
                <p className="text-purple-100">Share the love, earn free months! 💜</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Your Referral Code */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-xl text-purple-900">Your Referral Code</h3>
            </div>
            
            {referralCode ? (
              <div className="space-y-4">
                {/* Code Display */}
                <div className="bg-white rounded-xl p-6 border-2 border-purple-300 text-center">
                  <div className="text-5xl font-bold text-purple-900 tracking-wider mb-2" style={{ fontFamily: 'monospace' }}>
                    {referralCode.code}
                  </div>
                  <p className="text-sm text-gray-600">Share this code with friends!</p>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCopyCode}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Code
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={shareReferralCode}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-200"
                  >
                    <Gift className="w-5 h-5" />
                    Share
                  </button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-4 text-center border-2 border-blue-200">
                    <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-900">{stats.totalReferred}</div>
                    <div className="text-sm text-gray-600">Friends Referred</div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 text-center border-2 border-green-200">
                    <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-900">{stats.totalRewardsEarned}</div>
                    <div className="text-sm text-gray-600">Free Months Earned</div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={generateReferralCode}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Generate My Referral Code
              </button>
            )}
          </div>
          
          {/* How It Works */}
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="font-bold text-xl text-blue-900 mb-4">How It Works 🎁</h3>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-bold text-blue-900">Share your code</p>
                  <p className="text-sm text-gray-700">Give your unique code to friends and family</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-bold text-blue-900">They subscribe</p>
                  <p className="text-sm text-gray-700">When they use your code, they get 1 free month!</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-bold text-blue-900">You both win!</p>
                  <p className="text-sm text-gray-700">You also get 1 free month added to your account! 🎉</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Apply a Code */}
          <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
            <h3 className="font-bold text-xl text-green-900 mb-4">
              Have a Referral Code? 🎫
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-sm text-gray-700 mb-2">
                  Enter Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    placeholder="FRIEND123"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none font-bold text-center text-lg"
                    style={{ fontFamily: 'monospace' }}
                  />
                  <button
                    onClick={handleApplyCode}
                    disabled={!inputCode.trim()}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              {applyMessage && (
                <div className={`p-4 rounded-xl font-bold text-center ${
                  showApplySuccess
                    ? 'bg-green-100 text-green-900 border-2 border-green-300'
                    : 'bg-red-100 text-red-900 border-2 border-red-300'
                }`}>
                  {applyMessage}
                </div>
              )}
              
              <div className="bg-white rounded-xl p-4 border border-green-200">
                <p className="text-sm text-gray-700 text-center">
                  💡 <span className="font-bold">Pro tip:</span> Enter a friend's code to get 1 FREE MONTH instantly!
                </p>
              </div>
            </div>
          </div>
          
          {/* Social Sharing Suggestion */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
            <h3 className="font-bold text-xl text-pink-900 mb-3">
              💬 Share on Social Media
            </h3>
            <p className="text-gray-700 mb-4">
              Spread the word about Q Rator Kids! The more friends who join, the more free months you earn! 🎨
            </p>
            
            <div className="bg-white rounded-xl p-4 border border-pink-200">
              <p className="text-sm text-gray-600 italic mb-2">Share this message:</p>
              <p className="text-sm text-gray-900">
                "🎨 My kids love Q Rator Kids! They're learning to draw with fun animal teachers! Use code <span className="font-bold text-purple-600">{referralCode?.code}</span> for 1 FREE MONTH! 🎁"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
