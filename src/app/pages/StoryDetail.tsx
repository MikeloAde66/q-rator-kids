import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Lightbulb, Palette, Sparkles, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { getStoryById } from "../data/stories";
import { VideoPlayer } from "../components/VideoPlayer";

export function StoryDetail() {
  const { storyId } = useParams();
  const story = getStoryById(storyId || '');

  if (!story) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Story not found</h2>
        <Link to="/stories">
          <Button className="mt-4">Back to Stories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <Link to="/stories">
        <Button variant="ghost" className="gap-2 text-lg">
          <ArrowLeft className="w-5 h-5" />
          Back to Stories
        </Button>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          {story.title}
        </h1>

        <div className="flex items-center gap-4 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-3xl border-4 border-purple-200">
          <img
            src={story.artBuddyImage}
            alt={story.artBuddyHost}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div>
            <p className="text-sm text-purple-600 font-bold">Your Host:</p>
            <p className="font-black text-2xl text-purple-700">{story.artBuddyHost}</p>
            <p className="text-sm text-purple-600">{story.ageRange}</p>
          </div>
        </div>

        <Card className="p-6 bg-white border-4 border-purple-200 rounded-3xl">
          <p className="text-xl text-gray-700 font-semibold">
            {story.description}
          </p>
          <div className="mt-4 flex gap-2 items-center">
            <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-2 border-orange-200">
              {story.artistName}
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-2 border-blue-200">
              {story.year}
            </Badge>
          </div>
        </Card>
      </motion.div>

      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <VideoPlayer
          videoUrl={story.videoUrl}
          title={story.title}
          posterImage={story.coverImage}
        />
      </motion.div>

      {/* Fun Facts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-8 bg-gradient-to-br from-yellow-100 to-orange-100 border-8 border-yellow-300 rounded-3xl">
          <h2 className="text-4xl font-black text-gray-800 mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lightbulb className="w-10 h-10 text-orange-600" />
            </motion.div>
            Super Fun Facts! 🎉
          </h2>
          <div className="grid gap-4">
            {story.funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 bg-white p-5 rounded-2xl border-4 border-yellow-200 shadow-lg"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-6 h-6 text-yellow-600 flex-shrink-0 fill-yellow-600" />
                </motion.div>
                <p className="text-gray-700 text-lg font-semibold">{fact}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Art Tricks Learned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 border-8 border-purple-300 rounded-3xl">
          <h2 className="text-4xl font-black text-gray-800 mb-6 flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Palette className="w-10 h-10 text-purple-600" />
            </motion.div>
            Art Tricks You'll Learn! ✨
          </h2>
          <p className="text-gray-700 mb-6 text-lg font-semibold">
            While watching this fun story, you'll learn these cool art tricks!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {story.artTricks.map((trick, index) => (
              <motion.div
                key={trick}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                className="bg-white p-5 rounded-2xl border-4 border-purple-200 font-black text-gray-800 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
                  <span className="text-lg">{trick}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link to="/lessons">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl px-10 py-7 rounded-3xl shadow-xl border-4 border-white font-black">
              Try These Tricks! 🎨
            </Button>
          </motion.div>
        </Link>
        
        <Link to="/stories">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" className="text-xl px-10 py-7 rounded-3xl border-4 border-purple-300 font-black hover:bg-purple-50">
              More Stories! 📚
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Encouragement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl p-8 border-8 border-white shadow-2xl text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-12 h-12 mx-auto text-white mb-4" />
        </motion.div>
        <p className="text-2xl md:text-3xl text-white font-black">
          You're learning from the BEST artists ever! Keep going! 🌟
        </p>
      </motion.div>
    </div>
  );
}