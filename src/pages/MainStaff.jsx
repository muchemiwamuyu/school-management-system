import React, { useState } from 'react';
import { AxiosInstance } from '../api/Axios';
import SchoolLogo from '../assets/logo.svg'
import { Navigate, useNavigate } from 'react-router-dom';


function MainStaff() {

  const MainBgGradient = 'bg-linear-to-t from-[#accbee] to-[#e7f0fd]'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [responseMsg, setResponseMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(null)
  const navigate = useNavigate()
  



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post('registerstaff/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setResponseMsg(response.data.message || 'Registration successful!');
      setIsSuccess(true);
      navigate('/login')
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        // More descriptive error message from server
        setResponseMsg(error.response.data.message || 'Registration failed. Please try again.');
        console.log("Server error response:", error.response.data);
      } else {
        // Network or unknown error
        setResponseMsg('An unexpected error occurred. Please try again.');
        console.log("Unexpected error:", error);
      }
      setIsSuccess(false);
    }
  };


  return (
    <>
          <div className={`h-screen ${MainBgGradient}`}>
            <div className="flex items-center justify-center h-full">
              <form
                onSubmit={handleRegister}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
              >
                <h2 className="text-4xl font-bold mb-6 text-center text-blue-700" style={{ fontFamily: 'Instrument Serif, serif' }}>Staff Registration</h2>
                <img src={SchoolLogo} alt="logo for school" className='w-xs ml-7' />
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                    autoComplete="username"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                    autoComplete="new-password"
                  />
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
                  Register
                </button>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  You will login using these credentials.
                </div>
                <div className="mt-2 text-center">
                  <span className="text-gray-600 text-sm">Already registered? </span>
                  <p className="text-blue-600 font-bold hover:underline text-sm" onClick={() => navigate('/login')}>Login here</p>
                </div>
              </form>
            </div>
          </div>

    </>

  )
}

export default MainStaff