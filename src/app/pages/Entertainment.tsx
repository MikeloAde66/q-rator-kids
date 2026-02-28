import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { VideoPlaylist } from '../components/VideoPlaylist';
import { VideoPlayer } from '../components/VideoPlayer';
import { getAllEntertainmentVideos, getEntertainmentVideosByAge } from '../data/videoUrls';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Sparkles, Play, Grid3x3, List, Baby, Users } from 'lucide-react';
import { Link } from 'react-router';

type ViewMode = 'playlist' | 'grid';
type AgeFilter = 'all' | 'beginner' | 'intermediate';

export function Entertainment() {
  const { childProfile } = useOnboarding();
  const [viewMode, setViewMode] = useState<ViewMode>('playlist');
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('all');

  // Get videos based on age filter
  const allVideos = getAllEntertainmentVideos();
  const filteredVideos = ageFilter === 'all' 
    ? allVideos 
    : getEntertainmentVideosByAge(ageFilter);

  // Convert to playlist format
  const playlistVideos = filteredVideos.map(video => ({
    key: video.key,
    url: video.url,
    title: video.title,
    description: video.description,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-purple-500" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Fun Videos! 🎬
            </h1>
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-pink-500" />
          </div>
          {childProfile && (
            <motion.p 
              className="text-2xl md:text-3xl text-gray-700 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hey {childProfile.name}! Ready to watch some awesome videos? 🌟
            </motion.p>
          )}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Sing, dance, and have fun with your animal friends!
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 md:p-8 bg-white border-4 border-purple-300 rounded-3xl shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Age Filter */}
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <span className="text-lg font-black text-gray-700">Show Videos For:</span>
                <div className="flex gap-2">
                  <Button
                    size="lg"
                    onClick={() => setAgeFilter('all')}
                    className={`
                      px-6 py-4 rounded-2xl font-black text-base border-4 transition-all
                      ${ageFilter === 'all'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                      }
                    `}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    All Ages
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setAgeFilter('beginner')}
                    className={`
                      px-6 py-4 rounded-2xl font-black text-base border-4 transition-all
                      ${ageFilter === 'beginner'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                      }
                    `}
                  >
                    <Baby className="w-5 h-5 mr-2" />
                    Ages 6-8
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setAgeFilter('intermediate')}
                    className={`
                      px-6 py-4 rounded-2xl font-black text-base border-4 transition-all
                      ${ageFilter === 'intermediate'
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-orange-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
                      }
                    `}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Ages 9-12
                  </Button>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  size="lg"
                  onClick={() => setViewMode('playlist')}
                  className={`
                    px-6 py-4 rounded-2xl font-black text-base border-4 transition-all
                    ${viewMode === 'playlist'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                    }
                  `}
                >
                  <List className="w-5 h-5 mr-2" />
                  Playlist
                </Button>
                <Button
                  size="lg"
                  onClick={() => setViewMode('grid')}
                  className={`
                    px-6 py-4 rounded-2xl font-black text-base border-4 transition-all
                    ${viewMode === 'grid'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-pink-400'
                    }
                  `}
                >
                  <Grid3x3 className="w-5 h-5 mr-2" />
                  Grid
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {playlistVideos.length === 0 ? (
            // No Videos Message
            <Card className="p-12 md:p-16 text-center bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-300 rounded-3xl shadow-xl">
              <div className="space-y-6">
                <div className="text-8xl">🎬</div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-800">
                  Coming Soon!
                </h3>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                  We're working on awesome entertainment videos just for you! Check back soon! 🌟
                </p>
                <div className="pt-6">
                  <Link to="/">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-10 py-6 rounded-2xl font-black border-4 border-white shadow-xl"
                    >
                      Back to Home 🏠
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ) : viewMode === 'playlist' ? (
            // Playlist Mode
            <VideoPlaylist videos={playlistVideos} showPlaylist={true} />
          ) : (
            // Grid Mode
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 border-4 border-white rounded-3xl shadow-xl">
                <div className="text-center text-white">
                  <h2 className="text-2xl md:text-3xl font-black">
                    Choose a Video to Watch! 🎥
                  </h2>
                  <p className="text-lg mt-2 opacity-95">
                    Click on any video below to start watching!
                  </p>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlistVideos.map((video, index) => (
                  <motion.div
                    key={video.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="overflow-hidden bg-white border-4 border-purple-300 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                      <div className="p-6 space-y-4">
                        {/* Video Number Badge */}
                        <div className="flex items-center justify-between">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl px-4 py-2 font-black text-lg">
                            #{index + 1}
                          </div>
                          <Play className="w-8 h-8 text-purple-500" />
                        </div>

                        {/* Video Info */}
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-gray-800 line-clamp-2">
                            {video.title}
                          </h3>
                          <p className="text-base text-gray-600 mt-2 line-clamp-3">
                            {video.description}
                          </p>
                        </div>

                        {/* Video Player */}
                        <div className="pt-2">
                          <VideoPlayer
                            videoUrl={video.url}
                            title={video.title}
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        {playlistVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 border-4 border-white rounded-3xl shadow-2xl">
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-black text-white">
                  Want to Learn to Draw? 🎨
                </h3>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  After watching these fun videos, try our drawing lessons!
                </p>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Link to="/lessons">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-10 py-6 rounded-2xl font-black border-4 border-purple-300 shadow-xl"
                      >
                        <Sparkles className="w-6 h-6 mr-2" />
                        Start Learning!
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/stories">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xl px-10 py-6 rounded-2xl font-black border-4 border-white shadow-xl"
                      >
                        Watch Stories! 📚
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
