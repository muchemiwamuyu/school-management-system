import React, { useState } from 'react';
import { Plus, Users, UserCheck, Settings, X } from 'lucide-react';
import { AxiosInstance1, AxiosInstance2 } from '../api/Axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function GradientActionCards({ setClasses, setDepartments }) {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({});


  const handleAction = (action) => {
    setActiveModal(action);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModal = () => {
    if (!activeModal) return null;

    const modalContent = {
      'Add Class': {
        title: 'Add New Class',
        fields: [
          { label: 'class_name', type: 'text', placeholder: 'Enter class name' },
          { label: 'total_subjects', type: 'text', placeholder: 'Enter subject' },
          { label: 'grade_level', type: 'select', options: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'] },
          { label: 'class_capacity', type: 'text', placeholder: 'Maximum students' },
          { label: 'class_teacher', type: 'textarea', placeholder: 'Class teacher' }
        ]
      },
      'Add Departments': {
        title: 'Add New Department',
        fields: [
          { label: 'department_name', type: 'text', placeholder: 'Enter department name' },
          { label: 'department_role', type: 'text', placeholder: 'Enter department role' },
          { label: 'dean', type: 'text', placeholder: 'Enter the head dean' },
        ]
      },
      'Assign Leaders': {
        title: 'Assign Leadership Role',
        fields: [
          { label: 'Employee Name', type: 'text', placeholder: 'Enter employee name' },
          { label: 'Employee ID', type: 'text', placeholder: 'Enter employee ID' },
          { label: 'Leadership Role', type: 'select', options: ['Department Head', 'Team Lead', 'Project Manager', 'Supervisor'] },
          { label: 'Department', type: 'select', options: ['Human Resources', 'Finance', 'Operations', 'Marketing'] },
          { label: 'Start Date', type: 'date' }
        ]
      },
      'Actions': {
        title: 'System Actions',
        fields: [
          { label: 'Action Type', type: 'select', options: ['Data Backup', 'System Update', 'User Sync', 'Report Generation'] },
          { label: 'Priority Level', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
          { label: 'Scheduled Date', type: 'datetime-local' },
          { label: 'Target', type: 'text', placeholder: 'Target system or user group' },
          { label: 'Notes', type: 'textarea', placeholder: 'Additional notes or instructions' }
        ]
      }
    };


    const currentModal = modalContent[activeModal];


    

        

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form submitting:', activeModal, formData);

      try {

        let response;
        if (activeModal === 'Add Class') {
          response = await AxiosInstance1.post('/class/add_class/', formData);

          if (response.status === 201 || response.status === 200) {
          toast.success('Class added successfully!');
          closeModal?.();
          setClasses(prev => [...prev, response.data]);
          setFormData({});
          } else {
          toast.warn('Something went wrong. Try again.');
          console.warn('Unexpected response:', response);
          }

          // second if block for Add Departments
        } else if (activeModal === 'Add Departments') {
          response = await AxiosInstance1.post('/class/departments/', formData);

          if (response.status === 201 || response.status === 200) {
            toast.success('Department added successfully!');
            closeModal?.();
            setDepartments(prev => [...prev, response.data]);
            setFormData({});
          } else {
            toast.warn('Something went wrong. Try again.');
            console.warn('Unexpected response:', response);
          }
        }
        
      } catch (error) {
        console.error("Error submitting form:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          toast.error("Submission failed: " + JSON.stringify(error.response.data));
        } else {
          toast.error("Something went wrong");
        }
      }
    };

    

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop with blur */}
        <div
          className="absolute rounded inset-0 bg-black/30 backdrop-blur-md"
          onClick={closeModal}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 p-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">{currentModal.title}</h3>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            {currentModal.fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData[field.label] || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.label]: e.target.value })
                    }>
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options.map((option, optIndex) => (
                      <option key={optIndex} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    value={formData[field.label] || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.label]: e.target.value })
                    }
                  ></textarea>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData[field.label] || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.label]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto flex gap-6 p-6">
        {/* First Card - Academic Management */}
        <div
          className="w-1/2 h-84 rounded-2xl shadow-2xl relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-3xl"
          style={{
            background: 'linear-gradient(135deg,#92FE9D 40%, #00C9FF 90%)',
            minHeight: '21rem'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gray-800 bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300"></div>

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                Academic Management
              </h2>
              <p className="text-white/80 text-sm mb-8 drop-shadow">
                Manage classes and departments efficiently
              </p>
            </div>

            <div className="space-y-4">
              {/* Add Class Button */}
              <button
                onClick={() => handleAction('Add Class')}
                className="w-full bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-gray-500 font-semibold flex items-center gap-3 hover:bg-white/30 transition-all duration-200 hover:transform hover:translateY-1 shadow-lg hover:shadow-xl"
              >
                <div className="bg-white p-2 rounded-lg">
                  <Plus size={20} />
                </div>
                <span className='text-black'>Add Class</span>
              </button>

              {/* Add Departments Button */}
              <button
                onClick={() => handleAction('Add Departments')}
                className="w-full bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-gray-500 font-semibold flex items-center gap-3 hover:bg-white/30 transition-all duration-200 hover:transform hover:translateY-1 shadow-lg hover:shadow-xl"
              >
                <div className="bg-white p-2 rounded-lg">
                  <Users size={20} />
                </div>
                <span className='text-black'>Add Departments</span>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
        </div>

        {/* Second Card - Leadership & Actions */}
        <div
          className="w-1/2 h-84 rounded-2xl shadow-2xl relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-3xl"
          style={{
            background: 'linear-gradient(135deg, #FDBB2D 0%, #22C1C3 100%)',
            minHeight: '21rem'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gray-800 bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300"></div>

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                Leadership & Actions
              </h2>
              <p className="text-white/90 text-sm mb-8 drop-shadow">
                Assign roles and manage organizational actions
              </p>
            </div>

            <div className="space-y-4">
              {/* Assign Leaders Button */}
              <button
                onClick={() => handleAction('Assign Leaders')}
                className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-white font-semibold flex items-center gap-3 hover:bg-white/30 transition-all duration-200 hover:transform hover:translateY-1 shadow-lg hover:shadow-xl"
              >
                <div className="bg-white/20 p-2 rounded-lg">
                  <UserCheck size={20} />
                </div>
                <span>Assign Leaders</span>
              </button>

              {/* Actions Button */}
              <button
                onClick={() => handleAction('Actions')}
                className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-white font-semibold flex items-center gap-3 hover:bg-white/30 transition-all duration-200 hover:transform hover:translateY-1 shadow-lg hover:shadow-xl"
              >
                <div className="bg-white/20 p-2 rounded-lg">
                  <Settings size={20} />
                </div>
                <span>Actions</span>
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-6 right-6 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-12 right-12 w-8 h-8 bg-white/10 rounded-full blur-md"></div>
        </div>

        
      </div>

      {/* Render Modal */}
      {renderModal()}
    </div>
  );
}