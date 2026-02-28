import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0;
  const isFormValid = 
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.includes('@') &&
    formData.password.length >= 6 &&
    passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!passwordsMatch) {
      setError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    const result = await register(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );

    setIsLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setSuccess(false);
      }, 1500);
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-4 border-blue-300 max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-center">
              Create Parent Account 🎨
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-blue-100 mt-2">
            Join Q Rator Kids and start your child's creative journey!
          </p>
        </div>

        <div className="p-8 space-y-6">
          {success ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-2xl font-black text-gray-800">Account Created! 🎉</h3>
              <p className="text-gray-600 mt-2">Redirecting you...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="register-firstName" className="text-lg font-bold text-gray-700">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="register-firstName"
                    type="text"
                    placeholder="Parent's first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="pl-12 text-lg p-6 rounded-2xl border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="register-lastName" className="text-lg font-bold text-gray-700">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="register-lastName"
                    type="text"
                    placeholder="Parent's last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="pl-12 text-lg p-6 rounded-2xl border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-lg font-bold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="parent@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 text-lg p-6 rounded-2xl border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-lg font-bold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 pr-12 text-lg p-6 rounded-2xl border-2 border-gray-300 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password.length > 0 && formData.password.length < 6 && (
                  <p className="text-sm text-orange-600">Password must be at least 6 characters</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="register-confirmPassword" className="text-lg font-bold text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="register-confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`pl-12 pr-12 text-lg p-6 rounded-2xl border-2 ${
                      formData.confirmPassword.length > 0
                        ? passwordsMatch
                          ? 'border-green-500 focus:border-green-500'
                          : 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword.length > 0 && (
                  passwordsMatch ? (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Passwords match!
                    </p>
                  ) : (
                    <p className="text-sm text-red-600">Passwords do not match</p>
                  )
                )}
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
                disabled={isLoading || !isFormValid}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xl py-6 rounded-2xl shadow-lg font-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  'Creating Account...'
                ) : (
                  <>
                    Create Account! 🎉
                  </>
                )}
              </Button>

              {/* Privacy Notice */}
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  By creating an account, you agree that Q Rator Kids is for creative purposes only. 
                  We will never share your information. Your privacy is our priority. 🔒
                </p>
              </div>
            </form>
          )}

          {/* Switch to Login */}
          {!success && (
            <div className="text-center pt-4 border-t-2 border-gray-200">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-blue-600 hover:text-blue-700 font-black"
                >
                  Sign in here!
                </button>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
