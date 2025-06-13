import React, { useState } from 'react'
import { AxiosInstance1 } from '../api/Axios';
import SchoolLogo from '../assets/logo.svg'
import { Navigate, useNavigate } from 'react-router-dom';

function LoginStaff() {

    const [selectedOption, setSelectedOption] = useState('')
    const navigate = useNavigate()
    const MainBgGradient = 'bg-linear-to-t from-[#accbee] to-[#e7f0fd]'

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [responseMsg, setResponseMsg] = useState('')
    const [isSuccess, setIsSuccess] = useState(null)


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginStaff = await AxiosInstance1.post('loginstaff/', formData)
            setResponseMsg(loginStaff.data.message || "Registration successfull")
            setIsSuccess(true)

            // Wait 1 second before navigating to allow user to see the message
            setTimeout(() => {
                if (selectedOption === "dean") {
                    navigate("/dean-dashboard"); // Change this path to your actual route
                } else if (selectedOption === "teacher") {
                    navigate("/teachers");
                } else {
                    console.log("Unknown role or no selection made");
                }
            }, 1000);

        } catch (error) {
            setResponseMsg(
                (error.response && error.response.data && error.response.data.message) ||
                'Registration failed'
            );
            setIsSuccess(false);
            console.log("error while login:", error.response && error.response.data);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={`h-screen ${MainBgGradient} flex items-center justify-center`}>
            <div className="w-full flex justify-center items-center">
                <form
                    onSubmit={handleLogin}
                    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
                >
                    <h2 className="text-4xl font-bold mb-6 text-center text-blue-700" style={{ fontFamily: 'Instrument Serif, serif' }}>Staff Login</h2>
                    <img src={SchoolLogo} alt="logo for school" className='w-xs ml-7' />
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="login-username">
                            Username
                        </label>
                        <input
                            id="login-username"
                            type="text"
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="login-password">
                            You are
                        </label>
                        <select
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">-- Select --</option>
                            <option value="dean">Dean</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    {responseMsg && (
                        <div
                            className={`mb-4 text-center font-medium ${isSuccess === false ? 'text-red-600' : 'text-green-600'
                                }`}
                        >
                            {responseMsg}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-xs text-gray-500 text-center">
                        Please login with your registered credentials.
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginStaff