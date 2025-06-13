import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import GradientActionCards from '../components/Departments';
import { AxiosInstance1, AxiosInstance4 } from '../api/Axios';
import Schedules from '../components/Schedules';

export default function Deans() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(7);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);


  const fetchStaff = async () => {
    try {
      const response = await AxiosInstance1.get('school_staff/');
      setStaffList(response.data);
      setFilteredStaff(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setLoading(false);
    }
  }


  const fetchStudents = async () => {
    try {
      const response = await AxiosInstance4.get('students/');
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students data:", error);
    }
  }

  useEffect(() => {
    fetchStaff();
    fetchStudents();
  }
    , []);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = staffList.filter(
      staff =>
        staff.first_name.toLowerCase().includes(lowerTerm) ||
        staff.last_name.toLowerCase().includes(lowerTerm) ||
        staff.email.toLowerCase().includes(lowerTerm) ||
        staff.department.toLowerCase().includes(lowerTerm)
    );
    setFilteredStaff(filtered);
  }, [searchTerm, staffList]);

  const departmentMap = staffList.reduce((acc, staff) => {
  const dept = staff.department || 'Unassigned';
  if (!acc[dept]) {
    acc[dept] = [];
  }
  acc[dept].push({
    name: `${staff.first_name} ${staff.last_name}`,
    position: staff.position,
  });
  return acc;
}, {});

  // Badge colors for department
  const getDeptColor = (department) => {
    switch (department.toLowerCase()) {
      case 'literature':
        return 'bg-purple-100 text-purple-700';
      case 'sciences':
        return 'bg-green-100 text-green-700';
      case 'humanities':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };



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
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const departmentsBg = {
    background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)'
  };

  const navigate = useNavigate()
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
                { id: 'teachers', icon: Users, label: 'Teachers', badge: staffList.length },
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
                  className={`w-full flex items-center justify-between px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-200 text-sm lg:text-base ${activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-white/80 hover:text-gray-900 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <item.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="font-medium hidden sm:block lg:block">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold hidden lg:block ${activeTab === item.id ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
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
                  {
                    title: 'Total Teachers',
                    value: staffList.length,
                    icon: Users,
                    color: 'from-blue-500 to-cyan-500',
                    change: `+${staffList.filter(staff => {
                      const joinDate = new Date(staff.date_of_joining);
                      const now = new Date();
                      return (
                        joinDate.getMonth() === now.getMonth() &&
                        joinDate.getFullYear() === now.getFullYear()
                      );
                    }).length} this month`
                  },
                  {
                    title: 'Total Students',
                    value: students.length, // replace with actual dynamic count if available
                    icon: GraduationCap,
                    color: 'from-green-500 to-teal-500',
                    change: `+${students.filter(staff => {
                      const joinDate = new Date(staff.date_of_joining);
                      const now = new Date();
                      return (
                        joinDate.getMonth() === now.getMonth() &&
                        joinDate.getFullYear() === now.getFullYear()
                      );
                    }).length} this month`
                  },
                  {
                    title: 'Departments',
                    value: new Set(staffList.map(s => s.department)).size,
                    icon: Building,
                    color: 'from-purple-500 to-pink-500',
                    change: 'All active'
                  },
                  {
                    title: 'Avg Performance',
                    value: '88.5%', // replace with real value if you have performance data
                    icon: TrendingUp,
                    color: 'from-orange-500 to-red-500',
                    change: '+2.1% this quarter'
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
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

  <div className="space-y-6">
    {Object.entries(
      staffList.reduce((acc, staff) => {
        const dept = staff.department || 'Unassigned';
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(staff);
        return acc;
      }, {})
    ).map(([department, staffArray], index) => (
      <div
        key={index}
        className="bg-gradient-to-r from-white to-indigo-50 border border-indigo-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-semibold text-indigo-700">{department}</h4>
          <span className="text-sm font-medium text-gray-600">{staffArray.length} {staffArray.length === 1 ? 'Teacher' : 'Teachers'}</span>
        </div>

        <ul className="divide-y divide-indigo-100">
          {staffArray.map((staff, idx) => (
            <li key={idx} className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full font-semibold text-sm uppercase">
                  {staff.first_name?.charAt(0)}{staff.last_name?.charAt(0)}
                </div>
                <span className="text-gray-800 font-medium">{staff.first_name} {staff.last_name}</span>
              </div>
              <span className="text-sm text-gray-500 italic">{staff.position}</span>
            </li>
          ))}
        </ul>
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
                  {/* 🔍 Search Term Input */}
                  <input
                    type="text"
                    placeholder="Search staff..."
                    className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <button className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-white/70 border border-white/30 rounded-xl hover:bg-white/90 transition-all duration-200 text-sm lg:text-base">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:block">Filter</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-white/70 border border-white/30 rounded-xl hover:bg-white/90 transition-all duration-200 text-sm lg:text-base">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:block">Export</span>
                  </button>

                  <button
                    onClick={() => navigate('/staff-admin')}
                    className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm lg:text-base"
                  >
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
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">#</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">First Name</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Last Name</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base hidden sm:table-cell">Email</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base hidden md:table-cell">Phone Number</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">ID Number</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base hidden lg:table-cell">Date of Birth</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Date of Joining</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Position</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Department</th>
                        <th className="text-left p-3 lg:p-4 font-semibold text-gray-700 text-sm lg:text-base">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.map((staff, index) => (
                        <tr key={staff.id} className="border-b border-white/20 hover:bg-white/50 transition-all duration-200">
                          <td className="p-3 lg:p-4 text-gray-700 font-medium">{index + 1}</td>
                          <td className="p-3 lg:p-4 text-gray-700">{staff.first_name}</td>
                          <td className="p-3 lg:p-4 text-gray-700">{staff.last_name}</td>
                          <td className="p-3 lg:p-4 text-gray-700 hidden sm:table-cell">{staff.email}</td>
                          <td className="p-3 lg:p-4 text-gray-700 hidden md:table-cell">{staff.phone_number}</td>
                          <td className="p-3 lg:p-4 text-gray-700">{staff.id_number}</td>
                          <td className="p-3 lg:p-4 text-gray-700 hidden lg:table-cell">{staff.date_of_birth}</td>
                          <td className="p-3 lg:p-4 text-gray-700">{staff.date_of_joining}</td>
                          <td className="p-3 lg:p-4 text-gray-700">{staff.position}</td>
                          <td className="p-3 lg:p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeptColor(staff.department)}`}>
                              {staff.department}
                            </span>
                          </td>
                          <td className="p-3 lg:p-4">
                            <div className="flex items-center space-x-1 lg:space-x-2">
                              <button className="p-1.5 lg:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 lg:p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 lg:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                                <MessageSquare className="w-4 h-4" />
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


          {activeTab === 'schedule' && (
            <>
              <Schedules/>
            </>
          )
            
          }

          {activeTab === 'departments' && (
            <div className="space-y-6">
              {/* Teacher Management Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Teacher & Departments Management</h2>
                  <p className="text-gray-600 text-sm lg:text-base">Monitor and manage teaching staff, classes and academic departments</p>
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
                  <button onClick={() => navigate('/staff-admin')} className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm lg:text-base">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:block">Add Teacher</span>
                  </button>
                </div>
              </div>

              {/* Teachers Table */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl h-screen p-4">
                <h2 className='p-2 font-bold underline'>Class & Departments</h2>
                <GradientActionCards setClasses={setClasses} setDepartments={setDepartments} />

                {classes.length > 0 && (
                  <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <h3 className='p-3 font-bold text-gray-500'>Recently added Classes</h3>
                    <button
                      onClick={() => handleMoreOptions(cls.id)}
                      className="text-gray-600 hover:text-gray-800 transition-colors p-1.5 hover:bg-gray-50 rounded-lg ml-[1500px] mt-[-70px]"
                      title="More Options"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Class Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Capacity
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Teacher
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Subjects
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Grade
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {classes.map((cls, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors duration-200 group"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {cls.class_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {cls.class_capacity}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {cls.class_teacher}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {cls.total_subjects}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                              {cls.grade_level}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEdit(cls.id)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 hover:bg-blue-50 rounded-lg"
                                  title="Edit Class"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDelete(cls.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                                  title="Delete Class"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleView(cls.id)}
                                  className="text-green-600 hover:text-green-800 transition-colors p-1.5 hover:bg-green-50 rounded-lg"
                                  title="View Class Details"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </button>

                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {departments.length > 0 && (
                  <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <h3 className='p-3 font-bold text-gray-500'>Recently added Classes</h3>
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Department Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Department Role
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Dean
                          </th>

                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {departments.map((cls, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-colors duration-200 group"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {cls.department_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {cls.department_role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {cls.dean}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}







          {activeTab !== 'overview' && activeTab !== 'departments' && activeTab !== 'teachers' && activeTab !== 'schedule' && (
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