import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle, CheckCircle, Filter, Search, Bell } from 'lucide-react';
import { AxiosInstance1 } from '../api/Axios';

const StaffSchedule = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [allMeetings, setAllMeetings] = useState([])

  // Mock data for teacher duties


  const fetchAllMeetings = async () => {
    try {
        const response = await AxiosInstance1.get('/accounts/meetings/')
        setAllMeetings(response.data)
    } catch (error) {
        console.error('failed to fetch all meetings data', error)
    }
  }

  useEffect(() => {
    fetchAllMeetings();
  }, [])
 

  const getDutyTypeColor = (type) => {
    const colors = {
      'Assembly': 'bg-blue-100 text-blue-800 border-blue-200',
      'Monitoring': 'bg-green-100 text-green-800 border-green-200',
      'Event': 'bg-purple-100 text-purple-800 border-purple-200',
      'Supervision': 'bg-orange-100 text-orange-800 border-orange-200',
      'Study Hall': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (priority === 'medium') return <Clock className="w-4 h-4 text-yellow-500" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Completed</span>;
    }
    return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Upcoming</span>;
  };

  const filteredDuties = Array.isArray(allMeetings)
  ? allMeetings.filter(duty => {
      const matchesFilter = filterStatus === 'all' || duty.status === filterStatus;
      const matchesSearch = duty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            duty.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
  : [];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Duty Schedule</h1>
              <p className="text-gray-600">View and manage your allocated duties and responsibilities</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* <div className="bg-blue-100 p-3 rounded-full">
                <Bell className="w-6 h-6 text-blue-600" />
              </div> */}
              <div className="text-right">
                <p className="text-sm text-gray-500">Today</p>
                <p className="text-lg font-semibold text-gray-900">June 18, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Duties</p>
                <p className="text-2xl font-bold text-gray-900">{allMeetings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{allMeetings.filter(d => d.status === 'completed').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{allMeetings.filter(d => d.status === 'upcoming').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Students Supervised</p>
                <p className="text-2xl font-bold text-gray-900">{allMeetings.reduce((sum, duty) => sum + duty.studentsCount, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search duties..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
              >
                <option value="current">Current Week</option>
                <option value="next">Next Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Duty Cards */}
        <div className="space-y-4">
          {allMeetings.map((duty) => (
            <div key={duty.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{duty.title}</h3>
                      {getPriorityIcon(duty.priority)}
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getDutyTypeColor(duty.type)}`}>
                        {duty.agenda}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{duty.description}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(duty.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{new Date(duty.event_date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{duty.time}</span>
                  </div>
                  
                  {/* <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{duty.location}</span>
                  </div> */}
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{duty.studentsCount} students</span>
                  </div>
                </div>
                
                {duty.status === 'upcoming' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        Request Change
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredDuties.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No duties found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffSchedule;