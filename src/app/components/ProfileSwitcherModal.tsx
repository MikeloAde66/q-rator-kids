import { Card } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import { getCharacterById } from '../data/characters';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChild: () => void;
}

export function ProfileSwitcherModal({ isOpen, onClose, onAddChild }: ProfileSwitcherModalProps) {
  const { parentUser, activeChildProfile, switchChildProfile } = useAuth();

  if (!parentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-4 border-purple-300">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-center flex items-center justify-center gap-3">
              <Users className="w-8 h-8" />
              Who's Learning Today? 🎨
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-purple-100 mt-2">
            Select which child you'd like to switch to
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Child Profiles */}
          {parentUser.childProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parentUser.childProfiles.map((profile) => {
                const character = getCharacterById(profile.favoriteCharacter);
                const isActive = activeChildProfile?.id === profile.id;

                return (
                  <motion.div
                    key={profile.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        switchChildProfile(profile.id);
                        onClose();
                      }}
                      className={`w-full p-6 rounded-3xl border-4 transition-all text-left relative ${
                        isActive
                          ? 'bg-gradient-to-br from-yellow-300 to-orange-300 border-white shadow-2xl'
                          : 'bg-white border-purple-200 hover:border-purple-400'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                        >
                          <Check className="w-6 h-6 text-white" />
                        </motion.div>
                      )}

                      <div className="flex items-center gap-4">
                        {character && (
                          <div className="text-5xl">
                            {character.emoji}
                          </div>
                        )}
                        <div>
                          <h3 className="text-2xl font-black text-gray-800">
                            {profile.name}
                          </h3>
                          <p className="text-gray-600 font-bold">
                            {profile.ageGroup} years old
                          </p>
                          {character && (
                            <p className="text-sm text-gray-500 mt-1">
                              Buddy: {character.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600 font-bold">
                No child profiles yet. Add one to get started!
              </p>
            </div>
          )}

          {/* Add New Child Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => {
                onAddChild();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl py-6 rounded-2xl shadow-lg font-black border-4 border-white"
            >
              <Plus className="w-6 h-6 mr-2" />
              Add Another Child
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}