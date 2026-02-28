import { useState, useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ['Tab'], description: 'Navigate to next element', category: 'Navigation' },
  { keys: ['Shift', 'Tab'], description: 'Navigate to previous element', category: 'Navigation' },
  { keys: ['Enter'], description: 'Activate button or link', category: 'Navigation' },
  { keys: ['Space'], description: 'Activate button or checkbox', category: 'Navigation' },
  { keys: ['Escape'], description: 'Close modal or cancel action', category: 'Navigation' },
  
  // App Shortcuts
  { keys: ['Ctrl', 'K'], description: 'Open search', category: 'App' },
  { keys: ['Ctrl', '/'], description: 'Show keyboard shortcuts', category: 'App' },
  { keys: ['Ctrl', 'H'], description: 'Go to home', category: 'App' },
  { keys: ['Ctrl', 'L'], description: 'Go to lessons', category: 'App' },
  { keys: ['Ctrl', 'S'], description: 'Go to stories', category: 'App' },
  
  // Accessibility
  { keys: ['Alt', '+'], description: 'Increase font size', category: 'Accessibility' },
  { keys: ['Alt', '-'], description: 'Decrease font size', category: 'Accessibility' },
  { keys: ['Alt', 'C'], description: 'Toggle high contrast', category: 'Accessibility' },
  { keys: ['Alt', 'M'], description: 'Toggle reduced motion', category: 'Accessibility' },
  
  // Content
  { keys: ['Arrow Keys'], description: 'Navigate through carousel or list', category: 'Content' },
  { keys: ['Home'], description: 'Jump to start', category: 'Content' },
  { keys: ['End'], description: 'Jump to end', category: 'Content' },
];

export function KeyboardShortcutsGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, registerShortcut, unregisterShortcut } = useAccessibility();

  useEffect(() => {
    if (!preferences.keyboardNavigation) return;

    const openHandler = () => setIsOpen(true);
    registerShortcut('Ctrl+/', openHandler);

    return () => {
      unregisterShortcut('Ctrl+/');
    };
  }, [preferences.keyboardNavigation, registerShortcut, unregisterShortcut]);

  if (!preferences.keyboardNavigation) return null;

  const categories = Array.from(new Set(shortcuts.map(s => s.category)));

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-40 bg-purple-600 hover:bg-purple-700 text-white"
        size="lg"
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts (Ctrl + /)"
      >
        <Keyboard className="w-5 h-5" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Keyboard className="w-6 h-6 text-purple-600" />
              Keyboard Shortcuts
            </DialogTitle>
            <DialogDescription>
              Use these keyboard shortcuts to navigate Q Rator Kids quickly and efficiently
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {categories.map(category => {
              const categoryShortcuts = shortcuts.filter(s => s.category === category);
              
              return (
                <div key={category}>
                  <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
                    {category}
                  </h3>
                  
                  <div className="space-y-2">
                    {categoryShortcuts.map((shortcut, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <span className="text-gray-700">{shortcut.description}</span>
                        
                        <div className="flex items-center gap-1">
                          {shortcut.keys.map((key, keyIndex) => (
                            <span key={keyIndex} className="flex items-center gap-1">
                              <Badge
                                variant="secondary"
                                className="font-mono text-xs px-2 py-1 bg-white border-2 border-gray-300 text-gray-700"
                              >
                                {key}
                              </Badge>
                              {keyIndex < shortcut.keys.length - 1 && (
                                <span className="text-gray-400 font-bold">+</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Press <Badge className="mx-1 font-mono">Ctrl</Badge> + 
              <Badge className="mx-1 font-mono">/</Badge> anytime to open this guide
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
