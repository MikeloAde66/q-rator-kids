import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Star, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAuth } from '../contexts/AuthContext';
import { getAllCharacters } from '../data/characters';

export function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useOnboarding();
  const { isAuthenticated, addChildProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [childProfile, setChildProfile] = useState({
    name: '',
    ageGroup: '',
    favoriteCharacter: ''
  });
  const [parentInfo, setParentInfo] = useState({
    email: '',
    consent: false
  });

  const totalSteps = 5;
  const artBuddies = getAllCharacters();

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateChildProfile = (updates: Partial<typeof childProfile>) => {
    setChildProfile(prev => ({ ...prev, ...updates }));
  };

  const updateParentInfo = (updates: Partial<typeof parentInfo>) => {
    setParentInfo(prev => ({ ...prev, ...updates }));
  };

  const handleComplete = () => {
    completeOnboarding();
    
    // If user is authenticated, add their child profile to their account
    if (isAuthenticated && childProfile.name && childProfile.favoriteCharacter) {
      addChildProfile({
        name: childProfile.name,
        ageGroup: childProfile.ageGroup as '6-8' | '9-12',
        favoriteCharacter: childProfile.favoriteCharacter
      });
    }
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-3 rounded-full transition-all ${
                  index <= currentStep ? 'bg-purple-600 w-12' : 'bg-white/50 w-8'
                }`}
                animate={{ scale: index === currentStep ? 1.2 : 1 }}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-8"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Q Rator Kids
                </h1>
              </motion.div>

              <div className="space-y-4">
                <p className="text-3xl md:text-4xl font-bold text-gray-800">
                  🎨 Welcome to Art Fun! 🎨
                </p>
                <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
                  Let's learn to draw and color with our animal friends!
                </p>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-24 h-24 mx-auto text-yellow-500" />
              </motion.div>

              <Button
                size="lg"
                onClick={nextStep}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-3xl px-16 py-10 rounded-3xl shadow-2xl border-4 border-white font-black"
              >
                LET'S START! 🚀
              </Button>
            </motion.div>
          )}

          {/* Step 1: Age Selection */}
          {currentStep === 1 && (
            <motion.div
              key="age"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-8"
            >
              <Card className="p-8 md:p-12 bg-white border-4 border-purple-200 rounded-3xl shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-center mb-8 text-gray-800">
                  How old are you? 🎂
                </h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        updateChildProfile({ ageGroup: '6-8' });
                        nextStep();
                      }}
                      className={`w-full p-10 rounded-3xl border-4 transition-all ${
                        childProfile.ageGroup === '6-8'
                          ? 'bg-gradient-to-br from-blue-400 to-cyan-400 border-white shadow-2xl'
                          : 'bg-white border-blue-200 hover:border-blue-400'
                      }`}
                    >
                      <div className="text-6xl mb-4">🌟</div>
                      <div className="text-3xl font-black text-gray-800">6-8 Years</div>
                      <div className="text-lg text-gray-600 mt-2">Beginner Fun!</div>
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        updateChildProfile({ ageGroup: '9-12' });
                        nextStep();
                      }}
                      className={`w-full p-10 rounded-3xl border-4 transition-all ${
                        childProfile.ageGroup === '9-12'
                          ? 'bg-gradient-to-br from-purple-400 to-pink-400 border-white shadow-2xl'
                          : 'bg-white border-purple-200 hover:border-purple-400'
                      }`}
                    >
                      <div className="text-6xl mb-4">⭐</div>
                      <div className="text-3xl font-black text-gray-800">9-12 Years</div>
                      <div className="text-lg text-gray-600 mt-2">Advanced Artist!</div>
                    </button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Character Selection */}
          {currentStep === 2 && (
            <motion.div
              key="character"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-8"
            >
              <Card className="p-8 md:p-12 bg-white border-4 border-purple-200 rounded-3xl shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-center mb-4 text-gray-800">
                  Pick Your Art Buddy! 🎨
                </h2>
                <p className="text-xl text-center text-gray-600 mb-8">
                  Who do you want to learn with?
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {artBuddies.slice(0, 5).map((buddy) => (
                    <motion.div
                      key={buddy.id}
                      whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => {
                          updateChildProfile({ favoriteCharacter: buddy.id });
                        }}
                        className={`w-full p-4 md:p-6 rounded-3xl border-4 transition-all ${
                          childProfile.favoriteCharacter === buddy.id
                            ? 'bg-gradient-to-br from-yellow-300 to-orange-300 border-white shadow-2xl'
                            : 'bg-white border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="relative">
                          <div className="text-6xl md:text-7xl mb-3">
                            {buddy.emoji}
                          </div>
                          {childProfile.favoriteCharacter === buddy.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                            >
                              <Check className="w-6 h-6 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <div className="text-lg md:text-xl font-black text-gray-800">{buddy.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{buddy.role}</div>
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    size="lg"
                    onClick={nextStep}
                    disabled={!childProfile.favoriteCharacter}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-2xl px-12 py-8 rounded-3xl shadow-2xl border-4 border-white font-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    NEXT! <ArrowRight className="ml-2 w-7 h-7" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Child Name */}
          {currentStep === 3 && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-8"
            >
              <Card className="p-8 md:p-12 bg-white border-4 border-purple-200 rounded-3xl shadow-2xl max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-20 h-20 mx-auto text-pink-500 mb-4" />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                    What's your name? 😊
                  </h2>
                  <p className="text-xl text-gray-600">
                    We can't wait to meet you!
                  </p>
                </div>

                <div className="space-y-6">
                  <Input
                    type="text"
                    placeholder="Type your name here..."
                    value={childProfile.name}
                    onChange={(e) => updateChildProfile({ name: e.target.value })}
                    className="text-3xl p-8 rounded-2xl border-4 border-purple-200 focus:border-purple-500 text-center font-bold"
                    autoFocus
                  />

                  {childProfile.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <p className="text-2xl text-purple-600 font-bold">
                        ✨ Hi {childProfile.name}! Nice to meet you! ✨
                      </p>
                    </motion.div>
                  )}

                  <Button
                    size="lg"
                    onClick={nextStep}
                    disabled={!childProfile.name.trim()}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-2xl px-12 py-8 rounded-3xl shadow-2xl border-4 border-white font-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    NEXT! <ArrowRight className="ml-2 w-7 h-7" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Parent Setup */}
          {currentStep === 4 && (
            <motion.div
              key="parent"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-8"
            >
              <Card className="p-8 md:p-12 bg-white border-4 border-blue-200 rounded-3xl shadow-2xl max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <Star className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                  <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
                    For Parents 👋
                  </h2>
                  <p className="text-lg text-gray-600">
                    Just a few quick details to keep things safe and fun!
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-2">
                      Parent Email
                    </label>
                    <Input
                      type="email"
                      placeholder="parent@example.com"
                      value={parentInfo.email}
                      onChange={(e) => updateParentInfo({ email: e.target.value })}
                      className="text-xl p-6 rounded-2xl border-2 border-gray-300 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      We'll never share your email. Privacy is our priority.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={parentInfo.consent}
                        onChange={(e) => updateParentInfo({ consent: e.target.checked })}
                        className="mt-1 w-6 h-6 rounded border-2 border-blue-400 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-base text-gray-700 leading-relaxed">
                        I understand this app is for <strong>creative purposes only</strong>, not affiliated with any academic institutions. My child's data will <strong>never be shared</strong>. I consent to my child using Q Rator Kids.
                      </span>
                    </label>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleComplete}
                    disabled={!parentInfo.email.includes('@') || !parentInfo.consent}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-2xl px-12 py-8 rounded-3xl shadow-2xl border-4 border-white font-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    START THE FUN! 🎉
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
