import React, { useEffect, useState } from 'react';
import { Calendar, X, Clock, Users, UserCheck, CalendarDays, ChevronDown, ChevronRight, Plus, Edit2, Eye } from 'lucide-react';
import { AxiosInstance1, AxiosInstance2 } from '../api/Axios';
import { toast } from 'react-toastify';

const Schedules = () => {
    const [activeTab, setActiveTab] = useState('timetable');
    const [expandedClasses, setExpandedClasses] = useState({});
    const [classData, setClasseData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dutyRoster, setDutyRoster] = useState({
        staff: '',
        duty: '',
        date: '',
        time: ''
    });

    const [staffNames, setStaffNames] = useState([]);
    const [roasterData, setRoasterData] = useState([]);
    const [meeting, setMeeting] = useState({
        title: '',
        agenda: '',
        description: '',
        status: '',
    });
    const [meetingData, setMeetingData] = useState([]);



    const fetchNames = async () => {
        try {
            const responses = await AxiosInstance1.get('school_staff/');
            setStaffNames(responses.data);
            console.log('Staff names fetched successfully:', responses.data);
        } catch (error) {
            console.error('Error fetching staff names:', error);
            toast.error('Failed to fetch staff names');

        }
    }

    const fetchClasses = async () => {
        try {
            const response = await AxiosInstance2.get('classes/');
            setClasseData(response.data);
            console.log('Classes fetched successfully:', response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }

    };

    const fetchRoaster = async () => {
        try {
            const response = await AxiosInstance1.get('roasters/');
            setRoasterData(response.data);
            console.log('Roaster data fetched successfully:', response.data);
        } catch (error) {
            console.error('Error fetching roaster data:', error);
            toast.error('Failed to fetch roaster data');
        }
    }

    const fetchMeetings = async () => {
        try {
            const response = await AxiosInstance1.get('meetings/');
            setMeetingData(response.data);
            console.log('Meeting data fetched successfully:', response.data);
        } catch (error) {
            console.error('Error fetching meeting data:', error);
            toast.error('Failed to fetch meeting data');
        }
    }

    useEffect(() => {
        fetchClasses();
        fetchNames();
        fetchRoaster();
        fetchMeetings();
    }, []);

    // Sample data

    const handleRoaster = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!dutyRoster.staff || !dutyRoster.duty || !dutyRoster.date || !dutyRoster.time) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const payload = {
                ...dutyRoster,
                staff: parseInt(dutyRoster.staff),  // Ensure staff is a number
            };

            const response = await AxiosInstance1.post('roaster/', payload);

            // Optional: fetch full updated list from backend
            await fetchRoaster();

            toast.success(response.data.message || 'Duty roster added successfully!');

            // Manually prepare newRoaster with staff name
            const staffInfo = staffNames.find((s) => s.id === payload.staff);
            const newRoaster = {
                ...payload,
                staff_full_name: staffInfo ? `${staffInfo.first_name} ${staffInfo.last_name}` : `Staff #${payload.staff}`
            };

            // Update local table state

            // Reset form
            setDutyRoster({
                staff: '',
                duty: '',
                date: '',
                time: ''
            });

            setIsModalOpen(false);

        } catch (error) {
            console.error('Error adding duty roster:', error);
            toast.error(error.response?.data?.message || 'Failed to add duty roster');
        }
    };

    const handleMeetingSubmit = async (e) => {
        e.preventDefault();

        try {
            const reponse = await AxiosInstance1.post('meeting/', meeting);
            toast.success(reponse.data.message || 'Meeting added successfully!');
            setMeetingData(prev => [...prev, reponse.data]);
            setIsModalOpen(false);
            setMeeting({
                title: '',
                agenda: '',
                description: '',
                status: ''
            });
        } catch (error) {
            console.error('Error adding meeting:', error);
            toast.error(error.response?.data?.message || 'Failed to add meeting');
        }
    }





    const toggleClassExpansion = (className) => {
        setExpandedClasses(prev => ({
            ...prev,
            [className]: !prev[className]
        }));
    };

    const getStatusBadge = (status) => {
        const colors = {
            'Available': 'bg-green-100 text-green-800',
            'On Leave': 'bg-red-100 text-red-800',
            'Planned Leave': 'bg-yellow-100 text-yellow-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getEventTypeBadge = (type) => {
        const colors = {
            'academic': 'bg-blue-100 text-blue-800',
            'sports': 'bg-green-100 text-green-800',
            'cultural': 'bg-purple-100 text-purple-800',
            'assembly': 'bg-orange-100 text-orange-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    function getMeetingTypeBadge(status) {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            case 'ongoing':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }


    const TabButton = ({ id, icon: Icon, label, active, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${active
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
        >
            <Icon size={18} />
            <span>{label}</span>
        </button>
    );

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Academic Dashboard</h1>
                    <p className="text-gray-600">Manage your primary school operations efficiently</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <TabButton
                        id="timetable"
                        icon={Clock}
                        label="Class Timetable"
                        active={activeTab === 'timetable'}
                        onClick={setActiveTab}

                    />
                    <TabButton
                        id="duty"
                        icon={UserCheck}
                        label="Duty Roster"
                        active={activeTab === 'duty'}
                        onClick={setActiveTab}
                    />
                    <TabButton
                        id="meet"
                        icon={Users}
                        label="Meetings"
                        active={activeTab === 'meet'}
                        onClick={setActiveTab}
                    />
                    {/* <TabButton
                        id="leave"
                        icon={Calendar}
                        label="Leave Tracker"
                        active={activeTab === 'leave'}
                        onClick={setActiveTab}
                    />
                    <TabButton
                        id="events"
                        icon={CalendarDays}
                        label="Events"
                        active={activeTab === 'events'}
                        onClick={setActiveTab}
                    /> */}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

                    {/* Class Timetable */}
                    {activeTab === 'timetable' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 underline">Classes Timetable</h2>
                                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <Plus size={16} />
                                    <span>Add Class</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {classData.length === 0 && <p className="text-red-500">No class data available.</p>}
                                {classData.map((classItem, index) => (
                                    <div key={classItem.id || index} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => toggleClassExpansion(classItem.class_name)}
                                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {classItem.class_name} – {classItem.grade_level} ({classItem.class_capacity})
                                            </h3>
                                            {expandedClasses[classItem.class_name] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                        </button>

                                        {expandedClasses[classItem.class_name] && (
                                            <div className="p-4 bg-white">
                                                {/* Expandable content: leave blank for now */}
                                                <p className="text-sm text-gray-500 italic text-center">Timetable not yet assigned.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    )}

                    {/* Duty Roster */}
                    {activeTab === 'duty' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Duty Roster</h2>
                                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setIsModalOpen(true)}>
                                    <Plus size={16} />
                                    <span>Add Duty</span>
                                </button>
                            </div>

                            {isModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                                        <button
                                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            <X size={20} />
                                        </button>
                                        <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Schedule</h3>

                                        <form onSubmit={handleRoaster} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Staff Name</label>
                                                {staffNames.length === 0 ? (
                                                    <p className="text-red-500">No staff members available.</p>
                                                ) : (
                                                    <select
                                                        value={dutyRoster.staff}
                                                        onChange={(e) => setDutyRoster({ ...dutyRoster, staff: e.target.value })}
                                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    >
                                                        <option value="">Select name</option>
                                                        {staffNames.slice(0, 5).map((staff) => (
                                                            <option key={staff.id} value={staff.id}>
                                                                {staff.first_name} {staff.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Duty</label>
                                                <input
                                                    type="text"
                                                    value={dutyRoster.duty}
                                                    onChange={(e) => setDutyRoster({ ...dutyRoster, duty: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="e.g. Gate Supervision"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                                <input
                                                    type="date"
                                                    value={dutyRoster.date}
                                                    onChange={(e) => setDutyRoster({ ...dutyRoster, date: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Time</label>
                                                <input
                                                    type="time"
                                                    value={dutyRoster.time}
                                                    onChange={(e) => setDutyRoster({ ...dutyRoster, time: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Save Roaster
                                            </button>
                                        </form>

                                    </div>
                                </div>
                            )}



                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Staff Name</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Duty</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roasterData.map((duty, idx) => {
                                            const staffInfo = staffNames.find((s) => s.id === duty.staff);
                                            const staffName = duty.staff_full_name || (staffInfo ? `${staffInfo.first_name} ${staffInfo.last_name}` : `Staff #${duty.staff}`);


                                            return (
                                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-medium text-gray-800">{staffName}</td>
                                                    <td className="py-3 px-4 text-gray-600">{duty.duty}</td>
                                                    <td className="py-3 px-4 text-gray-600">{duty.time}</td>
                                                    <td className="py-3 px-4 text-gray-600">{duty.date}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex space-x-2">
                                                            <button className="text-blue-600 hover:text-blue-800">
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button className="text-gray-600 hover:text-gray-800">
                                                                <Eye size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    )}

                    {/* Meeting Schedule */}
                    {activeTab === 'meet' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Meeting Schedule</h2>
                                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => setIsModalOpen(true)}>
                                    <Plus size={16} />
                                    <span>Schedule Meeting</span>
                                </button>
                            </div>

                            {isModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                                        <button
                                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            <X size={20} />
                                        </button>
                                        <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Meeting</h3>

                                        <form onSubmit={handleMeetingSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                                <input
                                                    type="text"
                                                    value={meeting.title}
                                                    onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="e.g. Term One Staff Meeting"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Agenda</label>
                                                <textarea
                                                    value={meeting.agenda}
                                                    onChange={(e) => setMeeting({ ...meeting, agenda: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="What will be discussed?"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    value={meeting.description}
                                                    onChange={(e) => setMeeting({ ...meeting, description: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="More details (optional)"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <select
                                                    value={meeting.status}
                                                    onChange={(e) => setMeeting({ ...meeting, status: e.target.value })}
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                >
                                                    <option value="">Select status</option>
                                                    <option value="upcoming">Upcoming</option>
                                                    <option value="ongoing">Ongoing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Save Meeting
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}


                            <div className="grid gap-4">
                                {meetingData.map((meet, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800">{meet.title}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMeetingTypeBadge(meet.status)}`}>
                                                {meet.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1 text-sm text-gray-600 mt-2">
                                            <div className="flex items-start gap-2">
                                                <span className="font-semibold">Agenda:</span>
                                                <span>{meet.agenda}</span>
                                            </div>
                                            {meet.description && (
                                                <div className="flex items-start gap-2">
                                                    <span className="font-semibold">Description:</span>
                                                    <span>{meet.description}</span>
                                                </div>
                                            )}
                                            <div className="text-xs text-gray-400 mt-2">
                                                Created: {new Date(meet.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}

                    {/* Leave/Availability Tracker */}
                    {activeTab === 'leave' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Leave & Availability Tracker</h2>
                                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <Plus size={16} />
                                    <span>Request Leave</span>
                                </button>
                            </div>

                            <div className="grid gap-4">
                                {leaveTracker.map((staff, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800">{staff.name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(staff.status)}`}>
                                                {staff.status}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                            <div>
                                                <strong>Leave Type:</strong> {staff.leave || 'None'}
                                            </div>
                                            <div>
                                                <strong>Substitute:</strong> {staff.substitute || 'Not required'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Event Calendar */}
                    {activeTab === 'events' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Event Calendar</h2>
                                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <Plus size={16} />
                                    <span>Add Event</span>
                                </button>
                            </div>

                            <div className="grid gap-4">
                                {events.map((event, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeBadge(event.type)}`}>
                                                {event.type}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={14} />
                                                <span>{event.date}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Schedules;