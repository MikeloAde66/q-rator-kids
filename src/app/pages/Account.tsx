import { useState } from "react";
import { motion } from "motion/react";
import { User, Mail, Check, Shield, Globe, AlertCircle, RotateCcw } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { useOnboarding } from "../contexts/OnboardingContext";
import { useNavigate } from "react-router";

export function Account() {
  const navigate = useNavigate();
  const { childProfile, resetOnboarding } = useOnboarding();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isRealPerson: false,
    parentConsent: false,
    language: "english"
  });

  const languages = [
    { value: "english", label: "🇺🇸 English" },
    { value: "spanish", label: "🇪🇸 Español (Spanish)" },
    { value: "french", label: "🇫🇷 Français (French)" },
    { value: "german", label: "🇩🇪 Deutsch (German)" },
    { value: "mandarin", label: "🇨🇳 中文 (Mandarin)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle account creation
    console.log("Account data:", formData);
  };

  const isFormValid = 
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.isRealPerson &&
    formData.parentConsent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-yellow-100 to-orange-100 -mx-6 -mt-6 px-6 pt-6 pb-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Create Your Account! 🎨
          </h1>
          <p className="text-xl text-gray-700 font-bold">
            Parents: Please set up your child's account
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 md:p-12 bg-white border-8 border-purple-300 rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xl font-black text-gray-800">
                  First Name 🌟
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="text-lg p-6 rounded-2xl border-4 border-purple-200 focus:border-purple-400"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xl font-black text-gray-800">
                  Last Name ✨
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="text-lg p-6 rounded-2xl border-4 border-purple-200 focus:border-purple-400"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xl font-black text-gray-800">
                  Email Address 📧
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-lg p-6 rounded-2xl border-4 border-purple-200 focus:border-purple-400"
                  required
                />
                <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-2xl border-2 border-blue-200 mt-2">
                  <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-blue-800 font-bold">
                    You can log in once your email is verified!
                  </p>
                </div>
              </div>

              {/* Language Selection */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-xl font-black text-gray-800 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-purple-600" />
                  Choose Your Language 🌍
                </Label>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full text-lg p-6 rounded-2xl border-4 border-purple-200 focus:border-purple-400 bg-white font-bold cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Are You a Real Person Checkbox */}
              <div className="space-y-4 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-3xl border-4 border-green-200">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="realPerson"
                    checked={formData.isRealPerson}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, isRealPerson: checked as boolean })
                    }
                    className="mt-1 w-6 h-6 border-4 border-green-400 data-[state=checked]:bg-green-500"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor="realPerson" 
                      className="text-lg font-black text-gray-800 cursor-pointer flex items-center gap-2"
                    >
                      <Shield className="w-5 h-5 text-green-600" />
                      Are You a Real Person? 🤖
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Check this box to confirm you're human!
                    </p>
                  </div>
                </div>
              </div>

              {/* Parent Consent - REQUIRED */}
              <div className="space-y-4 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-3xl border-4 border-orange-300">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="parentConsent"
                    checked={formData.parentConsent}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, parentConsent: checked as boolean })
                    }
                    className="mt-1 w-6 h-6 border-4 border-orange-400 data-[state=checked]:bg-orange-500"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor="parentConsent" 
                      className="text-lg font-black text-gray-800 cursor-pointer flex items-center gap-2"
                    >
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      Parent Consent Required ⚠️
                    </Label>
                    <p className="text-sm text-gray-700 mt-1 font-bold">
                      I am a parent/guardian and I give permission for my child to use Q Rator Kids.
                      I understand that I am responsible for setting up and managing this account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: isFormValid ? 1.05 : 1 }}
                whileTap={{ scale: isFormValid ? 0.95 : 1 }}
              >
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  size="lg"
                  className={`w-full text-2xl py-8 rounded-3xl shadow-2xl border-4 border-white font-black ${
                    isFormValid
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isFormValid ? (
                    <>
                      <Check className="w-6 h-6 mr-2" />
                      Create Account! 🎉
                    </>
                  ) : (
                    "Fill Out All Fields Above ⬆️"
                  )}
                </Button>
              </motion.div>

              {/* Info Message */}
              <div className="bg-purple-50 rounded-2xl p-6 border-4 border-purple-200 text-center">
                <p className="text-gray-700 font-bold">
                  🔒 Your information is safe and secure!
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  We never share your data with anyone. Ever. 💜
                </p>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Developer Testing Section */}
        {childProfile.name && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 border-4 border-gray-300 rounded-2xl">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                  👋 Welcome, {childProfile.name}!
                </h3>
                <p className="text-gray-600">
                  Age Group: <strong>{childProfile.ageGroup} years old</strong>
                </p>
                <Button
                  onClick={() => {
                    resetOnboarding();
                    navigate('/onboarding');
                  }}
                  variant="outline"
                  className="flex items-center gap-2 border-2 border-gray-400 hover:border-gray-600"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Onboarding (Test Feature)
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}