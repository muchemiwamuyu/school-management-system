import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  User, Mail, Phone, Calendar, MapPin, Briefcase,
  Building, CreditCard, CheckCircle, AlertCircle,
  Users, Plus, Eye, EyeOff, Loader2, Star, ArrowRight,
  ChevronDown, Search, X, Save
} from 'lucide-react';
import { AxiosInstance1 } from '../api/Axios';

// Enhanced School Brand Component
const SchoolBrand = () => (
  <div className="fixed top-6 left-6 z-50 flex items-center space-x-3">
    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
      <Users className="text-white w-7 h-7" />
    </div>
    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        KingsBridge Academy
      </span>
    </div>
  </div>
);

// Mock API with realistic delays
const mockApi = {
  registerStaff: async (staffData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (Math.random() > 0.2) {
      return { data: { message: 'Staff member registered successfully!', id: Math.floor(Math.random() * 1000) } };
    } else {
      throw new Error('Registration failed - please try again');
    }
  },

  checkEmailAvailability: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return Math.random() > 0.3; // 70% chance email is available
  }
};

// Predefined options for faster input
const departmentOptions = [
  'Mathematics', 'science', 'Languages', 'Arts', 'Physical Education',
  'Social Studies', 'Technology', 'Special Education', 'Counseling', 'Administration'
];

const positionOptions = [
  'Principal', 'Dean', 'Teacher', 'school-stakeholders',
];

