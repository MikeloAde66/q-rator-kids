import { Link } from "react-router";
import { motion } from "motion/react";
import { Sparkles, BookOpen, Download, TrendingUp, Heart, Shield, Lock, Info, Users, Share2, Gift, Award } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { VideoPlayer } from "../components/VideoPlayer";
import { useOnboarding } from "../contexts/OnboardingContext";
import { useAuth } from "../contexts/AuthContext";
import { getCharacterById, getAllCharacters } from "../data/characters";
import { CharacterInteraction } from "../components/CharacterInteraction";
import { HOME_VIDEO_URL } from "../data/videoUrls";
import curatorImage from 'figma:asset/d7e4bf10eb35abda3e367c7c50bdb2c23724aff2.png';
import animalGroupImage from 'figma:asset/5971713821b985d81f3703527be2e3613c131ac9.png';

export function Home() {
  const { childProfile } = useOnboarding();
  const { parentUser } = useAuth();
  
  // Safely get favorite character with null checks
  const favoriteCharacter = childProfile?.favoriteCharacter 
    ? getCharacterById(childProfile.favoriteCharacter) 
    : null;

  const features = [
    {
      icon: Sparkles,
      title: 'Fun Video Lessons!',
      description: 'Watch, learn, and draw with your animal friends!',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: BookOpen,
      title: 'Animated Stories!',
      description: 'See famous art come alive in cartoons!',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: Download,
      title: 'Cool Coloring Pages!',
      description: 'Download and print FUN worksheets to color!',
      color: 'from-orange-400 to-red-400'
    },
    {
      icon: TrendingUp,
      title: 'Earn Stickers!',
      description: 'Get awesome stickers for finishing lessons!',
      color: 'from-green-400 to-emerald-400'
    }
  ];

  return (
    <div className="space-y-12 pb-8 bg-gradient-to-b from-yellow-200 via-yellow-100 to-orange-100 -mx-6 -mt-6 px-6 pt-6 rounded-3xl min-h-screen">
      {/* Personalized Welcome Message */}
      {childProfile.name && favoriteCharacter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-6 md:p-8 bg-gradient-to-r from-yellow-300 to-orange-300 border-4 border-white rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4 md:gap-6">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img 
                  src={favoriteCharacter.image} 
                  alt={favoriteCharacter.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-4xl font-black text-gray-800">
                  🎨 Welcome back, {childProfile.name}! 🎨
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mt-2 font-bold">
                  {favoriteCharacter.catchphrase}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Q Rator Kids
        </h1>

        <p className="text-2xl md:text-3xl text-gray-800 max-w-3xl mx-auto font-bold">
          🎨 Super fun lessons! 🖍️
        </p>
        
        {/* Big, Colorful Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link to="/lessons">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-2xl px-12 py-8 rounded-3xl shadow-2xl border-4 border-white"
              >
                START LEARNING! 
                <Sparkles className="ml-2 w-7 h-7" />
              </Button>
            </motion.div>
          </Link>
          <Link to="/stories">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-2xl px-12 py-8 rounded-3xl shadow-2xl border-4 border-white"
              >
                WATCH STORIES! 🎬
              </Button>
            </motion.div>
          </Link>
          <Link to="/entertainment">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-2xl px-12 py-8 rounded-3xl shadow-2xl border-4 border-white"
              >
                FUN VIDEOS! 🎉
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* The Curator Image - Centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <img 
          src={curatorImage} 
          alt="The Curator" 
          className="w-64 md:w-80 lg:w-96 h-auto object-contain"
        />
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            >
              <Card className="p-6 text-center space-y-4 hover:shadow-2xl transition-all bg-white border-4 border-purple-200 rounded-3xl h-full">
                <motion.div 
                  className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl`}
                  animate={{ 
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-black text-gray-800">{feature.title}</h3>
                <p className="text-gray-700 text-lg">{feature.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Meet Our Art Teachers - Character Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-6"
      >
        <Card className="p-8 md:p-12 border-4 border-purple-300 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-3xl shadow-2xl">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Users className="w-12 h-12 text-purple-500" />
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Meet Your Animal Friends!
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 font-bold max-w-3xl mx-auto">
              Watch this video to meet all your art teachers! They can't wait to teach you! 🎨
            </p>

            {/* Animal Friends Video */}
            <div className="max-w-4xl mx-auto py-6">
              <VideoPlayer
                videoUrl={HOME_VIDEO_URL}
                title="Meet Your Animal Friends! 🎨"
                posterImage={animalGroupImage}
              />
            </div>

            {/* Interactive Characters Below Video */}
            <p className="text-lg text-gray-600 font-bold pt-4">
              Click on each character to learn more about them!
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-8">
              {getAllCharacters().map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="group"
                >
                  <Link to={`/characters/${character.id}`}>
                    <div className="text-center space-y-2">
                      <CharacterInteraction character={character} size="lg" showMessage={true} />
                      <div className={`
                        bg-white rounded-xl px-4 py-2 border-2 
                        border-${character.borderColor} 
                        group-hover:shadow-lg transition-all
                      `}>
                        <p className="text-lg font-black text-gray-800">{character.name}</p>
                        <p className={`text-sm font-bold text-${character.color}`}>
                          {character.role}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <Link to="/characters">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-10 py-6 rounded-2xl shadow-xl border-4 border-white font-black"
              >
                <Users className="w-6 h-6 mr-2" />
                Learn More About Our Teachers!
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-[3rem] p-8 md:p-12 text-white text-center space-y-6 border-8 border-white shadow-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-black">
          🌟 SO MUCH FUN! 🌟
        </h2>
        <div className="flex flex-wrap gap-6 justify-center pt-4">
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-6 border-4 border-white/30"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          >
            <div className="text-5xl font-black">10</div>
            <div className="text-lg">Fun Lessons!</div>
          </motion.div>
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-6 border-4 border-white/30"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          >
            <div className="text-5xl font-black">6</div>
            <div className="text-lg">Cool Stories!</div>
          </motion.div>
          <motion.div 
            className="bg-white/20 backdrop-blur-sm rounded-3xl px-8 py-6 border-4 border-white/30"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          >
            <div className="text-5xl font-black">5</div>
            <div className="text-lg">Animal Friends!</div>
          </motion.div>
        </div>
        <p className="text-2xl md:text-3xl font-bold opacity-95">
          Let's Make Art Together! 🎨
        </p>
        <Link to="/subscription">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-2xl px-12 py-8 rounded-3xl shadow-2xl border-4 border-purple-300 font-black">
              LET'S GO! 🚀
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Share & Rewards - Parent Feature */}
      {parentUser && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="p-8 md:p-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 border-4 border-white rounded-3xl shadow-2xl text-white">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Share2 className="w-12 h-12" />
                <h2 className="text-3xl md:text-4xl font-black">
                  Share & Earn Rewards! 🎁
                </h2>
              </div>
              
              <p className="text-xl font-bold opacity-95 max-w-2xl mx-auto">
                Share your child's artwork, generate progress reports, print certificates, and earn FREE months by referring friends!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <motion.div 
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <Share2 className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-black text-lg mb-2">Share Artwork</h3>
                  <p className="text-sm opacity-90">Share to social media with one click!</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-black text-lg mb-2">Certificates</h3>
                  <p className="text-sm opacity-90">Print beautiful achievement awards!</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <Gift className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="font-black text-lg mb-2">Referrals</h3>
                  <p className="text-sm opacity-90">Get FREE months for each friend!</p>
                </motion.div>
              </div>
              
              <Link to="/share">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-10 py-6 rounded-2xl shadow-2xl border-4 border-purple-300 font-black">
                  <Gift className="w-6 h-6 mr-2" />
                  Explore Share & Rewards!
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Parent Policy & Privacy Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-6xl mx-auto mt-16 space-y-8"
      >
        {/* Important Information for Parents */}
        <Card className="p-8 md:p-10 bg-white border-4 border-blue-200 rounded-3xl shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3 justify-center">
              <Shield className="w-10 h-10 text-blue-600" />
              <h3 className="text-3xl font-black text-gray-800">Important Information for Parents</h3>
            </div>

            <div className="space-y-4 text-gray-700">
              {/* Protection Against False Claims */}
              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-black text-lg text-gray-800 mb-2">Creative Learning Only</h4>
                    <p className="text-base leading-relaxed">
                      <strong>Q Rator Kids is an independent creative arts application designed solely for children's artistic development and entertainment.</strong> This app is not associated with, endorsed by, or affiliated with any academic institutions, school districts, local educational entities, or government organizations. We make no claims regarding educational standards, curriculum alignment, or academic achievement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Purpose Statement */}
              <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-black text-lg text-gray-800 mb-2">For Creative Purposes Only</h4>
                    <p className="text-base leading-relaxed">
                      This application is designed exclusively for creative expression, art exploration, and entertainment. Q Rator Kids provides drawing and coloring lessons taught by animated animal characters to inspire creativity and artistic confidence in children ages 6-12. <strong>This is not an educational assessment tool, academic program, or substitute for formal art instruction.</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy & Data Protection */}
              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-black text-lg text-gray-800 mb-2">Your Child's Privacy is Sacred</h4>
                    <p className="text-base leading-relaxed">
                      <strong>We will NEVER use, share, sell, or distribute your child's personal information. Ever.</strong> Any information collected (name, email for account purposes) is stored securely and used solely to provide app functionality. We do not share data with third parties, advertisers, or any external organizations. Your child's privacy and safety are our highest priorities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Parental Control Statement */}
              <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-black text-lg text-gray-800 mb-2">Parent-Controlled & Safe</h4>
                    <p className="text-base leading-relaxed">
                      Parents maintain full control over their child's account, subscription status, and app access. All subscription decisions require parental approval. We encourage parents to explore the app with their children and celebrate their creative journey together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Copyright Footer */}
        <div className="text-center pb-8">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200">
            <p className="text-lg font-black text-gray-800">
              Q Rator Kids
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Copyright © 2026, All Rights Reserved
            </p>
            <p className="text-xs text-gray-500 mt-3 max-w-2xl mx-auto">
              Q Rator Kids is an independent creative arts platform. All characters, lessons, and content are original works created for children's artistic development and entertainment purposes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}