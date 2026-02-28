import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Play, Clock, Star, Lock, Download, Heart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { SearchBar } from "../components/SearchBar";
import { DownloadModal } from "../components/DownloadModal";
import { HelpBubble, InlineHelp } from "../components/HelpBubble";
import { lessons, getLessonsByLevel } from "../data/lessons";
import { useSubscription } from "../contexts/SubscriptionContext";
import { useSearch } from "../contexts/SearchContext";
import { useTutorial } from "../contexts/TutorialContext";
import { filterLessons, sortLessons } from "../utils/searchUtils";

export function Lessons() {
  const { hasAccessToContent } = useSubscription();
  const { searchQuery, filters } = useSearch();
  const { startTour, getTourProgress } = useTutorial();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  
  // FREE VERSION: 3 lessons total (2 beginner, 1 intermediate)
  const freeLessons = ['beginner-1', 'beginner-2', 'intermediate-1'];
  
  const handleDownload = (e: React.MouseEvent, lesson: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedLesson({
      type: 'lesson' as const,
      title: lesson.title,
      description: lesson.description,
      imageUrl: lesson.artBuddyImage,
      character: lesson.artBuddyName,
      difficulty: lesson.level === 'beginner' ? 'Beginner (6-8)' : 'Intermediate (9-12)'
    });
    setDownloadModalOpen(true);
  };

  const levels = [
    { 
      value: 'beginner', 
      label: '🖍️ Crayons!', 
      color: 'from-green-400 to-emerald-400',
      description: 'Ages 6-8 • Super fun with crayons!',
      emoji: '🖍️'
    },
    { 
      value: 'intermediate', 
      label: '✏️ Colored Pencils!', 
      color: 'from-blue-400 to-cyan-400',
      description: 'Ages 9-12 • Level up your skills!',
      emoji: '✏️'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Lessons
        </h1>
      </motion.div>

      {/* Search Bar */}
      <SearchBar />

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 bg-white border-4 border-purple-300 p-2 h-auto gap-2 rounded-3xl">
          {levels.map((level) => (
            <TabsTrigger
              key={level.value}
              value={level.value}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-400 data-[state=active]:text-white text-lg md:text-xl font-black py-4 rounded-2xl"
            >
              {level.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {levels.map((level) => {
          const levelLessons = getLessonsByLevel(level.value as any);
          const filteredLessons = filterLessons(levelLessons, searchQuery, filters.difficulty, filters.character);
          const sortedLessons = sortLessons(filteredLessons, filters.sortBy);
          
          return (
            <TabsContent key={level.value} value={level.value} className="space-y-6 mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <motion.div 
                  className={`inline-block px-8 py-4 rounded-full bg-gradient-to-r ${level.color} text-white font-black mb-3 text-2xl border-4 border-white shadow-xl`}
                  animate={{ rotate: [0, -2, 2, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {level.emoji} {level.label}
                </motion.div>
                <p className="text-xl text-gray-700 font-semibold">{level.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedLessons.length === 0 ? (
                  <div className="col-span-full">
                    <Card className="p-12 border-4 border-gray-200 bg-gray-50 text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl mb-4"
                      >
                        🔍
                      </motion.div>
                      <h3 className="text-2xl font-black text-gray-800 mb-2">
                        No lessons found
                      </h3>
                      <p className="text-gray-600">
                        Try a different search or filter!
                      </p>
                    </Card>
                  </div>
                ) : (
                  sortedLessons.map((lesson, index) => {
                    const hasAccess = hasAccessToContent(lesson.id);
                    const isLocked = !hasAccess;
                    
                    return (
                    <motion.div
                      key={lesson.id}
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
                                  Unlock All Lessons! 👑
                                </Button>
                              </div>
                            </div>

                            {/* Grayed Out Content */}
                            <div className="opacity-40">
                              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                                <img
                                  src={lesson.artBuddyImage}
                                  alt={lesson.artBuddyName}
                                  className="w-full h-full object-cover grayscale"
                                />
                              </div>
                              <div className="p-5 space-y-3">
                                <h3 className="font-black text-xl text-gray-800 line-clamp-2">
                                  {lesson.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {lesson.description}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </div>
                      ) : (
                      <Link to={`/lessons/${lesson.level}/${lesson.id}`}>
                        <Card className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer bg-white border-4 border-purple-200 rounded-3xl relative">
                          {/* FREE Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-2 border-white font-black text-sm py-1 px-3">
                              ✨ FREE!
                            </Badge>
                          </div>

                          {/* Thumbnail */}
                          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                            <img
                              src={lesson.artBuddyImage}
                              alt={lesson.artBuddyName}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
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
                              <Badge className="bg-purple-600 text-white border-2 border-white text-sm py-1 px-3">
                                <Clock className="w-4 h-4 mr-1" />
                                {lesson.duration}
                              </Badge>
                            </div>

                            {/* Completion Star */}
                            {lesson.completed && (
                              <motion.div 
                                className="absolute bottom-3 left-3"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Badge className="bg-yellow-400 text-yellow-900 border-2 border-white">
                                  <Star className="w-4 h-4 mr-1 fill-current" />
                                  Done!
                                </Badge>
                              </motion.div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5 space-y-3">
                            <h3 className="font-black text-xl text-gray-800 line-clamp-2">
                              {lesson.title}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-2">
                              {lesson.description}
                            </p>

                            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-xl border-2 border-purple-200">
                              <img
                                src={lesson.artBuddyImage}
                                alt={lesson.artBuddyName}
                                className="w-8 h-8 rounded-full object-cover border-2 border-white"
                              />
                              <span className="font-black text-sm text-purple-700">{lesson.artBuddyName}</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {lesson.skills.slice(0, 2).map((skill) => (
                                <Badge key={skill} className="text-xs bg-white border-2 border-purple-200 text-purple-700">
                                  ✨ {skill}
                                </Badge>
                              ))}
                            </div>

                            {/* Download Button */}
                            <Button
                              onClick={(e) => handleDownload(e, lesson)}
                              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-black shadow-lg"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </Card>
                      </Link>
                      )}
                    </motion.div>
                  );
                })
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Encouragement Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 text-center border-8 border-white shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 mx-auto text-white fill-white mb-4" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
          You're AWESOME! 🌟
        </h2>
        <p className="text-xl text-white font-bold">
          Every artist starts somewhere - and you're already here!
        </p>
      </motion.div>

      {/* Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        item={selectedLesson}
      />
    </div>
  );
}