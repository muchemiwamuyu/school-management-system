import React, { useState } from 'react';
import { User, Lock, LogIn, UserCheck } from 'lucide-react';
import { AxiosInstance1 } from '../api/Axios';
import { useNavigate } from 'react-router-dom';

function LoginStaff() {
  const MainBgGradient = 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
  const [selectedOption, setSelectedOption] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Mock navigation function for demo
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [responseMsg, setResponseMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call for demo
    // setTimeout(() => {
    //   setResponseMsg('Login successful! (Demo mode)');
    //   setIsSuccess(true);
    //   setIsLoading(false);
    //   setTimeout(() => {
    //     if (selectedOption === "dean") {
    //       navigate("/dean-dashboard");
    //     } else if (selectedOption === "teacher") {
    //       navigate("/teachers");
    //     } else {
    //       console.log("Unknown role or no selection made");
    //     }
    //   }, 1500);
    // }, 2000);

    // Your original API call code would be:
    
    try {
      const loginStaff = await AxiosInstance1.post('/accounts/loginstaff/', formData);
      console.log("Login Response:", loginStaff.data);
      
      const token = loginStaff.data.token;
      console.log("Received Token:", token);

      const usersName = loginStaff.data.user.username;
      localStorage.setItem('usersName', usersName);
      console.log("Username:", usersName);

      localStorage.setItem('token', token);

      setResponseMsg(loginStaff.data.message || "Login successful");
      setIsSuccess(true);

      setTimeout(() => {
        if (selectedOption === "dean") {
          navigate("/dean-dashboard");
        } else if (selectedOption === "teacher") {
          navigate("/teachers");
        } else {
          console.log("Unknown role or no selection made");
        }
      }, 1000);

    } catch (error) {
      setResponseMsg(
        (error.response?.data?.message) || 'Login failed'
      );
      setIsSuccess(false);
      console.log("Error while login:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`min-h-screen ${MainBgGradient} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-8 relative z-10">
        <div className="w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
            
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="w-16 h-16 mx-auto rounded-full shadow-lg ring-4 ring-blue-100 transition-transform duration-300 hover:scale-110 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-bounce"></div>
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2" 
                  style={{ fontFamily: 'Instrument Serif, serif' }}>
                Staff Login
              </h2>
              <p className="text-gray-600 text-sm">Access your dashboard</p>
            </div>

            {/* Form */}
            <div onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div className="relative group">
                <label className="block text-gray-700 mb-2 font-medium items-center gap-2" htmlFor="username">
                  <User className="w-4 h-4 text-blue-500" />
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                    required
                    autoComplete="username"
                    placeholder="Enter your username"
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <label className="block text-gray-700 mb-2 font-medium items-center gap-2" htmlFor="password">
                  <Lock className="w-4 h-4 text-blue-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
              </div>

              {/* Role Selection */}
              <div className="relative group">
                <label className="block text-gray-700 mb-2 font-medium items-center gap-2" htmlFor="role">
                  <UserCheck className="w-4 h-4 text-blue-500" />
                  Your Role
                </label>
                <div className="relative">
                  <select
                    id="role"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="dean">Dean</option>
                    <option value="teacher">Teacher</option>
                  </select>
                  <UserCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Response Message */}
              {responseMsg && (
                <div className={`mt-6 p-4 rounded-xl text-center font-medium transition-all duration-300 ${
                  isSuccess === false 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    {isSuccess === false ? (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                    {responseMsg}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Access Dashboard
                  </>
                )}
              </button>

              {/* Footer Section */}
              <div className="mt-6 space-y-3 text-center">
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border">
                  🔐 Secure login with your registered credentials
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-gray-600">Need an account?</span>
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 flex items-center gap-1 hover:underline"
                  >
                    <User className="w-4 h-4" />
                    Register Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginStaff;