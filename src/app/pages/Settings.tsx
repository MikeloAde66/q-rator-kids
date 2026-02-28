import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings as SettingsIcon,
  Volume2,
  VolumeX,
  Music,
  Mic,
  Bell,
  Globe,
  Smartphone,
  Play,
  Lightbulb,
  PauseCircle,
  Wifi,
  Trash2,
  RotateCcw,
  Download,
  Upload,
  HelpCircle,
  Mail,
  ChevronDown,
  Check,
  Accessibility,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Link } from 'react-router';
import { useSettings, Language, languageLabels } from '../contexts/SettingsContext';
import { toast } from 'sonner';

export function Settings() {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    soundSettings,
    updateSoundSettings,
    notifications,
    updateNotifications,
    appSettings,
    updateAppSettings,
    clearCache,
    resetToDefaults,
    exportSettings,
    importSettings,
  } = useSettings();

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showClearCacheDialog, setShowClearCacheDialog] = useState(false);
  const [showClearAllDialog, setShowClearAllDialog] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleClearCache = () => {
    clearCache();
    setShowClearCacheDialog(false);
    toast({
      title: "🧹 Cache Cleared!",
      description: "All temporary data has been removed.",
    });
  };

  const handleResetToDefaults = () => {
    resetToDefaults();
    setShowResetDialog(false);
    toast({
      title: "🔄 Settings Reset!",
      description: "All settings have been restored to defaults.",
    });
  };

  const handleExportSettings = () => {
    const settingsData = exportSettings();
    const blob = new Blob([settingsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrator-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "📥 Settings Exported!",
      description: "Your settings have been downloaded.",
    });
  };

  const handleImportSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          importSettings(event.target.result);
          toast({
            title: "📤 Settings Imported!",
            description: "Your settings have been restored.",
          });
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const faqs = [
    {
      q: "How do I unlock all lessons?",
      a: "You can unlock all lessons by getting a Q Rator Kids subscription! Ask a parent or guardian to visit the Subscription page.",
    },
    {
      q: "Can I download my artwork?",
      a: "Yes! Click the Download button on any lesson, story, or assignment to save your masterpiece as a PNG, JPEG, or PDF.",
    },
    {
      q: "What's the difference between Beginner and Intermediate?",
      a: "Beginner (🖍️ Crayons) is for ages 6-8 with simple, fun lessons. Intermediate (✏️ Colored Pencils) is for ages 9-12 with more advanced skills!",
    },
    {
      q: "How do I change my profile picture?",
      a: "Go to the Account page and click on your avatar. You can choose from lots of fun animal friends!",
    },
    {
      q: "Are there new lessons every week?",
      a: "Yes! We add new lessons, stories, and assignments regularly. Turn on notifications to get alerts when new content is available!",
    },
    {
      q: "Can multiple kids use the same account?",
      a: "Absolutely! Parents can create multiple child profiles, each with their own progress tracking and preferences.",
    },
    {
      q: "What if I need help during a lesson?",
      a: "Each lesson has hints you can turn on! You can also ask your teacher character for help by clicking the help button.",
    },
  ];

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
          <SettingsIcon className="w-20 h-20 mx-auto text-purple-500" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-xl text-gray-600 font-semibold">
          Make Q Rator Kids perfect for you! ⚙️
        </p>
      </motion.div>

      {/* Language Settings */}
      <SettingsSection
        title="🌍 Language"
        description="Choose your language"
        icon={<Globe className="w-6 h-6" />}
        expanded={expandedSection === 'language'}
        onToggle={() => toggleSection('language')}
      >
        <div className="space-y-4">
          <Label className="text-lg font-black text-gray-800">Select Language</Label>
          <Select value={language} onValueChange={(val: Language) => setLanguage(val)}>
            <SelectTrigger className="border-4 border-purple-200 rounded-xl font-bold text-lg h-14">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(languageLabels) as Language[]).map((lang) => (
                <SelectItem key={lang} value={lang} className="text-lg font-bold">
                  {languageLabels[lang].flag} {languageLabels[lang].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600">
            💡 Changing the language will update all text in the app!
          </p>
        </div>
      </SettingsSection>

      {/* Sound Settings */}
      <SettingsSection
        title="🔊 Sound & Volume"
        description="Control your audio experience"
        icon={soundSettings.soundEffects ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        expanded={expandedSection === 'sound'}
        onToggle={() => toggleSection('sound')}
      >
        <div className="space-y-6">
          {/* Master Volume */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-black text-gray-800">Master Volume</Label>
              <Badge className="bg-purple-100 text-purple-700 font-black text-lg px-3 py-1">
                {soundSettings.masterVolume}%
              </Badge>
            </div>
            <Slider
              value={[soundSettings.masterVolume]}
              onValueChange={(val) => updateSoundSettings({ masterVolume: val[0] })}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
            <div className="flex items-center gap-3">
              <Music className="w-6 h-6 text-blue-500" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Sound Effects</Label>
                <p className="text-sm text-gray-600">Fun sounds and celebrations</p>
              </div>
            </div>
            <Switch
              checked={soundSettings.soundEffects}
              onCheckedChange={(checked) => updateSoundSettings({ soundEffects: checked })}
            />
          </div>

          {/* Background Music */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-center gap-3">
              <Music className="w-6 h-6 text-purple-500" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Background Music</Label>
                <p className="text-sm text-gray-600">Relaxing tunes while you draw</p>
              </div>
            </div>
            <Switch
              checked={soundSettings.backgroundMusic}
              onCheckedChange={(checked) => updateSoundSettings({ backgroundMusic: checked })}
            />
          </div>

          {/* Voice Overs */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
            <div className="flex items-center gap-3">
              <Mic className="w-6 h-6 text-green-500" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Voice Instructions</Label>
                <p className="text-sm text-gray-600">Teacher voices and guidance</p>
              </div>
            </div>
            <Switch
              checked={soundSettings.voiceOvers}
              onCheckedChange={(checked) => updateSoundSettings({ voiceOvers: checked })}
            />
          </div>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        title="🔔 Notifications"
        description="Choose what alerts you want"
        icon={<Bell className="w-6 h-6" />}
        expanded={expandedSection === 'notifications'}
        onToggle={() => toggleSection('notifications')}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-yellow-600" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Lesson Reminders</Label>
                <p className="text-sm text-gray-600">Daily reminders to practice</p>
              </div>
            </div>
            <Switch
              checked={notifications.lessonReminders}
              onCheckedChange={(checked) => updateNotifications({ lessonReminders: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-pink-600" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">New Content Alerts</Label>
                <p className="text-sm text-gray-600">When new lessons are available</p>
              </div>
            </div>
            <Switch
              checked={notifications.newContent}
              onCheckedChange={(checked) => updateNotifications({ newContent: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-600" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Achievement Celebrations</Label>
                <p className="text-sm text-gray-600">When you earn new badges!</p>
              </div>
            </div>
            <Switch
              checked={notifications.achievements}
              onCheckedChange={(checked) => updateNotifications({ achievements: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-purple-600" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Parent Reports</Label>
                <p className="text-sm text-gray-600">Weekly progress summaries</p>
              </div>
            </div>
            <Switch
              checked={notifications.parentalReports}
              onCheckedChange={(checked) => updateNotifications({ parentalReports: checked })}
            />
          </div>
        </div>
      </SettingsSection>

      {/* App Settings */}
      <SettingsSection
        title="📱 App Preferences"
        description="Customize your experience"
        icon={<Smartphone className="w-6 h-6" />}
        expanded={expandedSection === 'app'}
        onToggle={() => toggleSection('app')}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-green-600" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Auto-Play Next Lesson</Label>
                <p className="text-sm text-gray-600">Automatically start the next lesson</p>
              </div>
            </div>
            <Switch
              checked={appSettings.autoPlayNextLesson}
              onCheckedChange={(checked) => updateAppSettings({ autoPlayNextLesson: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Show Hints</Label>
                <p className="text-sm text-gray-600">Display helpful tips during lessons</p>
              </div>
            </div>
            <Switch
              checked={appSettings.showHints}
              onCheckedChange={(checked) => updateAppSettings({ showHints: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border-2 border-blue-200">
            <div className="flex items-center gap-3">
              <PauseCircle className="w-6 h-6 text-blue-600" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Pause on Background</Label>
                <p className="text-sm text-gray-600">Pause when you switch apps</p>
              </div>
            </div>
            <Switch
              checked={appSettings.pauseOnLosesFocus}
              onCheckedChange={(checked) => updateAppSettings({ pauseOnLosesFocus: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
            <div className="flex items-center gap-3">
              <Wifi className="w-6 h-6 text-orange-600" />
              <div>
                <Label className="text-lg font-black text-gray-800 block">Low Data Mode</Label>
                <p className="text-sm text-gray-600">Use less internet data</p>
              </div>
            </div>
            <Switch
              checked={appSettings.lowDataMode}
              onCheckedChange={(checked) => updateAppSettings({ lowDataMode: checked })}
            />
          </div>
        </div>
      </SettingsSection>

      {/* Data Management */}
      <Card className="p-6 border-4 border-red-200 bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl">
        <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-red-500" />
          Data Management
        </h3>
        <div className="space-y-3">
          <Button
            onClick={() => setShowClearCacheDialog(true)}
            variant="outline"
            className="w-full border-2 border-orange-300 hover:bg-orange-100 font-bold text-lg h-12 rounded-xl"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Clear Cache
          </Button>
          <Button
            onClick={() => setShowResetDialog(true)}
            variant="outline"
            className="w-full border-2 border-red-300 hover:bg-red-100 font-bold text-lg h-12 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset to Defaults
          </Button>
        </div>
      </Card>

      {/* Import/Export */}
      <Card className="p-6 border-4 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl">
        <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <Download className="w-6 h-6 text-blue-500" />
          Backup & Restore
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            onClick={handleExportSettings}
            variant="outline"
            className="border-2 border-blue-300 hover:bg-blue-100 font-bold text-lg h-12 rounded-xl"
          >
            <Download className="w-5 h-5 mr-2" />
            Export Settings
          </Button>
          <Button
            onClick={handleImportSettings}
            variant="outline"
            className="border-2 border-cyan-300 hover:bg-cyan-100 font-bold text-lg h-12 rounded-xl"
          >
            <Upload className="w-5 h-5 mr-2" />
            Import Settings
          </Button>
        </div>
      </Card>

      {/* Help & Support */}
      <Card className="p-6 border-4 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl">
        <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-purple-500" />
          Help & Support
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link to="/accessibility">
            <Button
              variant="outline"
              className="w-full border-2 border-blue-300 hover:bg-blue-100 font-bold text-lg h-12 rounded-xl"
            >
              <Accessibility className="w-5 h-5 mr-2" />
              Accessibility
            </Button>
          </Link>
          <Link to="/tutorial-settings">
            <Button
              variant="outline"
              className="w-full border-2 border-yellow-300 hover:bg-yellow-100 font-bold text-lg h-12 rounded-xl"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Tutorials
            </Button>
          </Link>
          <Button
            onClick={() => setShowFAQ(true)}
            variant="outline"
            className="border-2 border-purple-300 hover:bg-purple-100 font-bold text-lg h-12 rounded-xl"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            FAQ
          </Button>
        </div>
        <div className="mt-3">
          <Button
            onClick={() => setShowContactDialog(true)}
            variant="outline"
            className="w-full border-2 border-pink-300 hover:bg-pink-100 font-bold text-lg h-12 rounded-xl"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Support
          </Button>
        </div>
      </Card>

      {/* Dialogs */}
      <ResetDialog open={showResetDialog} onOpenChange={setShowResetDialog} onConfirm={handleResetToDefaults} />
      <ClearCacheDialog open={showClearCacheDialog} onOpenChange={setShowClearCacheDialog} onConfirm={handleClearCache} />
      <FAQDialog open={showFAQ} onOpenChange={setShowFAQ} faqs={faqs} />
      <ContactDialog open={showContactDialog} onOpenChange={setShowContactDialog} />
    </div>
  );
}

// Collapsible Settings Section
function SettingsSection({
  title,
  description,
  icon,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden border-4 border-purple-200 rounded-3xl">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-purple-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
            {icon}
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-black text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 font-semibold">{description}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t-4 border-purple-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// Reset Confirmation Dialog
function ResetDialog({ open, onOpenChange, onConfirm }: { open: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-red-300 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <RotateCcw className="w-8 h-8 text-red-500" />
            Reset All Settings?
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            This will reset all your settings to their default values. Your lessons and progress will not be affected.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-2 border-gray-300 font-bold text-lg h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-lg h-12 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Clear Cache Confirmation Dialog
function ClearCacheDialog({ open, onOpenChange, onConfirm }: { open: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-orange-300 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <Trash2 className="w-8 h-8 text-orange-500" />
            Clear Cache?
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            This will remove temporary files to free up space. Your settings, lessons, and progress will be kept safe!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-2 border-gray-300 font-bold text-lg h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold text-lg h-12 rounded-xl"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Clear Cache
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// FAQ Dialog
function FAQDialog({ open, onOpenChange, faqs }: { open: boolean; onOpenChange: (open: boolean) => void; faqs: { q: string; a: string }[] }) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-purple-300 rounded-3xl max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <HelpCircle className="w-8 h-8 text-purple-500" />
            Frequently Asked Questions
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-2 border-purple-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-purple-50 transition-colors"
              >
                <span className="font-black text-lg text-gray-800">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    expandedFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-gray-600 border-t-2 border-purple-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Contact Support Dialog
function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    // In production, this would send to support
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onOpenChange(false);
      setMessage('');
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-pink-300 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-gray-800 flex items-center gap-2">
            <Mail className="w-8 h-8 text-pink-500" />
            Contact Support
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Need help? Send us a message and we'll get back to you soon!
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <p className="text-2xl font-black text-gray-800">Message Sent! 🎉</p>
            <p className="text-gray-600">We'll reply soon!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you need help with..."
                className="w-full h-32 p-4 border-4 border-pink-200 rounded-xl font-bold text-lg resize-none focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-100"
              />
              <p className="text-sm text-gray-600">
                📧 You can also email us at: <strong>support@qratorkids.com</strong>
              </p>
            </div>
            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-2 border-gray-300 font-bold text-lg h-12 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-lg h-12 rounded-xl disabled:opacity-50"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}