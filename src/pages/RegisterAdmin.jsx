import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import SchoolBrand from '../components/SchoolBrand'
import { AxiosInstance } from '../api/Axios';


function RegisterAdmin() {
    const [isRegistered, setIsRegistered] = useState(false);
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
    const [isSuccess, setIsSuccess] = useState(null); // null: no message, true: success, false: error

    const inputBgClass = "bg-gradient-to-r from-[#014BAD] to-[#CAD7EC]";
    const navigate = useNavigate();

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
        try {
            const res = await AxiosInstance.post('register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            setResponseMsg(res.data.message || 'Registration successful!');
            setIsSuccess(true);
            setIsRegistered(true);
            console.log(res.data);
        } catch (error) {
            setResponseMsg('Registration failed. Please try again.');
            setIsSuccess(false);
            console.log("Error response data:", error.response?.data);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await AxiosInstance.post('api/token/', {
                username: LoginData.username,
                password: LoginData.password
            });
            setResponseMsg('Login successful!');
            setIsSuccess(true);
            console.log(res.data);
            // Store the token in localStorage or handle it as needed
            localStorage.setItem('accessToken', res.data.access);
            localStorage.setItem('refreshToken', res.data.refresh);
            // Redirect to the admin dashboard or another page after a short delay
            setTimeout(() => {
                navigate('/admin-dashboard');
            }, 500);
        } catch (error) {
            setResponseMsg('Login failed. Please check your credentials.');
            setIsSuccess(false);
            console.log("Error response data:", error.response?.data);
        }
    };

    return (
        <div className='bg-[#014BAD] h-screen flex'>
            <SchoolBrand />

            <div className='w-1/2 flex items-center justify-center'>
                <div className='bg-[#D9D9D9] m-2 p-8 border-2 border-black rounded-lg max-w-md w-full'>
                    {isRegistered ? (
                        <form onSubmit={handleLogin}>
                            <h1 className='text-3xl font-bold mb-6 underline' style={{ fontFamily: 'Adamina, serif' }}>Login Admin</h1>
                            <div className='mb-5'>
                                <label className='block text-sm font-medium mb-2' htmlFor='login-username' style={{ fontFamily: 'Adamina, serif' }}>Username</label>
                                <input
                                    type='text'
                                    name='username'
                                    value={LoginData.username}
                                    onChange={handleLoginChange}
                                    className={`w-full p-2 border border-black rounded ${inputBgClass}`}
                                    required
                                />
                            </div>
                            <div className='mb-6'>
                                <label className='block text-sm font-medium mb-2' htmlFor='login-password' style={{ fontFamily: 'Adamina, serif' }}>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    value={LoginData.password}
                                    onChange={handleLoginChange}
                                    className={`w-full p-2 border border-black rounded ${inputBgClass}`}
                                    required
                                />
                            </div>
                            {responseMsg && (
                                <p className={`${isSuccess ? 'text-green-600' : 'text-red-500'} mb-4`}>
                                    {responseMsg}
                                </p>
                            )}
                            <button type='submit' className='bg-[#fabb17] text-black px-4 py-2 rounded hover:bg-blue-600 hover:text-white font-bold duration-200 w-full' style={{ fontFamily: 'Fira Code, serif' }}>Login</button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <h1 className='text-3xl font-bold mb-6 underline' style={{ fontFamily: 'Adamina, serif' }}>Register Admin</h1>
                            <div className='mb-5'>
                                <label className='block text-sm font-medium mb-2' htmlFor='name' style={{ fontFamily: 'Adamina, serif' }}>Username</label>
                                <input
                                    type='text'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleRegisterChange}
                                    className={`w-full p-2 border border-black rounded ${inputBgClass}`}
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <label className='block text-sm font-medium mb-2' htmlFor='email' style={{ fontFamily: 'Adamina, serif' }}>Email</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleRegisterChange}
                                    className={`w-full p-2 border border-black rounded ${inputBgClass}`}
                                    required
                                />
                            </div>
                            <div className='mb-6'>
                                <label className='block text-sm font-medium mb-2' htmlFor='password' style={{ fontFamily: 'Adamina, serif' }}>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleRegisterChange}
                                    className={`w-full p-2 border border-black rounded ${inputBgClass}`}
                                    required
                                />
                            </div>
                            {responseMsg && (
                                <p className={`${isSuccess ? 'text-green-600' : 'text-red-500'} mb-4`}>
                                    {responseMsg}
                                </p>
                            )}
                            <p className='text-sm mb-4' style={{ fontFamily: 'Adamina, serif' }}>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => setIsRegistered(true)}>Login</span></p>
                            <p className='text-sm mb-4' style={{ fontFamily: 'Adamina, serif' }}>By registering, you agree to our <span className='text-blue-500 cursor-pointer'>Terms of Service</span> and <span className='text-blue-500 cursor-pointer'>Privacy Policy</span>.</p>
                            <p className='text-sm mb-4' style={{ fontFamily: 'Adamina, serif' }}>Please ensure your password is at least 8 characters long.</p>
                            <button type='submit' className='bg-[#fabb17] text-black px-4 py-2 rounded hover:bg-blue-600 hover:text-white font-bold duration-200 w-full' style={{ fontFamily: 'Fira Code, serif' }}>Register</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
export default RegisterAdmin