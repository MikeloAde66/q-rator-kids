import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ChildProfile {
  id: string;
  name: string;
  ageGroup: '6-8' | '9-12';
  favoriteCharacter: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ParentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  childProfiles: ChildProfile[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  parentUser: ParentUser | null;
  activeChildProfile: ChildProfile | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchChildProfile: (childId: string) => void;
  addChildProfile: (profile: Omit<ChildProfile, 'id' | 'createdAt'>) => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth_session') === 'true';
  });

  const [parentUser, setParentUser] = useState<ParentUser | null>(() => {
    const saved = localStorage.getItem('parent_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeChildProfile, setActiveChildProfile] = useState<ChildProfile | null>(() => {
    const saved = localStorage.getItem('active_child_profile');
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (parentUser) {
      localStorage.setItem('parent_user', JSON.stringify(parentUser));
    }
  }, [parentUser]);

  useEffect(() => {
    if (activeChildProfile) {
      localStorage.setItem('active_child_profile', JSON.stringify(activeChildProfile));
    }
  }, [activeChildProfile]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Mock authentication - check localStorage for registered users
    const usersData = localStorage.getItem('registered_users');
    const users: ParentUser[] = usersData ? JSON.parse(usersData) : [];

    const user = users.find(u => u.email === email);
    
    // For demo purposes, accept any password for existing users, or create new user
    if (user) {
      setParentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('auth_session', 'true');
      
      // Set first child as active if available
      if (user.childProfiles.length > 0) {
        setActiveChildProfile(user.childProfiles[0]);
      }
      
      return { success: true };
    }

    return { success: false, error: 'Account not found. Please register first.' };
  };

  const register = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Check if user already exists
    const usersData = localStorage.getItem('registered_users');
    const users: ParentUser[] = usersData ? JSON.parse(usersData) : [];

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    // Create new user
    const newUser: ParentUser = {
      id: `user_${Date.now()}`,
      email,
      firstName,
      lastName,
      createdAt: new Date().toISOString(),
      childProfiles: []
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(users));

    // Log them in
    setParentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('auth_session', 'true');

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setParentUser(null);
    setActiveChildProfile(null);
    localStorage.removeItem('auth_session');
    localStorage.removeItem('active_child_profile');
  };

  const switchChildProfile = (childId: string) => {
    if (!parentUser) return;
    
    const profile = parentUser.childProfiles.find(p => p.id === childId);
    if (profile) {
      setActiveChildProfile(profile);
    }
  };

  const addChildProfile = (profile: Omit<ChildProfile, 'id' | 'createdAt'>) => {
    if (!parentUser) return;

    const newProfile: ChildProfile = {
      ...profile,
      id: `child_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const updatedUser = {
      ...parentUser,
      childProfiles: [...parentUser.childProfiles, newProfile]
    };

    setParentUser(updatedUser);
    setActiveChildProfile(newProfile);

    // Update in registered users
    const usersData = localStorage.getItem('registered_users');
    const users: ParentUser[] = usersData ? JSON.parse(usersData) : [];
    const updatedUsers = users.map(u => u.id === parentUser.id ? updatedUser : u);
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Mock password reset
    const usersData = localStorage.getItem('registered_users');
    const users: ParentUser[] = usersData ? JSON.parse(usersData) : [];
    
    const user = users.find(u => u.email === email);
    
    if (user) {
      return { 
        success: true, 
        message: `Password reset instructions have been sent to ${email}. (This is a demo - check your console!)` 
      };
    }
    
    return { 
      success: false, 
      message: 'No account found with this email address.' 
    };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        parentUser,
        activeChildProfile,
        login,
        register,
        logout,
        switchChildProfile,
        addChildProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
