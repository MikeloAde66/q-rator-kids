import { useAuth } from '../contexts/AuthContext';
import { useActivity } from '../contexts/ActivityContext';
import { useNavigate } from 'react-router';
import { AppStorePromoCard } from '../components/AppStorePromoCard';

export function ParentalDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, parentUser, childProfiles } = useAuth();
  const { 
    getAllChildrenProgress, 
    getChildProgress, 
    getTotalStats,
    parentalControls,
    updateParentalControls,
    checkTimeLimit,
  } = useActivity();

  const [selectedChildId, setSelectedChildId] = useState<string>(
    childProfiles && childProfiles.length > 0 ? childProfiles[0].id : ''
  );

  const dashboardRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated or not a parent
  if (!isAuthenticated || !parentUser) {
    setTimeout(() => navigate('/'), 100);
    return null;
  }

  // Safety check for child profiles
  if (!childProfiles || childProfiles.length === 0) {
    return (
      <div className="space-y-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4">
            <BarChart3 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Parental Dashboard
          </h1>
          <p className="text-xl text-gray-600 font-bold">
            Welcome, {parentUser.name}! 📊
          </p>
        </motion.div>

        <Card className="p-12 border-4 border-gray-200 bg-gray-50 text-center">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-2xl font-black text-gray-800 mb-2">
            No Child Profiles Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create a child profile to start tracking their learning journey!
          </p>
          <Button
            onClick={() => navigate('/account')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black rounded-xl"
          >
            Go to Account Settings
          </Button>
        </Card>
      </div>
    );
  }

  const totalStats = getTotalStats();
  const allProgress = getAllChildrenProgress();
  const selectedChildProgress = selectedChildId ? getChildProgress(selectedChildId) : null;
  const timeLimit = selectedChildId ? checkTimeLimit(selectedChildId) : null;

  // Chart colors
  const COLORS = {
    lessons: '#3b82f6',
    stories: '#a855f7',
    assignments: '#f97316',
    skills: '#10b981',
  };

  // Export as PDF (simplified - in production use a library like jsPDF or html2canvas)
  const handleExportPDF = () => {
    window.print();
  };

  // Share report (simplified)
  const handleShareReport = () => {
    const reportText = `
Q Rator Kids - Progress Report
Parent: ${parentUser.name}
Children: ${childProfiles.length}
Total Time: ${totalStats.totalMinutes} minutes
Lessons Completed: ${totalStats.totalLessons}
Stories Completed: ${totalStats.totalStories}
Assignments Completed: ${totalStats.totalAssignments}
Skills Learned: ${totalStats.uniqueSkills}
    `.trim();

    if (navigator.share) {
      navigator.share({
        title: 'Q Rator Kids Progress Report',
        text: reportText,
      });
    } else {
      navigator.clipboard.writeText(reportText);
      alert('Report copied to clipboard!');
    }
  };

  // Prepare weekly chart data
  const weeklyData = selectedChildProgress?.weeklyActivity.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    minutes: day.totalMinutes,
    lessons: day.lessonsCompleted,
    stories: day.storiesCompleted,
    assignments: day.assignmentsCompleted,
  })) || [];

  // Prepare completion data for pie chart
  const completionData = selectedChildProgress ? [
    { name: 'Lessons', value: selectedChildProgress.totalLessons, color: COLORS.lessons },
    { name: 'Stories', value: selectedChildProgress.totalStories, color: COLORS.stories },
    { name: 'Assignments', value: selectedChildProgress.totalAssignments, color: COLORS.assignments },
  ] : [];

  // Top skills
  const topSkills = selectedChildProgress?.skillsMastered.slice(0, 10) || [];

  return (
    <div ref={dashboardRef} className="space-y-8 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4">
          <BarChart3 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Parental Dashboard
        </h1>
        <p className="text-xl text-gray-600 font-bold">
          Track {parentUser.name}'s children's learning journey! 📊
        </p>
      </motion.div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-500 rounded-2xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-bold">Total Time</p>
                <p className="text-2xl font-black text-gray-800">{totalStats.totalMinutes}m</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 border-4 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-500 rounded-2xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-bold">Lessons</p>
                <p className="text-2xl font-black text-gray-800">{totalStats.totalLessons}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 border-4 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-orange-500 rounded-2xl">
                <FileImage className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-bold">Stories</p>
                <p className="text-2xl font-black text-gray-800">{totalStats.totalStories}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 border-4 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-500 rounded-2xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-bold">Skills</p>
                <p className="text-2xl font-black text-gray-800">{totalStats.uniqueSkills}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Child Selector & Export Actions */}
      <Card className="p-6 border-4 border-purple-200 bg-white">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <Label className="text-lg font-black text-gray-800 mb-2 block">
              Select Child Profile
            </Label>
            <Select value={selectedChildId} onValueChange={setSelectedChildId}>
              <SelectTrigger className="w-full md:w-64 border-2 border-purple-300 rounded-xl font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {childProfiles.map(child => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.avatar} {child.name} ({child.age}y)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleShareReport}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-black rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Share Report
            </Button>
            <Button
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* App Store Assets Promo */}
      <AppStorePromoCard />

      {selectedChildProgress && (
        <>
          {/* Time Limit Warning */}
          {timeLimit && parentalControls.dailyTimeLimitMinutes > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={`p-4 border-4 ${timeLimit.allowed ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                <div className="flex items-center gap-3">
                  <Timer className={`w-6 h-6 ${timeLimit.allowed ? 'text-green-600' : 'text-red-600'}`} />
                  <div>
                    <p className="font-black text-gray-800">
                      {timeLimit.allowed 
                        ? `${timeLimit.minutesRemaining} minutes remaining today` 
                        : 'Daily time limit reached'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Daily limit: {parentalControls.dailyTimeLimitMinutes} minutes
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 bg-white border-4 border-purple-300 p-2 h-auto gap-2 rounded-3xl">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-pink-400 data-[state=active]:text-white text-lg font-black py-3 rounded-2xl"
              >
                📊 Overview
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-cyan-400 data-[state=active]:text-white text-lg font-black py-3 rounded-2xl"
              >
                📈 Analytics
              </TabsTrigger>
              <TabsTrigger
                value="controls"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-yellow-400 data-[state=active]:text-white text-lg font-black py-3 rounded-2xl"
              >
                ⚙️ Controls
              </TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="space-y-6 mt-8">
              {/* Weekly Activity Chart */}
              <Card className="p-6 border-4 border-blue-200 bg-white">
                <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-500" />
                  7-Day Activity Report
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: '3px solid #a855f7',
                        fontWeight: 'bold'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="minutes" fill={COLORS.lessons} name="Minutes" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Content Completion */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-4 border-purple-200 bg-white">
                  <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-purple-500" />
                    Content Completed
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={completionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {completionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                {/* Skills Mastered */}
                <Card className="p-6 border-4 border-green-200 bg-white">
                  <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-green-500" />
                    Skills Mastered ({selectedChildProgress.skillsMastered.length})
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {topSkills.length > 0 ? topSkills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 p-3 bg-green-50 border-2 border-green-200 rounded-xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="font-bold text-gray-800">{skill}</span>
                      </motion.div>
                    )) : (
                      <p className="text-gray-500 text-center py-8">
                        No skills mastered yet. Keep learning! 🌟
                      </p>
                    )}
                  </div>
                </Card>
              </div>

              {/* Summary Stats */}
              <Card className="p-6 border-4 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                  Learning Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-4xl font-black text-blue-600">{selectedChildProgress.totalLessons}</p>
                    <p className="text-sm text-gray-600 font-bold">Lessons</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-purple-600">{selectedChildProgress.totalStories}</p>
                    <p className="text-sm text-gray-600 font-bold">Stories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-orange-600">{selectedChildProgress.totalAssignments}</p>
                    <p className="text-sm text-gray-600 font-bold">Assignments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-green-600">{Math.floor(selectedChildProgress.totalMinutes / 60)}h {selectedChildProgress.totalMinutes % 60}m</p>
                    <p className="text-sm text-gray-600 font-bold">Total Time</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* ANALYTICS TAB */}
            <TabsContent value="analytics" className="space-y-6 mt-8">
              {/* Daily Activity Line Chart */}
              <Card className="p-6 border-4 border-cyan-200 bg-white">
                <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-cyan-500" />
                  Daily Completion Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: '3px solid #06b6d4',
                        fontWeight: 'bold'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="lessons" stroke={COLORS.lessons} strokeWidth={3} name="Lessons" />
                    <Line type="monotone" dataKey="stories" stroke={COLORS.stories} strokeWidth={3} name="Stories" />
                    <Line type="monotone" dataKey="assignments" stroke={COLORS.assignments} strokeWidth={3} name="Assignments" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Engagement Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-black text-gray-800 mb-1">
                      {Math.round(selectedChildProgress.totalMinutes / 7)} min
                    </p>
                    <p className="text-sm text-gray-600 font-bold">Avg. Daily Time</p>
                  </div>
                </Card>

                <Card className="p-6 border-4 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-black text-gray-800 mb-1">
                      {selectedChildProgress.totalLessons + selectedChildProgress.totalStories + selectedChildProgress.totalAssignments}
                    </p>
                    <p className="text-sm text-gray-600 font-bold">Total Completed</p>
                  </div>
                </Card>

                <Card className="p-6 border-4 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-3xl font-black text-gray-800 mb-1">
                      {selectedChildProgress.skillsMastered.length}
                    </p>
                    <p className="text-sm text-gray-600 font-bold">Skills Learned</p>
                  </div>
                </Card>
              </div>

              {/* Last Active */}
              <Card className="p-6 border-4 border-orange-200 bg-white">
                <h3 className="text-2xl font-black text-gray-800 mb-2 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-orange-500" />
                  Last Activity
                </h3>
                <p className="text-gray-600 font-bold">
                  {selectedChildProgress.lastActiveDate 
                    ? new Date(selectedChildProgress.lastActiveDate).toLocaleString()
                    : 'No activity yet'}
                </p>
              </Card>
            </TabsContent>

            {/* PARENTAL CONTROLS TAB */}
            <TabsContent value="controls" className="space-y-6 mt-8">
              <Card className="p-6 border-4 border-orange-200 bg-white">
                <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-orange-500" />
                  Parental Controls
                </h3>

                <div className="space-y-8">
                  {/* Daily Time Limit */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-lg font-black text-gray-800">
                        Daily Time Limit
                      </Label>
                      <Badge className="bg-blue-500 text-white font-black">
                        {parentalControls.dailyTimeLimitMinutes === 0 
                          ? 'No Limit' 
                          : `${parentalControls.dailyTimeLimitMinutes} min`}
                      </Badge>
                    </div>
                    <Slider
                      value={[parentalControls.dailyTimeLimitMinutes]}
                      onValueChange={([value]) => updateParentalControls({ dailyTimeLimitMinutes: value })}
                      max={180}
                      step={15}
                      className="mb-2"
                    />
                    <p className="text-sm text-gray-600">
                      Set to 0 for no limit. Recommended: 30-60 minutes for ages 6-8, 60-90 minutes for ages 9-12.
                    </p>
                  </div>

                  {/* Content Filtering */}
                  <div>
                    <Label className="text-lg font-black text-gray-800 mb-3 block">
                      Content Filtering
                    </Label>
                    <Select 
                      value={parentalControls.contentFiltering} 
                      onValueChange={(value: any) => updateParentalControls({ contentFiltering: value })}
                    >
                      <SelectTrigger className="border-2 border-purple-300 rounded-xl font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Content (Ages 6-12)</SelectItem>
                        <SelectItem value="beginner-only">Beginner Only (Ages 6-8)</SelectItem>
                        <SelectItem value="intermediate-only">Intermediate Only (Ages 9-12)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600 mt-2">
                      Filter content by difficulty level
                    </p>
                  </div>

                  {/* Allow Downloads */}
                  <div className="flex items-center justify-between p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                    <div>
                      <Label className="text-lg font-black text-gray-800">
                        Allow Downloads
                      </Label>
                      <p className="text-sm text-gray-600">
                        Let children download and save their artwork
                      </p>
                    </div>
                    <Switch
                      checked={parentalControls.allowDownloads}
                      onCheckedChange={(checked) => updateParentalControls({ allowDownloads: checked })}
                    />
                  </div>

                  {/* Safety Notice */}
                  <Card className="p-4 border-4 border-green-200 bg-green-50">
                    <div className="flex gap-3">
                      <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-black text-gray-800 mb-1">Safety First! 🛡️</p>
                        <p className="text-sm text-gray-600">
                          Q Rator Kids is designed with child safety in mind. All content is age-appropriate, 
                          and we never collect personal information from children.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {!selectedChildProgress && (
        <Card className="p-12 border-4 border-gray-200 bg-gray-50 text-center">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-2xl font-black text-gray-800 mb-2">
            No Activity Yet
          </h3>
          <p className="text-gray-600">
            Once your child starts using Q Rator Kids, their progress will appear here!
          </p>
        </Card>
      )}
    </div>
  );
}