import { motion } from 'motion/react';
import { Play, RotateCcw, CheckCircle2, Circle, Lightbulb, Eye, EyeOff } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { useTutorial, TOURS } from '../contexts/TutorialContext';
import { toast } from 'sonner';

export function TutorialSettings() {
  const {
    completedTours,
    showTooltips,
    toggleTooltips,
    startTour,
    resetTutorials,
    getTourProgress,
  } = useTutorial();

  const handleResetTutorials = () => {
    if (confirm('Are you sure you want to reset all tutorials? This will show all tooltips and tours again.')) {
      resetTutorials();
      toast.success('🔄 Tutorials Reset!', {
        description: 'All tutorials and tooltips will be shown again.',
      });
    }
  };

  const handleStartTour = (tourId: string) => {
    startTour(tourId);
    toast.success('🎯 Tour Started!', {
      description: 'Follow the highlighted steps to learn more!',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <Lightbulb className="w-20 h-20 mx-auto text-yellow-500" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Tutorials & Help
        </h1>
        <p className="text-xl text-gray-600 font-semibold">
          Learn how to use Q Rator Kids! 💡
        </p>
      </motion.div>

      {/* Tooltip Toggle */}
      <Card className="p-6 border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {showTooltips ? (
                <Eye className="w-6 h-6 text-blue-600" />
              ) : (
                <EyeOff className="w-6 h-6 text-gray-400" />
              )}
              <Label className="text-xl font-black text-gray-800">
                Show Help Tooltips
              </Label>
            </div>
            <p className="text-gray-600">
              Display helpful tips and hints throughout the app
            </p>
          </div>
          <Switch
            checked={showTooltips}
            onCheckedChange={toggleTooltips}
            className="data-[state=checked]:bg-blue-500"
          />
        </div>
      </Card>

      {/* Available Tours */}
      <div className="space-y-4">
        <h2 className="text-3xl font-black text-gray-800">
          Available Tours
        </h2>

        {Object.values(TOURS).map((tour, index) => {
          const progress = getTourProgress(tour.id);
          
          return (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 border-4 ${
                progress.completed 
                  ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50'
                  : 'border-purple-300 bg-white'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                    progress.completed
                      ? 'bg-gradient-to-br from-green-400 to-emerald-400'
                      : 'bg-gradient-to-br from-purple-400 to-pink-400'
                  }`}>
                    {progress.completed ? (
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black text-gray-800">
                        {tour.name}
                      </h3>
                      {progress.completed && (
                        <Badge className="bg-green-500 text-white font-black">
                          Completed ✓
                        </Badge>
                      )}
                      {tour.requiredFor && (
                        <Badge variant="outline" className="font-bold">
                          {tour.requiredFor === 'kids' ? '👶 Kids' : tour.requiredFor === 'parents' ? '👨‍👩‍👧 Parents' : '🌟 All'}
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">
                      {tour.steps.length} steps • Learn the basics
                    </p>

                    {/* Progress Bar */}
                    {!progress.completed && progress.progress > 0 && (
                      <div className="mb-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress.progress}%` }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round(progress.progress)}% complete
                        </p>
                      </div>
                    )}

                    {/* Steps Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.steps.map((step, i) => (
                        <div
                          key={step.id}
                          className="flex items-center gap-1"
                          title={step.title}
                        >
                          {i < Math.floor((progress.progress / 100) * tour.steps.length) ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleStartTour(tour.id)}
                      className={
                        progress.completed
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      }
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {progress.completed ? 'Replay Tour' : 'Start Tour'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <Card className="p-6 border-4 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          Quick Tips
        </h3>
        <div className="space-y-3">
          {[
            { emoji: '👆', tip: 'Look for the blue help buttons (?) throughout the app for instant help!' },
            { emoji: '🎯', tip: 'Follow the yellow highlights during tours - they show you exactly where to click!' },
            { emoji: '⏩', tip: 'You can skip any tour by clicking the X button in the top corner.' },
            { emoji: '🔄', tip: 'Replay any tour anytime by clicking the "Start Tour" button below!' },
            { emoji: '💡', tip: 'Turn off tooltips if you already know how everything works!' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-3 bg-white p-4 rounded-xl border-2 border-yellow-300"
            >
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <p className="text-gray-700 leading-relaxed">{item.tip}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Reset Button */}
      <Card className="p-6 border-4 border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="flex items-start gap-4">
          <RotateCcw className="w-6 h-6 text-red-600 shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-black text-gray-800 mb-2">
              Reset All Tutorials
            </h3>
            <p className="text-gray-600 mb-4">
              This will mark all tours as incomplete and show all tooltips again, as if you're using the app for the first time.
            </p>
            <Button
              onClick={handleResetTutorials}
              variant="outline"
              className="border-2 border-red-400 text-red-700 hover:bg-red-100"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Everything
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <Card className="p-6 border-4 border-purple-200 bg-white">
        <h3 className="text-2xl font-black text-gray-800 mb-4">
          Your Progress
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="text-4xl font-black text-green-600 mb-1">
              {completedTours.length}
            </div>
            <p className="text-sm text-gray-600 font-bold">
              Tours Completed
            </p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="text-4xl font-black text-blue-600 mb-1">
              {Object.keys(TOURS).length}
            </div>
            <p className="text-sm text-gray-600 font-bold">
              Total Tours
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
            <div className="text-4xl font-black text-purple-600 mb-1">
              {showTooltips ? 'ON' : 'OFF'}
            </div>
            <p className="text-sm text-gray-600 font-bold">
              Tooltips Status
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
