import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Star,
  Sparkles,
  BookOpen,
  Palette,
  Award,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Quote,
  Info,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getCharacterById, Character } from '../data/characters';
import { lessons } from '../data/lessons';
import { LoadingTransition } from '../components/PageTransition';
import { CharacterBioSkeleton } from '../components/skeletons/CharacterBioSkeleton';

export function CharacterBio() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<Character | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const loadCharacter = async () => {
      setIsLoading(true);
      
      // Simulate async loading
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (characterId) {
        const char = getCharacterById(characterId);
        if (char) {
          setCharacter(char);
          // Check if favorited
          const favorites = JSON.parse(localStorage.getItem('qrator-favorite-characters') || '[]');
          setIsFavorite(favorites.includes(characterId));
        } else {
          // Character not found, redirect
          navigate('/');
        }
      }
      
      setIsLoading(false);
    };

    loadCharacter();
  }, [characterId, navigate]);

  useEffect(() => {
    // Show quote animation after component loads
    const timer = setTimeout(() => setShowQuote(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('qrator-favorite-characters') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== characterId);
    } else {
      newFavorites = [...favorites, characterId];
    }
    
    localStorage.setItem('qrator-favorite-characters', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Get lessons taught by this character
  const characterLessons = character ? lessons.filter(lesson =>
    lesson.artBuddyName?.toLowerCase() === character?.name.toLowerCase()
  ) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <LoadingTransition
      isLoading={isLoading}
      loadingComponent={<CharacterBioSkeleton />}
    >
      {character && (
        <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4 text-lg font-bold hover:bg-gray-100 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <Card className={`
            relative overflow-hidden border-4 rounded-3xl p-8 md:p-12
            bg-gradient-to-br from-${character.bgColor} to-white
            border-${character.borderColor}
          `}>
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className={`
                absolute top-4 right-4 w-12 h-12 rounded-full border-4 flex items-center justify-center
                transition-all duration-300 hover:scale-110
                ${isFavorite 
                  ? `bg-red-500 border-red-300` 
                  : `bg-white border-gray-300 hover:border-red-300`
                }
              `}
            >
              <Heart
                className={`w-6 h-6 transition-all ${isFavorite ? 'text-white fill-white' : 'text-gray-400'}`}
              />
            </button>

            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Character Image */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex-shrink-0"
              >
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-64 h-64 md:w-80 md:h-80 object-contain"
                />
              </motion.div>

              {/* Character Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-black mb-2">
                  {character.fullName}
                </h1>
                <p className={`text-2xl md:text-3xl font-bold text-${character.color} mb-4`}>
                  {character.role}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                  {character.personality.map((trait) => (
                    <Badge
                      key={trait}
                      className={`
                        bg-${character.bgColor} text-${character.color} 
                        border-2 border-${character.borderColor} 
                        font-black text-sm px-4 py-2
                      `}
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
                <div className={`
                  inline-block bg-white/80 rounded-2xl px-6 py-3 border-4 border-${character.borderColor}
                `}>
                  <p className="text-xl md:text-2xl font-black">
                    💬 "{character.catchphrase}"
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Character Quote */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className={`
                p-8 border-4 rounded-3xl relative
                bg-gradient-to-r from-yellow-50 to-orange-50
                border-yellow-300
              `}>
                <Quote className="absolute top-4 left-4 w-12 h-12 text-yellow-300 opacity-50" />
                <div className="ml-8">
                  <p className="text-2xl md:text-3xl font-black text-gray-800 italic mb-3">
                    "{character.quote}"
                  </p>
                  <p className="text-lg text-gray-600 font-semibold">
                    — {character.name}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Info Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={`p-6 border-4 rounded-3xl bg-gradient-to-br from-${character.bgColor} to-white border-${character.borderColor}`}>
              <div className="flex items-center gap-3 mb-2">
                <Info className={`w-6 h-6 text-${character.color}`} />
                <h3 className="text-lg font-black">Animal</h3>
              </div>
              <p className="text-2xl font-bold">{character.animal}</p>
              <p className="text-sm text-gray-600 font-semibold">{character.age}</p>
            </Card>

            <Card className={`p-6 border-4 rounded-3xl bg-gradient-to-br from-${character.bgColor} to-white border-${character.borderColor}`}>
              <div className="flex items-center gap-3 mb-2">
                <Palette className={`w-6 h-6 text-${character.color}`} />
                <h3 className="text-lg font-black">Favorite Material</h3>
              </div>
              <p className="text-xl font-bold">{character.favoriteMaterial}</p>
            </Card>

            <Card className={`p-6 border-4 rounded-3xl bg-gradient-to-br from-${character.bgColor} to-white border-${character.borderColor}`}>
              <div className="flex items-center gap-3 mb-2">
                <Star className={`w-6 h-6 text-${character.color}`} />
                <h3 className="text-lg font-black">Special Skill</h3>
              </div>
              <p className="text-xl font-bold">{character.specialSkill}</p>
            </Card>
          </div>
        </motion.div>

        {/* Backstory */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 border-4 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-purple-500" />
              <h2 className="text-3xl font-black">Meet {character.name}!</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-semibold">
              {character.backstory}
            </p>
          </Card>
        </motion.div>

        {/* Teaching Style */}
        <motion.div variants={itemVariants}>
          <Card className={`p-8 border-4 rounded-3xl bg-gradient-to-br from-${character.bgColor} to-white border-${character.borderColor}`}>
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className={`w-8 h-8 text-${character.color}`} />
              <h2 className="text-3xl font-black">Teaching Style</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-semibold">
              {character.teachingStyle}
            </p>
            <div className="mt-4 p-4 bg-white/60 rounded-xl border-2 border-${character.borderColor}">
              <p className="text-sm font-bold text-gray-600">
                <span className={`text-${character.color}`}>Voice:</span> {character.voiceDescription}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Fun Facts */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 border-4 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-black">Fun Facts!</h2>
            </div>
            <div className="space-y-3">
              {character.funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white/80 rounded-2xl border-2 border-blue-200"
                >
                  <span className="text-2xl flex-shrink-0">
                    {['🎨', '✨', '🌟', '🎭', '🖌️'][index % 5]}
                  </span>
                  <p className="text-lg font-semibold text-gray-700">{fact}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Likes & Dislikes */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Likes */}
            <Card className="p-8 border-4 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <ThumbsUp className="w-8 h-8 text-green-500" />
                <h2 className="text-3xl font-black">Loves</h2>
              </div>
              <ul className="space-y-2">
                {character.likes.map((like, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-lg font-semibold text-gray-700"
                  >
                    <span className="text-2xl">💚</span>
                    {like}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Dislikes */}
            <Card className="p-8 border-4 border-red-300 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <ThumbsDown className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-black">Dislikes</h2>
              </div>
              <ul className="space-y-2">
                {character.dislikes.map((dislike, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-lg font-semibold text-gray-700"
                  >
                    <span className="text-2xl">💔</span>
                    {dislike}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </motion.div>

        {/* Lessons Taught */}
        {characterLessons.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className={`p-8 border-4 rounded-3xl bg-gradient-to-br from-${character.bgColor} to-white border-${character.borderColor}`}>
              <div className="flex items-center gap-3 mb-6">
                <Award className={`w-8 h-8 text-${character.color}`} />
                <h2 className="text-3xl font-black">
                  Lessons Taught by {character.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {characterLessons.map((lesson) => (
                  <motion.div
                    key={lesson.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className="p-6 border-2 border-gray-200 hover:border-gray-300 rounded-2xl cursor-pointer bg-white/80 backdrop-blur-sm transition-all"
                      onClick={() => navigate(`/lessons/${lesson.level}/${lesson.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={lesson.artBuddyImage} 
                          alt={lesson.artBuddyName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-gray-800 mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600 font-semibold line-clamp-2">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Meet Other Characters CTA */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 border-4 border-gray-300 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl text-center">
            <h2 className="text-3xl font-black mb-4">
              Meet All Our Art Teachers! 🎨
            </h2>
            <p className="text-lg text-gray-600 font-semibold mb-6">
              Each character has their own special way of teaching art!
            </p>
            <Button
              onClick={() => navigate('/characters')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6 rounded-2xl"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              See All Characters
            </Button>
          </Card>
        </motion.div>
      </motion.div>
    </div>
      )}
    </LoadingTransition>
  );
}