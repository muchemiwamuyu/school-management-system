import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, GraduationCap, UserCheck, Lock } from 'lucide-react';
import { AxiosInstance4 } from '../api/Axios';
import { toast } from 'react-toastify';

export default function Students() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    parents_email: '',
    parents_number: '',
    class_name: '',
    date_of_joining: '',
    date_of_birth: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.parents_email.trim()) newErrors.parents_email = 'Parent email is required';
    if (!/\S+@\S+\.\S+/.test(formData.parents_email)) newErrors.parents_email = 'Invalid email format';
    if (!formData.parents_number.trim()) newErrors.parents_number = 'Parent phone number is required';
    if (!formData.class_name.trim()) newErrors.class_name = 'Class name is required';
    if (!formData.date_of_joining) newErrors.date_of_joining = 'Date of joining is required';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async () => {
  try {
    setIsSubmitting(true); // ⏳ Start loading

    const response = await AxiosInstance4.post("register_student/", formData);

    if (response.status === 201) {

      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Student Registered Successfully!');

      // Optionally reset form or state here
    } else {
      toast.error('Something went wrong. Try again.');
    }
  } catch (error) {
    toast.error('Registration failed!');
    console.error(error);
  } finally {
    setIsSubmitting(false); // ✅ End loading in all cases
  }
};


  const inputClasses = "w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-700 placeholder-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            KingsBridge Academy
          </h1>
          <p className="text-lg text-gray-600">Student Registration Form</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="space-y-8">
            {/* Account Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className={labelClasses}>
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Enter username"
                  />
                  {errors.username && <p className={errorClasses}>{errors.username}</p>}
                </div>
                
                <div>
                  <label htmlFor="password" className={labelClasses}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Enter password"
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.password && <p className={errorClasses}>{errors.password}</p>}
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Student Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className={labelClasses}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Enter first name"
                  />
                  {errors.first_name && <p className={errorClasses}>{errors.first_name}</p>}
                </div>
                
                <div>
                  <label htmlFor="last_name" className={labelClasses}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Enter last name"
                  />
                  {errors.last_name && <p className={errorClasses}>{errors.last_name}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date_of_birth" className={labelClasses}>
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.date_of_birth && <p className={errorClasses}>{errors.date_of_birth}</p>}
                </div>
                
                <div>
                  <label htmlFor="class_name" className={labelClasses}>
                    Class
                  </label>
                  <select
                    id="class_name"
                    name="class_name"
                    value={formData.class_name}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    <option value="">Select Class</option>
                    <option value="Grade 1A">Grade 1A</option>
                    <option value="Grade 1B">Grade 1B</option>
                    <option value="Grade 2A">Grade 2A</option>
                    <option value="Grade 2B">Grade 2B</option>
                    <option value="Grade 3A">Grade 3A</option>
                    <option value="Grade 3B">Grade 3B</option>
                    <option value="Grade 4A">Grade 4A</option>
                    <option value="Grade 4B">Grade 4B</option>
                    <option value="Grade 5A">Grade 5A</option>
                    <option value="Grade 5B">Grade 5B</option>
                    <option value="Grade 6A">Grade 6A</option>
                    <option value="Grade 6B">Grade 6B</option>
                  </select>
                  {errors.class_name && <p className={errorClasses}>{errors.class_name}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="date_of_joining" className={labelClasses}>
                  Date of Joining
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date_of_joining"
                    name="date_of_joining"
                    value={formData.date_of_joining}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.date_of_joining && <p className={errorClasses}>{errors.date_of_joining}</p>}
              </div>
            </div>

            {/* Parent Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Parent/Guardian Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parents_email" className={labelClasses}>
                    Parent Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="parents_email"
                      name="parents_email"
                      value={formData.parents_email}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="parent@example.com"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.parents_email && <p className={errorClasses}>{errors.parents_email}</p>}
                </div>
                
                <div>
                  <label htmlFor="parents_number" className={labelClasses}>
                    Parent Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="parents_number"
                      name="parents_number"
                      value={formData.parents_number}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="+254 712 345 678"
                    />
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.parents_number && <p className={errorClasses}>{errors.parents_number}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Registering Student...
                  </div>
                ) : (
                  'Register Student'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>&copy; Kingsbridge Academy (2025). Building bright futures together.</p>
        </div>
      </div>
    </div>
    </>
    
  );
}