import { motion } from 'motion/react';
import {
  Eye,
  Type,
  Zap,
  Sparkles,
  Keyboard,
  Volume2,
  Settings,
  RotateCcw,
  Check,
  ChevronRight,
  Accessibility as AccessibilityIcon,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  useAccessibility,
  fontScaleLabels,
  contrastModeLabels,
  colorBlindModeLabels,
  FontScale,
  ContrastMode,
  ColorBlindMode,
} from '../contexts/AccessibilityContext';
import { toast } from 'sonner';

export function AccessibilitySettings() {
  const {
    preferences,
    updatePreference,
    resetToDefaults,
    applyPreset,
    announce,
  } = useAccessibility();

  const handlePresetApply = (preset: 'default' | 'visual-impairment' | 'motor-impairment' | 'cognitive' | 'screen-reader') => {
    applyPreset(preset);
    toast.success(`Applied ${preset.replace('-', ' ')} preset!`);
  };

  const handleReset = () => {
    resetToDefaults();
    announce('Accessibility settings reset to defaults', 'assertive');
    toast.success('Settings reset to defaults');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-2xl">
                <AccessibilityIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-800">
                  Accessibility Settings
                </h1>
                <p className="text-gray-600 mt-1">
                  Customize your experience for better accessibility
                </p>
              </div>
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </Button>
          </div>

          {/* Quick Presets */}
          <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Quick Presets
            </h2>
            <p className="text-gray-600 mb-4">
              Apply preset configurations designed for specific accessibility needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  id: 'visual-impairment',
                  name: 'Visual Impairment',
                  description: 'Large text, high contrast, screen reader support',
                  icon: Eye,
                  color: 'blue',
                },
                {
                  id: 'motor-impairment',
                  name: 'Motor Impairment',
                  description: 'Larger targets, keyboard navigation, reduced motion',
                  icon: Keyboard,
                  color: 'green',
                },
                {
                  id: 'cognitive',
                  name: 'Cognitive Support',
                  description: 'Simplified UI, clear text, no animations',
                  icon: Zap,
                  color: 'orange',
                },
                {
                  id: 'screen-reader',
                  name: 'Screen Reader',
                  description: 'Optimized for screen reader users',
                  icon: Volume2,
                  color: 'purple',
                },
              ].map(preset => {
                const Icon = preset.icon;
                return (
                  <Button
                    key={preset.id}
                    onClick={() => handlePresetApply(preset.id as any)}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-md transition-all"
                  >
                    <div className={`bg-${preset.color}-100 p-2 rounded-lg`}>
                      <Icon className={`w-5 h-5 text-${preset.color}-600`} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-800">{preset.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Detailed Settings */}
        <Tabs defaultValue="visual" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white p-2 rounded-xl shadow-md">
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Text & Fonts
            </TabsTrigger>
            <TabsTrigger value="motion" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Motion
            </TabsTrigger>
            <TabsTrigger value="interaction" className="flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              Interaction
            </TabsTrigger>
          </TabsList>

          {/* Visual Settings */}
          <TabsContent value="visual">
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Visual Settings</h2>
              
              <div className="space-y-6">
                {/* Contrast Mode */}
                <div>
                  <Label className="text-base font-bold text-gray-700 mb-3 block">
                    Contrast Mode
                  </Label>
                  <Select
                    value={preferences.contrastMode}
                    onValueChange={(value) => updatePreference('contrastMode', value as ContrastMode)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(contrastModeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-2">
                    Adjust the contrast ratio for better visibility
                  </p>
                </div>

                {/* Color Blind Mode */}
                <div>
                  <Label className="text-base font-bold text-gray-700 mb-3 block">
                    Color Blind Mode
                  </Label>
                  <Select
                    value={preferences.colorBlindMode}
                    onValueChange={(value) => updatePreference('colorBlindMode', value as ColorBlindMode)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(colorBlindModeLabels).map(([value, info]) => (
                        <SelectItem key={value} value={value}>
                          <div>
                            <div>{info.name}</div>
                            <div className="text-xs text-gray-500">{info.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-2">
                    Adjust colors for color blindness
                  </p>
                </div>

                {/* Grayscale Mode */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="grayscale" className="text-base font-bold text-gray-700">
                      Grayscale Mode
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Remove all colors from the interface
                    </p>
                  </div>
                  <Switch
                    id="grayscale"
                    checked={preferences.grayscaleMode}
                    onCheckedChange={(checked) => updatePreference('grayscaleMode', checked)}
                  />
                </div>

                {/* Show Focus Outlines */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="focus-outlines" className="text-base font-bold text-gray-700">
                      Show Focus Outlines
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Display visible focus indicators for keyboard navigation
                    </p>
                  </div>
                  <Switch
                    id="focus-outlines"
                    checked={preferences.showFocusOutlines}
                    onCheckedChange={(checked) => updatePreference('showFocusOutlines', checked)}
                  />
                </div>

                {/* Underline Links */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="underline-links" className="text-base font-bold text-gray-700">
                      Underline Links
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Always underline clickable links for better visibility
                    </p>
                  </div>
                  <Switch
                    id="underline-links"
                    checked={preferences.underlinkLinks}
                    onCheckedChange={(checked) => updatePreference('underlinkLinks', checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Text & Fonts Settings */}
          <TabsContent value="text">
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Text & Font Settings</h2>
              
              <div className="space-y-6">
                {/* Font Scale */}
                <div>
                  <Label className="text-base font-bold text-gray-700 mb-3 block">
                    Font Size
                  </Label>
                  <Select
                    value={preferences.fontScale}
                    onValueChange={(value) => updatePreference('fontScale', value as FontScale)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(fontScaleLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-2">
                    Adjust the base font size throughout the app
                  </p>
                </div>

                {/* Line Height */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-bold text-gray-700">
                      Line Height
                    </Label>
                    <Badge variant="secondary">{preferences.lineHeight.toFixed(1)}</Badge>
                  </div>
                  <Slider
                    value={[preferences.lineHeight]}
                    onValueChange={([value]) => updatePreference('lineHeight', value)}
                    min={1.0}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Increase spacing between lines of text
                  </p>
                </div>

                {/* Letter Spacing */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-bold text-gray-700">
                      Letter Spacing
                    </Label>
                    <Badge variant="secondary">{preferences.letterSpacing.toFixed(2)}em</Badge>
                  </div>
                  <Slider
                    value={[preferences.letterSpacing]}
                    onValueChange={([value]) => updatePreference('letterSpacing', value)}
                    min={0}
                    max={0.2}
                    step={0.01}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Increase spacing between letters
                  </p>
                </div>

                {/* Dyslexic Font */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="dyslexic-font" className="text-base font-bold text-gray-700">
                      Dyslexic-Friendly Font
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Use OpenDyslexic font designed for better readability
                    </p>
                  </div>
                  <Switch
                    id="dyslexic-font"
                    checked={preferences.dyslexicFont}
                    onCheckedChange={(checked) => updatePreference('dyslexicFont', checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Motion Settings */}
          <TabsContent value="motion">
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Motion & Animation Settings</h2>
              
              <div className="space-y-6">
                {/* Disable Animations */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="disable-animations" className="text-base font-bold text-gray-700">
                      Disable Animations
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Turn off all animations and transitions
                    </p>
                  </div>
                  <Switch
                    id="disable-animations"
                    checked={preferences.disableAnimations}
                    onCheckedChange={(checked) => updatePreference('disableAnimations', checked)}
                  />
                </div>

                {/* Slow Animations */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="slow-animations" className="text-base font-bold text-gray-700">
                      Slow Animations
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Make animations play at 50% speed
                    </p>
                  </div>
                  <Switch
                    id="slow-animations"
                    checked={preferences.slowAnimations}
                    onCheckedChange={(checked) => updatePreference('slowAnimations', checked)}
                    disabled={preferences.disableAnimations}
                  />
                </div>

                {/* Pause Auto-Play */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="pause-autoplay" className="text-base font-bold text-gray-700">
                      Pause Auto-Play
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Don't automatically play videos or carousels
                    </p>
                  </div>
                  <Switch
                    id="pause-autoplay"
                    checked={preferences.pauseAutoPlay}
                    onCheckedChange={(checked) => updatePreference('pauseAutoPlay', checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Interaction Settings */}
          <TabsContent value="interaction">
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Interaction Settings</h2>
              
              <div className="space-y-6">
                {/* Keyboard Navigation */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="keyboard-nav" className="text-base font-bold text-gray-700">
                      Enhanced Keyboard Navigation
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Enable keyboard shortcuts and navigation aids
                    </p>
                  </div>
                  <Switch
                    id="keyboard-nav"
                    checked={preferences.keyboardNavigation}
                    onCheckedChange={(checked) => updatePreference('keyboardNavigation', checked)}
                  />
                </div>

                {/* Larger Click Targets */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="large-targets" className="text-base font-bold text-gray-700">
                      Larger Click Targets
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Increase the size of buttons and interactive elements
                    </p>
                  </div>
                  <Switch
                    id="large-targets"
                    checked={preferences.largerClickTargets}
                    onCheckedChange={(checked) => updatePreference('largerClickTargets', checked)}
                  />
                </div>

                {/* Screen Reader Optimized */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="screen-reader" className="text-base font-bold text-gray-700">
                      Screen Reader Optimized
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Optimize interface for screen reader users
                    </p>
                  </div>
                  <Switch
                    id="screen-reader"
                    checked={preferences.screenReaderOptimized}
                    onCheckedChange={(checked) => updatePreference('screenReaderOptimized', checked)}
                  />
                </div>

                {/* Verbose Descriptions */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="verbose" className="text-base font-bold text-gray-700">
                      Verbose Descriptions
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Provide detailed descriptions for screen readers
                    </p>
                  </div>
                  <Switch
                    id="verbose"
                    checked={preferences.verboseDescriptions}
                    onCheckedChange={(checked) => updatePreference('verboseDescriptions', checked)}
                  />
                </div>

                {/* Announce Changes */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="announce" className="text-base font-bold text-gray-700">
                      Announce Changes
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Announce page changes and updates to screen readers
                    </p>
                  </div>
                  <Switch
                    id="announce"
                    checked={preferences.announceChanges}
                    onCheckedChange={(checked) => updatePreference('announceChanges', checked)}
                  />
                </div>

                {/* Simplified UI */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="simplified" className="text-base font-bold text-gray-700">
                      Simplified Interface
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Reduce visual complexity for easier navigation
                    </p>
                  </div>
                  <Switch
                    id="simplified"
                    checked={preferences.simplifiedUI}
                    onCheckedChange={(checked) => updatePreference('simplifiedUI', checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg mt-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-700 mb-3">
                If you're having trouble with accessibility features, try one of our quick presets above.
                They're designed by accessibility experts to help with specific needs.
              </p>
              <p className="text-sm text-gray-600">
                For more information about accessibility features, visit our help center or contact support.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