// Enhanced Dropdown Component
const SearchableDropdown = ({ label, name, value, onChange, options, placeholder, icon: Icon, required = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="group relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
        <Icon className="w-4 h-4 mr-2 text-blue-600" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <div
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 group-hover:border-blue-300 cursor-pointer flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-60 overflow-hidden">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                  onClick={() => {
                    onChange({ target: { name, value: option } });
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                >
                  {option}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-4 py-3 text-gray-500 text-center">
                  {searchTerm ? 'No matches found' : 'No options available'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Input Field with auto-complete and validation
const EnhancedInputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  icon: Icon,
  required = true,
  value,
  onChange,
  onFocus,
  formErrors,
  suggestions = [],
  autoComplete = true
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const inputRef = useRef(null);

  const filteredSuggestions = (suggestions || []).filter(suggestion => {
  const sug = (suggestion || '').toLowerCase();
  const val = (value || '').toLowerCase();
  return sug.includes(val) && sug !== val;
});


  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && filteredSuggestions.length > 0) {
      e.preventDefault();
      onChange({ target: { name, value: filteredSuggestions[0] } });
      setShowSuggestions(false);
    }
  };

  return (
    <div className="group relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2 items-center">
        <Icon className="w-4 h-4 mr-2 text-blue-600" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            onFocus(name);
            if (autoComplete && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 group-hover:border-blue-300 ${formErrors[name] ? 'border-red-500 bg-red-50/50' : 'border-gray-200'
            }`}
        />

        {/* Auto-complete suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-40 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-32 overflow-y-auto">
            {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  onChange({ target: { name, value: suggestion } });
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {/* Validation indicator */}
        {isValidating && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          </div>
        )}

        {formErrors[name] && (
          <div className="absolute -bottom-6 left-0 flex items-center text-red-500 text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            {formErrors[name]}
          </div>
        )}
      </div>
    </div>
  );
};

function StaffAdmin() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    id_number: '',
    date_of_birth: '',
    date_of_joining: '',
    position: '',
    department: ''
  });

  const [uiState, setUiState] = useState({
    responseMessage: '',
    isSuccess: null,
    isLoading: false,
    currentStep: 1,
    isAutoSaving: false,
    lastSaved: null
  });

  const [formErrors, setFormErrors] = useState({});
  const [emailAvailable, setEmailAvailable] = useState(null);

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (Object.values(formData).some(value => value.trim() !== '')) {
        setUiState(prev => ({ ...prev, isAutoSaving: true }));
        setTimeout(() => {
          setUiState(prev => ({
            ...prev,
            isAutoSaving: false,
            lastSaved: new Date().toLocaleTimeString()
          }));
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [formData]);

  // Email availability check
  useEffect(() => {
    if (formData.email && formData.email.includes('@') && formData.email.includes('.')) {
      const checkEmail = async () => {
        try {
          const available = await mockApi.checkEmailAvailability(formData.email);
          setEmailAvailable(available);
        } catch (error) {
          setEmailAvailable(null);
        }
      };

      const timer = setTimeout(checkEmail, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData.email]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field-specific errors
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [formErrors]);

  const handleFieldFocus = useCallback((fieldName) => {
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  }, [formErrors]);

  const validateForm = () => {
    const errors = {};
    const requiredFields = {
      first_name: 'First name is required',
      last_name: 'Last name is required',
      email: 'Email is required',
      phone_number: 'Phone number is required',
      id_number: 'ID number is required',
      date_of_birth: 'Date of birth is required',
      date_of_joining: 'Date of joining is required',
      position: 'Position is required',
      department: 'Department is required'
    };

    // Check required fields
    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field] || !formData[field].trim()) {
        errors[field] = message;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone_number && !phoneRegex.test(formData.phone_number.replace(/\s/g, ''))) {
      errors.phone_number = 'Please enter a valid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
  console.log('Submitting form...');

  if (!validateForm()) {
    console.log('Form validation failed');
    return;
  }

  setUiState(prev => ({ ...prev, isLoading: true, responseMessage: '' }));

  try {
    console.log('Sending request to backend...');
    const response = await AxiosInstance1.post('/accounts/register_school/', formData);
    console.log('Response:', response);

    // rest of your logic...
  } catch (error) {
    console.error('Request failed:', error);
    // rest of your error logic...
  }
};


  const getFormProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    return (filledFields / totalFields) * 100;
  };

  // Sample data for auto-complete
  const emailSuggestions = ['@gmail.com', '@yahoo.com', '@outlook.com', '@company.edu'];
  const nameSuggestions = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <SchoolBrand />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-5xl">

          {/* Enhanced Header Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 shadow-2xl">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <Plus className="w-8 h-8 mr-3" />
                  Staff Registration
                </h1>
                <p className="text-blue-100 text-lg">Quick and intelligent staff onboarding</p>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-4 mb-2">
                  {uiState.isAutoSaving && (
                    <div className="flex items-center text-white/80 text-sm">
                      <Save className="w-4 h-4 mr-1 animate-pulse" />
                      Auto-saving...
                    </div>
                  )}
                  {uiState.lastSaved && !uiState.isAutoSaving && (
                    <div className="text-white/60 text-xs">
                      Last saved: {uiState.lastSaved}
                    </div>
                  )}
                </div>

                <div className="text-white/80 text-sm mb-1">Progress</div>
                <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-white to-blue-200 transition-all duration-700 ease-out"
                    style={{ width: `${getFormProgress()}%` }}
                  ></div>
                </div>
                <div className="text-white text-xs mt-1">{Math.round(getFormProgress())}% Complete</div>
              </div>
            </div>
          </div>

          {/* Enhanced Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="space-y-8">

                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
                    </div>
                    <div className="text-sm text-gray-500">
                      Press Tab for auto-complete
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <EnhancedInputField
                      label="First Name"
                      name="first_name"
                      type="text"
                      placeholder="Enter first name"
                      icon={User}
                      value={formData.first_name}
                      onChange={handleInputChange}
                      onFocus={handleFieldFocus}
                      formErrors={formErrors}
                      suggestions={nameSuggestions}
                    />
                    <EnhancedInputField
                      label="Last Name"
                      name="last_name"
                      type="text"
                      placeholder="Enter last name"
                      icon={User}
                      value={formData.last_name}
                      onChange={handleInputChange}
                      onFocus={handleFieldFocus}
                      formErrors={formErrors}
                      suggestions={nameSuggestions}
                    />

                    <div className="relative">
                      <EnhancedInputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={handleFieldFocus}
                        formErrors={formErrors}
                        suggestions={emailSuggestions}
                      />
                      {emailAvailable !== null && formData.email && (
                        <div className={`absolute right-0 top-8 text-xs ${emailAvailable ? 'text-green-600' : 'text-red-600'}`}>
                          {emailAvailable ? '✓ Available' : '✗ Already taken'}
                        </div>
                      )}
                    </div>

                    <EnhancedInputField
                      label="Phone Number"
                      name="phone_number"
                      type="tel"
                      placeholder="Enter phone number"
                      icon={Phone}
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      onFocus={handleFieldFocus}
                      formErrors={formErrors}
                    />
                    <EnhancedInputField
                      label="ID Number"
                      name="id_number"
                      placeholder="Enter ID number"
                      icon={CreditCard}
                      value={formData.id_number}
                      onChange={handleInputChange}
                      onFocus={handleFieldFocus}
                      formErrors={formErrors}
                    />
                    <EnhancedInputField
                      label="Date of Birth"
                      name="date_of_birth"
                      type="date"
                      icon={Calendar}
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      onFocus={handleFieldFocus}
                      formErrors={formErrors}
                      autoComplete={false}
                    />
                  </div>
                </div>

                {/* Professional Information Section */}
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">Professional Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <EnhancedInputField
                      label="Date of Joining"
                      name="date_of_joining"
                      type="date"
                      icon={Calendar}
                      value={formData.date_of_joining}
                      onChange={handleInputChange}
                      onFocus={handleFieldFocus}
                      formErrors={formErrors}
                      autoComplete={false}
                    />

                    <SearchableDropdown
                      label="Position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      options={positionOptions}
                      placeholder="Select or search position"
                      icon={Star}
                    />

                    <div className="md:col-span-2">
                      <SearchableDropdown
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        options={departmentOptions}
                        placeholder="Select or search department"
                        icon={Building}
                      />
                    </div>
                  </div>
                </div>

                {/* Response Message */}
                {uiState.responseMessage && (
                  <div className={`flex items-center justify-center p-4 rounded-xl border-2 ${uiState.isSuccess
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                    } transition-all duration-500 animate-pulse`}>
                    {uiState.isSuccess ? (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2" />
                    )}
                    {uiState.responseMessage}
                  </div>
                )}

                {/* Enhanced Submit Button */}
                <div className="flex justify-center pt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={uiState.isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center text-lg"
                  >
                    {uiState.isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing Registration...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Register Staff Member
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {[
              { icon: Users, title: "Active Staff", value: "247", change: "+12", color: "from-blue-500 to-blue-600" },
              { icon: Building, title: "Departments", value: "12", change: "+2", color: "from-purple-500 to-purple-600" },
              { icon: Star, title: "Positions", value: "35", change: "+5", color: "from-pink-500 to-pink-600" },
              { icon: CheckCircle, title: "This Month", value: "18", change: "New", color: "from-green-500 to-green-600" }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffAdmin;