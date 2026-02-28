import { useState, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, SkipForward, RotateCcw, List } from 'lucide-react';

interface PlaylistVideo {
  key: string;
  url: string;
  title: string;
  description: string;
  posterImage?: string;
}

interface VideoPlaylistProps {
  videos: PlaylistVideo[];
  autoPlay?: boolean;
  showPlaylist?: boolean;
}

export function VideoPlaylist({ videos, autoPlay = false, showPlaylist = true }: VideoPlaylistProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(showPlaylist);

  const currentVideo = videos[currentIndex];
  const hasNext = currentIndex < videos.length - 1;
  const hasPrevious = currentIndex > 0;

  const goToNext = () => {
    if (hasNext) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (hasPrevious) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
  };

  const restartPlaylist = () => {
    setCurrentIndex(0);
  };

  if (videos.length === 0) {
    return (
      <Card className="p-12 text-center bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-300 rounded-3xl">
        <div className="space-y-4">
          <div className="text-6xl">🎬</div>
          <h3 className="text-3xl font-black text-gray-800">No Videos Yet!</h3>
          <p className="text-xl text-gray-600">
            Check back soon for awesome videos! 🌟
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Video Player */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <VideoPlayer
          videoUrl={currentVideo.url}
          title={currentVideo.title}
          posterImage={currentVideo.posterImage}
        />
      </motion.div>

      {/* Video Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 md:p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-300 rounded-3xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-black text-gray-800">
                  {currentVideo.title}
                </h2>
                <p className="text-lg text-gray-700 mt-2">
                  {currentVideo.description}
                </p>
              </div>
              <div className="text-right ml-4">
                <div className="bg-purple-500 text-white rounded-2xl px-4 py-2 font-black text-lg">
                  {currentIndex + 1} / {videos.length}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Playlist Controls */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {/* Previous Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            onClick={goToPrevious}
            disabled={!hasPrevious}
            className={`
              text-xl px-8 py-6 rounded-2xl font-black border-4 shadow-xl
              ${hasPrevious 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-white' 
                : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
              }
            `}
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            Previous
          </Button>
        </motion.div>

        {/* Restart Playlist */}
        {currentIndex > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={restartPlaylist}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xl px-8 py-6 rounded-2xl font-black border-4 border-white shadow-xl"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Start Over
            </Button>
          </motion.div>
        )}

        {/* Toggle Playlist */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-8 py-6 rounded-2xl font-black border-4 border-white shadow-xl"
          >
            <List className="w-6 h-6 mr-2" />
            {isPlaylistOpen ? 'Hide' : 'Show'} List
          </Button>
        </motion.div>

        {/* Next Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            onClick={goToNext}
            disabled={!hasNext}
            className={`
              text-xl px-8 py-6 rounded-2xl font-black border-4 shadow-xl
              ${hasNext 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-white' 
                : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
              }
            `}
          >
            Next
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Playlist Grid */}
      <AnimatePresence>
        {isPlaylistOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 md:p-8 bg-white border-4 border-purple-300 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <List className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl md:text-3xl font-black text-gray-800">
                  Video Playlist
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video, index) => {
                  const isActive = index === currentIndex;
                  const isWatched = index < currentIndex;

                  return (
                    <motion.div
                      key={video.key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        onClick={() => goToVideo(index)}
                        className={`
                          w-full text-left p-4 rounded-2xl border-4 transition-all
                          ${isActive 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-purple-600 shadow-xl' 
                            : isWatched
                            ? 'bg-green-100 border-green-300 hover:bg-green-200'
                            : 'bg-gradient-to-br from-blue-50 to-purple-50 border-purple-200 hover:border-purple-400 hover:shadow-lg'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`
                            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl
                            ${isActive 
                              ? 'bg-white/20 backdrop-blur-sm text-white' 
                              : isWatched
                              ? 'bg-green-500 text-white'
                              : 'bg-purple-200 text-purple-600'
                            }
                          `}>
                            {isActive ? (
                              <Play className="w-6 h-6" />
                            ) : isWatched ? (
                              '✓'
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`
                              font-black text-sm md:text-base line-clamp-2
                              ${isActive ? 'text-white' : 'text-gray-800'}
                            `}>
                              {video.title}
                            </h4>
                            <p className={`
                              text-xs md:text-sm mt-1 line-clamp-2
                              ${isActive ? 'text-white/90' : 'text-gray-600'}
                            `}>
                              {video.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Message */}
      {!hasNext && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 border-4 border-white rounded-3xl shadow-2xl">
            <div className="space-y-4">
              <div className="text-6xl animate-bounce">🎉</div>
              <h3 className="text-3xl md:text-4xl font-black text-white">
                You Watched All The Videos!
              </h3>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Great job! Want to watch them again?
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={restartPlaylist}
                  className="bg-white text-purple-600 hover:bg-gray-100 text-2xl px-12 py-8 rounded-3xl font-black shadow-xl border-4 border-purple-300 mt-4"
                >
                  <RotateCcw className="w-7 h-7 mr-3" />
                  Watch Again! 🎬
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
