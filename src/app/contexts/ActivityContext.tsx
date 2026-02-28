import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface ActivitySession {
  childProfileId: string;
  startTime: string;
  endTime?: string;
  durationMinutes: number;
  lessonsCompleted: string[];
  storiesCompleted: string[];
  assignmentsCompleted: string[];
  skillsPracticed: string[];
}

export interface DailyActivity {
  date: string;
  totalMinutes: number;
  lessonsCompleted: number;
  storiesCompleted: number;
  assignmentsCompleted: number;
  skillsPracticed: string[];
}

export interface ChildProgress {
  childProfileId: string;
  totalMinutes: number;
  totalLessons: number;
  totalStories: number;
  totalAssignments: number;
  skillsMastered: string[];
  weeklyActivity: DailyActivity[];
  lastActiveDate: string;
}

interface ParentalControls {
  dailyTimeLimitMinutes: number; // 0 = no limit
  contentFiltering: 'all' | 'beginner-only' | 'intermediate-only';
  allowDownloads: boolean;
}

interface ActivityContextType {
  // Activity tracking
  currentSession: ActivitySession | null;
  startSession: (childProfileId: string) => void;
  endSession: () => void;
  trackLessonComplete: (lessonId: string, skills: string[]) => void;
  trackStoryComplete: (storyId: string, skills: string[]) => void;
  trackAssignmentComplete: (assignmentId: string, skills: string[]) => void;
  
  // Progress reporting
  getChildProgress: (childProfileId: string) => ChildProgress | null;
  getAllChildrenProgress: () => ChildProgress[];
  getWeeklyReport: (childProfileId: string) => DailyActivity[];
  
  // Parental controls
  parentalControls: ParentalControls;
  updateParentalControls: (controls: Partial<ParentalControls>) => void;
  checkTimeLimit: (childProfileId: string) => { allowed: boolean; minutesRemaining: number };
  
