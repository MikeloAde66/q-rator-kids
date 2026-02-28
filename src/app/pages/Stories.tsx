import { Link } from "react-router";
import { motion } from "motion/react";
import { Play, Clock, Sparkles, Heart, Lock } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { stories } from "../data/stories";
import { useSubscription } from "../contexts/SubscriptionContext";

export function Stories() {
  const { hasAccessToContent } = useSubscription();
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Art Stories
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Watch famous art come alive!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => {
          const hasAccess = hasAccessToContent(story.id);
          const isLocked = !hasAccess;
          
          return (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
          >
            {isLocked ? (
              <div onClick={() => window.location.href = '/subscription'}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer bg-white border-4 border-gray-300 rounded-3xl relative">
                  {/* Locked Overlay */}
                  <div className="absolute inset-0 bg-gray-900/70 z-10 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
                    >
                      <Lock className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="text-center px-4">
                      <p className="text-white font-black text-xl mb-2">🔒 Locked!</p>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-2xl shadow-xl border-2 border-white"
                      >
                        Unlock All Stories! 👑
                      </Button>
                    </div>
                  </div>

                  {/* Grayed Out Content */}
                  <div className="opacity-40">
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-black text-xl text-gray-800 line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
            <Link to={`/stories/${story.id}`}>
              <Card className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer bg-white border-4 border-purple-200 rounded-3xl relative">
                {/* FREE Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-2 border-white font-black text-sm py-1 px-3">
                    ✨ FREE!
                  </Badge>
                </div>

                {/* Cover Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* BIG Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Play className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-purple-600 text-white border-2 border-white">
                      <Clock className="w-4 h-4 mr-1" />
                      {story.duration}
                    </Badge>
                  </div>

                  {/* Art Buddy Host */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-2xl p-2 border-2 border-purple-200">
                      <img
                        src={story.artBuddyImage}
                        alt={story.artBuddyHost}
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-300"
                      />
                      <div className="flex-1">
                        <p className="font-black text-sm text-purple-700">{story.artBuddyHost}</p>
                        <p className="text-xs text-purple-600">{story.ageRange}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-black text-xl text-gray-800 line-clamp-2">
                    {story.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {story.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="text-xs gap-1 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-2 border-purple-200">
                      <Sparkles className="w-3 h-3" />
                      {story.artTricks.length} Art Tricks!
                    </Badge>
                    <Badge className="text-xs bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-2 border-orange-200">
                      🎉 {story.funFacts.length} Fun Facts!
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
            )}
          </motion.div>
        );
        })}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 border-8 border-white shadow-2xl text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-16 h-16 mx-auto text-white mb-4" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Learn While Having FUN! 🎨
        </h2>
        <p className="text-xl text-white font-bold max-w-2xl mx-auto">
          Each story is an ANIMATED adventure! Your animal buddies bring famous artwork to life 
          and teach you cool art tricks without you even knowing it!
        </p>
      </motion.div>
    </div>
  );
}