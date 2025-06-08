import React from 'react'
import schoolLogo from '../assets/logo.svg'
import ParentsGirl from '../assets/parentschil.svg'



function Parents() {
    const mainBg = 'bg-gradient-to-r from-[#fff1eb] to-[#ace0f9]'

    return (
        <div className={`h-screen ${mainBg} p-2 relative flex flex-col`}>
            {/* dynamic navbar */}
            <div className='w-full h-36 bg-[#1d2633] rounded flex'>
                <img src={schoolLogo} alt="" className='w-56 mt-[-3px]' />
                <ul className='flex gap-5 mx-auto pt-12 text-xl text-white'>
                    <li>Home</li>
                    <li>Enrollments</li>
                    <li>Parents</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className="flex flex-1 mt-4"></div>
            <img src={ParentsGirl} alt="" className='ml-22 w-xl object-contain flex-1' />
            {/* div for handling form */}
            <div className='w-1/2 h-3/4 bg-white absolute top-48 right-8 rounded p-6 shadow-lg flex flex-col justify-center'>
                <div className='w-full h-20 bg-blue-600 rounded flex items-center justify-center mb-6'>
                    <h2 className="text-white text-2xl font-bold">Parent Registration</h2>
                </div>
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="parentName">Parent Name</label>
                        <input
                            id="parentName"
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter parent name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="childName">Child's Name</label>
                        <input
                            id="childName"
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter child's name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>
                <div className="flex flex-col items-center mt-6">
                    <span className="text-gray-500 mb-2">or</span>
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-white border border-gray-300 rounded px-4 py-2 shadow hover:bg-gray-100 transition"
                        onClick={() => {
                            // TODO: Implement Google Auth logic here
                            alert('Google Sign-In coming soon!');
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
                            <g>
                                <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 32.9 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.4 4.1-16.7 10.1z"/>
                                <path fill="#FBBC05" d="M24 43c5.1 0 9.8-1.7 13.4-4.7l-6.2-5.1C29.6 35.2 27 36 24 36c-6.1 0-10.7-3.1-11.7-7.5l-7 5.4C8.6 39.1 15.7 43 24 43z"/>
                                <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.4 4.1-16.7 10.1z"/>
                            </g>
                        </svg>
                        Register / Login with Google
                    </button>
                </div>
            </div>
        </div>
    )}

export default Parents