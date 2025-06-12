import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, FileText, Upload, CheckCircle, AlertCircle, Star, Download, Eye } from 'lucide-react';

export default function AssignmentsPage() {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Sample assignments data
  const assignments = [
    {
      id: 1,
      title: "Mathematics Worksheet - Chapter 5",
      subject: "Mathematics",
      description: "Complete exercises 1-20 on fractions and decimals. Show all working steps clearly.",
      dueDate: "2025-06-20",
      assignedDate: "2025-06-12",
      status: "pending",
      priority: "high",
      points: 25,
      teacher: "Mrs. Johnson",
      attachments: ["math_worksheet_ch5.pdf"],
      submitted: false
    },
    {
      id: 2,
      title: "Science Project - Plant Growth",
      subject: "Science",
      description: "Observe and document plant growth over 2 weeks. Include daily measurements and photos.",
      dueDate: "2025-06-25",
      assignedDate: "2025-06-10",
      status: "pending",
      priority: "medium",
      points: 40,
      teacher: "Mr. Smith",
      attachments: ["project_guidelines.pdf"],
      submitted: false
    },
    {
      id: 3,
      title: "English Essay - My Summer Holiday",
      subject: "English",
      description: "Write a 200-word essay about your favorite summer holiday memory.",
      dueDate: "2025-06-15",
      assignedDate: "2025-06-08",
      status: "submitted",
      priority: "medium",
      points: 20,
      teacher: "Miss Davis",
      attachments: [],
      submitted: true,
      grade: "A-",
      feedback: "Excellent work! Great use of descriptive language."
    },
    {
      id: 4,
      title: "History Timeline - Ancient Egypt",
      subject: "History",
      description: "Create a timeline of major events in Ancient Egyptian civilization.",
      dueDate: "2025-06-18",
      assignedDate: "2025-06-05",
      status: "overdue",
      priority: "high",
      points: 30,
      teacher: "Mr. Brown",
      attachments: ["egypt_resources.pdf"],
      submitted: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'submitted': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getSubjectColor = (subject) => {
    switch (subject) {
      case 'Mathematics': return 'bg-blue-100 text-blue-800';
      case 'Science': return 'bg-green-100 text-green-800';
      case 'English': return 'bg-purple-100 text-purple-800';
      case 'History': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'add') return true;
    return assignment.status === selectedTab;
  });

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleFileUpload = (assignmentId) => {
    // Simulate file upload
    alert(`File upload initiated for assignment ${assignmentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Assignments
          </h1>
          <p className="text-lg text-gray-600">Manage your homework and projects</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                <p className="text-3xl font-bold text-gray-800">{assignments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{assignments.filter(a => a.status === 'pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-3xl font-bold text-green-600">{assignments.filter(a => a.status === 'submitted').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-3xl font-bold text-red-600">{assignments.filter(a => a.status === 'overdue').length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 mb-8">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Assignments', count: assignments.length },
              { key: 'add', label: 'Add Assignments', count: assignments.filter(a => a.status === 'add').length },
              { key: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
              { key: 'submitted', label: 'Submitted', count: assignments.filter(a => a.status === 'submitted').length },
              { key: 'overdue', label: 'Overdue', count: assignments.filter(a => a.status === 'overdue').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  selectedTab === tab.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSubjectColor(assignment.subject)}`}>
                    {assignment.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    <Star className={`w-4 h-4 ${getPriorityColor(assignment.priority)}`} />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {assignment.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {assignment.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    {assignment.status === 'pending' && (
                      <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                        getDaysUntilDue(assignment.dueDate) <= 1 ? 'bg-red-100 text-red-800' :
                        getDaysUntilDue(assignment.dueDate) <= 3 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {getDaysUntilDue(assignment.dueDate) === 0 ? 'Due Today' :
                         getDaysUntilDue(assignment.dueDate) === 1 ? 'Due Tomorrow' :
                         getDaysUntilDue(assignment.dueDate) < 0 ? `${Math.abs(getDaysUntilDue(assignment.dueDate))} days overdue` :
                         `${getDaysUntilDue(assignment.dueDate)} days left`}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Teacher: {assignment.teacher}</span>
                    <span className="ml-auto font-semibold text-blue-600">{assignment.points} points</span>
                  </div>
                </div>

                {assignment.submitted && assignment.grade && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-800">Grade: {assignment.grade}</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700">{assignment.feedback}</p>
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div className="px-6 pb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedAssignment(assignment)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  
                  {/* {!assignment.submitted && assignment.status !== 'overdue' && (
                    <button
                      onClick={() => handleFileUpload(assignment.id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Submit
                    </button>
                  )} */}

                  {assignment.attachments.length > 0 && (
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg transition-colors duration-200">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No assignments found</h3>
            <p className="text-gray-500">You don't have any assignments in this category.</p>
          </div>
        )}

        {/* Assignment Detail Modal */}
        {selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSubjectColor(selectedAssignment.subject)}`}>
                      {selectedAssignment.subject}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
                      {selectedAssignment.title}
                    </h2>
                    <p className="text-gray-600">
                      {selectedAssignment.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAssignment(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
                      <p className="text-gray-900">{new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Teacher</label>
                      <p className="text-gray-900">{selectedAssignment.teacher}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Points</label>
                      <p className="text-gray-900 font-semibold">{selectedAssignment.points} points</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedAssignment.status)}`}>
                        {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedAssignment.attachments.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Attachments</label>
                    <div className="space-y-2">
                      {selectedAssignment.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">{file}</span>
                          <button className="ml-auto text-blue-600 hover:text-blue-800">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedAssignment(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Close
                  </button>
                  {!selectedAssignment.submitted && (
                    <button
                      onClick={() => handleFileUpload(selectedAssignment.id)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      Submit Assignment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}