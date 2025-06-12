import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { AxiosInstance } from '../api/Axios';
import { useNavigate } from 'react-router-dom';

function RegisterAdmin() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [LoginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [responseMsg, setResponseMsg] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegister = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Await the API call
    const response = await AxiosInstance.post('register/', formData);
    if (response.status !== 201) {
      throw new Error('Registration failed');
    }
    // If registration is successful

    setResponseMsg('Registration successful! Please login.');
    setIsSuccess(true);
    setIsRegistered(true);
  } catch (error) {
    setResponseMsg('Registration failed. Please try again.');
    setIsSuccess(false);
  } finally {
    setIsLoading(false); // Always stop loading regardless of success or error
  }
};


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
            try {

                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
                
                const response = await AxiosInstance.post('api/token/', LoginData);
                if (response.status !== 200) {
                    throw new Error('Login failed');
                }
                // If login is successful
                localStorage.setItem('accessToken', response.data.accessToken); // Store token in local storage
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
                setResponseMsg('Login successful! Redirecting...');
                setIsSuccess(true);
                setIsLoading(false);
                // Simulate redirect
                setTimeout(() => {
                    navigate('/admin-dashboard'); // Redirect to admin dashboard
                    console.log('Redirecting to admin dashboard...');
                }, 1000);
            } catch (error) {
                setResponseMsg('Login failed. Please check your credentials.');
                setIsSuccess(false);
                setIsLoading(false);
            }
    };

    const toggleForm = () => {
        setIsRegistered(!isRegistered);
        setResponseMsg('');
        setIsSuccess(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            {/* School Brand Section */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative z-10">
                <div className="text-center text-white">
                    <div className="mb-8">
                        <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                            <span className="text-4xl font-bold text-white">S</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            School Management
                        </h1>
                        <p className="text-xl text-blue-200 max-w-md mx-auto leading-relaxed">
                            Empowering education through innovative technology and seamless administration
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-md lg:w-1/2 flex items-center justify-center relative z-10">
                <div className="w-full max-w-md">
                    {/* Form Container */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {isRegistered ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-blue-200">
                                {isRegistered ? 'Sign in to your admin account' : 'Register as a new admin'}
                            </p>
                        </div>

                        {/* Success/Error Message */}
                        {responseMsg && (
                            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                                isSuccess 
                                    ? 'bg-green-500/20 border border-green-400/30 text-green-200' 
                                    : 'bg-red-500/20 border border-red-400/30 text-red-200'
                            } transition-all duration-300`}>
                                {isSuccess ? (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-400" />
                                )}
                                <span className="text-sm font-medium">{responseMsg}</span>
                            </div>
                        )}

                        {/* Forms */}
                        <div className="space-y-6">
                            {isRegistered ? (
                                // Login Form
                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                                            <input
                                                type="text"
                                                name="username"
                                                value={LoginData.username}
                                                onChange={handleLoginChange}
                                                placeholder="Username"
                                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={LoginData.password}
                                                onChange={handleLoginChange}
                                                placeholder="Password"
                                                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Sign In
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                // Register Form
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleRegisterChange}
                                                placeholder="Username"
                                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleRegisterChange}
                                                placeholder="Email address"
                                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleRegisterChange}
                                                placeholder="Password (min. 8 characters)"
                                                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                                                required
                                                minLength="8"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-xs text-blue-200 space-y-2">
                                        <p>By registering, you agree to our <span className="text-yellow-400 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-yellow-400 cursor-pointer hover:underline">Privacy Policy</span>.</p>
                                    </div>

                                    <button
                                        onClick={handleRegister}
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Create Account
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Toggle Form */}
                            <div className="text-center pt-4 border-t border-white/20">
                                <p className="text-blue-200 text-sm">
                                    {isRegistered ? "Don't have an account?" : "Already have an account?"}
                                    <button
                                        onClick={toggleForm}
                                        className="ml-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
                                    >
                                        {isRegistered ? 'Sign Up' : 'Sign In'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterAdmin;