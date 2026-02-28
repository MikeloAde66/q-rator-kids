import { useState, useRef } from 'react';
import { X, Award, Printer, Download, Sparkles, Star } from 'lucide-react';
import { useShare } from '../contexts/ShareContext';
import { useAuth } from '../contexts/AuthContext';
import type { Certificate } from '../contexts/ShareContext';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ isOpen, onClose }: CertificateModalProps) {
  const { activeChildProfile } = useAuth();
  const { generateCertificate, printCertificate, getCertificates } = useShare();
  const [selectedType, setSelectedType] = useState<Certificate['achievementType']>('all-lessons');
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  
  if (!isOpen || !activeChildProfile) return null;
  
  const achievementTypes = [
    { 
      type: 'all-lessons' as const, 
      label: 'Master Artist',
      description: 'Complete all lessons',
      icon: '🎨',
      color: 'from-purple-400 to-pink-400'
    },
    { 
      type: 'all-stories' as const, 
      label: 'Story Explorer',
      description: 'Finish all stories',
      icon: '📚',
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      type: 'all-assignments' as const, 
      label: 'Creative Champion',
      description: 'Complete all projects',
      icon: '🏆',
      color: 'from-yellow-400 to-orange-400'
    },
    { 
      type: 'skill-master' as const, 
      label: 'Skill Master',
      description: 'Master all skills',
      icon: '⭐',
      color: 'from-green-400 to-emerald-400'
    },
    { 
      type: 'time-milestone' as const, 
      label: '100 Hour Artist',
      description: '100+ hours learning',
      icon: '⏰',
      color: 'from-indigo-400 to-purple-400'
    },
  ];
  
  const handleGenerateCertificate = () => {
    const cert = generateCertificate(activeChildProfile.id, selectedType);
    setCurrentCertificate(cert);
  };
  
  const handlePrint = () => {
    if (currentCertificate) {
      // Use browser print
      window.print();
    }
  };
  
  const certificates = getCertificates(activeChildProfile.id);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-4 border-yellow-200">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-t-3xl print:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Achievement Certificates</h2>
                <p className="text-yellow-100">Print {activeChildProfile.name}'s awards! 🏆</p>
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
        <div className="p-6 space-y-6 print:p-0">
          {/* Generate New Certificate */}
          <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200 print:hidden">
            <h3 className="font-bold text-xl text-yellow-900 mb-4">Create New Certificate</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-yellow-900 mb-3">
                  Choose Achievement
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {achievementTypes.map((achievement) => (
                    <button
                      key={achievement.type}
                      onClick={() => setSelectedType(achievement.type)}
                      className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all duration-200 ${
                        selectedType === achievement.type
                          ? `bg-gradient-to-r ${achievement.color} text-white shadow-lg scale-105`
                          : 'bg-white text-gray-900 hover:bg-yellow-100'
                      }`}
                    >
                      <span className="text-3xl">{achievement.icon}</span>
                      <div className="text-left">
                        <div className="font-bold">{achievement.label}</div>
                        <div className={`text-xs ${selectedType === achievement.type ? 'text-white/90' : 'text-gray-600'}`}>
                          {achievement.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleGenerateCertificate}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Certificate
                  <Award className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
          
          {/* Certificate Preview */}
          {currentCertificate && (
            <div className="space-y-4">
              {/* Print Button */}
              <div className="flex gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Printer className="w-5 h-5" />
                  Print Certificate
                </button>
              </div>
              
              {/* Certificate Design */}
              <div 
                ref={certificateRef}
                className="bg-white p-8 md:p-12 rounded-2xl border-8 border-double border-yellow-500 shadow-2xl print:border-yellow-700 print:shadow-none print:m-0"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, #fef3c7 25%, transparent 25%),
                    linear-gradient(-45deg, #fef3c7 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #fef3c7 75%),
                    linear-gradient(-45deg, transparent 75%, #fef3c7 75%)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}
              >
                {/* Decorative Stars */}
                <div className="absolute top-4 left-4 text-yellow-500">
                  <Star className="w-12 h-12 fill-current" />
                </div>
                <div className="absolute top-4 right-4 text-yellow-500">
                  <Star className="w-12 h-12 fill-current" />
                </div>
                <div className="absolute bottom-4 left-4 text-yellow-500">
                  <Star className="w-12 h-12 fill-current" />
                </div>
                <div className="absolute bottom-4 right-4 text-yellow-500">
                  <Star className="w-12 h-12 fill-current" />
                </div>
                
                <div className="relative bg-white/95 p-8 md:p-12 rounded-xl">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <Award className="w-20 h-20 text-yellow-500" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-2" style={{ fontFamily: 'serif' }}>
                      Certificate of Achievement
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
                  </div>
                  
                  {/* Body */}
                  <div className="text-center space-y-6 mb-8">
                    <p className="text-xl text-gray-700" style={{ fontFamily: 'serif' }}>
                      This certifies that
                    </p>
                    
                    <div className="py-4 px-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300">
                      <p className="text-4xl md:text-5xl font-bold text-purple-900" style={{ fontFamily: 'cursive' }}>
                        {currentCertificate.childName}
                      </p>
                    </div>
                    
                    <p className="text-xl text-gray-700" style={{ fontFamily: 'serif' }}>
                      has successfully earned the title of
                    </p>
                    
                    <div className="py-6 px-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-400">
                      <p className="text-3xl md:text-4xl font-bold text-yellow-900 mb-2" style={{ fontFamily: 'serif' }}>
                        {currentCertificate.achievementTitle}
                      </p>
                      <p className="text-lg text-orange-700">
                        {currentCertificate.achievementDescription}
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-gray-600" style={{ fontFamily: 'serif' }}>
                        Awarded on {new Date(currentCertificate.dateEarned).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex justify-between items-end pt-8 border-t-2 border-gray-300">
                    <div className="text-center">
                      <div className="h-0.5 w-48 bg-gray-400 mb-2"></div>
                      <p className="font-bold text-gray-700" style={{ fontFamily: 'cursive' }}>
                        {currentCertificate.characterSignature}
                      </p>
                      <p className="text-sm text-gray-600">Art Teacher</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center border-4 border-yellow-500 mb-2">
                        <Award className="w-12 h-12 text-yellow-600" />
                      </div>
                      <p className="text-xs text-gray-600 font-bold">Q Rator Kids</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Earned Certificates */}
          {certificates.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 print:hidden">
              <h3 className="font-bold text-xl text-gray-900 mb-4">
                {activeChildProfile.name}'s Certificates ({certificates.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-xl p-4 border-2 border-yellow-200 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setCurrentCertificate(cert)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-8 h-8 text-yellow-500" />
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">
                          {cert.achievementTitle}
                        </div>
                        <div className="text-sm text-gray-600">
                          {cert.achievementDescription}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <span>{new Date(cert.dateEarned).toLocaleDateString()}</span>
                      <span className="text-purple-600 font-bold">Click to view</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:block, .print\\:block * {
            visibility: visible;
          }
          ${certificateRef.current ? `
            #certificate-preview {
              position: absolute;
              left: 0;
              top: 0;
            }
          ` : ''}
        }
      `}</style>
    </div>
  );
}
