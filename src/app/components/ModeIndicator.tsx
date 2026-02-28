import { motion } from 'motion/react';
import { Users, Baby, Shield, Eye, EyeOff } from 'lucide-react';
import { useTutorial } from '../contexts/TutorialContext';
import { useAuth } from '../contexts/AuthContext';
import { Badge } from './ui/badge';

export function ModeIndicator() {
  const { isParentMode, setParentMode } = useTutorial();
  const { parentUser, activeChildProfile } = useAuth();

  // Only show for logged-in parents
  if (!parentUser) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-purple-300 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-3 h-3 rounded-full ${isParentMode ? 'bg-blue-500 animate-pulse' : 'bg-green-500 animate-pulse'}`} />
          <span className="font-black text-gray-800">
            {isParentMode ? 'Parent Mode' : 'Kid Mode'}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setParentMode(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              !isParentMode
                ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Baby className="w-4 h-4" />
            Kid View
          </button>

          <button
            onClick={() => setParentMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              isParentMode
                ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            Parent View
          </button>
        </div>

        {/* Active Profile */}
        {activeChildProfile && !isParentMode && (
          <div className="mt-3 pt-3 border-t-2 border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeChildProfile.avatar}</span>
              <div>
                <p className="text-xs text-gray-500 font-bold">Viewing as:</p>
                <p className="text-sm font-black text-gray-800">{activeChildProfile.name}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-3 pt-3 border-t-2 border-gray-200">
          <div className="flex items-start gap-2">
            <Eye className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">
              {isParentMode 
                ? 'Parent mode shows analytics, controls, and advanced features.'
                : 'Kid mode shows simplified, child-friendly interface with big buttons and fun animations.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Simple badge version for headers
export function ModeBadge() {
  const { isParentMode } = useTutorial();
  const { parentUser } = useAuth();

  if (!parentUser) return null;

  return (
    <Badge 
      className={`${
        isParentMode 
          ? 'bg-blue-500 hover:bg-blue-600' 
          : 'bg-green-500 hover:bg-green-600'
      } text-white font-black`}
    >
      {isParentMode ? '👨‍👩‍👧 Parent' : '👶 Kid'} Mode
    </Badge>
  );
}
