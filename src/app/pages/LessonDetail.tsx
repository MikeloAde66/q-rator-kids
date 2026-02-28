import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Download, Clock, Award, CheckCircle2, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { getLessonById } from "../data/lessons";
import { VideoPlayer } from "../components/VideoPlayer";
import { ShareArtworkButton } from "../components/ShareArtworkButton";
import { useActivity } from "../contexts/ActivityContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export function LessonDetail() {
  const { lessonId } = useParams();
  const lesson = getLessonById(lessonId || '');
  const [isCompleted, setIsCompleted] = useState(false);
  const { trackLessonComplete } = useActivity();
  const { activeChildProfile } = useAuth();

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Lesson not found</h2>
        <Link to="/lessons">
          <Button className="mt-4">Back to Lessons</Button>
        </Link>
      </div>
    );
  }

  const levelColors = {
    beginner: 'from-green-400 to-emerald-400',
    intermediate: 'from-blue-400 to-cyan-400',
  };

  const levelEmoji = {
    beginner: '🖍️',
    intermediate: '✏️',
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    // Track lesson completion with skills
    if (lesson) {
      trackLessonComplete(lessonId || '', lesson.skills);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <Link to="/lessons">
        <Button variant="ghost" className="gap-2 text-lg">
          <ArrowLeft className="w-5 h-5" />
          Back to Lessons
        </Button>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge className={`bg-gradient-to-r ${levelColors[lesson.level]} text-white border-4 border-white px-6 py-2 text-lg font-black shadow-lg`}>
            {levelEmoji[lesson.level]} {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
          </Badge>
          <Badge className="bg-purple-100 border-2 border-purple-300 text-purple-700 px-4 py-2">
            <Clock className="w-4 h-4 mr-1" />
            {lesson.duration}
          </Badge>
          <Badge className="bg-yellow-100 border-2 border-yellow-300 text-yellow-700 px-4 py-2">
            {lesson.ageRange}
          </Badge>
          {(isCompleted || lesson.completed) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Badge className="bg-green-500 text-white border-4 border-white px-4 py-2 gap-1 shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                Done!
              </Badge>
            </motion.div>
          )}
        </div>

        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          {lesson.title}
        </h1>

        <div className="flex items-center gap-4 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-3xl border-4 border-purple-200">
          <img
            src={lesson.artBuddyImage}
            alt={lesson.artBuddyName}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div>
            <p className="text-sm text-purple-600 font-bold">Your Teacher:</p>
            <p className="font-black text-2xl text-purple-700">{lesson.artBuddyName}</p>
          </div>
        </div>

        <Card className="p-6 bg-white border-4 border-purple-200 rounded-3xl">
          <p className="text-xl text-gray-700 font-semibold">
            {lesson.description}
          </p>
        </Card>
      </motion.div>

      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <VideoPlayer
          videoUrl={lesson.videoUrl}
          title={lesson.title}
        />
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 border-8 border-purple-300 rounded-3xl">
          <h2 className="text-4xl font-black text-gray-800 mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Award className="w-10 h-10 text-purple-600" />
            </motion.div>
            What You'll Learn! 🌟
          </h2>
          <div className="flex flex-wrap gap-3">
            {lesson.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                <Badge className="bg-white text-purple-700 border-4 border-purple-200 px-5 py-3 text-lg font-black shadow-lg">
                  ✨ {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Assignment Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-8 bg-gradient-to-br from-orange-100 to-pink-100 border-8 border-orange-300 rounded-3xl">
          <h2 className="text-4xl font-black text-gray-800 mb-6 flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Download className="w-10 h-10 text-orange-600" />
            </motion.div>
            Download Your Assignment! 📄
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border-4 border-orange-200">
              <h3 className="font-black text-2xl text-gray-800 mb-3">
                {lesson.assignment.title}
              </h3>
              <p className="text-gray-700 text-lg font-semibold">
                Print this out and practice what you learned! It's super fun! 🎨
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border-4 border-orange-200">
              <p className="font-black text-xl text-gray-700 mb-4">What You Need:</p>
              <div className="flex flex-wrap gap-3">
                {lesson.assignment.materials.map((material) => (
                  <Badge key={material} className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-2 border-orange-300 px-4 py-2 text-base font-bold">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white gap-3 text-xl px-10 py-7 rounded-3xl shadow-xl border-4 border-white font-black w-full md:w-auto">
                <Download className="w-6 h-6" />
                Download & Print!
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Progress Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        {!isCompleted && !lesson.completed && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={handleMarkComplete}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 gap-3 text-xl px-10 py-7 rounded-3xl shadow-xl border-4 border-white font-black"
            >
              <CheckCircle2 className="w-6 h-6" />
              I Finished! 🎉
            </Button>
          </motion.div>
        )}
        
        <Link to="/lessons">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" className="text-xl px-10 py-7 rounded-3xl border-4 border-purple-300 font-black hover:bg-purple-50">
              More Lessons!
            </Button>
          </motion.div>
        </Link>
      </motion.div>

      {/* Encouragement */}
      {(isCompleted || lesson.completed) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 border-8 border-white shadow-2xl text-center space-y-6"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-16 h-16 mx-auto text-white fill-white mb-4" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            AWESOME JOB! 🎉
          </h2>
          <p className="text-2xl text-white font-bold">
            You finished the lesson! You're becoming a GREAT artist! ⭐
          </p>
          
          {/* Share Button */}
          <div className="pt-4">
            <ShareArtworkButton 
              artworkType="lesson"
              artworkId={lessonId || ''}
              artworkTitle={lesson.title}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}