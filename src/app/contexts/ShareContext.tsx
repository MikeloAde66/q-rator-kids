import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface ArtworkShare {
  id: string;
  childProfileId: string;
  childName: string;
  artworkType: 'lesson' | 'story' | 'assignment';
  artworkId: string;
  artworkTitle: string;
  sharedDate: string;
  platform?: 'facebook' | 'twitter' | 'instagram' | 'email' | 'copy';
}

export interface ProgressReport {
  id: string;
  childProfileId: string;
  childName: string;
  dateRange: { start: string; end: string };
  totalMinutes: number;
  lessonsCompleted: number;
  storiesCompleted: number;
  assignmentsCompleted: number;
  skillsMastered: string[];
  generatedDate: string;
}

export interface Certificate {
  id: string;
  childProfileId: string;
  childName: string;
  achievementType: 'all-lessons' | 'all-stories' | 'all-assignments' | 'skill-master' | 'time-milestone';
  achievementTitle: string;
  achievementDescription: string;
  dateEarned: string;
  characterSignature: string; // which character signs it
}

export interface ReferralCode {
  code: string;
  referrerId: string; // parent user id
  referrerEmail: string;
  createdDate: string;
  usedBy: string[]; // array of user ids who used this code
  rewardsEarned: number; // number of free months earned
  isActive: boolean;
}

interface ShareContextType {
  // Artwork Sharing
  shareArtwork: (artworkType: 'lesson' | 'story' | 'assignment', artworkId: string, artworkTitle: string, platform?: string) => Promise<{ success: boolean; message: string }>;
  getSharedArtworks: (childProfileId?: string) => ArtworkShare[];
  
  // Progress Reports
  generateProgressReport: (childProfileId: string, dateRange: { start: string; end: string }) => ProgressReport | null;
  emailProgressReport: (reportId: string, recipientEmail: string, recipientName: string) => Promise<{ success: boolean; message: string }>;
  getSavedReports: (childProfileId?: string) => ProgressReport[];
  
  // Certificates
  generateCertificate: (childProfileId: string, achievementType: Certificate['achievementType'], customTitle?: string) => Certificate | null;
  printCertificate: (certificateId: string) => void;
  getCertificates: (childProfileId?: string) => Certificate[];
  
  // Referral System
  referralCode: ReferralCode | null;
  generateReferralCode: () => ReferralCode;
  applyReferralCode: (code: string) => Promise<{ success: boolean; message: string; rewardMonths?: number }>;
  getReferralStats: () => { totalReferred: number; totalRewardsEarned: number };
}

const ShareContext = createContext<ShareContextType | undefined>(undefined);

