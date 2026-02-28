import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTutorial } from '../contexts/TutorialContext';
import { useOnboarding } from '../contexts/OnboardingContext';

export function WelcomeModal() {
  const { hasSeenWelcome, markWelcomeSeen, startTour } = useTutorial();
  const { childProfile } = useOnboarding();

  const handleStartTour = () => {
    markWelcomeSeen();
    startTour('firstTime');
  };

  const handleSkip = () => {
    markWelcomeSeen();
  };

  if (hasSeenWelcome) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10002] flex items-center justify-center p-4"
        onClick={handleSkip}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 right-12 w-12 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-3 bg-white/30 hover:bg-white/50 rounded-full transition-all z-10 border-2 border-white/50 hover:scale-110 active:scale-95"
              aria-label="Close welcome screen"
              title="Close"
            >
              <X className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={3} />
            </button>

            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center mb-4"
            >
              <div className="text-8xl mb-4">🎨</div>
            </motion.div>

            <h1 className="text-5xl font-black text-center mb-3">
              Welcome to Q Rator Kids!
            </h1>
            <p className="text-2xl text-center font-bold opacity-95">
              Hi {childProfile.name || 'there'}! Let's make art together! 🖍️
            </p>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 border-4 border-orange-300 rounded-2xl p-6 text-center"
                >
                  <div className="text-5xl mb-3">🦁</div>
                  <h3 className="text-xl font-black text-gray-800 mb-2">Fun Teachers!</h3>
                  <p className="text-gray-700">5 animal friends teach you art!</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-300 rounded-2xl p-6 text-center"
                >
                  <div className="text-5xl mb-3">📚</div>
                  <h3 className="text-xl font-black text-gray-800 mb-2">Easy Lessons!</h3>
                  <p className="text-gray-700">Follow along step-by-step!</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 border-4 border-purple-300 rounded-2xl p-6 text-center"
                >
                  <div className="text-5xl mb-3">✨</div>
                  <h3 className="text-xl font-black text-gray-800 mb-2">Cool Stories!</h3>
                  <p className="text-gray-700">Watch fun art adventures!</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 border-4 border-green-300 rounded-2xl p-6 text-center"
                >
                  <div className="text-5xl mb-3">🌟</div>
                  <h3 className="text-xl font-black text-gray-800 mb-2">Earn Stars!</h3>
                  <p className="text-gray-700">Get rewards for learning!</p>
                </motion.div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-300 rounded-2xl p-6 text-center">
                <p className="text-2xl font-black text-gray-800 mb-4">
                  Want a quick tour? I'll show you around! 👋
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  It only takes 30 seconds and you'll learn where everything is!
                </p>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleStartTour}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-10 py-6 rounded-2xl shadow-xl font-black"
                  >
                    <Sparkles className="w-6 h-6 mr-2" />
                    Yes! Show Me Around!
                  </Button>

                  <Button
                    onClick={handleSkip}
                    size="lg"
                    variant="outline"
                    className="border-4 border-gray-300 text-gray-700 text-xl px-10 py-6 rounded-2xl font-black hover:bg-gray-100"
                  >
                    Skip for Now
                  </Button>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500">
                💡 You can always start the tour again from Settings!
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}