import React, { useState } from 'react';
import { AxiosInstance } from '../api/Axios';
import SchoolLogo from '../assets/logo.svg'
import { Navigate } from 'react-router-dom';


function MainStaff() {

  const MainBgGradient = 'bg-linear-to-t from-[#accbee] to-[#e7f0fd]'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [responseMsg, setResponseMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(null)
  const [showLogin, setShowLogin] = useState(false)


  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await AxiosInstance.post('registerstaff/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setResponseMsg(res.data.message || 'Registration successful!');
      setIsSuccess(true);
      setShowLogin(true)
      console.log(res.data);
    } catch (error) {
      setResponseMsg('Registration failed. Please try again.');
      setIsSuccess(false);
      console.log("Error response data:", error.res?.data);
    }
  }


  return (
    <>
        {
          showLogin ? (
            // Render login form after successful registration

            <div className={`h-screen ${MainBgGradient}`}>
              <div className="flex items-center justify-center h-full">
                <form
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
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                      autoComplete="username"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="login-password">
                      Password
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Please login with your registered credentials.
                  </div>
                </form>
              </div>
            </div>

          ) : (
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
                    <p className="text-blue-600 hover:underline text-sm">Login here</p>
                  </div>
                </form>
              </div>
            </div>
          )
        }
        
    </>

  )}
      
    
   



  

export default MainStaff