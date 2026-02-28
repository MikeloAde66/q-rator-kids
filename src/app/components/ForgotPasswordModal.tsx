import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowLeft, Send, Check, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose, onSwitchToLogin }: ForgotPasswordModalProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const result = await resetPassword(email);

    setIsLoading(false);

    if (result.success) {
      setSuccess(true);
      setMessage(result.message);
      console.log('🔐 PASSWORD RESET EMAIL (Demo):', email);
      console.log('In a real app, an email would be sent with a reset link.');
    } else {
      setError(result.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-4 border-orange-300">
        <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-center">
              Reset Password 🔑
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-orange-100 mt-2">
            We'll help you get back into your account!
          </p>
        </div>

        <div className="p-8 space-y-6">
          {success ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center space-y-4"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-black text-gray-800">Check Your Email! 📧</h3>
              <p className="text-gray-600">{message}</p>
              
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>Demo Note:</strong> In a real app, you would receive an email with a password reset link. For this demo, check your browser console.
                </p>
              </div>

              <Button
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                  onSwitchToLogin();
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg py-6 rounded-2xl shadow-lg font-black"
              >
                Back to Login
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-gray-700 text-center">
                Enter your email address and we'll send you instructions to reset your password.
              </p>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="text-lg font-bold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="parent@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 text-lg p-6 rounded-2xl border-2 border-gray-300 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-2 text-red-700"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white text-xl py-6 rounded-2xl shadow-lg font-black"
              >
                {isLoading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Reset Link
                  </>
                )}
              </Button>

              {/* Back to Login */}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="w-full text-gray-600 hover:text-gray-800 font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