  // Export
  getTotalStats: () => {
    totalChildren: number;
    totalMinutes: number;
    totalLessons: number;
    totalStories: number;
    totalAssignments: number;
    uniqueSkills: number;
  };
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const { activeChildProfile } = useAuth();
  const [currentSession, setCurrentSession] = useState<ActivitySession | null>(null);
  const [sessions, setSessions] = useState<ActivitySession[]>(() => {
    const saved = localStorage.getItem('activity_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [parentalControls, setParentalControls] = useState<ParentalControls>(() => {
    const saved = localStorage.getItem('parental_controls');
    return saved ? JSON.parse(saved) : {
      dailyTimeLimitMinutes: 0,
      contentFiltering: 'all',
      allowDownloads: true,
    };
  });

  // Auto-start session when child profile is active
  useEffect(() => {
    if (activeChildProfile && !currentSession) {
      startSession(activeChildProfile.id);
    }
  }, [activeChildProfile?.id]);

  // Auto-save session every minute
  useEffect(() => {
    if (currentSession) {
      const interval = setInterval(() => {
        const duration = Math.floor((Date.now() - new Date(currentSession.startTime).getTime()) / 60000);
        setCurrentSession(prev => prev ? { ...prev, durationMinutes: duration } : null);
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [currentSession]);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('activity_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Save parental controls to localStorage
  useEffect(() => {
    localStorage.setItem('parental_controls', JSON.stringify(parentalControls));
  }, [parentalControls]);

  const startSession = (childProfileId: string) => {
    const newSession: ActivitySession = {
      childProfileId,
      startTime: new Date().toISOString(),
      durationMinutes: 0,
      lessonsCompleted: [],
      storiesCompleted: [],
      assignmentsCompleted: [],
      skillsPracticed: [],
    };
    setCurrentSession(newSession);
  };

  const endSession = () => {
    if (currentSession) {
      const endedSession = {
        ...currentSession,
        endTime: new Date().toISOString(),
        durationMinutes: Math.floor((Date.now() - new Date(currentSession.startTime).getTime()) / 60000),
      };
      setSessions(prev => [...prev, endedSession]);
      setCurrentSession(null);
    }
  };

  const trackLessonComplete = (lessonId: string, skills: string[]) => {
    if (currentSession && !currentSession.lessonsCompleted.includes(lessonId)) {
      setCurrentSession(prev => prev ? {
        ...prev,
        lessonsCompleted: [...prev.lessonsCompleted, lessonId],
        skillsPracticed: [...new Set([...prev.skillsPracticed, ...skills])],
      } : null);
    }
  };

  const trackStoryComplete = (storyId: string, skills: string[]) => {
    if (currentSession && !currentSession.storiesCompleted.includes(storyId)) {
      setCurrentSession(prev => prev ? {
        ...prev,
        storiesCompleted: [...prev.storiesCompleted, storyId],
        skillsPracticed: [...new Set([...prev.skillsPracticed, ...skills])],
      } : null);
    }
  };

  const trackAssignmentComplete = (assignmentId: string, skills: string[]) => {
    if (currentSession && !currentSession.assignmentsCompleted.includes(assignmentId)) {
      setCurrentSession(prev => prev ? {
        ...prev,
        assignmentsCompleted: [...prev.assignmentsCompleted, assignmentId],
        skillsPracticed: [...new Set([...prev.skillsPracticed, ...skills])],
      } : null);
    }
  };

  const getChildProgress = (childProfileId: string): ChildProgress | null => {
    const childSessions = sessions.filter(s => s.childProfileId === childProfileId);
    if (childSessions.length === 0) return null;

    const totalMinutes = childSessions.reduce((sum, s) => sum + s.durationMinutes, 0);
    const allLessons = childSessions.flatMap(s => s.lessonsCompleted);
    const allStories = childSessions.flatMap(s => s.storiesCompleted);
    const allAssignments = childSessions.flatMap(s => s.assignmentsCompleted);
    const allSkills = childSessions.flatMap(s => s.skillsPracticed);

    // Get last 7 days of activity
    const weeklyActivity = getWeeklyReport(childProfileId);

    return {
      childProfileId,
      totalMinutes,
      totalLessons: [...new Set(allLessons)].length,
      totalStories: [...new Set(allStories)].length,
      totalAssignments: [...new Set(allAssignments)].length,
      skillsMastered: [...new Set(allSkills)],
      weeklyActivity,
      lastActiveDate: childSessions[childSessions.length - 1]?.endTime || childSessions[childSessions.length - 1]?.startTime || '',
    };
  };

  const getAllChildrenProgress = (): ChildProgress[] => {
    const childIds = [...new Set(sessions.map(s => s.childProfileId))];
    return childIds.map(id => getChildProgress(id)).filter(Boolean) as ChildProgress[];
  };

  const getWeeklyReport = (childProfileId: string): DailyActivity[] => {
    const today = new Date();
    const last7Days: DailyActivity[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const daySessions = sessions.filter(s => {
        if (s.childProfileId !== childProfileId) return false;
        const sessionDate = new Date(s.startTime).toISOString().split('T')[0];
        return sessionDate === dateStr;
      });

      const totalMinutes = daySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
      const lessonsCompleted = [...new Set(daySessions.flatMap(s => s.lessonsCompleted))].length;
      const storiesCompleted = [...new Set(daySessions.flatMap(s => s.storiesCompleted))].length;
      const assignmentsCompleted = [...new Set(daySessions.flatMap(s => s.assignmentsCompleted))].length;
      const skillsPracticed = [...new Set(daySessions.flatMap(s => s.skillsPracticed))];

      last7Days.push({
        date: dateStr,
        totalMinutes,
        lessonsCompleted,
        storiesCompleted,
        assignmentsCompleted,
        skillsPracticed,
      });
    }

    return last7Days;
  };

  const checkTimeLimit = (childProfileId: string): { allowed: boolean; minutesRemaining: number } => {
    if (parentalControls.dailyTimeLimitMinutes === 0) {
      return { allowed: true, minutesRemaining: -1 }; // No limit
    }

    const today = new Date().toISOString().split('T')[0];
    const todaySessions = sessions.filter(s => {
      if (s.childProfileId !== childProfileId) return false;
      const sessionDate = new Date(s.startTime).toISOString().split('T')[0];
      return sessionDate === today;
    });

    // Add current session if exists
    let totalMinutes = todaySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
    if (currentSession && currentSession.childProfileId === childProfileId) {
      totalMinutes += currentSession.durationMinutes;
    }

    const minutesRemaining = parentalControls.dailyTimeLimitMinutes - totalMinutes;
    return {
      allowed: minutesRemaining > 0,
      minutesRemaining: Math.max(0, minutesRemaining),
    };
  };

  const updateParentalControls = (controls: Partial<ParentalControls>) => {
    setParentalControls(prev => ({ ...prev, ...controls }));
  };

  const getTotalStats = () => {
    const allProgress = getAllChildrenProgress();
    const totalChildren = allProgress.length;
    const totalMinutes = allProgress.reduce((sum, p) => sum + p.totalMinutes, 0);
    const totalLessons = allProgress.reduce((sum, p) => sum + p.totalLessons, 0);
    const totalStories = allProgress.reduce((sum, p) => sum + p.totalStories, 0);
    const totalAssignments = allProgress.reduce((sum, p) => sum + p.totalAssignments, 0);
    const allSkills = allProgress.flatMap(p => p.skillsMastered);
    const uniqueSkills = [...new Set(allSkills)].length;

    return {
      totalChildren,
      totalMinutes,
      totalLessons,
      totalStories,
      totalAssignments,
      uniqueSkills,
    };
  };

  return (
    <ActivityContext.Provider
      value={{
        currentSession,
        startSession,
        endSession,
        trackLessonComplete,
        trackStoryComplete,
        trackAssignmentComplete,
        getChildProgress,
        getAllChildrenProgress,
        getWeeklyReport,
        parentalControls,
        updateParentalControls,
        checkTimeLimit,
        getTotalStats,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within ActivityProvider');
  }
  return context;
}