export function ShareProvider({ children }: { children: ReactNode }) {
  const { parentUser, activeChildProfile } = useAuth();
  
  const [sharedArtworks, setSharedArtworks] = useState<ArtworkShare[]>(() => {
    const saved = localStorage.getItem('shared_artworks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [progressReports, setProgressReports] = useState<ProgressReport[]>(() => {
    const saved = localStorage.getItem('progress_reports');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('certificates');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [referralCode, setReferralCode] = useState<ReferralCode | null>(() => {
    const saved = localStorage.getItem('referral_code');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [allReferralCodes, setAllReferralCodes] = useState<ReferralCode[]>(() => {
    const saved = localStorage.getItem('all_referral_codes');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('shared_artworks', JSON.stringify(sharedArtworks));
  }, [sharedArtworks]);
  
  useEffect(() => {
    localStorage.setItem('progress_reports', JSON.stringify(progressReports));
  }, [progressReports]);
  
  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  }, [certificates]);
  
  useEffect(() => {
    if (referralCode) {
      localStorage.setItem('referral_code', JSON.stringify(referralCode));
    }
  }, [referralCode]);
  
  useEffect(() => {
    localStorage.setItem('all_referral_codes', JSON.stringify(allReferralCodes));
  }, [allReferralCodes]);
  
  // Share Artwork
  const shareArtwork = async (
    artworkType: 'lesson' | 'story' | 'assignment',
    artworkId: string,
    artworkTitle: string,
    platform?: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!activeChildProfile) {
      return { success: false, message: 'No active child profile' };
    }
    
    const shareData = {
      title: `${activeChildProfile.name}'s Artwork - ${artworkTitle}`,
      text: `Check out ${activeChildProfile.name}'s amazing artwork from Q Rator Kids! 🎨`,
      url: window.location.href,
    };
    
    try {
      // Use Web Share API if available and no specific platform requested
      if (navigator.share && !platform) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
      }
      
      // Track the share
      const newShare: ArtworkShare = {
        id: `share-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        childProfileId: activeChildProfile.id,
        childName: activeChildProfile.name,
        artworkType,
        artworkId,
        artworkTitle,
        sharedDate: new Date().toISOString(),
        platform: platform as any,
      };
      
      setSharedArtworks(prev => [newShare, ...prev]);
      
      return { success: true, message: 'Artwork shared successfully! 🎉' };
    } catch (error) {
      return { success: false, message: 'Failed to share artwork. Please try again.' };
    }
  };
  
  const getSharedArtworks = (childProfileId?: string): ArtworkShare[] => {
    if (childProfileId) {
      return sharedArtworks.filter(a => a.childProfileId === childProfileId);
    }
    return sharedArtworks;
  };
  
  // Progress Reports
  const generateProgressReport = (
    childProfileId: string,
    dateRange: { start: string; end: string }
  ): ProgressReport | null => {
    if (!parentUser) return null;
    
    const child = parentUser.childProfiles.find(c => c.id === childProfileId);
    if (!child) return null;
    
    // Get activity data from localStorage
    const activitySessions = localStorage.getItem('activity_sessions');
    const sessions = activitySessions ? JSON.parse(activitySessions) : [];
    
    // Filter sessions for this child and date range
    const childSessions = sessions.filter((s: any) => {
      return s.childProfileId === childProfileId &&
        new Date(s.startTime) >= new Date(dateRange.start) &&
        new Date(s.startTime) <= new Date(dateRange.end);
    });
    
    // Calculate totals
    const totalMinutes = childSessions.reduce((sum: number, s: any) => sum + (s.durationMinutes || 0), 0);
    const lessonsCompleted = new Set(childSessions.flatMap((s: any) => s.lessonsCompleted || [])).size;
    const storiesCompleted = new Set(childSessions.flatMap((s: any) => s.storiesCompleted || [])).size;
    const assignmentsCompleted = new Set(childSessions.flatMap((s: any) => s.assignmentsCompleted || [])).size;
    const skillsMastered = Array.from(new Set(childSessions.flatMap((s: any) => s.skillsPracticed || [])));
    
    const report: ProgressReport = {
      id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      childProfileId,
      childName: child.name,
      dateRange,
      totalMinutes,
      lessonsCompleted,
      storiesCompleted,
      assignmentsCompleted,
      skillsMastered: skillsMastered as string[],
      generatedDate: new Date().toISOString(),
    };
    
    setProgressReports(prev => [report, ...prev]);
    return report;
  };
  
  const emailProgressReport = async (
    reportId: string,
    recipientEmail: string,
    recipientName: string
  ): Promise<{ success: boolean; message: string }> => {
    const report = progressReports.find(r => r.id === reportId);
    if (!report) {
      return { success: false, message: 'Report not found' };
    }
    
    // Mock email sending - in production, this would call an API
    const emailSubject = `${report.childName}'s Q Rator Kids Progress Report`;
    const emailBody = `Hi ${recipientName}!\n\n${report.childName} has been making amazing progress with Q Rator Kids!\n\nPeriod: ${new Date(report.dateRange.start).toLocaleDateString()} - ${new Date(report.dateRange.end).toLocaleDateString()}\n\nTotal time learning: ${report.totalMinutes} minutes\nLessons completed: ${report.lessonsCompleted}\nStories completed: ${report.storiesCompleted}\nAssignments completed: ${report.assignmentsCompleted}\nSkills mastered: ${report.skillsMastered.join(', ')}\n\nKeep up the great work!\n\nThe Q Rator Kids Team 🎨`;
    
    // Create mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    return { success: true, message: `Progress report ready to email to ${recipientName}! 📧` };
  };
  
  const getSavedReports = (childProfileId?: string): ProgressReport[] => {
    if (childProfileId) {
      return progressReports.filter(r => r.childProfileId === childProfileId);
    }
    return progressReports;
  };
  
  // Certificates
  const generateCertificate = (
    childProfileId: string,
    achievementType: Certificate['achievementType'],
    customTitle?: string
  ): Certificate | null => {
    if (!parentUser) return null;
    
    const child = parentUser.childProfiles.find(c => c.id === childProfileId);
    if (!child) return null;
    
    // Achievement titles and descriptions
    const achievements = {
      'all-lessons': {
        title: customTitle || 'Master Artist',
        description: 'Completed all drawing lessons!',
        character: 'Sammy Squirrel',
      },
      'all-stories': {
        title: customTitle || 'Story Explorer',
        description: 'Finished all interactive stories!',
        character: 'Bella Bunny',
      },
      'all-assignments': {
        title: customTitle || 'Creative Champion',
        description: 'Completed all art assignments!',
        character: 'Oliver Owl',
      },
      'skill-master': {
        title: customTitle || 'Skill Master',
        description: 'Mastered all drawing skills!',
        character: 'Freddy Fox',
      },
      'time-milestone': {
        title: customTitle || '100 Hour Artist',
        description: 'Spent 100+ hours learning art!',
        character: 'Daisy Deer',
      },
    };
    
    const achievement = achievements[achievementType];
    
    const certificate: Certificate = {
      id: `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      childProfileId,
      childName: child.name,
      achievementType,
      achievementTitle: achievement.title,
      achievementDescription: achievement.description,
      dateEarned: new Date().toISOString(),
      characterSignature: achievement.character,
    };
    
    setCertificates(prev => [certificate, ...prev]);
    return certificate;
  };
  
  const printCertificate = (certificateId: string) => {
    const cert = certificates.find(c => c.id === certificateId);
    if (!cert) return;
    
    // Trigger browser print dialog
    window.print();
  };
  
  const getCertificates = (childProfileId?: string): Certificate[] => {
    if (childProfileId) {
      return certificates.filter(c => c.childProfileId === childProfileId);
    }
    return certificates;
  };
  
  // Referral System
  const generateReferralCode = (): ReferralCode => {
    if (!parentUser) {
      throw new Error('Must be logged in to generate referral code');
    }
    
    // Generate a unique referral code
    const codeBase = parentUser.firstName.substring(0, 3).toUpperCase() + 
                     Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newCode: ReferralCode = {
      code: codeBase,
      referrerId: parentUser.id,
      referrerEmail: parentUser.email,
      createdDate: new Date().toISOString(),
      usedBy: [],
      rewardsEarned: 0,
      isActive: true,
    };
    
    setReferralCode(newCode);
    setAllReferralCodes(prev => [...prev, newCode]);
    
    return newCode;
  };
  
  const applyReferralCode = async (code: string): Promise<{ success: boolean; message: string; rewardMonths?: number }> => {
    if (!parentUser) {
      return { success: false, message: 'Must be logged in to apply referral code' };
    }
    
    // Find the referral code in all codes
    const existingCode = allReferralCodes.find(c => c.code === code && c.isActive);
    
    if (!existingCode) {
      return { success: false, message: 'Invalid or expired referral code' };
    }
    
    if (existingCode.referrerId === parentUser.id) {
      return { success: false, message: "You can't use your own referral code!" };
    }
    
    if (existingCode.usedBy.includes(parentUser.id)) {
      return { success: false, message: 'You have already used this referral code' };
    }
    
    // Apply the referral code
    const updatedCodes = allReferralCodes.map(c => {
      if (c.code === code) {
        return {
          ...c,
          usedBy: [...c.usedBy, parentUser.id],
          rewardsEarned: c.rewardsEarned + 1,
        };
      }
      return c;
    });
    
    setAllReferralCodes(updatedCodes);
    
    // Update the user's own referral code if it's theirs
    if (referralCode && referralCode.code === code) {
      setReferralCode({
        ...referralCode,
        usedBy: [...referralCode.usedBy, parentUser.id],
        rewardsEarned: referralCode.rewardsEarned + 1,
      });
    }
    
    return { 
      success: true, 
      message: 'Referral code applied! You got 1 free month! 🎉',
      rewardMonths: 1 
    };
  };
  
  const getReferralStats = () => {
    if (!referralCode) {
      return { totalReferred: 0, totalRewardsEarned: 0 };
    }
    
    return {
      totalReferred: referralCode.usedBy.length,
      totalRewardsEarned: referralCode.rewardsEarned,
    };
  };
  
  // Auto-generate referral code on first login
  useEffect(() => {
    if (parentUser && !referralCode) {
      // Check if user already has a referral code in all codes
      const existingCode = allReferralCodes.find(c => c.referrerId === parentUser.id);
      if (existingCode) {
        setReferralCode(existingCode);
      }
    }
  }, [parentUser]);
  
  return (
    <ShareContext.Provider
      value={{
        shareArtwork,
        getSharedArtworks,
        generateProgressReport,
        emailProgressReport,
        getSavedReports,
        generateCertificate,
        printCertificate,
        getCertificates,
        referralCode,
        generateReferralCode,
        applyReferralCode,
        getReferralStats,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
}

export function useShare() {
  const context = useContext(ShareContext);
  if (context === undefined) {
    throw new Error('useShare must be used within a ShareProvider');
  }
  return context;
}
