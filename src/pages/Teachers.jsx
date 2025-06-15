import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LogIn
} from 'lucide-react';
import { User, Mail, Phone, Briefcase } from 'lucide-react';

import { AxiosInstance1, AxiosInstance2, AxiosInstance4 } from '../api/Axios';

export default function Teachers() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    return `${first}${last}`;
  };

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

  const [storedName, setStoredName] = useState('');
  const [userClass, setUserClass] = useState([]);
  const [userStaff, setUserStaff] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
 



  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await AxiosInstance2.get('classes/'); // 🔁 Replace with your endpoint
        const allClasses = response.data;

        const loggedInUsername = localStorage.getItem('usersName');
        console.log("Logged-in username:", loggedInUsername);

        const foundClass = allClasses.filter(
          (cls) => cls.class_teacher.toLowerCase() === loggedInUsername.toLowerCase()
        );

        if (foundClass.length > 0) {
          console.log("Matched class:", foundClass);
          setUserClass(foundClass[0]); // Assuming you want the first matched class
        } else {
          console.warn("No class found for this teacher.");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    const fetchMeetings = async () => {
            try {
                const response = await AxiosInstance1.get('meetings/');
                setMeetings(response.data);
                console.log('Meeting data fetched successfully:', response.data);
            } catch (error) {
                console.error('Error fetching meeting data:', error);
                // toast.error('Failed to fetch meeting data');
            }
        }

    const fetchStaffData = async () => {
      try {
        const response = await AxiosInstance1.get('school_staff/'); // 
        const allStaff = response.data;

        const loggedInUsername = localStorage.getItem('usersName');

        const foundStaff = allStaff.filter(
          (staff) => staff.first_name.toLowerCase() === loggedInUsername.toLowerCase()
        );

        if (foundStaff) {
          setUserStaff(foundStaff);
          console.log("Matched staff:", foundStaff);
        } else {
          console.warn("No staff found for this username.");
        }

      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    }

    const fetchStudents = async () => {
      try {
        const response = await AxiosInstance4.get('students/');
        setAvailableStudents(response.data);
        console.log('Student data fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }

    fetchClasses();
    fetchStaffData();
    fetchMeetings();
    fetchStudents();
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('usersName');
    if (storedUsername) {
      setStoredName(storedUsername);
    }
  }, []);



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
                <p className="text-md font-bold text-gray-600 underline">Welcome back, Teacher {storedName}</p>
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

              {userStaff.length > 0 && (
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <span className="text-white font-semibold">
                    {getInitials(userStaff[0].first_name, userStaff[0].last_name)}
                  </span>
                </div>
              )}

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
              { id: 'classes', icon: Users, label: 'classes' },
              { id: 'clockIn', icon: LogIn, label: 'Clock in' },
              { id: 'schedule', icon: Calendar, label: 'Schedule' },
              { id: 'assignments', icon: FileText, label: 'Assignments' },
              { id: 'messages', icon: MessageSquare, label: 'Messages' },
              { id: 'resources', icon: Video, label: 'Resources' },

            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
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
        <main className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              {Array.isArray(userStaff) && userStaff.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Email",
                      value: userStaff[0].email ?? 'N/A',
                      change: "",
                      color: 'from-green-500 to-teal-500',
                      icon: Mail,
                    },
                    {
                      title: "Phone",
                      value: userStaff[0].phone_number ?? 'N/A',
                      change: "",
                      color: 'from-orange-500 to-yellow-500',
                      icon: Phone,
                    },
                    {
                      title: "Joined",
                      value: userStaff[0].date_of_joining ?? 'N/A',
                      change: `DOB: ${userStaff[0].date_of_birth ?? 'N/A'}`,
                      color: 'from-purple-500 to-pink-500',
                      icon: Calendar,
                    },
                    {
                      title: "Position",
                      value: userStaff[0].position ?? 'N/A',
                      change: `Dept: ${userStaff[0].department ?? 'N/A'}`,
                      color: 'from-indigo-500 to-sky-500',
                      icon: Briefcase,
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                          <p className="text-xl font-bold text-gray-800 mt-1 break-all">{stat.value}</p>
                          {stat.change && (
                            <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                          )}
                        </div>
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}



              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xl font-bold text-gray-800">Scheduled Meetings</h3>
    <Clock className="w-5 h-5 text-gray-600" />
  </div>
  <div className="space-y-4">
    {meetings.map((meeting, index) => (
      <div
        key={index}
        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-all duration-200"
      >
        <div className="w-2 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">{meeting.title}</h4>
            <span className={`text-sm font-medium capitalize ${
              meeting.status === 'completed' ? 'text-green-600' :
              meeting.status === 'ongoing' ? 'text-orange-500' :
              'text-blue-600'
            }`}>
              {meeting.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{meeting.agenda} • {new Date(meeting.created_at).toLocaleDateString()}</p>
          <p className="text-gray-500 text-xs mt-1">{meeting.description}</p>
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
                          <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${activity.type === 'assignment' ? 'bg-blue-500' :
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

          {activeTab === 'clockIn' && (
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
                          <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${activity.type === 'assignment' ? 'bg-blue-500' :
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

          {activeTab === 'classes' && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Hello there, {storedName}</h2>
                    <p className="text-blue-100">Manage your classes and students efficiently</p>
                  </div>
                  <div className="hidden md:block">
                    <svg className="w-16 h-16 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      {userClass && (
                        <>
                          <p className="text-gray-500 text-sm">Class Name</p>
                          <p className="text-2xl font-bold text-gray-800">{userClass.class_name}</p>
                        </>
                      )}
                      
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div>
                      {userClass && (
                        <>
                          <p className="text-gray-500 text-sm">Class capacity</p>
                          <p className="text-2xl font-bold text-gray-800">{userClass.class_capacity}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Assignments</p>
                      <p className="text-2xl font-bold text-gray-800">N/A</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group" onClick={() => navigate('/attendance')}>
                    <div className="bg-blue-500 group-hover:bg-blue-600 rounded-full p-3 mb-3 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Mark Attendance</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group" onClick={() => navigate('/students')}>
                    <div className="bg-green-500 group-hover:bg-green-600 rounded-full p-3 mb-3 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Add Student</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group" onClick={() => navigate('/assignments')}>
                    <div className="bg-purple-500 group-hover:bg-purple-600 rounded-full p-3 mb-3 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Assignment</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group">
                    <div className="bg-orange-500 group-hover:bg-orange-600 rounded-full p-3 mb-3 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Reports</span>
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Class List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Available School Students</h3>
          <button
            onClick={() => setIsModalOpen(true)} // ← set your actual route here
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All
          </button>
        </div>
      </div>
                  <div className="p-6">
  <div className="space-y-4">
    {availableStudents.slice(0, 5).map((student, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-lg p-2 mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {student.first_name} {student.last_name} — {student.class_name}
            </p>
            <p className="text-sm text-gray-500">
              Parent: {student.parents_email} • Joined: {student.date_of_joining}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-600">DOB: {student.date_of_birth}</p>
          <p className="text-xs text-gray-500">Contact: {student.parents_number}</p>
        </div>
      </div>
    ))}
  </div>
</div>

                </div>

                {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300">
    <div className="bg-white w-full max-w-4xl mx-4 md:mx-0 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-fade-in">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">
          All Registered Students
        </h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>
      </div>

      <div className="px-6 py-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {availableStudents.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No students found.</p>
        ) : (
          <div className="divide-y divide-gray-200 space-y-3">
            {availableStudents.map((student, index) => (
              <div
                key={index}
                className="flex justify-between items-center pt-2"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {student.first_name} {student.last_name}
                  </p>
                  <p className="text-sm text-gray-500">{student.class_name}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>Joined: {student.date_of_joining}</p>
                  <p>DOB: {student.date_of_birth}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 py-3 border-t flex justify-end bg-gray-50">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


                {/* Sidebar Content */}
                <div className="space-y-6">
                  {/* Today's Schedule */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Math Class</p>
                          <p className="text-xs text-gray-500">9:00 - 9:45 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Chemistry Lab</p>
                          <p className="text-xs text-gray-500">11:30 AM - 12:30 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">Staff Meeting</p>
                          <p className="text-xs text-gray-500">3:00 - 4:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">Assignment graded</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">New student enrolled</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'clockIn' && activeTab !== 'classes' && (
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