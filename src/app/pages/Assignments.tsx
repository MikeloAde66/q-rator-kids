import { motion } from "motion/react";
import { Download, CheckCircle2, Clock, Palette, Lock } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { lessons } from "../data/lessons";
import { Link } from "react-router";
import { useSubscription } from "../contexts/SubscriptionContext";

export function Assignments() {
  const { hasAccessToContent } = useSubscription();
  
  // FREE VERSION: 3 assignments from free lessons
  const freeAssignments = ['beginner-1', 'beginner-2', 'intermediate-1'];
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Practice Assignments
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Download and print these fun worksheets to practice what you've learned! 
          Grab your art supplies and let's create!
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {lessons.filter(l => l.level === 'beginner').length}
          </div>
          <div className="text-sm text-gray-600">Beginner Assignments</div>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {lessons.filter(l => l.level === 'intermediate').length}
          </div>
          <div className="text-sm text-gray-600">Intermediate Assignments</div>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {lessons.filter(l => l.level === 'advanced').length}
          </div>
          <div className="text-sm text-gray-600">Advanced Assignments</div>
        </Card>
      </div>

      {/* Beginner Assignments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
          Beginner Assignments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.filter(l => l.level === 'beginner').map((lesson, index) => {
            const isFree = freeAssignments.includes(lesson.id);
            const isLocked = !isFree && !hasAccessToContent;
            
            return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isLocked ? (
                <Card className="p-5 hover:shadow-lg transition-shadow bg-white border-2 border-gray-200 relative overflow-hidden">
                  {/* Lock Overlay */}
                  <div className="absolute inset-0 bg-gray-900/60 z-10 flex items-center justify-center backdrop-blur-sm cursor-pointer"
                    onClick={() => window.location.href = '/subscription'}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white mx-auto mb-2"
                      >
                        <Lock className="w-8 h-8 text-white" />
                      </motion.div>
                      <p className="text-white font-black">🔒 Locked</p>
                      <Button size="sm" className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl">
                        Unlock! 👑
                      </Button>
                    </div>
                  </div>
                  
                  {/* Grayed Content */}
                  <div className="flex items-start gap-4 opacity-40">
                    <img
                      src={lesson.artBuddyImage}
                      alt={lesson.artBuddyName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-200 grayscale"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold text-lg text-gray-800">
                        {lesson.assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        From: {lesson.title}
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
              <Card className="p-5 hover:shadow-lg transition-shadow bg-white border-2 border-green-100 relative">
                {/* FREE Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-2 border-white font-black text-xs">
                    ✨ FREE!
                  </Badge>
                </div>
                
                <div className="flex items-start gap-4">
                  <img
                    src={lesson.artBuddyImage}
                    alt={lesson.artBuddyName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-lg text-gray-800">
                      {lesson.assignment.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      From: {lesson.title}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {lesson.assignment.materials.slice(0, 3).map((material) => (
                        <Badge key={material} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 gap-1">
                        <Download className="w-3 h-3" />
                        Download PDF
                      </Button>
                      <Link to={`/lessons/beginner/${lesson.id}`}>
                        <Button size="sm" variant="outline">
                          View Lesson
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
              )}
            </motion.div>
          );
          })}
        </div>
      </div>

      {/* Intermediate Assignments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
          Intermediate Assignments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.filter(l => l.level === 'intermediate').map((lesson, index) => {
            const isFree = freeAssignments.includes(lesson.id);
            const isLocked = !isFree && !hasAccessToContent;
            
            return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {isLocked ? (
                <Card className="p-5 hover:shadow-lg transition-shadow bg-white border-2 border-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/60 z-10 flex items-center justify-center backdrop-blur-sm cursor-pointer"
                    onClick={() => window.location.href = '/subscription'}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white mx-auto mb-2"
                      >
                        <Lock className="w-8 h-8 text-white" />
                      </motion.div>
                      <p className="text-white font-black">🔒 Locked</p>
                      <Button size="sm" className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl">
                        Unlock! 👑
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 opacity-40">
                    <img
                      src={lesson.artBuddyImage}
                      alt={lesson.artBuddyName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 grayscale"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold text-lg text-gray-800">
                        {lesson.assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        From: {lesson.title}
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
              <Card className="p-5 hover:shadow-lg transition-shadow bg-white border-2 border-blue-100 relative">
                <div className="absolute top-2 right-2">
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-2 border-white font-black text-xs">
                    ✨ FREE!
                  </Badge>
                </div>
                <div className="flex items-start gap-4">
                  <img
                    src={lesson.artBuddyImage}
                    alt={lesson.artBuddyName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-lg text-gray-800">
                      {lesson.assignment.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      From: {lesson.title}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {lesson.assignment.materials.slice(0, 3).map((material) => (
                        <Badge key={material} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 gap-1">
                        <Download className="w-3 h-3" />
                        Download PDF
                      </Button>
                      <Link to={`/lessons/intermediate/${lesson.id}`}>
                        <Button size="sm" variant="outline">
                          View Lesson
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
              )}
            </motion.div>
          );
          })}
        </div>
      </div>

      {/* Advanced Assignments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          Advanced Assignments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.filter(l => l.level === 'advanced').map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-5 hover:shadow-lg transition-shadow bg-white border-2 border-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/60 z-10 flex items-center justify-center backdrop-blur-sm cursor-pointer"
                  onClick={() => window.location.href = '/subscription'}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white mx-auto mb-2"
                    >
                      <Lock className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-white font-black">🔒 Locked</p>
                    <Button size="sm" className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl">
                      Unlock! 👑
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4 opacity-40">
                  <img
                    src={lesson.artBuddyImage}
                    alt={lesson.artBuddyName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-200 grayscale"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-lg text-gray-800">
                      {lesson.assignment.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      From: {lesson.title}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-3xl p-8 border-2 border-orange-200"
      >
        <div className="text-center space-y-3">
          <Palette className="w-12 h-12 mx-auto text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Tips for Parents & Teachers
          </h2>
          <div className="text-left max-w-2xl mx-auto space-y-2 text-gray-700">
            <p>📝 Print assignments on regular printer paper or cardstock</p>
            <p>🎨 Have all materials ready before starting</p>
            <p>⏰ Allow plenty of time - don't rush creativity!</p>
            <p>🌟 Celebrate every creation, regardless of the result</p>
            <p>📸 Take photos to track progress over time</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}