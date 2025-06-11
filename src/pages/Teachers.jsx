import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Settings, 
  Search,
  Plus,
  TrendingUp,
  Clock,
  Award,
  FileText,
  Video,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

export default function Teachers() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Mathematics', class: 'Grade 8A', room: 'Room 101' },
    { time: '11:30 AM', subject: 'Physics', class: 'Grade 10B', room: 'Lab 2' },
    { time: '02:00 PM', subject: 'Chemistry', class: 'Grade 9C', room: 'Lab 1' },
  ];

  const recentActivity = [
    { type: 'assignment', text: 'New assignment submitted by Sarah Johnson', time: '5 min ago' },
    { type: 'message', text: 'Parent meeting request from Mike\'s mother', time: '15 min ago' },
    { type: 'grade', text: 'Quiz grades need review for Grade 9A', time: '1 hour ago' },
  ];

  const classStats = [
    { subject: 'Mathematics', students: 28, avgGrade: 85, trend: 'up' },
    { subject: 'Physics', students: 24, avgGrade: 78, trend: 'up' },
    { subject: 'Chemistry', students: 26, avgGrade: 82, trend: 'down' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduDash
                </h1>
                <p className="text-sm text-gray-600">Welcome back, Ms. Anderson</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search students, classes..." 
                  className="pl-10 pr-4 py-2 bg-white/70 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              
              <button className="relative p-2 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all duration-200 border border-white/30">
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
              
              <button className="p-2 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all duration-200 border border-white/30">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <span className="text-white font-semibold">MA</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/60 backdrop-blur-lg border-r border-white/20 min-h-screen p-6">
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: BarChart3, label: 'Overview' },
              { id: 'classes', icon: Users, label: 'My Classes' },
              { id: 'schedule', icon: Calendar, label: 'Schedule' },
              { id: 'assignments', icon: FileText, label: 'Assignments' },
              { id: 'messages', icon: MessageSquare, label: 'Messages' },
              { id: 'resources', icon: Video, label: 'Resources' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-white/70 hover:text-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Total Students', value: '156', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
                  { title: 'Classes Today', value: '6', icon: Calendar, color: 'from-green-500 to-teal-500', change: '+2' },
                  { title: 'Assignments Due', value: '23', icon: FileText, color: 'from-orange-500 to-red-500', change: '-5' },
                  { title: 'Avg Performance', value: '85%', icon: TrendingUp, color: 'from-purple-500 to-pink-500', change: '+3%' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                        <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Today's Schedule</h3>
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="space-y-4">
                    {upcomingClasses.map((class_, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-all duration-200">
                        <div className="w-2 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800">{class_.subject}</h4>
                            <span className="text-sm font-medium text-blue-600">{class_.time}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{class_.class} • {class_.room}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
                    <Bell className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-200 border border-white/30">
                        <div className="flex items-start space-x-4">
                          <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                            activity.type === 'assignment' ? 'bg-blue-500' : 
                            activity.type === 'message' ? 'bg-green-500' : 'bg-orange-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 text-sm font-medium leading-relaxed">{activity.text}</p>
                            <p className="text-gray-500 text-xs mt-2">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Class Performance */}
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Class Performance</h3>
                  <Award className="w-5 h-5 text-gray-600" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {classStats.map((stat, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-white/80 to-gray-50/80 rounded-xl border border-white/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{stat.subject}</h4>
                        <div className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                          <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{stat.students} students</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-800">{stat.avgGrade}%</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(stat.avgGrade / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h3>
              <p className="text-gray-600">This section is ready for your content!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}