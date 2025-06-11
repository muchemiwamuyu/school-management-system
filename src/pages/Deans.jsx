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
  Star,
  UserCheck,
  GraduationCap,
  Building,
  Target,
  Eye,
  Edit,
  Trash2,
  Shield,
  ChevronDown,
  Filter,
  Download
} from 'lucide-react';

export default function Deans() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(7);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teacherData = [
    { 
      id: 1, 
      name: 'Ms. Sarah Johnson', 
      subject: 'Mathematics', 
      classes: 5, 
      students: 142, 
      performance: 89, 
      status: 'active',
      attendance: 98,
      lastActive: '2 hours ago',
      email: 'sarah.johnson@school.edu'
    },
    { 
      id: 2, 
      name: 'Dr. Michael Chen', 
      subject: 'Physics', 
      classes: 4, 
      students: 96, 
      performance: 92, 
      status: 'active',
      attendance: 100,
      lastActive: '1 hour ago',
      email: 'michael.chen@school.edu'
    },
    { 
      id: 3, 
      name: 'Ms. Emily Rodriguez', 
      subject: 'Chemistry', 
      classes: 6, 
      students: 158, 
      performance: 85, 
      status: 'warning',
      attendance: 94,
      lastActive: '30 min ago',
      email: 'emily.rodriguez@school.edu'
    },
    { 
      id: 4, 
      name: 'Mr. David Wilson', 
      subject: 'Biology', 
      classes: 3, 
      students: 78, 
      performance: 87, 
      status: 'active',
      attendance: 96,
      lastActive: '4 hours ago',
      email: 'david.wilson@school.edu'
    },
  ];

  const departmentStats = [
    { name: 'Mathematics', teachers: 8, students: 340, avgPerformance: 87, budget: 45000 },
    { name: 'Sciences', teachers: 12, students: 456, avgPerformance: 89, budget: 78000 },
    { name: 'Languages', teachers: 6, students: 289, avgPerformance: 91, budget: 32000 },
    { name: 'Social Studies', teachers: 5, students: 198, avgPerformance: 85, budget: 28000 },
  ];

  const recentAlerts = [
    { type: 'urgent', message: 'Teacher absence: Ms. Rodriguez needs substitute', time: '15 min ago', department: 'Chemistry' },
    { type: 'info', message: 'New curriculum proposal submitted by Math dept', time: '1 hour ago', department: 'Mathematics' },
    { type: 'warning', 'message': 'Budget threshold reached for Science equipment', time: '2 hours ago', department: 'Sciences' },
    { type: 'success', message: 'Performance review completed for 5 teachers', time: '3 hours ago', department: 'All' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'urgent': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                  Dean Portal
                </h1>
                <p className="text-sm text-gray-600">Administrative Control Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search teachers, departments..." 
                  className="pl-10 pr-4 py-2 w-full sm:w-64 lg:w-80 bg-white/70 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
              
              <button className="relative p-3 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all duration-200 border border-white/30 shadow-md">
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse font-bold">
                    {notifications}
                  </span>
                )}
              </button>
              
              <button className="p-3 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all duration-200 border border-white/30 shadow-md">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <span className="text-white font-bold">DR</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 bg-white/70 backdrop-blur-lg border-r border-white/20 lg:min-h-screen p-4 lg:p-6 shadow-xl">
          <nav className="space-y-2">
            <div className="lg:hidden mb-4">
              <button 
                className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl"
                onClick={() => setActiveTab(activeTab)}
              >
                <span className="font-medium">Menu</span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-2">
            {[
              { id: 'overview', icon: BarChart3, label: 'Overview', badge: null },
              { id: 'teachers', icon: Users, label: 'Teachers', badge: teacherData.length },
              { id: 'departments', icon: Building, label: 'Departments', badge: departmentStats.length },
              { id: 'performance', icon: Target, label: 'Performance Analytics', badge: null },
              { id: 'schedule', icon: Calendar, label: 'Schedule Oversight', badge: null },
              { id: 'reports', icon: FileText, label: 'Reports & Analytics', badge: null },
              { id: 'messages', icon: MessageSquare, label: 'Communications', badge: 12 },
              { id: 'resources', icon: GraduationCap, label: 'Resources', badge: null },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-200 text-sm lg:text-base ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white/80 hover:text-gray-900 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="font-medium hidden sm:block lg:block">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold hidden lg:block ${
                    activeTab === item.id ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 lg:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                {[
                  { title: 'Total Teachers', value: '47', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+3 this month' },
                  { title: 'Total Students', value: '1,847', icon: GraduationCap, color: 'from-green-500 to-teal-500', change: '+127 this term' },
                  { title: 'Departments', value: '12', icon: Building, color: 'from-purple-500 to-pink-500', change: 'All active' },
                  { title: 'Avg Performance', value: '88.5%', icon: TrendingUp, color: 'from-orange-500 to-red-500', change: '+2.1% this quarter' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                        <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                      </div>
                      <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                {/* Department Overview */}
                <div className="xl:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Department Overview</h3>
                    <Building className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="space-y-4">
                    {departmentStats.map((dept, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-white/30 hover:shadow-lg transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                          <span className="text-sm font-medium text-indigo-600">{dept.avgPerformance}% avg</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">{dept.teachers}</span> teachers
                          </div>
                          <div>
                            <span className="font-medium">{dept.students}</span> students
                          </div>
                          <div>
                            <span className="font-medium">${dept.budget.toLocaleString()}</span> budget
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">System Alerts</h3>
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, index) => (
                      <div key={index} className={`p-3 rounded-xl border-l-4 ${getAlertColor(alert.type)} transition-all duration-200 hover:shadow-md`}>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-75">{alert.department}</span>
                          <span className="text-xs opacity-75">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="space-y-6">
              {/* Teacher Management Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Teacher Management</h2>
                  <p className="text-gray-600 text-sm lg:text-base">Monitor and manage teaching staff</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                  <button className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-white/70 border border-white/30 rounded-xl hover:bg-white/90 transition-all duration-200 text-sm lg:text-base">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:block">Filter</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-white/70 border border-white/30 rounded-xl hover:bg-white/90 transition-all duration-200 text-sm lg:text-base">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:block">Export</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm lg:text-base">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:block">Add Teacher</span>
                  </button>
                </div>
              </div>

              {/* Teachers Table */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-white/30">
                      <tr>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Teacher</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Subject</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base hidden sm:table-cell">Classes</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base hidden md:table-cell">Students</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Performance</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base hidden lg:table-cell">Attendance</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Status</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacherData.map((teacher) => (
                        <tr key={teacher.id} className="border-b border-white/20 hover:bg-white/50 transition-all duration-200">
                          <td className="p-3 lg:p-4">
                            <div className="flex items-center space-x-2 lg:space-x-3">
                              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-base">
                                {teacher.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-gray-800 text-sm lg:text-base truncate">{teacher.name}</p>
                                <p className="text-xs lg:text-sm text-gray-500 truncate hidden sm:block">{teacher.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 lg:p-4 text-gray-700 font-medium text-sm lg:text-base">{teacher.subject}</td>
                          <td className="p-3 lg:p-4 text-gray-700 text-sm lg:text-base hidden sm:table-cell">{teacher.classes}</td>
                          <td className="p-3 lg:p-4 text-gray-700 text-sm lg:text-base hidden md:table-cell">{teacher.students}</td>
                          <td className="p-3 lg:p-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-800 text-sm lg:text-base">{teacher.performance}%</span>
                              <div className="w-12 lg:w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
                                  style={{ width: `${teacher.performance}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 lg:p-4 hidden lg:table-cell">
                            <span className={`font-semibold text-sm lg:text-base ${teacher.attendance >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {teacher.attendance}%
                            </span>
                          </td>
                          <td className="p-3 lg:p-4">
                            <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                              {teacher.status}
                            </span>
                          </td>
                          <td className="p-3 lg:p-4">
                            <div className="flex items-center space-x-1 lg:space-x-2">
                              <button className="p-1.5 lg:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                              </button>
                              <button className="p-1.5 lg:p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                                <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                              </button>
                              <button className="p-1.5 lg:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                                <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'teachers' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Building className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h3>
              <p className="text-gray-600">Administrative tools and controls for this section are being prepared.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}