import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'info';
}

interface ToastContextType {
  toast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, title, description, variant };
    
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className="pointer-events-auto"
            >
              <div className={`
                min-w-[300px] max-w-md p-4 rounded-2xl shadow-2xl border-4 
                ${t.variant === 'success' ? 'bg-green-50 border-green-300' : 
                  t.variant === 'error' ? 'bg-red-50 border-red-300' : 
                  t.variant === 'info' ? 'bg-blue-50 border-blue-300' : 
                  'bg-white border-purple-300'}
              `}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {t.variant === 'success' && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {t.variant === 'error' && <XCircle className="w-6 h-6 text-red-600" />}
                    {t.variant === 'info' && <Info className="w-6 h-6 text-blue-600" />}
                    {t.variant === 'default' && <Info className="w-6 h-6 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-lg ${
                      t.variant === 'success' ? 'text-green-800' : 
                      t.variant === 'error' ? 'text-red-800' : 
                      t.variant === 'info' ? 'text-blue-800' : 
                      'text-gray-800'
                    }`}>
                      {t.title}
                    </p>
                    {t.description && (
                      <p className="text-sm text-gray-600 mt-1">{t.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => dismiss(t.id)}
                    className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
