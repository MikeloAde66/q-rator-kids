import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Check, Sparkles, Crown, Gift, Globe, BookOpen, Award, Mail, Download, Star, Calendar, QrCode } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useSubscription } from "../contexts/SubscriptionContext";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export function Subscription() {
  const navigate = useNavigate();
  const { activateFreeTier, activateTrialTier, tier } = useSubscription();
  const [showGiftCard, setShowGiftCard] = useState(false);

  const handleStartFree = () => {
    activateFreeTier();
    navigate('/lessons');
  };

  const handleClaimGiftCard = () => {
    activateTrialTier();
    setShowGiftCard(true);
  };

  const freePlan = {
    name: "Free",
    price: "$0",
    description: "Try Q Rator Kids FREE!",
    color: "from-blue-400 to-cyan-400",
    features: [
      { icon: BookOpen, text: "3 Fun Lessons" },
      { icon: Sparkles, text: "2 Cool Stories" },
      { icon: Download, text: "3 Assignments" },
      { icon: Star, text: "2 Animal Friends" },
      { icon: Download, text: "1 Coloring Book" },
      { icon: Download, text: "1 Character Coloring Sheet" },
    ]
  };

  const standardPlan = {
    name: "Standard",
    price: "$9.95",
    period: "per month",
    description: "Get EVERYTHING! 🎉",
    color: "from-pink-500 via-purple-500 to-blue-500",
    features: [
      { icon: Crown, text: "ALL Lessons, Stories & Assignments!" },
      { icon: Star, text: "ALL 5 Animal Friends!" },
      { icon: Award, text: "Completion Certificates" },
      { icon: Gift, text: "Gift Cards" },
      { icon: Mail, text: "Free Newsletters & Updates" },
      { icon: Sparkles, text: "Extended Videos" },
      { icon: Globe, text: "Virtual Art Gallery Tours!" },
      { icon: Globe, text: "Visit The Met, Rome, France & Smithsonian!" },
      { icon: Download, text: "Unlimited Downloads" },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-yellow-100 to-orange-100 -mx-6 -mt-6 px-6 pt-6 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Choose Your Adventure! 🎨
        </h1>
        <p className="text-2xl md:text-3xl text-gray-800 max-w-3xl mx-auto font-bold">
          Pick the perfect plan for your young artist!
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* FREE PLAN */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 space-y-6 bg-white border-4 border-blue-300 rounded-3xl shadow-2xl h-full flex flex-col">
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${freePlan.color} flex items-center justify-center shadow-xl`}>
                <Star className="w-10 h-10 text-white" fill="currentColor" />
              </div>
              <h2 className="text-4xl font-black text-gray-800">{freePlan.name}</h2>
              <div className="text-6xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {freePlan.price}
              </div>
              <p className="text-xl text-gray-700 font-bold">{freePlan.description}</p>
            </div>

            <div className="space-y-4 flex-grow">
              {freePlan.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-700">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-2xl px-8 py-8 rounded-3xl shadow-xl border-4 border-white font-black"
              onClick={handleStartFree}
            >
              Start Free! 🎉
            </Button>
          </Card>
        </motion.div>

        {/* STANDARD PLAN */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 space-y-6 bg-gradient-to-br from-pink-50 to-purple-50 border-8 border-purple-400 rounded-3xl shadow-2xl h-full flex flex-col relative overflow-hidden">
            {/* "BEST VALUE" Badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-3xl font-black text-lg shadow-xl rotate-12 border-4 border-white">
              ⭐ BEST VALUE! ⭐
            </div>

            <div className="text-center space-y-4">
              <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${standardPlan.color} flex items-center justify-center shadow-xl`}>
                <Crown className="w-12 h-12 text-white" fill="currentColor" />
              </div>
              <h2 className="text-4xl font-black text-gray-800">{standardPlan.name}</h2>
              <div>
                <div className="text-6xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {standardPlan.price}
                </div>
                <div className="text-xl text-gray-600 font-bold">{standardPlan.period}</div>
              </div>
              <p className="text-2xl text-gray-800 font-black">{standardPlan.description}</p>
            </div>

            <div className="space-y-4 flex-grow">
              {standardPlan.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-800">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white text-2xl px-8 py-8 rounded-3xl shadow-2xl border-4 border-white font-black"
              >
                Subscribe Now! 👑
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>

      {/* GIFT CARD OFFER - 30 Day Free Trial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <Card className="p-8 md:p-12 bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 border-8 border-orange-400 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Sparkle Decorations */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Gift className="w-16 h-16 text-orange-500 opacity-20" />
            </motion.div>
          </div>
          
          <div className="text-center space-y-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-black text-2xl border-4 border-white shadow-xl">
                🎁 SPECIAL GIFT CARD OFFER! 🎁
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Get 1 FREE Month of Standard!
            </h2>

            <div className="bg-white rounded-3xl p-6 border-4 border-orange-300 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Calendar className="w-12 h-12 text-orange-600" />
                <div className="text-left">
                  <p className="text-3xl font-black text-gray-800">$9.95 Value</p>
                  <p className="text-xl text-gray-600 font-bold">30 Days FREE!</p>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-start gap-2">
                  <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-lg font-bold text-gray-700">Access to ALL lessons, stories & assignments for 30 days</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-lg font-bold text-gray-700">Preview downloads with QR codes</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-lg font-bold text-gray-700">Cancel or subscribe anytime (with parental approval)</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-lg font-bold text-gray-700">After 30 days, choose to continue or return to Free tier</p>
                </div>
              </div>
            </div>

            {!showGiftCard ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={handleClaimGiftCard}
                  className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white text-3xl px-12 py-10 rounded-3xl shadow-2xl border-4 border-white font-black"
                >
                  <Gift className="w-8 h-8 mr-3" />
                  Claim Your Free Month! 🎉
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* QR Code Gift Card */}
                <div className="bg-white rounded-3xl p-8 border-8 border-purple-400 shadow-2xl max-w-md mx-auto">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-2xl font-black text-2xl">
                      🎁 Your Gift Card! 🎁
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-2xl">
                      <QRCodeSVG
                        value={`https://qratorkids.com/trial/${new Date().getTime()}`}
                        size={200}
                        level="H"
                        className="mx-auto"
                        bgColor="#FAFAFA"
                        fgColor="#7C3AED"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <QrCode className="w-6 h-6 text-purple-600" />
                        <p className="text-lg font-black text-gray-800">Scan to preview downloads!</p>
                      </div>
                      <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                        <p className="text-sm font-bold text-purple-800">
                          ⏰ Valid for 30 days from today
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          After 30 days, you can subscribe or return to the Free tier
                        </p>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        size="lg"
                        onClick={() => navigate('/lessons')}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl py-6 rounded-2xl font-black"
                      >
                        Start Learning Now! 🚀
                      </Button>
                    </motion.div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 font-bold max-w-md mx-auto">
                  📧 Gift card details sent to your email • Parent approval required for subscription after trial
                </p>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Trust Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-16 space-y-4"
      >
        <div className="bg-white rounded-3xl p-8 max-w-3xl mx-auto border-4 border-purple-200 shadow-xl">
          <h3 className="text-3xl font-black text-gray-800 mb-4">
            🌟 Safe, Fun & Educational! 🌟
          </h3>
          <p className="text-xl text-gray-700 font-bold">
            Cancel anytime • Kid-friendly • Parent-approved
          </p>
        </div>

        <Link to="/">
          <Button 
            variant="outline"
            size="lg"
            className="text-xl font-bold px-8 py-6 rounded-3xl border-4 border-purple-300 hover:bg-purple-50"
          >
            ← Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}