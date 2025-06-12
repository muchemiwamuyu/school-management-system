import React, { useState, useRef, useEffect } from 'react';
import { Camera, Users, Clock, Calendar, UserPlus, Search, Filter, Download, Eye, CheckCircle, XCircle, Settings, LogIn, UserCheck } from 'lucide-react';
import { AxiosInstance3 } from '../api/Axios';

const StaffAttendanceSystem = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [staff, setStaff] = useState([
    { id: 1, name: 'Sarah Johnson', role: 'Math Teacher', department: 'Mathematics', status: 'present', checkIn: '08:15 AM', checkOut: null, faceRegistered: true },
    { id: 2, name: 'Michael Chen', role: 'Science Teacher', department: 'Science', status: 'present', checkIn: '08:05 AM', checkOut: null, faceRegistered: true },
    { id: 3, name: 'Emily Davis', role: 'English Teacher', department: 'Languages', status: 'absent', checkIn: null, checkOut: null, faceRegistered: true },
    { id: 4, name: 'David Wilson', role: 'PE Teacher', department: 'Physical Education', status: 'present', checkIn: '07:55 AM', checkOut: null, faceRegistered: false },
    { id: 5, name: 'Lisa Brown', role: 'Art Teacher', department: 'Arts', status: 'present', checkIn: '08:20 AM', checkOut: null, faceRegistered: true },
  ]);

  const [attendanceLog, setAttendanceLog] = useState([
    { id: 1, staffId: 1, name: 'Sarah Johnson', action: 'Check In', time: '08:15 AM', date: '2025-06-12', method: 'Facial Recognition' },
    { id: 2, staffId: 2, name: 'Michael Chen', action: 'Check In', time: '08:05 AM', date: '2025-06-12', method: 'Facial Recognition' },
    { id: 3, staffId: 5, name: 'Lisa Brown', action: 'Check In', time: '08:20 AM', date: '2025-06-12', method: 'Facial Recognition' },
  ]);

  const [newStaff, setNewStaff] = useState({ name: '', role: '', department: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const departments = ['Mathematics', 'Science', 'Languages', 'Physical Education', 'Arts', 'Administration'];

  const presentCount = staff.filter(s => s.status === 'present').length;
  const absentCount = staff.filter(s => s.status === 'absent').length;
  const totalStaff = staff.length;

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || s.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  useEffect(() => {
  const interval = setInterval(() => {
    const v = videoRef.current;
    if (v) console.log('🔍 Live video size:', v.videoWidth, v.videoHeight);
  }, 1000);
  return () => clearInterval(interval);
}, []);


  const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;

      // Wait until it's really playing
      await videoRef.current.play();
      console.log("📷 Camera is playing");
    }
  } catch (err) {
    console.error('❌ Error accessing camera:', err);
  }
};



  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      console.warn('Video not ready');
      return null;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg');
  };


  const handleFaceRegistration = () => {
    setIsRegistering(true);
    setRegistrationStep(1);
    setTimeout(() => startCamera(), 100);
  };

  const completeFaceRegistration = async () => {
  try {
    // ✅ Wait until video is actually ready
    await new Promise((resolve) => {
      const checkReady = () => {
        const video = videoRef.current;
        if (video && video.videoWidth > 0 && video.videoHeight > 0) {
          console.log("✅ Video ready for capture");
          resolve();
        } else {
          console.log("⏳ Waiting for video...");
          setTimeout(checkReady, 200);
        }
      };
      checkReady();
    });

    // ✅ Capture the image
    const imageData = captureImage();
    if (!imageData) {
      throw new Error('Failed to capture image from video');
    }

    // ✅ Send to Django backend
    await AxiosInstance3.post('register_face/', {
      name: 'John Doe', // Replace this with actual input if needed
      face_data: imageData,
    });

    // ✅ Done!
    setRegistrationStep(3);
    setTimeout(() => {
      setIsRegistering(false);
      setRegistrationStep(1);
      stopCamera();
      alert('Face registered successfully!');
    }, 2000);

  } catch (error) {
    console.error('❌ Registration failed:', error);
    alert('Failed to register face. Try again.');
    setIsRegistering(false);
    setRegistrationStep(1);
    stopCamera();
  }
};



  const addNewStaff = () => {
    if (newStaff.name && newStaff.role && newStaff.department) {
      const newStaffMember = {
        id: staff.length + 1,
        ...newStaff,
        status: 'absent',
        checkIn: null,
        checkOut: null,
        faceRegistered: false
      };
      setStaff([...staff, newStaffMember]);
      setNewStaff({ name: '', role: '', department: '' });
      setCurrentView('dashboard');
    }
  };

  const simulateAttendance = (staffId, action) => {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    setStaff(prevStaff =>
      prevStaff.map(s =>
        s.id === staffId
          ? {
            ...s,
            status: action === 'Check In' ? 'present' : s.status,
            [action === 'Check In' ? 'checkIn' : 'checkOut']: currentTime
          }
          : s
      )
    );

    const staffMember = staff.find(s => s.id === staffId);
    setAttendanceLog(prev => [...prev, {
      id: prev.length + 1,
      staffId,
      name: staffMember.name,
      action,
      time: currentTime,
      date: new Date().toISOString().split('T')[0],
      method: 'Facial Recognition'
    }]);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Present Today</p>
              <p className="text-3xl font-bold">{presentCount}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Absent Today</p>
              <p className="text-3xl font-bold">{absentCount}</p>
            </div>
            <XCircle className="w-12 h-12 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Staff</p>
              <p className="text-3xl font-bold">{totalStaff}</p>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentView('register')}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200"
          >
            <Clock className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-700">Clock in</span>
          </button>

          <button
            onClick={() => setCurrentView('attendance')}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
          >
            <UserCheck className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-700">View Attendance</span>
          </button>

          <button
            onClick={() => setCurrentView('reports')}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200"
          >
            <Download className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-700">Reports</span>
          </button>

          <button
            onClick={handleFaceRegistration}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all duration-200"
          >
            <Camera className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-700">Face Setup</span>
          </button>
        </div>
      </div>

      {/* Today's Attendance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Staff Status</h3>
        <div className="space-y-3">
          {staff.slice(0, 5).map(member => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${member.status === 'present' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {member.checkIn || 'Not checked in'}
                </p>
                <p className="text-xs text-gray-500">{member.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Attendance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map(member => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-4 h-4 rounded-full ${member.status === 'present' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.faceRegistered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                {member.faceRegistered ? 'Face Registered' : 'Setup Required'}
              </span>
            </div>

            <h4 className="font-semibold text-gray-800 mb-1">{member.name}</h4>
            <p className="text-sm text-gray-500 mb-2">{member.role}</p>
            <p className="text-xs text-gray-400 mb-4">{member.department}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Check In:</span>
                <span className="font-medium">{member.checkIn || 'Not checked in'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Check Out:</span>
                <span className="font-medium">{member.checkOut || 'Not checked out'}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => simulateAttendance(member.id, 'Check In')}
                disabled={member.status === 'present'}
                className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Check In
              </button>
              <button
                onClick={() => simulateAttendance(member.id, 'Check Out')}
                disabled={member.status === 'absent' || !member.checkIn}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Check Out
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Register New Staff Member</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter staff member's full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role/Position</label>
            <input
              type="text"
              value={newStaff.role}
              onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Math Teacher, Principal, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={newStaff.department}
              onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addNewStaff}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Register Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Attendance Log</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Staff Member</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Method</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLog.map(log => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{log.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.action === 'Check In' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{log.time}</td>
                  <td className="py-3 px-4 text-gray-600">{log.date}</td>
                  <td className="py-3 px-4 text-gray-600">{log.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">KingsBridge Academy</h1>
                <p className="text-sm text-gray-500">Staff Attendance System</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Users },
              { id: 'attendance', label: 'Attendance', icon: Clock },
              { id: 'register', label: 'Register Staff', icon: UserPlus },
              { id: 'reports', label: 'Reports', icon: Calendar }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${currentView === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'attendance' && renderAttendance()}
        {currentView === 'register' && renderRegister()}
        {currentView === 'reports' && renderReports()}
      </main>

      {/* Face Registration Modal */}
      {isRegistering && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Face Registration Setup</h3>

            {registrationStep === 1 && (
              <div className="text-center space-y-4">
                <Camera className="w-16 h-16 text-blue-500 mx-auto" />
                <p className="text-gray-600">Position your face in the camera frame and click "Start Registration"</p>
                <button
                  onClick={() => setRegistrationStep(2)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Registration
                </button>
              </div>
            )}

            {registrationStep === 2 && (
              <div className="space-y-4">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-lg opacity-50"></div>
                </div>
                <p className="text-center text-gray-600">Keep your face in the frame and click "Capture Face"</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setIsRegistering(false);
                      stopCamera();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={completeFaceRegistration}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Capture Face
                  </button>
                </div>
              </div>
            )}

            {registrationStep === 3 && (
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <p className="text-gray-600">Processing face data...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffAttendanceSystem;