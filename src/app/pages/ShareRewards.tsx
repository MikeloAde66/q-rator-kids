import { useState } from 'react';
import { Share2, Award, TrendingUp, Gift, Sparkles, Users, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useShare } from '../contexts/ShareContext';
import { ProgressReportModal } from '../components/ProgressReportModal';
import { CertificateModal } from '../components/CertificateModal';
import { ReferralCodeManager } from '../components/ReferralCodeManager';

export function ShareRewards() {
  const { parentUser, activeChildProfile } = useAuth();
  const { getSharedArtworks, getCertificates, getReferralStats } = useShare();
  const [showProgressReport, setShowProgressReport] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  
  const sharedArtworks = activeChildProfile ? getSharedArtworks(activeChildProfile.id) : [];
  const certificates = activeChildProfile ? getCertificates(activeChildProfile.id) : [];
  const referralStats = getReferralStats();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 md:p-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">Share & Rewards</h1>
          </div>
          <p className="text-purple-100 text-lg">
            Share your child's achievements and earn rewards! 🎨
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-purple-200">
            <Share2 className="w-10 h-10 text-purple-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-900">{sharedArtworks.length}</div>
            <div className="text-sm text-gray-600">Artworks Shared</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-yellow-200">
            <Award className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-yellow-900">{certificates.length}</div>
            <div className="text-sm text-gray-600">Certificates</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-blue-200">
            <Users className="w-10 h-10 text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-blue-900">{referralStats.totalReferred}</div>
            <div className="text-sm text-gray-600">Friends Referred</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-green-200">
            <Gift className="w-10 h-10 text-green-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-900">{referralStats.totalRewardsEarned}</div>
            <div className="text-sm text-gray-600">Free Months</div>
          </div>
        </div>
        
        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Progress Reports */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900">Progress Reports</h2>
                <p className="text-gray-600">Share with family</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Generate beautiful progress reports and email them to grandparents, family members, or friends! Show off how much your child has learned! 📊
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Weekly & Monthly Reports</span> - Track learning progress
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Email to Grandparents</span> - Share achievements easily
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Skills Mastered</span> - See what they've learned
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowProgressReport(true)}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Generate Report 📧
            </button>
          </div>
          
          {/* Certificates */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-yellow-900">Certificates</h2>
                <p className="text-gray-600">Print achievements</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Create beautiful printable certificates for completing lessons, stories, and mastering skills! Perfect for the refrigerator! 🏆
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Master Artist</span> - Complete all lessons
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Story Explorer</span> - Finish all stories
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Skill Master</span> - Master all drawing skills
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowCertificate(true)}
              className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Create Certificate 🏆
            </button>
          </div>
        </div>
        
        {/* Referral Program - Featured */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 shadow-2xl text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Gift className="w-12 h-12" />
                <h2 className="text-3xl font-bold">Referral Program</h2>
              </div>
              
              <p className="text-xl text-purple-100 mb-4">
                Refer a friend and you both get <span className="font-bold text-white">1 FREE MONTH!</span> 🎁
              </p>
              
              <div className="space-y-2 text-purple-100">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Share your unique referral code</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Friends get 1 free month when they sign up</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>You get 1 free month for each referral!</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button
                onClick={() => setShowReferral(true)}
                className="bg-white text-purple-900 px-8 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-110 border-4 border-purple-200"
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-8 h-8" />
                  <div>
                    <div>Get My Code</div>
                    <div className="text-sm text-purple-600">Start Earning!</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Referral Stats */}
          {referralStats.totalReferred > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-purple-400">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">{referralStats.totalReferred}</div>
                  <div className="text-sm text-purple-100">Friends Referred</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">{referralStats.totalRewardsEarned}</div>
                  <div className="text-sm text-purple-100">Free Months Earned</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Recent Shares */}
        {sharedArtworks.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Recently Shared Artworks 🎨
            </h2>
            
            <div className="space-y-3">
              {sharedArtworks.slice(0, 5).map((artwork) => (
                <div
                  key={artwork.id}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <Share2 className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <div className="font-bold text-purple-900">
                        {artwork.artworkTitle}
                      </div>
                      <div className="text-sm text-gray-600">
                        {artwork.childName} • {artwork.artworkType}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(artwork.sharedDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Tips for Parents */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            💡 Tips for Sharing
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-blue-900 mb-2">Share Artwork</h3>
              <p className="text-sm text-gray-700">
                Look for the "Share My Artwork!" button on lesson completion pages to share your child's creations on social media!
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-blue-900 mb-2">Weekly Reports</h3>
              <p className="text-sm text-gray-700">
                Send weekly progress reports to grandparents - they'll love seeing their grandchild's artistic growth!
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-blue-900 mb-2">Print Certificates</h3>
              <p className="text-sm text-gray-700">
                Print achievement certificates and hang them on the fridge or in your child's room for motivation!
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-blue-900 mb-2">Refer Friends</h3>
              <p className="text-sm text-gray-700">
                Share your referral code with other parents - everyone gets free months and kids can learn together!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <ProgressReportModal 
        isOpen={showProgressReport}
        onClose={() => setShowProgressReport(false)}
      />
      
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />
      
      <ReferralCodeManager
        isOpen={showReferral}
        onClose={() => setShowReferral(false)}
      />
    </div>
  );
}
