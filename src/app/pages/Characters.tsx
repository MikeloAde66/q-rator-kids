import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Heart, Star, Sparkles, Users } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getAllCharacters, Character } from '../data/characters';
import { LoadingTransition } from '../components/PageTransition';
import { CharactersSkeleton } from '../components/skeletons/CharactersSkeleton';

export function Characters() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('qrator-favorite-characters') || '[]');
  });

  useEffect(() => {
    // Simulate loading for smooth UX
    const loadCharacters = async () => {
      setIsLoading(true);
      
      // Simulate async data fetch
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCharacters(getAllCharacters());
      setIsLoading(false);
    };

    loadCharacters();
  }, []);

  const toggleFavorite = (characterId: string) => {
    let newFavorites;
    if (favorites.includes(characterId)) {
      newFavorites = favorites.filter(id => id !== characterId);
    } else {
      newFavorites = [...favorites, characterId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('qrator-favorite-characters', JSON.stringify(newFavorites));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <LoadingTransition
      isLoading={isLoading}
      loadingComponent={<CharactersSkeleton />}
    >
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <Users className="w-20 h-20 mx-auto text-purple-500" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Meet Our Art Teachers!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-semibold max-w-3xl mx-auto">
            Each character has their own special way of teaching you to draw and color! Click on any character to learn more about them! 🎨
          </p>
        </motion.div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 border-4 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-purple-600">{characters.length}</div>
                <div className="text-sm text-gray-600 font-bold">Art Teachers</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-purple-300" />
              <div>
                <div className="text-4xl font-black text-pink-600">{favorites.length}</div>
                <div className="text-sm text-gray-600 font-bold">Your Favorites</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-purple-300" />
              <div>
                <div className="text-4xl font-black text-orange-600">∞</div>
                <div className="text-sm text-gray-600 font-bold">Fun Lessons</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Favorites Section */}
        {favorites.length > 0 && characters && characters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              <h2 className="text-3xl font-black text-gray-800">Your Favorite Characters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters
                .filter(char => favorites.includes(char.id))
                .map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(character.id)}
                    onClick={() => navigate(`/characters/${character.id}`)}
                  />
                ))}
            </div>
          </motion.div>
        )}

        {/* All Characters */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-black text-gray-800">All Characters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <motion.div key={character.id} variants={itemVariants}>
                <CharacterCard
                  character={character}
                  isFavorite={favorites.includes(character.id)}
                  onToggleFavorite={() => toggleFavorite(character.id)}
                  onClick={() => navigate(`/characters/${character.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-12 border-4 border-blue-300 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl text-center">
            <div className="space-y-4">
              <div className="text-6xl">🎨✨🖌️</div>
              <h3 className="text-3xl font-black text-gray-800">
                Ready to Start Learning?
              </h3>
              <p className="text-xl text-gray-600 font-semibold max-w-2xl mx-auto">
                Choose your favorite character and start your art journey today! Each teacher has special lessons just for you!
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  onClick={() => navigate('/lessons')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6 rounded-2xl"
                >
                  <Star className="w-6 h-6 mr-2" />
                  Start Learning!
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </LoadingTransition>
  );
}

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

function CharacterCard({ character, isFavorite, onToggleFavorite, onClick }: CharacterCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className={`
        relative overflow-hidden border-4 rounded-3xl cursor-pointer
        bg-gradient-to-br from-${character.bgColor} to-white
        border-${character.borderColor}
        hover:shadow-2xl transition-shadow
      `}>
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`
            absolute top-3 right-3 w-10 h-10 rounded-full border-3 flex items-center justify-center
            transition-all duration-300 hover:scale-110 z-10
            ${isFavorite 
              ? 'bg-red-500 border-red-300' 
              : 'bg-white/80 border-gray-300 hover:border-red-300'
            }
          `}
        >
          <Heart
            className={`w-5 h-5 transition-all ${isFavorite ? 'text-white fill-white' : 'text-gray-400'}`}
          />
        </button>

        <div onClick={onClick} className="p-6">
          {/* Character Image */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            className="mb-4 flex justify-center"
          >
            <img 
              src={character.image} 
              alt={character.name}
              className="w-40 h-40 object-contain"
            />
          </motion.div>

          {/* Character Info */}
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-black text-gray-800">
              {character.name}
            </h3>
            <p className={`text-lg font-bold text-${character.color}`}>
              {character.role}
            </p>

            {/* Personality Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {character.personality.slice(0, 3).map((trait) => (
                <Badge
                  key={trait}
                  className={`
                    bg-white/80 text-${character.color}
                    border-2 border-${character.borderColor}
                    font-bold text-xs px-3 py-1
                  `}
                >
                  {trait}
                </Badge>
              ))}
            </div>

            {/* Catchphrase */}
            <div className={`
              bg-white/60 rounded-xl px-4 py-3 border-2 border-${character.borderColor}
              min-h-[80px] flex items-center justify-center
            `}>
              <p className="text-sm font-black text-gray-700 italic">
                "{character.catchphrase}"
              </p>
            </div>

            {/* View Profile Button */}
            <Button
              className={`
                w-full bg-gradient-to-r from-${character.color} to-purple-500
                hover:opacity-90 text-white font-bold rounded-xl
              `}
            >
              Meet {character.name}! 👋
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}