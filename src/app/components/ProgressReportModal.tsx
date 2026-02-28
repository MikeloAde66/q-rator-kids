import { useState } from 'react';
import { X, Mail, Calendar, TrendingUp, Award, Clock, BookOpen, FileText, Palette } from 'lucide-react';
import { useShare } from '../contexts/ShareContext';
import { useAuth } from '../contexts/AuthContext';
import type { ProgressReport } from '../contexts/ShareContext';

interface ProgressReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProgressReportModal({ isOpen, onClose }: ProgressReportModalProps) {
  const { activeChildProfile } = useAuth();
  const { generateProgressReport, emailProgressReport, getSavedReports } = useShare();
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | 'all'>('week');
  const [currentReport, setCurrentReport] = useState<ProgressReport | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  
  if (!isOpen || !activeChildProfile) return null;
  
  const handleGenerateReport = () => {
    const now = new Date();
    let startDate = new Date();
    
    switch (selectedRange) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'all':
        startDate = new Date('2020-01-01'); // Far past date
        break;
    }
    
    const report = generateProgressReport(activeChildProfile.id, {
      start: startDate.toISOString(),
      end: now.toISOString(),
    });
    
    setCurrentReport(report);
  };
  
  const handleEmailReport = async () => {
    if (!currentReport || !recipientEmail || !recipientName) {
      setMessage('Please fill in all fields');
      return;
    }
    
    const result = await emailProgressReport(currentReport.id, recipientEmail, recipientName);
    setMessage(result.message);
    
    if (result.success) {
      setTimeout(() => {
        setShowEmailForm(false);
        setRecipientEmail('');
        setRecipientName('');
      }, 2000);
    }
  };
  
  const savedReports = getSavedReports(activeChildProfile.id);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border-4 border-purple-200">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Progress Report</h2>
                <p className="text-purple-100">See {activeChildProfile.name}'s amazing growth! 🌟</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Generate New Report */}
          <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
            <h3 className="font-bold text-xl text-purple-900 mb-4">Generate New Report</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-purple-900 mb-2">Time Period</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'week', label: 'Past Week', icon: Calendar },
                    { value: 'month', label: 'Past Month', icon: Calendar },
                    { value: 'all', label: 'All Time', icon: Clock },
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setSelectedRange(option.value as any)}
                        className={`flex items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all duration-200 ${
                          selectedRange === option.value
                            ? 'bg-purple-500 text-white shadow-lg scale-105'
                            : 'bg-white text-purple-900 hover:bg-purple-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button
                onClick={handleGenerateReport}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Generate Report 📊
              </button>
            </div>
          </div>
          
          {/* Current Report */}
          {currentReport && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-blue-900">
                  {currentReport.childName}'s Progress 🎨
                </h3>
                <button
                  onClick={() => setShowEmailForm(!showEmailForm)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Report
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">
                    {currentReport.totalMinutes}
                  </div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                
                <div className="bg-white rounded-xl p-4 text-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">
                    {currentReport.lessonsCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                
                <div className="bg-white rounded-xl p-4 text-center">
                  <FileText className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">
                    {currentReport.storiesCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Stories</div>
                </div>
                
                <div className="bg-white rounded-xl p-4 text-center">
                  <Palette className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pink-900">
                    {currentReport.assignmentsCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
              </div>
              
              {currentReport.skillsMastered.length > 0 && (
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-bold text-gray-900">Skills Mastered</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentReport.skillsMastered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-900 rounded-full text-sm font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Email Form */}
              {showEmailForm && (
                <div className="mt-4 bg-white rounded-xl p-4 space-y-3">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Email to Grandparents or Family 📧
                  </h4>
                  
                  <div>
                    <label className="block font-bold text-sm text-gray-700 mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Grandma Smith"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-bold text-sm text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="grandma@example.com"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <button
                    onClick={handleEmailReport}
                    className="w-full bg-green-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
                  >
                    Send Email 📨
                  </button>
                  
                  {message && (
                    <div className="p-3 bg-blue-100 text-blue-900 rounded-xl text-sm font-bold text-center">
                      {message}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Saved Reports */}
          {savedReports.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <h3 className="font-bold text-xl text-gray-900 mb-4">
                Previous Reports ({savedReports.length})
              </h3>
              <div className="space-y-3">
                {savedReports.slice(0, 5).map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="font-bold text-gray-900">
                        {new Date(report.dateRange.start).toLocaleDateString()} - {new Date(report.dateRange.end).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {report.lessonsCompleted} lessons, {report.totalMinutes} minutes
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentReport(report)}
                      className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg font-bold hover:bg-purple-200 transition-colors"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
